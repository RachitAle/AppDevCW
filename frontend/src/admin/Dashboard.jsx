import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // Mock data for monthly orders chart
  const monthlyOrdersData = [
    { name: "Jan", orders: 65 },
    { name: "Feb", orders: 59 },
    { name: "Mar", orders: 80 },
    { name: "Apr", orders: 81 },
    { name: "May", orders: 56 },
    { name: "Jun", orders: 55 },
    { name: "Jul", orders: 60 },
    { name: "Aug", orders: 68 },
    { name: "Sep", orders: 90 },
    { name: "Oct", orders: 81 },
    { name: "Nov", orders: 75 },
    { name: "Dec", orders: 80 },
  ];

  // Mock top selling books
  const topSellingBooks = [
    { id: 1, title: "The Silent Echo" },
    { id: 2, title: "Midnight's Embrace" },
    { id: 3, title: "Lost in the Cosmos" },
    { id: 4, title: "Eternal Twilight" },
    { id: 5, title: "Whispers of the Past" },
  ];

  return (
    <div className="p-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border border-gray-300 p-5 rounded-md shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Items</h3>
          <p className="text-2xl font-bold">1,230</p>
        </div>

        <div className="border border-gray-300 p-5 rounded-md shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Orders Today</h3>
          <p className="text-2xl font-bold">21</p>
        </div>

        <div className="border border-gray-300 p-5 rounded-md shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Active Discounts
          </h3>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Orders Chart */}
        <div className="border border-gray-300 p-5 rounded-md shadow-sm">
          <h3 className="text-lg font-medium mb-4">Monthly Orders</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fill: '#4b5563' }} />
                <YAxis tick={{ fill: '#4b5563' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb' 
                  }} 
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#000000"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Books */}
        <div className="border border-gray-300 p-5 rounded-md shadow-sm">
          <h3 className="text-lg font-medium mb-4">Top Selling Books</h3>
          <ul>
            {topSellingBooks.map((book, index) => (
              <li
                key={book.id}
                className="py-3 border-b border-gray-200 last:border-0"
              >
                <div className="flex items-center">
                  <span className="font-medium mr-3 text-gray-700">{index + 1}.</span>
                  <span>{book.title}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Upcoming Expired Discount & Low Stock Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-gray-300 p-5 rounded-md shadow-sm">
          <h3 className="text-lg font-medium mb-4">
            Upcoming Expired Discount
          </h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">1. John Doe</p>
            </div>
            <div className="text-sm text-gray-600">Expires on 21 Mar 25</div>
          </div>
        </div>

        <div className="border border-gray-300 p-5 rounded-md shadow-sm">
          <h3 className="text-lg font-medium mb-4">Low Stock Alert</h3>
          <div className="flex justify-between items-center">
            <div>
              <p>Books</p>
            </div>
            <div>
              <p className="font-bold">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
