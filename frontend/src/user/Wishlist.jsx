"use client";

import { Link } from "react-router-dom";
import { useBookContext } from "./context/BookContext";
import { useState } from "react";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useBookContext();
  const [activeTab, setActiveTab] = useState("all");

  const handleAddToCart = (book) => {
    addToCart(book);
    removeFromWishlist(book.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header with navigation and search would be here */}

      <div className="flex-grow w-full">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-black">My Wishlist</h1>
              <p className="text-gray-500 mt-1">Books you've saved for later</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/books"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Browse More Books
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "all"
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveTab("fiction")}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "fiction"
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Fiction
            </button>
            <button
              onClick={() => setActiveTab("nonfiction")}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === "nonfiction"
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Non-Fiction
            </button>
          </div>

          {!wishlist || wishlist.length === 0 ? (
            <div className="bg-white rounded-lg p-16 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-12 h-12 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-medium text-black mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Save your favorite books to your wishlist and come back to them
                anytime.
              </p>
              <Link
                to="/books"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium inline-block"
              >
                Discover Books
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlist &&
                  wishlist.map((book) => (
                    <div
                      key={book.id}
                      className="border rounded-lg overflow-hidden flex flex-col"
                    >
                      <div className="relative">
                        <div className="h-48 bg-gray-200">
                          {book.coverImage ? (
                            <img
                              src={book.coverImage || "/placeholder.svg"}
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              Book Image
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromWishlist(book.id)}
                          className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
                          aria-label="Remove from wishlist"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="p-5 flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-black text-lg">
                            {book.title}
                          </h3>
                          <span className="text-green-600 font-bold">
                            Rs. {book.price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          {book.author || "Unknown author"}
                        </p>

                        {book.rating && (
                          <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ${
                                  i < book.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-xs text-gray-500 ml-2">
                              ({book.reviewCount || 0} reviews)
                            </span>
                          </div>
                        )}

                        <div className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {book.description ||
                            "No description available for this book."}
                        </div>
                      </div>
                      <div className="px-5 pb-5 pt-2 border-t">
                        <button
                          onClick={() => handleAddToCart(book)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-md font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
