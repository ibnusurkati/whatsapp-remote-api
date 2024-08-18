import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentSchema } from './environment.schema';

export const EnvironmentModule: DynamicModule = ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: EnvironmentSchema,
});
