from flask import Blueprint, jsonify, session, request
from sqlalchemy import and_
from app.models import CategoryJoin, Category, db
import json

category_join_routes = Blueprint('category_join', __name__)


@category_join_routes.route('/<int:product_id>', methods=['POST'], strict_slashes=False)
def add_product_to_category(category_id, product_id):
    req_data = json.loads(request.data)
    category_join = CategoryJoin(
        category_id=category_id, product_id=product_id)
    db.session.add(category_join)
    db.session.commit()
    category = Category.query.filter(Category.id == category_id).first()
    return category.to_dict()


@category_join_routes.route('/<int:product_id>', methods=['DELETE'], strict_slashes=False)
def remove_product_from_category(category_id, product_id):
    category_join = CategoryJoin.query.filter(
        and_(CategoryJoin.product_id == product_id, CategoryJoin.category_id == category_id)).first()
    id = category_join.id
    db.session.delete(category_join)
    db.session.commit()
    return {'id': id}
