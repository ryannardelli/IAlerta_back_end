import { detectAIContent } from "../services/detectAIService.js";

export default async function detectAI(req, res) {
  // console.log("Requisição recebida:", req.body);
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Texto é obrigatório" });
  }

  try {
    const result = await detectAIContent(text);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}