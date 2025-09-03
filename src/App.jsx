import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Header from "./components/Header";
import EditBlog from "./pages/EditBlog"; // ✅ Add this line
import Footers from "./components/Footer";
import About from "./pages/About";

function App() {
  return (
    <div>
      <Header />
      <div className=" px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/edit/:id" element={<EditBlog />} />{" "}
          {/* ✅ Add this route */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
      <Footers />
    </div>
  );
}

export default App;
