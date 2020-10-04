import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { ConfigModule } from '@nestjs/config';
const Joi = require('joi');

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        //...
        JWT_SECRET: 'red',
        JWT_EXPIRATION_TIME: 3000,
      })
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    PostsModule,
    AuthentificationModule
  ],
  controllers: [],
})
export class AppModule { }