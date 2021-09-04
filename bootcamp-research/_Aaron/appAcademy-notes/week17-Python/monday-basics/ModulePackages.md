# Modules and Packages

## Table of Contents

## sys.path

sys module has attribute of path that has a list of module paths relative to the running module

## Importing (IMPORTANT)

```py

from .mymodule import MyClass # Will need the direct path
from .mydirectory import MyClass # Directory will need a __init__ to be converted to a package

```

## Two kinds of Modules

Directories can also be modules.
To import modules from directories, file names must start with the \_\_

- **init**.py initializes the directory module when its imported or ran as a program
- **main**.py runs if its invoked as a program.

## Ways to run modules

- as a script
  - `py python my_package/my_module.py`
- as a module
  - `py python -m my_package.my_module`

## Ways to run directories (aka packages)

any directories that are being run, that contains **dunderFile** wil be run first.

- as a script
  - `py python my_package`
  - will only run files that are direct children of directory.
- as a module
  - `py python -m my_package`
  - will run all files that are descendants of directory.
