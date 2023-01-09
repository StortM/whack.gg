import { ApiProperty } from '@nestjs/swagger/dist'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class CreateParticipantDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  assists!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  deaths!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  kills!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  baronKills!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  consumablePurchased!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  damageDealtToBuildings!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  damageDealtToObjectives!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  damageDealtToTurrets!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  damageSelfMitigated!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  doubleKills!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  tripleKills!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  quadraKills!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  pentaKills!: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  summonerName!: string
}
