import { HttpException } from '@nestjs/common';

export class BusinessException extends HttpException {
  error_code: string;
  constructor(error: { message: string; code: string }, status = 400) {
    super(error.message, status);
    this.error_code = error.code;
  }
}
