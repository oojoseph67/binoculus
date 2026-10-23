import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Exclude()
  password: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  username: string;

  @Expose()
  role: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
