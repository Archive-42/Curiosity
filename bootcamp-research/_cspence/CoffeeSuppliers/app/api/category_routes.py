from flask import Blueprint, jsonify, session, request
from app.models import Category, CategoryJoin, db
import json

category_routes = Blueprint('categories', __name__)


@category_routes.route('/', strict_slashes=False)
def get_all_categories():
    categories = Category.query.all()
    category_dict = {category.id: category.to_dict()
                     for category in categories}
    category_ids = [category.id for category in categories]
    return {
        'dict': category_dict,
        'ids': category_ids
    }


@category_routes.route('/<int:id>', methods=['PUT'], strict_slashes=False)
def edit_category(id):
    req_data = json.loads(request.data)
    category_name = req_data['name']
    category = Category.query.filter(Category.id == id).first()
    category.name = category_name
    db.session.commit()
    return category.to_dict()


@category_routes.route('/', methods=['POST'], strict_slashes=False)
def create_category():
    req_data = json.loads(request.data)
    name = req_data['name']
    category = Category(name=name)
    db.session.add(category)
    db.session.commit()
    return category.to_dict()


@category_routes.route('/<int:id>', methods=['DELETE'], strict_slashes=False)
def delete_category(id):
    category = Category.query.filter(Category.id == id).first()
    category_joins = CategoryJoin.query.filter(
        CategoryJoin.category_id == id).all()
    for join in category_joins:
        db.session.delete(join)
        db.session.commit()
    db.session.delete(category)
    db.session.commit()
    return {"id": id}
