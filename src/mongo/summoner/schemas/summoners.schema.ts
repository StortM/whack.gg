import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type SummonerDocument = HydratedDocument<Summoner>

export type SummonerOmittingPasswordHash = Omit<Summoner, 'PasswordHash'>

export class Rank {
  gameMode!: string
  lp!: number
  tier!: string
  division!: string
}

export class Mastery {
  level!: number
  champointPoints!: number
  lastPlayed!: Date
  championName!: string
}

@Schema()
export class Summoner {
  _id!: string

  @Prop(String)
  name!: string

  @Prop(String)
  passwordHash!: string

  @Prop(Number)
  level!: number

  @Prop(Number)
  icon!: number

  @Prop(Rank)
  rank!: Rank[]

  @Prop(Mastery)
  masteries!: Mastery[]
}

export const SummonerSchema = SchemaFactory.createForClass(Summoner)
