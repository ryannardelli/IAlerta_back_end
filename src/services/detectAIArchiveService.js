import { InvalidText } from '../exceptions/common/InvalidText.js';
import { MaxTextLenght } from '../exceptions/common/MaxTextLength.js';
import { MinTextLength } from '../exceptions/common/MinTextLength.js';
import { InternalServiceDocument } from '../exceptions/domain/InternalServiceDocument.js';
import catch_api_token from '../utils/catch_api_token.js';

const HF_TOKEN = catch_api_token();
const MODEL_URL = 'https://router.huggingface.co/hf-inference/models/openai-community/roberta-base-openai-detector';

export default async function detectAIArchiveService(text) {
  
  if(!text || typeof text !== "string") throw new InvalidText();
  if(text.length > 3000) throw new MaxTextLenght();
  if(text.length < 50) throw new MinTextLength();

  const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: text }),
    });

    if(!response.ok) {
      console.error("Erro ao chamar Hugging Face:", response.status, response.statusText);
      throw new InternalServiceDocument();
    }

    const data = await response.json();
    return data;
}
