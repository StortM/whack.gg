import { INestApplication } from '@nestjs/common'
import { CryptService } from 'src/crypt/crypt.service'
import { Division } from 'src/sql/divisions/entities/division.entity'
import { GameMode } from 'src/sql/game-modes/entities/game-mode.entity'
import { Rank } from 'src/sql/ranks/entities/rank.entity'
import { Region } from 'src/sql/regions/entities/region.entity'
import { CreateSummonerDto } from 'src/sql/summoners/dto/create-summoner.dto'
import { UpdateSummonerDto } from 'src/sql/summoners/dto/update-summoner.dto'
import { Summoner } from 'src/sql/summoners/entities/summoner.entity'
import { SummonerService } from 'src/sql/summoners/summoner.service'
import { Tier } from 'src/sql/tiers/entities/tier.entity'
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
  let testTier: Tier
  let testDivision: Division
  let testGameMode: GameMode
  let testRegion: Region
  let testRank: Rank

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

    // create a region
    testTier = await factory(Tier)().create()
    testDivision = await factory(Division)().create()
    testGameMode = await factory(GameMode)().create()
    testRegion = await factory(Region)({ name: 'EUW' }).create()
    testRank = await factory(Rank)({
      regionId: testRegion.id,
      tierId: testTier.id,
      divisionId: testDivision.id,
      gameModeId: testGameMode.id
    }).create()

    // create regular and admin users
    const password = 'testpassword'
    regularSummoner = await factory(Summoner)({
      id: 1,
      summonerName: 'regularsummoner',
      password,
      rankId: testRank.id,
      regionId: testRegion.id,
      cryptService
    }).create()

    regularToken = (
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ summonerName: regularSummoner.summonerName, password })
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
  })

  describe('POST /summoner', () => {
    it('Can POST a summoner from a valid dto', async () => {
      // Arrange
      const createSummonerDto = await factory(CreateSummonerDto)({
        summonerName: 'testsummoner',
        password: 'password',
        level: 123,
        icon: 456,
        regionName: 'EUW'
      }).make()

      // Act
      const result = await request(app.getHttpServer())
        .post(endpoint)
        .send(createSummonerDto)
        .expect(201)

      const summoner = await summonerService.findOne(result.body.id, {
        relations: ['region']
      })

      // Assert
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, rankId, participants, masteries, regionId, region, ...rest } =
        result.body

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...createSummonerDtoNoPassword } = createSummonerDto

      expect({ ...rest, regionName: summoner?.region?.name }).toEqual(
        createSummonerDtoNoPassword
      )
    })
    it('Can not POST a summoner without a region', async () => {
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

  describe('PATCH /summoner/:id', () => {
    it('Can PATCH a summoner from a valid dto', async () => {
      // Arrange
      const updateSummonerDto = (await factory(CreateSummonerDto)({
        summonerName: 'testsummoner',
        password: 'password',
        level: 123,
        icon: 456,
        regionName: 'EUW'
      }).make()) as UpdateSummonerDto

      // Act
      const result = await request(app.getHttpServer())
        .patch(`${endpoint}/${regularSummoner.id}`)
        .send(updateSummonerDto)
        .auth(regularToken, { type: 'bearer' })
        .expect(200)

      // Assert
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, rankId, participants, masteries, regionId, region, ...rest } =
        result.body

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...updateSummonerDtoNoPassword } = updateSummonerDto

      expect({ ...rest, regionName: region?.name }).toEqual(
        updateSummonerDtoNoPassword
      )
    })

    it('Can not PATCH a summoner when not owning summoner', async () => {
      // Arrange
      const updateSummonerDto = (await factory(CreateSummonerDto)({
        summonerName: 'testsummoner',
        password: 'password',
        level: 123,
        icon: 456,
        regionName: 'EUW'
      }).make()) as UpdateSummonerDto

      const newSummoner = await factory(Summoner)().create()
      // Act
      const result = await request(app.getHttpServer())
        .patch(`${endpoint}/${newSummoner.id}`)
        .send(updateSummonerDto)
        .auth(regularToken, { type: 'bearer' })
        .expect(401)

      expect(result.error).toBeDefined()
    })

    it('Can not PATCH a summoner without access_token', async () => {
      // Arrange
      const updateSummonerDto = (await factory(CreateSummonerDto)({
        summonerName: 'testsummoner',
        password: 'password',
        level: 123,
        icon: 456,
        regionName: 'EUW'
      }).make()) as UpdateSummonerDto

      const newSummoner = await factory(Summoner)().create()
      // Act
      const result = await request(app.getHttpServer())
        .patch(`${endpoint}/${newSummoner.id}`)
        .send(updateSummonerDto)
        .expect(401)

      expect(result.error).toBeDefined()
    })

    it('Can PATCH a summoner when not owning summoner as admin', async () => {
      // Arrange
      const updateSummonerDto = (await factory(CreateSummonerDto)({
        summonerName: 'testsummoner',
        password: 'password',
        level: 123,
        icon: 456,
        regionName: 'EUW'
      }).make()) as UpdateSummonerDto

      const newSummoner = await factory(Summoner)().create()
      // Act
      const result = await request(app.getHttpServer())
        .patch(`${endpoint}/${newSummoner.id}`)
        .send(updateSummonerDto)
        .auth(adminToken, { type: 'bearer' })
        .expect(200)

      // Assert
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, rankId, participants, masteries, regionId, region, ...rest } =
        result.body

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...updateSummonerDtoNoPassword } = updateSummonerDto

      expect({ ...rest, regionName: region?.name }).toEqual(
        updateSummonerDtoNoPassword
      )
    })
  })

  describe('GET rank/:name', () => {
    it('Can GET a summoner with combined rank by name', async () => {
      // Arrange
      const summonerName = 'regularsummoner'

      const expected = {
        summonerName,
        rank: `${testDivision.name} ${testTier.value}`,
        lp: testRank.lp
      }

      // Act
      const result = await request(app.getHttpServer())
        .get(`${endpoint}/rank/${summonerName}`)
        .expect(200)

      // Assert
      expect(result.body).toEqual(expected)
    })

    it('Can not GET a summoner if not exist', async () => {
      // Arrange
      const summonerName = 'notexistingsummoner'

      // Act
      const result = await request(app.getHttpServer())
        .get(`${endpoint}/rank/${summonerName}`)
        .expect(404)

      // Assert
      expect(result.error).toBeDefined()
    })
  })

  describe('GET /summoner', () => {
    it('Can GET all summoners', async () => {
      // Arrange
      await factory(Summoner)().createMany(10)
      // Act
      const result = await request(app.getHttpServer())
        .get(endpoint)
        .auth(regularToken, { type: 'bearer' })
        .expect(200)

      // Assert
      expect(result.body.length).toEqual(12) // 10 + 2 from beforeAll
    })

    it('Can not GET all summoners without access_token', async () => {
      // Arrange
      await factory(Summoner)().createMany(10)
      // Act
      const result = await request(app.getHttpServer())
        .get(endpoint)
        .expect(401)

      // Assert
      expect(result.error).toBeDefined()
    })
  })

  describe('GET /summoner/:id', () => {
    it('Can GET a summoner by id', async () => {
      // Arrange
      const summoner = await factory(Summoner)({ id: 3 }).create()
      const { masteries, participants, passwordHash, ...rest } = summoner

      // Act
      const result = await request(app.getHttpServer())
        .get(`${endpoint}/${summoner.id}`)
        .auth(regularToken, { type: 'bearer' })
        .expect(200)

      // Assert
      expect(result.body).toEqual(rest)
    })

    it('Can not GET a summoner by id without access_token', async () => {
      // Arrange
      const summoner = await factory(Summoner)().create()
      // Act
      const result = await request(app.getHttpServer())
        .get(`${endpoint}/${summoner.id}`)
        .expect(401)

      // Assert
      expect(result.error).toBeDefined()
    })
  })

  describe('DELETE /summoner/:id', () => {
    it('Can DELETE own summoner by id', async () => {
      // Act
      await request(app.getHttpServer())
        .delete(`${endpoint}/${regularSummoner.id}`)
        .auth(regularToken, { type: 'bearer' })
        .expect(200)

      const deletedSummoner = await summonerService.findOne({
        id: regularSummoner.id
      })
      // Assert
      expect(deletedSummoner).toBeUndefined()
    })

    it('Can not DELETE a summoner by id without access_token', async () => {
      // Arrange
      const summoner = await factory(Summoner)().create()
      // Act
      const result = await request(app.getHttpServer())
        .delete(`${endpoint}/${summoner.id}`)
        .expect(401)

      // Assert
      expect(result.error).toBeDefined()
    })
  })
})
