import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TierDocument = HydratedDocument<Tier>

@Schema()
export class Tier {
  _id!: string

  @Prop(String)
  value!: string
}

export const TierSchema = SchemaFactory.createForClass(Tier)
