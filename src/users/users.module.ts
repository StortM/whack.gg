import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { AuthService } from 'src/auth/auth.service'
import { AuthModule } from 'src/auth/auth.module'
import { CryptService } from 'src/crypt/crypt.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, CryptService, AuthService],
  exports: [UsersService]
})
export class UsersModule {}
