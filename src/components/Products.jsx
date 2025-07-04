import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Star,
  Package,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { mockProducts } from '../data/mockData';   // keep your mock data

const Products = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ['all', 'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog and inventory</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Products</p>
              <p className="text-2xl font-bold text-green-600">
                {products.filter((p) => p.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">
                {products.filter((p) => p.inventory < 50).length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-purple-600">
                {products.reduce((sum, p) => sum + p.sales, 0)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                <div className="flex items-center space-x-1">{getStatusIcon(product.status)}</div>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Price</span>
                  <span className="font-semibold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Stock</span>
                  <span
                    className={`font-semibold ${
                      product.inventory < 50 ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {product.inventory}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Sales</span>
                  <span className="font-semibold text-gray-900">{product.sales}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center space-x-1 transition-colors duration-200">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>

                <button className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center justify-center space-x-1 transition-colors duration-200">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>

                <button className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Products;
