import React from "react";
import logo from "../assets/react.svg";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaStickyNote,
  FaBook,
  FaCalendar,
  FaBookmark,
  FaUser
} from "react-icons/fa";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />
  },
  {
    label: "Notes",
    path: "/notes",
    icon: <FaStickyNote />
  },
  {
    label: "Course",
    icon: <FaBook />,
    children: [
      {
        label: "Course Name",
        path: "/course/name"
      },
      {
        label: "Branch Name",
        path: "/course/branch"
      }
    ]
  },
  {
    label: "Year",
    path: "/year",
    icon: <FaCalendar />
  },
  {
    label: "Subject",
    path: "/subject",
    icon: <FaBookmark />
  }
];

const Sidebar = () => {
  const navItem =
    "group flex items-center gap-3 h-12 px-4 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition";

  const activeItem = "bg-gray-800 text-white";

  const subItem =
    "flex items-center h-10 pl-12 pr-4 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition";

  return (
    <aside className="group peer fixed left-0 top-0 z-50 h-screen w-16 hover:w-56 bg-black transition-all duration-300">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center group-hover:justify-start px-4">
        <img src={logo} alt="Logo" className="h-6 w-6" />
      </div>

      {/* Navigation */}
      <nav className="m-2 flex flex-col gap-3">
        {navItems.map((item, index) => (
          <div key={index} className="group/item">
            {/* Parent */}
            {item.path ? (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${navItem} ${isActive ? activeItem : ""}`
                }
              >
                <span className="text-lg min-w-[20px]">{item.icon}</span>
                <span className="opacity-0 group-hover:opacity-100 transition">
                  {item.label}
                </span>
              </NavLink>
            ) : (
              <div className={navItem}>
                <span className="text-lg min-w-[20px]">{item.icon}</span>
                <span className="opacity-0 group-hover:opacity-100 transition">
                  {item.label}
                </span>
              </div>
            )}

            {/* Submenu */}
            {item.children && (
              <div className="hidden group-hover/item:block">
                {item.children.map((child, i) => (
                  <NavLink
                    key={i}
                    to={child.path}
                    className={({ isActive }) =>
                      `${subItem} ${isActive ? "text-white" : ""}`
                    }
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Profile */}
      <div className="absolute bottom-4 left-0 w-full px-4">
        <div className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg px-2 py-2">
          <FaUser />
          <span className="opacity-0 group-hover:opacity-100 transition">
            Profile
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
