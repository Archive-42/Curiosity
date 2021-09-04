import { Template } from "@opticss/template-api";
import { suite, test } from "mocha-typescript";
import { postcss } from "opticss";

import { BlockFactory } from "../../src/BlockParser";
import { Block } from "../../src/BlockTree";
import { Options, resolveConfiguration } from "../../src/configuration";
import * as cssBlocks from "../../src/errors";

import { assertParseError } from "../util/assertError";
import { TestAnalyzer } from "../util/TestAnalyzer";

type BlockAndRoot = [Block, postcss.Container];

@suite("Class Pairs Validator")
export class TemplateAnalysisTests {
  private parseBlock(css: string, filename: string, opts?: Options, blockName = "analysis"): Promise<BlockAndRoot> {
    let config = resolveConfiguration(opts);
    let factory = new BlockFactory(config, postcss);
    let root = postcss.parse(css, { from: filename });
    return factory.parse(root, filename, blockName).then((block) => {
      return <BlockAndRoot>[block, root];
    });
  }

  @test "correlating two classes from the same block on the same element throws an error"() {
    let info = new Template("templates/my-template.hbs");
    let analyzer = new TestAnalyzer();
    let analysis = analyzer.newAnalysis(info);

    let config = resolveConfiguration({});

    let css = `
      :scope { color: blue; }
      :scope[state|foo] { color: red; }
      .asdf { font-size: 20px; }
      .asdf[state|larger] { font-size: 26px; }
      .fdsa { font-size: 20px; }
      .fdsa[state|larger] { font-size: 26px; }
    `;
    return assertParseError(
      cssBlocks.TemplateAnalysisError,
      `Classes "fdsa" and "asdf" from the same block are not allowed on the same element at the same time. (templates/my-template.hbs:10:11)`,
      this.parseBlock(css, "blocks/foo.block.css", config).then(([block, _]) => {
        analysis.addBlock("", block);
        let element = analysis.startElement({ line: 10, column: 11 });
        element.addStaticClass(block.getClass("asdf")!);
        element.addStaticClass(block.getClass("fdsa")!);
        analysis.endElement(element);
      }),
    );
  }
}
