import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseFilters } from '@nestjs/common';
import { Posts } from '../entity/post.entity';
import { PostsService } from './posts.service';
import JwtAuthenticationGuard from '../authentification/jwt-authentication.guard';
import { ExceptionsLoggerFilter } from '../utils/exceptionsLogger.filter';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) { }

    @Get()
    getAllPosts() {
        return this.postsService.getAllPosts();
    }

    @Get(':id')
    @UseFilters(ExceptionsLoggerFilter)
    getPostById(@Param('id') id: string) {
        return this.postsService.getPost(Number(id));
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createPost(@Body() post: Posts) {
        return this.postsService.createPost(post);
    }

    @Put(':id')
    async replacePost(@Param('id') id: string, @Body() post: Posts) {
        return this.postsService.replacePost(Number(id), post);
    }

    @Delete(':id')
    async deletePost(@Body() post: Posts) {
        this.postsService.deletePost(post);
    }
}