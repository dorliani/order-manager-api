const Order = require("../models/orders");
const asyncHandler = require("express-async-handler");
const ApiError = require("../error/apiError");
const logger = require("../../config/logger");

module.exports = {
  postOrder: asyncHandler(async (req, res, next) => {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send({ order, message: "Start working on your order" });

    if (process.env.NODE_ENV !== "test")
      logger.info(
        `${req.originalUrl} ${req.method} Posted a new order, id - ${order._id}`
      );
  }),

  getOrdersFromTheLastDay: asyncHandler(async (req, res, next) => {
    const orders = await Order.find({
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    })
      .limit(parseInt(req.query.limit || 0))
      .skip(parseInt(req.query.skip || 0));

    if (!orders) {
      const error = new ApiError(500, "Something went wrong");
      return res.status(error.code).send(error.message);
    }

    if (process.env.NODE_ENV !== "test")
      logger.info(`${req.originalUrl} ${req.method} Got the orders`);

    res.status(200).send(orders);
  }),
};
