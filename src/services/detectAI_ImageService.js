import fs from 'fs';

import catch_api_token from '../utils/catch_api_token.js';
import { InternalServiceImage } from '../exceptions/domain/InternalServiceImage.js';

const HF_TOKEN = catch_api_token();
const MODEL_URL = 'https://api-inference.huggingface.co/models/umm-maybe/AI-image-detector';

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

    if(!response.ok) throw new InternalServiceImage();

    return await response.json();
}