import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../user/entities';
import { UserModule } from '../user/user.module';
import { BcryptProvider, HashingProvider } from './providers/hashing';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,

    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
})
export class AuthModule {}
