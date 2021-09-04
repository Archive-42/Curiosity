from flask import Blueprint, jsonify, request
from app.models import db, Tale, Thread, Choice
from app.forms import TaleForm, ThreadForm
from app.utils import validation_errors_to_messages, createChoicesFromString, createEffects, createLocks, upload_file

tale_routes = Blueprint("tales", __name__)

# Creation routes for Tales, Characters, Places, Assets, Conditions, Meters...


@tale_routes.route("/chronicle/<int:cid>")
def tales_of_chronicle(cid):
    """Return a collection of a chronicle's tales."""
    tales = Tale.query.filter(Tale.chronicle_id == cid).all()
    tales = [t.to_dict() for t in tales]
    return jsonify(tales)


@tale_routes.route("/<int:tid>/edit", methods=["PATCH"])
def edit_tale(tid):
    """Edit a tale."""
    form = TaleForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image_filename = upload_file(form["image"].data)
        tale = Tale.query.get(tid)
        tale.title = form["title"].data
        tale.description = form["description"].data
        tale.color = form["color"].data
        tale.icon = form["icon"].data
        tale.image = image_filename
        db.session.commit()
        return tale.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@tale_routes.route("/<int:tid>/delete", methods=["DELETE"])
def delete_tale(tid):
    """Delete a tale and all its dependents like threads, effects, locks"""
    tale = Tale.query.get(tid)
    db.session.delete(tale)
    db.session.commit()
    return "Deleted that lil' tale for you ;M"


@tale_routes.route("/<int:tid>/threads/create", methods=["POST"])
def create_thread(tid):
    """Create a new thread."""
    form = ThreadForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        print("form", form.data)
        image_filename = upload_file(form["image"].data)
        thread = Thread(
            tale_id=tid,
            title=form["title"].data,
            description=form["description"].data,
            color=form["color"].data,
            icon=form["icon"].data,
            image=image_filename,
        )
        db.session.add(thread)
        db.session.commit()

        # Creates effects for thread in database
        # effects = createEffects(request.json["effects"], thread)

        # Creates choices for thread in database
        choices = createChoicesFromString(form["choices"].data, thread)

        # Create locks for choices in database
        # locks = createLocks(request.json["locks"], thread)

        return jsonify(thread=thread.to_dict(), choices=choices)
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@tale_routes.route("/<int:tid>/threads/create-node", methods=["POST"])
def create_thread_node(tid):
    """Create a new thread."""
    form = ThreadForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        thread = Thread(
            tale_id=tid,
            title="Untitled",
            color="#f9fbefff",
            icon="feather-alt",
        )
        db.session.add(thread)
        db.session.commit()
        return thread.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401

# following = db.relationship(
#     "User", secondary="followers",
#     primaryjoin= id == Followers.follower_id,
#     secondaryjoin= id == Followers.leader_id,
#     backref="followers"
# )
