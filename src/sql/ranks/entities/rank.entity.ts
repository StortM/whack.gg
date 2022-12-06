import { Min } from 'class-validator'
import { Division } from 'src/sql/divisions/entities/division.entity'
import { GameMode } from 'src/sql/game-modes/entities/game-mode.entity'
import { Summoner } from 'src/sql/summoners/entities/summoner.entity'
import { Tier } from 'src/sql/tiers/entities/tier.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Rank {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  @Min(0)
  lp!: number

  @Column()
  gameModeId!: number

  @ManyToOne(() => GameMode, (gameMode) => gameMode.ranks)
  @JoinColumn({ name: 'gameModeId' })
  gameMode!: GameMode

  @Column()
  divisionId!: number

  @ManyToOne(() => Division, (division) => division.ranks, {
    cascade: true
  })
  @JoinColumn({ name: 'divisionId' })
  division!: Division

  @Column()
  tierId!: number

  @ManyToOne(() => Tier, (tier) => tier.ranks, {
    cascade: true
  })
  @JoinColumn({ name: 'tierId' })
  tier!: Tier

  @OneToMany(() => Summoner, (summoner) => summoner.rank)
  summoners!: Summoner[]
}
