const minTextLenght = 50;

export class MinTextLenghtExtractFromArchive extends Error {
  constructor(message = `O documento é muito curto para análise. O tamanho mínimo permitido é ${minTextLenght} caracteres.`) {
    super(message);
    this.name = "MinTextLenghtExtractFromArchive";
    this.statusCode = 400;
  }
}