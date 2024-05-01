const { CustomApiError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError)
    return res.status(err.statusCode).json({ error: err.message });
  return res.status(500).json({ error: err.message });
};

module.exports = errorHandlerMiddleware;
