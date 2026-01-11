import dotenv from "dotenv";
dotenv.config();

export default function catch_api_key() {
    return process.env.WASITAIGENERATED_API_KEY?.trim();
}