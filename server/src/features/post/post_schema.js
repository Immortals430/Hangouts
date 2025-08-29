import { model, Schema } from "mongoose";
import toJSON from "../../plugin/toJSON.js";

// schema for user posts
let postSchema = new Schema({
  caption: String,
  image: String,
  url: String,
  uploader: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  likeCount: {
    type: Number,
    default: 0,
  },

}, { timestamps: true });

postSchema.plugin(toJSON); 
//Export the model
export const Post = model("posts", postSchema);
