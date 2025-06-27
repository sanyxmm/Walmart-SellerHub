export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  sku: string;
  images: string[];
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  sales: number;
  rating: number;
  reviews: number;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customerName: string;
  shippingAddress: string;
  orderDate: Date;
  deliveryDate?: Date;
  darkStore: string;
  deliveryTime: string;
  shippingRate: number;
}

export interface DarkStore {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  capacity: number;
  currentStock: number;
  deliveryRadius: number;
  avgDeliveryTime: string;
}

export interface Analytics {
  revenue: {
    total: number;
    growth: number;
    monthly: Array<{ month: string; revenue: number; }>;
  };
  orders: {
    total: number;
    growth: number;
    pending: number;
    shipped: number;
    delivered: number;
  };
  products: {
    total: number;
    active: number;
    outOfStock: number;
    topSelling: Product[];
  };
  marketing: {
    conversionRate: number;
    avgOrderValue: number;
    customerAcquisition: number;
    returnRate: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
  criteria: string;
}

export interface Achievement {
  streak: number;
  totalSales: number;
  productsListed: number;
  badges: Badge[];
  level: number;
  xp: number;
  nextLevelXp: number;
}

export interface ChatMessage {
  id: string;
  message: string;
  type: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
  language?: string;
}