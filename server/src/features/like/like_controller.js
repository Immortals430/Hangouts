import LikeRepository from "./like_repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  // toggle like
  async toggle(req, res, next) {

    const { postId } = req.params;
    try {
      const post = await this.likeRepository.toggle(postId, req.user.id);
      res.status(200).json({data: post});
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
}
