import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import Validate from './common/Validate'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  })
  app.useGlobalPipes(new Validate())
  await app.listen(3000)
}
bootstrap()
