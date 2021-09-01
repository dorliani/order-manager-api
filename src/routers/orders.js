const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orders.js");

router.post("/", orderController.postOrder);

router.get("/", orderController.getOrdersFromTheLastDay);

module.exports = router;
