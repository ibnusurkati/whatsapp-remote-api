import { IsNumber, IsString, Max, Min } from 'class-validator';
import { NoSpecialChar } from 'src/common/validations/no-special-char.validator';
import { WhatsappId } from 'src/common/validations/whatsapp-id.validator';

export class SendLocationDTO {
  @IsString()
  key: string;

  @IsString()
  @NoSpecialChar('only-emoji')
  @WhatsappId()
  to: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}
