import { HttpError, HttpErrorDetails } from './HttpError';

export class ForbiddenException extends HttpError {
  readonly name: string = 'Forbidden';
  readonly code: number = 403;

  constructor(readonly message: string) {
    super();
  }

  toJson(): HttpErrorDetails {
    return {
      name: this.name,
      code: this.code,
      message: this.message
    };
  }
}
