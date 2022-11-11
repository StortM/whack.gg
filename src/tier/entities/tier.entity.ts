import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Tier {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  value!: string
}
