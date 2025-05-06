import { useState } from "react";
import { Search, ChevronDown, Check, X } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      member: "John Doe",
      book: "Cosmic Odyssey",
      status: "Pending",
      claimCode: "CL-1",
    },
    {
      id: 2,
      member: "Elisa Gran",
      book: "Nebula Dreams",
      status: "Confirmed",
      claimCode: "CL-1",
    },
    {
      id: 3,
      member: "John Doe",
      book: "Stellar Winds",
      status: "Pending",
      claimCode: "CL-1",
    },
    {
      id: 4,
      member: "Elisa Gran",
      book: "Quantum Leap",
      status: "Confirmed",
      claimCode: "CL-1",
    },
    {
      id: 5,
      member: "John Doe",
      book: "Galactic Empire",
      status: "Pending",
      claimCode: "CL-1",
    },
    {
      id: 6,
      member: "Elisa Gran",
      book: "Time Paradox",
      status: "Confirmed",
      claimCode: "CL-1",
    },
    {
      id: 7,
      member: "John Doe",
      book: "Robot Dreams",
      status: "Sci-Fi",
      claimCode: "CL-1",
    },
    {
      id: 8,
      member: "Elisa Gran",
      book: "Space Colony",
      status: "Confirmed",
      claimCode: "CL-1",
    },
    {
      id: 9,
      member: "John Doe",
      book: "Alien Contact",
      status: "Confirmed",
      claimCode: "CL-1",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 9;

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) =>
    order.member.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Handle order approval or rejection
  const handleOrderStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Handle order deletion
  const handleDeleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      {/* Search and Sort */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded block w-full pl-10 p-2.5"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative w-40 ml-4">
          <select className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5 appearance-none">
            <option value="">Sort</option>
            <option value="member">Member</option>
            <option value="status">Status</option>
            <option value="date">Date</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-300">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Member</th>
              <th className="py-3 px-4 text-left">Books</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Claim Code</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.member}</td>
                <td className="py-3 px-4">{order.book}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">{order.claimCode}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() =>
                        handleOrderStatusChange(order.id, "Confirmed")
                      }
                    >
                      <Check size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No orders found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
