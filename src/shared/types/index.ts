export interface IUser {
  id: string;
  name: string;
  imageID?: string;
}

export interface IPost {
  id: string;
  author: IUser;
  userData: PostUserDataT;
  counter: PostCounterT;
  content: PostContentT;
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
  login: {type: 'email', email: string} | {type: 'username', username: string}
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


