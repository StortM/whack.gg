import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Tier, TierDocument } from './schemas/tiers.schema'
import { CreateTierDto } from './dto/create-tier.dto'
import { UpdateTierDto } from './dto/update-tier.dto'

@Injectable()
export class TiersService {
  constructor(@InjectModel(Tier.name) private tierModel: Model<TierDocument>) {}

  async create(createTierDto: CreateTierDto): Promise<Tier> {
    const createdTier = new this.tierModel(createTierDto)
    return createdTier.save()
  }

  async findAll(): Promise<Tier[] | undefined> {
    return await this.tierModel.find().exec()
  }

  async findOne(id: string): Promise<Tier | null> {
    return await this.tierModel.findById(id).exec()
  }

  async update(id: string, updateTierDto: UpdateTierDto): Promise<Tier | null> {
    await this.tierModel.findByIdAndUpdate(id, updateTierDto)
    const res = this.tierModel.findById(id)
    if (!res) return null
    return res
  }

  async remove(id: string): Promise<void> {
    await this.tierModel.findByIdAndDelete(id)
  }
}
