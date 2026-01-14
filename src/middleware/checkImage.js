import { EmptyImageError } from "../exceptions/common/EmptyImageError.js";

export function checkImage(req, res, next) {
  if (!req.file) throw new EmptyImageError();

  next();
}
