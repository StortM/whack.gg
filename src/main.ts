import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { getConnection } from 'typeorm'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await getConnection().runMigrations()

  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('WhackGG API')
    .setDescription('This is the API for WhackGG')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none'
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await app.listen(process.env.PORT!)
}
bootstrap()
