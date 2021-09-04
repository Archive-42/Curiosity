const request = require("supertest");

const server = require("./server.js");

it("should set db environment to testing", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("server", () => {
  describe("GET /", () => {
    it("should return 200", () => {
      // run the server
      // make a GET request to /
      // see that the http code of response is 200
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it("should return HTML", () => {
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.type).toMatch(/html/i);
        });
    });
  });
});
