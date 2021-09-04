from flask import Blueprint, jsonify, session, request
from app.models import OrderItem, Product, Purchase, db
from sqlalchemy import and_
import json

purchase_routes = Blueprint('purchases', __name__)


@purchase_routes.route('/users/<int:user_id>/not-ordered', strict_slashes=False)
def get_oder_not_placed(user_id):
    purchase = Purchase.query.filter(
        and_(Purchase.order_placed == False, Purchase.user_id == user_id)).first()
    items = OrderItem.query.filter(OrderItem.purchase_id == id).all()
    return {"purchaseId": purchase.id, "orderItems": items.values()}


@purchase_routes.route('/fulfilled', strict_slashes=False)
def get_all_fulfilled():
    purchases = Purchase.query.filter(Purchase.fulfilled == True).all()
    return {
        "dict": {purchase.id: purchase.to_dict() for purchase in purchases},
        "ids": [purchase.id for purchase in purchases]
    }


@purchase_routes.route('/pending', strict_slashes=False)
def get_all_pending():
    purchases = Purchase.query.filter(Purchase.fulfilled == False).all()
    return {
        "dict": {purchase.id: purchase.to_dict() for purchase in purchases},
        "ids": [purchase.id for purchase in purchases]
    }


@purchase_routes.route('/user/<int:user_id>', strict_slashes=False)
def get_user_purchases(user_id):
    purchases = Purchase.query.filter(Purchase.user_id == user_id).all()
    return {
        "dict": {purchase.id: purchase.to_dict() for purchase in purchases},
        "ids": [purchase.id for purchase in purchases]
    }


@purchase_routes.route('/user/<int:user_id>', methods=['POST'], strict_slashes=False)
def create_purchase(user_id):
    req_data = json.loads(request.data)
    purchase = Purchase(user_id=user_id, delivery_address=req_data['address'])
    db.session.add(purchase)
    db.session.commit()
    return purchase.to_dict()


@purchase_routes.route('/<int:purchase_id>', methods=['PUT'], strict_slashes=False)
def mark_pending(purchase_id):
    purchase = Purchase.query.filter(Purchase.id == purchase_id).first()
    purchase.order_placed = True
    db.session.commit()
    return purchase.to_dict()


@purchase_routes.route('/<int:purchase_id>', methods=['PUT'], strict_slashes=False)
def mark_fulfilled(purchase_id):
    purchase = Purchase.query.filter(Purchase.id == purchase_id).first()
    purchase.fulfilled = True
    db.session.commit()
    return purchase.to_dict()


@purchase_routes.route('/<int:purchase_id>', methods=['DELETE'], strict_slashes=False)
def cancel_order(purchase_id):
    purchase = Purchase.query.filter(Purchase.id == purchase_id).first()
    order_items = OrderItem.query.filter(
        OrderItem.purchase_id == purchase_id).all()
    if (purchase.fulfilled == False):
        for item in order_items:
            db.session.delete(item)
            db.session.commit()
        db.session.delete(purchase)
        db.session.commit()
        return {"id": purchase_id}
    return {"fulfilled": True}
