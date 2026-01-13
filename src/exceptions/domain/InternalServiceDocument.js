export class InternalServiceDocument extends Error {
  constructor(message = "Falha ao processar o documento.") {
    super(message);
    this.name = "InternalServiceDocument";
    this.statusCode = 502;
  }
}