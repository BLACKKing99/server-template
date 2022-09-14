import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash } from 'argon2'
import RegisterDto from 'src/dto/register.dto';
import { user } from '@prisma/client';
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService,private jwt:JwtService) {}

  async register(data:RegisterDto) {
    const password =await hash(data.password)
    
    const user = await this.prisma.user.create({
      data:{
        name:data.name,
        password
      }
    })
    return this.setToken(user)
  }

  async setToken({name,id}:user){
    console.log(name,id,'333333333');
    const token = await this.jwt.signAsync({
      name,
      id
    },{
      secret:'22223333'
    })
    return token
  }
}
