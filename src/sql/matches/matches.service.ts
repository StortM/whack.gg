import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateMatchDto } from './dto/create-match.dto'
import { UpdateMatchDto } from './dto/update-match.dto'
import { Match } from './entities/match.entity'

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match | undefined> {
    const savedMatch = await this.matchRepository.save(createMatchDto)

    if (!savedMatch) {
      return undefined
    }

    return savedMatch
  }

  async findAll(): Promise<Match[]> {
    return await this.matchRepository.find()
  }

  async findOne(id: string): Promise<Match | undefined> {
    return await this.matchRepository.findOne(id)
  }

  async update(
    id: string,
    updateMatchDto: UpdateMatchDto
  ): Promise<Match | undefined> {
    await this.matchRepository.update(id, updateMatchDto)
    const res = this.matchRepository.findOne(id)
    if (!res) return undefined
    return res
  }

  async remove(id: number): Promise<void> {
    await this.matchRepository.delete(id)
  }
}
