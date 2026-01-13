export class EmptyFileError extends Error {
  constructor(message = "Arquivo enviado não contém texto para análise.") {
    super(message);
    this.name = "EmptyFileError";
    this.statusCode = 400;
  }
}
