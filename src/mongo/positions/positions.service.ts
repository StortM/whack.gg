import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Position, PositionDocument } from './schemas/positions.schema'
import { CreatePositionDto } from './dto/create-position.dto'
import { UpdatePositionDto } from './dto/update-position.dto'

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel(Position.name) private positionModel: Model<PositionDocument>
  ) {}

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    const createdPosition = new this.positionModel(createPositionDto)
    return createdPosition.save()
  }

  async findAll(): Promise<Position[] | undefined> {
    return await this.positionModel.find().exec()
  }

  async findOne(id: string): Promise<Position | null> {
    return await this.positionModel.findById(id).exec()
  }

  async update(
    id: string,
    updatePositionDto: UpdatePositionDto
  ): Promise<Position | null> {
    await this.positionModel.findByIdAndUpdate(id, updatePositionDto)
    const res = this.positionModel.findById(id)
    if (!res) return null
    return res
  }

  async remove(id: string): Promise<void> {
    await this.positionModel.findByIdAndDelete(id)
  }
}
