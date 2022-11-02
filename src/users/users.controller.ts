import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UseGuards,
  UseFilters,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Headers
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { UserOmittingPasswordHash } from './entities/user.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { AdminGuard } from 'src/auth/admin.guard'
import { UpdateUserDto } from './dto/update-user.dto'
import { CatchAllExceptionsFilter } from 'src/utils/exception.filter'
import { ResultInterceptor } from 'src/utils/result.interceptor'
import { AuthService } from 'src/auth/auth.service'

@UseFilters(new CatchAllExceptionsFilter())
@UseInterceptors(new ResultInterceptor())
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService
  ) {}

  // Endpoint is open for all, but only admins can create admin users
  @Post()
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDTO,
    @Headers('Authorization') auth: string
  ): Promise<UserOmittingPasswordHash | undefined> {
    const isCreatingAdminUser = createUserDto.isAdmin

    if (isCreatingAdminUser) {
      if (auth) {
        const token = auth.split(' ')[1]
        const isAdmin = await this.authService.isAdminToken(token)

        if (!isAdmin) {
          throw new HttpException('Forbidden', 403)
        }
      } else {
        throw new HttpException('Forbidden', 403)
      }
    }

    return this.usersService.create(createUserDto)
  }

  // Note: This endpoint is paginated and searchable (on fullname, email) using the optional parameters: query = "", offset = 0, limit = 20
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('query') query: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number
  ): Promise<UserOmittingPasswordHash[]> {
    return this.usersService.findAll(query, offset, limit)
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<UserOmittingPasswordHash | undefined> {
    const user = await this.usersService.findOne(id)
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return user
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto
  ): Promise<UserOmittingPasswordHash | undefined> {
    const user = await this.usersService.update(id, updateUserDto)
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return user
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id)
  }
}
