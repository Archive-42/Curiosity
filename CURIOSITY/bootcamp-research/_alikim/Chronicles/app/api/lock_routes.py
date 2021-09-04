from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db
from app.utils import validation_errors_to_messages
# from app.forms import LockForm

lock_routes = Blueprint("locks", __name__)


# @lock_routes.route("/<int:plid>/edit", methods=["PATCH"])
# def edit_lock(plid):
#     """Edit a lock."""
#     form = LockForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]
    
#     if form.validate_on_submit():
#         lock = Lock.query.get(plid)
#         lock.title = form["title"].data
#         lock.description = form["description"].data
#         # lock.color = form["color"].data
#         # lock.image = form["image"].data
#         db.session.commit()
#         return lock.to_dict()
#     else:
#         return {"errors": validation_errors_to_messages(form.errors)}, 401


# @lock_routes.route("/<int:plid>/delete", methods=["DELETE"])
# def delete_lock(plid):
#     """Delete a lock and all its dependents"""
#     lock = Lock.query.get(plid)
#     db.session.delete(lock)
#     db.session.commit()
#     return "Deleted that lil' lock for you ;M"