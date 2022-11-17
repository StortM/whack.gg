import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { ParticipantsService } from './participants.service'
import { CreateParticipantDto } from './dto/create-participant.dto'
import { UpdateParticipantDto } from './dto/update-participant.dto'
import { Participant } from './entities/participant.entity'

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  create(
    @Body() createParticipantDto: CreateParticipantDto
  ): Promise<Participant | undefined> {
    return this.participantsService.create(createParticipantDto)
  }

  @Get()
  findAll(): Promise<Participant[] | undefined> {
    return this.participantsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Participant | undefined> {
    return this.participantsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto
  ): Promise<Participant | undefined> {
    return this.participantsService.update(id, updateParticipantDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.participantsService.remove(+id)
  }
}
