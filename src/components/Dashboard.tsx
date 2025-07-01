import React ,{useState} from 'react';
import { 
  TrendingUp, 
  Package,    
  ShoppingCart, 
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,X,
} from 'lucide-react';

import { mockAnalytics, mockProducts, mockOrders } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard: React.FC = () => {
  const [showAllOrders, setShowAllOrders] = useState(false);
  const stats = [
    {
      title: "Total Revenue",
      value: (mockAnalytics.revenue.total),
      change: `▲ ${mockAnalytics.revenue.growth}%`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "▼ 42.8%",
      trendColor: "text-red-500",
      chartColor: "#008000",
      chartBg: "rgba(144, 238, 144, 0.12)",
      data: [2, 3, 2, 9, 7, 7, 4],
    },
    {
      title: "Total Orders",
      value: mockAnalytics.orders.total.toLocaleString(),
      change: `▲ ${mockAnalytics.orders.growth}%`,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "▲ 57.1%",
      trendColor: "text-green-500",
      chartColor: "#6574CD",
      chartBg: "rgba(101, 116, 205, 0.12)",
      data: [1, 2, 1, 3, 5, 4, 7],
    },
    {
      title: "Active Products",
      value: mockAnalytics.products.active.toString(),
      change: `▼ ${(mockAnalytics.products.total * 0.02).toFixed(1)}%`,
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "▼ 42.8%",
      trendColor: "text-red-500",
      chartColor: "#6B21A8",
      chartBg: "rgba(221, 160, 221, 0.12)",
      data: [2, 3, 2, 9, 7, 7, 4],
    },
    {
      title: "Conversion Rate",
      value: `${mockAnalytics.marketing.conversionRate}%`,
      change: "▲ 0.5% from last month",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "8.2%",
      trendColor: "text-green-500",
      chartColor: "#F6993F",
      chartBg: "rgba(246, 153, 63, 0.12)",
      data: [2, 5, 1, 3, 2, 6, 7],
    },
  ];

  const toChartData = arr => arr.map((v, i) => ({ x: i, y: v }));

  const recentOrders = mockOrders.slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your business overview.</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">All systems operational</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[150px]">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="relative bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="absolute bottom-0 inset-x-0 h-[45px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={toChartData(stat.data)}>
                        <Line
                          type="monotone"
                          dataKey="y"
                          stroke={stat.chartColor}
                          strokeWidth={2}
                          dot={false}
                          isAnimationActive={true}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    {/* Chart background */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: stat.chartBg, zIndex: 0 }}
                    />
                  </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockAnalytics.revenue.monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAnalytics.products.topSelling}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Sales']} />
              <Bar dataKey="sales" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>

    {/* ‣ NEW onClick toggles the fullscreen overlay */}
    <button
      onClick={() => setShowAllOrders(true)}
      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
    >
      View all
    </button>
  </div>

  {/* existing mini‑table (still just 5 rows) */}
  <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.productName}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.customerName}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">₹{order.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {order.orderDate.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

{/* ─────────────────── Full‑screen “All Orders” overlay ─────────────────── */}
{showAllOrders && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 max-h-[88vh] overflow-scroll no-scrollbar h-full max-w-screen-lg w-full mx-4">
    <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
              <button
                onClick={() => setShowAllOrders(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

    {/* full table ‑ use the complete mockOrders array */}
    <div className="overflow-x-auto">
      <table className="w-full">
        {/* table head (same as before) */}
        <thead>
          <tr className=" border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-700">
              Order ID
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">
              Product
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">
              Customer
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">
              Amount
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">
              Status
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">
              Date
            </th>
          </tr>
        </thead>

        {/* body now iterates over *all* orders */}
        <tbody>
          {mockOrders.map((order) => (
            <tr key={order.id} className="border-b border-gray-100">
              <td className="py-3 px-4 text-sm font-medium text-gray-900">
                {order.id}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {order.productName}
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {order.customerName}
              </td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">
                ₹{order.amount.toLocaleString()}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  </div>
)}
    </div>
    </div>
  );
};

export default Dashboard;