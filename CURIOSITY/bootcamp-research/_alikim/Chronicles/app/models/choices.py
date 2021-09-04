from .db import db
from datetime import datetime


# thread_choices = db.Table(
#     "thread_choices",
#     db.Model.metadata,
#     db.Column("id", db.Integer, primary_key=True),
#     db.Column("title", db.String(250)),
#     db.Column("current_thread_id", db.Integer, db.ForeignKey("threads.id", ondelete="cascade"), primary_key=True, nullable=False),
#     db.Column("choice_thread_id", db.Integer, db.ForeignKey("threads.id", ondelete="cascade"), primary_key=True, nullable=False),
#     db.Column("color", db.String(50), default="gray"),
#     db.Column("image", db.String(250), default="default_choice"),)


class Choice(db.Model):
    """A join table connecting a thread with a following branch thread."""
    __tablename__ = "choices"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String, nullable=False, default="N/A")
    color = db.Column(db.String(50), default="rgb(70,60,70)")
    icon = db.Column(db.String(50), default="map-signs")
    image = db.Column(db.String(250))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    prev_thread_id = db.Column(db.Integer, db.ForeignKey("threads.id", ondelete="cascade"), nullable=False)
    next_thread_id = db.Column(db.Integer, db.ForeignKey("threads.id", ondelete="cascade"), nullable=False)

    prev_thread = db.relationship("Thread", foreign_keys=[prev_thread_id], back_populates="choices")
    next_thread = db.relationship("Thread", foreign_keys=[next_thread_id], back_populates="choice_parents")
    asset_locks = db.relationship("AssetLock", back_populates="choice", cascade="all, delete", passive_deletes=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "color": self.color,
            "icon": self.icon,
            "image": self.image,
            "created_at": self.created_at,
            
            "tale_id": self.prev_thread.tale_id,
            "prev_thread_id": self.prev_thread_id,
            "next_thread_id": self.next_thread_id,
        }
        
        
        # followers = db.Table( # followers table has '.c' collection of all things
        #     "followers",
        #     db.Model.metadata,
        #     db.Column('leader id', db.Integer, db.ForeignKey("users.id"), primary_key=True)
        #     db.Column('follower_id', db.Integer, db.ForeignKey("users.id"), primary_key=True)
        #     db.Column('color', db.String(500))
        # )
        
        # if something doesn't exist at the time that this code runs, not populated, the lambda is needed

        
#         followed_by
        
        
#         commentlikes = db.relationship("Comment",
#             secondary=lambda: c_likes, # name of the join table
#             backref="liked_by") # Comment table will have liked_by collection of Users!
        
#         post_likes = db.relationship("Post",
#             secondary=lambda: p_likes,
#             backref="liked_by")

#         c_likes = db.Table(
#             'comment_likes',
#             db.Model.metadata,
#             db.Column("user_id",
#                       db.Integer,
#                       db.ForeignKey("users.id"),
#                       primary_key=True) # means this foreign key is a primary key WHERE IT GOES, not that is IS  a PK
#             db.Column("post_id",
#                 db.Integer,
#                 db.ForeignKey("posts.id"),
#                 primary_key=True)
#         )
        
        
#         .c collection
        
#   prismajs
  


# @follow_routes.route('/<int:followerId>/following/<int:followingId>',
#                      methods=['GET'])
# def followingUser(followerId, followingId):
#     following = db.session.query(followers).filter(followers.c.followerId == followerId).filter(followers.c.followingId == followingId).all()
#     if len(following) != 0:
#         return {'following': True}
#     else:
#         return {'following': False}


# APPEND TO COLLECTION to add.
# REMOVE FROM COLLECTION to remove.
# follow = db.session.query("followers").filter(followers.c.follower_id==follower.id).filter(followers.c.leader_id == leader.id)