import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ChampionDocument = HydratedDocument<Champion>

@Schema()
export class Champion {
  _id!: string

  @Prop(String)
  name!: string
}

export const ChampionSchema = SchemaFactory.createForClass(Champion)
