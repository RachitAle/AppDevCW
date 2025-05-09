import { Link } from "react-router-dom";
import { BASE_URL } from "../../../lib/AuthService";
 const getImageUrl = (imagePath) => {
  if (!imagePath) return '/api/placeholder/200/300';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // For paths like "/uploads/images/filename.png"
  // We need to prepend the BASE_URL but not duplicate the slash
  return `${BASE_URL}${imagePath}`;
};

const BookCard = ({ book, }) => {
  return (
    <div className="border rounded shadow-sm hover:shadow-md transition-shadow">
    
      <Link to={`/books/${book.id}`}>
        <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
          {book.imageFileName ? (
      
            <img
              src={getImageUrl(book.imageFileName)}
              alt={book.title}
              className="w-full h-full object-contain absolute inset-0"
              // onError={(e) => {
              //   e.target.onerror = null;
              //   e.target.src = "/images/book-placeholder.jpg";
              // }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Image Available</span>
            </div>
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