import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Mastery } from 'src/sql/masteries/entities/mastery.entity'
import { MasteriesController } from './masteries.controller'
import { MasteriesService } from './masteries.service'
import { MasterySchema } from './schemas/masteries.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mastery.name, schema: MasterySchema }])
  ],
  controllers: [MasteriesController],
  providers: [MasteriesService]
})
export class MasteriesModule {}
