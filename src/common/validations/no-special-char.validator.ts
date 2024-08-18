import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'noSpecialChar', async: false })
export class NoSpecialCharConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const [type] = args.constraints as [
      'all' | 'only-emoji' | 'only-special-char',
    ];
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{23F0}\u{23F3}\u{25AA}\u{25FE}\u{25B6}\u{25C0}\u{25AA}\u{25FE}\u{25B6}\u{25C0}\u{25B8}\u{25C2}\u{25E6}\u{25E7}\u{25F1}\u{25FB}\u{25FD}\u{25FF}\u{260E}\u{2611}\u{261D}\u{2620}\u{2622}\u{2623}\u{2626}\u{262A}\u{262E}\u{262F}\u{2638}\u{2639}\u{263A}\u{2648}-\u{2653}\u{2660}\u{2663}\u{2665}\u{2666}\u{2668}\u{267B}\u{267F}\u{2692}\u{2694}\u{2696}\u{2697}\u{2699}\u{269B}\u{269C}\u{269D}\u{269E}\u{26A0}\u{26A1}\u{26A7}\u{26AA}\u{26AB}\u{26B0}\u{26B1}\u{26BD}-\u{26BF}\u{26C4}-\u{26CD}\u{26CF}-\u{26D3}\u{26D5}\u{26E9}-\u{26EA}\u{26F0}-\u{26F5}\u{26F8}\u{2702}\u{2705}\u{2708}-\u{270D}\u{270F}-\u{2712}\u{2714}\u{2716}\u{271D}\u{2721}\u{2728}\u{2733}-\u{2734}\u{2744}\u{2747}\u{274C}\u{274E}\u{2753}-\u{2755}\u{2757}\u{2763}-\u{2764}\u{2795}-\u{2797}\u{27A1}\u{27B0}\u{27BF}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}\u{2B1C}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}\u{1F000}-\u{1F6FF}\u{1F774}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20D0}-\u{20FF}\u{FE0F}\u{E0020}-\u{E007F}]/gu;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    switch (type) {
      case 'only-emoji':
        return !emojiRegex.test(text);
      case 'only-special-char':
        return !specialCharRegex.test(text);
      case 'all':
      default:
        return !emojiRegex.test(text) && !specialCharRegex.test(text);
    }
  }

  defaultMessage(args: ValidationArguments) {
    const [type] = args.constraints as [
      'all' | 'only-emoji' | 'only-special-char',
    ];
    switch (type) {
      case 'only-emoji':
        return 'The text contains emojis.';
      case 'only-special-char':
        return 'The text contains special character.';
      case 'all':
      default:
        return 'The text contains emojis or special character';
    }
  }
}

export function NoSpecialChar(
  type: 'all' | 'only-emoji' | 'only-special-char' = 'all',
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [type],
      validator: NoSpecialCharConstraint,
    });
  };
}
