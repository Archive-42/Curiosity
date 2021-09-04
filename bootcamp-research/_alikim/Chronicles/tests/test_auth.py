import pytest
# from flask import g, session
from app.models import db, User
from app.config import TestConfig
from flask_login import current_user


def test_signup(client, app):
    """"""
    data = {"username": "snowy", "email": "snow@white.com", "password": "apple"}
    # assert client.get("/api/auth/signup").status_code == 200
    response = client.post("/api/auth/signup", 
        data=data,
        follow_redirects=True)
    # assert "http://localhost/auth/login" == response.headers["Location"]

    with app.app_context():
        user = User.query.filter(User.username == "snowy").first()
        assert user is not None
        assert b"signup successful" in response.data
        if user:
            db.session.delete(user)
            db.session.commit()


@pytest.mark.parametrize(("username", "email", "password", "message"), (
    ("demo", "e@mail.com", "password", b"username is already taken"),
    ("new", "demo@aa.io", "password", b"email is already taken"),
))
def test_signup_validation(client, username, email, password, message):
    response = client.post(
        "/api/auth/signup",
        data={"username": username, "email": email, "password": password},
        )
    assert message in response.data


def test_login(client, auth):
    """Make sure login works"""
    response = auth.login()
    with client:
        client.get("/")
        # assert session["uid"] == 1
        # assert g.user["username"] == "demo"
        assert current_user.id == 1
        assert current_user.username == "demo"
        assert b"login successful" in response.data


@pytest.mark.parametrize(("username, password, message"), (
    ("blah", "blah", b"invalid username"),
    ("demo", "blah", b"invalid password"),
))
def test_login_validate_input(auth, username, password, message):
    """Make sure invalid username and passwords return error message."""
    response = auth.login(username, password)
    assert message in response.data


def test_logout(client, auth):
    """Make sure logout works"""
    response = auth.logout()
    with client:
        auth.logout()
        # assert 'uid' not in session
        assert b"logout successful" in response.data
