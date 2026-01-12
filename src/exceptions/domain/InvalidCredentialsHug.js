class InvalidCredentialsHug extends Error {
  constructor(message = "Autenticação inválida na Hugging Face") {
      super(message);
      this.message = "InvalidCredetialsHug";
      this.statusCode = 401;
  }
}