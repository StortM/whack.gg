import { Match } from 'src/match/entities/match.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Match)
  match!: number

  @Column()
  matchWon!: boolean
}
