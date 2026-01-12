import { InternalServiceError } from "../exceptions/domain/InternalServiceError.js";

export function handleError(err, req, res, next) {
  console.log(err);
  
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