import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Auth } from 'src/decorator/auth.decorator';
import LoginDto from 'src/dto/login.dto';
import RegisterDto from 'src/dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly authServeer: AuthService) {}
  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authServeer.register(data);
  }

  @Post('login')
  login(@Body() data:LoginDto){
    return this.authServeer.login(data)
  }

  @Post('all')
  @Auth()
  findAll(@Req() req:Request){
    console.log(req.user);
    return this.authServeer.findAll()
  }
}
