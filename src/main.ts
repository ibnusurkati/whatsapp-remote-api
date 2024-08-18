import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { utilities, WinstonModule } from 'nest-winston';
import { createLogger, format, transports } from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger({
      instance: createLogger({
        level: process.env.APP_LOG_LEVEL || 'info',
        format: format.combine(
          format.timestamp(),
          format.ms(),
          utilities.format.nestLike(process.env.APP_NAME, {
            colors: process.env.NODE_ENV === 'development',
            prettyPrint: process.env.NODE_ENV === 'development',
          }),
        ),
        transports: [new transports.Console()],
      }),
    }),
  });

  // Increase the limit for the body parser
  app.use(bodyParser.json({ limit: '2mb' }));
  app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));

  // set global prefix
  app.setGlobalPrefix('api/v1');

  // set validate pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(
    process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8000,
  );
}
bootstrap();
