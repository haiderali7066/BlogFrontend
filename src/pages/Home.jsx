import { useEffect, useState } from "react";
import API from "../utils/api";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
