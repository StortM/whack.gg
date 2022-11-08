import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateGameModeDto } from './dto/create-game-mode.dto'
import { UpdateGameModeDto } from './dto/update-game-mode.dto'
import { GameMode } from './entities/game-mode.entity'

@Injectable()
export class GameModesService {
  constructor(
    @InjectRepository(GameMode)
    private gameModeRepository: Repository<GameMode>
  ) {}

  async create(
    createGameModeDto: CreateGameModeDto
  ): Promise<GameMode | undefined> {
    const savedGameMode = await this.gameModeRepository.save(createGameModeDto)

    if (!savedGameMode) {
      return undefined
    }

    return savedGameMode
  }

  async findAll(): Promise<GameMode[]> {
    return await this.gameModeRepository.find()
  }

  async findOne(id: string): Promise<GameMode | undefined> {
    return await this.gameModeRepository.findOne({ id: id })
  }

  async update(
    id: string,
    updateGameModeDto: UpdateGameModeDto
  ): Promise<GameMode | undefined> {
    await this.gameModeRepository.update(id, updateGameModeDto)
    const res = this.gameModeRepository.findOne(id)
    if (!res) return undefined
    return res
  }

  async remove(id: number): Promise<void> {
    await this.gameModeRepository.delete(id)
  }
}
