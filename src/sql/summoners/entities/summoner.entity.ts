import { Mastery } from 'src/sql/masteries/entities/mastery.entity'
import { Participant } from 'src/sql/participants/entities/participant.entity'
import { Rank } from 'src/sql/ranks/entities/rank.entity'
import { Region } from 'src/sql/regions/entities/region.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

export type SummonerOmittingPasswordHash = Omit<Summoner, 'passwordHash'>

export type SummonerWithFullRank = {
  summonerName: string
  rank: string
  lp: number
}

@Entity()
export class Summoner {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  summonerName!: string

  @Column()
  level!: number

  @Column()
  icon!: number

  @Column()
  passwordHash!: string

  @Column()
  isAdmin!: boolean

  @Column({ nullable: true })
  regionId!: number | null

  @ManyToOne(() => Region, (region) => region.summoners, { cascade: true })
  @JoinColumn([{ name: 'regionId' }])
  region?: Region

  @Column({ nullable: true })
  rankId!: number | null

  @ManyToOne(() => Rank, (rank) => rank.summoners, {
    cascade: true
  })
  @JoinColumn([{ name: 'rankId' }])
  rank?: Rank

  @OneToMany(() => Participant, (participant) => participant.summoner)
  participants?: Participant

  @OneToMany(() => Mastery, (mastery) => mastery.summoner)
  masteries?: Mastery[]
}
