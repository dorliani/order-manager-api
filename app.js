const express = require("express");
require("./src/db/mongoose");

const app = express();

const ordersRouter = require("./src/routers/orders.js");
const errorRouter = require("./src/routers/error");
const errorMiddleware = require("./src/middleware/error");

app.use(express.json());
app.use("/orders", ordersRouter);
app.use(errorRouter);
app.use(errorMiddleware);

module.exports = app;
