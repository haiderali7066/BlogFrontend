import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";

const BlogCard = ({ blog }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const isAdmin = user?.user?.role === "admin";

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;

    try {
      await API.delete(`/blogs/${blog._id}`);
      alert("Blog deleted");
      window.location.reload();
    } catch (err) {
      alert("Delete failed");
      console.error("DELETE ERROR:", err?.response?.data || err.message);
    }
  };


  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
      {blog.image && (
        <img
          src={blog.image}
          alt="cover"
          className="w-full h-40  object-cover rounded-md mb-3"
        />
      )}
      <h2 className="text-lg font-semibold line-clamp-2 mb-1">{blog.title}</h2>
      <p className="text-sm text-gray-600 line-clamp-3">
        {blog.content.replace(/<[^>]+>/g, "")}
      </p>

      <div className="mt-3 text-sm flex justify-between items-center">
        <span className="text-gray-500">
          By {blog.author?.username || "Unknown"}
        </span>
        <Link
          to={`/blog/${blog._id}`}
          className="text-red-500 font-mono hover:underline"
        >
          Read more
        </Link>
      </div>

      {isAdmin && (
        <div className="mt-3 flex gap-4 text-sm">
          <Link
            to={`/edit/${blog._id}`}
            className="text-blue-600 hover:underline"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
