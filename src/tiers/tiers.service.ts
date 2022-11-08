import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTierDto } from './dto/create-tier.dto'
import { UpdateTierDto } from './dto/update-tier.dto'
import { Tier } from './entities/tier.entity'

@Injectable()
export class TiersService {
  constructor(
    @InjectRepository(Tier)
    private tierRepository: Repository<Tier>
  ) {}

  async create(createTierDto: CreateTierDto): Promise<Tier | undefined> {
    const savedTier = await this.tierRepository.save(createTierDto)

    if (!savedTier) {
      return undefined
    }

    return savedTier
  }

  async findAll(): Promise<Tier[]> {
    return await this.tierRepository.find()
  }

  async findOne(id: string): Promise<Tier | undefined> {
    return await this.tierRepository.findOne({ id: id })
  }

  async update(
    id: string,
    updateTierDto: UpdateTierDto
  ): Promise<Tier | undefined> {
    await this.tierRepository.update(id, updateTierDto)
    const res = this.tierRepository.findOne(id)
    if (!res) return undefined
    return res
  }

  async remove(id: number): Promise<void> {
    await this.tierRepository.delete(id)
  }
}
