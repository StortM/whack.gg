/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'
import * as Joi from 'joi'
import { Neo4jConfig, Neo4jModule } from 'nest-neo4j/dist'
import { ConnectionOptions, getConnectionOptions } from 'typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './sql/auth/auth.module'
import { DivisionsModule } from './sql/divisions/divisions.module'
import { GameModesModule } from './sql/game-modes/game-modes.module'
import { UserModule } from './graph/graph.module'
import { ParticipantsModule } from './sql/participants/participants.module'
import { PositionsModule } from './sql/positions/positions.module'
import { RanksModule } from './sql/ranks/ranks.module'
import { RegionsModule } from './sql/regions/regions.module'
import { SummonerModule } from './sql/summoners/summoner.module'
import { ChampionsModule } from './sql/champions/champions.module'
import { MasteriesModule as MongoMasteriesModule } from './mongo/masteries/masteries.module'
import { MasteriesModule } from './sql/masteries/masteries.module'
import { TiersModule } from './sql/tiers/tiers.module'
import { TeamsModule } from './sql/teams/teams.module'
import { RegionsModule as MongoRegionsModule } from './mongo/regions/regions.module'
import { TiersModule as MongoTiersModule } from './mongo/tiers/tiers.module'
import { GameModesModule as MongoGameModesModule } from './mongo/game-modes/game-modes.module'
import { DivisionsModule as MongoDivisionsModule } from './mongo/divisions/divisions.module'
import { ChampionsModule as MongoChampionsModule } from './mongo/champions/champions.module'
import { PositionsModule as MongoPositionsModule } from './mongo/positions/positions.module'

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
    NEO4J_HOST: Joi.string().required(),
    HASH_ROUNDS: Joi.number().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required()
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
    AuthModule,
    ChampionsModule,
    SummonerModule,
    RanksModule,
    TiersModule,
    DivisionsModule,
    GameModesModule,
    RegionsModule,
    PositionsModule,
    ParticipantsModule,
    TeamsModule,
    MongoRegionsModule,
    MongoMasteriesModule,
    UserModule,
    MasteriesModule,
    ChampionsModule,
    MongoRegionsModule,
    MongoTiersModule,
    MongoGameModesModule,
    MongoDivisionsModule,
    MongoChampionsModule,
    MongoPositionsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
