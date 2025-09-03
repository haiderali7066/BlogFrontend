import { useEffect, useMemo, useState } from "react";
import API from "../utils/api";
import BlogCard from "../components/BlogCard";
import { Link, useNavigate } from "react-router-dom"; // ✅ added useNavigate

// Spinner component
const Spinner = () => (
  <div className="flex justify-center items-center py-16">
    <svg
      className="w-10 h-10 animate-spin text-blue-600"
      viewBox="0 0 24 24"
      role="status"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

// Skeleton Loader
const SkeletonCard = () => (
  <div className="rounded-xl border border-gray-200 p-4 animate-pulse shadow-sm">
    <div className="h-40 rounded-lg bg-gray-200 mb-4" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
);

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate(); // ✅

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setErr("");
        const res = await API.get("/blogs");
        setBlogs(res.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setErr("Failed to load blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const featured = useMemo(() => blogs[0], [blogs]);
  const recent = useMemo(() => blogs.slice(1, 7), [blogs]);

  const categories = useMemo(() => {
    const raw =
      blogs.flatMap((b) => b?.tags || (b?.category ? [b.category] : [])) || [];
    return Array.from(new Set(raw)).slice(0, 6);
  }, [blogs]);

  const totalPosts = blogs.length;

  // ✅ Logic for "Write a blog"
  const handleWriteClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/create");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="space-y-20 ">
      {/* Hero Section */}
      <section className="rounded-2xl mt-14 sm:mt-14 bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-4 py-10 sm:px-8 sm:py-16 shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
            Share Ideas. Inspire Readers.
          </h1>
          <p className="text-base sm:text-lg leading-relaxed opacity-90 max-w-2xl mx-auto">
            A modern blogging platform where{" "}
            <span className="font-semibold">authors</span> can{" "}
            <span className="font-semibold">register</span>,{" "}
            <span className="font-semibold">login</span>, and{" "}
            <span className="font-semibold">publish blogs</span> stored securely
            in <span className="font-semibold">MongoDB</span>.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              to="/register"
              className="w-32 sm:w-auto mx-auto sm:mx-0 px-4 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl bg-white text-blue-700 font-medium sm:font-semibold shadow hover:shadow-lg hover:scale-105 transition text-center text-sm sm:text-base"
            >
              Create account
            </Link>

            <Link
              to="/login"
              className="w-32 sm:w-auto mx-auto sm:mx-0 px-4 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl bg-blue-900/30 border border-white/30 text-white font-medium sm:font-semibold hover:bg-blue-900/50 transition text-center text-sm sm:text-base"
            >
              Login
            </Link>

            <button
              onClick={handleWriteClick}
              className="w-32 sm:w-auto mx-auto sm:mx-0 px-4 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl bg-indigo-900/40 border border-white/30 text-white font-medium sm:font-semibold hover:bg-indigo-900/60 transition text-center text-sm sm:text-base"
            >
              Write a blog
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
        {[
          {
            title: "Author-only posting",
            desc: "Only verified authors can publish content.",
          },
          {
            title: "MongoDB powered",
            desc: "Fast, reliable storage & queries.",
          },
          {
            title: "Modern UI",
            desc: "Clean design, responsive layout.",
          },
          {
            title: "Categories & tags",
            desc: "Organize blogs for easy discovery.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2">
              {f.title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-base">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Latest Blogs */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Blogs</h2>
          <Link
            to="/blogs"
            className="text-blue-600 font-medium hover:underline"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <>
            <Spinner />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </>
        ) : blogs.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(0, 9).map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No blogs found.</p>
        )}
      </section>

      {/* Featured Blog */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured</h2>
        {loading ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <SkeletonCard />
            <div className="grid gap-6 sm:grid-cols-2">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        ) : err ? (
          <p className="text-red-600">{err}</p>
        ) : featured ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="grid gap-6 sm:grid-cols-1">
              {recent.slice(2, 3).map((b) => (
                <BlogCard key={b._id} blog={b} />
              ))}
            </div>

            {/* Right: Two stacked recent blogs */}
            <div className="grid gap-6 sm:grid-cols-1">
              {recent.slice(3, 4).map((b) => (
                <BlogCard key={b._id} blog={b} />
              ))}
            </div>
            <div className="grid gap-6 sm:grid-cols-1">
              {recent.slice(0, 1).map((b) => (
                <BlogCard key={b._id} blog={b} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No blogs yet.</p>
        )}
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Explore by Category</h2>
        {loading ? (
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-10 rounded-full bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : categories.length ? (
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <Link
                key={c}
                to={`/blogs?category=${encodeURIComponent(c)}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition"
              >
                {c}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No categories yet.</p>
        )}
      </section>
      {/* CTA Section */}
      <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-12 text-center shadow-xl">
        <h3 className="text-3xl font-bold mb-3">Ready to publish?</h3>
        <p className="opacity-90 mb-6">
          Join our growing community of authors and share your stories.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold shadow hover:scale-105 transition"
          >
            Create account
          </Link>
          <button
            onClick={handleWriteClick} // ✅ applied same logic here
            className="px-6 py-3 rounded-xl border border-white/30 font-semibold hover:bg-white/10 transition"
          >
            Write a blog
          </button>
        </div>
        {totalPosts > 0 && (
          <p className="mt-6 text-sm opacity-80">
            {totalPosts} {totalPosts === 1 ? "post" : "posts"} published so far.
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
