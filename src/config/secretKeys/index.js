import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3333;
export const COPYLEAKS_API_KEY = process.env.COPYLEAKS_API_KEY;
export const IMAGE_API_KEY = process.env.IMAGE_API_KEY;