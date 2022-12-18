/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator'

@ValidatorConstraint({ name: 'alphanumericAllowSpaces', async: false })
export class AlphanumericAllowSpaces implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments): boolean {
    const alphanumericAllowSpacesRegex = /^[a-z0-9 ]+$/i
    return alphanumericAllowSpacesRegex.test(text)
  }

  defaultMessage(args: ValidationArguments): string {
    // here you can provide default error message if validation failed
    return 'Text ($value) is not alphanumeric!'
  }
}
