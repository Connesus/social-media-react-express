import mongoose, {Document} from "mongoose";
const { model, Schema } = mongoose;


export interface IImage extends Document{
    data: Buffer;
    type: string;
    name: string;
}


const imageSchema = new Schema<IImage>({
    data: { type: Buffer, required: true },
    type: { type: Schema.Types.String, required: true },
    name: { type: Schema.Types.String, required: true },
})

export const ImageModel = model<IImage>('Image', imageSchema);
