import { StatusCodes } from "http-status-codes";

export class RestError extends Error {
  constructor(message: string, public statusCode: StatusCodes) {
    super(message);
  }

  static isRestError(e: Error | RestError): e is RestError {
    return (<RestError>e).statusCode !== undefined;
  }
}
