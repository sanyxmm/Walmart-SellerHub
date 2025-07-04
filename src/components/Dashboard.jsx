import React, { useState } from 'react';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,
  CheckCircle,
  X,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

import { mockAnalytics, mockProducts, mockOrders } from '../data/mockData';

const Dashboard = () => {
  const [showAllOrders, setShowAllOrders] = useState(false);

  /* ---------------- Stats card config ---------------- */
  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${mockAnalytics.revenue.total.toLocaleString()}`,
      change: `▲ ${mockAnalytics.revenue.growth}%`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      chartColor: '#008000',
      chartBg: 'rgba(144, 238, 144, 0.12)',
      data: [2, 3, 2, 9, 7, 7, 4],
    },
    {
      title: 'Total Orders',
      value: mockAnalytics.orders.total.toLocaleString(),
      change: `▲ ${mockAnalytics.orders.growth}%`,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      chartColor: '#6574CD',
      chartBg: 'rgba(101, 116, 205, 0.12)',
      data: [1, 2, 1, 3, 5, 4, 7],
    },
    {
      title: 'Active Products',
      value: mockAnalytics.products.active.toString(),
      change: `▼ ${(mockAnalytics.products.total * 0.02).toFixed(1)}%`,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      chartColor: '#6B21A8',
      chartBg: 'rgba(221, 160, 221, 0.12)',
      data: [2, 3, 2, 9, 7, 7, 4],
    },
    {
      title: 'Conversion Rate',
      value: `${mockAnalytics.marketing.conversionRate}%`,
      change: '▲ 0.5%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      chartColor: '#F6993F',
      chartBg: 'rgba(246, 153, 63, 0.12)',
      data: [2, 5, 1, 3, 2, 6, 7],
    },
  ];

  const toChartData = (arr) => arr.map((v, i) => ({ x: i, y: v }));
  const recentOrders = mockOrders.slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here’s your business overview.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">All systems operational</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="relative bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>

              {/* Mini‑sparkline */}
              <div className="absolute bottom-0 inset-x-0 h-[48px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={toChartData(stat.data)}>
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke={stat.chartColor}
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div
                  className="absolute inset-0 pointer-events-none rounded-b-xl"
                  style={{ background: stat.chartBg }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Trend & Top products charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockAnalytics.revenue.monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(v) => [`₹${v.toLocaleString()}`, 'Revenue']}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAnalytics.products.topSelling}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(v) => [v, 'Sales']} />
              <Bar dataKey="sales" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent orders mini‑table */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <button
            onClick={() => setShowAllOrders(true)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View all
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              {['Order ID', 'Product', 'Customer', 'Amount', 'Status', 'Date'].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-4 font-medium text-gray-700"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="py-3 px-4 font-medium">{o.id}</td>
                <td className="py-3 px-4 text-gray-600">{o.productName}</td>
                <td className="py-3 px-4 text-gray-600">{o.customerName}</td>
                <td className="py-3 px-4 font-medium">
                  ₹{o.amount.toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      o.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : o.status === 'shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : o.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {o.orderDate.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ───────── Full‑screen “All Orders” overlay ───────── */}
      {showAllOrders && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-screen-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <button
                onClick={() => setShowAllOrders(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    {['Order ID', 'Product', 'Customer', 'Amount', 'Status', 'Date'].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left py-3 px-4 font-medium text-gray-700"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((o) => (
                    <tr key={o.id} className="border-b">
                      <td className="py-3 px-4 font-medium">{o.id}</td>
                      <td className="py-3 px-4 text-gray-600">{o.productName}</td>
                      <td className="py-3 px-4 text-gray-600">{o.customerName}</td>
                      <td className="py-3 px-4 font-medium">
                        ₹{o.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            o.status === 'delivered'
                              ? 'bg-green-100 text-green-800'
                              : o.status === 'shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : o.status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(o.orderDate).toLocaleDateString()}
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
  );
};

export default Dashboard;
