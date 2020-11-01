
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getConnection } from 'typeorm';
import { Posts } from '../entity/post.entity';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Posts) private postsRepository: Repository<Posts>) { }

    async  getAllPosts() {
        return await this.postsRepository.find();
    }

    async getPost(id: number): Promise<Posts> {
        const post = await this.postsRepository.findOne({ id });
        if (post) {
            return post;
        }
    }
    async searchPost(title: string): Promise<Posts[]> {
        const post = await getConnection()
            .createQueryBuilder()
            .select("posts")
            .from(Posts, "posts")
            .where("posts.title LIKE :title", { title: `%${title}%` })
            .getMany();
        return post;
    }

    async replacePost(id: number, post: Posts) {
        this.postsRepository.save(post)
    }

    async createPost(post: Posts) {
        this.postsRepository.save(post)
    }

    async deletePost(post: Posts) {
        this.postsRepository.delete(post);
    }
}