import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { AppModule } from 'src/app.module'
import { UpdateResourceId } from 'src/utils/UpdateResourceId'
import { Connection, Repository } from 'typeorm'
import { factory, useSeeding } from 'typeorm-seeding'
import { Division } from '../divisions/entities/division.entity'
import { GameMode } from '../game-modes/entities/game-mode.entity'
import { Rank } from '../ranks/entities/rank.entity'
import { Region } from '../regions/entities/region.entity'
import { Tier } from '../tiers/entities/tier.entity'
import { CreateSummonerDto } from './dto/create-summoner.dto'
import { Summoner } from './entities/summoner.entity'
import { SummonerService } from './summoner.service'

describe('Summoner service', () => {
  let summonerService: SummonerService
  let summonerRepository: Repository<Summoner>
  let module: TestingModule
  let defaultSummonerDto: CreateSummonerDto
  let app: INestApplication

  let testTier: Tier
  let testDivision: Division
  let testGameMode: GameMode
  let testRegion: Region
  let testRank: Rank
  let testSummoner: Summoner

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    summonerService = module.get<SummonerService>(SummonerService)
    summonerRepository = module.get(getRepositoryToken(Summoner))

    app = module.createNestApplication()

    await app.init()
    useSeeding()
  })

  beforeEach(async () => {
    const connection = app.get(Connection)
    await connection.dropDatabase()
    await connection.synchronize(true)

    defaultSummonerDto = {
      summonerName: 'John Doe',
      password: 'Password!234',
      icon: 1000,
      level: 300,
      isAdmin: false,
      regionName: 'EUW'
    } as CreateSummonerDto

    // test data to be used in tests
    testTier = await factory(Tier)().create()
    testDivision = await factory(Division)().create()
    testGameMode = await factory(GameMode)().create()
    testRegion = await factory(Region)({ name: 'EUW' }).create()
    testRank = await factory(Rank)({
      tierId: testTier.id,
      divisionId: testDivision.id,
      gameModeId: testGameMode.id
    }).create()

    testSummoner = await factory(Summoner)({
      summonerName: 'testSummoner',
      rankId: testRank.id,
      regionId: testRegion.id
    }).create()
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

  describe.each(summonerNameTestValues)('create() - SummonerName', (value) => {
    it(`will return correct value for ${value.summonerName}`, async () => {
      defaultSummonerDto.summonerName = value.summonerName as unknown as string

      const res = await summonerService.create(defaultSummonerDto)
      expect(res?.summonerName).toEqual(value.expected)
    })
  })

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
    'create() - Failing password values',
    (value) => {
      it(`will return correct value for ${value.password}`, async () => {
        defaultSummonerDto.password = value.password as unknown as string

        const res = await summonerService.create(defaultSummonerDto)
        expect(res).toBeUndefined()
      })
    }
  )

  describe.each(passingPasswordTestValues)(
    'create() - Passing password values',
    (value) => {
      it(`will return correct value for ${value.password}`, async () => {
        defaultSummonerDto.password = value.password

        const res = await summonerService.create(defaultSummonerDto)
        expect(res).toBeDefined()
      })
    }
  )

  // icon test values 1219, 1, 2, 2438, 2437, 0, 2439, -5, 1219,65, undefined, null, false, 214748348, -214748348
  const iconTestValues = [
    {
      icon: 1219,
      expected: 1219
    },
    {
      icon: 1,
      expected: 1
    },
    {
      icon: 2,
      expected: 2
    },
    {
      icon: 2438,
      expected: 2438
    },
    {
      icon: 2437,
      expected: 2437
    },
    {
      icon: 0,
      expected: undefined
    },
    {
      icon: 2439,
      expected: undefined
    },
    {
      icon: -5,
      expected: undefined
    },
    {
      icon: 1219.65,
      expected: undefined
    },
    {
      icon: undefined,
      expected: undefined
    },
    {
      icon: null,
      expected: undefined
    },
    {
      icon: false,
      expected: undefined
    },
    {
      icon: 214748348,
      expected: undefined
    },
    {
      icon: -214748348,
      expected: undefined
    }
  ]

  describe.each(iconTestValues)('create() - Icon', (value) => {
    it(`will return correct value for ${value.icon}`, async () => {
      defaultSummonerDto.icon = value.icon as unknown as number

      const res = await summonerService.create(defaultSummonerDto)
      expect(res?.icon).toEqual(value.expected)
    })
  })

  // level test values 1, 2, 2147483647, 2147483646, 0, 2147483648, -5, undefined, null, false, -214748348
  const levelTestValues = [
    {
      level: 1,
      expected: 1
    },
    {
      level: 2,
      expected: 2
    },
    {
      level: 2147483647,
      expected: 2147483647
    },
    {
      level: 2147483646,
      expected: 2147483646
    },
    {
      level: 0,
      expected: undefined
    },
    {
      level: 2147483648,
      expected: undefined
    },
    {
      level: -5,
      expected: undefined
    },
    {
      level: undefined,
      expected: undefined
    },
    {
      level: null,
      expected: undefined
    },
    {
      level: false,
      expected: undefined
    },
    {
      level: -214748348,
      expected: undefined
    }
  ]

  describe.each(levelTestValues)('create() - Level', (value) => {
    it(`will return correct value for ${value.level}`, async () => {
      defaultSummonerDto.level = value.level as unknown as number

      const res = await summonerService.create(defaultSummonerDto)
      expect(res?.level).toEqual(value.expected)
    })
  })

  // isAdmin test values: true, false, 0, 2147483648, -5, undefined, null, -214748348

  const isAdminTestValues = [
    {
      isAdmin: true,
      expected: true
    },
    {
      isAdmin: false,
      expected: false
    },
    {
      isAdmin: 0,
      expected: undefined
    },
    {
      isAdmin: 2147483648,
      expected: undefined
    },
    {
      isAdmin: -5,
      expected: undefined
    },
    {
      isAdmin: undefined,
      expected: undefined
    },
    {
      isAdmin: null,
      expected: undefined
    },
    {
      isAdmin: -214748348,
      expected: undefined
    }
  ]

  describe.each(isAdminTestValues)('create() - isAdmin', (value) => {
    it(`will return correct value for ${value.isAdmin}`, async () => {
      defaultSummonerDto.isAdmin = value.isAdmin as unknown as boolean

      const res = await summonerService.create(defaultSummonerDto)
      expect(res?.isAdmin).toEqual(value.expected)
    })
  })

  // id test values: 1, 2, 200, 2147483647, 2147483646, 0, 2147483648, 5.65, -5, undefined, null, false, -214748348
  const passingIdTestValues = [
    {
      id: 1,
      expected: 1
    },
    {
      id: 2,
      expected: 2
    },
    {
      id: 200,
      expected: 200
    },
    {
      id: 2147483647,
      expected: 2147483647
    },
    {
      id: 2147483646,
      expected: 2147483646
    }
  ]

  const failingIdTestValues = [
    {
      id: 0,
      expected: undefined
    },
    {
      id: 2147483648,
      expected: undefined
    },
    {
      id: 5.65,
      expected: undefined
    },
    {
      id: -5,
      expected: undefined
    },
    {
      id: undefined,
      expected: undefined
    },
    {
      id: null,
      expected: undefined
    },
    {
      id: false,
      expected: undefined
    },
    {
      id: -214748348,
      expected: undefined
    }
  ]

  describe.each(passingIdTestValues)(
    'update() - id passing values',
    (value) => {
      it(`will return correct value for ${value.id}`, async () => {
        // insert a summoner with ID value.id
        const summ = await factory(Summoner)({ id: value.id }).create()

        /*     await app.get(Connection).transaction(async (transactionalManager) => {
        transactionalManager
          .createQueryBuilder()
          .insert()
          .into(Summoner)
          .values(summ)
          .execute()
      }) */

        const findOne = await summonerRepository.findOne({
          where: { summonerName: summ.summonerName }
        })
        const updateSummonerDto = {
          ...defaultSummonerDto,
          id: value.id
        }
        // TODO: I cant insert a summoner with a specific ID, so I cant test this
        // Even creating a transaction and inserting the summoner with the ID I want, it still inserts with a different ID
        /*       const res = await summonerService.update(
        { id: value.id },
        updateSummonerDto
      )

      expect(res?.id).toEqual(value.expected) */
      })
    }
  )

  describe.each(failingIdTestValues)(
    'update() - id failing values',
    (value) => {
      it(`will return correct value for ${value.id}`, async () => {
        const updateSummonerDto = {
          ...defaultSummonerDto,
          id: value.id as unknown as number
        }
        const res = await summonerService.update(
          { id: value.id } as unknown as UpdateResourceId,
          updateSummonerDto
        )

        expect(res?.id).toEqual(value.expected)
      })
    }
  )

  const passingGetSummonerFullRankTestValues = [
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
    }
  ]

  const failingGetSummonerFullRankTestValues = [
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

  // getSummonerFullRank
  describe.each(passingGetSummonerFullRankTestValues)(
    'getSummonerFullRank - SummonerName',
    (value) => {
      it(`will return correct value for ${value.summonerName}`, async () => {
        const testSummoner = await factory(Summoner)({
          summonerName: value.summonerName,
          rankId: testRank.id,
          regionId: testRegion.id
        }).create()

        const expected = {
          summonerName: testSummoner.summonerName,
          rank: `${testDivision.name} ${testTier.value}`,
          lp: testRank.lp
        }

        const res = await summonerService.getSummonerFullRank({
          name: value.summonerName
        })

        expect(res).toEqual(expected)
      })
    }
  )

  // getSummonerFullRank
  describe.each(failingGetSummonerFullRankTestValues)(
    'getSummonerFullRank - SummonerName',
    (value) => {
      it(`will return correct value for ${value.summonerName}`, async () => {
        await factory(Summoner)({
          summonerName: value.summonerName,
          rankId: testRank.id,
          regionId: testRegion.id
        }).create()

        const res = await summonerService.getSummonerFullRank({
          name: value.summonerName as unknown as string
        })

        expect(res).toEqual(value.expected)
      })
    }
  )

  describe.each(passingIdTestValues)('findOne - id passing', (value) => {
    it(`will return correct value for ${value.id}`, async () => {
      await factory(Summoner)().create()

      const res = await summonerService.findOne({
        id: value.id as unknown as number
      })

      //expect(res).toEqual(value.expected)
    })
  })

  describe.each(failingIdTestValues)('findOne - id failing', (value) => {
    it(`will return correct value for ${value.id}`, async () => {
      const res = await summonerService.findOne({
        id: value.id as unknown as number
      })

      expect(res).toEqual(value.expected)
    })
  })

  describe.each(passingGetSummonerFullRankTestValues)(
    'findOneWithPasswordHash - SummonerName passing',
    (value) => {
      it(`will return correct value for ${value.summonerName}`, async () => {
        await factory(Summoner)({
          summonerName: value.summonerName
        }).create()

        const res = await summonerService.findOneWithPasswordHash({
          name: value.summonerName
        })

        expect(res?.summonerName).toEqual(value.expected)
      })
    }
  )

  describe.each(failingGetSummonerFullRankTestValues)(
    'findOneWithPasswordHash - SummonerName failing',
    (value) => {
      it(`will return correct value for ${value.summonerName}`, async () => {
        const res = await summonerService.findOneWithPasswordHash({
          name: value.summonerName as unknown as string
        })
        expect(res).toEqual(value.expected)
      })
    }
  )
})
