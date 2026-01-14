import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

import { InvalidDocumentType } from "../exceptions/common/InvalidDocumentType.js";
import { FileReadError } from "../exceptions/common/FileReadError.js";
import { InvalidPDFError } from "../exceptions/common/InvalidPDFError.js";
import { InvalidWordError } from "../exceptions/common/InvalidWordError.js";
import { EmptyFileError } from "../exceptions/common/EmptyFileError.js";

export async function extractTextFromFile(filePath, mimetype) {

  if(!filePath) throw new EmptyFileError();
  
  // PDF
  if (mimetype === "application/pdf") {
    let dataBuffer;
    try {
      dataBuffer = fs.readFileSync(filePath);
    } catch (err) {
      console.error("Erro ao ler o arquivo PDF:", err.message);
      throw new FileReadError();
    }

    try {
      const data = await pdfParse(dataBuffer);
      if (!data.text || data.text.trim() === "") {
        throw new EmptyFileError();
      }
      return data.text;
    } catch (err) {
      console.error("Erro ao processar PDF:", err.message);
      if (err instanceof EmptyFileError) throw err;
      throw new InvalidPDFError();
    }
  }

  // Word
  if (mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    try {
      const data = await mammoth.extractRawText({ path: filePath });
      if (!data.value || data.value.trim() === "") {
        throw new EmptyFileError();
      }
      return data.value;
    } catch (err) {
      console.error("Erro ao processar Word:", err.message);
      if (err instanceof EmptyFileError) throw err;
      throw new InvalidWordError();
    }
  }

  throw new InvalidDocumentType();
}