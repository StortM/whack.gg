import { PartialType } from '@nestjs/mapped-types'
import { IsNumber, Max, Min } from 'class-validator'
import { CreateMasteryDto } from './create-mastery.dto'

export class UpdateMasteryDto {
  level!: number
  championPoints!: number
  lastPlayed!: number
}
