"use client";

import { Link } from "react-router-dom";
import { useBookContext } from "./context/BookContext";
import BookCard from "./components/BookCard";
import { useState, useEffect } from "react";

const Home = () => {
  const { getFeaturedBooks, loading, error } = useBookContext();
  const featuredBooks = getFeaturedBooks();

  const [announcements, setAnnouncements] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);
  const [announcementsError, setAnnouncementsError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setAnnouncementsLoading(true);
        const response = await fetch("/api/announcements");
        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }
        const data = await response.json();
        setAnnouncements(data);
        setAnnouncementsError(null);
      } catch (err) {
        console.error("Error fetching announcements:", err);
        setAnnouncementsError(err.message);
      } finally {
        setAnnouncementsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <>
      {/* Announcements Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-black">Announcements</h2>
            {announcements.length > 0 && (
              <span className="text-sm text-gray-500">
                {announcements.length} announcements
              </span>
            )}
          </div>

          {announcementsLoading ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="animate-pulse flex justify-center">
                <div className="h-4 w-4 bg-green-600 rounded-full mr-1"></div>
                <div className="h-4 w-4 bg-green-600 rounded-full mr-1 animate-pulse delay-100"></div>
                <div className="h-4 w-4 bg-green-600 rounded-full animate-pulse delay-200"></div>
              </div>
              <p className="text-gray-500 mt-2">Loading announcements...</p>
            </div>
          ) : announcementsError ? (
            <div className="bg-red-50 rounded-lg p-6 text-center">
              <p className="text-red-500">
                Error loading announcements: {announcementsError}
              </p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-500">
                No announcements available at this time.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-black mb-1">
                        {announcement.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {announcement.content}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {new Date(announcement.date).toLocaleDateString()}
                        </span>
                        {announcement.link && (
                          <Link
                            to={announcement.link}
                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                          >
                            Learn more
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Section */}
      <div className="h-64 flex items-center justify-center text-3xl font-bold border-b bg-gray-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black mb-4">Upto 75% Off</h2>
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
