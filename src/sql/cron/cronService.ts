import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Connection } from 'typeorm'

@Injectable()
export class CronService {
  constructor(private readonly connection: Connection) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  syncSomething() {
    console.log('Calling Procedure')
    this.connection.createQueryRunner().query('CALL insert_daily_match_count()')
  }
}
