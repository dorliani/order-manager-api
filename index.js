const app = require("./app.js");

const logger = require("./config/logger");

const port = process.env.PORT;

app.listen(port, () => {
  logger.log("info", "Server is up on port " + port);
});
