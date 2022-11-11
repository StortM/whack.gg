import { Champion } from 'src/champions/entities/champion.entity'
import { Position } from 'src/position/entities/position.entity'
import { Summoner } from 'src/summoner/entities/summoner.entity'
import { Team } from 'src/teams/entities/team.entity'
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

  @ManyToOne(() => Team)
  teamId!: number

  @ManyToOne(() => Position)
  positionId!: number

  @ManyToOne(() => Summoner)
  summonerId!: number

  @ManyToOne(() => Champion)
  championId!: number
}
