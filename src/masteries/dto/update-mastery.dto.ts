import { PartialType } from '@nestjs/mapped-types'
import { CreateMasteryDto } from './create-mastery.dto'

export class UpdateMasteryDto extends PartialType(CreateMasteryDto) {
  level!: number
}
