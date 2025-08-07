import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm py-3 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        MyBlog
      </Link>
      <nav className="space-x-4">
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
            <Link to="/register" className="text-gray-600 hover:text-blue-600">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
