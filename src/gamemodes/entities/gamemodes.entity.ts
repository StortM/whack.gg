import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Gamemode {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string
}
