import { useRef } from "react";
import CreatePost from "../../Components/CreatePost/CreatePost";
import Connections from "../../Components/AsideMenu/Connections/Connections";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useFetchPost from "./useFetchPost";
import Posts from "../../Components/Posts/Posts";
import "./HomePage.scss";

export default function HomePage() {
  const containerRef = useRef(null);

  // get post on initial render.
  const { getPost, posts, loading, page, hasPost } = useFetchPost();
 
  // infinite scroll
  useInfiniteScroll(containerRef, getPost, loading, page, hasPost);
  
  return (
    <main className="home-page" ref={containerRef}>
      <div className="post-section">
        <CreatePost />
        <Posts  posts={posts} loading={loading} />
      </div>
      <div className="connection-section">
        <h4>Online Friends</h4>
        {/* <Connections /> */}
      </div>
    </main>
  );
}
