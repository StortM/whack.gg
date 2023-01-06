import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateMasteryDto } from './dto/create-mastery.dto'
import { UpdateMasteryDto } from './dto/update-mastery.dto'
import { Mastery } from './entities/mastery.entity'

@Injectable()
export class MasteriesService {
  constructor(
    @InjectRepository(Mastery)
    private masteryRepository: Repository<Mastery>
  ) {}

  async create(
    createMasteryDto: CreateMasteryDto
  ): Promise<Mastery | undefined> {
    const savedMastery = await this.masteryRepository.save(createMasteryDto)

    if (!savedMastery) {
      return undefined
    }

    return savedMastery
  }

  async findAll(): Promise<Mastery[]> {
    await this.masteryRepository.query('')
    return await this.masteryRepository.find({
      order: {
        id: 'ASC'
      }
    })
  }

  async findOne(id: number): Promise<Mastery | undefined> {
    return await this.masteryRepository.findOne(id)
  }

  async update(
    id: number,
    updateMasteryDto: UpdateMasteryDto
  ): Promise<Mastery | undefined> {
    await this.masteryRepository.update(id, updateMasteryDto)
    const res = await this.masteryRepository.findOne(id)
    return res ? res : undefined
  }

  async remove(id: number): Promise<void> {
    await this.masteryRepository.delete(id)
  }
}
