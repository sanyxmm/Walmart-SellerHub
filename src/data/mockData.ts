import { Product, Order, DarkStore, Analytics, Badge, Achievement } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 2499,
    category: 'Electronics',
    inventory: 150,
    sku: 'WBH-001',
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-15'),
    sales: 340,
    rating: 4.5,
    reviews: 127
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking watch with heart rate monitor, GPS, and 7-day battery life.',
    price: 8999,
    category: 'Electronics',
    inventory: 75,
    sku: 'SFW-002',
    images: ['https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-10'),
    sales: 180,
    rating: 4.3,
    reviews: 89
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable organic cotton t-shirt available in multiple colors and sizes.',
    price: 799,
    category: 'Clothing',
    inventory: 200,
    sku: 'OCT-003',
    images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-20'),
    sales: 250,
    rating: 4.2,
    reviews: 156
  } ,{
    id: '4',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 2499,
    category: 'Electronics',
    inventory: 150,
    sku: 'WBH-001',
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-15'),
    sales: 340,
    rating: 4.5,
    reviews: 127
  },
  {
    id: '5',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking watch with heart rate monitor, GPS, and 7-day battery life.',
    price: 8999,
    category: 'Electronics',
    inventory: 75,
    sku: 'SFW-002',
    images: ['https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-10'),
    sales: 180,
    rating: 4.3,
    reviews: 89
  },
  {
    id: '6',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking watch with heart rate monitor, GPS, and 7-day battery life.',
    price: 8999,
    category: 'Electronics',
    inventory: 75,
    sku: 'SFW-002',
    images: ['https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-10'),
    sales: 180,
    rating: 4.3,
    reviews: 89
  },
  {
    id: '7',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable organic cotton t-shirt available in multiple colors and sizes.',
    price: 799,
    category: 'Clothing',
    inventory: 200,
    sku: 'OCT-003',
    images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'],
    status: 'active',
    createdAt: new Date('2024-01-20'),
    sales: 250,
    rating: 4.2,
    reviews: 156
  } 

];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    productId: '1',
    productName: 'Wireless Bluetooth Headphones',
    quantity: 2,
    amount: 4998,
    status: 'shipped',
    customerName: 'Arjun Sharma',
    shippingAddress: 'Mumbai, Maharashtra',
    orderDate: new Date('2024-01-25'),
    deliveryDate: new Date('2024-01-27'),
    darkStore: 'Mumbai Central',
    deliveryTime: '2-3 hours',
    shippingRate: 0
  },
  {
    id: 'ORD-002',
    productId: '2',
    productName: 'Smart Fitness Watch',
    quantity: 1,
    amount: 8999,
    status: 'processing',
    customerName: 'Priya Patel',
    shippingAddress: 'Delhi, NCR',
    orderDate: new Date('2024-01-26'),
    darkStore: 'Delhi South',
    deliveryTime: '4-6 hours',
    shippingRate: 49
  }
];

export const mockDarkStores: DarkStore[] = [
  {
    id: 'DS-001',
    name: 'Mumbai Central',
    address: 'Worli, Mumbai, Maharashtra',
    coordinates: [19.0176, 72.8561],
    capacity: 10000,
    currentStock: 8500,
    deliveryRadius: 15,
    avgDeliveryTime: '2-3 hours'
  },
  {
    id: 'DS-002',
    name: 'Delhi South',
    address: 'Saket, New Delhi',
    coordinates: [28.5244, 77.2066],
    capacity: 12000,
    currentStock: 9200,
    deliveryRadius: 20,
    avgDeliveryTime: '3-4 hours'
  },
  {
    id: 'DS-003',
    name: 'Bangalore East',
    address: 'Whitefield, Bangalore, Karnataka',
    coordinates: [12.9698, 77.7500],
    capacity: 8000,
    currentStock: 6800,
    deliveryRadius: 12,
    avgDeliveryTime: '2-4 hours'
  }
];

export const mockAnalytics: Analytics = {
  revenue: {
    total: 458300,
    growth: 23.5,
    monthly: [
      { month: 'Jan', revenue: 45000 },
      { month: 'Feb', revenue: 52000 },
      { month: 'Mar', revenue: 48000 },
      { month: 'Apr', revenue: 61000 },
      { month: 'May', revenue: 55000 },
      { month: 'Jun', revenue: 67000 },
    ]
  },
  orders: {
    total: 1847,
    growth: 18.2,
    pending: 23,
    shipped: 156,
    delivered: 1668
  },
  products: {
    total: 45,
    active: 42,
    outOfStock: 3,
    topSelling: mockProducts.slice(0, 7)
  },
  marketing: {
    conversionRate: 3.2,
    avgOrderValue: 2485,
    customerAcquisition: 15.4,
    returnRate: 2.1
  }
};

export const mockBadges: Badge[] = [
  {
    id: 'badge-1',
    name: 'First Sale',
    description: 'Made your first sale',
    icon: '🎉',
    earned: true,
    earnedDate: new Date('2024-01-15'),
    criteria: 'Complete your first order'
  },
  {
    id: 'badge-2',
    name: 'Product Master',
    description: 'Listed 10+ products',
    icon: '📦',
    earned: true,
    earnedDate: new Date('2024-01-20'),
    criteria: 'List 10 or more products'
  },
  {
    id: 'badge-3',
    name: 'Sales Champion',
    description: 'Achieved ₹100k in sales',
    icon: '🏆',
    earned: false,
    criteria: 'Reach ₹100,000 in total sales'
  }
];

export const mockAchievement: Achievement = {
  streak: 15,
  totalSales: 458300,
  productsListed: 45,
  badges: mockBadges,
  level: 7,
  xp: 2840,
  nextLevelXp: 3000
};

export const indianLanguages = [
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' }
];