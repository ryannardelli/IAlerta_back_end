import detectAIContentService from "../services/detectAIContentService.js";

export default async function detectAI(req, res, next) {
  const { text } = req.body;
  
  try {
    const result = await detectAIContentService(text);
    return res.json(result);
  } catch (error) {
    next(error);
  }
}