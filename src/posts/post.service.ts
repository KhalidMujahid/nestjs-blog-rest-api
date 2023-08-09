import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPost } from "../interfaces/post.interface";

@Injectable()
export class PostService {
  constructor(@InjectModel("Post") private readonly postModel: Model<IPost>) {}

  public async getAllPosts(): Promise<IPost[]> {
    return await this.postModel.find().populate("author", "name email");
  }

  public async getSinglePost(id: string): Promise<IPost> {
    return await this.postModel.findById(id);
  }

  public async addNewPost(post: {
    author: string;
    title: string;
    photo: string;
    tags: string[];
  }) {
    const result = await this.postModel.create({
      author: post.author,
      title: post.title,
      photo: post.photo,
      tags: post.tags,
    });

    return result;
  }

  // delete post
  public async deletePost(id: string): Promise<boolean> {
    const result = await this.postModel.findByIdAndDelete(id);
    return result ? true : false;
  }

  // update post
  public async updatePost(user: IPost, id: string) {
    const result = await this.postModel.findByIdAndUpdate(
      id,
      {
        $set: { ...user },
      },
      { new: true }
    );

    return result;
  }
}
