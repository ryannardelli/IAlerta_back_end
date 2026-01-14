export class EmptyImageError extends Error {
  constructor(message = "Nenhuma imagem foi enviada.") {
    super(message);
    this.name = "EmptyImageError";
    this.statusCode = 400;
  }
}
