import { postcss } from "opticss";

import * as errors from "../../errors";
import { sourceLocation as loc } from "../../SourceLocation";

export async function disallowImportant(root: postcss.Root, file: string): Promise<postcss.Root> {
  root.walkDecls((decl) => {

    // `!important` is not allowed in Blocks. If contains `!important` declaration, throw.
    if (decl.important) {
      throw new errors.InvalidBlockSyntax(
        `!important is not allowed for \`${decl.prop}\` in \`${(<postcss.Rule>decl.parent).selector}\``,
        loc(file, decl),
      );
    }

  });

  return root;
}
