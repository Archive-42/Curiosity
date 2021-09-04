from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Asset
from app.utils import validation_errors_to_messages, upload_file
from app.forms import AssetForm

asset_routes = Blueprint("assets", __name__)

# Create asset
@asset_routes.route("/create", methods=["POST"])
def create_asset():
    """Create a new asset"""
    form = AssetForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        image_filename = upload_file(form["image"].data)
        asset = Asset(
            user=current_user,
            category=form["category"].data,
            title=form["title"].data,
            description=form["description"].data,
            color=form["color"].data,
            icon=form["icon"].data,
            image=image_filename,
            value=form["value"].data,
            max=form["max"].data,
            is_allowed_multiple=form["is_allowed_multiple"].data,
            )
        
        # TODO Option to add asset assets, meters, conditions?
        db.session.add(asset)
        db.session.commit()
        return asset.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@asset_routes.route("/<int:aid>/edit", methods=["PATCH"])
def edit_asset(aid):
    """Edit an asset."""
    form = AssetForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        image_filename = upload_file(form["image"].data)
        asset = Asset.query.get(aid)
        asset.category = form["category"].data,
        asset.title = form["title"].data
        asset.description = form["description"].data
        asset.color = form["color"].data
        asset.icon = form["icon"].data
        asset.value = form["value"].data
        asset.max = form["max"].data
        asset.is_allowed_multiple = form["is_allowed_multiple"].data
        asset.image = image_filename
        db.session.commit()
        return asset.to_dict()
    else:
        return {"errors": validation_errors_to_messages(form.errors)}, 401


@asset_routes.route("/<int:aid>/delete", methods=["DELETE"])
def delete_asset(aid):
    """Delete an asset and all its dependents"""
    asset = Asset.query.get(aid)
    db.session.delete(asset)
    db.session.commit()
    return "Deleted that lil' asset for you ;M"