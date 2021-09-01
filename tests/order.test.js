const request = require("supertest");
const app = require("../app.js");

const mongoose = require("mongoose");
const Order = require("../src/models/orders");

const order = {
  name: "dor",
  email: "dor@gmail.com",
  city: "Rishon",
  street: "Mivtza",
};

beforeEach(async () => {
  await Order.deleteMany();
  await new Order(order).save();
});

afterAll(async () => {
  await mongoose.disconnect();
});

test("Should create a new order", async () => {
  const res = await request(app)
    .post("/orders")
    .send({
      name: "Daniel",
      email: "daniel@gmail.com",
      city: "Rishon",
      street: "Mivtza",
    })
    .expect(201);

  const theOrder = await Order.findById(res.body.order._id);
  expect(theOrder).not.toBeNull();

  expect(res.body).toMatchObject({
    order: {
      name: "Daniel",
      email: "daniel@gmail.com",
      city: "Rishon",
      street: "Mivtza",
    },
  });
});

test("Should not create a new order", async () => {
  const copyOrder = { ...order, email: "wrongmail.com" };
  await request(app).post("/orders").send(copyOrder).expect(500);
});

test("Should get orders from the last day", async () => {
  const res = await request(app).get("/orders").send().expect(200);
  expect(res.body.length).toEqual(1);
});
