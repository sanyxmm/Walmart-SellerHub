import React, { useState } from 'react';
import { 
  MapPin, 
  Truck, 
  Clock, 
  Package, 
  Filter,
  Search,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { mockOrders, mockDarkStores } from '../data/mockData';
import { Order, DarkStore } from '../types';
import IndianMap from './IndianMap';
import LeafletMap from './LeafletMap';

const OrderFulfillment: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedStore, setSelectedStore] = useState<DarkStore | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = mockOrders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
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

  const getStatusColor = (status: string) => {
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

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order Fulfillment</h1>
        <p className="text-gray-600 mt-1">Manage orders and track deliveries across India</p>
      </div>

      {/* Indian Map with Dark Stores */}
     <LeafletMap/>
     {/* <IndianMap 
        darkStores={mockDarkStores}
        selectedStore={selectedStore}
        onStoreSelect={setSelectedStore}
      /> */}
      {/* Orders Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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

          {/* Order Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600">Pending</p>
                  <p className="text-xl font-bold text-yellow-700">
                    {mockOrders.filter(o => o.status === 'pending').length}
                  </p>
                </div>
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Processing</p>
                  <p className="text-xl font-bold text-blue-700">
                    {mockOrders.filter(o => o.status === 'processing').length}
                  </p>
                </div>
                <Package className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Shipped</p>
                  <p className="text-xl font-bold text-purple-700">
                    {mockOrders.filter(o => o.status === 'shipped').length}
                  </p>
                </div>
                <Truck className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Delivered</p>
                  <p className="text-xl font-bold text-green-700">
                    {mockOrders.filter(o => o.status === 'delivered').length}
                  </p>
                </div>
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Order ID</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Product</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Customer</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Dark Store</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Delivery Time</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.productName}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.customerName}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.darkStore}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.deliveryTime}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">₹{order.amount.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Product</p>
                <p className="font-medium">{selectedOrder.productName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">{selectedOrder.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Shipping Address</p>
                <p className="font-medium">{selectedOrder.shippingAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dark Store</p>
                <p className="font-medium">{selectedOrder.darkStore}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expected Delivery</p>
                <p className="font-medium">{selectedOrder.deliveryTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Shipping Rate</p>
                <p className="font-medium">₹{selectedOrder.shippingRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-lg font-bold text-gray-900">₹{selectedOrder.amount.toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(selectedOrder.status)}
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
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
      )}

      {/* Selected Store Details */}
      {selectedStore && (
        <div className="fixed bottom-4 right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200 max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">{selectedStore.name}</h4>
            <button
              onClick={() => setSelectedStore(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{selectedStore.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                {selectedStore.currentStock.toLocaleString()} / {selectedStore.capacity.toLocaleString()} items
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Avg delivery: {selectedStore.avgDeliveryTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Radius: {selectedStore.deliveryRadius}km</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(selectedStore.currentStock / selectedStore.capacity) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((selectedStore.currentStock / selectedStore.capacity) * 100)}% capacity
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFulfillment;