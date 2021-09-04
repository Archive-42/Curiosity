from pprint import pprint
from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Chronicle, Tale, Thread, Choice, Entity, Meter
from app.utils import validation_errors_to_messages, upload_file
from app.forms import ChronicleForm, TaleForm, EntityForm, MeterForm

chronicle_routes = Blueprint("chronicles", __name__)

@chronicle_routes.route("/<order>/<int:limit>")
def chronicles(order, limit):
    """Get a collection of chronicles by 'order' and within 'limit'."""
    chronicles = Chronicle.query \
        .filter(Chronicle.tales.any()) \
        .order_by(Chronicle.created_at.desc()) \
        .limit(limit) \
        .all()
    chronicles_data = [c.to_dict() for c in chronicles]
    return jsonify(chronicles_data)


@chronicle_routes.route("/<int:cid>")
def chronicle(cid):
    """Return a chronicle ands its tales."""
    chronicle = Chronicle.query.get(cid)
    tales = [t.to_dict() for t in chronicle.tales]
    return jsonify(chronicle=chronicle.to_dict, tales=tales)


@chronicle_routes.route("/create", methods=["POST"])
def create_chronicle():
    """Create a new chronicle for a user."""
    form = ChronicleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        image_filename = upload_file(form["image"].data)
        
        chronicle = Chronicle(
            user_id=current_user.id,
            title=form["title"].data,
            description=form["description"].data,
            color=form["color"].data,
            icon=form["icon"].data,
            image=image_filename,
            )
        tale = Tale(
            chronicle=chronicle,
            title=f"{chronicle.title}'s First Tale")
        thread = Thread(
            tale=tale,
            title=f"Untitled",
            description="Edit this scene and link threads with choices!")
        db.session.add(chronicle)
        db.session.add(tale)
        db.session.add(thread)
        db.session.commit()
        tale.first_thread_id = thread.id
        db.session.commit()
        return chronicle.to_dict()
          # jsonify(
          #   chronicle={chronicle.id: chronicle.to_dict()}, 
          #   tale={tale.id: tale.to_dict()}, 
          #   thread={thread.id: thread.to_dict()}
          #   )
    else:
      return {"errors": validation_errors_to_messages(form.errors)}, 401


@chronicle_routes.route("/<int:cid>/edit", methods=["PATCH"])
def edit_chronicle(cid):
    """Edit a chronicle."""
    form = ChronicleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        image_filename = upload_file(form["image"].data)
        
        chronicle = Chronicle.query.get(cid)
        chronicle.title = form["title"].data
        chronicle.description = form["description"].data
        chronicle.color = form["color"].data
        chronicle.icon = form["icon"].data
        chronicle.image = image_filename
        db.session.commit()
        return chronicle.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@chronicle_routes.route("/<int:cid>/delete", methods=["DELETE"])
def delete_chronicle(cid):
    """Delete a chronicle and all its dependents like entities, tales, etc."""
    chronicle = Chronicle.query.get(cid)
    db.session.delete(chronicle)
    db.session.commit()
    return "Chronicle successfully deleted! ;B"


# Create player character
@chronicle_routes.route("/<int:cid>/player/<int:uid>/create", methods=["POST"])
def create_player(cid, uid):
    """Create a player character entity."""
    form = EntityForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        image_filename = upload_file(form["image"].data)
        entity = Entity(
            chronicle_id=cid,
            type="character",
            category="player",
            title=form["title"].data,
            description=form["description"].data,
            color=form["color"].data,
            icon=form["icon"].data,
            image=image_filename,
            )
        
        # TODO Option to add entity assets, meters, conditions?
        db.session.add(entity)
        # current_user.p_characters.append(entity)
        db.session.commit()
        # print("\n\nPC PC PC PC PC")
        # pprint(entity.to_dict())
        return entity.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@chronicle_routes.route("/<int:cid>/tales/create", methods=["POST"])
def create_tale(cid):
    """Create a new tale that belongs to a chronicle"""
    form = TaleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image_filename = upload_file(form["image"].data)
        tale = Tale(
            chronicle_id=cid,
            title=form["title"].data,
            description=form["description"].data,
            color=form["color"].data,
            icon=form["icon"].data,
            image=image_filename,
        )
        db.session.add(tale)
        db.session.commit()
        return tale.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401
