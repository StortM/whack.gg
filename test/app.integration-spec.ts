import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('/', () => {
  let app: INestApplication
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = module.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await module.close()
  })

  describe('/ (GET)', () => {
    it('Can get index', async () => {
      await request(app.getHttpServer()).get('/').expect(200)
    })
  })
})
