import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { seconds, ThrottlerModule, minutes } from '@nestjs/throttler';

import jwtConfig from './global/config/jwt.config';
import databaseConfig from './global/config/database.config';
import environmentValidation from './global/config/environmentValidation';
import { LoggingMiddleware } from './global/logger';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            limit: 10,
            ttl: seconds(5),
            blockDuration: minutes(15),
          },
        ], // 10 requests within 5 seconds with block-duration of 15 min
        errorMessage: 'too many requests... slow down',
      }),
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      validationSchema: environmentValidation,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('database.port'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: ['dist/**/*.entity.js'],
        autoLoadEntities: true,
        synchronize: configService.get('DATABASE_SYNC'),
        ...(configService.get('NODE_ENV') !== 'development' && {
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        }),
        migrations: ['dist/src/migrations/*.js'],
        migrationsRun: true,
        logging: ['error', 'warn'],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('{*path}');
  }
}
