from .db import db
from datetime import datetime


class Meter(db.Model):
    """Represents the meter settings for an entity, such as an ability, skill,
    growth, or knowledge meter."""
    __tablename__ = "meters"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    category = db.Column(db.String(50))
    title = db.Column(db.String(50), nullable=False, default="Untitled")
    description = db.Column(db.String, nullable=False, default="N/A")
    color = db.Column(db.String(50), default="rgb(70,60,70)")
    icon = db.Column(db.String(50), default="sliders")
    image = db.Column(db.String(250), default="")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    user = db.relationship("User", back_populates="meters")
    min = db.Column(db.Integer, nullable=False, default=0)
    max = db.Column(db.Integer, nullable=False, default=20)
    algorithm = db.Column(db.String, nullable=False, default="constant") # "constant", "log", "linear", "loglinear", "polynomial", "exponential", "factorial", "random"
    base = db.Column(db.Integer, nullable=False, default=1) 
    mod = db.Column(db.String, nullable=False, default=1) # Can be negative
    
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
            
            "min": self.min,
            "max": self.max,
            "algorithm": self.algorithm,
            "base": self.base,
            "mod": self.mod,
        }