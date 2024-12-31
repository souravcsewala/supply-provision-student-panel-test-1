import React, { useState, useEffect } from "react";
import { FaBars, FaSun, FaMoon, FaChevronDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authslice";
import StaticProfileImage from "../../assets/staticprofileimage.jpg";

const Topbar = ({ toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();

  const { fullName, profileimage, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("theme");
    window.location.href = "/login";
  };

  return (
    <header className="bg-custom-peach dark:bg-custom-dark-top shadow-md py-4 px-6 flex items-center fixed top-0 left-0 w-full z-30">
      <button onClick={toggleSidebar} className="lg:hidden text-custom-orange mr-3">
        <FaBars size={20} />
      </button>
      <div className="text-lg dark:text-slate-300 font-semibold">Student Panel</div>
      <div className="flex items-center space-x-4 ml-auto relative">
        <button onClick={toggleTheme} className="text-custom-orange">
          {isDarkMode ? <FaMoon size={25} /> : <FaSun size={25} />}
        </button>

        {/* Conditionally render user info and logout button if authenticated */}
        {isAuthenticated && (
          <div className="flex items-center space-x-4">
            <div className="text-gray-700 dark:text-slate-200">{fullName || "Student Name"}</div>
            <img
              className="w-10 h-10 rounded-full"
              src={profileimage || StaticProfileImage}
              alt="User"
            />
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-custom-orange focus:outline-none"
              >
                <FaChevronDown size={20} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-40">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
