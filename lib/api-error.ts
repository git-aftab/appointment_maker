export class ApiError extends Error {
  statusCode: number;
  success: boolean;
  data: string | null;
  errors: Array<string>;

  constructor(
    statusCode: number,
    message: string = "Something went wrong!",
    errors: string[] = [],
    stack: string = "",
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
