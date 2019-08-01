import { HttpError, HttpErrorDetails } from './HttpError';

export class UnauthorizedException extends HttpError {
  readonly name: string = 'Unauthorized';
  readonly code: number = 401;

  constructor(
    readonly message: string,
    readonly data: any = null
  ) {
    super();
  }

  toJson(): HttpErrorDetails {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      data: this.data
    };
  }
}
