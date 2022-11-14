import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'
import { Region } from './entities/region.entity'

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>
  ) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region | undefined> {
    const savedRegion = await this.regionRepository.save(createRegionDto)

    if (!savedRegion) {
      return undefined
    }

    return savedRegion
  }

  async findAll(): Promise<Region[]> {
    return await this.regionRepository.find()
  }

  async findOne(id: number): Promise<Region | undefined> {
    return await this.regionRepository.findOne(id)
  }

  async update(
    id: number,
    updateRegionDto: UpdateRegionDto
  ): Promise<Region | undefined> {
    await this.regionRepository.update(id, updateRegionDto)
    const res = this.regionRepository.findOne(id)
    if (!res) return undefined
    return res
  }

  async remove(id: number): Promise<void> {
    await this.regionRepository.delete(id)
  }
}
