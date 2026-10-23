import { Users } from '../../../user/entities';

// Type definitions for better type safety
export interface BaseTokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

export interface AccessTokenPayload extends BaseTokenPayload {
  email: string;
}

export interface RefreshTokenPayload extends BaseTokenPayload {
  // Refresh tokens typically only need the user ID
}

export interface CreateTokenParams<T = BaseTokenPayload> {
  userId: string;
  expiresIn: number;
  payload?: Omit<T, 'userId' | 'iat' | 'exp'>;
}

export interface GenerateTokensParams {
  user: Users;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface GoogleTokenPayload {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

export interface AppleTokenPayload {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  email?: string;
  email_verified?: boolean;
}

export interface UnsubscribePayload {
  userId: string;
  type: 'unsubscribe';
}
