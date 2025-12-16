import mongoose, {Schema, Document} from "mongoose"

export interface _ICardRequestSchema extends Document {
    username: string,
    request_type: string,
    json_to_update: string,
    update_uri: string,
    status: string
}

const CardRequestSchema = new Schema<_ICardRequestSchema>({
    username: {type: String, required: true},
    request_type: {type: String, required: true},
    json_to_update: {type: String, required: true},
    update_uri: {type: String, required: true},
    status: {type: String, required: true, default: "pending"}
})

const CardRequestModel = mongoose.model("card_requests", CardRequestSchema)

export default CardRequestModel