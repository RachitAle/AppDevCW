import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./admin/Sidebar.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import Books from "./admin/Books.jsx";
import Discounts from "./admin/Discounts.jsx";
import Announcements from "./admin/Announcements.jsx";
import Orders from "./admin/Orders.jsx";
import Members from "./admin/Members.jsx";
import Reviews from "./admin/Reviews.jsx";
import { useState } from "react";

const App = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
            <h1 className="text-2xl font-bold">{activeTab}</h1>
          </header>

          <main className="p-6">
            <Routes>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/books" element={<Books />} />
              <Route path="/admin/discounts" element={<Discounts />} />
              <Route path="/admin/announcements" element={<Announcements />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/members" element={<Members />} />
              <Route path="/admin/reviews" element={<Reviews />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
