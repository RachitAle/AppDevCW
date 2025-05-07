import { Link } from "react-router-dom";
import { useBookContext } from "./context/BookContext";
import BookCard from "./components/BookCard";

const Home = () => {
  const { getFeaturedBooks, loading, error } = useBookContext();
  const featuredBooks = getFeaturedBooks();

  return (
    <>
      {/* Categories */}
      <div className="flex justify-around py-6 border-b overflow-x-auto">
        {[
          "Best Seller",
          "Award winner",
          "New Release",
          "Coming soon",
          "Discounts",
          "New Arrivals",
        ].map((label) => (
          <div key={label} className="flex flex-col items-center min-w-[100px]">
            <div className="w-12 h-12 bg-green-100 rounded-full mb-2 flex items-center justify-center">
              <div className="w-8 h-8 bg-green-600 rounded-full" />
            </div>
            <span className="text-center font-medium text-black">{label}</span>
          </div>
        ))}
      </div>

      {/* Image Section */}
      <div className="h-64 flex items-center justify-center text-3xl font-bold border-b bg-gray-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black mb-4">Upto 75% Off</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
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

          <div className="flex items-center gap-2">
            <Link
              to="/books"
              className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
            >
              View All
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading books...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            Error loading books: {error}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

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