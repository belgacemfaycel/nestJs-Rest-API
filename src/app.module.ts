import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import { APP_FILTER } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { NotificationModule } from './notification/notification.module';
import { PushSubscriptionModule } from './push-subscription/push-subscription.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    PostsModule,
    AuthentificationModule,
    MulterModule.register({
      dest: './files',
    }),
    NotificationModule,
    PushSubscriptionModule,
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
    },

  ]
})
export class AppModule { }