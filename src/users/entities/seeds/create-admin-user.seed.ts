import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../user.entity'
import { CryptService } from 'src/crypt/crypt.service'

export default class CreateUsers implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const cryptService = new CryptService()
    const user: Partial<User> = {
      fullName: 'Admin',
      isAdmin: true,
      email: 'admin@admin.dk',
      passwordHash: await cryptService.hash('banankage')
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([user])
      .execute()
  }
}
