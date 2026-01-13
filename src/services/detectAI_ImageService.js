import fs from 'fs';
import catch_api_token from '../utils/catch_api_token.js';
import { InternalServiceImage } from '../exceptions/domain/InternalServiceImage.js';

const HF_TOKEN = catch_api_token();
const MODEL_URL = 'https://router.huggingface.co/hf-inference/models/Ateeqq/ai-vs-human-image-detector';

export default async function detectAI_ImageService(imagePath) {

    const imageBuffer = fs.readFileSync(imagePath);

   const response = await fetch(MODEL_URL, {
   method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/octet-stream",
    },
    body: imageBuffer,
});

    if(!response.ok) {
        const text = await response.text();
        console.error("Hugging Face error:", text);
        throw new InternalServiceImage()
    };

    return await response.json();
}