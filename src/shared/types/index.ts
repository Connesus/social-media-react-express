export interface IUser {
  _id: string;
  username: string;
  description?: string
  imageId?: string;
  createdAt: Date;
}

export interface IPost {
  _id: string;
  user: string;
  createdAt: Date;
  imageId?: string;
  text?: string;
  replyTo?: string;
  repostOf?: string;
  replyCount?: number;
  repostCount?: number;
  likeCount?: number;
  hasReposted?: boolean;
  hasLiked?: boolean;
}

export type PostUserDataT = {
  hasLiked: boolean;
  hasReposted: boolean;
}

export type PostCounterT = {
  likeCount: number;
  repostCount: number;
  replyCount: number;
}

export type PostContentT = {type: 'text', text: string} | {type: 'image', imageID: string} | {type: 'mixed', text: string; imageID: string;};

// export type LoginDataT = {'email': string; password: string;}
export type UserLoginDataT = {
  password: string;
  username: string;
  // login: {type: 'email', email: string} | {type: 'username', username: string}
}


// type PostContentT<T extends PostContentTypes> = {
//   type: T
//   data: PostContentMap[T]
// }
//
// type PostContentMap = {
//   'text': {text: string};
//   'image': {imageID: string};
//   'mixed': {text: string; imageID: string;}
// };
//
// type PostContentTypes = keyof PostContentMap;


export interface SessionUserT extends IUser {
  role?: 'user' | 'admin' | 'guest'
}

export type getPostsResponseT = {
  posts: {[_id: string]: IPost} | IPost[];
  users: {[_id: string]: IUser} | IUser[];
}
