import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import validator from 'validator';

@ValidatorConstraint({ async: false })
export class MessageFileConstraint implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    if (!validator.isURL(text) && !validator.isBase64(text)) return false;
    return true;
  }

  defaultMessage(): string {
    return 'Format is not appropriate, make sure it contains a base64 or URL';
  }
}

export function MessageFile(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: MessageFileConstraint,
    });
  };
}
