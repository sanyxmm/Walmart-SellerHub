import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const FinancialMetrics = () => {
  // Sample data with calculated values using proper formulas
  const financialData = {
    totalRevenue: 125847,
    totalCOGS: 75508, // Cost of Goods Sold
    totalOrders: 2847,
    uniqueCustomers: 1924,
    totalInventoryValue: 45000,
    averageInventoryValue: 42500,
    inventoryTurnover: 8.5, // COGS / Average Inventory
  };

  // Calculated metrics using proper formulas
  const metrics = {
    gmv: financialData.totalRevenue, // GMV = Total Revenue
    grossProfit: financialData.totalRevenue - financialData.totalCOGS, // Gross Profit = Revenue - COGS
    grossProfitMargin: ((financialData.totalRevenue - financialData.totalCOGS) / financialData.totalRevenue) * 100,
    aov: financialData.totalRevenue / financialData.totalOrders, // AOV = Total Revenue / Number of Orders
    clv: (financialData.totalRevenue / financialData.uniqueCustomers) * 2.5, // CLV = (Revenue per Customer) * Average Customer Lifespan
    ipi: (financialData.inventoryTurnover * ((financialData.totalRevenue - financialData.totalCOGS) / financialData.totalRevenue) * 100) / 100, // IPI = (Inventory Turnover * Gross Margin) / 100
  };

  const profitBreakdown = [
    { name: 'Gross Profit', value: metrics.grossProfit, color: '#10B981' },
    { name: 'COGS', value: financialData.totalCOGS, color: '#EF4444' },
  ];

  const monthlyTrends = [
    { month: 'Jan', gmv: 98000, profit: 28000 },
    { month: 'Feb', gmv: 105000, profit: 32000 },
    { month: 'Mar', gmv: 112000, profit: 35000 },
    { month: 'Apr', gmv: 118000, profit: 38000 },
    { month: 'May', gmv: 125847, profit: 50339 },
  ];

  const categoryPerformance = [
    { category: 'Electronics', revenue: 45000, margin: 22 },
    { category: 'Home & Garden', revenue: 32000, margin: 35 },
    { category: 'Clothing', revenue: 28000, margin: 45 },
    { category: 'Sports', revenue: 20847, margin: 38 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Key Financial Metrics */}
      <Card className="lg:col-span-2 bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Key Financial Metrics</CardTitle>
          <CardDescription>Core performance indicators calculated with industry-standard formulas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">${metrics.gmv.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Gross Merchandise Value</div>
              <div className="text-xs text-gray-500 mt-2">Total Revenue Generated</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">${metrics.grossProfit.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Gross Profit</div>
              <div className="text-xs text-gray-500 mt-2">Revenue - COGS</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">${metrics.aov.toFixed(2)}</div>
              <div className="text-sm text-gray-600 mt-1">Avg Order Value</div>
              <div className="text-xs text-gray-500 mt-2">Revenue ÷ Orders</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">${metrics.clv.toFixed(2)}</div>
              <div className="text-sm text-gray-600 mt-1">Customer Lifetime Value</div>
              <div className="text-xs text-gray-500 mt-2">(Revenue/Customers) × Lifespan</div>
            </div>
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">{metrics.ipi.toFixed(2)}</div>
              <div className="text-sm text-gray-600 mt-1">Inventory Performance Index</div>
              <div className="text-xs text-gray-500 mt-2">(Turnover × Margin) ÷ 100</div>
            </div>
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">{metrics.grossProfitMargin.toFixed(1)}%</div>
              <div className="text-sm text-gray-600 mt-1">Gross Profit Margin</div>
              <div className="text-xs text-gray-500 mt-2">(Profit ÷ Revenue) × 100</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profit Breakdown Pie Chart */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
          <CardDescription>Distribution of revenue vs costs</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={profitBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {profitBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Monthly Performance Trends</CardTitle>
          <CardDescription>GMV and profit evolution over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="gmv" stroke="#3B82F6" strokeWidth={3} name="GMV" />
              <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card className="lg:col-span-2 bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Category Performance Analysis</CardTitle>
          <CardDescription>Revenue and margin by product category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
              <Bar yAxisId="right" dataKey="margin" fill="#10B981" name="Margin (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialMetrics;
