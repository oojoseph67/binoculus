import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('production', 'development', 'staging')
    .default('development'),
  PORT: Joi.number().default(2345),
  HOST: Joi.string().default('0.0.0.0'),

  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().port().default(5432),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SYNC: Joi.boolean().required().default(false),

  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TIME_TO_LIVE: Joi.number().required(),
  JWT_REFRESH_TOKEN_TIME_TO_LIVE: Joi.number().required(),
  UNSUBSCRIBE_JWT_SECRET: Joi.string().required(),
  MAX_LOGIN_ATTEMPTS: Joi.number().required(),
  LOCKOUT_DURATION_MINUTES: Joi.number().required(),
});
