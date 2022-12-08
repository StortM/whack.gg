import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DivisionsController } from './divisions.controller'
import { DivisionsService } from './divisions.service'
import { Division, DivisionSchema } from './schemas/divisions.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Division.name, schema: DivisionSchema }])
  ],
  controllers: [DivisionsController],
  providers: [DivisionsService]
})
export class DivisionsModule {}
