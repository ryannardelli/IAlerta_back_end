import dotenv from "dotenv";
dotenv.config();

export default function catch_api_token() {
    return process.env.HF_TOKEN?.trim();
}