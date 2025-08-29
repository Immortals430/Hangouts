import { useEffect } from "react";

const useInfiniteScroll = (
  scrollContainer,
  fetchData,
  loading,
  page,
  hasData
) => {

  // fetch data on scroll if condition satisfy
  const handleScroll = async (e) => {

    const totalHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;
    if (scrollTop + clientHeight + 1 >= totalHeight && !loading) {
      fetchData();
    }
  };

  useEffect(() => {
    if (hasData)
      scrollContainer?.current.addEventListener("scroll", handleScroll);
    else scrollContainer?.current.removeEventListener("scroll", handleScroll);
    return () =>
      scrollContainer?.current?.removeEventListener("scroll", handleScroll);
  }, [scrollContainer, loading, hasData]);
};

export default useInfiniteScroll;
