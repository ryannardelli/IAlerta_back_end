export class InvalidFormatHug extends Error {
  constructor(message = "Formato inesperado da Hugging Face.") {
    super(message);
    this.message = "InvalidFormatHug";
    this.statusCode = 500;
  }
}