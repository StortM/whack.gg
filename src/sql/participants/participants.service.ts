import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateParticipantDto } from './dto/create-participant.dto'
import { UpdateParticipantDto } from './dto/update-participant.dto'
import { Participant } from './entities/participant.entity'

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>
  ) {}

  async create(
    createParticipantDto: CreateParticipantDto
  ): Promise<Participant | undefined> {
    const savedParticipant = await this.participantRepository.save(
      createParticipantDto
    )

    if (!savedParticipant) {
      return undefined
    }

    return savedParticipant
  }

  async findAll(): Promise<Participant[]> {
    return await this.participantRepository.find()
  }

  async findOne(id: string): Promise<Participant | undefined> {
    return await this.participantRepository.findOne(id)
  }

  async update(
    id: string,
    updateParticipantDto: UpdateParticipantDto
  ): Promise<Participant | undefined> {
    await this.participantRepository.update(id, updateParticipantDto)
    const res = this.participantRepository.findOne(id)
    if (!res) return undefined
    return res
  }

  async remove(id: number): Promise<void> {
    await this.participantRepository.delete(id)
  }
}
