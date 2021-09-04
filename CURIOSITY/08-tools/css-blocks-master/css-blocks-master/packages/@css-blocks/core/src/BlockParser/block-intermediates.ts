import { assertNever, whatever } from "@opticss/util";
import { postcssSelectorParser as selectorParser } from "opticss";

import { ATTR_PRESENT, AttrToken, ROOT_CLASS, STATE_NAMESPACE } from "../BlockSyntax";

export enum BlockType {
  block = 1,
  root,
  attribute,
  class,
  classAttribute,
}

export type RootAttributeNode = {
  blockName?: string;
  blockType: BlockType.attribute;
  node: selectorParser.Attribute;
};

export type ClassAttributeNode = {
  blockName?: string;
  blockType: BlockType.classAttribute;
  node: selectorParser.Attribute;
};

export type AttributeNode = RootAttributeNode | ClassAttributeNode;

export type RootClassNode = {
  blockName?: string;
  blockType: BlockType.root;
  node: selectorParser.Pseudo;
};

export type BlockClassNode = {
  blockName?: string;
  blockType: BlockType.class;
  node: selectorParser.ClassName;
};

export type ClassNode = RootClassNode | BlockClassNode;

export type BlockNode = {
  blockName?: string;
  blockType: BlockType.block;
  node: selectorParser.Tag;
};

export type NodeAndType = AttributeNode | ClassNode | BlockNode;

/** Extract an Attribute's value from a `selectorParser` attribute selector */
function attrValue(attr: selectorParser.Attribute): string {
  if (attr.value) {
    return attr.value.replace(/^(["'])(.+(?=\1$))\1$/, "$2");
  } else {
    return ATTR_PRESENT;
  }
}

/** Extract an Attribute's name from an attribute selector */
export function toAttrToken(attr: selectorParser.Attribute): AttrToken {
  return {
    namespace: attr.namespaceString,
    name: attr.attribute,
    value: attrValue(attr),
    quoted: !!attr.quoted,
  };
}

/**
 * Internal method used to generate human readable error messages when parsing.
 * @param t The block type we're generating a human readable name for.
 * @param options Options for output, currently just to specify plurality.
 * @return A human readable descriptor for the given `BlockType`.
 */
export function blockTypeName(t: BlockType, options?: { plural: boolean }): string {
  let isPlural = options && options.plural;
  switch (t) {
    case BlockType.block: return isPlural ? "external blocks" : "external block";
    case BlockType.root: return isPlural ? "block roots" : "block root";
    case BlockType.attribute: return isPlural ? "root-level states" : "root-level state";
    case BlockType.class: return isPlural ? "classes" : "class";
    case BlockType.classAttribute: return isPlural ? "class states" : "class state";
    default: return assertNever(t);
  }
}

/**
 * Test if the provided node representation is an external block.
 * @param object The NodeAndType's descriptor object.
 */
export function isExternalBlock(object: NodeAndType): boolean {
  return object.blockType === BlockType.block;
}

/**
 * Test if the provided node representation is a root level object, aka: operating
 * on the root element.
 * @param object The NodeAndType's descriptor object.
 */
export function isRootLevelObject(object: NodeAndType): object is RootAttributeNode | RootClassNode {
  return object.blockType === BlockType.root || object.blockType === BlockType.attribute;
}

/**
 * Test if the provided node representation is a class level object, aka: operating
 * on an element contained by the root, not the root itself.
 * @param object The CompoundSelector's descriptor object.
 */
export function isClassLevelObject(object: NodeAndType): object is ClassAttributeNode | BlockClassNode {
  return object.blockType === BlockType.class || object.blockType === BlockType.classAttribute;
}

/**
 * Check if given selector node is targeting the root block node
 */
export function isRootNode(node: whatever): node is selectorParser.Pseudo {
  return selectorParser.isPseudoClass(node) && node.value === ROOT_CLASS;
}

export const isClassNode = selectorParser.isClassName;

/**
 * Check if given selector node is an attribute selector
 * @param  node The selector to test.
 * @return True if attribute selector, false if not.
 */
export function isAttributeNode(node: selectorParser.Node): node is selectorParser.Attribute {
  return selectorParser.isAttribute(node) && node.namespace === STATE_NAMESPACE;
}
