import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { CreateParticipantDto } from './dto/create-participant.dto'
import { UpdateParticipantDto } from './dto/update-participant.dto'
import { Participant } from './entities/participant.entity'
import { ParticipantsService } from './participants.service'

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
  async findAll() {
    return this.participantsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.participantsService.findOne(+id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto
  ) {
    return this.participantsService.update(+id, updateParticipantDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.participantsService.remove(+id)
  }
}
