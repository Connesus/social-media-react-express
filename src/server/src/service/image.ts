import {IImage, ImageModel} from "../model/image.js";

export class ImageService {
    static async uploadOneImage() { }
    static async getImageById(id: IImage['id']) {
        return ImageModel.findById(id);
    }
}
