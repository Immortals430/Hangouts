import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/user_reducer";
import { toast } from "react-toastify";
import { createPostThunk } from "../../redux/reducers/post_reducer";

const useCreatePost = () => {
  const dispatch = useDispatch();
  const [fileInput, setFileInput] = useState(null);
  const { currentUser } = useSelector(userSelector);

  const upload = async (e) => {
    e.preventDefault();
    let date = new Date();

    const tempPostData = {
      updatedAt: date.getDate(),
      caption: e.target.content.value,
      likeCount: 0,
      uploader: { ...currentUser },
      url: fileInput || null,
      temp: true,
      id: crypto.randomUUID(),
    };

    if (fileInput?.size > 5242880) {
      toast.error("File size should be less than 5MB");
      return;
    }

    if (tempPostData.caption || fileInput) {
      e.target.reset();
      setFileInput(null);
      dispatch(createPostThunk(tempPostData));
    }
  };

  return { upload, setFileInput, fileInput };
};

export default useCreatePost;
