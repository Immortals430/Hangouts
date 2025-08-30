import { Post } from "./post_schema.js";
import { Like } from "../like/like_schema.js";

export default class PostService {
  // get post data
  async getPost(skip, limit, profileUserId, userId) {
    let posts = await Post.find(
      profileUserId ? { uploader: profileUserId } : null
    )
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("uploader");

    posts = await Promise.all(
      posts.map(async (post) => {
        let plainPost = post.toJSON();
        const like = await Like.findOne({
          post: post.id,
          user: userId,
        });
        plainPost.liked = !!like;
        return plainPost;
      })
    );
    return posts;
  }

  // delete post data
  async deletePost(postId, userId) {
    const post = await Post.findById(postId);
    if (post.uploader != userId) {
      throw new ApplicationError("cannot delete other user posts", 401);
    }
    if (!post) {
      throw new ApplicationError("post does not exist", 404);
    }
    if (post.url) {
      const storageRef = ref(getStorage(), `post/${post.image}`);
      deleteObject(storageRef);
    }
    await post.deleteOne();

    // delete post likes

    const result = await Like.deleteMany({ post: postId });

  }
}
