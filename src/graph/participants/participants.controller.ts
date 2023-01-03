import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateParticipantDto } from './dto/create-participant.dto'
import { UpdateParticipantDto } from './dto/update-participant.dto'
import { Participant } from './entities/participant.entity'
import { ParticipantsService } from './participants.service'

@ApiTags('Graph Participants')
@Controller('/graph/participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  async create(
    @Body() createParticipantDto: CreateParticipantDto
  ): Promise<Participant> {
    const participant = await this.participantsService.create(
      createParticipantDto
    )

    return participant.toJson()
  }

  @Get()
  async findAll(): Promise<Participant[]> {
    return await this.participantsService
      .findAll()
      .then((participants) =>
        participants.map((participant) => participant.toJson())
      )
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Participant> {
    return await this.participantsService.findOne(+id).then((participant) => {
      if (!participant) throw new Error('Participant not found')
      return participant.toJson()
    })
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto
  ): Promise<Participant> {
    return (
      await this.participantsService.update(+id, updateParticipantDto)
    ).toJson()
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.participantsService.remove(+id)
  }
}
