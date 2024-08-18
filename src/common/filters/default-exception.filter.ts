import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { DefaultResponseInterface } from '../interfaces/reformating-response.interface';

@Catch(HttpException)
export class DefaultExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<DefaultResponseInterface>>();
    response.status(exception.getStatus()).json({
      success: false,
      statusCode: exception.getStatus(),
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
