import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash, verify } from 'argon2'
import RegisterDto from 'src/dto/register.dto';
import { user } from '@prisma/client';
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import LoginDto from 'src/dto/login.dto';
@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

  async register(data: RegisterDto) {
    const password = await hash(data.password)

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        password
      }
    })
    return this.setToken(user)
  }

  async setToken({ name, id }: user) {
    const token = await this.jwt.signAsync({
      name,
      sub: id
    }, {
      secret: this.config.get('TOKEN_SECRET'),
    })
    return { token }
  }

  async login(data: LoginDto) {
    const { name, password } = data
    const user = await this.prisma.user.findUnique({
      where: {
        name
      }
    })
    if (!user) {
      throw new BadRequestException('用户不存在')
    }
    const paMatch = await verify(user.password, password)
    if (!paMatch) {
      throw new BadRequestException('密码错误')
    }
    return this.setToken(user)
  }
  async findAll() {
    const users = await this.prisma.user.findMany()

    return users
  }
}
