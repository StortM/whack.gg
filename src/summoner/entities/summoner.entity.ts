import { Rank } from 'src/ranks/entities/rank.entity'
import { Region } from 'src/region/entities/region.entity'
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

export class Summoner {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  level!: number

  @Column()
  icon!: number

  @ManyToOne(() => Region)
  regionId!: number

  @ManyToOne(() => Rank)
  rankId!: number
}
