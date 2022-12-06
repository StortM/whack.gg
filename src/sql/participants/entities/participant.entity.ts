import { Champion } from 'src/sql/champions/entities/champion.entity'
import { Position } from 'src/sql/positions/entities/position.entity'
import { Summoner } from 'src/sql/summoners/entities/summoner.entity'
import { Team } from 'src/sql/teams/entities/team.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  assists!: number

  @Column()
  deaths!: number

  @Column()
  kills!: number

  @Column()
  baronKills!: number

  @Column()
  consumablePurchased!: number

  @Column()
  damageDealtToBuildings!: number

  @Column()
  damageDealtToObjectives!: number

  @Column()
  damageDealtToTurrets!: number

  @Column()
  damageSelfMitigated!: number

  @Column()
  doubleKills!: number

  @Column()
  tripleKills!: number

  @Column()
  quadraKills!: number

  @Column()
  pentaKills!: number

  @Column()
  teamId!: number

  @ManyToOne(() => Team, (team) => team.participants)
  team!: Team

  @Column()
  positionId!: number

  @ManyToOne(() => Position, (position) => position.participants)
  position!: Position

  @Column()
  summonerId!: number

  @ManyToOne(() => Summoner, (summoner) => summoner.participants)
  summoner!: Summoner

  @Column()
  championId!: number

  @ManyToOne(() => Champion, (champion) => champion.participants)
  champion!: Champion
}
