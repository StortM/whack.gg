import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateDivisionDto } from './dto/create-division.dto'
import { UpdateDivisionDto } from './dto/update-division.dto'
import { Division } from './entities/division.entity'

@Injectable()
export class DivisionsService {
  constructor(
    @InjectRepository(Division)
    private divisionRepository: Repository<Division>
  ) {}

  async create(
    createDivisionDto: CreateDivisionDto
  ): Promise<Division | undefined> {
    const savedDivision = await this.divisionRepository.save(createDivisionDto)

    if (!savedDivision) {
      return undefined
    }

    return savedDivision
  }

  async findAll(): Promise<Division[]> {
    return await this.divisionRepository.find()
  }

  async findOne(id: string): Promise<Division | undefined> {
    return await this.divisionRepository.findOne(id)
  }

  async update(
    id: string,
    updateDivisionDto: UpdateDivisionDto
  ): Promise<Division | undefined> {
    await this.divisionRepository.update(id, updateDivisionDto)
    const res = this.divisionRepository.findOne(id)
    if (!res) return undefined
    return res
  }

  async remove(id: number): Promise<void> {
    await this.divisionRepository.delete(id)
  }
}
