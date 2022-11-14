import { Min } from 'class-validator'
import { Division } from 'src/divisions/entities/division.entity'
import { Summoner } from 'src/summoners/entities/summoner.entity'
import { Tier } from 'src/tiers/entities/tier.entity'
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
  divisionId!: number

  @ManyToOne(() => Division, (division) => division.ranks)
  @JoinColumn({ name: 'divisionId' })
  division!: Division

  @Column()
  tierId!: number

  @ManyToOne(() => Tier, (tier) => tier.ranks)
  @JoinColumn({ name: 'tierId' })
  tier!: Tier

  @OneToMany(() => Summoner, (summoner) => summoner.rank)
  summoners!: Summoner[]
}
