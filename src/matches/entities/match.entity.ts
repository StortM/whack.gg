import { Gamemode } from 'src/gamemodes/entities/gamemodes.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  duration!: number

  @Column({ type: 'bigint' })
  gameCreation!: number

  @ManyToOne(() => Gamemode)
  gameMode!: number
}
