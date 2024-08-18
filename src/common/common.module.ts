import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EnvironmentModule } from './environment/environment.module';
import { DefaultExceptionFilter } from './filters/default-exception.filter';
import { ResponseFormatInterceptor } from './interceptors/response-format.interceptor';

@Module({
  imports: [EventEmitterModule.forRoot(), EnvironmentModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DefaultExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatInterceptor,
    },
  ],
})
export class CommonModule {}
