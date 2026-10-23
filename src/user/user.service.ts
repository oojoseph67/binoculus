import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Roles, Users } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { getError } from '../global/utils/getError';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async createUser(params: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role?: Exclude<Roles, 'patient'>;
  }): Promise<UserResponseDto> {
    try {
      const existingEmail = await this.userRepository.find({
        where: {
          email: params.email,
        },
      });

      if (existingEmail) {
        throw new HttpException('email already exists', HttpStatus.CONFLICT);
      }

      const userRole: Roles = !params.role ? 'patient' : params.role;

      const user = this.userRepository.create({
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
        password: params.password,
        username: params.username,
        role: userRole,
      });
      await this.userRepository.save(user);

      return plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      const { errorPayload, status } = getError({ error });

      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error({ errorPayload, status });

      throw new HttpException('error signing up', status);
    }
  }

  async getUser({
    raw = true,
    id,
    email,
  }: {
    raw?: boolean;
    id?: string;
    email?: string;
  }): Promise<UserResponseDto | Users> {
    try {
      let user: Users;

      if (!id || !email) {
        throw new HttpException(
          'provide query parameter to get user info',
          HttpStatus.FORBIDDEN,
        );
      }

      if (id) {
        user = await this.userRepository.findOneBy({
          id: id,
        });
      } else if (email) {
        user = await this.userRepository.findOneBy({
          email: email,
        });
      }

      if (raw) {
        return user as Users;
      }

      return plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      const { errorPayload, status } = getError({ error });

      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error({ errorPayload, status });

      throw new HttpException('error fetching user', status);
    }
  }
}
