#!/bin/bash

set -e -x

PATH=$PATH:$(npm bin)

ivy-ngcc --help

# node --inspect-brk $(npm bin)/ivy-ngcc -f esm2015
# Run ngcc and check it logged compilation output as expected
ivy-ngcc | grep 'Compiling'
if [[ $? != 0 ]]; then exit 1; fi

# Did it add the appropriate build markers?

  # - esm2015
  grep '"__processed_by_ivy_ngcc__":[^}]*"esm2015":"' node_modules/@angular/common/package.json
  if [[ $? != 0 ]]; then exit 1; fi

  # - fesm2015
  grep '"__processed_by_ivy_ngcc__":[^}]*"fesm2015":"' node_modules/@angular/common/package.json
  if [[ $? != 0 ]]; then exit 1; fi
  grep '"__processed_by_ivy_ngcc__":[^}]*"es2015":"' node_modules/@angular/common/package.json
  if [[ $? != 0 ]]; then exit 1; fi

  # - esm5
  grep '"__processed_by_ivy_ngcc__":[^}]*"esm5":"' node_modules/@angular/common/package.json
  if [[ $? != 0 ]]; then exit 1; fi

  # - fesm5
  grep '"__processed_by_ivy_ngcc__":[^}]*"module":"' node_modules/@angular/common/package.json
  if [[ $? != 0 ]]; then exit 1; fi
  grep '"__processed_by_ivy_ngcc__":[^}]*"fesm5":"' node_modules/@angular/common/package.json
  if [[ $? != 0 ]]; then exit 1; fi

# Did it replace the PRE_R3 markers correctly?
  grep "= SWITCH_COMPILE_COMPONENT__POST_R3__" node_modules/@angular/core/fesm2015/core.js
  if [[ $? != 0 ]]; then exit 1; fi
  grep "= SWITCH_COMPILE_COMPONENT__POST_R3__" node_modules/@angular/core/fesm5/core.js
  if [[ $? != 0 ]]; then exit 1; fi

# Did it compile @angular/core/ApplicationModule correctly?
  grep "ApplicationModule.ngModuleDef = ɵɵdefineNgModule" node_modules/@angular/core/fesm2015/core.js
  if [[ $? != 0 ]]; then exit 1; fi
  grep "ApplicationModule.ngModuleDef = ɵɵdefineNgModule" node_modules/@angular/core/fesm5/core.js
  if [[ $? != 0 ]]; then exit 1; fi
  grep "ApplicationModule.ngModuleDef = ɵngcc0.ɵɵdefineNgModule" node_modules/@angular/core/esm2015/src/application_module.js
  if [[ $? != 0 ]]; then exit 1; fi
  grep "ApplicationModule.ngModuleDef = ɵngcc0.ɵɵdefineNgModule" node_modules/@angular/core/esm5/src/application_module.js
  if [[ $? != 0 ]]; then exit 1; fi

# Did it transform @angular/core typing files correctly?
  grep "import [*] as ɵngcc0 from './src/r3_symbols';" node_modules/@angular/core/core.d.ts
  if [[ $? != 0 ]]; then exit 1; fi
  grep "static ngInjectorDef: ɵngcc0.ɵɵInjectorDef<ApplicationModule>;" node_modules/@angular/core/core.d.ts
  if [[ $? != 0 ]]; then exit 1; fi

# Did it generate a base factory call for synthesized constructors correctly?
  grep "const ɵMatTable_BaseFactory = ɵngcc0.ɵɵgetInheritedFactory(MatTable);" node_modules/@angular/material/esm2015/table.js
  if [[ $? != 0 ]]; then exit 1; fi
  grep "const ɵMatTable_BaseFactory = ɵngcc0.ɵɵgetInheritedFactory(MatTable);" node_modules/@angular/material/esm5/table.es5.js
  if [[ $? != 0 ]]; then exit 1; fi

# Can it be safely run again (as a noop)?
# And check that it logged skipping compilation as expected
ivy-ngcc | grep 'Skipping'
if [[ $? != 0 ]]; then exit 1; fi

# Check that running it with logging level error outputs nothing
ivy-ngcc -l error | grep '.' && exit 1

# Does running it with --formats fail?
ivy-ngcc --formats fesm2015 && exit 1

# Now try compiling the app using the ngcc compiled libraries
ngc -p tsconfig-app.json

# Did it compile the main.ts correctly (including the ngIf and MatButton directives)?
  grep "directives: \[.*\.NgIf.*\]" dist/src/main.js
  if [[ $? != 0 ]]; then exit 1; fi
  grep "directives: \[.*\.MatButton.*\]" dist/src/main.js
  if [[ $? != 0 ]]; then exit 1; fi
