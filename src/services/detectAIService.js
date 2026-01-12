import { InvalidText } from "../exceptions/common/InvalidText.js";
import { InvalidCredentialsHug } from "../exceptions/domain/InvalidCredentialsHug.js";
import { InvalidFormatHug } from "../exceptions/domain/InvalidFormatHug.js";
import { ServiceUnavailable } from "../exceptions/domain/ServiceUnavailable.js";

import catch_api_token from "../utils/catch_api_token.js";
import catch_url_api_text from "../utils/catch_url_api_text.js";

const HF_TOKEN = catch_api_token();
const API_URL = catch_url_api_text();

export default async function detectAIContent(text) {

  if(!text || typeof text !== "string") throw new InvalidText();
  if(text.length > 3000) throw new Max();

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: {
        text: text
      },
      parameters: {
        candidate_labels: ["AI-generated", "Human-written"]
      }
    }),
  });

  const raw = await response.text();

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    console.error("Resposta não JSON:", raw);
    throw new ServiceUnavailable();
  }

  if (!response.ok) {
    console.error("Erro HF:", data);
    throw new InvalidCredentialsHug();
  }

  const topResult = Array.isArray(data) ? data[0] : data;

  if (!topResult?.label || topResult?.score === undefined) {
    console.error("Formato inesperado HF:", data);
    throw new InvalidFormatHug();
  }

  return {
    likelihood: topResult.label,
    confidence: Number(topResult.score.toFixed(3)),
    provider: "huggingface",
    raw: data
  };

}
