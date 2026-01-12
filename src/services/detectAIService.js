// import catch_api_token from "../utils/catch_api_token.js";
// import catch_url_api_text from "../utils/catch_url_api_text.js";

// const HF_TOKEN = catch_api_token();
// const API_URL = catch_url_api_text();

// export async function detectAIContent(text) {
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${HF_TOKEN}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//   inputs: {
//     text: text
//   },
//   parameters: {
//     candidate_labels: ["AI-generated", "Human-written"]
//   }
// })

//   });

//   // 🔥 IMPORTANTE: leia como texto primeiro
//   const raw = await response.text();

//   let data;
//   try {
//     data = JSON.parse(raw);
//   } catch {
//     console.error("Resposta não JSON:", raw);
//     throw new Error("Resposta inválida da Hugging Face");
//   }

//   if (!response.ok) {
//     console.error("Erro HF:", data);
//     throw new Error(data?.error || "Erro na Hugging Face");
//   }

//   const result = data[0];

//   return {
//     likelihood: result.label === "FAKE" ? "AI-generated" : "Human-written",
//     confidence: result.score,
//     provider: "huggingface",
//     raw: result,
//   };
// }

import catch_api_token from "../utils/catch_api_token.js";
import catch_url_api_text from "../utils/catch_url_api_text.js";

const HF_TOKEN = catch_api_token();
const API_URL = catch_url_api_text();

export async function detectAIContent(text) {
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
    throw new Error("Resposta inválida da Hugging Face");
  }

  if (!response.ok) {
    console.error("Erro HF:", data);
    throw new Error(data?.error || "Erro na Hugging Face");
  }

  const topResult = Array.isArray(data) ? data[0] : data;

  if (!topResult?.label || topResult?.score === undefined) {
    console.error("Formato inesperado HF:", data);
    throw new Error("Formato inesperado da Hugging Face");
  }

  return {
    likelihood: topResult.label,
    confidence: Number(topResult.score.toFixed(3)),
    provider: "huggingface",
    raw: data
  };

}
