import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type PositionDocument = HydratedDocument<Position>

@Schema()
export class Position {
  _id!: string

  @Prop(String)
  name!: string
}

export const PositionSchema = SchemaFactory.createForClass(Position)
