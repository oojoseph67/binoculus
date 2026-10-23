import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Users } from '../user/entities';
import { UserModule } from '../user/user.module';
import { BcryptProvider, HashingProvider } from './providers/hashing';
import { GenerateTokenProvider } from './providers/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import jwtConfig from '../global/config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    UserModule,

    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      useFactory: async (jwtConfiguration: ConfigType<typeof jwtConfig>) => ({
        secret: jwtConfiguration.jwtSecret,
        signOptions: {
          audience: jwtConfiguration.jwtTokenAudience,
          issuer: jwtConfiguration.jwtTokenIssuer,
          expiresIn: jwtConfiguration.jwtTokenExpiration,
        },
      }),
      inject: [jwtConfig.KEY],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GenerateTokenProvider,

    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
})
export class AuthModule {}
