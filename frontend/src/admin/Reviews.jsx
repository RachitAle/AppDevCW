import { useState } from "react";
import { Search, ChevronDown, Star, Edit, Trash, X } from "lucide-react";

const Reviews = () => {
  // Mock data for reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      bookTitle: "The Silent Echo",
      memberName: "John Smith",
      rating: 5,
      date: "2025-04-15",
      status: "Approved",
    },
    {
      id: 2,
      bookTitle: "Midnight's Embrace",
      memberName: "Sarah Johnson",
      rating: 4,
      date: "2025-04-14",
      status: "Approved",
    },
    {
      id: 3,
      bookTitle: "Lost in the Cosmos",
      memberName: "Michael Brown",
      rating: 3,
      date: "2025-04-13",
      status: "Pending",
    },
    {
      id: 4,
      bookTitle: "Eternal Twilight",
      memberName: "Emily Davis",
      rating: 5,
      date: "2025-04-12",
      status: "Approved",
    },
    {
      id: 5,
      bookTitle: "Whispers of the Past",
      memberName: "David Wilson",
      rating: 2,
      date: "2025-04-11",
      status: "Rejected",
    },
    {
      id: 6,
      bookTitle: "The Silent Echo",
      memberName: "Jennifer Lee",
      rating: 4,
      date: "2025-04-10",
      status: "Approved",
    },
  ]);

  // State for review details modal
  const [selectedReview, setSelectedReview] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to show review details
  const viewReviewDetails = (review) => {
    setSelectedReview(review);
    setShowDetailsModal(true);
  };

  // Filter reviews based on search
  const filteredReviews = reviews.filter(
    (review) =>
      review.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.memberName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-3">
          <button className="border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 rounded-md transition-colors">
            Approve All
          </button>
          <button className="border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 rounded-md transition-colors">
            Reject All
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-500" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search reviews"
            className="w-full border border-gray-300 py-2 pl-10 pr-4 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="relative w-40">
            <select className="w-full border border-gray-300 py-2 px-4 rounded-md appearance-none">
              <option>All Books</option>
              <option>The Silent Echo</option>
              <option>Midnight's Embrace</option>
              <option>Lost in the Cosmos</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
          </div>
          <div className="relative w-40">
            <select className="w-full border border-gray-300 py-2 px-4 rounded-md appearance-none">
              <option>All Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={16}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                ID
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Book
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Member
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Rating
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Date
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Status
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((review) => (
              <tr
                key={review.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">{review.id}</td>
                <td className="py-3 px-4">{review.bookTitle}</td>
                <td className="py-3 px-4">{review.memberName}</td>
                <td className="py-3 px-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < review.rating ? "#000000" : "none"}
                        color={i < review.rating ? "#000000" : "#D1D5DB"}
                      />
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4">{review.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      review.status === "Approved"
                        ? "bg-gray-100 text-gray-800"
                        : review.status === "Pending"
                        ? "bg-gray-200 text-gray-600"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {review.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3">
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => viewReviewDetails(review)}
                  >
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <Edit size={18} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
            &lt;
          </button>
          <button className="px-3 py-1 border border-gray-400 bg-gray-100 rounded-md">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
            &gt;
          </button>
        </nav>
      </div>

      {/* Review Details Modal */}
      {showDetailsModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full max-w-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Review Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex">
                <div className="w-1/3 font-medium">Book:</div>
                <div>{selectedReview.bookTitle}</div>
              </div>

              <div className="flex">
                <div className="w-1/3 font-medium">Member:</div>
                <div>{selectedReview.memberName}</div>
              </div>

              <div className="flex">
                <div className="w-1/3 font-medium">Rating:</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < selectedReview.rating ? "#000000" : "none"}
                      color={i < selectedReview.rating ? "#000000" : "#D1D5DB"}
                    />
                  ))}
                </div>
              </div>

              <div className="flex">
                <div className="w-1/3 font-medium">Date:</div>
                <div>{selectedReview.date}</div>
              </div>

              <div className="flex">
                <div className="w-1/3 font-medium">Status:</div>
                <div>
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      selectedReview.status === "Approved"
                        ? "bg-gray-100 text-gray-800"
                        : selectedReview.status === "Pending"
                        ? "bg-gray-200 text-gray-600"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {selectedReview.status}
                  </span>
                </div>
              </div>

              <div>
                <div className="font-medium mb-2">Review Content:</div>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <p>
                    This book was{" "}
                    {selectedReview.rating >= 4
                      ? "amazing"
                      : selectedReview.rating >= 3
                      ? "good"
                      : "disappointing"}
                    !
                    {selectedReview.rating >= 4
                      ? " I couldn't put it down and finished it in one sitting. The characters were well-developed and the plot kept me engaged throughout."
                      : selectedReview.rating >= 3
                      ? " It had some interesting moments but overall it was just okay. The pacing was a bit slow in the middle."
                      : " I found the plot confusing and the characters underdeveloped. Would not recommend."}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                {selectedReview.status !== "Approved" && (
                  <button className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                    Approve
                  </button>
                )}
                {selectedReview.status !== "Rejected" && (
                  <button className="px-5 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-md">
                    Reject
                  </button>
                )}
                <button
                  className="px-5 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-md"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
