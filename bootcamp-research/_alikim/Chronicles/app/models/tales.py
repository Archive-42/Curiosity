from .db import db
from datetime import datetime


class Tale(db.Model):
    """A chronologically connected series of threads"""
    __tablename__ = "tales"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False, default="Untitled")
    description = db.Column(db.String, nullable=False, default="N/A")
    color = db.Column(db.String(50), default="rgb(70,60,70)")
    icon = db.Column(db.String(50), default="scroll")
    image = db.Column(db.String(250), default="/images/top-view-vintage-sewing-machine-with-scissors-thread.jpg")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    chronicle_id = db.Column(db.Integer, db.ForeignKey("chronicles.id", ondelete="cascade"), nullable=False)
    first_thread_id = db.Column(db.Integer)#, db.ForeignKey("threads.id"))

    chronicle = db.relationship("Chronicle", back_populates="tales")
    threads = db.relationship("Thread", back_populates="tale", cascade="all, delete", passive_deletes=True)

    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "user_id": self.chronicle.user.id,
            "creator": self.chronicle.user.username,
            "title": self.title,
            "description": self.description,
            "color": self.color,
            "icon": self.icon,
            "image": self.image,
            "created_at": self.created_at,
            
            "chronicle_id": self.chronicle_id,
            "first_thread_id": self.first_thread_id,
            "thread_ids": [thread.id for thread in self.threads],
        }
