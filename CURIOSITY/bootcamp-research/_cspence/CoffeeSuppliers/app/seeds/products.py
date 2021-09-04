from app.models import db, Product, CategoryJoin


def seed_products():
    product_seed = Product(name='Starbucks 28oz French Roast Dark Roast Ground Coffee',
                           description='28oz bag of Starbucks French Dark Roast Coffee Grinds',
                           amount_in_stock=40,
                           price=11.98,
                           main_image='https://images-na.ssl-images-amazon.com/images/I/71lkJ6KQiDL._SL1500_.jpg',
                           image2='https://images-na.ssl-images-amazon.com/images/I/71VrbGJaKQL._SL1500_.jpg',
                           image3='https://media3.webcollage.net/7caf75ca08bb57ecfb12ebbc6939797c1a66e608?response-content-type=image%2Fjpeg&AWSAccessKeyId=AKIAIIE5CHZ4PRWSLYKQ&Expires=1893474775&Signature=n7ILBoA3CEkwiHl1VOBnAl50eVU%3D',
                           image4='https://images-na.ssl-images-amazon.com/images/I/81oYu%2B1W5UL._SL1500_.jpg',
                           image5='https://images-na.ssl-images-amazon.com/images/I/81WESC88bQL._SL1500_.jpg'
                           )

    db.session.add(product_seed)
    db.session.commit()

    product_seed = Product(name='Organic High Altitude Coffee (Dark Roast Whole Bean)',
                           description='12oz bag of Peak Performance Organic High Altitude Coffee Beans - Dark Roast.',
                           amount_in_stock=30,
                           price=19.95,
                           main_image='https://cdn.shopify.com/s/files/1/1380/9789/products/coffee-organic-high-altitude-coffee-dark-roast-whole-bean-1_b828a910-622b-4985-951f-0988063cfaaf_2000x.jpg?v=1601422355',
                           image2='https://cdn.shopify.com/s/files/1/1380/9789/products/coffee-organic-high-altitude-coffee-dark-roast-whole-bean-1_2000x.jpg?v=1601422353',
                           image3='https://cdn.shopify.com/s/files/1/1380/9789/products/coffee-organic-high-altitude-coffee-dark-roast-whole-bean-2_2000x.jpeg?v=1601422353'
                           )

    db.session.add(product_seed)
    db.session.commit()

    category_join_seed = CategoryJoin(category_id=2, product_id=2)
    db.session.add(category_join_seed)
    category_join_seed = CategoryJoin(category_id=8, product_id=2)
    db.session.add(category_join_seed)
    category_join_seed = CategoryJoin(category_id=9, product_id=2)
    db.session.add(category_join_seed)

    db.session.commit()

    product_seed = Product(name='48oz Folgers Classic Roast Coffe Grounds',
                           description='48oz container of Folgers classic roast ground coffe - medium roast',
                           amount_in_stock=80,
                           price=12.99,
                           main_image='https://www.quill.com/is/image/Quill/s1139761_s7?$img400$',
                           )

    db.session.add(product_seed)
    db.session.commit()

    category_join_seed = CategoryJoin(category_id=1, product_id=3)
    db.session.add(category_join_seed)

    db.session.commit()

    product_seed = Product(name='Mainstays Coffee Maker',
                           description='Mainstays 5 cup black coffee maker with removable filter basket',
                           amount_in_stock=15,
                           price=9.88,
                           main_image='https://i5.walmartimages.com/asr/16f77040-27ab-4008-9852-59c900d7a7d9_1.c524f1d9c465e122596bf65f939c8d26.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff',
                           image2='https://i5.walmartimages.com/asr/abbc6267-2dd6-411b-b6a6-f8ed541d2492_1.5b20d234902d2f35d769100031223c3f.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff',
                           image3='https://i5.walmartimages.com/asr/599ce3a6-5540-4252-b0e2-b7322647d002_1.18e609a47156f2d1f7e955b260e59610.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff',
                           )

    db.session.add(product_seed)
    db.session.commit()

    category_join_seed = CategoryJoin(category_id=3, product_id=4)
    db.session.add(category_join_seed)

    db.session.commit()

    product_seed = Product(name='Keurig Compact Coffee Maker',
                           description='Keurig K-Compact Single-Serve K-Cup Pod Coffee Maker',
                           amount_in_stock=8,
                           price=59.00,
                           main_image='https://i5.walmartimages.com/asr/ead2d9fb-399e-4110-9ad0-7bce3ef15ed4_1.d7f80a4a71cc9189a808e6d793e03bac.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
                           image2='https://i5.walmartimages.com/asr/d7460e99-40fb-4bbe-ae39-07dc80f0e36f_1.b8062f912a06d46a4d078b28fb0c4a3a.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
                           image3='https://i5.walmartimages.com/asr/0b41bf5c-b89b-4349-9236-34b436526238_1.b2f57e6df9bd385a3e40ff3c5ac08d28.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
                           image4='https://i5.walmartimages.com/asr/9868b072-256a-419b-821d-573c25b1e745_1.be1fa568142ea054fdaadc010cce3734.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
                           image5='https://i5.walmartimages.com/asr/40581154-c2f3-4dee-bb24-dc5d4321ff70_1.da8943549c61068f4167e9167e593de2.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff'
                           )

    db.session.add(product_seed)
    db.session.commit()

    category_join_seed = CategoryJoin(category_id=3, product_id=5)
    db.session.add(category_join_seed)
    category_join_seed = CategoryJoin(category_id=6, product_id=5)
    db.session.add(category_join_seed)
    category_join_seed = CategoryJoin(category_id=8, product_id=5)
    db.session.add(category_join_seed)
    category_join_seed = CategoryJoin(category_id=14, product_id=5)
    db.session.add(category_join_seed)

    db.session.commit()

    product_seed = Product(name='Premium Levella Espresso Machine with Milk Frother',
                           description='Primium Levella Steam Espresso Maker with 3.5 bars of pressure and Milk Frother (Silver)',
                           amount_in_stock=10,
                           price=59.99,
                           main_image='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6420/6420122_rd.jpg;maxHeight=640;maxWidth=550',
                           )

    db.session.add(product_seed)
    db.session.commit()

    category_join_seed = CategoryJoin(category_id=3, product_id=6)
    db.session.add(category_join_seed)
    category_join_seed = CategoryJoin(category_id=20, product_id=6)
    db.session.add(category_join_seed)
    category_join_seed = CategoryJoin(category_id=14, product_id=6)
    db.session.add(category_join_seed)

    db.session.commit()

    product_seed = Product(name='96 Count Variety K-Cups',
                           description='96 Count Variety (12 Blends), Single-Serve Cups for Keurig K-Cup Brewers - Premium Roasted Coffee',
                           amount_in_stock=120,
                           price=28.30,
                           main_image='https://images-na.ssl-images-amazon.com/images/I/A1c8ZYR1QoL._SL1500_.jpg',
                           image2='https://images-na.ssl-images-amazon.com/images/I/816xSQY4nYL._SL1500_.jpg',
                           )

    db.session.add(product_seed)
    db.session.commit()

    category_join_seed = CategoryJoin(category_id=1, product_id=7)
    db.session.add(category_join_seed)
    category_join_seed = CategoryJoin(category_id=6, product_id=7)
    db.session.add(category_join_seed)
    category_join_seed = CategoryJoin(category_id=19, product_id=7)
    db.session.add(category_join_seed)

    db.session.commit()

    product_seed = Product(name='3oz Coffee and Spice Grinder',
                           description='Krups 3oz Black Blade Coffee Grinder and Spice Grinder',
                           amount_in_stock=40,
                           price=11.98,
                           main_image='https://images-na.ssl-images-amazon.com/images/I/510HZM%2BVhwL._AC_SL1500_.jpg',
                           image3='https://images-na.ssl-images-amazon.com/images/I/61FuD5niIHL._AC_SL1500_.jpg',
                           image4='https://images-na.ssl-images-amazon.com/images/I/61LGN67YmZL._AC_SL1500_.jpg',
                           image2='https://images-na.ssl-images-amazon.com/images/I/51abCmcGyFL._AC_SL1500_.jpg',
                           image5='https://images-na.ssl-images-amazon.com/images/I/61Eb6wZIbbL._AC_SL1500_.jpg'
                           )

    db.session.add(product_seed)
    db.session.commit()

    category_join_seed = CategoryJoin(category_id=1, product_id=8)
    db.session.add(category_join_seed)
    category_join_seed = CategoryJoin(category_id=2, product_id=8)
    db.session.add(category_join_seed)
    category_join_seed = CategoryJoin(category_id=5, product_id=8)
    db.session.add(category_join_seed)
    category_join_seed = CategoryJoin(category_id=14, product_id=8)
    db.session.add(category_join_seed)
    category_join_seed = CategoryJoin(category_id=20, product_id=8)
    db.session.add(category_join_seed)

    db.session.commit()


def undo_products():
    db.session.execute('TRUNCATE products; TRUNCATE category_join;')
    db.session.commit()
