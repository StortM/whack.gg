import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export type UserOmittingPasswordHash = Omit<User, 'passwordHash'>

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  fullName!: string

  @Column()
  isAdmin!: boolean

  @Column({ unique: true })
  email!: string

  @Column()
  passwordHash!: string
}
