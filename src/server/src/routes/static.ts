import { ImageService } from '../model/image.js';
import { Router } from 'express';
const staticRouter = Router();

staticRouter.get('/image/:id', async (req, res) => {
    const image = await ImageService.getImageById(req.params.id);
    if (image) {
        res.contentType(image.type);
        res.end(Buffer.from(image.data), 'base64');
    } else {
        res.status(404);
        res.end();
    }
})

export default staticRouter;