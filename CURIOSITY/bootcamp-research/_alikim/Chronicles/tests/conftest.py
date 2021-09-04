# Contains setup functions called fixtures that each test will use.

# The app fixture will call the factory and pass test_config to configure the 
# application and database for testing instead of using your local development 
# configuration.

import os
import tempfile
import pytest
from app import create_app
from app.models import db
from app.seeds import seed, undo
from app.config import TestConfig

# TODO Figure out config, making isolated tables/seeder, test_db, csrf

@pytest.fixture
def app():
    """Created and closes app for testing."""
    # creates and opens a temporary file, returning the file object and the path
    # to it. The DATABASE path is overridden so it points to this temporary path
    # instead of the instance folder. After setting the path, the database
    # tables are created and the test data is inserted. After the test is over,
    # the temporary file is closed and removed.
    db_fd, db_path = tempfile.mkstemp()
    
    app = create_app(TestConfig)
    app.config["DATABASE"] = db_path

      # TESTING tells Flask that the app is in test mode. Flask changes some
      # internal behavior so it’s easier to test, and other extensions can also
      # use the flag to make testing them easier.

    with app.app_context():
        # seed()
        yield app
    
    os.close(db_fd)
    os.unlink(app.config["DATABASE"])


@pytest.fixture
def client(app):
    """
    Calls app.test_client() with the application object created by the app 
    fixture. Tests will use the client to make requests to the application 
    without running the server.
    """
    return app.test_client()
    

@pytest.fixture
def runner(app):
    """
    Creates a runner that can call the Click commands registered with the
    application.
    """
    return app.test_cli_runner()


class AuthActions(object):
    """"""
    
    def __init__(self, client):
        self._client = client
        
    def login(self, username="demo", password="password"):
        data = {"username": username, "password": password}
        return self._client.post( "/api/auth/login", 
            data=data, 
            follow_redirects=True)

    def logout(self):
        """Logs test user out"""
        return self._client.get("/api/auth/logout")


@pytest.fixture
def auth(client):
    """Can call auth.login() in a test to log in as the test user."""
    return AuthActions(client)
