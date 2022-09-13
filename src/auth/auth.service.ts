import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash } from 'argon2'
import RegisterDto from 'src/dto/register.dto';

@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}

  async register(data:RegisterDto) {
    const password =await hash(data.password)
    const user = this.prisma.user.create({
      data:{
        name:data.name,
        password
      }
    })
    return user;
  }
}
