import { useLocation } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const book = location.state?.book; // Get the book data passed from BookDetail

  return (
    <div className="p-8">
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* Display the book details */}
      {book ? (
        <div className="flex items-center gap-6 mb-6">
          {/* Book Image */}
          <div className="w-32 h-48 overflow-hidden rounded-lg shadow-lg">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Book Details */}
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-900">{book.title}</h2>
            <p className="text-gray-700">by {book.author}</p>
            <p className="text-lg font-semibold text-green-800">${book.price}</p>
          </div>
        </div>
      ) : (
        <p>Your cart is empty. Start shopping now!</p>
      )}
    </div>
  );
};

export default Cart;
