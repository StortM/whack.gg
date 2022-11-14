import { Champion } from 'src/champions/entities/champion.entity'
import { Team } from 'src/teams/entities/team.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TeamsBansChampions {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  teamId!: number

  @ManyToOne(() => Team, (team) => team.teamsBansChampions)
  team!: Team

  @Column()
  championId!: number

  @ManyToOne(() => Champion, (champion) => champion.teamsBansChampions)
  champion!: Champion
}
