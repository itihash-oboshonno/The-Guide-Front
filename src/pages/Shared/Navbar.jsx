import { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import navlogo from "../../assets/the-guide-logo-mid-coloured.webp";
import { FaBars } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import AuthContext from "../../contexts/authContext/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const atHomePage = location.pathname === "/";
  const { currentUser, userLogout } = useContext(AuthContext);

  const handleSignOut = () => {
    userLogout()
      .then(() => {
        toast.warning("User Signed Out");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-dark underline decoration-prim2 decoration-4 lg:underline-offset-8"
              : "font-medium text-dark hover:text-prim2"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-blog"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-dark underline decoration-prim2 decoration-4 lg:underline-offset-8"
              : "font-medium text-dark hover:text-prim2"
          }
        >
          Add Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-blogs"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-dark underline decoration-prim2 decoration-4 lg:underline-offset-8"
              : "font-medium text-dark hover:text-prim2"
          }
        >
          All Blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/featured-blogs"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-dark underline decoration-prim2 decoration-4 lg:underline-offset-8"
              : "font-medium text-dark hover:text-prim2"
          }
        >
          Featured Blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-dark underline decoration-prim2 decoration-4 lg:underline-offset-8"
              : "font-medium text-dark hover:text-prim2"
          }
        >
          Wishlist
        </NavLink>
      </li>
    </>
  );

  return (
    <div className={atHomePage ? "bg-[#f9f8fd]" : "bg-white shadow"}>
      <nav className="flex justify-between items-center max-w-screen-2xl mx-auto px-4 py-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img
              className="max-w-32 md:max-w-40 mx-auto"
              src={navlogo}
              alt=""
            />
          </Link>
        </div>
        <div>
          <ul className="hidden lg:flex items-center gap-8">{navItems}</ul>
        </div>
        <div className="">
          {currentUser ? (
            <>
              <div className="p-1 rounded-xl flex items-center gap-1 md:gap-4">
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={currentUser.displayName}
                >
                  <img
                    className="rounded-full w-8 h-8 md:w-10 md:h-10 object-cover"
                    src={currentUser.photoURL}
                    alt=""
                  />
                </div>
                <Link to="/">
                  <button
                    onClick={handleSignOut}
                    className="text-white text-sm md:text-base md:font-semibold bg-prim2 px-3 py-2 md:px-6 md:py-2.5 rounded-full hover:shadow-lg hover:bg-primary transition-all"
                  >
                    Logout
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <button className="text-white text-sm md:text-base md:font-semibold bg-prim2 px-4 py-2 md:px-6 md:py-2.5 rounded-full hover:shadow-lg hover:bg-primary transition-all">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="text-white text-sm md:text-base md:font-semibold bg-prim2 px-3 py-2 md:px-6 md:py-2.5 rounded-full hover:shadow-lg hover:bg-primary transition-all">
                    Sign Up
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="flex lg:hidden ml-3">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <div>
                <FaBars className="text-dark"></FaBars>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
        </div>
      </nav>
      <Toaster position="top-center" expand={false} richColors />
    </div>
  );
};

export default Navbar;
