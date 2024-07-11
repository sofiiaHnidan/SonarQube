const request = require("supertest");
const { app, server, db } = require("../index");

beforeAll((done) => {
  done();
});

afterAll((done) => {
  server.close(() => {
    db.close(done);
  });
});

describe("Product API", () => {
  it("GET /products - success", async () => {
    const response = await request(app).get("/products");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /products/:id - success", async () => {
    const response = await request(app).get("/products/1");
    expect(response.statusCode).toBe(200);
  });

  it("POST /products - success", async () => {
    const newProduct = { name: "BreadCrumps", price: 50 };
    const response = await request(app).post("/products").send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message", "Product added successfully.");
  });


});
