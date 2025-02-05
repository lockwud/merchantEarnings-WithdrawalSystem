const HttpException = require("../utils/httpError")
const HttpStatus  = require("../utils/httpStatus");
function ErrorHandler(error, req, res, next) {
    let httpError;
  
    if (error instanceof HttpException) {
      httpError = error;
    } else {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || 'Internal Server Error';
      httpError = new HttpException(status, message);
    }
  
    res.status(httpError.status).json({
      status: httpError.status,
      message: httpError.message,
    });
  }
  
  const throwError = (status, message) => {
    throw new HttpException(status, message);
  };

  module.exports = { ErrorHandler, throwError };