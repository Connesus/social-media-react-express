import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;


export interface IImage extends Document {
    data: Buffer;
    type: string;
    name: string;
}


const imageSchema = new Schema<IImage>({
    data: { type: Schema.Types.Buffer, required: true },
    type: { type: Schema.Types.String, required: true },
    name: { type: Schema.Types.String, required: true },
})

export const ImageModel = model<IImage>('Image', imageSchema);

export class ImageService {
    static async uploadOneImage() { }
    static async getImageById(id: IImage['id']) {
        return await ImageModel.findById(id);
    }
}