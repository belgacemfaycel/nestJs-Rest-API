import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Posts } from './../entity/post';
import { PostsService } from './posts.service';

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
    getPostById(@Param('id') id: string) {
        return this.postsService.getPostById(Number(id));
    }

    @Post()
    async createPost(@Body() post: Posts) {
        return this.postsService.createPost(post);
    }

    @Put(':id')
    async replacePost(@Param('id') id: string, @Body() post: Posts) {
        return this.postsService.replacePost(Number(id), post);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        this.postsService.deletePost(Number(id));
    }
}