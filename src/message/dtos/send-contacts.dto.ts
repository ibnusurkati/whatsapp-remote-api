import { Expose, Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { NoSpecialChar } from 'src/common/validations/no-special-char.validator';
import { WhatsappId } from 'src/common/validations/whatsapp-id.validator';

class ContactTemplate {
  @Expose({ name: 'full_name' })
  @IsString()
  fullName: string;

  @IsString()
  organization: string;

  @Expose({ name: 'phone_number' })
  @IsString()
  phoneNumber: string;
}

export class SendContactsDTO {
  @IsString()
  key: string;

  @IsString()
  @NoSpecialChar('only-emoji')
  @WhatsappId()
  to: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactTemplate)
  contacts: ContactTemplate[];
}
