import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Summoner } from 'src/sql/summoners/entities/summoner.entity'
import { SummonerService } from 'src/sql/summoners/summoner.service'
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
  const moduleBuilder = await Test.createTestingModule({
    imports: [AppModule]
  })

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
