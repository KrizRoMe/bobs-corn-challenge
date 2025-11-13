export class RateLimitError extends Error {
  statusCode: number;

  constructor(message = "Too many requests, please wait a minute") {
    super(message);
    this.name = "RateLimitError";
    this.statusCode = 429;
  }
}
