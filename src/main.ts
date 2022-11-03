import { ClassSerializerInterceptor } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { getConnection } from 'typeorm'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await getConnection().runMigrations()
  app.enableCors()

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await app.listen(process.env.PORT!)
}
bootstrap()
