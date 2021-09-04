from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Entity
from app.utils import validation_errors_to_messages, upload_file
from app.forms import EntityForm

entity_routes = Blueprint("entities", __name__)

# Create entity
@entity_routes.route("/<entity>/create", methods=["POST"])
def create_entity(entity):
    """Create a new entity"""
    form = EntityForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        image_filename = upload_file(form["image"].data)
        entity = Entity(
            user=current_user,
            type=entity,
            category=form["category"].data,
            title=form["title"].data,
            description=form["description"].data,
            color=form["color"].data,
            icon=form["icon"].data,
            image=image_filename,
            )
        
        # TODO Option to add entity assets, meters, conditions?
        db.session.add(entity)
        db.session.commit()
        return entity.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@entity_routes.route("/<int:eid>/edit", methods=["PATCH"])
def edit_entity(eid):
    """Edit an entity."""
    form = EntityForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        image_filename = upload_file(form["image"].data)
        
        entity = Entity.query.get(eid)
        entity.category = form["category"].data,
        entity.title = form["title"].data
        entity.description = form["description"].data
        entity.color = form["color"].data
        entity.icon = form["icon"].data
        entity.image = image_filename
        db.session.commit()
        return entity.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@entity_routes.route("/<int:eid>/delete", methods=["DELETE"])
def delete_entity(eid):
    """Delete an entity and all its dependents like effects, locks joins..."""
    entity = Entity.query.get(eid)
    db.session.delete(entity)
    db.session.commit()
    return "Deleted that lil' entity for you ;M"