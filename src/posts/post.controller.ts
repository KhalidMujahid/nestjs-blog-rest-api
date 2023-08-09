import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { IPost } from "../interfaces/post.interface";
import { PostService } from "./post.service";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get("")
  public getAllPosts(): Promise<IPost[]> {
    return this.postService.getAllPosts();
  }

  @Get(":id")
  public getSinglePost(@Param() param: { id: string }): Promise<IPost> {
    return this.postService.getSinglePost(param.id);
  }

  @Post("")
  public async addNewPost(
    @Body()
    post: {
      author: string;
      title: string;
      photo: string;
      tags: string[];
    }
  ) {
    const result = await this.postService.addNewPost(post);

    if (result) {
      return result;
    } else {
      throw new HttpException(
        "An error occure while creating a new post.. please try again later",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":id")
  public async deletePost(@Param() param: { id: string }): Promise<string> {
    // check if post exit
    const exitPost = await this.postService.getSinglePost(param.id);

    if (!exitPost) {
      throw new HttpException(
        `Post not found with this id:${param.id}`,
        HttpStatus.NOT_FOUND
      );
    }

    const result = this.postService.deletePost(param.id);

    if (result) {
      return "Post delete successfully";
    } else {
      throw new HttpException(
        "Error occured while deleting post.. please try again later",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(":id")
  public async updatePost(@Body() user: IPost, @Param() param: { id: string }) {
    // check if post exits
    const exitPost = await this.postService.getSinglePost(param.id);

    if (!exitPost) {
      throw new HttpException(
        `Post not found with this id:${param.id}`,
        HttpStatus.NOT_FOUND
      );
    }

    const response = await this.postService.updatePost(user, param.id);

    if (response) {
      return response;
    } else {
      throw new HttpException(
        "Error occured while updating post.. please try again later",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
