import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        alert("Blog not found");
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 shadow rounded-xl">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>By {blog.author?.username}</span>
        <span>
          {new Date(blog.createdAt).toLocaleDateString()} · {blog.views} views
        </span>
      </div>
      {blog.image && (
        <img
          src={blog.image}
          alt="cover"
          className="w-auto h-auto object-cover rounded-lg mb-4"
        />
      )}
      <div className="flex gap-2 flex-wrap mb-6">
        {blog.tags.map((tag, i) => (
          <span key={i} className="px-2 py-1 text-sm bg-gray-200 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default BlogDetails;
