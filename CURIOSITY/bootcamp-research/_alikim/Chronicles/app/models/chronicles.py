from .db import db
from datetime import datetime


class Chronicle(db.Model):
    """A chronologically connected series of threads"""
    __tablename__ = "chronicles"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False, default="Untitled")
    description = db.Column(db.String, nullable=False, default="N/A")
    color = db.Column(db.String(50), default="rgb(70,60,70)")
    icon = db.Column(db.String(50), default="book")
    image = db.Column(db.String(250), default="row-books-literature-concept.jpg")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    user = db.relationship("User", back_populates="chronicles")
    tales = db.relationship("Tale", back_populates="chronicle", cascade="all, delete", passive_deletes=True)
    slots = db.relationship("Slot", back_populates="chronicle", cascade="all, delete", passive_deletes=True)

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "creator": self.user.username,
            "title": self.title,
            "description": self.description,
            "color": self.color,
            "icon": self.icon,
            "image": self.image,
            "created_at": self.created_at,
            "tale_ids": [t.id for t in self.tales],
            "slot_ids": [sl.id for sl in self.slots ]
        }


# chronicle_contents = db.Table(
#     "chronicle_contents",
#     db.Model.metadata,
#     db.Column("chronicle_id", db.Integer, db.ForeignKey("chronicles.id"), primary_key=True, nullable=False),
#     db.Column("content_id", db.Integer, db.ForeignKey("creations.id"), primary_key=True, nullable=False),
# )