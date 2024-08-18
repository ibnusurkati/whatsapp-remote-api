import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { decamelizeKeys } from 'humps';
import { Observable, map } from 'rxjs';
import { MessageEventSseDTO } from '../dtos/sse.dto.js';
import { DefaultResponseInterface } from '../interfaces/reformating-response.interface.js';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<DefaultResponseInterface | MessageEventSseDTO> {
    return next.handle().pipe<DefaultResponseInterface | MessageEventSseDTO>(
      map((response) => {
        if (response.type) return response;
        const {
          success,
          statusCode,
          timestamp,
          message,
          data,
          paginate,
          ...anyData
        } = response as DefaultResponseInterface;
        if (statusCode) context.switchToHttp().getResponse().status(statusCode);

        return decamelizeKeys({
          success: success ?? true,
          statusCode: context.switchToHttp().getResponse().statusCode,
          timestamp: timestamp ?? new Date().toISOString(),
          message: message ?? 'Successfully!',
          data: data ?? (JSON.stringify(anyData) === '{}' ? null : anyData),
          paginate,
        });
      }),
    );
  }
}
