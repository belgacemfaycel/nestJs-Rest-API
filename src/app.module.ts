import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    PostsModule
  ],
  controllers: [],
})
export class AppModule {}