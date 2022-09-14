import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { PrismaController } from './prisma/prisma.controller'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
  ],
  controllers: [AuthController, PrismaController],
  providers: [AuthService],
})
export class AppModule {}
