export class ServiceUnavailable extends Error {
  constructor(message = "Serviço temporariamente indisponível, tente novamente mais tarde.") {
    super(message);
    this.name = "ServiceUnavailable";
    this.statusCode = 503;
  }
}