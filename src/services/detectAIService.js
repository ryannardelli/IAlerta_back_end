import catch_api_key from "../utils/catch_api_key.js";
import catch_url_api_text from "../utils/catch_url_api_text.js";

const API_KEY = catch_api_key();
const API_URL = catch_url_api_text();

export async function detectAIContent(text) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: text }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("Erro na API de detecção:", errData);
      throw new Error("Falha ao detectar conteúdo");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na API de detecção:", error.message);
    throw new Error("Falha ao detectar conteúdo");
  }
}
