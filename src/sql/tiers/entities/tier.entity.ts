import { Rank } from 'src/sql/ranks/entities/rank.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Tier {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  value!: string

  @OneToMany(() => Rank, (rank) => rank.tier)
  ranks!: Rank[]
}
