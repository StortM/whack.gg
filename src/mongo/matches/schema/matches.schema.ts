import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsArray, IsNumber, Length, Max } from 'class-validator'
import { HydratedDocument } from 'mongoose'

export type MatchDocument = HydratedDocument<Match>

export class Participant {
  @IsNumber()
  assists!: number
  @IsNumber()
  deaths!: number
  @IsNumber()
  kills!: number
  @IsNumber()
  baronKills!: number
  @IsNumber()
  consumablePurchased!: number
  @IsNumber()
  damageDealtToBuildings!: number
  @IsNumber()
  damageDealtToObjectives!: number
  @IsNumber()
  damageDealtToTurret!: number
  @IsNumber()
  damageSelfMitigated!: number
  @IsNumber()
  doubleKills!: number
  @IsNumber()
  tripleKills!: number
  @IsNumber()
  quadraKills!: number
  @IsNumber()
  pentaKills!: number
  @IsNumber()
  position!: string
}

export class Team {
  matchWon!: boolean

  @IsArray()
  @Length(5)
  bans!: string[]

  @IsArray()
  @Length(5)
  participants!: Participant[]
}

@Schema()
export class Match {
  @Prop(Number)
  duration!: number

  @Prop(String)
  gameMode!: string

  @Prop(Date)
  gameCreation!: number

  @Prop(String)
  championName!: string

  @Prop(Team)
  teams!: Team[]
}

export const MatchSchema = SchemaFactory.createForClass(Match)
