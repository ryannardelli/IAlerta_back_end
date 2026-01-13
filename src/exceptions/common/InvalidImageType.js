export class InvalidImageType extends Error {
  constructor(message = "Formato de imagem não suportado") {
    super(message);
    this.name = "InvalidImageType";
    this.statusCode = 415;
  }
}