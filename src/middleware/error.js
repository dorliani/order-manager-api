const logger = require("../../config/logger");

const errorMiddleware = (err, req, res, next) => {
  const { message = "Something went wrong", code = 500 } = err;
  if (process.env.NODE_ENV !== "test") logger.error(message, code);
  res.status(code).send(message);
};

module.exports = errorMiddleware;
