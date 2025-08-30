import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/user_reducer";
import { getPostThunk, postSelector } from "../../redux/reducers/post_reducer";

const useFetchPost = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(userSelector);
  const { posts, page, hasPost } = useSelector(postSelector);
  const [loading, setLoading] = useState(false);

  // get post
  const getPost = async () => {
    setLoading(true);
    await dispatch(getPostThunk(page));
    setLoading(false);
  };

  useEffect(() => {
    if(!posts.length) getPost();
  }, [currentUser]);

  return { getPost, posts, loading, page, hasPost };
};

export default useFetchPost;
