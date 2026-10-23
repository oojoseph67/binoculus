import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenerateTokenProvider } from './generate.tokens.provider';
import { TokenResponse } from './type';
import { Users } from '../../../user/entities';
import { RefreshToken } from '../../entities';
import { ERROR_MESSAGES } from '../../../global/constants';

@Injectable()
export class TokensProvider {
  private readonly logger = new Logger(TokensProvider.name);

  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,

    private generateTokenProvider: GenerateTokenProvider,
  ) {}

  async generateUserTokens({ user }: { user: Users }): Promise<TokenResponse> {
    const jwtTokens = await this.generateTokenProvider.generateTokens({ user });
    await this.storeRefreshToken({
      refreshToken: jwtTokens.refreshToken,
      userId: user.id,
    });

    return jwtTokens;
  }

  async storeRefreshToken({
    refreshToken,
    userId,
  }: {
    refreshToken: string;
    userId: string;
  }) {
    try {
      const refreshTokenPayload =
        await this.generateTokenProvider.verifyRefreshToken(refreshToken);
      const date = new Date(refreshTokenPayload.exp * 1000);

      const entity = this.refreshTokenRepository.create({
        token: refreshToken,
        userId: userId,
        expiryDate: date,
      });
      await this.refreshTokenRepository.save(entity);
    } catch {
      throw new HttpException(
        ERROR_MESSAGES.AUTH.ERROR_SAVING_REFRESH_TOKEN,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // async invalidateAllUserSessions(userId: string) {
  //   try {
  //     await this.refreshTokenRepository.delete({ userId });
  //   } catch (error: any) {
  //     const { errorPayload } = getError(error);

  //     this.logger.error('error invalidating sessions', error);

  //     throw new HttpException(
  //       ERROR_MESSAGES.AUTH.ERROR_INVALIDATING_SESSIONS(errorPayload),
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  // async invalidateSpecificSession(refreshToken: string) {
  //   try {
  //     await this.refreshTokenRepository.delete({ token: refreshToken });
  //   } catch (error: any) {
  //     const { errorPayload } = getError(error);

  //     this.logger.error('error invalidating session', error);

  //     throw new HttpException(
  //       ERROR_MESSAGES.AUTH.ERROR_INVALIDATING_SESSION(errorPayload),
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
}
