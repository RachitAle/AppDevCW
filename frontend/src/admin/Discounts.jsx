import { useState } from "react";
import { Search, ChevronDown, Edit, Trash } from "lucide-react";

const Discounts = () => {
  // Mock data for discounts
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      title: "Book Name",
      isbn: "01-00000",
      discountPercentage: 10,
      startDate: "01/03/25",
      endDate: "01/05/25",
    },
    {
      id: 2,
      title: "Book Name",
      isbn: "01-00000",
      discountPercentage: 10,
      startDate: "01/03/25",
      endDate: "01/05/25",
    },
    {
      id: 3,
      title: "Book Name",
      isbn: "01-00000",
      discountPercentage: 10,
      startDate: "01/03/25",
      endDate: "01/05/25",
    },
    {
      id: 4,
      title: "Book Name",
      isbn: "01-00000",
      discountPercentage: 10,
      startDate: "01/03/25",
      endDate: "01/05/25",
    },
    {
      id: 5,
      title: "Book Name",
      isbn: "01-00000",
      discountPercentage: 10,
      startDate: "01/03/25",
      endDate: "01/05/25",
    },
    {
      id: 6,
      title: "Book Name",
      isbn: "01-00000",
      discountPercentage: 10,
      startDate: "01/03/25",
      endDate: "01/05/25",
    },
    {
      id: 7,
      title: "Book Name",
      isbn: "01-00000",
      discountPercentage: 10,
      startDate: "01/03/25",
      endDate: "01/05/25",
    },
    {
      id: 8,
      title: "Book Name",
      isbn: "01-00000",
      discountPercentage: 10,
      startDate: "01/03/25",
      endDate: "01/05/25",
    },
    {
      id: 9,
      title: "Book Name",
      isbn: "01-00000",
      discountPercentage: 10,
      startDate: "01/03/25",
      endDate: "01/05/25",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Navigate to different pages
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <button
          className="border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 rounded-md transition-colors"
          onClick={() => setShowAddModal(true)}
        >
          Add Discount
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="search"
            className="block w-full p-2.5 pl-10 text-sm border border-gray-300 rounded-md bg-white"
            placeholder="Search discounts"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Discounts Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Title
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                ISBN
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Discount %
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Start Date
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                End Date
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr
                key={discount.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">{discount.title}</td>
                <td className="py-3 px-4">{discount.isbn}</td>
                <td className="py-3 px-4">{discount.discountPercentage}%</td>
                <td className="py-3 px-4">{discount.startDate}</td>
                <td className="py-3 px-4">{discount.endDate}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-3">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="flex items-center space-x-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button
            className={`px-3 py-1 border rounded-md ${
              currentPage === 1
                ? "bg-gray-100 border-gray-400"
                : "border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => goToPage(1)}
          >
            1
          </button>
          <button
            className={`px-3 py-1 border rounded-md ${
              currentPage === 2
                ? "bg-gray-100 border-gray-400"
                : "border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => goToPage(2)}
          >
            2
          </button>
          <button
            className={`px-3 py-1 border rounded-md ${
              currentPage === 3
                ? "bg-gray-100 border-gray-400"
                : "border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => goToPage(3)}
          >
            3
          </button>
          <button
            className={`px-3 py-1 border rounded-md ${
              currentPage === 4
                ? "bg-gray-100 border-gray-400"
                : "border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => goToPage(4)}
          >
            4
          </button>
          <button
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === 4}
          >
            &gt;
          </button>
        </nav>
      </div>

      {/* Add Discount Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6">Add New Discount</h2>

            <form>
              <div className="grid grid-cols-1 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Book Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ISBN
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Percentage
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Add Discount
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discounts;
