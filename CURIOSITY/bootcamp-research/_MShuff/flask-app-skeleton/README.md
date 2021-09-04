# Steps for Creation of Flask App
### This is a step-by-step guide to get a basic Flask App running and connected to a Database
**_NOTE:_** code surrounded in **_{ }_** means you need to specify something here and not just copy the word. Do not put the **_{ }_** in the code!
---
## Part I: Basic, Running Flask App

#### 1. Make a directory for your project from terminal: `mkdir {project_name}`
#### 2. Create a GitHub repository for your project:
  - Initialization: `git init`
  - Add `.gitignore`: `curl https://raw.githubusercontent.com/github/gitignore/master/Python.gitignore > .gitignore`
  - Initial Commit: `git add .`
  - `git commit -m 'Initial Commit'`
#### 3. Install virtual environment(_venv_): `pipenv install --python "$PYENV_ROOT/shims/python"`
  - **Note:** To launch the venv shell: `pipenv shell`
#### 4. Install flask module: `pipenv install flask`
#### 5. Create an `app` folder in the root of the project
  - Create an `__init__.py` file in the app folder:
    - Import Flask: `from flask import Flask`
    - Define a Flask instance: `app = Flask(__name__)`
     - `__name__` - Python predefined variable, which is set to the name of the module in which it is used
    - Import routes _(not yet made)_: `from app import routes`
  - Create a `routes.py` file in the app folder
    - Import app: `from app import app`
    - Define a root route:
    - Decorator: `@app.route('/')`
    - Decorator: `@app.route('/index')`
    - View Function: `def index():`
     - `return 'Hello, World!'`
#### 6. Create a main file in root to run Flask from: `{your_project.py}`
  - `from app import app`
---
## Part II: Setting Global Variables + Configuring Flask App
#### 1. Install `python-dotenv` for `.flaskenv`: `pipenv install python-dotenv`
#### 2. Create a Database for your app in PSQL:
  - `CREATE USER {username} WITH PASSWORD {password} CREATEDB;`
  - `CREATE DATABASE {database} WITH OWNER {username};`
#### 3. Create a `.env` and `.flaskenv` in root:
  - The `.env` is for private variables, add this code:
    - `SECRET_KEY={replace_with_random_cryptographic_bits}`
     - To get a key for this, open **Node**, and type the following:
      - `require("crypto").randomBytes(32).toString("hex")`
    - `DATABASE_URL=postgresql://{username}:{password}@localhost/{database}`
  - The `.flaskenv` is for public global variables, add this code:
    - `FLASK_APP={your_project.py}`
    - `FLASK_ENV=development`
#### 4. Run your flask app one of two ways:
- `pipenv run flask run`
- `pipenv shell` to enter the venv shell
  - `flask run` to run app from venv shell
- **_NOTE:_** We can specify a port by appending `-p {port}`
#### 5. Create a `config.py` in your `app` folder with this code:
  - `import os` - To grab global set variables
  - `class Config:`
    - `SECRET_KEY = os.environ.get("SECRET_KEY") or '{default-key}'`
    - `SQLALCHEMY_TRACK_MODIFICATIONS = False`
    - `SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")`
#### 6. Back in your `app/__init__.py` do the following:
  - Import your Config class: `from config import Config`
  - Tell `app` to use config: `app.config.from_object(Config)`
---
## Part III: Adding Initial Blueprint
#### 1. Create a `routes` folder in your `app` directory
 - Create an empty `__init__.py` to make it a module
 - In your `app` directory, rename `routes.py` to `index.py` and move it into your new `routes` directory
 - In your `index.py` you just moved into routes, make the following updates:
   - remove `from app import app` completely
   - add `from flask import Blueprint, render_template`
   - under that, add `bp = Blueprint("index", __name__, url_prefix="")`
   - replace the `@app.route("/")` decorator with `@bp.route("/")`
#### 2. In your `app/__init__.py` add the following code:
  - `from .routes import index`
  - `app.register_blueprint(index.bp)`
#### Congratulations! If everything went well, you have your first Blueprint running as your index page!

