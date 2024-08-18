import { Expose } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';
import { MessageFile } from 'src/common/validations/message-file.validator';
import { NoSpecialChar } from 'src/common/validations/no-special-char.validator';
import { WhatsappId } from 'src/common/validations/whatsapp-id.validator';

export class SendDocumentDTO {
  @IsString()
  key: string;

  @IsString()
  @NoSpecialChar()
  @WhatsappId()
  to: string;

  @IsString()
  @MessageFile()
  file: string;

  @IsString()
  @MaxLength(2000)
  caption: string;

  @IsString()
  mimetype: string;

  @Expose({ name: 'file_name' })
  @IsString()
  fileName: string;
}
