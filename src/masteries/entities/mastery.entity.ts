import { Champion } from 'src/champions/entities/champion.entity'
import { Summoner } from 'src/summoners/entities/summoner.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Mastery {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  level!: number

  @Column()
  summonerId!: number

  @Column()
  championId!: number

  @Column()
  championPoints!: number

  @Column({ type: 'bigint' })
  lastPlayed!: number

  @ManyToOne(() => Summoner, (summoner) => summoner.masteries)
  @JoinColumn({ name: 'summonerId' })
  summoner!: Summoner

  @ManyToOne(() => Champion, (champion) => champion.masteries)
  @JoinColumn({ name: 'championId' })
  champion!: Champion
}
