import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateRankDto } from './dto/create-rank.dto'
import { UpdateRankDto } from './dto/update-rank.dto'
import { Rank } from './entities/rank.entity'

@Injectable()
export class RanksService {
  constructor(
    @InjectRepository(Rank)
    private rankRepository: Repository<Rank>
  ) {}

  async create(createRankDto: CreateRankDto): Promise<Rank | undefined> {
    const savedRank = await this.rankRepository.save(createRankDto)

    if (!savedRank) {
      return undefined
    }

    return savedRank
  }

  async findAll(): Promise<Rank[]> {
    return await this.rankRepository.find()
  }

  async findOne(id: string): Promise<Rank | undefined> {
    return await this.rankRepository.findOne({ id: id })
  }

  async update(
    id: string,
    updateRankDto: UpdateRankDto
  ): Promise<Rank | undefined> {
    await this.rankRepository.update(id, updateRankDto)
    const res = this.rankRepository.findOne(id)
    if (!res) return undefined
    return res
  }

  async remove(id: number): Promise<void> {
    await this.rankRepository.delete(id)
  }
}
