import { CryptService } from './crypt.service'

export class MockCryptService implements CryptService {
  async hash(input: string): Promise<string> {
    return `hashed-${input}`
  }
  async compare(input1: string, input2: string): Promise<boolean> {
    return input1 === (await this.hash(input2))
  }
}
