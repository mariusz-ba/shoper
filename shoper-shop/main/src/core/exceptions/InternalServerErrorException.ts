import { HttpError, HttpErrorDetails } from './HttpError';

export class InternalServerErrorException extends HttpError {
  readonly name: string = 'Internal server error';
  readonly code: number = 500;

  constructor(
    readonly message: string = '',
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
