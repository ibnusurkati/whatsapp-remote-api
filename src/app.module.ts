import { Logger, Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [CommonModule, MessageModule],
  providers: [Logger],
})
export class AppModule {}
