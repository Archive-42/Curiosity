DELETE FROM items;
DELETE FROM companies;
DELETE FROM users;
INSERT INTO users (email, hashed_password)
VALUES (
    'alissa@gmail.com',
    'pbkdf2:sha256:150000$DM9VgXqK$4c245f0ed1656045a62f0668d1fde255328e7873f0af25c01b45ffff134f4a63'
  );
INSERT INTO companies (name)
VALUES ('Trader Joes'),
  ('Safeway');
INSERT INTO items (type, name, "companyId", "imgSrc")
VALUES (
    'fruit',
    'apple',
    (
      SELECT id
      FROM companies
      WHERE name = 'Safeway'
    ),
    'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
  ),
  (
    'fruit',
    'banana',
    (
      SELECT id
      FROM companies
      WHERE name = 'Trader Joes'
    ),
    'https://image.shutterstock.com/z/stock-photo-banana-cluster-isolated-575528746.jpg'
  ),
  (
    'fruit',
    'strawberry',
    (
      SELECT id
      FROM companies
      WHERE name = 'Trader Joes'
    ),
    'https://images.pexels.com/photos/934066/pexels-photo-934066.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
  ),
  (
    'fruit',
    'apple',
    (
      SELECT id
      FROM companies
      WHERE name = 'Trader Joes'
    ),
    'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
  ),
  (
    'vegetable',
    'carrot',
    (
      SELECT id
      FROM companies
      WHERE name = 'Trader Joes'
    ),
    'https://c.ndtvimg.com/2019-04/2g18s9fg_carrots_625x300_01_April_19.jpg'
  ),
  (
    'vegetable',
    'carrot',
    (
      SELECT id
      FROM companies
      WHERE name = 'Safeway'
    ),
    'https://c.ndtvimg.com/2019-04/2g18s9fg_carrots_625x300_01_April_19.jpg'
  );