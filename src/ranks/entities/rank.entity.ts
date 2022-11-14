import { Min } from 'class-validator'
import { Division } from 'src/divisions/entities/division.entity'
import { Tier } from 'src/tiers/entities/tier.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Rank {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Division)
  division!: number

  @ManyToOne(() => Tier)
  tier!: number

  @Column()
  @Min(0)
  lp!: number
}
