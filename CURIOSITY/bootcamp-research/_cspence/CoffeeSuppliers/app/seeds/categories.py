from app.models import db, Category


def seed_categories():
    # 1
    category_seed = Category(name='Coffee Grinds')
    db.session.add(category_seed)
    # 2
    category_seed = Category(name='Coffee Beans')
    db.session.add(category_seed)
    # 3
    category_seed = Category(name='Coffee Makers')
    db.session.add(category_seed)
    # 4
    category_seed = Category(name='Coffee Filters')
    db.session.add(category_seed)
    # 5
    category_seed = Category(name='Coffee Grinders')
    db.session.add(category_seed)
    # 6
    category_seed = Category(name='Keurig')
    db.session.add(category_seed)
    # 7
    category_seed = Category(name='Cleaners')
    db.session.add(category_seed)
    # 8
    category_seed = Category(name='Name Brand')
    db.session.add(category_seed)
    # 9
    category_seed = Category(name='Organic')
    db.session.add(category_seed)
    # 10
    category_seed = Category(name='Decaf')
    db.session.add(category_seed)
    # 11
    category_seed = Category(name='Coffee Mugs')
    db.session.add(category_seed)
    # 12
    category_seed = Category(name='Coffee Cups')
    db.session.add(category_seed)
    # 13
    category_seed = Category(name='Sleeves')
    db.session.add(category_seed)
    # 14
    category_seed = Category(name='Equipment')
    db.session.add(category_seed)
    # 15
    category_seed = Category(name='Pre-Made')
    db.session.add(category_seed)
    # 16
    category_seed = Category(name='Creamer')
    db.session.add(category_seed)
    # 17
    category_seed = Category(name='Accessories')
    db.session.add(category_seed)
    # 18
    category_seed = Category(name='Miscellaneous')
    db.session.add(category_seed)
    # 19
    category_seed = Category(name='K-Cups')
    db.session.add(category_seed)
    # 20
    category_seed = Category(name='Espresso')
    db.session.add(category_seed)
    # save to db
    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories;')
    db.session.commit()
