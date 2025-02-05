class HttpException extends Error {
    constructor(status, message) {
      if (message instanceof Error) {
        super(message.message);
        this.stack = message.stack;
      } else {
        super(message ? message.toString() : '');
        this.name = 'HttpException';
      }
      this.status = status;
      Error.captureStackTrace(this, this.constructor);
    }
  }

module.exports = HttpException;