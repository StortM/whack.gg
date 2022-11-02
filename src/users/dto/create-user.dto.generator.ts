import * as faker from 'faker'
import { CreateUserDTO } from './create-user.dto'

export const generateCreateUserDTO = (seed: number): CreateUserDTO => {
  faker.seed(seed)

  return {
    fullName: faker.name.findName(),
    isAdmin: faker.datatype.boolean(),
    email: faker.internet.email(),
    password: faker.internet.password()
  } as CreateUserDTO
}
