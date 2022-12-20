import { Type } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Validator } from 'class-validator'

export const isValid = async (arg: Type, body: unknown): Promise<boolean> => {
  const validator = new Validator()
  const transformedInput = plainToClass(arg, body)
  const errors = await validator.validate(transformedInput)

  return errors.length === 0
}
