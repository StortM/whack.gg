/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator'

@ValidatorConstraint({ name: 'containsNoEmoji', async: false })
export class ContainsNoEmoji implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments): boolean {
    // you probably want a library that has an updated version whenever the unicode specification adds more emoji
    const emojiRegex =
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi // taken from https://dev.to/melvin2016/how-to-check-if-a-string-contains-emojis-in-javascript-31pe
    return !emojiRegex.test(text)
  }

  defaultMessage(args: ValidationArguments): string {
    // here you can provide default error message if validation failed
    return 'Text ($value) contains emoji!'
  }
}
