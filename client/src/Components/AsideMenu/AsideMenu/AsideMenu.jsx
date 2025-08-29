import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { FiHome, FiUsers } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import ImgSkeleton from "../../Skeleton/ImgSkeleton/ImgSkeleton";
import { logoutThunk, userSelector } from "../../../redux/reducers/user_reducer";
import "./AsideMenu.scss";

export default function AsideMenu({ mobileAside, setMobileAside }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(userSelector);

  return (
    <aside className={`aside-menu ${mobileAside && "active"}`}>
      <section className="aside-main-sec">
        <Link
          to={`/profile/${currentUser.id}`}
          className="profile-wrapper"
          onClick={() => setMobileAside(false)}
        >
          <span className="profile">
            <ImgSkeleton src={currentUser.avatarUrl} />
          </span>
          <span className="username">{currentUser.name}</span>
        </Link>

        <Link to="/" onClick={() => setMobileAside(false)}>
          <span className="home">
            <FiHome />
          </span>
          <span>Newsfeed</span>
        </Link>

        <Link to="/people-you-may-know" onClick={() => setMobileAside(false)}>
          <span className="users">
            <FiUsers />
          </span>
          <span>Find Friends</span>
        </Link>

        <Link to="/groups" onClick={() => setMobileAside(false)}>
          <span className="groups">
            <HiOutlineUserGroup />
          </span>
          <span>Groups</span>
        </Link>
        <Link to="/store" onClick={() => setMobileAside(false)}>
          <span className="store">
            <MdOutlineLocalGroceryStore />
          </span>
          <span>Nearby Store</span>
        </Link>
      </section>

      <section className="aside-author-sec">
        <div className="aside-sec-header">Founder Profiles</div>
        <div>
          <span className="linkedin">
            <FaLinkedinIn />
          </span>
          <span>
            <a href="https://www.linkedin.com/in/myselfvishal" target="_blank">
              Linked In
            </a>
          </span>
        </div>
        <div>
          <span className="github">
            <FaGithub />
          </span>
          <span>
            <a href="https://github.com/Immortals430" target="_blank">
              Github
            </a>
          </span>
        </div>
      </section>

      <section className="aside-extra-sec">
        <Link to="/settings" onClick={() => setMobileAside(false)}>
          <span className="setting">
            <FiSettings size={28} />
          </span>
          <span>Settings</span>
        </Link>
        <div onClick={() => dispatch(logoutThunk())}>
          <span className="logout">
            <IoLogOutSharp size={28} />
          </span>
          <span>Logout</span>
        </div>
      </section>
    </aside>
  );
}
