import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Division, DivisionDocument } from './schemas/divisions.schema'
import { CreateDivisionDto } from './dto/create-division.dto'
import { UpdateDivisionDto } from './dto/update-division.dto'

@Injectable()
export class DivisionsService {
  constructor(
    @InjectModel(Division.name) private divisionModel: Model<DivisionDocument>
  ) {}

  async create(createDivisionDto: CreateDivisionDto): Promise<Division> {
    const createdDivision = new this.divisionModel(createDivisionDto)
    return createdDivision.save()
  }

  async findAll(): Promise<Division[] | undefined> {
    return await this.divisionModel.find().exec()
  }

  async findOne(id: string): Promise<Division | null> {
    return await this.divisionModel.findById(id).exec()
  }

  async update(
    id: string,
    updateDivisionDto: UpdateDivisionDto
  ): Promise<Division | null> {
    await this.divisionModel.findByIdAndUpdate(id, updateDivisionDto)
    const res = this.divisionModel.findById(id)
    if (!res) return null
    return res
  }

  async remove(id: string): Promise<void> {
    await this.divisionModel.findByIdAndDelete(id)
  }
}
