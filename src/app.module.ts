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
import { AuthModule as GraphAuthModule } from './graph/auth/auth.module'
import { ParticipantsModule as GraphParticipantsModule } from './graph/participants/participants.module'
import { SummonerModule as GraphSummonerModule } from './graph/summoner/summoner.module'
import { AuthModule as MongoAuthModule } from './mongo/auth/auth.module'
import { ChampionsModule as MongoChampionsModule } from './mongo/champions/champions.module'
import { DivisionsModule as MongoDivisionsModule } from './mongo/divisions/divisions.module'
import { GameModesModule as MongoGameModesModule } from './mongo/game-modes/game-modes.module'
import { MasteriesModule as MongoMasteriesModule } from './mongo/masteries/masteries.module'
import { MatchesModule as MongoMatchModule } from './mongo/matches/matches.module'
import { PositionsModule as MongoPositionsModule } from './mongo/positions/positions.module'
import { RegionsModule as MongoRegionsModule } from './mongo/regions/regions.module'
import { SummonerModule as MongoSummonerModule } from './mongo/summoner/summoners.module'
import { TiersModule as MongoTiersModule } from './mongo/tiers/tiers.module'
import { AuthModule as SqlGraphModule } from './sql/auth/auth.module'
import { ChampionsModule as SqlChampionsModule } from './sql/champions/champions.module'
import { DivisionsModule as SqlDivisionsModule } from './sql/divisions/divisions.module'
import { GameModesModule as SqlGameModesModule } from './sql/game-modes/game-modes.module'
import { MasteriesModule as SqlMasteriesModule } from './sql/masteries/masteries.module'
import { ParticipantsModule as SqlParticipantsModule } from './sql/participants/participants.module'
import { PositionsModule as SqlPositionsModule } from './sql/positions/positions.module'
import { RanksModule as SqlRanksModule } from './sql/ranks/ranks.module'
import { RegionsModule as SqlRegionsModule } from './sql/regions/regions.module'
import { SummonerModule as SqlSummonerModule } from './sql/summoners/summoner.module'
import { TeamsModule as SqlTeamsModule } from './sql/teams/teams.module'
import { TiersModule as SqlTiersModule } from './sql/tiers/tiers.module'

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
    SqlSummonerModule,
    SqlRanksModule,
    SqlTiersModule,
    SqlDivisionsModule,
    SqlGameModesModule,
    SqlRegionsModule,
    SqlPositionsModule,
    SqlParticipantsModule,
    SqlTeamsModule,
    SqlMasteriesModule,
    MongoRegionsModule,
    MongoMasteriesModule,
    MongoRegionsModule,
    MongoTiersModule,
    MongoGameModesModule,
    MongoDivisionsModule,
    MongoChampionsModule,
    MongoPositionsModule,
    MongoSummonerModule,
    MongoMatchModule,
    MongoAuthModule,
    GraphSummonerModule,
    GraphParticipantsModule,
    GraphAuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
