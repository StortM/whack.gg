import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { CryptService } from '../../../crypt/crypt.service'
import { User } from '../user.entity'

export default class CreateUsers implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const cryptService = new CryptService()
    const hashedPass = await cryptService.hash('test')

    const user: Partial<User> = {
      fullName: 'Admin',
      isAdmin: true,
      email: 'admin@admin.dk',
      passwordHash: hashedPass
    }

    try {
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            fullName: user.fullName,
            isAdmin: user.isAdmin,
            email: user.email,
            passwordHash: user.passwordHash
          }
        ])
        .execute()
    } catch (error) {}
  }
}
