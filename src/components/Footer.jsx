import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-700 to-blue-600   text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-bold text-white">MyBlog</h2>
          <p className="mt-3 text-sm text-gray-400">
            A simple blogging platform where authors can register, login, and
            share their thoughts. Powered by MongoDB, Express, React, and
            Node.js.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-yellow-400 transition">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              Twitter
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
