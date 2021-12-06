import { Post } from './../model/post.js';
import { UserModel } from './../model/user.js';
import { Router } from 'express';
import faker from 'faker';
const seedRouter = Router()

seedRouter.get('', async (req, res) => {
    const fakeUsers = [];
    const fakePosts = [];

    for (let i = 0; i < 5000; i++) {
        const fakeUser = new UserModel({
            username: faker.datatype.uuid(),
            email: faker.datatype.uuid(),
            password: faker.datatype.uuid(),
        })

        const postType = ['post', 'repost', 'reply']

        const fakePost = new Post({
            type: 'post',
            createdAt: new Date(),
            postedBy: fakeUser.id,
            text: faker.lorem.sentences(faker.datatype.number(3)),
            img_url: faker.datatype.uuid(),
            replies: [fakeUser.id]
        })

        fakeUsers.push(fakeUser);
        fakePosts.push(fakePost);
    }

    await UserModel.bulkSave(fakeUsers);
    await Post.bulkSave(fakePosts);

    res.end()
})

export default seedRouter;