import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { parsePhoneNumber } from 'libphonenumber-js';
import { isJidGroup, isJidUser } from '../utils/helper';

@ValidatorConstraint({ name: 'whatsappId', async: false })
export class WhatsappIdConstraint implements ValidatorConstraintInterface {
  validate(text: string, _args: ValidationArguments) {
    if (isJidGroup(text) || isJidUser(text)) return true;
    try {
      const phoneNumber = parsePhoneNumber('+' + text);
      return phoneNumber.isPossible() && phoneNumber.isValid();
    } catch (error) {
      return false;
    }
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Whatsapp Id Invalid';
  }
}

export function WhatsappId(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: WhatsappIdConstraint,
    });
  };
}
