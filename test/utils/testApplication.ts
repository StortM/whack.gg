import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { RiotService } from 'src/sql/riot/riot.service'
import { MockRiotService } from 'src/sql/riot/riot.services.mock'
import { Summoner } from 'src/sql/summoners/entities/summoner.entity'
import { Connection } from 'typeorm'
import { AppModule } from '../../src/app.module'

export type TestUser = {
  userObject: Summoner
  auth: string
}

type testApp = {
  app: INestApplication
  testUsers: TestUser[]
}

let testApp: INestApplication

async function getTestApplication(): Promise<INestApplication> {
  if (!testApp) {
    testApp = await createTestingModule()
  }

  return testApp
}

async function createTestingModule(): Promise<INestApplication> {
  const mockRiotService = new MockRiotService()

  const moduleBuilder = await Test.createTestingModule({
    imports: [AppModule]
  })
    .overrideProvider(RiotService)
    .useValue(mockRiotService)

  const moduleFixture = await moduleBuilder.compile()
  const app = moduleFixture.createNestApplication()
  await app.init()

  return app
}

export const resetDatabase = async (): Promise<void> => {
  const connection = testApp.get(Connection)
  await connection.dropDatabase()
  await connection.synchronize(true)
}

export default getTestApplication
