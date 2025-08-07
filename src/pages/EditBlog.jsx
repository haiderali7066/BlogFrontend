// src/pages/EditBlog.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/blogs/${id}`, {
        title: blog.title,
        content: blog.content,
      });
      navigate(`/blog/${id}`);
    } catch (err) {
      alert("Update failed");
      console.error("Update error:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={blog.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Blog title"
        />
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          className="w-full border p-2 rounded h-40"
          placeholder="Blog content"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
