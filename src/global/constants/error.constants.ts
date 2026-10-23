export const ERROR_MESSAGES = {
  // auth
  AUTH: {
    UNAUTHORIZED: 'Unauthorized. Please log in.',
    UNAUTHORIZED_OAUTH: 'Unsupported sign-in provider',
    INVALID_PAYLOAD: 'Invalid request. Please try again.',
    INVALID_TOKEN_ISSUER: 'Invalid session. Please log in again.',
    USER_NOT_FOUND: 'User not found',
    USER_NOT_FOUND_CAP: 'User not found',
    ACCOUNT_NOT_ACTIVE: 'Your account is not active',
    ACCOUNT_NOT_ACTIVE_SUPPORT:
      'Your account is not active. Please contact support.',
    INVALID_TOKEN: 'Invalid token',
    INVALID_ACCESS_TOKEN: 'Invalid access token',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token',
    ERROR_SAVING_REFRESH_TOKEN: 'Error saving refresh token',
  },

  GENERIC: {
    ERROR: (context: string) => `Error ${context}`,
    NOT_FOUND: (entity: string) => `${entity} not found`,
  },
} as const;
