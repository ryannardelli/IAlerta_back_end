import multer from "multer";
import { InternalServiceError } from "../exceptions/domain/InternalServiceError.js";

export function handleError(err, req, res, next) {
  console.error(err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        error: "InvalidUploadField",
        message: "Campo de arquivo inválido ou inesperado."
      });
    }

    return res.status(400).json({
      error: "UploadError",
      message: "Erro ao processar o upload do arquivo."
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message
    });
  }

  const internalError = new InternalServiceError();

  return res.status(internalError.statusCode).json({
    error: internalError.name,
    message: internalError.message
  });
}
