export default function normalizeText(text) {
  return text
    .replace(/\r\n|\r|\n/g, " ") // remove quebras de linha
    .replace(/\s+/g, " ")        // substitui múltiplos espaços por um único
    .trim();                      // remove espaços no início/fim
}