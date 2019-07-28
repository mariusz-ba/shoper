export abstract class HttpError implements Error {
  public abstract name: string;
  public abstract code: number;
  public abstract message: string;

  abstract toJson(): HttpErrorDetails;
}

export interface HttpErrorDetails {
  name: string;
  code: number;
  message: string;
}
