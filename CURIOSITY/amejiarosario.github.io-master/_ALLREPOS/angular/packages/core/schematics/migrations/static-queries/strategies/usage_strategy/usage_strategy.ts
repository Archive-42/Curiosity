/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';

import {parseHtmlGracefully} from '../../../../utils/parse_html';
import {hasPropertyNameText} from '../../../../utils/typescript/property_name';
import {ClassMetadataMap} from '../../angular/ng_query_visitor';
import {NgQueryDefinition, QueryTiming, QueryType} from '../../angular/query-definition';
import {TimingResult, TimingStrategy} from '../timing-strategy';

import {DeclarationUsageVisitor, FunctionContext} from './declaration_usage_visitor';
import {updateSuperClassAbstractMembersContext} from './super_class_context';
import {TemplateUsageVisitor} from './template_usage_visitor';


/**
 * Object that maps a given type of query to a list of lifecycle hooks that
 * could be used to access such a query statically.
 */
const STATIC_QUERY_LIFECYCLE_HOOKS = {
  [QueryType.ViewChild]:
      ['ngOnChanges', 'ngOnInit', 'ngDoCheck', 'ngAfterContentInit', 'ngAfterContentChecked'],
  [QueryType.ContentChild]: ['ngOnChanges', 'ngOnInit', 'ngDoCheck'],
};

/**
 * Query timing strategy that determines the timing of a given query by inspecting how
 * the query is accessed within the project's TypeScript source files. Read more about
 * this strategy here: https://hackmd.io/s/Hymvc2OKE
 */
export class QueryUsageStrategy implements TimingStrategy {
  constructor(private classMetadata: ClassMetadataMap, private typeChecker: ts.TypeChecker) {}

  setup() {
    // No setup is needed for this strategy and therefore we always return "true" as
    // the setup is successful.
    return true;
  }

  /**
   * Analyzes the usage of the given query and determines the query timing based
   * on the current usage of the query.
   */
  detectTiming(query: NgQueryDefinition): TimingResult {
    return {
      timing:
          isQueryUsedStatically(query.container, query, this.classMetadata, this.typeChecker, []) ?
          QueryTiming.STATIC :
          QueryTiming.DYNAMIC
    };
  }
}


/**
 * Checks whether a given query is used statically within the given class, its super
 * class or derived classes.
 */
function isQueryUsedStatically(
    classDecl: ts.ClassDeclaration, query: NgQueryDefinition, classMetadataMap: ClassMetadataMap,
    typeChecker: ts.TypeChecker, knownInputNames: string[],
    functionCtx: FunctionContext = new Map(), visitInheritedClasses = true): boolean {
  const usageVisitor = new DeclarationUsageVisitor(query.property, typeChecker, functionCtx);
  const classMetadata = classMetadataMap.get(classDecl);

  // In case there is metadata for the current class, we collect all resolved Angular input
  // names and add them to the list of known inputs that need to be checked for usages of
  // the current query. e.g. queries used in an @Input() *setter* are always static.
  if (classMetadata) {
    knownInputNames.push(...classMetadata.ngInputNames);
  }

  // Array of TypeScript nodes which can contain usages of the given query in
  // order to access it statically.
  const possibleStaticQueryNodes = filterQueryClassMemberNodes(classDecl, query, knownInputNames);

  // In case nodes that can possibly access a query statically have been found, check
  // if the query declaration is synchronously used within any of these nodes.
  if (possibleStaticQueryNodes.length &&
      possibleStaticQueryNodes.some(n => usageVisitor.isSynchronouslyUsedInNode(n))) {
    return true;
  }

  if (!classMetadata) {
    return false;
  }

  // In case there is a component template for the current class, we check if the
  // template statically accesses the current query. In case that's true, the query
  // can be marked as static.
  if (classMetadata.template && hasPropertyNameText(query.property.name)) {
    const template = classMetadata.template;
    const parsedHtml = parseHtmlGracefully(template.content, template.filePath);
    const htmlVisitor = new TemplateUsageVisitor(query.property.name.text);

    if (parsedHtml && htmlVisitor.isQueryUsedStatically(parsedHtml)) {
      return true;
    }
  }

  // In case derived classes should also be analyzed, we determine the classes that derive
  // from the current class and check if these have input setters or lifecycle hooks that
  // use the query statically.
  if (visitInheritedClasses) {
    if (classMetadata.derivedClasses.some(
            derivedClass => isQueryUsedStatically(
                derivedClass, query, classMetadataMap, typeChecker, knownInputNames))) {
      return true;
    }
  }

  // In case the current class has a super class, we determine declared abstract function-like
  // declarations in the super-class that are implemented in the current class. The super class
  // will then be analyzed with the abstract declarations mapped to the implemented TypeScript
  // nodes. This allows us to handle queries which are used in super classes through derived
  // abstract method declarations.
  if (classMetadata.superClass) {
    const superClassDecl = classMetadata.superClass;

    // Update the function context to map abstract declaration nodes to their implementation
    // node in the base class. This ensures that the declaration usage visitor can analyze
    // abstract class member declarations.
    updateSuperClassAbstractMembersContext(classDecl, functionCtx, classMetadataMap);

    if (isQueryUsedStatically(
            superClassDecl, query, classMetadataMap, typeChecker, [], functionCtx, false)) {
      return true;
    }
  }

  return false;
}


/**
 * Filters all class members from the class declaration that can access the
 * given query statically (e.g. ngOnInit lifecycle hook or @Input setters)
 */
function filterQueryClassMemberNodes(
    classDecl: ts.ClassDeclaration, query: NgQueryDefinition,
    knownInputNames: string[]): ts.Block[] {
  // Returns an array of TypeScript nodes which can contain usages of the given query
  // in order to access it statically. e.g.
  //  (1) queries used in the "ngOnInit" lifecycle hook are static.
  //  (2) inputs with setters can access queries statically.
  return classDecl.members
      .filter(m => {
        if (ts.isMethodDeclaration(m) && m.body && hasPropertyNameText(m.name) &&
            STATIC_QUERY_LIFECYCLE_HOOKS[query.type].indexOf(m.name.text) !== -1) {
          return true;
        } else if (
            knownInputNames && ts.isSetAccessor(m) && m.body && hasPropertyNameText(m.name) &&
            knownInputNames.indexOf(m.name.text) !== -1) {
          return true;
        }
        return false;
      })
      .map((member: ts.SetAccessorDeclaration | ts.MethodDeclaration) => member.body !);
}
