import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, LeanDocument } from 'mongoose'

export type SummonerDocument = HydratedDocument<Summoner>

export type SummonerOmittingPasswordHash = Omit<Summoner, 'passwordHash'>

export type LeanSummonerDocument = LeanDocument<Summoner>

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
  summonerName!: string

  @Prop(String)
  passwordHash!: string

  @Prop(Boolean)
  isAdmin!: boolean

  @Prop(Number)
  level?: number

  @Prop(Number)
  icon?: number

  @Prop(Rank)
  rank?: Rank[]

  @Prop(Mastery)
  masteries?: Mastery[]
}

export const SummonerSchema = SchemaFactory.createForClass(Summoner)
