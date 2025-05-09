import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [announcements] = useState([
    {
      id: 1,
      title: "📢 Summer Sale - Up to 75% Off!",
      date: "2025-05-01",
      link: "/books",
    },
    {
      id: 2,
      title: "📅 Author Event This Week!",
      date: "2025-05-10",
      link: "/events",
    },
    {
      id: 3,
      title: "🆕 New Fiction Arrivals",
      date: "2025-05-05",
      link: "/new-arrivals",
    },
  ]);

  const featuredBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: "12.99",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1738790966i/4671.jpg",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: "10.49",
      imageUrl:
        "https://grey.com.np/cdn/shop/products/book-cover-To-Kill-a-Mockingbird-many-1961.webp?v=1669894816&width=990",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      price: "9.99",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmuC2wguE1kHMoqAFhm_YRdtiPmHZdyqi4Hg&s",
    },
    {
      id: 4,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      price: "14.99",
      imageUrl:
        "https://m.media-amazon.com/images/I/71a+5TjuYDL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 5,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: "8.99",
      imageUrl:
        "https://www.faber.co.uk/wp-content/uploads/2022/09/Pride-and-Prejudice-529x815.jpg",
    },
    {
      id: 6,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      price: "11.99",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbx4VXBiZRM11hSqJRrC7f1HLQrCUkgMY8g&s",
    },
    {
      id: 7,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: "13.49",
      imageUrl:
        "https://media.thuprai.com/front_covers/the-alchemist-pr4uo0w3.jpg",
    },
  ];

  return (
    <>
      {/* Compact Announcements Bar */}
      <div className="bg-green-50 border-b border-green-200">
        <div className="container mx-auto px-4 py-2 overflow-x-auto whitespace-nowrap flex gap-6 text-sm text-green-800 font-medium">
          {announcements.map((item) => (
            <Link key={item.id} to={item.link} className="hover:underline">
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="h-48 flex items-center justify-center text-3xl font-bold border-b bg-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Upto 75% Off</h2>
          <Link
            to="/books"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium inline-block"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Books */}
      <section className="py-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Featured Books</h2>
          <Link
            to="/books"
            className="text-green-600 hover:text-green-700 font-medium text-sm"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={book.imageUrl}
                alt={book.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-black">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{book.author}</p>
                  <p className="text-black font-bold">${book.price}</p>
                </div>
                <Link
                  to="/bookdetails"
                  state={{ book }} // Pass the book data via state
                  className="mt-3 text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/books"
            className="bg-green-600 text-white px-6 py-2 font-medium rounded hover:bg-green-700 inline-block"
          >
            View more Books
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;