import React from "react";
import logo from "../assets/react.svg";
import {
  FaCalendar,
  FaBookmark,
  FaBook,
  FaUser,
  FaHome,
  FaStickyNote,
  FaTags,
  FaChevronRight
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItem =
    "group flex items-center gap-3 h-12 px-4 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition";

  const activeItem = "bg-gray-800 text-white";

  const subItem =
    "flex items-center h-10 pl-12 pr-4 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition";

  return (
    <aside className="group peer fixed left-0 top-0 z-50 flex h-screen w-16 hover:w-56 flex-col justify-between bg-black border-r border-gray-800 transition-all duration-300">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex h-16 items-center justify-center group-hover:justify-start px-4 transition-all">
          <span className="grid h-10 w-10 place-content-center rounded-lg bg-gray-800">
            <img src={logo} alt="Logo" className="h-6 w-6" />
          </span>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-1">
          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : ""}`
            }
          >
            <FaHome className="text-lg min-w-[20px]" />
            <span className="opacity-0 group-hover:opacity-100 transition">
              Dashboard
            </span>
          </NavLink>

          {/* Notes */}
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : ""}`
            }
          >
            <FaStickyNote className="text-lg min-w-[20px]" />
            <span className="opacity-0 group-hover:opacity-100 transition">
              Notes
            </span>
          </NavLink>

          {/* Course with Submenu */}
          <div className="group/course">
            <NavLink
              to="/course"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeItem : ""}`
              }
            >
              <FaBook className="text-lg min-w-[20px]" />
              <span className="flex-1 opacity-0 group-hover:opacity-100 transition">
                Course
              </span>
            </NavLink>

            {/* Submenu */}
            <div className="hidden group-hover:block group-hover/course:block">
              <NavLink
                to="/course/course-name"
                className={({ isActive }) =>
                  `${subItem} ${isActive ? "text-white" : ""}`
                }
              >
                Course Name
              </NavLink>

              <NavLink
                to="/course/branch-name"
                className={({ isActive }) =>
                  `${subItem} ${isActive ? "text-white" : ""}`
                }
              >
                Branch Name
              </NavLink>
            </div>
          </div>

          {/* Year */}
          <NavLink
            to="/year"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : ""}`
            }
          >
            <FaCalendar className="text-lg min-w-[20px]" />
            <span className="opacity-0 group-hover:opacity-100 transition">
              Year
            </span>
          </NavLink>

          <NavLink
            to="/subject"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : ""}`
            }
          >
            <FaBookmark className="text-lg min-w-[20px]" />
            <span className="opacity-0 group-hover:opacity-100 transition">
              Subject
            </span>
          </NavLink>

          {/* Categories */}
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : ""}`
            }
          >
            <FaTags className="text-lg min-w-[20px]" />
            <span className="opacity-0 group-hover:opacity-100 transition">
              Categories
            </span>
          </NavLink>
        </nav>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 px-4 py-4 text-gray-400 hover:text-white cursor-pointer hover:bg-gray-800 rounded-lg transition">
        <FaUser className="text-lg min-w-[20px]" />
        <span className="opacity-0 group-hover:opacity-100 transition">
          Profile
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
