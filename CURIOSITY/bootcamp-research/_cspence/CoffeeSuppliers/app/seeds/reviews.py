from app.models import db, Review


def seed_reviews():
    review_seed = Review(
        user_id=2, product_id=1, rating=4,
        review_body='''Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. 
        Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. 
        Duis tincidunt laoreet.'''
    )
    db.session.add(review_seed)

    review_seed = Review(
        user_id=2, product_id=6, rating=5,
        review_body='''Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Quisque nisl something something something justo mollis, auctor consequat urna. 
        Morbi a bibendum metus.'''
    )
    db.session.add(review_seed)

    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews;')
    db.session.commit()
