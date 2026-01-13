import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export async function extractTextFromFile(filePath, mimetype) {
  if(mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }

  if(mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const data = await mammoth.extractRawText({ path: filePath });
    return data.value;
  }

  return null;
}