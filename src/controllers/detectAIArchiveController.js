import detectAIArchiveService from "../services/detectAIArchiveService.js";

export default async function detectAIArchiveController(req, res, next) {
  try {
    const result = await detectAIArchiveService(req.file.path);

    res.status(200).json(result);
  } catch(error) {
    next(error);
  }
}