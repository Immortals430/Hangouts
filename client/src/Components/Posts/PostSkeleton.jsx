import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import "./PostSkeleton.scss";

export default function PostSkeleton() {
  return (
    <div className="post-container skeleton">
      <div className="post-header">
        <div className="img-skeleton postowner-logo"></div>
        <div className="postowner-name">
          <div className="img-skeleton"></div>
          <div className="img-skeleton"></div>
        </div>
      </div>
      <div className="content-skeleton">
        <div className="img-skeleton "></div>
        <div className="img-skeleton"></div>
        <div className="img-skeleton"></div>
      </div>

      <div className="post-interacts">
        <div>
          <FaRegHeart color="red" />
          <span>Like</span>
        </div>
        <div>
          <FaRegComment color="lime" />
          <span>Comment</span>
        </div>
        <div>
          <IoIosShareAlt color="blue" />
          <span>Share</span>
        </div>
      </div>
    </div>
  );
}
