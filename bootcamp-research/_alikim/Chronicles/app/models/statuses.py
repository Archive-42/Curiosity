from .db import db
from datetime import datetime


class Status(db.Model):
    """
    Represents a status condition of some kind with optional default duration.
    """
    __tablename__ = "statuses"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    category = db.Column(db.String(50))
    title = db.Column(db.String(50), nullable=False, default="Untitled")
    description = db.Column(db.String, nullable=False, default="N/A")
    color = db.Column(db.String(50), default="rgb(70,60,70)")
    icon = db.Column(db.String(50), default="heartbeat")
    image = db.Column(db.String(250), default="")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    duration = db.Column(db.DateTime)
    
    user = db.relationship("User", back_populates="statuses")
    modifiers = db.relationship("Modifier", secondary="status_modifiers", backref="status", cascade="all, delete", passive_deletes=True)
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "category": self.category,
            "title": self.title,
            "description": self.description,
            "color": self.color,
            "icon": self.icon,
            "image": self.image,
            "created_at": self.created_at,
            
            "duration": self.duration,
            "modifiers": [mod.to_dict() for mod in self.modifiers]
        }