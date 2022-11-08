import { Length } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Tier {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  @Length(1, 10)
  value!: string
}
