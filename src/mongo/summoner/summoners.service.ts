import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Summoner } from './schemas/summoners.schema'
import { SummonerOmittingPasswordHash } from './schemas/summoners.schema'
import { SummonerDocument } from './schemas/summoners.schema'
import { CreateSummonerDto } from './dto/create-summoner.dto'
import { UpdateSummonerDto } from './dto/update-summoner.dto'
import { CryptService } from 'src/crypt/crypt.service'
import { RegionsService } from 'src/mongo/regions/regions.service'

@Injectable()
export class SummonersService {
  constructor(
    @InjectModel(Summoner.name) private summonerModel: Model<SummonerDocument>,
    private cryptService: CryptService,
    private readonly regionsService: RegionsService
  ) {}

  async create(
    createSummonerDto: CreateSummonerDto
  ): Promise<SummonerOmittingPasswordHash | null> {
    const { password, regionName, summonerName, ...rest } = createSummonerDto
    // check and fetch region
    const region = regionName
      ? await this.regionsService.findFromRegionName(regionName)
      : null
    // if (!region) return null

    const hash = await this.cryptService.hash(password)

    const summonerToSave = {
      passwordHash: hash,
      summonerName: summonerName.toLowerCase(),
      regionId: region?._id ?? null,
      ...rest
    }

    const savedSummoner = await this.summonerModel.create(summonerToSave)
    savedSummoner.save()

    if (!savedSummoner) {
      return null
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...summonerNoPassword } = savedSummoner

    return summonerNoPassword
  }

  async findAll(): Promise<Summoner[] | null> {
    return await this.summonerModel.find().exec()
  }

  async findOne(id: string): Promise<SummonerOmittingPasswordHash | null> {
    return await this.summonerModel.findById(id).lean().exec()
  }

  async update(
    id: string,
    updateSummonerDto: UpdateSummonerDto
  ): Promise<Summoner | null> {
    if (
      updateSummonerDto.mastery &&
      Object.keys(updateSummonerDto).length == 1
    ) {
      return await this.summonerModel.findByIdAndUpdate(id, {
        masteries: [updateSummonerDto.mastery]
      })
    }
    await this.summonerModel.findByIdAndUpdate(id, updateSummonerDto)
    const res = this.summonerModel.findById(id)
    if (!res) return null
    return res
  }

  async remove(id: string): Promise<void> {
    await this.summonerModel.findByIdAndDelete(id)
  }

  async findOneWithPasswordHash(
    summonerName: string
  ): Promise<Summoner | null> {
    return await this.summonerModel
      .findOne({ summonerName: summonerName.toLowerCase() })
      .lean()
      .exec()
  }
}
