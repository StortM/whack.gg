import { Module, OnModuleInit } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Neo4jService } from 'nest-neo4j/dist'
import { CryptService } from 'src/sql/crypt/crypt.service'
import { AuthService } from '../auth/auth.service'
import { JwtStrategy } from '../auth/jwt.strategy'
import { LocalStrategy } from '../auth/local.strategy'
import { SummonerController } from './summoner.controller'
import { SummonerService } from './summoner.service'

// taken from https://github.com/neo4j-examples/nestjs-neo4j-realworld-example/blob/master/test/app.e2e-spec.ts
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN')
        }
      })
    })
  ],
  providers: [
    SummonerService,
    LocalStrategy,
    JwtStrategy,
    AuthService,
    CryptService
  ],
  controllers: [SummonerController],
  exports: [SummonerService]
})
export class SummonerModule implements OnModuleInit {
  constructor(private readonly neo4jService: Neo4jService) {}

  async onModuleInit(): Promise<void> {
    await this.neo4jService
      .write(`CREATE CONSTRAINT ON (s:Summoner) ASSERT u.id IS UNIQUE`)
      .catch((e) => {
        console.error(e)
      })
    /*     await this.neo4jService
      .write(`CREATE CONSTRAINT ON (s:Summoner) ASSERT u.username IS UNIQUE`)
      .catch((e) => {
        console.error(e)
      })
    await this.neo4jService
      .write(`CREATE CONSTRAINT ON (s:Summoner) ASSERT u.email IS UNIQUE`)
      .catch((e) => {
        console.error(e)
      }) */
  }
}
