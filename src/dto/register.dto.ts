/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export default class RegisterDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}
