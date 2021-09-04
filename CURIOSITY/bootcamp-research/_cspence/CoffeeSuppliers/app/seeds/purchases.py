from app.models import db, Purchase, OrderItem
from datetime import datetime
from werkzeug.security import generate_password_hash


def seed_purchases():
    purchase_seed = Purchase(
        user_id=2,
        order_placed=True,
        fulfilled=True,
        delivery_address=generate_password_hash(
            '123 Happy Lane, Yuma, Arizona 85364')
    )
    db.session.add(purchase_seed)
    db.session.commit()
    order_item_seed = OrderItem(
        user_id=2, product_id=1, quantity=2, purchase_id=1)
    db.session.add(order_item_seed)
    order_item_seed = OrderItem(
        user_id=2, product_id=1, quantity=2, purchase_id=1)
    db.session.add(order_item_seed)
    order_item_seed = OrderItem(
        user_id=2, product_id=1, quantity=2, purchase_id=1)
    db.session.add(order_item_seed)
    order_item_seed = OrderItem(
        user_id=2, product_id=1, quantity=2, purchase_id=1)
    db.session.add(order_item_seed)
    db.session.commit()

    purchase_seed = Purchase(
        user_id=2,
        order_placed=True,
        fulfilled=True,
        delivery_address=generate_password_hash(
            '125 Some Beach Lane, Yuma, Arizona 85364')
    )
    db.session.add(purchase_seed)
    db.session.commit()
    order_item_seed = OrderItem(
        user_id=2, product_id=5, quantity=2, purchase_id=2)
    db.session.add(order_item_seed)
    order_item_seed = OrderItem(
        user_id=2, product_id=7, quantity=2, purchase_id=2)
    db.session.add(order_item_seed)
    order_item_seed = OrderItem(
        user_id=2, product_id=2, quantity=2, purchase_id=2)
    db.session.add(order_item_seed)
    order_item_seed = OrderItem(
        user_id=2, product_id=1, quantity=2, purchase_id=2)
    db.session.add(order_item_seed)
    db.session.commit()

    purchase_seed = Purchase(
        user_id=2,
        order_placed=True,
        fulfilled=True,
        delivery_address=generate_password_hash(
            '339 React Street, Yuma, Arizona 85367')
    )
    db.session.add(purchase_seed)
    db.session.commit()
    order_item_seed = OrderItem(
        user_id=2, product_id=4, quantity=2, purchase_id=2)
    db.session.add(order_item_seed)
    order_item_seed = OrderItem(
        user_id=2, product_id=3, quantity=2, purchase_id=2)
    db.session.add(order_item_seed)
    order_item_seed = OrderItem(
        user_id=2, product_id=2, quantity=2, purchase_id=2)
    db.session.add(order_item_seed)
    order_item_seed = OrderItem(
        user_id=2, product_id=6, quantity=2, purchase_id=2)
    db.session.add(order_item_seed)
    db.session.commit()

    purchase_seed = Purchase(
        user_id=3,
        order_placed=False,
        fulfilled=False,
        delivery_address=generate_password_hash(
            '339 React Redux Street, Yuma, Arizona 85367')
    )
    db.session.add(purchase_seed)
    db.session.commit()
    order_item_seed = OrderItem(
        user_id=2, product_id=4, quantity=2, purchase_id=2)
    db.session.add(order_item_seed)
    order_item_seed = OrderItem(
        user_id=2, product_id=3, quantity=2, purchase_id=2)
    db.session.add(order_item_seed)
    order_item_seed = OrderItem(
        user_id=2, product_id=2, quantity=2, purchase_id=2)
    db.session.add(order_item_seed)
    order_item_seed = OrderItem(
        user_id=2, product_id=6, quantity=2, purchase_id=2)
    db.session.add(order_item_seed)
    db.session.commit()


def undo_purchases():
    db.session.execute('TRUNCATE purchases; TRUNCATE order_items;')
    db.session.commit()
