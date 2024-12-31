import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBook, FaClipboardList } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-custom-grey dark:bg-custom-dark text-custom-orange dark:text-emerald-50 border-l-0 p-5 transform transition-transform overflow-y-auto ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 z-20`}
    >
      <ul className="flex flex-col items-start">
        <li className="w-full mt-[97px]">
          <NavLink
            to="/student/dashboard"
            className={({ isActive }) =>
              `flex items-center py-2 px-3 w-full rounded-xl ${
                isActive ? 'bg-custom-orange dark:bg-custum-active-dark text-white' : ''
              } hover:bg-custom-peach dark:hover:bg-custum-hover-dark cursor-pointer`
            }
            onClick={toggleSidebar}
          >
            <FaHome className="mr-2" /> Dashboard
          </NavLink>
        </li>
        <li className="w-full mt-4">
          <NavLink
            to="/payment-status"
            className={({ isActive }) =>
              `flex items-center py-2 px-3 w-full rounded-xl ${
                isActive ? 'bg-custom-orange dark:bg-custum-active-dark text-white' : ''
              } hover:bg-custom-peach dark:hover:bg-custum-hover-dark cursor-pointer`
            }
            onClick={toggleSidebar}
          >
            <FaBook className="mr-2" /> paymentStatus
          </NavLink>
        </li>
        <li className="w-full mt-4">
          <NavLink
            to="/enrolled-course"
            className={({ isActive }) =>
              `flex items-center py-2 px-3 w-full rounded-xl ${
                isActive ? 'bg-custom-orange dark:bg-custum-active-dark text-white' : ''
              } hover:bg-custom-peach dark:hover:bg-custum-hover-dark cursor-pointer`
            }
            onClick={toggleSidebar}
          >
            <FaClipboardList className="mr-2" /> Enrolled Course
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
