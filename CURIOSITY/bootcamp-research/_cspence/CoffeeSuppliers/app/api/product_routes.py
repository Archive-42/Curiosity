from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Product, db
import json

product_routes = Blueprint('products', __name__)


@product_routes.route('/', strict_slashes=False)
def get_products():
    products = Product.query.filter(Product.amount_in_stock > 0).all()
    return {
        'dict': {product.id: product.to_dict() for product in products},
        'ids': [product.id for product in products]
    }


@product_routes.route('/all', strict_slashes=False)
def get_all_products():
    products = Product.query.all()
    return {
        'dict': {product.id: product.to_dict() for product in products},
        'ids': [product.id for product in products]
    }


@product_routes.route('/<int:id>', methods=['PUT'], strict_slashes=False)
# @login_required
def update_product(id):
    req_data = json.loads(request.data)
    product = Product.query.filter(Product.id == int(id)).first()
    product.name = req_data['name']
    product.description = req_data['description']
    product.amount_in_stock = req_data['amountInStock']
    product.price = req_data['price']
    product.main_image = req_data['mainImg']
    product.image2 = req_data['image2']
    product.image3 = req_data['image3']
    product.image4 = req_data['image4']
    product.image5 = req_data['image5']
    db.session.commit()
    return product.to_dict()


@product_routes.route('/<int:id>', methods=['DELETE'], strict_slashes=False)
# @login_required
def delete_product(id):
    product = Product.query.filter(Product.id == id).first()
    product.amount_in_stock = 0
    db.session.commit()
    return {"id": id}


@product_routes.route('/<int:id>', strict_slashes=False)
def get_product(id):
    product = Product.query.filter(Product.id == id).first()
    return product.to_dict()


@product_routes.route('/', methods=['POST'], strict_slashes=False)
def create_product():
    req_data = json.loads(request.data)
    product = Product(
        name=req_data['name'],
        description=req_data['description'],
        amount_in_stock=req_data['amountInStock'],
        price=req_data['price'],
        main_image=req_data['mainImg'],
        image2=req_data['image2'],
        image3=req_data['image3'],
        image4=req_data['image4'],
        image5=req_data['image5']
    )
    db.session.add(product)
    db.session.commit()
    return product.to_dict()
