/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty } from 'class-validator';
import RegisterDto from './register.dto';

export default class LoginDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    password: string;
}
