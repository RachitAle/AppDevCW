"use client";

import { Link, Outlet, useLocation } from "react-router-dom";
import { Search, ShoppingCart, ChevronDown, Heart } from "lucide-react";
import { useBookContext } from "./context/BookContext";
import { useState, useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;
  const { sortBy, setSortBy } = useBookContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const sortOptions = [
    "Popularity",
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
  ];

  useEffect(() => {
    // Fetch announcement from backend
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch("/api/announcement");
        const data = await response.json();
        setAnnouncement(data.message || ""); // fallback to empty string if not present
      } catch (error) {
        console.error("Error fetching announcement:", error);
      }
    };

    fetchAnnouncement();
  }, []);

  const getActivePage = () => {
    if (path === "/") return "home";
    if (path === "/aboutus") return "aboutus";
    if (path === "/contact") return "contact";
    if (path.startsWith("/books")) return "books";
    return "";
  };

  const activePage = getActivePage();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/books?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="font-sans text-gray-800 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b p-4 flex flex-col gap-4">
        {/* Top Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex gap-10 text-lg font-medium text-black">
            <Link
              to="/"
              className={
                activePage === "home" ? "font-bold" : "hover:text-gray-600"
              }
            >
              Home
            </Link>
            <Link
              to="/aboutus"
              className={
                activePage === "aboutus" ? "font-bold" : "hover:text-gray-600"
              }
            >
              About us
            </Link>
            <Link
              to="/contact"
              className={
                activePage === "contact" ? "font-bold" : "hover:text-gray-600"
              }
            >
              Contact us
            </Link>
            <Link
              to="/books"
              className={
                activePage === "books" ? "font-bold" : "hover:text-gray-600"
              }
            >
              Books
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-black font-bold hover:text-gray-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-black font-bold hover:text-gray-600"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Logo & Actions */}
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <Link
            to="/"
            className="bg-green-600 text-white px-4 py-2 font-bold rounded text-lg"
          >
            <span className="text-white">B</span>ooky
          </Link>

          <div className="flex items-center gap-4 ml-auto flex-wrap">
            {/* Sort Dropdown */}
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded px-2 py-1 pr-6 text-sm cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-2 top-2 pointer-events-none text-gray-500"
                />
              </div>
            </div>

            {/* Search Input */}
            <form
              onSubmit={handleSearch}
              className="relative"
              style={{ maxWidth: "180px" }}
            >
              <input
                type="text"
                placeholder="Quick search"
                className="border border-gray-300 p-2 w-full rounded pl-10 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
              <button type="submit" className="sr-only">
                Search
              </button>
            </form>

            {/* Wishlist & Cart Icons */}
            <Link to="/wishlist" className="text-red-500 hover:text-red-600">
              <Heart size={24} />
            </Link>
            <Link to="/cart" className="text-green-600 hover:text-green-700">
              <ShoppingCart size={24} />
            </Link>
          </div>
        </div>
      </header>

      {/* Dynamic Announcement */}
      {announcement && (
        <div className="text-center py-4 font-semibold border-b bg-green-100 text-black">
          {announcement}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="font-bold mb-2 text-black">Contact</h3>
          <p>+977 1234567890</p>
          <p>abcd@gmail.com</p>
          <p>Rambazar, Pokhara</p>
        </div>
        <div>
          <h3 className="font-bold mb-2 text-black">About us</h3>
          <p>
            Abchbchabckadbcyjbcj
            <br />
            cahjchabcjkabcjkabcjka
            <br />
            cahjchabchbckabckab
            <br />
            cdabchadbcadjcbajcbja
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-2 text-black">Socials</h3>
          <p>Links to social platforms (Facebook, Twitter, etc.)</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;