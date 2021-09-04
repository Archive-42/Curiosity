import { postcss } from "opticss";

import { IMPLEMENTS } from "../../BlockSyntax";
import { Block } from "../../BlockTree";
import * as errors from "../../errors";
import { sourceLocation } from "../../SourceLocation";

/**
 * For each `implements` property found in the passed ruleset, track the foreign
 * block. If block is not found, throw.
 * @param block  Block object being processed
 * @param sourceFile  Source file name, used for error output.
 * @param rule Ruleset to crawl
 */
export async function implementBlock(rule: postcss.Root, block: Block, sourceFile: string) {
  rule.walkDecls(IMPLEMENTS, (decl) => {
    let refNames = decl.value.split(/,\s*/);
    refNames.forEach((refName) => {
      let refBlock = block.getReferencedBlock(refName);
      if (!refBlock) {
        throw new errors.InvalidBlockSyntax(`No block named ${refName} found`, sourceLocation(sourceFile, decl));
      }
      block.addImplementation(refBlock);
    });
  });

  // Validate that all rules from external block this block implements are...implemented
  block.checkImplementations();
}
