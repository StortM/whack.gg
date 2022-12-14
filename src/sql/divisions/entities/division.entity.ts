import { Rank } from 'src/sql/ranks/entities/rank.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Division {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  name!: string

  @OneToMany(() => Rank, (rank) => rank.division)
  ranks!: Rank[]
}
