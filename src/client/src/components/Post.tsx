import * as React from "react";
import {IPostDefinitions} from "@backend/model/post";

export type PostT = {
  id?: string;
  username?: string;
  text?: string;
  avatarUrl?: string;
  likeCount?: number;
  repostCount?: number;
  replyCount?: number;
}

export const Post: React.FC<PostT & IPostDefinitions> = ({_id}) => {
  return (
    <div>
      <h4>{_id}</h4>
    </div>
  );
};
