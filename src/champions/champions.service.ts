import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateChampionDto } from './dto/create-champion.dto'
import { UpdateChampionDto } from './dto/update-champion.dto'
import { Champion, ChampionBans } from './entities/champion.entity'

@Injectable()
export class ChampionsService {
  constructor(
    @InjectRepository(Champion)
    private championRepository: Repository<Champion>
  ) {}

  async championBans(): Promise<ChampionBans[] | undefined> {
    const res = await this.championRepository.query(
      'SELECT * FROM championbanrate'
    )

    return res
  }

  async create(
    createChampionDto: CreateChampionDto
  ): Promise<Champion | undefined> {
    const savedChampion = await this.championRepository.save(createChampionDto)

    if (!savedChampion) {
      return undefined
    }

    return savedChampion
  }

  async findAll(): Promise<Champion[]> {
    return await this.championRepository.find()
  }

  async findOne(id: number): Promise<Champion | undefined> {
    return await this.championRepository.findOne(id)
  }

  async update(
    id: number,
    updateChampionDto: UpdateChampionDto
  ): Promise<Champion | undefined> {
    await this.championRepository.update(id, updateChampionDto)
    const res = this.championRepository.findOne(id)
    if (!res) return undefined
    return res
  }

  async remove(id: number): Promise<void> {
    await this.championRepository.delete(id)
  }
}
