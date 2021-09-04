from .db import db
from datetime import datetime


class Asset(db.Model):
    """Represents a material, idea, or thing."""
    __tablename__ = "assets"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    category = db.Column(db.String(50))
    title = db.Column(db.String(50), nullable=False, default="Untitled")
    description = db.Column(db.String, nullable=False, default="N/A")
    color = db.Column(db.String(50), default="rgb(70,60,70)")
    icon = db.Column(db.String(50), default="apple-alt")
    image = db.Column(db.String(250), default="big-beautiful-jewel.jpg")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    value = db.Column(db.Integer)
    max = db.Column(db.Integer, default=1)
    is_allowed_multiple = db.Column(db.Boolean, nullable=False, default=True)
    
    user = db.relationship("User", back_populates="assets")
    modifiers = db.relationship("Modifier", secondary="asset_modifiers", backref="asset", cascade="all, delete", passive_deletes=True)

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "creator": self.user.username,
            "category": self.category,
            "title": self.title,
            "description": self.description,
            "color": self.color,
            "icon": self.icon,
            "image": self.image,
            "created_at": self.created_at,
            "value": self.value,
            "max_quantity": self.max,
            "is_allowed_multiple": self.is_allowed_multiple,
            "modifiers": [mod.to_dict() for mod in self.modifiers]
        }
