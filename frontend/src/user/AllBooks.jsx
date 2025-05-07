"use client";

import { useBookContext } from "./context/BookContext";
import { Filter, ChevronDown } from "lucide-react";
import BookCard from "./components/BookCard";

const AllBooks = () => {
  const {
    loading,
    error,
    sortBy,
    setSortBy,
    selectedCategory,
    setSelectedCategory,
    getSortedBooks,
  } = useBookContext();

  const books = getSortedBooks();

  const categories = [
    "All",
    "Fiction",
    "Non-Fiction",
    "Children",
    "Science",
    "History",
    "Biography",
    "Self-Help",
  ];
  const sortOptions = [
    "Popularity",
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Book Collection</h1>

      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-green-600" />
          <span className="font-medium">Filter by:</span>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 cursor-pointer"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-3 pointer-events-none text-gray-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-3 pointer-events-none text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Book Grid */}
      {loading ? (
        <div className="text-center py-8">Loading books...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">
          Error loading books: {error}
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-8">
          No books found for the selected category.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && books.length > 0 && (
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center border rounded bg-green-600 text-white">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center border rounded hover:bg-green-100">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center border rounded hover:bg-green-100">
              3
            </button>
            <button className="w-10 h-10 flex items-center justify-center border rounded hover:bg-green-100">
              4
            </button>
            <button className="w-10 h-10 flex items-center justify-center border rounded hover:bg-green-100">
              5
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
