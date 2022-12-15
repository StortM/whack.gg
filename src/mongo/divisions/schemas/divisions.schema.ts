import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type DivisionDocument = HydratedDocument<Division>

@Schema()
export class Division {
  _id!: string

  @Prop(String)
  name!: string
}

export const DivisionSchema = SchemaFactory.createForClass(Division)
