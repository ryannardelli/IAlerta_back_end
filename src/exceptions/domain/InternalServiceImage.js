export class InternalServiceImage extends Error {
  constructor(message = "Falha ao processar a imagem.") {
    super(message);
    this.name = "InternalServiceImage";
    this.statusCode = 502;
  }
}