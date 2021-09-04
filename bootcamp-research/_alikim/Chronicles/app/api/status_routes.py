from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Status
from app.utils import validation_errors_to_messages, upload_file
from app.forms import StatusForm

status_routes = Blueprint("statuses", __name__)

# Create status
@status_routes.route("/create", methods=["POST"])
def create_status():
    """Create a new status"""
    form = StatusForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        image_filename = upload_file(form["image"].data)
        # duration = form["duration"].data
        
        status = Status(
            user=current_user,
            category=form["category"].data,
            title=form["title"].data,
            description=form["description"].data,
            color=form["color"].data,
            icon=form["icon"].data,
            image=image_filename,
            # duration=duration,
            )
        
        # TODO Option to add status assets, meters, conditions?
        db.session.add(status)
        db.session.commit()
        return status.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@status_routes.route("/<int:sid>/edit", methods=["PATCH"])
def edit_status(sid):
    """Edit an status."""
    form = StatusForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        image_filename = upload_file(form["image"].data)
        # duration = form["duration"].data
        
        status = Status.query.get(sid)
        status.category = form["category"].data,
        status.title = form["title"].data
        status.description = form["description"].data
        status.color = form["color"].data
        status.icon = form["icon"].data
        status.image = image_filename
        # status.duration = duration
        db.session.commit()
        return status.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@status_routes.route("/<int:sid>/delete", methods=["DELETE"])
def delete_status(sid):
    """Delete an status and all its dependents."""
    status = Status.query.get(tid)
    db.session.delete(status)
    db.session.commit()
    return "Deleted that lil' status for you ;M"