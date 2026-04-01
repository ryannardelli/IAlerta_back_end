import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import mammoth from "mammoth";

import { InvalidDocumentType } from "../exceptions/common/InvalidDocumentType.js";
import { InvalidPDFError } from "../exceptions/common/InvalidPDFError.js";
import { InvalidWordError } from "../exceptions/common/InvalidWordError.js";
import { EmptyFileError } from "../exceptions/common/EmptyFileError.js";

export async function extractTextFromFile(buffer, mimetype) {
  if (!buffer) throw new EmptyFileError();

  // 🔹 PDF
  if (mimetype === "application/pdf") {
    try {
      const data = await pdfParse(buffer);

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

  // 🔹 WORD (DOCX)
  if (mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    try {
      const result = await mammoth.extractRawText({ buffer });

      if (!result.value || result.value.trim() === "") {
        throw new EmptyFileError();
      }

      console.log("Texto extraído do Word com sucesso.");
      return result.value;

    } catch (err) {
      if (err instanceof EmptyFileError) throw err;
      console.error("Erro ao processar Word:", err.message);
      throw new InvalidWordError();
    }
  }

  throw new InvalidDocumentType();
}