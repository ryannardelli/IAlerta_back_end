const MIN_TEXT_LENGTH = 50; // caracteres

export class MinTextLength extends Error {
  constructor(message = `Texto muito curto! Digite pelo menos ${MIN_TEXT_LENGTH} caracteres para análise..`) {
    super(message);
    this.name = "MinTextLength";
    this.statusCode = 400;
  }
}