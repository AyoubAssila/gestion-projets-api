// classe erreur fiha code HTTP (kima NotFoundException, ConflictException fi Nest)
export default class HttpError extends Error {
  constructor(status, message) {
    // n3aytou l constructeur mta3 Error bech y7ott el message
    super(message);
    // nzidou el code HTTP (404, 409, 403...)
    this.status = status;
  }
}