import { Length } from 'class-validator'
import { Match } from 'src/matches/entities/match.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class GameMode {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  @Length(1, 45)
  name!: string

  @OneToMany(() => Match, (match) => match.gameMode)
  match!: Match
}
