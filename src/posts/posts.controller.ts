import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseFilters, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { Posts } from '../entity/post.entity';
import { PostsService } from './posts.service';
import JwtAuthenticationGuard from '../authentification/jwt-authentication.guard';
import { ExceptionsLoggerFilter } from '../utils/exceptionsLogger.filter';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, editFileName } from '../utils/file-upload.utils';
import { diskStorage } from 'multer'

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

    @Get('search/:title')
    @UseFilters(ExceptionsLoggerFilter)
    searchPostByTitle(@Param('title') title: string) {
        if (title) {
            return this.postsService.searchPost((title));
        } else {
            return [];
        }

    }
    @Post('file')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )

    async uploadedFile(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }


    @Get('img/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './files' });
    }

    @Post()
    // @UseGuards(JwtAuthenticationGuard)
    async createPost(@Body() post: Posts) {
        // post.img_id = 0;
        post.created_time = new Date();
        console.log(post);
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