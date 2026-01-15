const maxLength = 3000;

export class MaxTextLenghtExtractFromArchive extends Error {
  constructor(message = `O documento é muito grande para análise. O tamanho máximo permitido é ${maxLength} caracteres.`) {
    super(message);
    this.name = "MaxTextLenghtExtractFromArchive";
    this.statusCode = 413;
  }
}