import { Division } from 'src/divisions/entities/division.entity'
import { Tier } from 'src/tiers/entities/tier.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Rank {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  lp!: number

  @ManyToOne(() => Division)
  division!: Division

  @ManyToOne(() => Tier)
  tier!: Tier
}
