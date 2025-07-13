
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BarChart, TrendingUp, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: "Financial Analytics",
      description: "GMV, Gross Profit, AOV, CLV, and IPI calculations",
      metrics: ["$125K+ Revenue", "40% Profit Margin", "$44 AOV"]
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Marketing Insights",
      description: "Conversion rates, CAC, ROAS, and customer segmentation",
      metrics: ["3.42% Conversion", "6.9x ROAS", "$10 CAC"]
    },
    {
      icon: <Package className="h-8 w-8 text-purple-600" />,
      title: "EOQ Optimization",
      description: "Economic Order Quantity analysis with cost curves",
      metrics: ["489 Units EOQ", "$465 Savings", "22 Orders/Year"]
    },
    {
      icon: <BarChart className="h-8 w-8 text-orange-600" />,
      title: "Sales Funnel",
      description: "Complete customer journey analysis and optimization",
      metrics: ["83K Visitors", "2.8K Orders", "96.6% Drop-off"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Walmart Seller
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Analytics Dashboard
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Comprehensive insights for your marketplace performance with advanced financial metrics, 
              marketing analytics, and inventory optimization
            </p>
            <Button 
              onClick={() => navigate('/analytics')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Analytics Dashboard
              <BarChart className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Analytics Features</h2>
          <p className="text-lg text-gray-600">
            Everything you need to optimize your Walmart seller performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-gray-50">
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {feature.metrics.map((metric, metricIndex) => (
                    <span 
                      key={metricIndex}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Performance?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get detailed insights into your financial metrics, marketing performance, and inventory optimization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/analytics')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold"
            >
              <BarChart className="mr-2 h-5 w-5" />
              Launch Analytics Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$125K+</div>
              <div className="text-gray-600">Monthly Revenue</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">3.42%</div>
              <div className="text-gray-600">Conversion Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">2.8K</div>
              <div className="text-gray-600">Monthly Orders</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">6.9x</div>
              <div className="text-gray-600">Return on Ad Spend</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
