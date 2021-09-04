from .db import db


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        'products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    purchase_id = db.Column(db.Integer, db.ForeignKey(
        'purchases.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "productId": self.product_id,
            "qty": self.quantity,
            "purchaseId": self.purchase_id
        }
