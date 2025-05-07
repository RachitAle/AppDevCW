import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="border rounded shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/books/${book.id}`}>
        <div className="w-full h-48 bg-gray-200 overflow-hidden">
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
            <div
              className={`w-full h-full bg-gradient-to-r from-green-100 to-green-200`}
            />
          )}
        </div>
      </Link>
      <div className="p-3">
        <Link to={`/books/${book.id}`}>
          <h3 className="font-semibold text-sm line-clamp-2 h-10 hover:text-green-600">
            {book.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-600 mb-1">{book.author}</p>
        <div className="text-sm text-black font-medium mb-2">
          ${book.price.toFixed(2)}
        </div>
        <button className="w-full bg-green-600 text-white py-1 rounded text-sm hover:bg-green-700 transition-colors">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;