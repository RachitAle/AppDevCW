"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, Edit, Trash, Plus, X } from "lucide-react";
import axios from "axios";

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const booksPerPage = 9;

  // API base URL - make sure this matches your actual backend URL
  const API_BASE_URL = "http://localhost:7084/api/Admin"; // Using relative URL with proxy

  // Load mock books data since there's no GET endpoint in the provided controller
  useEffect(() => {
    // Using mock data since there's no GET endpoint in the provided controller
    const mockBooks = [
      {
        id: 1,
        title: "Cosmic Odyssey",
        isbn: "01-00001",
        author: "Elisa Grant",
        genre: "Sci-Fi",
        price: 250,
        stock: 10,
        language: "English",
        format: "Paperback",
        publisher: "Stellar Press",
        publicationDate: "2023-01-15",
      },
      {
        id: 2,
        title: "Nebula Dreams",
        isbn: "01-00002",
        author: "Elisa Grant",
        genre: "Sci-Fi",
        price: 250,
        stock: 2,
        language: "English",
        format: "Hardcover",
        publisher: "Stellar Press",
        publicationDate: "2023-03-22",
      },
      {
        id: 3,
        title: "Stellar Winds",
        isbn: "01-00003",
        author: "Elisa Grant",
        genre: "Sci-Fi",
        price: 250,
        stock: 0,
        language: "English",
        format: "E-Book",
        publisher: "Stellar Press",
        publicationDate: "2023-05-10",
      },
    ];

    setBooks(mockBooks);
    setLoading(false);
  }, []);

  // Add a new book - matches [HttpPost("books")]
  const handleAddBook = async (bookData) => {
    try {
      setLoading(true);
      console.log("Sending POST request to:", `${API_BASE_URL}/books`);

      const response = await axios.post(`${API_BASE_URL}/books`, {
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn,
        genre: bookData.genre,
        price: bookData.price,
        language: bookData.language || "English",
        format: bookData.format || "Paperback",
        publisher: bookData.publisher || "Unknown",
        publicationDate:
          bookData.publicationDate || new Date().toISOString().split("T")[0],
        rating: bookData.rating || 0,
        initialStock: bookData.stock,
      });

      // Add the new book to the state
      const newBook = response.data;
      setBooks([...books, newBook]);
      setShowAddBookModal(false);
      setError(null);
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        setError(
          `Connection refused. Make sure your API server is running at ${API_BASE_URL}. Error: ${err.message}`
        );
      } else {
        setError(err.response?.data || err.message);
      }
      console.error("Error adding book:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update a book - matches [HttpPut("books/{id}")]
  const handleUpdateBook = async (id, bookData) => {
    try {
      setLoading(true);
      console.log("Sending PUT request to:", `${API_BASE_URL}/books/${id}`);

      await axios.put(`${API_BASE_URL}/books/${id}`, {
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn,
        genre: bookData.genre,
        price: bookData.price,
        language: bookData.language || "English",
        format: bookData.format || "Paperback",
        publisher: bookData.publisher || "Unknown",
        publicationDate:
          bookData.publicationDate || new Date().toISOString().split("T")[0],
        rating: bookData.rating || 0,
      });

      // Update the books state
      setBooks(
        books.map((book) => (book.id === id ? { ...book, ...bookData } : book))
      );
      setShowEditBookModal(false);
      setCurrentBook(null);
      setError(null);
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        setError(
          `Connection refused. Make sure your API server is running at ${API_BASE_URL}. Error: ${err.message}`
        );
      } else {
        setError(err.response?.data || err.message);
      }
      console.error("Error updating book:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a book - matches [HttpDelete("books/{id}")]
  const handleDeleteBook = async (id) => {
    try {
      setLoading(true);
      console.log("Sending DELETE request to:", `${API_BASE_URL}/books/${id}`);

      await axios.delete(`${API_BASE_URL}/books/${id}`);

      // Remove the deleted book from state
      setBooks(books.filter((book) => book.id !== id));
      setError(null);
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        setError(
          `Connection refused. Make sure your API server is running at ${API_BASE_URL}. Error: ${err.message}`
        );
      } else {
        setError(err.response?.data || err.message);
      }
      console.error("Error deleting book:", err);
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal with book data
  const openEditModal = (book) => {
    setCurrentBook(book);
    setShowEditBookModal(true);
  };

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Book Management</h1>
        <button
          className="border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 rounded-md transition-colors flex items-center gap-2"
          onClick={() => setShowAddBookModal(true)}
        >
          <Plus size={18} /> Add Book
        </button>
      </div>

      {/* API Configuration Notice */}
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md mb-6">
        <p className="font-medium">API Configuration</p>
        <p>Current API URL: {API_BASE_URL}/books</p>
        <p className="mt-2 text-sm">
          Using mock data for display since there's no GET endpoint in the
          provided controller.
        </p>
        <p className="mt-2 text-sm">
          <strong>Troubleshooting:</strong> If you see "Connection refused"
          errors, check that:
        </p>
        <ul className="list-disc pl-5 mt-1 text-sm">
          <li>Your .NET API server is running</li>
          <li>
            The port in API_BASE_URL matches your server's port (currently using
            relative URL with proxy)
          </li>
          <li>CORS is properly configured on your backend</li>
        </ul>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-6">
          <p className="font-medium">Error</p>
          <p>{error}</p>
          <p className="mt-2 text-sm">
            Check the browser console for more details. Make sure your API
            server is running and the URL is correct.
          </p>
        </div>
      )}

      {/* Search and Sort */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md block w-full pl-10 p-2.5"
            placeholder="Search for Books"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative w-40 ml-4">
          <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 appearance-none">
            <option value="">Sort</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="stock">Stock</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Books Table */}
      {!loading && (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Title
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  ISBN
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Author
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Genre
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Price
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Stock
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.length > 0 ? (
                currentBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{book.title}</td>
                    <td className="py-3 px-4">{book.isbn}</td>
                    <td className="py-3 px-4">{book.author}</td>
                    <td className="py-3 px-4">{book.genre}</td>
                    <td className="py-3 px-4">{book.price}</td>
                    <td className="py-3 px-4">{book.stock}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-3">
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          onClick={() => openEditModal(book)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredBooks.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            className="mx-1 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 border rounded-md ${
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
            className="mx-1 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      )}

      {/* Add Book Modal */}
      {showAddBookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add New Book</h2>
              <button
                onClick={() => setShowAddBookModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newBook = {
                  title: formData.get("title"),
                  isbn: formData.get("isbn"),
                  author: formData.get("author"),
                  genre: formData.get("genre"),
                  price: Number(formData.get("price")),
                  stock: Number(formData.get("stock")),
                  language: formData.get("language"),
                  format: formData.get("format"),
                  publisher: formData.get("publisher"),
                  publicationDate: formData.get("publicationDate"),
                };
                handleAddBook(newBook);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ISBN*
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author*
                  </label>
                  <input
                    type="text"
                    name="author"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Genre*
                  </label>
                  <input
                    type="text"
                    name="genre"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price*
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Initial Stock*
                  </label>
                  <input
                    type="number"
                    name="stock"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <input
                    type="text"
                    name="language"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="English"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Format
                  </label>
                  <input
                    type="text"
                    name="format"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Paperback"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publisher
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publication Date
                  </label>
                  <input
                    type="date"
                    name="publicationDate"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => setShowAddBookModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {showEditBookModal && currentBook && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Edit Book</h2>
              <button
                onClick={() => {
                  setShowEditBookModal(false);
                  setCurrentBook(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedBook = {
                  title: formData.get("title"),
                  isbn: formData.get("isbn"),
                  author: formData.get("author"),
                  genre: formData.get("genre"),
                  price: Number(formData.get("price")),
                  stock: Number(formData.get("stock")),
                  language: formData.get("language"),
                  format: formData.get("format"),
                  publisher: formData.get("publisher"),
                  publicationDate: formData.get("publicationDate"),
                };
                handleUpdateBook(currentBook.id, updatedBook);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={currentBook.title}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ISBN*
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    defaultValue={currentBook.isbn}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author*
                  </label>
                  <input
                    type="text"
                    name="author"
                    defaultValue={currentBook.author}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Genre*
                  </label>
                  <input
                    type="text"
                    name="genre"
                    defaultValue={currentBook.genre}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price*
                  </label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={currentBook.price}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock*
                  </label>
                  <input
                    type="number"
                    name="stock"
                    defaultValue={currentBook.stock}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <input
                    type="text"
                    name="language"
                    defaultValue={currentBook.language || "English"}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Format
                  </label>
                  <input
                    type="text"
                    name="format"
                    defaultValue={currentBook.format || "Paperback"}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publisher
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    defaultValue={currentBook.publisher || "Unknown"}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publication Date
                  </label>
                  <input
                    type="date"
                    name="publicationDate"
                    defaultValue={
                      currentBook.publicationDate?.split("T")[0] ||
                      new Date().toISOString().split("T")[0]
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => {
                    setShowEditBookModal(false);
                    setCurrentBook(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookManagement;
