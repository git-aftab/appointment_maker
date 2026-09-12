export class ApiResponse<T> {
  statusCode: number;
  success: boolean;
  data: T;
  message: string;

  constructor(statusCode: number, data: T, message: string = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.success = statusCode < 400;
    this.message = message;
  }
}
