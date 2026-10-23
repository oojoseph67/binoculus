import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @ApiHideProperty()
  @Exclude()
  password: string;

  @ApiProperty({
    description: 'Account email address',
    example: 'jane.doe@example.com',
    format: 'email',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'First name',
    example: 'Jane',
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  @Expose()
  lastName: string;

  @ApiProperty({
    description: 'Unique username',
    example: 'janedoe',
  })
  @Expose()
  username: string;

  @ApiProperty({
    description: 'Role assigned to the user',
    enum: ['patient', 'doctor', 'admin'],
    example: 'patient',
  })
  @Expose()
  role: string;

  @ApiProperty({
    description: 'Whether the account can sign in',
    example: true,
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    description: 'When the account was created',
    example: '2026-10-23T11:30:00.000Z',
    format: 'date-time',
  })
  @Expose()
  createdAt: Date;

  @ApiHideProperty()
  @Exclude()
  updatedAt: Date;
}
