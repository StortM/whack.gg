import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Champion, ChampionDocument } from './schemas/champions.schema'
import { CreateChampionDto } from './dto/create-champion.dto'
import { UpdateChampionDto } from './dto/update-champion.dto'

@Injectable()
export class ChampionsService {
  constructor(
    @InjectModel(Champion.name) private championModel: Model<ChampionDocument>
  ) {}

  async create(createChampionDto: CreateChampionDto): Promise<Champion> {
    const createdChampion = new this.championModel(createChampionDto)
    return createdChampion.save()
  }

  async findAll(): Promise<Champion[] | undefined> {
    return await this.championModel.find().exec()
  }

  async findOne(id: string): Promise<Champion | null> {
    return await this.championModel.findById(id).exec()
  }

  async update(
    id: string,
    updateChampionDto: UpdateChampionDto
  ): Promise<Champion | null> {
    await this.championModel.findByIdAndUpdate(id, updateChampionDto)
    const res = this.championModel.findById(id)
    if (!res) return null
    return res
  }

  async remove(id: string): Promise<void> {
    await this.championModel.findByIdAndDelete(id)
  }
}
