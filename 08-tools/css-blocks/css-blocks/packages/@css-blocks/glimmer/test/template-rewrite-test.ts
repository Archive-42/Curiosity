import { BlockCompiler, StyleMapping } from "@css-blocks/core";
import { ASTPluginEnvironment, preprocess, print } from "@glimmer/syntax";
import { assert } from "chai";
import fs = require("fs");
import { Optimizer } from "opticss";
import { postcss } from "opticss";

import { GlimmerAnalyzer, GlimmerRewriter, Project } from "../src";

import { fixture } from "./fixtures";

// Reduce whitespace.
function minify(s: string) {
  return s.replace(/(^[\s\n]+|[\s\n]+$)/gm, " ").replace(/[\s\n][\s\n]+/gm, " ").replace(/\n/gm, " ").trim();
}

interface CSSAndMapping {
  css: postcss.Result | string;
  styleMapping: StyleMapping<"GlimmerTemplates.ResolvedFile">;
}

async function optimize(analyzer: GlimmerAnalyzer): Promise<CSSAndMapping> {
  let blockOpts = analyzer.project.cssBlocksOpts;
  let blocks = analyzer.transitiveBlockDependencies();
  let optimizerAnalysis = analyzer.getAnalysis(0).forOptimizer(blockOpts);
  let optimizer = new Optimizer({}, { rewriteIdents: { id: false, class: true} });
  let compiler = new BlockCompiler(postcss, blockOpts);

  optimizer.addAnalysis(optimizerAnalysis);
  for (let block of blocks) {
    let compiled = compiler.compile(block, block.stylesheet!, analyzer);
    optimizer.addSource({
      content: compiled.toResult({to: blockOpts.importer.filesystemPath(block.identifier, blockOpts)!}),
    });
  }
  let optimized = await optimizer.optimize("result.css");
  let styleMapping = new StyleMapping<"GlimmerTemplates.ResolvedFile">(optimized.styleMapping, blocks, blockOpts, analyzer.analyses());
  let css = optimized.output.content;
  return { css, styleMapping };
}

function rewrite(result: CSSAndMapping, analyzer: GlimmerAnalyzer, templatePath: string) {
  let plugin = (env: ASTPluginEnvironment) => new GlimmerRewriter(env.syntax, result.styleMapping, analyzer.getAnalysis(0), {});
  let options = {
    meta: {},
    plugins: {
      ast: [plugin],
    },
  };
  return preprocess(fs.readFileSync(templatePath).toString(), options);
}

async function pipeline(analyzer: GlimmerAnalyzer, entry: string, templatePath: string) {
  await analyzer.analyze(entry);
  let result = await optimize(analyzer);
  let ast = rewrite(result, analyzer, templatePath);
  return { css: result.css, ast, styleMapping: result.styleMapping };
}

describe("Template Rewriting", function() {

  it("rewrites styles from dynamic attributes", async function() {
    let projectDir = fixture("styled-app");
    let project = new Project(projectDir);
    let analyzer = new GlimmerAnalyzer(project);
    let templatePath = fixture("styled-app/src/ui/components/with-dynamic-states/template.hbs");
    let result = await pipeline(analyzer, "with-dynamic-states", templatePath);

    // TODO why is `f` class both static and dynamic?
    assert.deepEqual(minify(print(result.ast)), minify(`
      <div class="b">
        <h1 class="e">Hello, <span class="f c {{/css-blocks/components/classnames 2 3 2 isThick 1 2 4 2 1 textStyle "bold" 1 0 "italic" 1 1 "g" 0 "f" 1 "d" 2}}">World</span>!</h1>
      </div>
    `));
    assert.deepEqual(minify(result.css.toString()), minify(`
      .b { color: red; }
      .c { border: 1px solid black; }
      .d { border-width: 3px; }
      .e { font-size: 18px; }
      .f { font-style: italic; }
      .g { font-weight: bold; }
    `),
    );
  });

  it("rewrites styles from dynamic classes", async function() {
    let projectDir = fixture("styled-app");
    let project = new Project(projectDir);
    let analyzer = new GlimmerAnalyzer(project);
    let templatePath = fixture("styled-app/src/ui/components/with-dynamic-classes/template.hbs");
    let result = await pipeline(analyzer, "with-dynamic-classes", templatePath);
    assert.deepEqual(minify(print(result.ast)), minify(`
      <div class="a">
        <h1 class="d">Hello, <span class="e h {{/css-blocks/components/classnames 3 4 0 isWorld 1 2 0 3 1 2 (eq isThick 1) 1 3 4 2 1 textStyle "bold" 1 0 "italic" 1 1 "f" 0 "g" 1 "b" 2 "c" 3}}">World</span>!</h1>
        <div class={{/css-blocks/components/classnames 1 2 0 isWorld 1 1 1 0 "e" 0 "b" 1}}>World</div>
        <div class={{/css-blocks/components/classnames 1 2 0 isWorld 1 0 1 1 "e" 0 "b" 1}}>World</div>
        <div class={{/css-blocks/components/classnames 1 1 0 isWorld 0 1 0 "b" 0}}>World</div>
      </div>
    `));
});

  it("rewrites styles from dynamic attributes from readme", async function() {
    let projectDir = fixture("readme-app");
    let project = new Project(projectDir);
    let analyzer = new GlimmerAnalyzer(project);
    let templatePath = fixture("readme-app/src/ui/components/page-layout/template.hbs");
    let result = await pipeline(analyzer, "page-layout", templatePath);
    assert.deepEqual(minify(print(result.ast)), minify(`
      <div class="a {{/css-blocks/components/classnames 1 1 2 isLoading 1 0 "b" 0}}">
        <aside class="g h c d"> </aside>
        <article class="i {{/css-blocks/components/classnames 1 2 0 isRecommended 1 1 1 0 "e" 0 "f" 1}}"> </article>
      </div>
    `));
    assert.deepEqual(minify(result.css.toString()), minify(`
      .a { color: red; width: 100vw; }
      .b { color: blue }
      .c { float: left; }
      .d { display: none; }
      .e { border-right: 2px groove gray; }
      .f { background-color: orange }
      .g { width: 20%; }
      .h { width: calc(20% - 20px); margin-right: 20px; }
      .i { width: 80%; }
    `),
    );
  });
});
