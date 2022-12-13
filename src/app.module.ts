/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as Joi from 'joi'
import { Neo4jConfig, Neo4jModule } from 'nest-neo4j/dist'
import { ConnectionOptions, getConnectionOptions } from 'typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ParticipantsModule as GraphParticipantsModule } from './graph/participants/participants.module'
import { SummonerModule as GraphSummonerModule } from './graph/summoner/summoner.module'
import { RegionsModule as MongoRegionsModule } from './mongo/regions/regions.module'
import { AuthModule as SqlGraphModule } from './sql/auth/auth.module'
import { ChampionsModule as SqlChampionsModule } from './sql/champions/champions.module'
import { DivisionsModule } from './sql/divisions/divisions.module'
import { GameModesModule } from './sql/game-modes/game-modes.module'
import { MasteriesModule } from './sql/masteries/masteries.module'
import { ParticipantsModule as SqlParticipantsModule } from './sql/participants/participants.module'
import { PositionsModule } from './sql/positions/positions.module'
import { RanksModule } from './sql/ranks/ranks.module'
import { RegionsModule } from './sql/regions/regions.module'
import { TeamsModule } from './sql/teams/teams.module'
import { TiersModule } from './sql/tiers/tiers.module'
import { AuthModule as GraphAuthModule } from './graph/auth/auth.module'

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
    DATABASE_URI: Joi.string().required(),
    TOKEN_SECRET: Joi.string().required(),
    MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
    MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
    MONGO_INITDB_PORT: Joi.number().required(),
    ME_CONFIG_BASICAUTH_USERNAME: Joi.string().required(),
    ME_CONFIG_BASICAUTH_PASSWORD: Joi.string().required(),
    ME_CONFIG_MONGODB_URL: Joi.string().required(),
    NEO4J_AUTH: Joi.string().required(),
    NEO4J_USERNAME: Joi.string().required(),
    NEO4J_PASSWORD: Joi.string().required(),
    NEO4J_URI: Joi.string().required(),
    NEO4J_SCHEME: Joi.string().required(),
    NEO4J_PORT: Joi.number().required(),
    NEO4J_HOST: Joi.string().required()
  })
}

@Module({
  imports: [
    ConfigModule.forRoot({ ...validation, isGlobal: true }),
    Neo4jModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Neo4jConfig => ({
        scheme: configService.get('NEO4J_SCHEME')!,
        host: configService.get('NEO4J_HOST')!,
        port: configService.get('NEO4J_PORT')!,
        username: configService.get('NEO4J_USERNAME')!,
        password: configService.get('NEO4J_PASSWORD')!,
        database: configService.get('NEO4J_DATABASE')
      })
    }),
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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [ConfigService]
    }),
    SqlGraphModule,
    SqlChampionsModule,
    GraphSummonerModule,
    RanksModule,
    TiersModule,
    DivisionsModule,
    GameModesModule,
    RegionsModule,
    PositionsModule,
    SqlParticipantsModule,
    TeamsModule,
    MongoRegionsModule,
    GraphSummonerModule,
    MasteriesModule,
    GraphParticipantsModule,
    GraphAuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
