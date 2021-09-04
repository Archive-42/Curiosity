from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Meter
from app.utils import validation_errors_to_messages, upload_file
from app.forms import MeterForm

meter_routes = Blueprint("meters", __name__)

# Create a type of progressable meter, like 'levels' or 'skills'
@meter_routes.route("/<int:cid>/meters/create", methods=["POST"])
def create_meter(cid):
    """Create a new meter that belongs to a chronicle"""
    form = MeterForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image_filename = upload_file(form["image"].data)
        meter = Meter(
            title=form["title"].data,
            description=form["description"].data,
            color=form["color"].data,
            icon=form["icon"].data,
            image=image_filename,
            min=form["min"].data,
            max=form["max"].data,
            base=form["base"].data,
            mod=form["mod"].data,
            algorithm=form["algo"].data,
            )
        db.session.add(meter)
        db.session.commit()
        return meter.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@meter_routes.route("/<int:plid>/edit", methods=["PATCH"])
def edit_meter(plid):
    """Edit a meter."""
    form = MeterForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        image_filename = upload_file(form["image"].data)
        meter = Meter.query.get(plid)
        meter.title = form["title"].data
        meter.description = form["description"].data
        meter.color = form["color"].data
        meter.image = image_filename
        meter.min = form["min"].data
        meter.max = form["max"].data
        meter.base = form["base"].data
        meter.mod = form["mod"].data
        meter.algo = form["algo"].data
        db.session.commit()
        return meter.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@meter_routes.route("/<int:plid>/delete", methods=["DELETE"])
def delete_meter(plid):
    """Delete a meter and all its dependents"""
    meter = Meter.query.get(plid)
    db.session.delete(meter)
    db.session.commit()
    return "Deleted that lil' meter for you ;M"