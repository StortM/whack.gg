import { INestApplication } from '@nestjs/common'
import { CryptService } from 'src/crypt/crypt.service'
import { Region } from 'src/sql/regions/entities/region.entity'
import { CreateSummonerDto } from 'src/sql/summoners/dto/create-summoner.dto'
import { Summoner } from 'src/sql/summoners/entities/summoner.entity'
import { SummonerService } from 'src/sql/summoners/summoner.service'
import * as request from 'supertest'
import { factory, useSeeding } from 'typeorm-seeding'
import getTestApplication, { resetDatabase } from './utils/testApplication'

describe('/summoner', () => {
  let app: INestApplication
  let endpoint: string
  let summonerService: SummonerService
  let cryptService: CryptService
  let regularSummoner: Summoner
  let regularToken: string
  let adminSummoner: Summoner
  let adminToken: string

  beforeAll(async () => {
    app = await getTestApplication()
    summonerService = app.get(SummonerService)
    cryptService = app.get(CryptService)
    endpoint = '/sql/summoner'

    await useSeeding()
  })

  afterAll(async () => {
    await resetDatabase()
    await app.close()
  })

  beforeEach(async () => {
    await resetDatabase()

    // create regular and admin users
    const password = 'testpassword'
    regularSummoner = await factory(Summoner)({
      summonerName: 'regularsummoner',
      password,
      cryptService
    }).create()

    regularToken = (
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ summonerName: regularSummoner.summonerName, password })
        .expect(201)
    ).body.accessToken

    const adminPassword = 'adminpassword'
    adminSummoner = await factory(Summoner)({
      summonerName: 'adminsummoner',
      password: adminPassword,
      cryptService,
      isAdmin: true
    }).create()

    adminToken = (
      await request(app.getHttpServer()).post('/auth/login').send({
        summonerName: adminSummoner.summonerName,
        password: adminPassword
      })
    ).body.accessToken

    // create a region
    await factory(Region)({ name: 'EUW' }).create()
  })

  describe('POST /summoner', () => {
    it('Can POST a summoner from a valid dto', async () => {
      const createSummonerDto = await factory(CreateSummonerDto)({
        summonerName: 'testsummoner',
        password: 'password',
        level: 123,
        icon: 456,
        regionName: 'EUW'
      }).make()

      const result = await request(app.getHttpServer())
        .post(endpoint)
        .send(createSummonerDto)
        .expect(201)

      const summoner = await summonerService.findOne(result.body.id, {
        relations: ['region']
      })

      expect(result.body).toBeDefined()
      expect(result.body.summonerName).toEqual(createSummonerDto.summonerName)
      expect(result.body.level).toEqual(createSummonerDto.level)
      expect(result.body.icon).toEqual(createSummonerDto.icon)
      expect(summoner?.region?.name).toEqual(createSummonerDto.regionName)
    })
    it('Can not POST a summoner in a region that does not exist', async () => {
      const createSummonerDto = await factory(CreateSummonerDto)({
        summonerName: 'testsummoner',
        password: 'password',
        level: 123,
        icon: 456
      }).make()

      const result = await request(app.getHttpServer())
        .post(endpoint)
        .send(createSummonerDto)
        .expect(400)

      expect(result.error).toBeDefined()
      expect(result.body.summoner).toBeUndefined()
    })
    it('Can not POST an admin summoner without admin token', async () => {
      const createSummonerDto = await factory(CreateSummonerDto)({
        summonerName: 'testsummoner',
        password: 'password',
        level: 123,
        icon: 456,
        regionName: 'EUW',
        isAdmin: true
      }).make()

      const result = await request(app.getHttpServer())
        .post(endpoint)
        .send(createSummonerDto)
        .expect(403)

      expect(result.error).toBeDefined()
      expect(result.body.summoner).toBeUndefined()
    })
    it('Can create an admin summoner with admin token', async () => {
      const createSummonerDto = await factory(CreateSummonerDto)({
        summonerName: 'testsummoner',
        password: 'password',
        level: 123,
        icon: 456,
        regionName: 'EUW',
        isAdmin: true
      }).make()

      const result = await request(app.getHttpServer())
        .post(endpoint)
        .send(createSummonerDto)
        .auth(adminToken, { type: 'bearer' })
        .expect(201)

      expect(result.body.isAdmin).toBe(true)
      expect(result.body.summonerName).toEqual(createSummonerDto.summonerName)
      expect(result.body.level).toEqual(createSummonerDto.level)
      expect(result.body.icon).toEqual(createSummonerDto.icon)
    })
  })
})
