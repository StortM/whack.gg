import { Match } from 'src/match/entities/match.entity'
import { Team } from 'src/teams/entities/team.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TeamsBansChampions {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Team)
  team!: number

  @Column()
  champion!: number

  @ManyToOne(() => Match)
  match!: number
}
