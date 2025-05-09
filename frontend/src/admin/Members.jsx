import { useState } from "react";
import { Search, ChevronDown, Edit, Trash, Plus, X } from "lucide-react";

const Members = () => {
  // Updated mock data with unique members
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Sophie Carter",
      email: "sophie.carter@example.com",
      phone: "9123456789",
      status: "Active",
      orders: 15,
      discount: "Yes",
    },
    {
      id: 2,
      name: "Liam Patel",
      email: "liam.patel@example.com",
      phone: "9234567890",
      status: "Inactive",
      orders: 8,
      discount: "No",
    },
    {
      id: 3,
      name: "Ava Nguyen",
      email: "ava.nguyen@example.com",
      phone: "9345678901",
      status: "Active",
      orders: 22,
      discount: "Yes",
    },
    {
      id: 4,
      name: "Noah Kim",
      email: "noah.kim@example.com",
      phone: "9456789012",
      status: "Active",
      orders: 5,
      discount: "No",
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      email: "emma.rodriguez@example.com",
      phone: "9567890123",
      status: "Inactive",
      orders: 18,
      discount: "Yes",
    },
    {
      id: 6,
      name: "James Wong",
      email: "james.wong@example.com",
      phone: "9678901234",
      status: "Active",
      orders: 12,
      discount: "Yes",
    },
    {
      id: 7,
      name: "Isabella Lopez",
      email: "isabella.lopez@example.com",
      phone: "9789012345",
      status: "Active",
      orders: 25,
      discount: "No",
    },
    {
      id: 8,
      name: "Ethan Brown",
      email: "ethan.brown@example.com",
      phone: "9890123456",
      status: "Active",
      orders: 9,
      discount: "Yes",
    },
    {
      id: 9,
      name: "Mia Davis",
      email: "mia.davis@example.com",
      phone: "9901234567",
      status: "Inactive",
      orders: 30,
      discount: "Yes",
    },
  ]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter members based on search
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <button
          className="border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 rounded-md transition-colors flex items-center gap-2"
          onClick={() => setShowAnnounceModal(true)}
        >
          <Plus size={18} /> Announce
        </button>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-500" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search members"
            className="w-full border border-gray-300 py-2 pl-10 pr-4 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-40">
          <select className="w-full border border-gray-300 py-2 px-4 rounded-md appearance-none">
            <option>Sort</option>
            <option>Name A-Z</option>
            <option>Name Z-A</option>
            <option>Status</option>
            <option>Orders</option>
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
                Name
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Email
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Phone No
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Status
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Orders
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Discount
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr
                key={member.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">{member.id}</td>
                <td className="py-3 px-4">{member.name}</td>
                <td className="py-3 px-4">{member.email}</td>
                <td className="py-3 px-4">{member.phone}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      member.status === "Active"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="py-3 px-4">{member.orders}</td>
                <td className="py-3 px-4">{member.discount}</td>
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
            
          </button>
          <button className="px-3 py-1 border border-gray-400 bg-gray-100 rounded-md">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
            4
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
            
          </button>
        </nav>
      </div>

      {/* Announcement Modal */}
      {showAnnounceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full max-w-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create Announcement</h2>
              <button
                onClick={() => setShowAnnounceModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <textarea
                  placeholder="Message"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={8}
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
                  onClick={() => setShowAnnounceModal(false)}
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

export default Members;