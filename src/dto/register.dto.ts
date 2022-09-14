/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { IsNotExists } from 'src/rule/file.rule';

export default class RegisterDto {
  @IsNotExists('user',{
    message:'用户名已存在'
  })
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}
