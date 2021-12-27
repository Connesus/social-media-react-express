import {ILike, LikeModel} from "../model/like.js";

export class LikeService {
    static async getByUserAndPostIds(userId: ILike['userId'], postId: ILike['postId']) {
        return LikeModel.findOne({userId, postId});
    }
}
