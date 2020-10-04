
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from '../entity/post.entity';


@Injectable()
export class PostsService {

    constructor(@InjectRepository(Posts) private postsRepository: Repository<Posts>) { }

    async  getAllPosts() {

        return await this.postsRepository.find();
    }

    async getPost(_id: number): Promise<Posts[]> {
        return await this.postsRepository.find({
            select: ["content", "title"],
            where: [{ "id": _id }]
        });
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