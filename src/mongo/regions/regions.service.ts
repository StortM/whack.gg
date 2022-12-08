import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Region, RegionDocument } from './schemas/regions.schema'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel(Region.name) private regionModel: Model<RegionDocument>
  ) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    const createdRegion = new this.regionModel(createRegionDto)
    return createdRegion.save()
  }

  async findAll(): Promise<Region[] | undefined> {
    return await this.regionModel.find().exec()
  }

  async findOne(id: string): Promise<Region | null> {
    return await this.regionModel.findById(id).exec()
  }

  async update(
    id: string,
    updateRegionDto: UpdateRegionDto
  ): Promise<Region | null> {
    await this.regionModel.findByIdAndUpdate(id, updateRegionDto)
    const res = this.regionModel.findById(id)
    if (!res) return null
    return res
  }

  async remove(id: string): Promise<void> {
    await this.regionModel.findByIdAndDelete(id)
  }
}
