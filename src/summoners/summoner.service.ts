import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateSummonerDto } from './dto/create-summoner.dto'
import { UpdateSummonerDto } from './dto/update-summoner.dto'
import {
  Summoner,
  SummonerOmittingPasswordHash
} from './entities/summoner.entity'

@Injectable()
export class SummonerService {
  constructor(
    @InjectRepository(Summoner) private summonerRepository: Repository<Summoner>
  ) {}

  async create(
    createSummonerDto: CreateSummonerDto
  ): Promise<Summoner | undefined> {
    const savedSummoner = await this.summonerRepository.save(createSummonerDto)
    if (!savedSummoner) {
      return undefined
    }

    return savedSummoner
  }

  async findAll(): Promise<Summoner[]> {
    return await this.summonerRepository.find()
  }

  async findOne(id: number): Promise<SummonerOmittingPasswordHash | undefined> {
    const summoner = await this.summonerRepository.findOne(id)

    if (!summoner) {
      return undefined
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...summonerWithoutPasswordHash } = summoner

    return summonerWithoutPasswordHash
  }

  async findOneWithPasswordHash(
    summonerName: string
  ): Promise<Summoner | undefined> {
    return await this.summonerRepository.findOne({
      summonerName: summonerName.toLowerCase().trim()
    })
  }

  async update(
    id: number,
    updateSummonerDto: UpdateSummonerDto
  ): Promise<Summoner | undefined> {
    await this.summonerRepository.update(id, updateSummonerDto)
    const res = this.summonerRepository.findOne(id)
    if (!res) return undefined
    return res
  }

  async remove(id: number): Promise<void> {
    await this.summonerRepository.delete(id)
  }
}
