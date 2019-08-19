export class Result<T, E> {
  public readonly ok?: T | null;
  public readonly error?: E | null;

  constructor(options: { ok?: T | null; error?: E | null }) {
    this.ok = options.ok || null;
    this.error = options.error || null;
  }
}