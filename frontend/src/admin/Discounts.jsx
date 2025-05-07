import { useState, useEffect } from "react";
import { Search, ChevronDown, Edit, Trash, Plus, X } from "lucide-react";
import axios from "axios";

const Discounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const discountsPerPage = 5;

  const API_BASE_URL = "https://localhost:7084/api/Admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [discountsResponse, booksResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/discounts`, { timeout: 5000 }),
          axios.get(`${API_BASE_URL}/books`, { timeout: 5000 }),
        ]);
        setDiscounts(discountsResponse.data);
        setBooks(booksResponse.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data. Check API server.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddDiscount = async (discountData) => {
    if (new Date(discountData.startDate) >= new Date(discountData.endDate)) {
      setError("Start date must be before end date.");
      return;
    }
    if (discountData.discountPercentage <= 0 || discountData.discountPercentage > 100) {
      setError("Discount percentage must be between 1 and 100.");
      return;
    }
    const onSaleFlag = discountData.discountPercentage >= 5;
    if (onSaleFlag && discountData.discountPercentage < 5) {
      setError("Discount percentage must be at least 5% to mark as 'On Sale'.");
      return;
    }
    try {
      setLoading(true);
      const selectedBook = books.find((book) => book.id === parseInt(discountData.bookId));
      const response = await axios.post(`${API_BASE_URL}/discounts`, {
        bookId: parseInt(discountData.bookId),
        discountPercentage: parseFloat(discountData.discountPercentage),
        startDate: new Date(discountData.startDate).toISOString(),
        endDate: new Date(discountData.endDate).toISOString(),
        onSaleFlag: onSaleFlag,
      });
      setDiscounts([...discounts, { ...response.data, book: selectedBook }]);
      setShowAddModal(false);
      setSuccessMessage("Discount added successfully!");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDiscount = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/discounts/${id}`);
      setDiscounts(discounts.filter((discount) => discount.id !== id));
      setSuccessMessage("Discount deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredDiscounts = discounts.filter(
    (discount) =>
      discount.book?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.book?.isbn?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastDiscount = currentPage * discountsPerPage;
  const indexOfFirstDiscount = indexOfLastDiscount - discountsPerPage;
  const currentDiscounts = filteredDiscounts.slice(indexOfFirstDiscount, indexOfLastDiscount);
  const totalPages = Math.ceil(filteredDiscounts.length / discountsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <button
          className="border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} /> Add Discount
        </button>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-6">
          <p>{successMessage}</p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}

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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      )}

      {!loading && (
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse bg-white border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="py-3 px-4 text-left font-medium text-gray-700">Title</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">ISBN</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Discount %</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Start Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">End Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDiscounts.length > 0 ? (
                currentDiscounts.map((discount) => (
                  <tr key={discount.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{discount.book?.title || "N/A"}</td>
                    <td className="py-3 px-4">{discount.book?.isbn || "N/A"}</td>
                    <td className="py-3 px-4">{discount.discountPercentage}%</td>
                    <td className="py-3 px-4">{new Date(discount.startDate).toISOString().split("T")[0]}</td>
                    <td className="py-3 px-4">{new Date(discount.endDate).toISOString().split("T")[0]}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-3">
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit size={18} />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          onClick={() => handleDeleteDiscount(discount.id)}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">
                    No discounts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filteredDiscounts.length > 0 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-gray-100 border-gray-400"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              
            </button>
          </nav>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add New Discount</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newDiscount = {
                  bookId: formData.get("bookId"),
                  discountPercentage: parseFloat(formData.get("discountPercentage")),
                  startDate: formData.get("startDate"),
                  endDate: formData.get("endDate"),
                };
                handleAddDiscount(newDiscount);
              }}
            >
              <div className="grid grid-cols-1 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
                  <select
                    name="bookId"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select a book</option>
                    {books.map((book) => (
                      <option key={book.id} value={book.id}>
                        {book.title} (ISBN: {book.isbn})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Percentage
                  </label>
                  <input
                    type="number"
                    name="discountPercentage"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="1"
                    max="100"
                    step="0.1"
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
                      name="startDate"
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
                      name="endDate"
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
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Discount"}
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