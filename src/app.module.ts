import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConnectionOptions, getConnectionOptions } from 'typeorm'
import { UsersModule } from './users/users.module'
import { SummonerModule } from './summoner/summoner.module'
import { RanksModule } from './ranks/ranks.module';
import { TiersModule } from './tiers/tiers.module';
import { DivisionsModule } from './divisions/divisions.module';
import { GameModesModule } from './game-modes/game-modes.module';
import { RegionsModule } from './regions/regions.module';
import { PositionsModule } from './positions/positions.module';

// Object containing Joi validations for envvars.
// Env vars will be loaded on app start and any vars not complying with Joi schema will cause error on startup.
const validation = {
  validationSchema: Joi.object({
    PORT: Joi.number().required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    TOKEN_SECRET: Joi.string().required()
  })
}

@Module({
  imports: [
    ConfigModule.forRoot(validation),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        Object.assign<ConnectionOptions, TypeOrmModuleOptions>(
          await getConnectionOptions(),
          {
            type: 'postgres',
            host: configService.get('POSTGRES_HOST'),
            port: +configService.get('POSTGRES_PORT'),
            username: configService.get('POSTGRES_USER'),
            password: configService.get('POSTGRES_PASSWORD'),
            database: configService.get('POSTGRES_DB'),
            autoLoadEntities: true
          }
        ),
      inject: [ConfigService]
    }),
    UsersModule,
    SummonerModule,
    RanksModule,
    TiersModule,
    DivisionsModule,
    GameModesModule,
    RegionsModule,
    PositionsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
