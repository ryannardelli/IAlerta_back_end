import fs from "fs";
import pdfParse from 'pdf-parse/lib/pdf-parse.js'; // Importe direto do arquivo lib
import mammoth from "mammoth";

import { InvalidDocumentType } from "../exceptions/common/InvalidDocumentType.js";
import { FileReadError } from "../exceptions/common/FileReadError.js";
import { InvalidPDFError } from "../exceptions/common/InvalidPDFError.js";
import { InvalidWordError } from "../exceptions/common/InvalidWordError.js";
import { EmptyFileError } from "../exceptions/common/EmptyFileError.js";

export async function extractTextFromFile(filePath, mimetype) {
  if (!filePath) throw new EmptyFileError();

  // PDF ---
  if (mimetype === "application/pdf") {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      
      const data = await pdfParse(dataBuffer);

      if (!data.text || data.text.trim() === "") {
        throw new EmptyFileError();
      }

      console.log("Texto extraído do PDF com sucesso.");
      return data.text;

    } catch (err) {
      if (err instanceof EmptyFileError) throw err;
      console.error("Erro ao processar PDF:", err.message);
      throw new InvalidPDFError();
    }
  }

  // WORD ---
  if (mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    try {
      const data = await mammoth.extractRawText({ path: filePath });

      if (!data.value || data.value.trim() === "") {
        throw new EmptyFileError();
      }

      console.log("Texto extraído do Word com sucesso.");
      return data.value;

    } catch (err) {
      if (err instanceof EmptyFileError) throw err;
      console.error("Erro ao processar Word:", err.message);
      throw new InvalidWordError();
    }
  }

  throw new InvalidDocumentType();
}