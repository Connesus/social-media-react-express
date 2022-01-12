import { Router } from 'express';
import {ImageService} from "../service/image.js";
import {use} from "../utils/helpers.js";
const staticRouter = Router();

staticRouter.get('/image/:id', use(async (req, res) => {
    const image = await ImageService.getImageById(req.params.id);
    if (image) {
        res.contentType(image.type);
        res.end(Buffer.from(image.data), 'base64');
    } else {
        res.status(404);
        res.end();
    }
}))

export default staticRouter;
