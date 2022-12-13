import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { SummonerModule } from './../summoner/summoners.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [
    SummonerModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('TOKEN_SECRET'),
        signOptions: { expiresIn: '24h' }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
  exports: [AuthService, JwtModule],
  controllers: [AuthController]
})
export class AuthModule {}
