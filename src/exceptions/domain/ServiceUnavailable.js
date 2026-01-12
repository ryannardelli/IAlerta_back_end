class InternalServiceError extends Error() {
  constructor(message = "Ocorreu um erro inesperado no servidor.") {
    super(message);
    this.message = "InternalServerError";
    this.statusCode = 500;
  }
}

module.exports = InternalServiceError;