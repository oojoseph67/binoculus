import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../user/entities';
import { LoginDto, SignupDto } from './dto';
import { getError } from '../global/utils/getError';
import { UserService } from '../user/user.service';
import { HashingProvider } from './providers/hashing';
import { GenerateTokenProvider } from './providers/jwt';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private hashingProvider: HashingProvider,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,

    private userService: UserService,
    private generateTokensProvider: GenerateTokenProvider,
  ) {}

  async signup(signupDto: SignupDto) {
    try {
      const { email, firstName, lastName, password, username, role } =
        signupDto;

      const hashedPassword = await this.hashingProvider.hashPassword({
        password,
      });

      const user = await this.userService.createUser({
        firstName,
        lastName,
        password: hashedPassword,
        username,
        role,
        email,
      });

      return user;
    } catch (error) {
      const { errorPayload, status } = getError({ error });

      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error({ errorPayload, status });

      throw new HttpException('error signing up', status);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      const user = await this.userService.getUser({ email });

      if (!user) {
        throw new HttpException('check credentials', HttpStatus.BAD_REQUEST);
      }

      const isPasswordCorrect = await this.hashingProvider.comparePasswords({
        hashedPassword: user.password,
        password,
      });

      if (!isPasswordCorrect) {
        throw new HttpException('check credentials', HttpStatus.BAD_REQUEST);
      }

      const { accessToken, refreshToken } =
        await this.generateTokensProvider.generateTokens({ user });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      const { errorPayload, status } = getError({ error });

      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error({ errorPayload, status });

      throw new HttpException('error signing in', status);
    }
  }
}
