// "use client";

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
  const [successMessage, setSuccessMessage] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const booksPerPage = 9;

  const API_BASE_URL = "https://localhost:7084/api/Admin";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/books`, { timeout: 5000 });
        setBooks(response.data);
        console.log("response from the fetch", response)
        setError(null);
      } catch (err) {
        setError("Failed to fetch books. Check API server.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const validateISBN = (isbn) => {
    return /^\d{13}$/.test(isbn);
  };

  const handleAddBook = async (formData) => {
    const isbn = formData.get("isbn");
    if (!validateISBN(isbn)) {
      setError("ISBN must be exactly 13 digits.");
      return;
    }
    const image = formData.get("image");
    if (image && image.size > 0) {
      if (!["image/jpeg", "image/png"].includes(image.type)) {
        setError("Only JPG and PNG images are allowed.");
        return;
      }
      if (image.size > 5 * 1024 * 1024) {
        setError("Image size exceeds 5MB.");
        return;
      }
    }
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/books`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setBooks([...books, response.data]);
      setShowAddBookModal(false);
      setSuccessMessage("Book added successfully!");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBook = async (id, formData) => {
    const isbn = formData.get("isbn");
    if (!validateISBN(isbn)) {
      setError("ISBN must be exactly 13 digits.");
      return;
    }
    const image = formData.get("image");
    if (image && image.size > 0) {
      if (!["image/jpeg", "image/png"].includes(image.type)) {
        setError("Only JPG and PNG images are allowed.");
        return;
      }
      if (image.size > 5 * 1024 * 1024) {
        setError("Image size exceeds 5MB.");
        return;
      }
    }
    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/books/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setBooks(books.map((book) => (book.id === id ? { ...book, ...Object.fromEntries(formData), id } : book)));
      setShowEditBookModal(false);
      setCurrentBook(null);
      setSuccessMessage("Book updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
      setSuccessMessage("Book deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (book) => {
    setCurrentBook(book);
    setShowEditBookModal(true);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    const sortedBooks = [...books].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setBooks(sortedBooks);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  console.log("This is book onjecy " , books)
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <button
          className="border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowAddBookModal(true)}
        >
          <Plus size={18} /> Add Book
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
          <select
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 appearance-none"
            onChange={(e) => handleSort(e.target.value)}
            value={sortField}
          >
            <option value="">Sort</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="price">Price</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      )}

      {!loading && (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="py-3 px-4 text-left font-medium text-gray-700">Image</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Title</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">ISBN</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Author</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Genre</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Price</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Stock</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.length > 0 ? (
                currentBooks.map((book) => (
                  <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {book.imageFileName ? (
                        <img
                          src={`https://localhost:7084${book.imageFileName}`}
                          alt={book.title}
                          className="w-12 h-12 object-cover rounded"
                          // onError={(e) => (e.target.src = "/path/to/placeholder-image.jpg")} // Fallback image
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="py-3 px-4">{book.title}</td>
                    <td className="py-3 px-4">{book.isbn}</td>
                    <td className="py-3 px-4">{book.author}</td>
                    <td className="py-3 px-4">{book.genre}</td>
                    <td className="py-3 px-4">{book.price}</td>
                    <td className="py-3 px-4">{book.stock || 0}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-3">
                        <button className="text-gray-600 hover:text-gray-900" onClick={() => openEditModal(book)}>
                          <Edit size={18} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" onClick={() => handleDeleteBook(book.id)}>
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-500">
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filteredBooks.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            className="mx-1 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 border rounded-md ${
                currentPage === index + 1 ? "bg-gray-100 border-gray-400" : "border-gray-300 hover:bg-gray-50"
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
            Next
          </button>
        </div>
      )}

      {showAddBookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add New Book</h2>
              <button onClick={() => setShowAddBookModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleAddBook(formData);
              }}
              encType="multipart/form-data"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                  <input type="text" name="title" className="w-full p-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ISBN*</label>
                  <input
                    type="text"
                    name="isbn"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    pattern="\d{13}"
                    title="ISBN must be exactly 13 digits"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author*</label>
                  <input type="text" name="author" className="w-full p-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre*</label>
                  <input type="text" name="genre" className="w-full p-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Stock*</label>
                  <input type="number" name="initialStock" className="w-full p-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input
                    type="file"
                    name="ImageFile"
                    accept="image/jpeg,image/png"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <input
                    type="text"
                    name="language"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue="English"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                  <input
                    type="text"
                    name="format"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue="Paperback"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                  <input type="text" name="publisher" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publication Date</label>
                  <input type="date" name="publicationDate" className="w-full p-2 border border-gray-300 rounded-md" />
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
                handleUpdateBook(currentBook.id, formData);
              }}
              encType="multipart/form-data"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={currentBook.title}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ISBN*</label>
                  <input
                    type="text"
                    name="isbn"
                    defaultValue={currentBook.isbn}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    pattern="\d{13}"
                    title="ISBN must be exactly 13 digits"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author*</label>
                  <input
                    type="text"
                    name="author"
                    defaultValue={currentBook.author}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre*</label>
                  <input
                    type="text"
                    name="genre"
                    defaultValue={currentBook.genre}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={currentBook.price}
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/jpeg,image/png"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {currentBook.imageUrl && (
                    <img
                      src={`https://localhost:7084${currentBook.imageUrl}`}
                      alt="Current book"
                      className="w-16 h-16 object-cover mt-2 rounded"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <input
                    type="text"
                    name="language"
                    defaultValue={currentBook.language || "English"}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                  <input
                    type="text"
                    name="format"
                    defaultValue={currentBook.format || "Paperback"}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                  <input
                    type="text"
                    name="publisher"
                    defaultValue={currentBook.publisher || ""}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publication Date</label>
                  <input
                    type="date"
                    name="publicationDate"
                    defaultValue={currentBook.publicationDate?.split("T")[0] || ""}
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