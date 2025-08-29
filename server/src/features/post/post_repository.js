import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Post } from "./post_schema.js";
import { ApplicationError } from "../../middlewares/error_handler.js";


export default class PostRepository {


  // add post data
  async addPost(uint8Array, caption, uploader) {
    const currentDate = Date.now();
    let url;
    let image;
    if (uint8Array) {
      const storageRef = ref(getStorage(), `post/image-${currentDate}.jpeg`);
      await uploadBytes(storageRef, uint8Array, { contentType: "image/jpeg" });
      url = await getDownloadURL(storageRef);
      image = `image-${currentDate}.jpeg`;
    }

    const post = await Post.create({
      caption,
      image,
      uploader,
      url,
    });
    await post.populate("uploader");

    return post;
  }






}
