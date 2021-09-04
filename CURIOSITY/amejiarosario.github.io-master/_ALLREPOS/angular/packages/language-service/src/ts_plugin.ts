/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript/lib/tsserverlibrary';

import {createLanguageService} from './language_service';
import {Completion, Diagnostic, DiagnosticMessageChain} from './types';
import {TypeScriptServiceHost} from './typescript_host';

const projectHostMap = new WeakMap<ts.server.Project, TypeScriptServiceHost>();

export function getExternalFiles(project: ts.server.Project): string[]|undefined {
  const host = projectHostMap.get(project);
  if (host) {
    const externalFiles = host.getTemplateReferences();
    return externalFiles;
  }
}

function completionToEntry(c: Completion): ts.CompletionEntry {
  return {
    // TODO: remove any and fix type error.
    kind: c.kind as any,
    name: c.name,
    sortText: c.sort,
    kindModifiers: ''
  };
}

function diagnosticChainToDiagnosticChain(chain: DiagnosticMessageChain):
    ts.DiagnosticMessageChain {
  return {
    messageText: chain.message,
    category: ts.DiagnosticCategory.Error,
    code: 0,
    next: chain.next ? diagnosticChainToDiagnosticChain(chain.next) : undefined
  };
}

function diagnosticMessageToDiagnosticMessageText(message: string | DiagnosticMessageChain): string|
    ts.DiagnosticMessageChain {
  if (typeof message === 'string') {
    return message;
  }
  return diagnosticChainToDiagnosticChain(message);
}

function diagnosticToDiagnostic(d: Diagnostic, file: ts.SourceFile): ts.Diagnostic {
  const result = {
    file,
    start: d.span.start,
    length: d.span.end - d.span.start,
    messageText: diagnosticMessageToDiagnosticMessageText(d.message),
    category: ts.DiagnosticCategory.Error,
    code: 0,
    source: 'ng'
  };
  return result;
}

export function create(info: ts.server.PluginCreateInfo): ts.LanguageService {
  const oldLS: ts.LanguageService = info.languageService;
  const proxy: ts.LanguageService = Object.assign({}, oldLS);
  const logger = info.project.projectService.logger;

  function tryOperation<T>(attempting: string, callback: () => T): T|null {
    try {
      return callback();
    } catch (e) {
      logger.info(`Failed to ${attempting}: ${e.toString()}`);
      logger.info(`Stack trace: ${e.stack}`);
      return null;
    }
  }

  const serviceHost = new TypeScriptServiceHost(info.languageServiceHost, oldLS);
  const ls = createLanguageService(serviceHost);
  serviceHost.setSite(ls);
  projectHostMap.set(info.project, serviceHost);

  proxy.getCompletionsAtPosition = function(
      fileName: string, position: number, options: ts.GetCompletionsAtPositionOptions|undefined) {
    let base = oldLS.getCompletionsAtPosition(fileName, position, options) || {
      isGlobalCompletion: false,
      isMemberCompletion: false,
      isNewIdentifierLocation: false,
      entries: []
    };
    tryOperation('get completions', () => {
      const results = ls.getCompletionsAt(fileName, position);
      if (results && results.length) {
        if (base === undefined) {
          base = {
            isGlobalCompletion: false,
            isMemberCompletion: false,
            isNewIdentifierLocation: false,
            entries: []
          };
        }
        for (const entry of results) {
          base.entries.push(completionToEntry(entry));
        }
      }
    });
    return base;
  };

  proxy.getQuickInfoAtPosition = function(fileName: string, position: number): ts.QuickInfo |
      undefined {
        let base = oldLS.getQuickInfoAtPosition(fileName, position);
        // TODO(vicb): the tags property has been removed in TS 2.2
        tryOperation('get quick info', () => {
          const ours = ls.getHoverAt(fileName, position);
          if (ours) {
            const displayParts: ts.SymbolDisplayPart[] = [];
            for (const part of ours.text) {
              displayParts.push({kind: part.language || 'angular', text: part.text});
            }
            const tags = base && (<any>base).tags;
            base = <any>{
              displayParts,
              documentation: [],
              kind: 'angular',
              kindModifiers: 'what does this do?',
              textSpan: {start: ours.span.start, length: ours.span.end - ours.span.start},
            };
            if (tags) {
              (<any>base).tags = tags;
            }
          }
        });

        return base;
      };

  proxy.getSemanticDiagnostics = function(fileName: string) {
    let result = oldLS.getSemanticDiagnostics(fileName);
    const base = result || [];
    tryOperation('get diagnostics', () => {
      logger.info(`Computing Angular semantic diagnostics...`);
      const ours = ls.getDiagnostics(fileName);
      if (ours && ours.length) {
        const file = oldLS.getProgram() !.getSourceFile(fileName);
        if (file) {
          base.push.apply(base, ours.map(d => diagnosticToDiagnostic(d, file)));
        }
      }
    });

    return base;
  };

  proxy.getDefinitionAtPosition = function(
      fileName: string, position: number): ReadonlyArray<ts.DefinitionInfo> {
    let base = oldLS.getDefinitionAtPosition(fileName, position);
    if (base && base.length) {
      return base;
    }

    return tryOperation('get definition', () => {
             const ours = ls.getDefinitionAt(fileName, position);
             let combined;

             if (ours && ours.length) {
               combined = base && base.concat([]) || [];
               for (const loc of ours) {
                 combined.push({
                   fileName: loc.fileName,
                   textSpan: {start: loc.span.start, length: loc.span.end - loc.span.start},
                   name: '',
                   // TODO: remove any and fix type error.
                   kind: 'definition' as any,
                   containerName: loc.fileName,
                   containerKind: 'file' as any,
                 });
               }
             } else {
               combined = base;
             }
             return combined;
           }) || [];
  };

  return proxy;
}
