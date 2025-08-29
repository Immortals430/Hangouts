import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { FiHome, FiUsers } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { userSelector } from "../../redux/reducers/user_reducer";
import Hamburger from "hamburger-react";
import ImgSkeleton from "../Skeleton/ImgSkeleton/ImgSkeleton";
import "./Navbar.scss";

export default function Navbar({ mobileAside, setMobileAside }) {
  const { currentUser } = useSelector(userSelector);

  return (
    <nav className="navbar-desktop">
      <a href="/" className="nav-left-container">
        <h1>
          <IoShareSocial color="lime" />
          <div>Hangouts</div>
        </h1>
      </a>

      <div className="nav-mid-container">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : null)}
          aria-label="hometab"
        >
          <FiHome />
        </NavLink>
        <NavLink
          to="/people-you-may-know"
          className={({ isActive }) => (isActive ? "active" : null)}
          aria-label="friendstab"
        >
          <FiUsers />
        </NavLink>
        <NavLink
          to="/store"
          className={({ isActive }) => (isActive ? "active" : null)}
          aria-label="storetab"
        >
          <MdOutlineLocalGroceryStore />
        </NavLink>
        <NavLink
          to={"/groups"}
          className={({ isActive }) => (isActive ? "active" : null)}
          aria-label="groupstab"
        >
          <HiOutlineUserGroup />
        </NavLink>
      </div>

      <div className="nav-right-container">
        <div>
          <FaRegBell />
        </div>
        <NavLink to={"/chatlist"} aria-label="chats">
          <FaRegMessage />
        </NavLink>
        <NavLink
          to={`/profile/${currentUser.id}`}
          className="nav-profile"
          aria-label="profile"
        >
          <ImgSkeleton src={currentUser.avatarUrl} />
        </NavLink>

        <div className="nav-burger-menu">
          <Hamburger
            toggled={mobileAside}
            toggle={setMobileAside}
            label="burger-menu"
          />
        </div>
      </div>
    </nav>
  );
}
