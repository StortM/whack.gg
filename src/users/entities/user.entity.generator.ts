import * as faker from 'faker'
import * as bcrypt from 'bcrypt'
import { User } from './user.entity'
import { getFakeLowerCaseTrimmedEmail } from 'src/utils/test'

export const generateRegularUser = (seed: number, password?: string): User => {
  faker.seed(seed)
  const salt = bcrypt.genSaltSync(10)

  return {
    id: faker.datatype.uuid(),
    fullName: faker.name.findName(),
    isAdmin: false,
    email: getFakeLowerCaseTrimmedEmail(),
    passwordHash: password ?? bcrypt.hashSync(faker.internet.password(), salt),
    submissions: []
  } as User
}

export const generateAdminUser = (seed: number, password?: string): User => {
  faker.seed(seed)
  const salt = bcrypt.genSaltSync(10)

  return {
    id: faker.datatype.uuid(),
    fullName: faker.name.findName(),
    isAdmin: true,
    email: getFakeLowerCaseTrimmedEmail(),
    passwordHash: password ?? bcrypt.hashSync(faker.internet.password(), salt),
    submissions: []
  } as User
}
