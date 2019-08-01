import { HttpError, HttpErrorDetails } from './HttpError';

export class BadRequestException extends HttpError {
  readonly name: string = 'Bad request';
  readonly code: number = 400;

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
