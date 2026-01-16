import detectAIArchiveService from "../services/detectAIArchiveService.js";
import { extractTextFromFile } from "../services/extractTextFromFile.js";

export default async function detectAIArchiveController(req, res, next) {
  try {
    const text = await extractTextFromFile(req.file.path, req.file.mimetype);
    const result = await detectAIArchiveService(text);

    res.status(200).json(result);
  } catch(error) {
    next(error);
  }
}

