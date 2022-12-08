import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { Team } from './entities/team.entity'

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team | undefined> {
    const savedTeam = await this.teamRepository
      .save(createTeamDto)
      .catch((error) => {
        if (error.driverError.where.includes('checkteamcount()')) {
          throw error
        }
      })

    if (!savedTeam) {
      return undefined
    }

    return savedTeam
  }

  async findAll(): Promise<Team[]> {
    return await this.teamRepository.find()
  }

  async findOne(id: string): Promise<Team | undefined> {
    return await this.teamRepository.findOne(id)
  }

  async update(
    id: string,
    updateTeamDto: UpdateTeamDto
  ): Promise<Team | undefined> {
    await this.teamRepository.update(id, updateTeamDto)
    const res = this.teamRepository.findOne(id)
    if (!res) return undefined
    return res
  }

  async remove(id: number): Promise<void> {
    await this.teamRepository.delete(id)
  }
}
