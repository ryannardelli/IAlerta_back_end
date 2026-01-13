export class InvalidPDFError extends Error {
  constructor(message = "Falha ao extrair texto do PDF. O arquivo pode estar corrompido.") {
    super(message);
    this.name = "InvalidPDFError";
    this.statusCode = 422;
  }
}
