import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const EditProfile = () => {
  const [form, setForm] = useState({ username: "", bio: "", avatar: "" });
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users/me").then((res) => {
      setForm({
        username: res.data.username,
        bio: res.data.bio || "",
        avatar: res.data.avatar || "",
      });
    });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put("/users/me", form);
    navigate("/profile");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="avatar"
          value={form.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full border px-4 py-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
