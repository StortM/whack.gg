import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'
import { CreateUserDTO } from './dto/create-user.dto'
import { User, UserOmittingPasswordHash } from './entities/user.entity'
import { CryptService } from 'src/crypt/crypt.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private cryptService: CryptService
  ) {}

  async create(
    createUserDto: CreateUserDTO
  ): Promise<UserOmittingPasswordHash | undefined> {
    const hash = await this.cryptService.hash(createUserDto.password)

    const user = {
      fullName: createUserDto.fullName,
      isAdmin: createUserDto.isAdmin,
      email: createUserDto.email.toLowerCase().trim(),
      passwordHash: hash
    }

    const savedUser = await this.userRepository.save(user)

    if (!savedUser) {
      return undefined
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userNoPassword } = savedUser

    return userNoPassword
  }

  // Note: Exclude passwordHash in returned users
  async findAll(
    query = '',
    offset = 0,
    limit = 20
  ): Promise<UserOmittingPasswordHash[]> {
    const findOptions = {
      skip: offset,
      take: limit,
      where: {}
    }

    // if email or username is being searched for, find either email or fullName matching query
    if (query) {
      findOptions.where = [
        { email: ILike(`%${query}%`) },
        { fullName: ILike(`%${query}%`) }
      ]
    }

    // get results from db
    const results: User[] = await this.userRepository.find(findOptions)

    // strip passwordHash from all found results
    const resultsNoPassword = results.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...userNoPassword } = user

      return userNoPassword
    })

    return resultsNoPassword
  }

  async findOne(id: string): Promise<UserOmittingPasswordHash | undefined> {
    const res = await this.userRepository.findOne({ id: id })
    if (!res) {
      return undefined
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = res
    return userWithoutPassword
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserOmittingPasswordHash | undefined> {
    interface UpdateUser {
      fullName: string
      isAdmin: boolean
      email: string
      passwordHash?: string
    }

    const user: UpdateUser = {
      fullName: updateUserDto.fullName,
      isAdmin: updateUserDto.isAdmin,
      email: updateUserDto.email.toLowerCase().trim()
    }
    if (updateUserDto.password) {
      user.passwordHash = await this.cryptService.hash(updateUserDto.password)
    }

    await this.userRepository.update(id, user)

    const res = await this.userRepository.findOne(id)
    if (!res) {
      return undefined
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = res

    return userWithoutPassword
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }

  async findOneWithPasswordHash(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      email: email.toLowerCase().trim()
    })
  }
}
