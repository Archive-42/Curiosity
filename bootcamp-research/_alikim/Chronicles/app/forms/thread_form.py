from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, BooleanField, FileField, FieldList
from wtforms.validators import DataRequired, ValidationError
from app.models import Thread
from app.utils import within_length_limit, color_choices, icon_choices


class ThreadForm(FlaskForm):
    """Maps form inputs to apply backend validations."""
    title = StringField(validators=[DataRequired(), within_length_limit], default="Untitled")
    description = StringField()
    color = SelectField(choices=color_choices, validators=[DataRequired()], default=color_choices[0])
    icon = SelectField(choices=icon_choices, validators=[DataRequired()], default=icon_choices[0])
    image = FileField()
    is_first = BooleanField()
    is_sequitur = BooleanField()
    is_returnable = BooleanField()
    choices = StringField()