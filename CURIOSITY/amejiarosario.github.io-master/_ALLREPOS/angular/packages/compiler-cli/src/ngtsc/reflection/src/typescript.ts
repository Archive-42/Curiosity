/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';

import {ClassDeclaration, ClassMember, ClassMemberKind, CtorParameter, Declaration, Decorator, FunctionDefinition, Import, ReflectionHost} from './host';
import {typeToValue} from './type_to_value';

/**
 * reflector.ts implements static reflection of declarations using the TypeScript `ts.TypeChecker`.
 */

export class TypeScriptReflectionHost implements ReflectionHost {
  constructor(protected checker: ts.TypeChecker) {}

  getDecoratorsOfDeclaration(declaration: ts.Declaration): Decorator[]|null {
    if (declaration.decorators === undefined || declaration.decorators.length === 0) {
      return null;
    }
    return declaration.decorators.map(decorator => this._reflectDecorator(decorator))
        .filter((dec): dec is Decorator => dec !== null);
  }

  getMembersOfClass(clazz: ClassDeclaration): ClassMember[] {
    const tsClazz = castDeclarationToClassOrDie(clazz);
    return tsClazz.members.map(member => this._reflectMember(member))
        .filter((member): member is ClassMember => member !== null);
  }

  getConstructorParameters(clazz: ClassDeclaration): CtorParameter[]|null {
    const tsClazz = castDeclarationToClassOrDie(clazz);

    // First, find the constructor.
    const ctor = tsClazz.members.find(ts.isConstructorDeclaration);
    if (ctor === undefined) {
      return null;
    }

    return ctor.parameters.map(node => {
      // The name of the parameter is easy.
      const name = parameterName(node.name);

      const decorators = this.getDecoratorsOfDeclaration(node);

      // It may or may not be possible to write an expression that refers to the value side of the
      // type named for the parameter.

      let originalTypeNode = node.type || null;
      let typeNode = originalTypeNode;

      // Check if we are dealing with a simple nullable union type e.g. `foo: Foo|null`
      // and extract the type. More complext union types e.g. `foo: Foo|Bar` are not supported.
      // We also don't need to support `foo: Foo|undefined` because Angular's DI injects `null` for
      // optional tokes that don't have providers.
      if (typeNode && ts.isUnionTypeNode(typeNode)) {
        let childTypeNodes = typeNode.types.filter(
            childTypeNode => childTypeNode.kind !== ts.SyntaxKind.NullKeyword);

        if (childTypeNodes.length === 1) {
          typeNode = childTypeNodes[0];
        } else {
          typeNode = null;
        }
      }

      const typeValueReference = typeToValue(typeNode, this.checker);

      return {
        name,
        nameNode: node.name, typeValueReference,
        typeNode: originalTypeNode, decorators,
      };
    });
  }

  getImportOfIdentifier(id: ts.Identifier): Import|null {
    return this.getDirectImportOfIdentifier(id) || this.getImportOfNamespacedIdentifier(id);
  }

  getExportsOfModule(node: ts.Node): Map<string, Declaration>|null {
    // In TypeScript code, modules are only ts.SourceFiles. Throw if the node isn't a module.
    if (!ts.isSourceFile(node)) {
      throw new Error(`getDeclarationsOfModule() called on non-SourceFile in TS code`);
    }
    const map = new Map<string, Declaration>();

    // Reflect the module to a Symbol, and use getExportsOfModule() to get a list of exported
    // Symbols.
    const symbol = this.checker.getSymbolAtLocation(node);
    if (symbol === undefined) {
      return null;
    }
    this.checker.getExportsOfModule(symbol).forEach(exportSymbol => {
      // Map each exported Symbol to a Declaration and add it to the map.
      const decl = this.getDeclarationOfSymbol(exportSymbol);
      if (decl !== null) {
        map.set(exportSymbol.name, decl);
      }
    });
    return map;
  }

  isClass(node: ts.Node): node is ClassDeclaration {
    // In TypeScript code, classes are ts.ClassDeclarations.
    // (`name` can be undefined in unnamed default exports: `default export class { ... }`)
    return ts.isClassDeclaration(node) && (node.name !== undefined) && ts.isIdentifier(node.name);
  }

  hasBaseClass(clazz: ClassDeclaration): boolean {
    return ts.isClassDeclaration(clazz) && clazz.heritageClauses !== undefined &&
        clazz.heritageClauses.some(clause => clause.token === ts.SyntaxKind.ExtendsKeyword);
  }

  getDeclarationOfIdentifier(id: ts.Identifier): Declaration|null {
    // Resolve the identifier to a Symbol, and return the declaration of that.
    let symbol: ts.Symbol|undefined = this.checker.getSymbolAtLocation(id);
    if (symbol === undefined) {
      return null;
    }
    return this.getDeclarationOfSymbol(symbol);
  }

  getDefinitionOfFunction<T extends ts.FunctionDeclaration|ts.MethodDeclaration|
                          ts.FunctionExpression>(node: T): FunctionDefinition<T> {
    return {
      node,
      body: node.body !== undefined ? Array.from(node.body.statements) : null,
      parameters: node.parameters.map(param => {
        const name = parameterName(param.name);
        const initializer = param.initializer || null;
        return {name, node: param, initializer};
      }),
    };
  }

  getGenericArityOfClass(clazz: ClassDeclaration): number|null {
    if (!ts.isClassDeclaration(clazz)) {
      return null;
    }
    return clazz.typeParameters !== undefined ? clazz.typeParameters.length : 0;
  }

  getVariableValue(declaration: ts.VariableDeclaration): ts.Expression|null {
    return declaration.initializer || null;
  }

  getDtsDeclaration(_: ts.Declaration): ts.Declaration|null { return null; }


  protected getDirectImportOfIdentifier(id: ts.Identifier): Import|null {
    const symbol = this.checker.getSymbolAtLocation(id);

    if (symbol === undefined || symbol.declarations === undefined ||
        symbol.declarations.length !== 1) {
      return null;
    }

    // Ignore decorators that are defined locally (not imported).
    const decl: ts.Declaration = symbol.declarations[0];
    if (!ts.isImportSpecifier(decl)) {
      return null;
    }

    // Walk back from the specifier to find the declaration, which carries the module specifier.
    const importDecl = decl.parent !.parent !.parent !;

    // The module specifier is guaranteed to be a string literal, so this should always pass.
    if (!ts.isStringLiteral(importDecl.moduleSpecifier)) {
      // Not allowed to happen in TypeScript ASTs.
      return null;
    }

    // Read the module specifier.
    const from = importDecl.moduleSpecifier.text;

    // Compute the name by which the decorator was exported, not imported.
    const name = (decl.propertyName !== undefined ? decl.propertyName : decl.name).text;

    return {from, name};
  }

  /**
   * Try to get the import info for this identifier as though it is a namespaced import.
   * For example, if the identifier is the `Directive` part of a qualified type chain like:
   *
   * ```
   * core.Directive
   * ```
   *
   * then it might be that `core` is a namespace import such as:
   *
   * ```
   * import * as core from 'tslib';
   * ```
   *
   * @param id the TypeScript identifier to find the import info for.
   * @returns The import info if this is a namespaced import or `null`.
   */
  protected getImportOfNamespacedIdentifier(id: ts.Identifier): Import|null {
    if (!(ts.isQualifiedName(id.parent) && id.parent.right === id)) {
      return null;
    }
    const namespaceIdentifier = getQualifiedNameRoot(id.parent);
    if (!namespaceIdentifier) {
      return null;
    }
    const namespaceSymbol = this.checker.getSymbolAtLocation(namespaceIdentifier);
    if (!namespaceSymbol) {
      return null;
    }
    const declaration =
        namespaceSymbol.declarations.length === 1 ? namespaceSymbol.declarations[0] : null;
    if (!declaration) {
      return null;
    }
    const namespaceDeclaration = ts.isNamespaceImport(declaration) ? declaration : null;
    if (!namespaceDeclaration) {
      return null;
    }

    const importDeclaration = namespaceDeclaration.parent.parent;
    if (!ts.isStringLiteral(importDeclaration.moduleSpecifier)) {
      // Should not happen as this would be invalid TypesScript
      return null;
    }

    return {
      from: importDeclaration.moduleSpecifier.text,
      name: id.text,
    };
  }

  /**
   * Resolve a `ts.Symbol` to its declaration, keeping track of the `viaModule` along the way.
   *
   * @internal
   */
  protected getDeclarationOfSymbol(symbol: ts.Symbol): Declaration|null {
    // If the symbol points to a ShorthandPropertyAssignment, resolve it.
    if (symbol.valueDeclaration !== undefined &&
        ts.isShorthandPropertyAssignment(symbol.valueDeclaration)) {
      const shorthandSymbol =
          this.checker.getShorthandAssignmentValueSymbol(symbol.valueDeclaration);
      if (shorthandSymbol === undefined) {
        return null;
      }
      return this.getDeclarationOfSymbol(shorthandSymbol);
    }
    let viaModule: string|null = null;
    // Look through the Symbol's immediate declarations, and see if any of them are import-type
    // statements.
    if (symbol.declarations !== undefined && symbol.declarations.length > 0) {
      for (let i = 0; i < symbol.declarations.length; i++) {
        const decl = symbol.declarations[i];
        if (ts.isImportSpecifier(decl) && decl.parent !== undefined &&
            decl.parent.parent !== undefined && decl.parent.parent.parent !== undefined) {
          // Find the ImportDeclaration that imported this Symbol.
          const importDecl = decl.parent.parent.parent;
          // The moduleSpecifier should always be a string.
          if (ts.isStringLiteral(importDecl.moduleSpecifier)) {
            // Check if the moduleSpecifier is absolute. If it is, this symbol comes from an
            // external module, and the import path becomes the viaModule.
            const moduleSpecifier = importDecl.moduleSpecifier.text;
            if (!moduleSpecifier.startsWith('.')) {
              viaModule = moduleSpecifier;
              break;
            }
          }
        }
      }
    }

    // Now, resolve the Symbol to its declaration by following any and all aliases.
    while (symbol.flags & ts.SymbolFlags.Alias) {
      symbol = this.checker.getAliasedSymbol(symbol);
    }

    // Look at the resolved Symbol's declarations and pick one of them to return. Value declarations
    // are given precedence over type declarations.
    if (symbol.valueDeclaration !== undefined) {
      return {
        node: symbol.valueDeclaration,
        viaModule,
      };
    } else if (symbol.declarations !== undefined && symbol.declarations.length > 0) {
      return {
        node: symbol.declarations[0],
        viaModule,
      };
    } else {
      return null;
    }
  }

  private _reflectDecorator(node: ts.Decorator): Decorator|null {
    // Attempt to resolve the decorator expression into a reference to a concrete Identifier. The
    // expression may contain a call to a function which returns the decorator function, in which
    // case we want to return the arguments.
    let decoratorExpr: ts.Expression = node.expression;
    let args: ts.Expression[]|null = null;

    // Check for call expressions.
    if (ts.isCallExpression(decoratorExpr)) {
      args = Array.from(decoratorExpr.arguments);
      decoratorExpr = decoratorExpr.expression;
    }

    // The final resolved decorator should be a `ts.Identifier` - if it's not, then something is
    // wrong and the decorator can't be resolved statically.
    if (!ts.isIdentifier(decoratorExpr)) {
      return null;
    }

    const importDecl = this.getImportOfIdentifier(decoratorExpr);

    return {
      name: decoratorExpr.text,
      identifier: decoratorExpr,
      import: importDecl, node, args,
    };
  }

  private _reflectMember(node: ts.ClassElement): ClassMember|null {
    let kind: ClassMemberKind|null = null;
    let value: ts.Expression|null = null;
    let name: string|null = null;
    let nameNode: ts.Identifier|null = null;

    if (ts.isPropertyDeclaration(node)) {
      kind = ClassMemberKind.Property;
      value = node.initializer || null;
    } else if (ts.isGetAccessorDeclaration(node)) {
      kind = ClassMemberKind.Getter;
    } else if (ts.isSetAccessorDeclaration(node)) {
      kind = ClassMemberKind.Setter;
    } else if (ts.isMethodDeclaration(node)) {
      kind = ClassMemberKind.Method;
    } else if (ts.isConstructorDeclaration(node)) {
      kind = ClassMemberKind.Constructor;
    } else {
      return null;
    }

    if (ts.isConstructorDeclaration(node)) {
      name = 'constructor';
    } else if (ts.isIdentifier(node.name)) {
      name = node.name.text;
      nameNode = node.name;
    } else {
      return null;
    }

    const decorators = this.getDecoratorsOfDeclaration(node);
    const isStatic = node.modifiers !== undefined &&
        node.modifiers.some(mod => mod.kind === ts.SyntaxKind.StaticKeyword);

    return {
      node,
      implementation: node, kind,
      type: node.type || null, name, nameNode, decorators, value, isStatic,
    };
  }
}

export function reflectNameOfDeclaration(decl: ts.Declaration): string|null {
  const id = reflectIdentifierOfDeclaration(decl);
  return id && id.text || null;
}

export function reflectIdentifierOfDeclaration(decl: ts.Declaration): ts.Identifier|null {
  if (ts.isClassDeclaration(decl) || ts.isFunctionDeclaration(decl)) {
    return decl.name || null;
  } else if (ts.isVariableDeclaration(decl)) {
    if (ts.isIdentifier(decl.name)) {
      return decl.name;
    }
  }
  return null;
}

export function reflectTypeEntityToDeclaration(
    type: ts.EntityName, checker: ts.TypeChecker): {node: ts.Declaration, from: string | null} {
  let realSymbol = checker.getSymbolAtLocation(type);
  if (realSymbol === undefined) {
    throw new Error(`Cannot resolve type entity ${type.getText()} to symbol`);
  }
  while (realSymbol.flags & ts.SymbolFlags.Alias) {
    realSymbol = checker.getAliasedSymbol(realSymbol);
  }

  let node: ts.Declaration|null = null;
  if (realSymbol.valueDeclaration !== undefined) {
    node = realSymbol.valueDeclaration;
  } else if (realSymbol.declarations !== undefined && realSymbol.declarations.length === 1) {
    node = realSymbol.declarations[0];
  } else {
    throw new Error(`Cannot resolve type entity symbol to declaration`);
  }

  if (ts.isQualifiedName(type)) {
    if (!ts.isIdentifier(type.left)) {
      throw new Error(`Cannot handle qualified name with non-identifier lhs`);
    }
    const symbol = checker.getSymbolAtLocation(type.left);
    if (symbol === undefined || symbol.declarations === undefined ||
        symbol.declarations.length !== 1) {
      throw new Error(`Cannot resolve qualified type entity lhs to symbol`);
    }
    const decl = symbol.declarations[0];
    if (ts.isNamespaceImport(decl)) {
      const clause = decl.parent !;
      const importDecl = clause.parent !;
      if (!ts.isStringLiteral(importDecl.moduleSpecifier)) {
        throw new Error(`Module specifier is not a string`);
      }
      return {node, from: importDecl.moduleSpecifier.text};
    } else {
      throw new Error(`Unknown import type?`);
    }
  } else {
    return {node, from: null};
  }
}

export function filterToMembersWithDecorator(members: ClassMember[], name: string, module?: string):
    {member: ClassMember, decorators: Decorator[]}[] {
  return members.filter(member => !member.isStatic)
      .map(member => {
        if (member.decorators === null) {
          return null;
        }

        const decorators = member.decorators.filter(dec => {
          if (dec.import !== null) {
            return dec.import.name === name && (module === undefined || dec.import.from === module);
          } else {
            return dec.name === name && module === undefined;
          }
        });

        if (decorators.length === 0) {
          return null;
        }

        return {member, decorators};
      })
      .filter((value): value is {member: ClassMember, decorators: Decorator[]} => value !== null);
}

export function findMember(
    members: ClassMember[], name: string, isStatic: boolean = false): ClassMember|null {
  return members.find(member => member.isStatic === isStatic && member.name === name) || null;
}

export function reflectObjectLiteral(node: ts.ObjectLiteralExpression): Map<string, ts.Expression> {
  const map = new Map<string, ts.Expression>();
  node.properties.forEach(prop => {
    if (ts.isPropertyAssignment(prop)) {
      const name = propertyNameToString(prop.name);
      if (name === null) {
        return;
      }
      map.set(name, prop.initializer);
    } else if (ts.isShorthandPropertyAssignment(prop)) {
      map.set(prop.name.text, prop.name);
    } else {
      return;
    }
  });
  return map;
}

function castDeclarationToClassOrDie(declaration: ClassDeclaration):
    ClassDeclaration<ts.ClassDeclaration> {
  if (!ts.isClassDeclaration(declaration)) {
    throw new Error(
        `Reflecting on a ${ts.SyntaxKind[declaration.kind]} instead of a ClassDeclaration.`);
  }
  return declaration;
}

function parameterName(name: ts.BindingName): string|null {
  if (ts.isIdentifier(name)) {
    return name.text;
  } else {
    return null;
  }
}

function propertyNameToString(node: ts.PropertyName): string|null {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
    return node.text;
  } else {
    return null;
  }
}

/**
 * Compute the left most identifier in a qualified type chain. E.g. the `a` of `a.b.c.SomeType`.
 * @param qualifiedName The starting property access expression from which we want to compute
 * the left most identifier.
 * @returns the left most identifier in the chain or `null` if it is not an identifier.
 */
function getQualifiedNameRoot(qualifiedName: ts.QualifiedName): ts.Identifier|null {
  while (ts.isQualifiedName(qualifiedName.left)) {
    qualifiedName = qualifiedName.left;
  }
  return ts.isIdentifier(qualifiedName.left) ? qualifiedName.left : null;
}
