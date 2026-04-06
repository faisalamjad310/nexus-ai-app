import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
export class SignupDto {
  @ApiProperty({ example: 'Amina Khan' })
  @IsString()
  name: string;
  @ApiProperty({ example: 'amina@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'Str0ng!Passw0rd-example' })
  @MinLength(6)
  password: string;
  @ApiProperty({ required: false, enum: ['free', 'pro', 'enterprise'] })
  @IsOptional()
  plan?: 'free' | 'pro' | 'enterprise';
}
