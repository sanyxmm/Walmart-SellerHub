import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  FileImage, 
  Scan, 
  CheckCircle, 
  AlertCircle,
  Package,
  DollarSign,
  Calendar,
  Trash2,
  Eye
} from 'lucide-react';

interface ScannedReceipt {
  id: string;
  image: string;
  date: Date;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    category: string;
  }>;
  total: number;
  merchant: string;
  status: 'processed' | 'processing' | 'error';
}

const OCRScanner: React.FC = () => {
  const [scannedReceipts, setScannedReceipts] = useState<ScannedReceipt[]>([
    {
      id: '1',
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg',
      date: new Date('2024-01-25'),
      items: [
        { name: 'Wireless Headphones', quantity: 2, price: 2499, category: 'Electronics' },
        { name: 'Phone Case', quantity: 1, price: 299, category: 'Accessories' },
        { name: 'USB Cable', quantity: 3, price: 199, category: 'Electronics' }
      ],
      total: 5495,
      merchant: 'TechWorld Store',
      status: 'processed'
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg',
      date: new Date('2024-01-24'),
      items: [
        { name: 'Cotton T-Shirt', quantity: 5, price: 799, category: 'Clothing' },
        { name: 'Jeans', quantity: 2, price: 1299, category: 'Clothing' }
      ],
      total: 6593,
      merchant: 'Fashion Hub',
      status: 'processed'
    }
  ]);
  
  const [isScanning, setIsScanning] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ScannedReceipt | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsScanning(true);
      
      // Simulate OCR processing
      setTimeout(() => {
        const newReceipt: ScannedReceipt = {
          id: Date.now().toString(),
          image: URL.createObjectURL(file),
          date: new Date(),
          items: [
            { name: 'Smart Watch', quantity: 1, price: 8999, category: 'Electronics' },
            { name: 'Screen Protector', quantity: 2, price: 149, category: 'Accessories' }
          ],
          total: 9297,
          merchant: 'ElectroMart',
          status: 'processed'
        };
        
        setScannedReceipts(prev => [newReceipt, ...prev]);
        setIsScanning(false);
      }, 3000);
    }
  };

  const getInsights = (receipts: ScannedReceipt[]) => {
    const totalSpent = receipts.reduce((sum, receipt) => sum + receipt.total, 0);
    const totalItems = receipts.reduce((sum, receipt) => 
      sum + receipt.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    );
    const categories = receipts.flatMap(r => r.items).reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + (item.price * item.quantity);
      return acc;
    }, {} as Record<string, number>);
    
    const topCategory = Object.entries(categories).sort(([,a], [,b]) => b - a)[0];
    
    return {
      totalSpent,
      totalItems,
      topCategory: topCategory ? { name: topCategory[0], value: topCategory[1] } : null,
      avgReceiptValue: totalSpent / receipts.length
    };
  };

  const insights = getInsights(scannedReceipts);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Receipt Scanner</h1>
        <p className="text-gray-600 mt-1">Scan and analyze receipts for inventory insights</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan New Receipt</h3>
        
        {isScanning ? (
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center bg-blue-50">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Processing Receipt...</h4>
            <p className="text-blue-700">Extracting product information using AI</p>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors duration-200">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-gray-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload Receipt Image</h4>
            <p className="text-gray-600 mb-4">Drag and drop or click to select receipt images</p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Image</span>
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2 transition-colors duration-200">
                <Camera className="w-4 h-4" />
                <span>Take Photo</span>
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Analytics Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">₹{insights.totalSpent.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Items Scanned</p>
              <p className="text-2xl font-bold text-gray-900">{insights.totalItems}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Category</p>
              <p className="text-lg font-bold text-gray-900">
                {insights.topCategory?.name || 'N/A'}
              </p>
              <p className="text-sm text-gray-500">
                ₹{insights.topCategory?.value.toLocaleString() || '0'}
              </p>
            </div>
            <Scan className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Receipt</p>
              <p className="text-2xl font-bold text-gray-900">₹{Math.round(insights.avgReceiptValue).toLocaleString()}</p>
            </div>
            <FileImage className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Scanned Receipts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Scanned Receipts</h3>
        </div>
        
        <div className="p-6">
          {scannedReceipts.length === 0 ? (
            <div className="text-center py-12">
              <FileImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No receipts scanned yet</h4>
              <p className="text-gray-600">Upload your first receipt to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scannedReceipts.map((receipt) => (
                <div key={receipt.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                    <img 
                      src={receipt.image} 
                      alt="Receipt"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{receipt.merchant}</h4>
                      <div className="flex items-center space-x-1">
                        {receipt.status === 'processed' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {receipt.date.toLocaleDateString()} • {receipt.items.length} items
                    </p>
                    
                    <div className="space-y-1 mb-3">
                      {receipt.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600 truncate">{item.name}</span>
                          <span className="font-medium">₹{item.price.toLocaleString()}</span>
                        </div>
                      ))}
                      {receipt.items.length > 2 && (
                        <p className="text-xs text-gray-500">+{receipt.items.length - 2} more items</p>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">Total</span>
                      <span className="text-lg font-bold text-gray-900">₹{receipt.total.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedReceipt(receipt)}
                        className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center space-x-1 transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Receipt Detail Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Receipt Details</h3>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={selectedReceipt.image} 
                  alt="Receipt"
                  className="w-full rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Merchant</p>
                  <p className="font-medium">{selectedReceipt.merchant}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{selectedReceipt.date.toLocaleDateString()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Items</p>
                  <div className="space-y-2">
                    {selectedReceipt.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.category} × {item.quantity}</p>
                        </div>
                        <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">Total</p>
                    <p className="text-xl font-bold text-gray-900">₹{selectedReceipt.total.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Add to Inventory
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRScanner;