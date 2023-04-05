const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fsPromise = require("fs").promises;
const fs = require("fs");
const path = require("path");

const logHandler = async (data, logFileName) => {
  const date = format(new Date(), "yyyy-MM-dd, hh:mm:ss");
  const logData = `${date}, ${uuid()}, ${data}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fs.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logData
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  const reqData = `URL: ${req.url}, METHOD: ${req.method}`;
  logHandler(reqData, "reqLog.log");
  next();
};

module.exports = { logger, logHandler };
