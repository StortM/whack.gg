import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { Connection } from 'typeorm'
import { factory, useSeeding } from 'typeorm-seeding'
import { Region } from '../regions/entities/region.entity'
import { FetchSummonerDto } from './dto/fetch-summoner.dto'
import { RiotService } from './riot.service'
import { MockRiotService } from './riot.services.mock'

describe('Summoner service', () => {
  let module: TestingModule
  let app: INestApplication
  let riotService: RiotService
  let defaultFetchSummonerDto: FetchSummonerDto

  beforeAll(async () => {
    const mockRiotService = new MockRiotService()
    module = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(RiotService)
      .useValue(mockRiotService)
      .compile()

    app = module.createNestApplication()
    riotService = module.get(RiotService)

    await app.init()
    await useSeeding()
  })

  beforeEach(async () => {
    const connection = app.get(Connection)
    await connection.dropDatabase()
    await connection.synchronize(true)

    await factory(Region)({ name: 'EUW' }).create()

    defaultFetchSummonerDto = {
      summonerName: 'John Doe',
      password: 'Password!234',
      regionName: 'EUW'
    } as FetchSummonerDto
  })

  afterAll(async () => {
    const connection = app.get(Connection)
    await connection.dropDatabase()
    await connection.synchronize(true)

    module.close()
  })

  const summonerNameTestValues = [
    // test values summonerName: length 10, length 3, length 4, length 16 length 15, length 2, length 17, length 0, null, false, 0, “!?=:_;”, “💩🙄😊”
    {
      summonerName: 'abcdefghij',
      expected: 'abcdefghij'
    },
    {
      summonerName: 'abc',
      expected: 'abc'
    },
    {
      summonerName: 'abcd',
      expected: 'abcd'
    },
    {
      summonerName: 'abcdefghijklmnop',
      expected: 'abcdefghijklmnop'
    },
    {
      summonerName: 'abcdefghijklmno',
      expected: 'abcdefghijklmno'
    },
    {
      summonerName: 'ab',
      expected: undefined
    },
    {
      summonerName: 'abcdefghijklmnopq',
      expected: undefined
    },
    {
      summonerName: '',
      expected: undefined
    },
    {
      summonerName: null,
      expected: undefined
    },
    {
      summonerName: false,
      expected: undefined
    },
    {
      summonerName: 0,
      expected: undefined
    },
    {
      summonerName: '!?=:_;',
      expected: undefined
    },
    {
      summonerName: '💩🙄😊',
      expected: undefined
    }
  ]

  describe.each(summonerNameTestValues)(
    'createSummonerFromName - SummonerName',
    (value) => {
      it(`will return correct value for ${value.summonerName}`, async () => {
        defaultFetchSummonerDto.summonerName =
          value.summonerName as unknown as string

        const res = await riotService.createSummonerFromName(
          defaultFetchSummonerDto
        )
        expect(res?.summonerName).toEqual(value.expected)
      })
    }
  )

  // test values password: length 25, length 6, length 7, length 45 length 44, length 5, length 46, length 0, null, false, 0, “!?=:_;”, “💩🙄😊”
  const passingPasswordTestValues = [
    {
      password: 'abcdefghijklmnopqrstuvwxy',
      expected: true
    },
    {
      password: 'abcdef',
      expected: true
    },
    {
      password: 'abcdefg',
      expected: true
    },
    {
      password: 'abcdefghijklmnopqrstuvwxyabcdefghijklmnopqrs',
      expected: true
    },
    {
      password: 'abcdefghijklmnopqrstuvwxyabcdefghijklmnopqrst',
      expected: true
    }
  ]

  const failingPasswordTestValues = [
    {
      password: 'abcde',
      expected: undefined
    },
    {
      password: 'abcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstu',
      expected: undefined
    },
    {
      password: '',
      expected: undefined
    },
    {
      password: null,
      expected: undefined
    },
    {
      password: false,
      expected: undefined
    },
    {
      password: 0,
      expected: undefined
    },
    {
      password: '💩🙄😊',
      expected: undefined
    }
  ]

  describe.each(failingPasswordTestValues)(
    'createSummonerFromName - Failing password values',
    (value) => {
      it(`will return correct value for ${value.password}`, async () => {
        defaultFetchSummonerDto.password = value.password as unknown as string

        const res = await riotService.createSummonerFromName(
          defaultFetchSummonerDto
        )
        expect(res).toBeUndefined()
      })
    }
  )

  describe.each(passingPasswordTestValues)(
    'createSummonerFromName - Passing password values',
    (value) => {
      it(`will return correct value for ${value.password}`, async () => {
        defaultFetchSummonerDto.password = value.password

        const res = await riotService.createSummonerFromName(
          defaultFetchSummonerDto
        )
        expect(res).toBeDefined()
      })
    }
  )
})
