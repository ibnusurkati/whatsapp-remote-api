import { IsString } from 'class-validator';
import { MessageFile } from 'src/common/validations/message-file.validator';
import { NoSpecialChar } from 'src/common/validations/no-special-char.validator';
import { WhatsappId } from 'src/common/validations/whatsapp-id.validator';

export class SendStickerDTO {
  @IsString()
  key: string;

  @IsString()
  @NoSpecialChar('only-emoji')
  @WhatsappId()
  to: string;

  @IsString()
  @MessageFile()
  file: string;
}
