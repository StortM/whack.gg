import { INestApplication } from '@nestjs/common'
import { CryptService } from 'src/crypt/crypt.service'
import { Summoner } from 'src/sql/summoners/entities/summoner.entity'
import * as request from 'supertest'
import { factory, useSeeding } from 'typeorm-seeding'
import getTestApplication, { resetDatabase } from './utils/testApplication'

describe('/auth', () => {
  let app: INestApplication
  let endpoint: string
  let cryptService: CryptService
  let regularSummoner: Summoner
  let testPassword: string

  beforeAll(async () => {
    app = await getTestApplication()
    cryptService = app.get(CryptService)
    endpoint = '/auth/'

    await useSeeding()
  })

  afterAll(async () => {
    await resetDatabase()
    await app.close()
  })

  beforeEach(async () => {
    await resetDatabase()

    // create regular and admin users
    testPassword = 'testpassword'
    regularSummoner = await factory(Summoner)({
      summonerName: 'regularsummoner',
      password: testPassword,
      cryptService
    }).create()
  })

  describe('POST /login', () => {
    it('Can not log in if user does not exist', async () => {
      const result = await request(app.getHttpServer())
        .post(`${endpoint}login`)
        .send({ summonerName: 'testname', password: 'banankage' })
        .expect(401)
      expect(result.body?.accessToken).toBeUndefined()
    })
    it('Can log in if user exists', async () => {
      const result = await request(app.getHttpServer())
        .post(`${endpoint}login`)
        .send({
          summonerName: regularSummoner.summonerName,
          password: testPassword
        })
        .expect(201)
      expect(result.body?.accessToken).toBeDefined()
    })
  })
})
