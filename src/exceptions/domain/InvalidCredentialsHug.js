export class InvalidCredentialsHug extends Error {
  constructor(message = "Autenticação inválida na Hugging Face") {
      super(message);
      this.name = "InvalidCredetialsHug";
      this.statusCode = 401;
  }
}