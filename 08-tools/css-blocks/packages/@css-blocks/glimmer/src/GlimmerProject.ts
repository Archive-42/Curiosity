import {
  BlockFactory,
  Importer,
  Options as CSSBlocksOptions,
} from "@css-blocks/core";
import {
  ResolutionMap,
} from "@glimmer/resolution-map-builder";
import Resolver, {
  BasicModuleRegistry,
} from "@glimmer/resolver";
import {
  SerializedTemplateInfo,
  TemplateInfo,
  TemplateInfoFactory,
} from "@opticss/template-api";
import { whatever } from "@opticss/util";

declare module "@opticss/template-api" {
  interface TemplateTypes {
    "GlimmerTemplates.ResolvedFile": ResolvedFile;
  }
}

export interface ResolvedPath {
  specifier: string;
  fullPath: string;
}

export class ResolvedFile implements TemplateInfo<"GlimmerTemplates.ResolvedFile"> {
  identifier: string;
  string: string;
  fullPath: string;
  type: "GlimmerTemplates.ResolvedFile" = "GlimmerTemplates.ResolvedFile";

  constructor(templateString: string, specifier: string, fullPath: string) {
    this.identifier = specifier;
    this.string = templateString;
    this.fullPath = fullPath;
  }
  serialize(): SerializedTemplateInfo<"GlimmerTemplates.ResolvedFile"> {
    return {
      type: this.type,
      identifier: this.identifier,
      data: [
        this.string,
        this.fullPath,
      ],
    };
  }
  static deserialize(identifier: string, str: whatever, fullPath: whatever): ResolvedFile {
    return new ResolvedFile(<string>str, identifier, <string>fullPath);
  }
}

TemplateInfoFactory.constructors["GlimmerTemplates.ResolvedFile"] = ResolvedFile.deserialize;

export interface GlimmerProject {
  projectDir: string;
  map: ResolutionMap;
  resolver: Resolver;
  registry: BasicModuleRegistry;
  blockImporter: Importer;
  blockFactory: BlockFactory;
  cssBlocksOpts: CSSBlocksOptions;

  resolveStylesheet(glimmerIdentifier: string, fromGlimmerIdentifier?: string): ResolvedPath | null;
  resolveTemplate(glimmerIdentifier: string, fromGlimmerIdentifier?: string): ResolvedPath | null;
  resolve(glimmerIdentifier: string, fromGlimmerIdentifier?: string): ResolvedPath | null;
  resolveFile(glimmerIdentifier: string, fromGlimmerIdentifier?: string): ResolvedFile | null;
  relativize(fullPath: string): string;
  stylesheetFor(stylesheetName: string, fromGlimmerIdentifier?: string): ResolvedFile | undefined;
  templateFor(templateName: string, fromGlimmerIdentifier?: string): ResolvedFile;
  reset(): void;
}
