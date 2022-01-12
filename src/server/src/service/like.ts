import {Like} from "../model/like.js";
import * as mongoose from "mongoose";

export class LikeService {
    static async getByUserAndPostIds(userId: mongoose.Types.ObjectId, postId: mongoose.Types.ObjectId) {
        // return LikeModel.findOne({userId: userId, postId: postId});
        return Like.aggregate([{$match: {$and: [{userId: userId}, {postId: postId}]}}]);
    }
}
