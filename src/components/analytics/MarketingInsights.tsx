
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

const MarketingInsights = () => {
  // Marketing data with proper calculations
  const marketingData = {
    totalVisitors: 83245,
    totalOrders: 2847,
    totalMarketingSpend: 12500,
    totalRevenue: 125847,
    newCustomers: 1245,
    returningCustomers: 679,
  };

  // Calculated marketing metrics
  const metrics = {
    conversionRate: (marketingData.totalOrders / marketingData.totalVisitors) * 100, // CR = (Orders / Visitors) × 100
    cac: marketingData.totalMarketingSpend / marketingData.newCustomers, // CAC = Marketing Spend / New Customers
    roas: marketingData.totalRevenue / marketingData.totalMarketingSpend, // ROAS = Revenue / Ad Spend
    customerRetentionRate: (marketingData.returningCustomers / (marketingData.newCustomers + marketingData.returningCustomers)) * 100,
  };

  const customerSegmentation = [
    { segment: 'New Customers', value: marketingData.newCustomers, color: '#3B82F6' },
    { segment: 'Returning Customers', value: marketingData.returningCustomers, color: '#10B981' },
    { segment: 'VIP Customers', value: 156, color: '#F59E0B' },
  ];

  const conversionFunnel = [
    { stage: 'Visitors', count: 83245, rate: 100 },
    { stage: 'Product Views', count: 24973, rate: 30 },
    { stage: 'Add to Cart', count: 8324, rate: 10 },
    { stage: 'Checkout Started', count: 4162, rate: 5 },
    { stage: 'Orders Completed', count: 2847, rate: 3.42 },
  ];

  const channelPerformance = [
    { channel: 'Organic Search', spend: 0, revenue: 45000, orders: 1023, roas: 0 },
    { channel: 'Walmart Ads', spend: 7500, revenue: 52000, orders: 1156, roas: 6.93 },
    { channel: 'Social Media', spend: 3000, revenue: 18000, orders: 412, roas: 6.0 },
    { channel: 'Email Marketing', spend: 2000, revenue: 10847, orders: 256, roas: 5.42 },
  ];

  const weeklyConversions = [
    { week: 'Week 1', conversions: 2.8, visitors: 18500 },
    { week: 'Week 2', conversions: 3.1, visitors: 19200 },
    { week: 'Week 3', conversions: 3.4, visitors: 20100 },
    { week: 'Week 4', conversions: 3.7, visitors: 21300 },
    { week: 'Week 5', conversions: 3.2, visitors: 19800 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Key Marketing Metrics */}
      <Card className="lg:col-span-2 bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Marketing Performance Dashboard</CardTitle>
          <CardDescription>Comprehensive marketing metrics with industry-standard calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{metrics.conversionRate.toFixed(2)}%</div>
              <div className="text-sm text-gray-600 mt-1">Conversion Rate</div>
              <div className="text-xs text-gray-500 mt-2">(Orders ÷ Visitors) × 100</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">${metrics.cac.toFixed(2)}</div>
              <div className="text-sm text-gray-600 mt-1">Customer Acquisition Cost</div>
              <div className="text-xs text-gray-500 mt-2">Marketing Spend ÷ New Customers</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{metrics.roas.toFixed(2)}x</div>
              <div className="text-sm text-gray-600 mt-1">Return on Ad Spend</div>
              <div className="text-xs text-gray-500 mt-2">Revenue ÷ Ad Spend</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{metrics.customerRetentionRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-600 mt-1">Customer Retention Rate</div>
              <div className="text-xs text-gray-500 mt-2">Returning ÷ Total Customers</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Segmentation */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Customer Segmentation Analysis</CardTitle>
          <CardDescription>Distribution of customer types</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerSegmentation}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {customerSegmentation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toLocaleString()} customers`} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly Conversion Trends */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Weekly Conversion Trends</CardTitle>
          <CardDescription>Conversion rate and visitor trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyConversions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Area yAxisId="right" type="monotone" dataKey="visitors" stackId="1" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.3} name="Visitors" />
              <Line yAxisId="left" type="monotone" dataKey="conversions" stroke="#3B82F6" strokeWidth={3} name="Conversion Rate (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Channel Performance */}
      <Card className="lg:col-span-2 bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Marketing Channel Performance</CardTitle>
          <CardDescription>Revenue, spend, and ROAS by marketing channel</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={channelPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'Revenue' || name === 'Spend') {
                    return `$${value.toLocaleString()}`;
                  }
                  if (name === 'ROAS') {
                    return `${value}x`;
                  }
                  return value;
                }}
              />
              <Bar yAxisId="left" dataKey="revenue" fill="#10B981" name="Revenue" />
              <Bar yAxisId="left" dataKey="spend" fill="#EF4444" name="Spend" />
              <Bar yAxisId="right" dataKey="roas" fill="#3B82F6" name="ROAS" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card className="lg:col-span-2 bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Sales Funnel Analysis</CardTitle>
          <CardDescription>Customer journey from visitor to purchase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionFunnel.map((stage, index) => (
              <div key={stage.stage} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium text-gray-700">{stage.stage}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                    style={{ width: `${stage.rate}%` }}
                  >
                    {stage.rate.toFixed(1)}%
                  </div>
                </div>
                <div className="w-24 text-sm text-gray-600 text-right">
                  {stage.count.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">68.4%</div>
              <div className="text-xs text-gray-600">Drop-off Rate</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">34.2%</div>
              <div className="text-xs text-gray-600">Cart Conversion</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">3.42%</div>
              <div className="text-xs text-gray-600">Overall Conversion</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingInsights;
