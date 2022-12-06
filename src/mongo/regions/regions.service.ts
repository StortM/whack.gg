import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Region, RegionDocument } from './schemas/regions.schema'
import { CreateRegionDto } from './dto/create-region.dto'

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel(Region.name) private regionModel: Model<RegionDocument>
  ) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    const createdRegion = new this.regionModel(createRegionDto)
    return createdRegion.save()
  }

  async findAll(): Promise<Region[]> {
    return this.regionModel.find().exec()
  }
}
