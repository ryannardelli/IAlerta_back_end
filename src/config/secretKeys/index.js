import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3333;
export const HF_TOKEN = process.env.HF_TOKEN;