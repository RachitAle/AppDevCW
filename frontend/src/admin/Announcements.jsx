import { useState, useEffect } from "react";
import { Search, ChevronDown, Edit, Trash, Plus, X } from "lucide-react";
import axios from "axios";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 5;

  const API_BASE_URL = "https://localhost:7084/api/Admin";

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/announcements`, { timeout: 5000 });
        const fetchedAnnouncements = response.data.map((announcement) => ({
          ...announcement,
          title: announcement.message.split("\n")[0] || "Untitled",
          type: announcement.message.includes("Sale") || announcement.message.includes("Discount") ? "Deal" : announcement.message.includes("Maintenance") ? "Update" : "News",
          status: new Date(announcement.startDate) > new Date() ? "Upcoming" : new Date(announcement.endDate) < new Date() ? "Expired" : "Active",
        }));
        setAnnouncements(fetchedAnnouncements);
        setError(null);
      } catch (err) {
        setError("Failed to fetch announcements. Check API server.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleAddAnnouncement = async (announcementData) => {
    if (new Date(announcementData.startDate) >= new Date(announcementData.endDate)) {
      setError("Start date must be before end date.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/announcements`, {
        message: `${announcementData.title}\n${announcementData.message}`,
        startDate: new Date(announcementData.startDate).toISOString(),
        endDate: new Date(announcementData.endDate).toISOString(),
      });
      const newAnnouncement = {
        ...response.data,
        title: announcementData.title,
        type: announcementData.type,
        status: new Date(response.data.startDate) > new Date() ? "Upcoming" : "Active",
      };
      setAnnouncements([...announcements, newAnnouncement]);
      setShowCreateModal(false);
      setSuccessMessage("Announcement created successfully!");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/announcements/${id}`);
      setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
      setSuccessMessage("Announcement deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      (announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       announcement.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterType === "" || announcement.type === filterType)
  );

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);
  const totalPages = Math.ceil(filteredAnnouncements.length / announcementsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <button
          className="border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 rounded-md flex items-center gap-2"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} /> Create
        </button>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-6">
          <p>{successMessage}</p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}

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
          <select
            className="w-full border border-gray-300 py-2 px-4 rounded-md appearance-none"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Deal">Deal</option>
            <option value="News">News</option>
            <option value="Update">Update</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={16}
          />
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      )}

      {!loading && (
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse bg-white border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="py-3 px-4 text-left font-medium text-gray-700">ID</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Title</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Type</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Start Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">End Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAnnouncements.length > 0 ? (
                currentAnnouncements.map((announcement) => (
                  <tr key={announcement.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{announcement.id}</td>
                    <td className="py-3 px-4">{announcement.title}</td>
                    <td className="py-3 px-4">{announcement.type}</td>
                    <td className="py-3 px-4">{new Date(announcement.startDate).toISOString().split("T")[0]}</td>
                    <td className="py-3 px-4">{new Date(announcement.endDate).toISOString().split("T")[0]}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-md text-xs ${
                          announcement.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : announcement.status === "Upcoming"
                            ? "bg-blue-100 text-blue-800"
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
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    No announcements found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filteredAnnouncements.length > 0 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-gray-100 border-gray-400"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              
            </button>
          </nav>
        </div>
      )}

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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newAnnouncement = {
                  title: formData.get("title"),
                  message: formData.get("message"),
                  type: formData.get("type"),
                  startDate: formData.get("startDate"),
                  endDate: formData.get("endDate"),
                };
                handleAddAnnouncement(newAnnouncement);
              }}
            >
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={6}
                    required
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-24 text-gray-700">Type</label>
                  <div className="relative flex-1">
                    <select
                      name="type"
                      className="w-full bg-white p-3 border border-gray-300 rounded-md appearance-none"
                      defaultValue="News"
                    >
                      <option value="Deal">Deal</option>
                      <option value="News">News</option>
                      <option value="Update">Update</option>
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
                    name="startDate"
                    className="flex-1 p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-24 text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    className="flex-1 p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                    disabled={loading}
                  >
                    {loading ? "Posting..." : "Post"}
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;