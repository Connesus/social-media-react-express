import {IPost, IPostLean, Post} from './../model/post.js';
import { UserModel } from './../model/user.js';
import { Router } from 'express';
import faker from 'faker';
const seedRouter = Router()

seedRouter.get('/:seedType/:count', async (req, res) => {
    const {seedType = 'post', count = 100} = req.params;
    const fakeUsers = [];
    const fakePosts = [];

    for (let i = 0; i < count; i++) {
        const fakeUser = new UserModel({
            username: faker.datatype.uuid(),
            email: faker.datatype.uuid(),
            password: faker.datatype.uuid(),
        })

        const postType = ['post', 'repost', 'reply']

        // const fakePost = new Post({
        //     createdAt: new Date(),
        //     postedBy: fakeUser.id,
        //     text: faker.lorem.sentences(faker.datatype.number(3)),
        //     img_url: faker.datatype.uuid(),
        //     replies: [fakeUser.id]
        // })
        const fakePost: IPostLean = {
            createdAt: new Date(),
            author: fakeUser.id,
            text: faker.lorem.sentences(faker.datatype.number(3)),
            likes: [fakeUser.id]
        }

        fakeUsers.push(fakeUser);
        fakePosts.push(new Post(fakePost));
    }

    await UserModel.bulkSave(fakeUsers);
    await Post.bulkSave(fakePosts);

    return res.end()
})

export default seedRouter;
