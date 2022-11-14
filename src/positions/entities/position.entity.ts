import { Participant } from 'src/participants/entities/participant.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @OneToMany(() => Participant, (participant) => participant.position)
  participants!: Participant
}
