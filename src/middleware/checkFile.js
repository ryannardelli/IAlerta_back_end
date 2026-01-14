import { EmptyFileError } from "../exceptions/common/EmptyFileError.js";

export function checkFile(req, res, next) {
  if (!req.file) throw new EmptyFileError();

  next();
}
