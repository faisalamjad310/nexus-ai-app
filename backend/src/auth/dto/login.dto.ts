import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
export class LoginDto {
  @ApiProperty({ example: 'amina@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'Str0ng!Passw0rd-example' })
  @MinLength(6)
  password: string;
}
