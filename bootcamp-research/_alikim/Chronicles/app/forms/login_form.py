from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from app.utils import within_length_limit


def user_exists(form, field):
    print("Checking if user exists", field.data)
    username = field.data
    user = User.query.filter(User.username == username).first()
    if not user:
        raise ValidationError("invalid username")


def password_matches(form, field):
    print("Checking if password matches")
    password = field.data
    username = form.data['username']
    user = User.query.filter(User.username == username).first()
    if not user:
        return
    if not user.check_password(password):
        raise ValidationError("invalid password")


class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
