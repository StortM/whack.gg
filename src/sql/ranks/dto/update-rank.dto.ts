import { ApiProperty } from '@nestjs/swagger'
import { IsInstance, IsNumber, Min } from 'class-validator'
import { Division } from 'src/sql/divisions/entities/division.entity'
import { Tier } from 'src/sql/tiers/entities/tier.entity'

export class UpdateRankDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  lp!: number

  @ApiProperty()
  @IsInstance(Division)
  division!: Division

  @ApiProperty()
  @IsInstance(Tier)
  tier!: Tier
}
