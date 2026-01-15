import { InvalidText } from '../exceptions/common/InvalidText.js';
import { MaxTextLenghtExtractFromArchive } from '../exceptions/common/MaxTextLenghtExtractFromArchive.js';
import { MinTextLenghtExtractFromArchive } from '../exceptions/common/MinTextLenghtExtractFromArchive.js';
import { InternalServiceDocument } from '../exceptions/domain/InternalServiceDocument.js';
import catch_api_token from '../utils/catch_api_token.js';
import normalizeText from '../utils/normalizeText.js';

const HF_TOKEN = catch_api_token();
const MODEL_URL = 'https://router.huggingface.co/hf-inference/models/openai-community/roberta-base-openai-detector';

const CHUNK_SIZE = 1000;

export default async function detectAIArchiveService(text) {
  if (!text || typeof text !== "string") throw new InvalidText();
  if (text.length < 50) throw new MinTextLenghtExtractFromArchive();
  if (text.length > 3000) throw new MaxTextLenghtExtractFromArchive();

  const textClean = normalizeText(text);

  const chunks = [];
  for (let i = 0; i < textClean.length; i += CHUNK_SIZE) {
    chunks.push(textClean.slice(i, i + CHUNK_SIZE));
  }

  const results = [];

  for (const chunk of chunks) {
    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: chunk })
    });

    if (!response.ok) {
      console.error("Erro ao chamar Hugging Face:", response.status, response.statusText);
      throw new InternalServiceDocument();
    }

    const data = await response.json();
    results.push(data);
  }

  return results;
}
