import { Mastery } from 'src/sql/masteries/entities/mastery.entity'
import { Participant } from 'src/sql/participants/entities/participant.entity'
import { TeamsBansChampions } from 'src/sql/teams_bans_champions/entities/teams_bans_champions.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

export type ChampionBans = {
  name: string
  banAmount: number
}

@Entity()
export class Champion {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @OneToMany(
    () => TeamsBansChampions,
    (teamsBansChampions) => teamsBansChampions.champion
  )
  teamsBansChampions!: TeamsBansChampions

  @OneToMany(() => Participant, (participant) => participant.champion)
  participants!: Participant

  @OneToMany(() => Mastery, (mastery) => mastery.champion)
  masteries!: Mastery[]
}
