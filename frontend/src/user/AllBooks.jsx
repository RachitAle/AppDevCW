import { useState, useEffect } from "react";
import { BASE_URL } from "../../lib/AuthService";
import BookCard from "./components/BookCard";


const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to format image URLs correctly

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/Admin/books`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // For debugging - log the first book's image path
        if (data.length > 0) {
          console.log("First book image path:", data[0].imageFileName);
        }
        
        setBooks(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="text-xl text-gray-600">Loading books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading books: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Book Collection</h1>
      {books.length === 0 ? (
        <p className="text-gray-600">No books available.</p>
      ) : (
        <BookGrid books={books} />
      )}
    </div>
  );
};

// BookGrid component to display the books in a grid
const BookGrid = ({ books,  }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {books.map((book) => (
        // <div 
        //   key={book.id}
        //   className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
        //   onClick={() => handleBookClick(book)}
        // >
        //   <div className="w-full h-48 mb-4">
        //     <img
        //       src={getImageUrl(book.imageFileName)}
        //       alt={book.title}
        //       className="w-full h-full object-cover rounded"
        //       onError={(e) => {
        //         console.log("Image failed to load:", book.imageFileName);
        //         e.target.onerror = null;
        //         e.target.src = '/api/placeholder/200/300';
        //       }}
        //     />
        //   </div>
        //   <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
        //   <p className="text-sm text-gray-600">by {book.author}</p>
        //   <p className="text-md text-black font-bold mt-2">${typeof book.price === 'number' ? book.price.toFixed(2) : book.price}</p>
        // </div>
        <BookCard book={book} />
      ))}
    </div>
  );
};

// Function to navigate to book details page
const handleBookClick = (book) => {
  // You can replace this with your navigation logic
  console.log("Book clicked:", book);
  window.location.href = `/bookdetails/${book.id}`;
};

export default AllBooks;