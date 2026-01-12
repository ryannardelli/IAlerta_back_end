class InvalidText extends Error() {
  constructor(message = "Texto inválido para análise.") {
    super(message);
    this.message = "InvalidText";
    this.statusCode = 400;
  } 
}