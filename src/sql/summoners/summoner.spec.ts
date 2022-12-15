import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { CreateSummonerDto } from './dto/create-summoner.dto'
import { SummonerService } from './summoner.service'

describe('create summoner', () => {
  let summonerService: SummonerService
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    summonerService = module.get<SummonerService>(SummonerService)
  })

  afterAll(async () => {
    module.close()
  })

  const wrongTestValues = [null, undefined, false, true, 0, 1]

  describe.each(wrongTestValues)('fails on %p', (value) => {
    it('fails on %p', async () => {
      const res = await summonerService.create({
        summonerName: value
      } as unknown as CreateSummonerDto)
      expect(res).toBeUndefined()
    })
  })
})
