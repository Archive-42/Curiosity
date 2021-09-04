from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, SelectField, FileField
from wtforms.validators import DataRequired, ValidationError
from app.models import Meter
from app.utils import within_length_limit, color_choices, icon_choices


class MeterForm(FlaskForm):
    """Maps form inputs to apply backend validations."""
    category = StringField()
    title = StringField(validators=[DataRequired(), within_length_limit], default="Untitled")
    description = StringField()
    color = SelectField(choices=color_choices, validators=[DataRequired()], default=color_choices[0])
    icon = SelectField(choices=icon_choices, validators=[DataRequired()], default=icon_choices[0])
    image = FileField()
    min = IntegerField(default=0)
    max = IntegerField(validators=[DataRequired()], default=20)
    base = IntegerField(validators=[DataRequired()], default=1)
    mod = DecimalField(validators=[DataRequired()], default=1)
    algo = SelectField(validators=[DataRequired()], choices=("constant", "logarithmic", "loglinear", "linear", "polynomial", "exponential", "factorial"), default="constant")
