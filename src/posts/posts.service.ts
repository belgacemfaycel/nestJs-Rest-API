import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Posts } from './../entity/post';



@Injectable()
export default class PostsService {
    private lastPostId = 0;
    private posts: Posts[] = [];

    getAllPosts() {
        return this.posts;
    }

    getPostById(id: number) {
        const post = this.posts.find(post => post.id === id);
        if (post) {
            return post;
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    replacePost(id: number, post: Posts) {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex > -1) {
            this.posts[postIndex] = post;
            return post;
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    createPost(post: Posts) {
        const newPost = {
            id: ++this.lastPostId,
            ...post
        }
        this.posts.push(newPost);
        return newPost;
    }

    deletePost(id: number) {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex > -1) {
            this.posts.splice(postIndex, 1);
        } else {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }
}