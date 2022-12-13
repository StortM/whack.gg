import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Summoner } from './schemas/summoners.schema'
import { SummonerDocument } from './schemas/summoners.schema'
import { createSummonerDto } from './dto/create-summoner.dto'
import { updateSummonerDto } from './dto/update-summoner.dto'

@Injectable()
export class SummonersService {
  constructor(
    @InjectModel(Summoner.name) private summonerModel: Model<SummonerDocument>
  ) {}

  async create(createSummonerDto: createSummonerDto): Promise<Summoner> {
    const createdSummoner = new this.summonerModel(createSummonerDto)
    return createdSummoner.save()
  }

  async findAll(): Promise<Summoner[] | null> {
    return await this.summonerModel.find().exec()
  }

  async findOne(id: string): Promise<Summoner | null> {
    return await this.summonerModel.findById(id).exec()
  }

  async update(
    id: string,
    updateSummonerDto: updateSummonerDto
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
}
