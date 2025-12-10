import { use } from "react";
import SearchContainer from "../container/SearchContainer";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = use(AuthContext);
  return (
    <nav className="flex flex-col md:flex-row p-3 py-4 md:px-8 justify-between items-center bg-blue-500 shadow-lg gap-3 fixed w-full top-0 left-0 z-50">
      <div className="flex items-center justify-center order-1">
        <Link
          to="/"
          className="text-2xl font-extrabold text-white hover:text-gray-100 transition duration-150"
        >
          FAKE STORE
        </Link>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 order-3 md:order-2">
        <SearchContainer />
      </div>

      <div className="order-2 md:order-3">
        {user ? (
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 object-cover rounded-full border-2 border-white"
              src={user.avatar}
              alt="User Avatar"
            />
            <p className="text-white font-medium truncate max-w-[100px] hidden sm:block">
              {user.name}
            </p>
            <Link
              className="px-3 py-2 text-sm border-2 border-stone-600 bg-stone-600 hover:bg-stone-700 rounded-lg text-white font-semibold transition duration-200"
              to="/cart"
            >
              Cart
            </Link>
            <button
              onClick={logout}
              className="px-3 py-2 text-sm border-2 border-red-600 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition duration-200"
            >
              Logout
            </button>

            {user && user.role === "admin" && (
              <Link
                className="px-3 py-2 text-sm  hover:bg-indigo-800 rounded-lg text-white font-semibold transition duration-200"
                to="/admin"
              >
                Admin
              </Link>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-3 py-1 text-white font-medium hover:underline transition duration-150"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-3 py-1 text-white font-medium hover:underline transition duration-150"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
