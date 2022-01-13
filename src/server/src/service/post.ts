import { FilterQuery } from "mongoose";
import mongoose from 'mongoose';
import {IPostDoc, Post} from "../model/post.js";


export class PostService {
  static async paginatePosts(
    filter: FilterQuery<any>,
    sort: string | any,
    anchor: mongoose.Types.ObjectId | undefined,
    prev: Boolean
  ) {
    let paginatedPosts: IPostDoc[];


    if (anchor) {
      paginatedPosts = prev
        ? await Post.prevPage({filter, sort, anchor}).populateCount()
        : await Post.nextPage({filter, sort, anchor}).populateCount();
    } else {
      paginatedPosts = await Post.firstPage({filter, sort}).populateCount();
    }

    return paginatedPosts;
  }

}
