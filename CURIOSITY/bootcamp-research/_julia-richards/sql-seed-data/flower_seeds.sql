CREATE TABLE flower_seeds (
  id SERIAL PRIMARY KEY,
  name VARCHAR(300),
  main_color VARCHAR(100),
  seeds_per_packet INT,
  price_per_packet FLOAT,
  in_stock BOOLEAN
);

INSERT INTO flower_seeds VALUES(1, 'Begonia Fiona Red',	'Red',	25,	4.95,	yes);
INSERT INTO flower_seeds VALUES(2, 'Moonflower Seeds',	'White',	25,	2.95,	yes);
INSERT INTO flower_seeds VALUES(3,	'Easy Wave F1 Lavender Sky Blue Petunia Seeds',	'Lavender',	10,	4.25,	yes);
INSERT INTO flower_seeds VALUES(4,	'Super Hero Spry Marigold Seeds',	'Marigold',	50,	2.95,	no);
INSERT INTO flower_seeds VALUES(5,	'Zinnia Zinderella Lilac',	'Pink',	25,	3.95,	yes);
INSERT INTO flower_seeds VALUES(6,	'Mini Ornamental Mint Seeds',	'Green',	10,	3.95,	yes);
INSERT INTO flower_seeds VALUES(7,	'Kabloom Light Pink Blast Calibrachoa',	'Green',	10,	4.95,	yes);
INSERT INTO flower_seeds VALUES(8,	'Calibrachoa Kabloom Coral',	'Coral',	10,	4.95,	no);
INSERT INTO flower_seeds VALUES(9,	'Fiesta del Sol Mexican Sunflower Seeds',	'Red',	30,	3.95,	no);
INSERT INTO flower_seeds VALUES(10,	'Cosmos Apricot Lemonade',	'Yellow',	25,	3.95,	yes);
INSERT INTO flower_seeds VALUES(11,	'Zinderella Purple Zinnia Seeds',	'Purple',	25,	3.95,	yes);
INSERT INTO flower_seeds VALUES(12,	'Fireball Marigold Seeds',	'Varies',	25,	3.95,	yes);
INSERT INTO flower_seeds VALUES(13,	'Gerbera Revolution Bicolor Red Lemon',	'Red',	10,	8.95,	no);
INSERT INTO flower_seeds VALUES(14,	'Paradise Island Calibrachoa Fuseables Seeds',	'Varies',	5,	6.95,	yes);
INSERT INTO flower_seeds VALUES(15,	'Cheyenne Spirit Coneflower Seeds',	'Varies',	15,	7.95,	no);
INSERT INTO flower_seeds VALUES(16,	'Leucanthemum Madonna',	'White',	25,	4.95,	no);
INSERT INTO flower_seeds VALUES(17,	'Zinnia Zinderella Peach',	'Peach',	25,	3.95,	yes);
INSERT INTO flower_seeds VALUES(18,	'Kabloom Orange Calibrachoa',	'Orange',	10,	4.95,	yes);
INSERT INTO flower_seeds VALUES(19,	'Fountain Blue Lobelia Seeds',	'Blue',	100,	2.50,	yes);
INSERT INTO flower_seeds VALUES(20,	'Envy Zinnia Seeds',	'Green',	50,	2.95,	yes);

SELECT * FROM flower_seeds;