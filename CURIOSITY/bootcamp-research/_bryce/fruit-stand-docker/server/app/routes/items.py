from flask import Blueprint, request, jsonify
from ..models import db
from ..models.items import Item
# from ..auth import require_auth

bp = Blueprint("items", __name__, url_prefix='/api/items')

@bp.route('/<int:companyId>/<type>')
# If we wanted each of these routes to check the auth header, we could specify the decorator that we made
# We did this in our company routes as an example to compare how our fetch requests look different between these two
# @require_auth
def company_items_by_type(companyId, type):
  items = Item.query.filter(Item.companyId == companyId).filter(Item.type == type.lower()).all()
  items = [item.to_dict() for item in items]
  
  return {"items": items}


@bp.route('/<int:companyId>/new', methods=["POST"])
# @require_auth
def post_new_item(companyId):
  data = request.json

  try: 
    item = Item(name=data['name'], type=data['type'], imgSrc=data['imgSrc'], companyId=companyId)
    db.session.add(item)
    db.session.commit()
    return {"item": item.to_dict()}
  except AssertionError as message:
    print(str(message))
    return jsonify({"error": str(message)}), 400



@bp.route('/<int:itemId>', methods=["DELETE"])
# @require_auth
def delete_item(itemId):
  item = Item.query.get(itemId)
  db.session.delete(item)
  db.session.commit()

  return {'deletedId': itemId}
