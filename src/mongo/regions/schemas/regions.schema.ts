import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Region {
  _id!: string

  Prop(String)
  name!: string
}

export const RegionSchema = SchemaFactory.createForClass(Region)
