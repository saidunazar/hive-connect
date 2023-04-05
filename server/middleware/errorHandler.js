const { logHandler } = require("./logger");

const errorHandler = (err, req, res, next) => {
  const logData = `Error ${err.name}, Error Message: ${err.message}, URL: ${req.url}, METHOD: ${req.method}, ORIGIN: ${req.header.origin}`;
  logHandler(logData, "errLog.log");
  console.log(err.stack);
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({ sucess: false, message: err.message });
};

module.exports = errorHandler;
