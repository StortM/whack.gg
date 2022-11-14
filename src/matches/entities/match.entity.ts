import { Gamemode } from 'src/gamemodes/entities/gamemodes.entity'
import { Team } from 'src/teams/entities/team.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  duration!: number

  @Column({ type: 'bigint' })
  gameCreation!: number

  @ManyToOne(() => Gamemode)
  gameMode!: number

  @OneToMany(() => Team, (team) => team.match)
  teams!: Team[]
}
