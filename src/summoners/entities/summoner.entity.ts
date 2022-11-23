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

export type SummonerOmittingPasswordHash = Omit<Summoner, 'passwordHash'>

@Entity()
export class Summoner {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
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
  region!: Region

  @Column({ nullable: true })
  rankId!: number | null

  @ManyToOne(() => Rank, (rank) => rank.summoners, {
    cascade: true
  })
  @JoinColumn([{ name: 'rankId' }])
  rank!: Rank

  @OneToMany(() => Participant, (participant) => participant.summoner)
  participants!: Participant
}
