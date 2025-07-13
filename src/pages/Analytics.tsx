
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FinancialMetrics from '@/components/analytics/FinancialMetrics';
import MarketingInsights from '@/components/analytics/MarketingInsights';
import EOQDiagram from '@/components/analytics/EOQDiagram';
import SalesFunnelAnalysis from '@/components/analytics/SalesFunnelAnalysis';
import { TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Walmart Seller Analytics</h1>
          <p className="text-gray-600 text-lg">Comprehensive insights for your marketplace performance</p>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">$125,847</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">1,924</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">3.42%</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.8% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="financial" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg rounded-lg p-1">
            <TabsTrigger value="financial" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Financial Metrics
            </TabsTrigger>
            <TabsTrigger value="marketing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Marketing Insights
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Inventory (EOQ)
            </TabsTrigger>
            <TabsTrigger value="funnel" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Sales Funnel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="financial">
            <FinancialMetrics />
          </TabsContent>

          <TabsContent value="marketing">
            <MarketingInsights />
          </TabsContent>

          <TabsContent value="inventory">
            <EOQDiagram />
          </TabsContent>

          <TabsContent value="funnel">
            <SalesFunnelAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
