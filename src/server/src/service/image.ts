import {IImage, IImageDoc, Image} from "../model/image.js";

export class ImageService {
    static async uploadOneImage() { }
    static async getImageById(id: IImageDoc['_id']) {
        return Image.findById(id);
    }
}
