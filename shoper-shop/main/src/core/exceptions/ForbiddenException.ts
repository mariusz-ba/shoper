import { HttpError, HttpErrorDetails } from './HttpError';

export class ForbiddenException extends HttpError {
  readonly name: string = 'Forbidden';
  readonly code: number = 403;

  constructor(readonly message: string, readonly data: any = null) {
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
