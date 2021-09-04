const request = require("supertest");
const app = require("../app");
const { sequelize, Product } = require("../db/models");

describe("The routes", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true, logging: console.log });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("GET / (test route)", () => {
    test("exists", async () => {
      await request(app).get("/").expect(200);
    });

    test("returns a message", async () => {
      const res = await request(app)
        .get("/")
        .expect(200)
        .expect("Content-Type", /json/);

      expect(res.body).toEqual(
        expect.objectContaining({
          message: "test root index",
        })
      );
    });
  });

  describe("GET /products", () => {
    const product1 = {
      image: "http://some.fakeUrl.com/",
      name: "test product 1",
      price: 3,
    };
    const product2 = {
      image: "http://some.fakeUrl.com/",
      name: "test product 2",
      price: 3,
    };

    beforeAll(async () => {
      await Product.bulkCreate([product1, product2]);
    });

    test("exists", async () => {
      await request(app).get("/products").expect(200);
    });

    test("returns products in the database", async () => {
      const res = await request(app)
        .get("/products")
        .expect(200)
        .expect("Content-Type", /json/);

      expect(res.body).toEqual(
        expect.objectContaining({
          products: expect.arrayContaining([
            expect.objectContaining(product1),
            expect.objectContaining(product2),
          ]),
        })
      );
    });
  });

  describe("GET /products/:id", () => {
    let product;
    const productData = {
      image: 'http://some.fakeUrl.com/',
      name: 'product something',
      price: 3,
    };
    beforeAll(async () => {
      product = await Product.create(productData);
    });

    test("exists", async () => {
      await request(app)
        .get(`/products/${product.id}`)
        .expect(200)
    });

    test("returns a product if one matches the id given", async () => {
      const res = await request(app)
        .get(`/products/${product.id}`)
        .expect(200)
        .expect('Content-Type', /json/)

      expect(res.body).toEqual(expect.objectContaining({
        product: expect.objectContaining(productData)
      }));
    });

    test("returns a 404 status code if a product with that id is not found", async () => {
      await request(app)
        .get('/products/asdf')
        .expect(404)

      const products = await Product.findAll();

      await request(app)
        .get(`/products/${products.length + 1}`)
        .expect(404)
    });
  });

  describe("POST /products", () => {
    const product = {
      image: 'http://some.fakeUrl.com/',
      name: 'post products',
      price: 4,
    };

    const badProduct = {
      image: 'asdf',
      name: '',
      price: '4',
    };

    test("exists", async () => {
      await request(app)
        .post('/products')
        .send(product)
        .expect(200)
    });

    test("returns the product that was created if good data was passed in", async () => {
      const res = await request(app)
        .post('/products')
        .send(product)
        .expect(200)
        .expect('Content-Type', /json/)

      expect(res.body).toEqual(expect.objectContaining({
        product: expect.objectContaining(product)
      }));
    });

    test("returns an error when bad data gets passed in", async () => {
      await request(app)
        .post('/products')
        .send(badProduct)
        .expect(400)
    });
  });

  describe("PUT /products/:id", () => {
    let product;
    const productData = {
      image: 'http://some.fakeUrl.com/',
      name: 'PUT product',
      price: 5,
    };
    const newData = {
      image: 'http://some.fakeUrl.com/',
      name: 'update product',
      price: 7,
    };
    const badData = {
      image: '',
      name: '',
      price: '7',
    };
    beforeEach(async () => {
      product = await Product.create(productData);
    });

    test("exists", async () => {
      await request(app)
        .put(`/products/${product.id}`)
        .send(newData)
        .expect(200)
    });

    test("returns the updated product if good data was passed in", async () => {
      const res = await request(app)
        .put(`/products/${product.id}`)
        .send(newData)
        .expect(200)
        .expect('Content-Type', /json/)

      expect(res.body).toEqual(expect.objectContaining({
        product: expect.objectContaining(newData)
      }));
    });

    test("returns an error when bad data gets passed in", async () => {
      await request(app)
        .put(`/products/${product.id}`)
        .send(badData)
        .expect(400)
    });

    test("returns a 404 status code if a product with that id is not found", async () => {
      await request(app)
        .put('/products/asdf')
        .send(newData)
        .expect(404)

      const productId = await Product.max('id');

      await request(app)
        .put(`/products/${productId + 1}`)
        .send(newData)
        .expect(404)
    });
  });

  describe("DELETE /products/:id", () => {
    let product;
    beforeEach(async () => {
      product = await Product.create({
        image: 'http://some.fakeUrl.com/',
        name: 'DELETE product',
        price: 8,
      });
    });

    test("exists and returns a 204 status code if the product with that id exists", async () => {
      await request(app)
        .delete(`/products/${product.id}`)
        .expect(204)
    });

    test("returns a 404 status code if a product with that id is not found", async () => {
      const productId = await Product.max('id');

      await request(app)
        .delete(`/products/${productId + 1}`)
        .expect(404)
    });
  });
});
