import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

export interface HttpResponse<T> {
  code: string;
  message: string;
  result: T[];
}

@Injectable()
export class HttpInterceptor<T>
  implements NestInterceptor<HttpResponse<T>, HttpResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<HttpResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const status = ctx.getResponse<Response>().statusCode;
        const res: HttpResponse<T> = {
          code: String(status),
          message: 'success',
          result: null,
        };
        let result = null;
        if (data) {
          if (Array.isArray(data)) {
            result = { result: data };
          } else {
            result = { result: data };
          }
        } else {
          result = {};
        }
        return {
          ...res,
          ...result,
        };
      }),
    );
  }
}
