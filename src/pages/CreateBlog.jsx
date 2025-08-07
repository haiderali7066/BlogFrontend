import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    tags: "",
    image: "",
    content: "",
  });
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEditorChange = (value) => setForm({ ...form, content: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const blogData = {
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim()),
      };
      const res = await API.post("/blogs", blogData);
      navigate(`/blog/${res.data._id}`);
    } catch (err) {
      alert("Failed to create blog");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Write a New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Blog title"
          className="w-full px-4 py-2 border rounded"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          className="w-full px-4 py-2 border rounded"
          value={form.tags}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Cover image URL"
          className="w-full px-4 py-2 border rounded"
          value={form.image}
          onChange={handleChange}
        />
        {isMounted && (
          <ReactQuill
            theme="snow"
            value={form.content}
            onChange={handleEditorChange}
            placeholder="Write your blog content here..."
            className="bg-white rounded"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
