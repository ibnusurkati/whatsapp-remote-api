import { Expose, Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
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
  @NoSpecialChar()
  @WhatsappId()
  to: string;

  @ValidateNested({ each: true })
  @Type(() => Array<ContactTemplate>)
  contacts: ContactTemplate[];
}
