import { Participant } from 'src/sql/participants/entities/participant.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  name!: string

  @OneToMany(() => Participant, (participant) => participant.position)
  participants?: Participant[]
}
