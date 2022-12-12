import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Mastery, MasteryDocument } from './schemas/masteries.schema'
import { CreateMasteryDto } from './dto/create-mastery.dto'
import { UpdateMasteryDto } from './dto/update-mastery.dto'

@Injectable()
export class MasteriesService {
  constructor(
    @InjectModel(Mastery.name) private masteryModel: Model<MasteryDocument>
  ) {}

  async create(createMasteryDto: CreateMasteryDto): Promise<Mastery> {
    const createdMastery = await new this.masteryModel(createMasteryDto)
    return await createdMastery.save()
  }

  async findAll(): Promise<Mastery[]> {
    return this.masteryModel.find().exec()
  }

  async findOne(_id: string): Promise<Mastery | null> {
    return this.masteryModel.findById({ _id: _id }).exec()
  }

  async remove(_id: string): Promise<Mastery | null> {
    return this.masteryModel.findByIdAndDelete({ _id: _id }).exec()
  }

  async update(
    _id: string,
    updateMasteryDto: UpdateMasteryDto
  ): Promise<Mastery | null> {
    const res = await this.masteryModel.findByIdAndUpdate(
      { _id: _id },
      updateMasteryDto
    )

    return res ? res : null
  }
}
