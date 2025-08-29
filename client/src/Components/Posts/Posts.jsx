import { RxCross2 } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/user_reducer";
import { useCallback } from "react";
import ImgSkeleton from "../Skeleton/ImgSkeleton/ImgSkeleton";
import "./Posts.scss";
import { deletePostThunk } from "../../redux/reducers/post_reducer";
import PostSkeleton from "./PostSkeleton";

function Posts({ posts }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(userSelector);

  // format date
  const formatDate = useCallback((data) => {
    let date = new Date(data);
    return date.toDateString();
  }, []);

  return (
    <section>
      {posts.map((post, index) => (
        <div className="post-container" key={post.id}>
          {/* post header */}
          <div className="post-header">
            <div className="postowner-logo">
              <ImgSkeleton src={post.uploader.avatarUrl} />
            </div>
            <div className="postowner-name">
              <p>{post.uploader.name}</p>
              <div>{formatDate(post.updatedAt)}</div>
            </div>
            {post.uploader.id === currentUser.id && (
              <div
                className="delete-post"
                onClick={() =>
                  dispatch(deletePostThunk({ post, index }))
                }
              >
                <RxCross2 />
              </div>
            )}
          </div>

          {/* post content */}
          {post.caption && (
            <div className="post-text">
              <p>{post.caption}</p>
            </div>
          )}

          {/* post image */}
          {post.url && (
            <div className="post-image">
              <ImgSkeleton src={post.url} />
            </div>
          )}

          {/* post interactions */}
          <div className="post-interacts">
            <div
              className="like"
              /* onClick={() => dispatch(toggleLikeThunk(post))} */
            >
              {/* {post.liked ? <FaHeart /> : <FaRegHeart />} */}
              <span>Like {post.likeCount}</span>
            </div>
            <div /* onClick={() => toggleComment(post._id)} */>
              <FaRegComment color="lime" />
              <span>Comment</span>
            </div>
            <div>
              <IoIosShareAlt color="blue" />
              <span>Share</span>
            </div>
          </div>
        </div>
      ))}

      {/* loading skeleton */}
      {loading && <PostSkeleton />}
    </section>
  );
}

export default Posts;
