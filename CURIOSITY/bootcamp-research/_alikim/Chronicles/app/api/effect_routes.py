from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db
from app.utils import validation_errors_to_messages

effect_routes = Blueprint("effects", __name__)


# @effect_routes.route("/<int:plid>/edit", methods=["PATCH"])
# def edit_effect(plid):
#     """Edit a effect."""
#     form = EffectForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]
    
#     if form.validate_on_submit():
#         effect = Effect.query.get(plid)
#         effect.title = form["title"].data
#         effect.description = form["description"].data
#         # effect.color = form["color"].data
#         # effect.image = form["image"].data
#         db.session.commit()
#         return effect.to_dict()
#     else:
#         return {"errors": validation_errors_to_messages(form.errors)}, 401


# @effect_routes.route("/<int:plid>/delete", methods=["DELETE"])
# def delete_effect(plid):
#     """Delete a effect and all its dependents"""
#     effect = Effect.query.get(plid)
#     db.session.delete(effect)
#     db.session.commit()
#     return "Deleted that lil' effect for you ;M"