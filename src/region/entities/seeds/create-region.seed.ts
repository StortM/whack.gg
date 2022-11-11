import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Region } from '../region.entity'
import { CryptService } from 'src/crypt/crypt.service'
import { runMain } from 'module'

export default class CreateUsers implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    //const cryptService = new CryptService()
    const regions: Partial<Region>[] = [
      { name: 'EUW' },
      { name: 'NA' },
      { name: 'LAN' },
      { name: 'KR' }
    ]
    /* const region: Partial<Region> = {
      fullName: 'Admin',
      isAdmin: true,
      email: 'admin@admin.dk',
      passwordHash: await cryptService.hash('banankage')
    } */

    const queryRunner = await connection.createQueryRunner()

    queryRunner.startTransaction()

    try {
      regions.forEach((item) => {
        queryRunner.manager.save(item)
      })
      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }
}
