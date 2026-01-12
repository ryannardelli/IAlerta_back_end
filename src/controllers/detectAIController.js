import { detectAIContent } from "../services/detectAIService.js";

export default async function detectAI(req, res) {
  const { text } = req.body;
  
  try {
    const result = await detectAIContent(text);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}