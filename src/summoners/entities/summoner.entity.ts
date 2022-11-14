import { Participant } from 'src/participants/entities/participant.entity'
import { Rank } from 'src/ranks/entities/rank.entity'
import { Region } from 'src/regions/entities/region.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
@Entity()
export class Summoner {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  level!: number

  @Column()
  icon!: number

  @Column()
  regionId!: number

  @ManyToOne(() => Region, (region) => region.summoners)
  @JoinColumn([{ name: 'regionId' }])
  region!: Region

  @Column()
  rankId!: number

  @ManyToOne(() => Rank, (rank) => rank.summoners)
  @JoinColumn([{ name: 'rankId' }])
  rank!: Rank

  @OneToMany(() => Participant, (participant) => participant.summoner)
  participants!: Participant
}
