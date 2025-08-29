import { useSelector } from "react-redux";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
// import { friendsSelector } from "../../../redux/reducers/friend_reducer";
import { useDispatch } from "react-redux";
// import {
//   chatSelector,
//   REMOVE_UNREAD,
//   SET_USER,
//   setSeen,
// } from "../../../redux/reducers/chat_reducer";
import { memo } from "react";
import ImgSkeleton from "../../Skeleton/ImgSkeleton/ImgSkeleton"
import "./Connections.scss";

function Connections() {
  // const { friends } = useSelector(friendsSelector);
  const friends = []
  const { user, unreadMsg } = useSelector(chatSelector);
  const { onlineUsers } = useSelector(chatSelector);
  const dispatch = useDispatch();

  // start chat
  // async function callStartChat(user) {
  //   await dispatch(SET_USER({}));
  //   dispatch(SET_USER(user));
  //   dispatch(REMOVE_UNREAD(user._id));
  //   dispatch(setSeen(user._id));
  // }

  return (
    <>
      {friends?.map((friend) => (
        <div key={friend._id} /* onClick={() => callStartChat(friend)} */ className="user">
          <div className="logo">
            <ImgSkeleton src={friend.avatarUrl} />
          </div>
          <span className="name">{friend.name}</span>
          {user._id == friend._id || !unreadMsg.includes(friend._id) ? null : (
            <span>
              {unreadMsg.filter((message) => message == friend._id).length}
              <MdOutlineMarkEmailUnread
                color="blue"
                size={22}
                onClick={() => dispatch(setSeen(friend))}
                className="delete"
              />
            </span>
          )}
          {onlineUsers.includes(friend._id) && (
            <span className="online-logo"></span>
          )}
        </div>
      ))}
    </>
  );
}

export default memo(Connections);
