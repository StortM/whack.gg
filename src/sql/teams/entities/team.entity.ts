import { Match } from 'src/sql/matches/entities/match.entity'
import { Participant } from 'src/sql/participants/entities/participant.entity'
import { TeamsBansChampions } from 'src/sql/teams_bans_champions/entities/teams_bans_champions.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  matchId!: number

  @ManyToOne(() => Match, (match) => match.teams)
  @JoinColumn({ name: 'matchId' })
  match!: Match

  @Column()
  matchWon!: boolean

  @OneToMany(
    () => TeamsBansChampions,
    (teamsBansChampions) => teamsBansChampions.team
  )
  teamsBansChampions!: TeamsBansChampions

  @OneToMany(() => Participant, (participant) => participant.team)
  participants!: Participant
}
