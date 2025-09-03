import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons (lucide-react)

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm py-3 px-6 fixed w-full z-50">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Left: Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Haider&apos;s Blog
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600">
            Contact
          </Link>
        </nav>

        {/* Desktop Auth/User */}
        <div className="hidden md:flex space-x-4">
          {user ? (
            <>
              <Link to="/create" className="text-gray-600 hover:text-blue-600">
                Write
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-blue-600">
                Profile
              </Link>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-600 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-3 bg-white border-t border-gray-200 py-4 px-6 shadow-sm">
          <Link to="/" className="block text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="block text-gray-600 hover:text-blue-600">
            About
          </Link>
          <Link
            to="/contact"
            className="block text-gray-600 hover:text-blue-600"
          >
            Contact
          </Link>

          {user ? (
            <>
              <Link
                to="/create"
                className="block text-gray-600 hover:text-blue-600"
              >
                Write
              </Link>
              <Link
                to="/profile"
                className="block text-gray-600 hover:text-blue-600"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block text-red-500 w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-600 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-gray-600 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
