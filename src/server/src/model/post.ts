import mongoose, { Document, Model, Query, Types } from "mongoose";
import { IUserDoc } from "./user.js";
import { Like } from "./like.js";
import paginationPlugin, { pluginModel } from "../utils/paginationPlugin.js";
const { model } = mongoose;

export interface IPost {
  user: IUserDoc["_id"];
  createdAt: Date;
  imageId?: Types.ObjectId;
  text?: string;
  replyTo?: IPostDoc["_id"];
  repostOf?: IPostDoc["_id"];
}

export interface IPostDoc extends IPost, Document<Types.ObjectId> {
  populateUserActions(userId?: mongoose.Types.ObjectId): this;
}
// TODO: Fix Query any types
export interface IPostModel
  extends pluginModel,
    Model<IPostDoc, IPostQueryHelpers> {
  populateUserActions(userId?: mongoose.Types.ObjectId): this;
  populateCount(): Query<any, IPostDoc> & IPostQueryHelpers;
}

interface IPostQueryHelpers {
  populateCount(): Query<any, IPostDoc> & IPostQueryHelpers;
  populateUserActions(
    userId?: mongoose.Types.ObjectId
  ): Query<any, IPostDoc> & IPostQueryHelpers;
}

const PostSchema = new mongoose.Schema<IPostDoc, IPostModel>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    imageId: {
      type: mongoose.Types.ObjectId,
      ref: "images",
    },
    text: String,
    replyTo: {
      type: mongoose.Types.ObjectId,
      ref: "posts",
    },
    repostOf: {
      type: mongoose.Types.ObjectId,
      ref: "posts",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PostSchema.plugin(paginationPlugin);

PostSchema.index({ repostOf: 1 });
PostSchema.index({ replyTo: 1 });
PostSchema.index({ user: 1 });
PostSchema.index({ text: "text" });

PostSchema.virtual("likeCount", {
  ref: "likes",
  localField: "_id",
  foreignField: "postId",
  count: true,
});

PostSchema.virtual("replyCount", {
  ref: "posts",
  localField: "_id",
  foreignField: "replyTo",
  count: true,
});

PostSchema.virtual("repostCount", {
  ref: "posts",
  localField: "_id",
  foreignField: "repostOf",
  count: true,
});

PostSchema.virtual("hasLiked");
PostSchema.virtual("hasReposted");

PostSchema.query.populateCount = function () {
  return this.populate("likeCount")
    .populate("replyCount")
    .populate("repostCount");
};

PostSchema.statics.findManyPostsById = function (
  ids: Array<mongoose.Types.ObjectId>
) {
  return this.find({ _id: { $in: ids } });
};

PostSchema.statics.deletePostById = async function (
  postId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId
) {
  const post = await this.findById(postId);
  if (post && post.user == userId) {
    // const image = post.imageId && await this.findById(post.imageId);
    await post.remove();
    return post;
  }
  throw new Error("Delete: Unknown deletion error");
};

PostSchema.methods.populateUserActions = async function (
  userId?: mongoose.Types.ObjectId
) {
  if (userId) {
    const hasReposted = await Post.exists({ repostOf: this._id, user: userId });
    const hasLiked = await Like.exists({ postId: this._id, userId: userId });
    await this.set({ hasLiked });
    await this.set({ hasReposted });
    return this;
  }
  return this;
};

export const Post = model<IPostDoc, IPostModel>("posts", PostSchema, "posts");
