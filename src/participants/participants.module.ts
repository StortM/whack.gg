import { Module } from '@nestjs/common'
import { ParticipantsService } from './participants.service'
import { ParticipantsController } from './participants.controller'
import { Participant } from './entities/participant.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  exports: [ParticipantsService]
})
export class ParticipantsModule {}
