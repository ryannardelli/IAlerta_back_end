import detectAI_ImageService from "../services/detectAI_ImageService.js";

export default async function detectAI_ImageController(req, res, next) {
  try {
    const result = await detectAI_ImageService(req.file.path);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}