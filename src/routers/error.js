const apiError = require("../error/apiError");

const errorRouter = (req, res, next) => {
  const error = new apiError(404, "Not found");
  next(error);
};

module.exports = errorRouter;
