import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type GameModeDocument = HydratedDocument<GameMode>

@Schema()
export class GameMode {
  _id!: string

  @Prop(String)
  name!: string
}

export const GameModeSchema = SchemaFactory.createForClass(GameMode)
