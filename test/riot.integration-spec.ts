import { INestApplication } from '@nestjs/common'
import { SummonerOmittingPasswordHash } from 'src/graph/summoner/entities/summoner.entity'
import { FetchSummonerDto } from 'src/sql/riot/dto/fetch-summoner.dto'
import * as request from 'supertest'
import { factory, useSeeding } from 'typeorm-seeding'
import getTestApplication, { resetDatabase } from './utils/testApplication'

describe('/summoner', () => {
  let app: INestApplication
  let endpoint: string

  beforeAll(async () => {
    app = await getTestApplication()
    endpoint = '/sql/riot'

    await useSeeding()
  })

  afterAll(async () => {
    await resetDatabase()
    await app.close()
  })

  beforeEach(async () => {
    await resetDatabase()
  })

  describe('POST /riot', () => {
    it('Can POST a summoner from a valid dto', async () => {
      // Arrange
      const fetchSummonerDto = await factory(FetchSummonerDto)({
        summonerName: 'testsummoner',
        password: 'password',
        regionName: 'EUW'
      }).make()

      // Act
      const result = await request(app.getHttpServer())
        .post(endpoint)
        .send(fetchSummonerDto)
        .expect(201)

      // Assert
      const { summonerName } = result.body as SummonerOmittingPasswordHash

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...createSummonerDtoNoPassword } = fetchSummonerDto

      expect(summonerName).toEqual(createSummonerDtoNoPassword.summonerName)
    })
  })
})
