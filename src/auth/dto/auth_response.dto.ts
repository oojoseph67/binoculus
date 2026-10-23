import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../user/dto';

export class AuthTokensDto {
  @ApiProperty({
    description:
      'Short-lived JWT sent as a bearer token on authenticated requests',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Long-lived JWT used to obtain a new access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;
}

export class SignupResponseDto extends AuthTokensDto {
  @ApiProperty({
    description: 'The newly created user',
    type: () => UserResponseDto,
  })
  user: UserResponseDto;
}
