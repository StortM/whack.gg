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

  async findFromRegionName(name: string): Promise<Region | undefined> {
    // assume that there are no duplicate region names, so we can just return the first one
    return await this.regionRepository.findOne({ where: { name } })
  }

  async update(
    id: number,
    updateRegionDto: UpdateRegionDto
  ): Promise<Region | undefined> {
    await this.regionRepository.update(id, updateRegionDto)
    return await this.regionRepository.findOne(id)
  }

  async remove(id: number): Promise<void> {
    await this.regionRepository.delete(id)
  }
}
