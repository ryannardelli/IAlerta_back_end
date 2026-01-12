import detectAIContent from "../services/detectAIService.js";

export default async function detectAI(req, res, next) {
  const { text } = req.body;
  
  try {
    const result = await detectAIContent(text);
    return res.json(result);
  } catch (error) {
    next(error);
  }
}