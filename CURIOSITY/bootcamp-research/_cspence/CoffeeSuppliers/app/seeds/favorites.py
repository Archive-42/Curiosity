from app.models import db, Favorite


def seed_favorites():
    favorite_seed = Favorite(user_id=1, product_id=1)
    db.session.add(favorite_seed)
    favorite_seed = Favorite(user_id=1, product_id=3)
    db.session.add(favorite_seed)
    favorite_seed = Favorite(user_id=1, product_id=5)
    db.session.add(favorite_seed)
    favorite_seed = Favorite(user_id=1, product_id=7)
    db.session.add(favorite_seed)
    favorite_seed = Favorite(user_id=1, product_id=4)
    db.session.add(favorite_seed)
    favorite_seed = Favorite(user_id=2, product_id=2)
    db.session.add(favorite_seed)
    favorite_seed = Favorite(user_id=2, product_id=4)
    db.session.add(favorite_seed)
    favorite_seed = Favorite(user_id=2, product_id=6)
    db.session.add(favorite_seed)
    favorite_seed = Favorite(user_id=2, product_id=8)
    db.session.add(favorite_seed)
    favorite_seed = Favorite(user_id=2, product_id=3)
    db.session.add(favorite_seed)
    favorite_seed = Favorite(user_id=3, product_id=1)
    db.session.add(favorite_seed)
    favorite_seed = Favorite(user_id=3, product_id=8)
    db.session.add(favorite_seed)
    db.session.commit()


def undo_favorites():
    db.session.execute('TRUNCATE favorites;')
    db.session.commit()
