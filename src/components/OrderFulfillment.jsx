import React, { useState } from 'react';
import {
  MapPin,
  Truck,
  Clock,
  Package,
  Search,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import { mockOrders, mockDarkStores } from '../data/mockData';
import LeafletMap from './LeafletMap';
// import IndianMap from './IndianMap'; // optional alternate map

const OrderFulfillment = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  /* ---------- helpers ---------- */
  const filteredOrders = mockOrders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  /* ---------- render ---------- */
  return (
    <div className="p-6 space-y-6">
      {/* ---- Page header ---- */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order Fulfillment</h1>
        <p className="text-gray-600 mt-1">Manage orders and track deliveries across India</p>
      </div>

      {/* ---- Map ---- */}
      <LeafletMap />
      {/* <IndianMap
        darkStores={mockDarkStores}
        selectedStore={selectedStore}
        onStoreSelect={setSelectedStore}
      /> */}

      {/* ---- Orders card ---- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* --- Toolbar --- */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* --- Stat tiles --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatTile
              color="yellow"
              label="Pending"
              count={mockOrders.filter((o) => o.status === 'pending').length}
              Icon={Clock}
            />
            <StatTile
              color="blue"
              label="Processing"
              count={mockOrders.filter((o) => o.status === 'processing').length}
              Icon={Package}
            />
            <StatTile
              color="purple"
              label="Shipped"
              count={mockOrders.filter((o) => o.status === 'shipped').length}
              Icon={Truck}
            />
            <StatTile
              color="green"
              label="Delivered"
              count={mockOrders.filter((o) => o.status === 'delivered').length}
              Icon={CheckCircle}
            />
          </div>
        </div>

        {/* --- Orders table --- */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {[
                  'Order ID',
                  'Product',
                  'Customer',
                  'Dark Store',
                  'Delivery Time',
                  'Amount',
                  'Status',
                  'Actions',
                ].map((h) => (
                  <th key={h} className="text-left py-3 px-6 font-medium text-gray-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.productName}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.customerName}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.darkStore}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.deliveryTime}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    ₹{order.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---- Order modal ---- */}
      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}

      {/* ---- Selected store details ---- */}
      {selectedStore && (
        <StoreCard store={selectedStore} onClose={() => setSelectedStore(null)} />
      )}
    </div>
  );
};

/* ---------- helper components ---------- */
const StatTile = ({ color, label, count, Icon }) => (
  <div className={`bg-${color}-50 rounded-lg p-4`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-sm text-${color}-600`}>{label}</p>
        <p className={`text-xl font-bold text-${color}-700`}>{count}</p>
      </div>
      <Icon className={`w-6 h-6 text-${color}-500`} />
    </div>
  </div>
);

const OrderModal = ({ order, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <XCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {[
          ['Order ID', order.id],
          ['Product', order.productName],
          ['Customer', order.customerName],
          ['Shipping Address', order.shippingAddress],
          ['Dark Store', order.darkStore],
          ['Expected Delivery', order.deliveryTime],
          ['Shipping Rate', `₹${order.shippingRate}`],
          ['Total Amount', `₹${order.amount.toLocaleString()}`],
        ].map(([label, value]) => (
          <DetailRow key={label} label={label} value={value} />
        ))}

        <div className="flex items-center space-x-2">
          <StatusIcon status={order.status} />
          <span
            className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </div>
      </div>

      <div className="mt-6 flex space-x-3">
        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Track Order
        </button>
        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          Update Status
        </button>
      </div>
    </div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'shipped':
      return <Truck className="w-4 h-4 text-blue-500" />;
    case 'processing':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-gray-500" />;
  }
};

const StoreCard = ({ store, onClose }) => (
  <div className="fixed bottom-4 right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200 max-w-sm">
    <div className="flex items-center justify-between mb-3">
      <h4 className="font-semibold text-gray-900">{store.name}</h4>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        ×
      </button>
    </div>

    <div className="space-y-2 text-sm">
      <InfoRow Icon={MapPin} text={store.address} />
      <InfoRow
        Icon={Package}
        text={`${store.currentStock.toLocaleString()} / ${store.capacity.toLocaleString()} items`}
      />
      <InfoRow Icon={Clock} text={`Avg delivery: ${store.avgDeliveryTime}`} />
      <InfoRow Icon={Truck} text={`Radius: ${store.deliveryRadius}km`} />
    </div>

    <div className="mt-3">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${(store.currentStock / store.capacity) * 100}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {Math.round((store.currentStock / store.capacity) * 100)}% capacity
      </p>
    </div>
  </div>
);

const InfoRow = ({ Icon, text }) => (
  <div className="flex items-center space-x-2">
    <Icon className="w-4 h-4 text-gray-500" />
    <span className="text-gray-600">{text}</span>
  </div>
);

export default OrderFulfillment;
