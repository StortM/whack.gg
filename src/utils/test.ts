import * as faker from 'faker'
export const getFakeLowerCaseTrimmedEmail = (): string =>
  faker.internet.email().toLowerCase().trim()
