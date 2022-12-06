import { GameMode } from 'src/sql/game-modes/entities/game-mode.entity'
import { Team } from 'src/sql/teams/entities/team.entity'
import {
  Column,
  Entity,
  JoinColumn,
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

  @Column()
  gameModeId!: number

  @ManyToOne(() => GameMode, (gameMode) => gameMode.match)
  @JoinColumn({ name: 'gameModeId' })
  gameMode!: GameMode

  @OneToMany(() => Team, (team) => team.match)
  teams!: Team[]
}
