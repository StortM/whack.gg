import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePositionDto } from './dto/create-position.dto'
import { UpdatePositionDto } from './dto/update-position.dto'
import { Position } from './entities/position.entity'

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>
  ) {}

  async create(
    createPositionDto: CreatePositionDto
  ): Promise<Position | undefined> {
    const savedPosition = await this.positionRepository.save(createPositionDto)

    if (!savedPosition) {
      return undefined
    }

    return savedPosition
  }

  async findAll(): Promise<Position[]> {
    return await this.positionRepository.find()
  }

  async findOne(id: number): Promise<Position | undefined> {
    return await this.positionRepository.findOne({ id: id })
  }

  async update(
    id: number,
    updatePositionDto: UpdatePositionDto
  ): Promise<Position | undefined> {
    await this.positionRepository.update(id, updatePositionDto)
    const res = this.positionRepository.findOne(id)
    if (!res) return undefined
    return res
  }

  async remove(id: number): Promise<void> {
    await this.positionRepository.delete(id)
  }
}
