export abstract class HttpError implements Error {
  public abstract name: string;
  public abstract code: number;
  public abstract message: string;
  public abstract data: any;

  abstract toJson(): HttpErrorDetails;
}

export interface HttpErrorDetails {
  name: string;
  code: number;
  message: string;
  data: any;
}
