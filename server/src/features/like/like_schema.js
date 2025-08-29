import mongoose from "mongoose";
import { Schema } from "mongoose";
import toJSON from "../../plugin/toJSON.js";

// schema for posts likes
let likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "posts"
    },
});
likeSchema.plugin(toJSON); 
//Export the model
export const Like = mongoose.model('likes', likeSchema);
