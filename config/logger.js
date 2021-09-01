const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(
  (obj) => `${obj.timestamp} ${obj.level}: ${obj.message}`
);

const logger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.simple(),
    myFormat
  ),
  transports: [new transports.File({ filename: "logs/access.log" })],
});
module.exports = logger;
