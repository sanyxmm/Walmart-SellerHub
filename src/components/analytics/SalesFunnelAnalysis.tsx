
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, Cell, LineChart, Line } from 'recharts';

const SalesFunnelAnalysis = () => {
  const funnelData = [
    { stage: 'Website Visitors', count: 83245, rate: 100, color: '#3B82F6' },
    { stage: 'Product Page Views', count: 24973, rate: 30.0, color: '#6366F1' },
    { stage: 'Add to Cart', count: 8324, rate: 10.0, color: '#8B5CF6' },
    { stage: 'Checkout Initiated', count: 4162, rate: 5.0, color: '#A855F7' },
    { stage: 'Payment Started', count: 3330, rate: 4.0, color: '#C084FC' },
    { stage: 'Order Completed', count: 2847, rate: 3.42, color: '#10B981' },
  ];

  const conversionRates = funnelData.map((stage, index) => ({
    ...stage,
    dropoffRate: index > 0 ? ((funnelData[index - 1].count - stage.count) / funnelData[index - 1].count) * 100 : 0,
    conversionFromPrevious: index > 0 ? (stage.count / funnelData[index - 1].count) * 100 : 100,
  }));

  const weeklyFunnelPerformance = [
    { week: 'W1', visitors: 18500, conversions: 518, rate: 2.8 },
    { week: 'W2', visitors: 19200, conversions: 595, rate: 3.1 },
    { week: 'W3', visitors: 20100, conversions: 683, rate: 3.4 },
    { week: 'W4', visitors: 21300, conversions: 788, rate: 3.7 },
    { week: 'W5', visitors: 19800, conversions: 634, rate: 3.2 },
  ];

  const devicePerformance = [
    { device: 'Desktop', visitors: 33298, conversions: 1423, rate: 4.27 },
    { device: 'Mobile', visitors: 41622, conversions: 1174, rate: 2.82 },
    { device: 'Tablet', users: 8325, conversions: 250, rate: 3.00 },
  ];

  const trafficSources = [
    { source: 'Organic Search', visitors: 29134, conversions: 1251, rate: 4.29, quality: 'High' },
    { source: 'Walmart Ads', visitors: 20811, conversions: 1139, rate: 5.47, quality: 'High' },
    { source: 'Social Media', visitors: 16649, conversions: 291, rate: 1.75, quality: 'Low' },
    { source: 'Direct', visitors: 12487, conversions: 112, rate: 0.90, quality: 'Low' },
    { source: 'Email', visitors: 4164, conversions: 54, rate: 1.30, quality: 'Medium' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Main Funnel Visualization */}
      <Card className="lg:col-span-2 bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Sales Funnel Analysis</CardTitle>
          <CardDescription>Complete customer journey from awareness to purchase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionRates.map((stage, index) => (
              <div key={stage.stage} className="relative">
                <div className="flex items-center space-x-4">
                  <div className="w-36 text-sm font-medium text-gray-700">{stage.stage}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-12 relative overflow-hidden">
                    <div 
                      className="h-12 rounded-full flex items-center justify-between px-4 text-white text-sm font-medium transition-all duration-500"
                      style={{ 
                        width: `${Math.max(stage.rate, 5)}%`,
                        backgroundColor: stage.color,
                        background: `linear-gradient(90deg, ${stage.color}, ${stage.color}dd)` 
                      }}
                    >
                      <span>{stage.rate.toFixed(1)}%</span>
                      <span className="text-right">{stage.count.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-20 text-right">
                    {index > 0 && (
                      <div className="text-xs text-red-600">
                        -{stage.dropoffRate.toFixed(1)}%
                      </div>
                    )}
                  </div>
                </div>
                {index < conversionRates.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="w-px h-4 bg-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Funnel Summary Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">3.42%</div>
              <div className="text-xs text-gray-600">Overall Conversion</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">96.58%</div>
              <div className="text-xs text-gray-600">Total Drop-off</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">68.4%</div>
              <div className="text-xs text-gray-600">Cart Completion</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">85.5%</div>
              <div className="text-xs text-gray-600">Payment Success</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Funnel Performance */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Weekly Funnel Performance</CardTitle>
          <CardDescription>Conversion trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyFunnelPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="right" dataKey="visitors" fill="#E5E7EB" name="Visitors" />
              <Line yAxisId="left" type="monotone" dataKey="rate" stroke="#3B82F6" strokeWidth={3} name="Conversion Rate (%)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Device Performance */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Device Conversion Analysis</CardTitle>
          <CardDescription>Performance by device type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {devicePerformance.map((device, index) => (
              <div key={device.device} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{device.device}</div>
                  <div className="text-sm text-gray-600">
                    {device.visitors?.toLocaleString() || device.users?.toLocaleString()} visitors
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{device.rate.toFixed(2)}%</div>
                  <div className="text-xs text-gray-500">{device.conversions} conversions</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <div className="text-sm font-medium text-yellow-800">
              Insight: Desktop users convert 51% better than mobile users
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traffic Source Analysis */}
      <Card className="lg:col-span-2 bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Traffic Source Conversion Analysis</CardTitle>
          <CardDescription>Performance and quality by traffic channel</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trafficSources}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="source" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'Visitors') return value.toLocaleString();
                  if (name === 'Conversion Rate') return `${value}%`;
                  return value;
                }}
              />
              <Bar yAxisId="left" dataKey="visitors" fill="#94A3B8" name="Visitors" />
              <Bar yAxisId="right" dataKey="rate" fill="#3B82F6" name="Conversion Rate" />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {['High', 'Medium', 'Low'].map((quality) => (
              <div key={quality} className={`p-3 rounded-lg ${
                quality === 'High' ? 'bg-green-50' : quality === 'Medium' ? 'bg-yellow-50' : 'bg-red-50'
              }`}>
                <div className={`text-sm font-medium ${
                  quality === 'High' ? 'text-green-800' : quality === 'Medium' ? 'text-yellow-800' : 'text-red-800'
                }`}>
                  {quality} Quality Traffic
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {trafficSources.filter(s => s.quality === quality).map(s => s.source).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesFunnelAnalysis;
