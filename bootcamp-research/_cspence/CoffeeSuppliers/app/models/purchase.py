from .db import db


class Purchase(db.Model):
    __tablename__ = 'purchases'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    order_placed = db.Column(db.Boolean, nullable=False, default=False)
    fulfilled = db.Column(db.Boolean, nullable=False, default=False)
    delivery_address = db.Column(db.Text, nullable=False)
    order_items = db.relationship('OrderItem', backref='purchases', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "ordered": self.order_placed,
            "fulfilled": self.fulfilled,
            "address": self.delivery_address,
            "orderItems": {item.id: item.to_dict() for item in self.order_items}
        }
