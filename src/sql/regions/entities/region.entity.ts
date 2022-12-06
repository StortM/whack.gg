import { Summoner } from 'src/sql/summoners/entities/summoner.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @OneToMany(() => Summoner, (summoner) => summoner.region)
  summoners!: Summoner[]
}
