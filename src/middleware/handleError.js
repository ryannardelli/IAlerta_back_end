import { InternalServiceError } from ("../exceptions/domain/InternalServiceError");

function handlError(err, req, res, next) {
  if(err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message
    });

    const internalError = new InternalServiceError();

    res.status(internalError.statusCode).json({
      message: internalError.message
    })
  }
}

module.exports = handlError;