import { IsInstance, IsNumber, Min } from 'class-validator'
import { Division } from 'src/divisions/entities/division.entity'
import { Tier } from 'src/tiers/entities/tier.entity'

export class CreateRankDto {
  @IsNumber()
  @Min(0)
  lp!: number

  @IsInstance(Division)
  division!: Division

  @IsInstance(Tier)
  tier!: Tier
}
