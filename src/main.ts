import { ClassSerializerInterceptor } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import Validate from './common/Validate'
import { TransformInterceptor } from './interceptor/transFormInterceptor'

async function bootstrap() {
  // 使用express对应api
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  })
  // 使用全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  // 请求接口带api
  app.setGlobalPrefix('api')
  // 使用全局的验证管道
  app.useGlobalPipes(new Validate())
  // 使用全局序列化   意思是对每个字段进行处理
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  await app.listen(3000)
}
bootstrap()
