import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    PostsModule,
    AuthentificationModule,
    // ConfigModule.forRoot({
    //   validationSchema: Joi.object({
    //     JWT_SECRET: Joi.string().required(),
    //     JWT_EXPIRATION_TIME: Joi.string().required(),
    //   })
    // }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    }
  ],
  controllers: [],
})
export class AppModule { }