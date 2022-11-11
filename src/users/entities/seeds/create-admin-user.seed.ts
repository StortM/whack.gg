import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../user.entity'
import { CryptService } from '../../../crypt/crypt.service'

export default class CreateUsers implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const cryptService = new CryptService()
    const user: Partial<User> = {
      fullName: 'Admin',
      isAdmin: true,
      email: 'admin@admin.dk',
      passwordHash: await cryptService.hash('banankage')
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
