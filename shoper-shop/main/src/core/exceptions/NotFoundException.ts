import { HttpError, HttpErrorDetails } from './HttpError';

export class NotFoundException extends HttpError {
  readonly name: string = 'Not found';
  readonly code: number = 404;

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
