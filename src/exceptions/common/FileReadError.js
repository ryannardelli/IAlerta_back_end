export class FileReadError extends Error {
  constructor(message = "Falha ao acessar o arquivo.") {
    super(message);
    this.name = "FileReadError";
    this.statusCode = 500;
  }
}