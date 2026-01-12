export class InternalServiceError extends Error {
  constructor(message = "Ocorreu um erro inesperado no servidor.") {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}