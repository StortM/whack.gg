import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcrypt'
import { saltRounds } from '../auth/constants'

export interface ICryptService {
  hash(input: string): Promise<string>
  compare(input1: string, input2: string): Promise<boolean>
}

@Injectable()
export class CryptService implements ICryptService {
  async hash(input: string): Promise<string> {
    return hash(input, saltRounds)
  }
  async compare(input1: string, input2: string): Promise<boolean> {
    return compare(input1, input2)
  }
}
