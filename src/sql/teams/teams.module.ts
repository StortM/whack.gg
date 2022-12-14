import { Module } from '@nestjs/common'
import { TeamsService } from './teams.service'
import { TeamsController } from './teams.controller'
import { Team } from './entities/team.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TeamsBansChampions } from '../teams_bans_champions/entities/teams_bans_champions.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamsBansChampions])],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService]
})
export class TeamsModule {}
