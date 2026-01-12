export class InvalidText extends Error {
  constructor(message = "Texto inválido para análise.") {
    super(message);
    this.name = "InvalidText";
    this.statusCode = 400;
  } 
}