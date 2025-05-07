"use client";

import { useParams, Link } from "react-router-dom";
import { useBookContext } from "./context/BookContext";
import { ArrowLeft, ShoppingCart } from "lucide-react";

const BookDetail = () => {
  const { id } = useParams();
  const { getBookById, loading, error } = useBookContext();

  const book = getBookById(Number.parseInt(id));

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        Loading book details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-red-500">
        Error loading book: {error}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Book not found</h2>
        <p className="mb-6">
          The book you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/books"
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Browse all books
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        to="/books"
        className="flex items-center text-green-600 hover:text-green-700 mb-8"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Books
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Book Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-md h-[500px] bg-gray-200 overflow-hidden rounded-lg shadow-md">
            {book.imageUrl ? (
              <img
                src={book.imageUrl || "/placeholder.svg"}
                alt={book.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/book-placeholder.jpg";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-green-100 to-green-200" />
            )}
          </div>
        </div>

        {/* Book Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-4">by {book.author}</p>

          <div className="mb-6">
            <span className="text-2xl font-bold text-green-600">
              ${book.price.toFixed(2)}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{book.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="font-semibold text-gray-600">Category</h3>
              <p>{book.category}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-600">Published Date</h3>
              <p>{new Date(book.publishedDate).toLocaleDateString()}</p>
            </div>
          </div>

          <button className="w-full md:w-auto bg-green-600 text-white py-3 px-8 rounded font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;