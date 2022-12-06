import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type RegionDocument = HydratedDocument<Region>

@Schema()
export class Region {
  _id!: string

  @Prop(String)
  name!: string
}

export const RegionSchema = SchemaFactory.createForClass(Region)
