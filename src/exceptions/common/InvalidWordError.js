export class InvalidWordError extends Error {
  constructor(message = "Falha ao extrair texto do Word. O arquivo pode estar corrompido.") {
    super(message);
    this.name = "InvalidWordError";
    this.statusCode = 422;
  }
}
