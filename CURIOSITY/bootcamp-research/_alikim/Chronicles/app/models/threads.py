from .db import db
from datetime import datetime
from pprint import pprint

# TODO IDEA Non-sequitur threads! Thread is available as a choice anywhere as long 
# as x conditions are met. Can be restricted to once-only, or other number.
# Examples: If character has 'ball' asset and is in a 'room' location type, 
# character can toss ball through window. This causes location's 'clean' rank to
# drop, 'noise' rank to grow.
# Character can always 'look around'. A 'perceptive' trial will decide if
# character can find money by chance. 
# If other character 'lucien' is present and condition "spoke to lucien today" is
# not met, action thread "talk to lucien" is available.
# If location of thread has assets "mushroom", option "pick mushrooms" is available.

class Thread(db.Model):
    """One scene that can connect sequentially to other Threads."""
    __tablename__ = "threads"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False, default="Untitled")
    description = db.Column(db.String, nullable=False, default="N/A")
    color = db.Column(db.String(50), default="rgb(70,60,70)")
    icon = db.Column(db.String(50), default="feather-alt")
    image = db.Column(db.String(250), default="/images/book-library-with-open-textbook.jpg")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    tale_id = db.Column(db.Integer, db.ForeignKey("tales.id", ondelete="cascade"), nullable=False)
    is_sequitur = db.Column(db.Boolean, nullable=False, default=True)
    is_returnable = db.Column(db.Boolean, nullable=False, default=True)
    x = db.Column(db.Integer, nullable=False, default=0)
    y = db.Column(db.Integer, nullable=False, default=0)
    
    tale = db.relationship("Tale", back_populates="threads")
    asset_effects = db.relationship("AssetEffect", 
        back_populates="thread", 
        cascade="all, delete", 
        passive_deletes=True)
    choices = db.relationship("Choice", 
        foreign_keys="Choice.prev_thread_id", 
        back_populates="prev_thread", 
        cascade="all, delete",
        passive_deletes=True)
    choice_parents = db.relationship("Choice",
        foreign_keys="Choice.next_thread_id", 
        back_populates="next_thread", 
        cascade="all, delete",
        passive_deletes=True)

    def to_dict(self):
        """Convert to dictionary."""
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "color": self.color,
            "icon": self.icon,
            "image": self.image,
            "created_at": self.created_at,
            
            "tale_id": self.tale_id,
            "is_sequitur": self.is_sequitur,
            "is_returnable": self.is_returnable,
            "x": self.x,
            "y": self.y,
            "asset_effects": [effect.to_dict() for effect in self.asset_effects],
            "choices": [choice.to_dict() for choice in self.choices],
        }
    
    # TODO Convert thread choices into a through table
    # choices = db.relationship("Thread", "thread_choices",
    #     primaryjoin=Thread.id == thread_choices.c.current_thread_id,
    #     secondaryjoin=Thread.id == thread_choices.c.choice_thread_id,
    #     backref="parent_thread",
    #     cascade="all, delete"
    #     passive_deletes=True
    #     )
    
    # def choice_to_dict():
    #     """Convert thread to dictionary, including only information for choice."""
    #     return {
    #         "id": self.id,
    #     }
