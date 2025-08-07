import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import BlogCard from "../components/BlogCard";

const Profile = () => {
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get(`/users/me`);
      setUser(res.data);
    };
    const fetchMyBlogs = async () => {
      const res = await API.get("/blogs?author=" + currentUser.user.id); // optional backend filter
      setBlogs(res.data);
    };
    fetchProfile();
    fetchMyBlogs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-gray-600">{user.bio}</p>
          </div>
          <Link
            to="/edit-profile"
            className="text-sm text-blue-600 border px-3 py-1 rounded hover:bg-blue-50"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3">My Blogs</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <BlogCard blog={blog} key={blog._id} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
