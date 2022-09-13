import { Body, Controller, Post } from '@nestjs/common';
import RegisterDto from 'src/dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly authServeer: AuthService) {}
  @Post()
  index(@Body() data: RegisterDto) {
    return this.authServeer.register(data);
  }
}
