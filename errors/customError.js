class CustomError extends Error {
  httpStatusCode;
  timestamp;
  documentationUrl;

  constructor(httpStatusCode, message, documentationUrl) {
    if (message) {
      super(message);
    } else {
      super('An error has occurred');
    }

    this.httpStatusCode = httpStatusCode;
    this.timestamp = new Date().toISOString();
    this.documentationUrl = documentationUrl;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  CustomHttpError: CustomError,
};
