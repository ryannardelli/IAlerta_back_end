const MAX_TEXT_LENGTH = 3000; // caracteres

class MaxTextLenght extends Error {
  constructor(message = `Texto muito grande! Máximo permitido: ${MAX_TEXT_LENGTH} caracteres.`) {
    super(message);
    this.message = "MaxTextLenght";
    this.statusCode = 413;
  }
}
