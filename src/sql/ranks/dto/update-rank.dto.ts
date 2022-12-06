import { IsInstance, IsNumber, Min } from 'class-validator'
import { Division } from 'src/sql/divisions/entities/division.entity'
import { Tier } from 'src/sql/tiers/entities/tier.entity'

export class UpdateRankDto {
  @IsNumber()
  @Min(0)
  lp!: number

  @IsInstance(Division)
  division!: Division

  @IsInstance(Tier)
  tier!: Tier
}
