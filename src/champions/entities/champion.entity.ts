import { Mastery } from 'src/masteries/entities/mastery.entity'
import { Participant } from 'src/participants/entities/participant.entity'
import { TeamsBansChampions } from 'src/teams_bans_champions/entities/teams_bans_champions.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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
