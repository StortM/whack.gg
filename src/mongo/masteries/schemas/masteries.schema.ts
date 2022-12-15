import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, ObjectId } from 'mongoose'

export type MasteryDocument = HydratedDocument<Mastery>

@Schema()
export class Mastery {
  @Prop(Number)
  level!: number

  @Prop(Number)
  championPoints!: number

  @Prop(Date)
  lastPlayed!: Date

  @Prop(String)
  championName!: string
}

export const MasterySchema = SchemaFactory.createForClass(Mastery)
