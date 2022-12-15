import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { GameMode, GameModeDocument } from './schemas/game-modes.schema'
import { CreateGameModeDto } from './dto/create-game-mode.dto'
import { UpdateGameModeDto } from './dto/update-game-mode.dto'

@Injectable()
export class GameModesService {
  constructor(
    @InjectModel(GameMode.name) private gameModeModel: Model<GameModeDocument>
  ) {}

  async create(createGameModeDto: CreateGameModeDto): Promise<GameMode> {
    const createdGameMode = new this.gameModeModel(createGameModeDto)
    return createdGameMode.save()
  }

  async findAll(): Promise<GameMode[] | undefined> {
    return await this.gameModeModel.find().exec()
  }

  async findOne(id: string): Promise<GameMode | null> {
    return await this.gameModeModel.findById(id).exec()
  }

  async update(
    id: string,
    updateGameModeDto: UpdateGameModeDto
  ): Promise<GameMode | null> {
    await this.gameModeModel.findByIdAndUpdate(id, updateGameModeDto)
    const res = this.gameModeModel.findById(id)
    if (!res) return null
    return res
  }

  async remove(id: string): Promise<void> {
    await this.gameModeModel.findByIdAndDelete(id)
  }
}
