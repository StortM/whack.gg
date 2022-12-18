import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CryptService } from 'src/crypt/crypt.service'
import { RegionsService } from 'src/sql/regions/regions.service'
import { isValid } from 'src/utils/isValid'
import { UpdateResourceId } from 'src/utils/UpdateResourceId'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateSummonerDto } from './dto/create-summoner.dto'
import { SummonerNameDto } from './dto/summonerNameDto.dto'
import { UpdateSummonerDto } from './dto/update-summoner.dto'
import {
  Summoner,
  SummonerOmittingPasswordHash,
  SummonerWithFullRank
} from './entities/summoner.entity'

@Injectable()
export class SummonerService {
  constructor(
    @InjectRepository(Summoner)
    private summonerRepository: Repository<Summoner>,
    private cryptService: CryptService,
    private readonly regionsService: RegionsService
  ) {}

  async getSummonerFullRank(
    getSummonerFullRankDto: SummonerNameDto
  ): Promise<SummonerWithFullRank | undefined> {
    const dtoValid = await isValid(SummonerNameDto, getSummonerFullRankDto)
    if (!dtoValid) return

    const res = await this.summonerRepository.query(
      `SELECT getfullsummonerrankbyname('${getSummonerFullRankDto.name}');`
    )

    if (!res || !res[0]) return undefined

    const summonerRank = res[0].getfullsummonerrankbyname as string
    // cleanup string
    // remove first and last character from res
    const summonerRankFormatted = summonerRank.substring(
      1,
      summonerRank.length - 1
    )
    // remove double quotes
    const summonerRankFormattedNoQuotes = summonerRankFormatted.replace(
      /"/g,
      ''
    )

    // slice string on comma
    const [summonerName, rank, lp] = summonerRankFormattedNoQuotes.split(',')

    return {
      summonerName,
      rank,
      lp: parseInt(lp)
    } as SummonerWithFullRank
  }

  async create(
    createSummonerDto: CreateSummonerDto
  ): Promise<SummonerOmittingPasswordHash | undefined> {
    const dtoValid = await isValid(CreateSummonerDto, createSummonerDto)
    if (!dtoValid) return

    const { password, regionName, ...rest } = createSummonerDto

    // check and fetch region
    const region = await this.regionsService.findFromRegionName(regionName)
    if (!region) return undefined

    const hash = await this.cryptService.hash(password)

    const summonerToSave = {
      passwordHash: hash,
      regionId: region.id,
      ...rest
    }

    const savedSummoner = await this.summonerRepository.save(summonerToSave)
    if (!savedSummoner) return undefined

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...summonerNoPassword } = savedSummoner

    return summonerNoPassword
  }

  async findAll(): Promise<SummonerOmittingPasswordHash[]> {
    const summoners = await this.summonerRepository.find()

    // strip password hashes
    return summoners.map((summoner) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...summonerNoPassword } = summoner
      return summonerNoPassword
    })
  }

  async findOne(
    id: UpdateResourceId,
    options?: FindOneOptions
  ): Promise<SummonerOmittingPasswordHash | undefined> {
    const dtoValid = await isValid(UpdateResourceId, id)
    if (!dtoValid) return

    const summoner = await this.summonerRepository.findOne(id, options)
    if (!summoner) return undefined

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...summonerWithoutPasswordHash } = summoner

    return summonerWithoutPasswordHash
  }

  // only use this for authentication
  async findOneWithPasswordHash(
    summonerNameDto: SummonerNameDto
  ): Promise<Summoner | undefined> {
    const dtoValid = await isValid(SummonerNameDto, summonerNameDto)
    if (!dtoValid) return

    return await this.summonerRepository.findOne({
      summonerName: summonerNameDto.name.toLowerCase().trim()
    })
  }

  async update(
    updateResourceid: UpdateResourceId,
    updateSummonerDto: UpdateSummonerDto
  ): Promise<SummonerOmittingPasswordHash | undefined> {
    const dtoValid = await isValid(UpdateSummonerDto, updateSummonerDto)
    const idValid = await isValid(UpdateResourceId, updateResourceid)
    if (!dtoValid || !idValid) return

    const { id } = updateResourceid
    // fetch existing summoner
    const summoner = await this.summonerRepository.findOne(id)
    if (!summoner) return undefined

    const { password, regionName, ...rest } = updateSummonerDto
    const updatedSummoner = {
      ...summoner,
      ...rest
    }

    if (password) {
      updatedSummoner.passwordHash = await this.cryptService.hash(password)
    }

    if (regionName) {
      const region = await this.regionsService.findFromRegionName(regionName)
      if (!region) return undefined
      updatedSummoner.regionId = region.id
    }

    await this.summonerRepository.update(id, updatedSummoner)

    const savedSummoner = await this.summonerRepository.findOne(id, {
      relations: ['region']
    })
    if (!savedSummoner) return undefined

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...summonerNoPassword } = savedSummoner
    return summonerNoPassword
  }

  async remove(id: number): Promise<void> {
    await this.summonerRepository.delete(id)
  }
}
