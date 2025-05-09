import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BookDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const handleAddToCart = () => {
    setCart([...cart, book]);
    navigate("/cart", { state: { successMessage: "Book added to cart!" } });
  };

  const handleAddToWishlist = () => {
    setWishlist([...wishlist, book]);
    navigate("/wishlist", { state: { successMessage: "Book added to wishlist!" } });
  };

  if (!book) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 font-semibold text-xl">No book selected.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-center">
        {/* Book Image */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        {/* Book Details */}
        <div className="flex flex-col md:w-1/2 lg:w-2/3 xl:w-2/3 justify-start gap-6 mt-8 md:mt-0">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-700 mb-4">by {book.author}</p>
            <p className="text-3xl font-semibold text-green-800 mb-6">${book.price}</p>
          </div>
          <div className="flex gap-6">
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition-all duration-200"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition-all duration-200"
            >
              Bookmark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
