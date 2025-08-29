import { LuVideo, LuImage, LuCamera } from "react-icons/lu";
import { TiDelete } from "react-icons/ti";
import { AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/user_reducer";
import useCreatePost from "./useCreatePost";
import "./CreatePost.scss";

export default function CreatePost() {
  const { currentUser } = useSelector(userSelector);

  // create posts
  const { fileInput, setFileInput, upload } = useCreatePost();

  return (
    <section className="create-post-sec">
      <form onSubmit={upload} >
        {/* create post header */}
        <div className="create-post-header">
          <div className="pencil-icon">
            <AiOutlineEdit />
          </div>
          <div>Create Post</div>
        </div>

        {/* create-post-textarea */}
        <div className="create-post-textarea">
          <textarea
            placeholder="Whats's on your mind?"
            name="content"
            className={fileInput && "shrink-area"}
          ></textarea>
          <img
            src={currentUser.avatarUrl}
            className="textarea-profile-icon"
            alt=""
          />

          {fileInput && (
            <div className="thumbnail">
              <TiDelete
                className="delete"
                color="red"
                onClick={() => setFileInput(null)}
              />
              <img
                src={URL.createObjectURL(fileInput)}
                className="thumbnail-img"
              />
            </div>
          )}
        </div>

        {/* create-post-options */}
        <div className="create-post-options">
          <div>
            <div className="file-input">
              <LuVideo color="red" />
              <span>Video</span>
            </div>
            <div className="file-input">
              <label>
                <input
                  type="file"
                  name="image"
                  accept="image/jpeg, image/png"
                  onInput={(e) => setFileInput(e.target.files[0])}
                />
                select image
              </label>
              <LuImage color="lime" />
              <span>Photo</span>
            </div>
            <div className="file-input">
              <LuCamera color="orange" />
              <span>Feeling/Activity</span>
            </div>
          </div>
          <button>Post</button>
        </div>
      </form>
    </section>
  );
}
