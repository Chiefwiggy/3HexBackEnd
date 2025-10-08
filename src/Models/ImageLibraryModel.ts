import mongoose from "mongoose"

export interface _IImageLibrarySchema extends mongoose.Document {
    imageUrl: string,
    imageKey: string
    altText?: string,
    owner: string
}

const ImageLibrarySchema = new mongoose.Schema<_IImageLibrarySchema>({
        imageUrl: {type: String, required: true, unique: true},
        imageKey: {type: String, required: true, unique: true},
        altText: String,
        owner: {type: String, required: true}
    },
    {
        collection: "image_library"
    }
)

const ImageLibraryModel = mongoose.model("image_library", ImageLibrarySchema);

export default ImageLibraryModel;