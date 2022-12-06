import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CryptService } from 'src/sql/crypt/crypt.service'
import { RegionsService } from 'src/sql/regions/regions.service'
import { Repository } from 'typeorm'
import { CreateSummonerDto } from './dto/create-summoner.dto'
import { UpdateSummonerDto } from './dto/update-summoner.dto'
import {
  Summoner,
  SummonerOmittingPasswordHash
} from './entities/summoner.entity'

@Injectable()
export class SummonerService {
  constructor(
    @InjectRepository(Summoner)
    private summonerRepository: Repository<Summoner>,
    private cryptService: CryptService,
    private readonly regionsService: RegionsService
  ) {}

  async create(
    createSummonerDto: CreateSummonerDto
  ): Promise<SummonerOmittingPasswordHash | undefined> {
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

    if (!savedSummoner) {
      return undefined
    }

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

  async findOne(id: number): Promise<SummonerOmittingPasswordHash | undefined> {
    const summoner = await this.summonerRepository.findOne(id)

    if (!summoner) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)

      return undefined
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...summonerWithoutPasswordHash } = summoner

    return summonerWithoutPasswordHash
  }

  // only use this for authentication
  async findOneWithPasswordHash(
    summonerName: string
  ): Promise<Summoner | undefined> {
    return await this.summonerRepository.findOne({
      summonerName: summonerName.toLowerCase().trim()
    })
  }

  async update(
    id: number,
    updateSummonerDto: UpdateSummonerDto
  ): Promise<SummonerOmittingPasswordHash | undefined> {
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

    return await this.summonerRepository.findOne(id)
  }

  async remove(id: number): Promise<void> {
    await this.summonerRepository.delete(id)
  }
}
