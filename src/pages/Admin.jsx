import { useEffect, useState } from "react";
import API from "../utils/api";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await API.get("/admin/dashboard");
    setUsers(res.data.users);
    setBlogs(res.data.blogs);
    setComments(res.data.comments);
  };

  const toggleBlock = async (userId) => {
    await API.put(`/admin/block/${userId}`);
    fetchData();
  };

  const updateRole = async (userId, newRole) => {
    await API.put(`/admin/role/${userId}`, { role: newRole });
    fetchData();
  };

  const deletePost = async (blogId) => {
    await API.delete(`/admin/post/${blogId}`);
    fetchData();
  };

  const deleteComment = async (commentId) => {
    await API.delete(`/admin/comment/${commentId}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Users */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">👤 Users</h2>
        <div className="bg-white shadow rounded-lg p-4 space-y-3">
          {users.map((u) => (
            <div
              key={u._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{u.username}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
                <p className="text-xs text-gray-400">Role: {u.role}</p>
              </div>
              <div className="flex gap-2 items-center">
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u._id, e.target.value)}
                  className="border px-2 py-1 rounded text-sm"
                >
                  <option value="user">user</option>
                  <option value="editor">editor</option>
                  <option value="admin">admin</option>
                </select>
                <button
                  onClick={() => toggleBlock(u._id)}
                  className={`px-2 py-1 rounded text-white text-sm ${
                    u.isBlocked ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {u.isBlocked ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blogs */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">📝 Blogs</h2>
        <div className="bg-white shadow rounded-lg p-4 space-y-3">
          {blogs.map((b) => (
            <div
              key={b._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{b.title}</p>
                <p className="text-sm text-gray-500">By {b.author?.username}</p>
              </div>
              <button
                onClick={() => deletePost(b._id)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Comments */}
      <section>
        <h2 className="text-xl font-semibold mb-2">💬 Comments</h2>
        <div className="bg-white shadow rounded-lg p-4 space-y-3">
          {comments.map((c) => (
            <div
              key={c._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="text-gray-800">{c.text}</p>
                <p className="text-sm text-gray-500">By {c.user?.username}</p>
              </div>
              <button
                onClick={() => deleteComment(c._id)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Admin;
