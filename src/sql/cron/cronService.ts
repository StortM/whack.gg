import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Connection } from 'typeorm'

@Injectable()
export class CronService {
  constructor(private readonly connection: Connection) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  /* 
    Function gets called by runtime every day at midnight.
    */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  insertDailyMatch() {
    this.connection.createQueryRunner().query('CALL insert_daily_match_count()')
  }
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  generatePostgressBackup() {}
}
