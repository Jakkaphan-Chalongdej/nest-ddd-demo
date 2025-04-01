import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BusinessException } from '../exception/BusinessException.error';

@Catch(HttpException)
export class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const error_code =
      exception instanceof BusinessException
        ? exception.error_code
        : exception['response']?.code || '999999';
    const message =
      exception['response']?.message ||
      exception['response'] ||
      'unknown error';
    response.status(status).json({
      code: status,
      error_code: error_code,
      message: message,
    });
  }
}
