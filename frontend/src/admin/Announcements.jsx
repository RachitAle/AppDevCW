import { useState } from "react";
import { Search, ChevronDown, Edit, Trash, Plus, X } from "lucide-react";

const Announcements = () => {
  // Mock data for announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Summer Sale",
      type: "Deal",
      startDate: "2025-05-01",
      endDate: "2025-05-31",
      status: "Active",
    },
    {
      id: 2,
      title: "New Books Arrival",
      type: "News",
      startDate: "2025-04-15",
      endDate: "2025-04-30",
      status: "Active",
    },
    {
      id: 3,
      title: "Membership Discount",
      type: "Deal",
      startDate: "2025-04-01",
      endDate: "2025-06-30",
      status: "Active",
    },
    {
      id: 4,
      title: "Website Maintenance",
      type: "Update",
      startDate: "2025-04-20",
      endDate: "2025-04-21",
      status: "Upcoming",
    },
    {
      id: 5,
      title: "Holiday Hours",
      type: "News",
      startDate: "2025-05-25",
      endDate: "2025-05-27",
      status: "Upcoming",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter announcements based on search
  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <button
          className="border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 rounded-md transition-colors flex items-center gap-2"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} /> Create
        </button>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-500" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search announcements"
            className="w-full border border-gray-300 py-2 pl-10 pr-4 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-40">
          <select className="w-full border border-gray-300 py-2 px-4 rounded-md appearance-none">
            <option>All Types</option>
            <option>Deal</option>
            <option>News</option>
            <option>Update</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={16}
          />
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
                Title
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Type
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Start Date
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                End Date
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
            {filteredAnnouncements.map((announcement) => (
              <tr
                key={announcement.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">{announcement.id}</td>
                <td className="py-3 px-4">{announcement.title}</td>
                <td className="py-3 px-4">{announcement.type}</td>
                <td className="py-3 px-4">{announcement.startDate}</td>
                <td className="py-3 px-4">{announcement.endDate}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      announcement.status === "Active"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {announcement.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3">
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

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full max-w-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create Announcement</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <textarea
                  placeholder="Message"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={6}
                ></textarea>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-24 text-gray-700">Type</label>
                <div className="relative flex-1">
                  <select className="w-full bg-white p-3 border border-gray-300 rounded-md appearance-none">
                    <option>Deal</option>
                    <option>News</option>
                    <option>Update</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-24 text-gray-700">Start Date</label>
                <input
                  type="date"
                  className="flex-1 p-3 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-24 text-gray-700">End Date</label>
                <input
                  type="date"
                  className="flex-1 p-3 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <button className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                  Post
                </button>
                <button
                  className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
