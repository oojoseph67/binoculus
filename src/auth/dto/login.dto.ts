import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Account email address',
    example: 'jane.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Account password',
    example: 'P@ssw0rd!',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
