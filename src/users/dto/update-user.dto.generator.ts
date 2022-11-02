import * as faker from 'faker'
import { UpdateUserDto } from './update-user.dto'

export const generateUpdateUserDto = (
  seed: number,
  password?: string
): UpdateUserDto => {
  faker.seed(seed)

  return {
    fullName: faker.name.findName(),
    isAdmin: faker.datatype.boolean(),
    email: faker.internet.email(),
    password: password
  } as UpdateUserDto
}
