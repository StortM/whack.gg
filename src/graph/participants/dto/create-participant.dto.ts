import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class CreateParticipantDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  assists!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  deaths!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  kills!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  baronKills!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  consumablePurchased!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  damageDealtToBuildings!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  damageDealtToObjectives!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  damageDealtToTurrets!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  damageSelfMitigated!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  doubleKills!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  tripleKills!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  quadraKills!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  pentaKills!: number

  @IsNotEmpty()
  @IsString()
  summonerName!: string
}
