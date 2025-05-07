"use client";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./admin/Sidebar.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import Books from "./admin/Books.jsx";
import Discounts from "./admin/Discounts.jsx";
import Announcements from "./admin/Announcements.jsx";
import Orders from "./admin/Orders.jsx";
import Members from "./admin/Members.jsx";
import Reviews from "./admin/Reviews.jsx";
import Home from "./user/Home.jsx";
import AboutUs from "./user/About.jsx";
import Contact from "./user/Contact.jsx";
import AllBooks from "./user/AllBooks.jsx";
import Layout from "./user/Layout.jsx";
import { BookProvider } from "./user/context/BookContext.jsx";
import { useState } from "react";
import Login from "./user/Login.jsx";
import Register from "./user/Register.jsx";
import Wishlist from "./user/Wishlist.jsx";
import Cart from "./user/Cart.jsx";

const AdminLayout = ({ activeTab, setActiveTab, collapsed }) => (
  <div className="flex h-screen">
    <Sidebar
      collapsed={collapsed}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
    <div className="flex-1 overflow-auto">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold">{activeTab}</h1>
      </header>
      <main className="p-6">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="discounts" element={<Discounts />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="orders" element={<Orders />} />
          <Route path="members" element={<Members />} />
          <Route path="reviews" element={<Reviews />} />
        </Routes>
      </main>
    </div>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <BookProvider>
        <Routes>
          {/* Login & Register - Standalone pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Public/User Routes with shared Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="books" element={<AllBooks />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <AdminLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                collapsed={collapsed}
              />
            }
          />
        </Routes>
      </BookProvider>
    </Router>
  );
};

export default App;
