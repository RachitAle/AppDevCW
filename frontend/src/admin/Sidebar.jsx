"use client";

import {
  Calendar,
  Book,
  Settings,
  Bell,
  ShoppingCart,
  Users,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { name: "Dashboard", icon: <Calendar size={20} />, path: "/admin/dashboard" },
  { name: "Book Management", icon: <Book size={20} />, path: "/admin/books" },
  { name: "Discounts", icon: <Settings size={20} />, path: "/admin/discounts" },
  {
    name: "Announcements",
    icon: <Bell size={20} />,
    path: "/admin/announcements",
  },
  { name: "Orders", icon: <ShoppingCart size={20} />, path: "/admin/orders" },
  { name: "Members", icon: <Users size={20} />, path: "/admin/members" },
  {
    name: "Reviews",
    icon: <MessageSquare size={20} />,
    path: "/admin/reviews",
  },
];

const Sidebar = ({ collapsed, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white border-r border-gray-200 min-h-screen transition-all duration-200 ease-in-out`}
    >
      <div className="p-5 border-b border-gray-200">
        {!collapsed ? (
          <h2 className="text-xl font-bold">Pathsala</h2>
        ) : (
          <div className="flex justify-center">
            <Book size={24} />
          </div>
        )}
      </div>

      <nav className="mt-4">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <button
                className={`flex items-center w-full py-3 ${
                  collapsed ? "px-0 justify-center" : "px-5 justify-start"
                } text-left hover:bg-gray-50 transition-colors ${
                  activeTab === item.name
                    ? "bg-gray-50 border-l-2 border-black"
                    : ""
                }`}
                onClick={() => {
                  setActiveTab(item.name);
                  navigate(item.path);
                }}
              >
                <span className={`text-gray-700 ${collapsed ? "" : "mr-3"}`}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full border-t border-gray-200">
        <button
          className={`flex items-center w-full py-4 ${
            collapsed ? "px-0 justify-center" : "px-5 justify-start"
          } text-left hover:bg-gray-50 transition-colors`}
        >
          <span className={`text-gray-700 ${collapsed ? "" : "mr-3"}`}>
            <LogOut size={20} />
          </span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
