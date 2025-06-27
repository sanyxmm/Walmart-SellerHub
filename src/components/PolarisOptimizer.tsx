import React, { useState } from 'react';
import { 
  Zap, 
  TrendingUp, 
  Package, 
  Truck, 
  Clock, 
  Target,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Settings,
  Play,
  Pause
} from 'lucide-react';

interface OptimizationSuggestion {
  id: string;
  type: 'inventory' | 'pricing' | 'logistics' | 'marketing';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  potential: {
    revenue: number;
    cost: number;
    efficiency: number;
  };
  status: 'pending' | 'implementing' | 'completed';
}

const PolarisOptimizer: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<OptimizationSuggestion | null>(null);
  
  const suggestions: OptimizationSuggestion[] = [
    {
      id: '1',
      type: 'inventory',
      title: 'Optimize Wireless Headphones Stock',
      description: 'Increase inventory for Wireless Headphones by 40% based on demand forecasting. Current stock will run out in 3 days.',
      impact: 'high',
      potential: {
        revenue: 15000,
        cost: -2000,
        efficiency: 25
      },
      status: 'pending'
    },
    {
      id: '2',
      type: 'pricing',
      title: 'Dynamic Pricing for Smart Watches',
      description: 'Adjust Smart Watch pricing to ₹8,299 (8% decrease) to increase sales velocity by 35% based on competitor analysis.',
      impact: 'high',
      potential: {
        revenue: 22000,
        cost: 0,
        efficiency: 18
      },
      status: 'pending'
    },
    {
      id: '3',
      type: 'logistics',
      title: 'Optimize Delivery Routes',
      description: 'Restructure delivery routes for Mumbai zone to reduce delivery time from 3-4 hours to 2-3 hours.',
      impact: 'medium',
      potential: {
        revenue: 8000,
        cost: -3000,
        efficiency: 30
      },
      status: 'implementing'
    },
    {
      id: '4',
      type: 'marketing',
      title: 'Targeted Clothing Campaign',
      description: 'Launch targeted marketing campaign for clothing category during weekend peak hours to boost conversion.',
      impact: 'medium',
      potential: {
        revenue: 12000,
        cost: -1500,
        efficiency: 15
      },
      status: 'completed'
    }
  ];

  const metrics = {
    totalRevenuePotential: suggestions.reduce((sum, s) => sum + s.potential.revenue, 0),
    totalCostSaving: Math.abs(suggestions.reduce((sum, s) => sum + s.potential.cost, 0)),
    avgEfficiencyGain: suggestions.reduce((sum, s) => sum + s.potential.efficiency, 0) / suggestions.length,
    implementationRate: suggestions.filter(s => s.status === 'completed').length / suggestions.length * 100
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'implementing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inventory':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'pricing':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'logistics':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'marketing':
        return <Target className="w-5 h-5 text-orange-500" />;
      default:
        return <Zap className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 5000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Polaris Optimizer</h1>
          <p className="text-gray-600 mt-1">AI-powered supply chain optimization engine</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleOptimize}
            disabled={isOptimizing}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              isOptimizing 
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isOptimizing ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Optimizing...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Run Optimization</span>
              </>
            )}
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Optimization Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue Potential</p>
              <p className="text-2xl font-bold text-green-600">₹{metrics.totalRevenuePotential.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cost Savings</p>
              <p className="text-2xl font-bold text-blue-600">₹{metrics.totalCostSaving.toLocaleString()}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Efficiency Gain</p>
              <p className="text-2xl font-bold text-purple-600">{Math.round(metrics.avgEfficiencyGain)}%</p>
            </div>
            <Zap className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Implementation</p>
              <p className="text-2xl font-bold text-orange-600">{Math.round(metrics.implementationRate)}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Optimization Status */}
      {isOptimizing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="animate-spin w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full"></div>
            <div>
              <h3 className="font-semibold text-blue-900">Running Optimization Analysis</h3>
              <p className="text-blue-700">Analyzing supply chain patterns, demand forecasting, and market conditions...</p>
            </div>
          </div>
        </div>
      )}

      {/* Optimization Suggestions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Optimization Recommendations</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="mt-1">
                      {getTypeIcon(suggestion.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{suggestion.title}</h4>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(suggestion.impact)}`}>
                          {suggestion.impact} impact
                        </span>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(suggestion.status)}
                          <span className="text-sm text-gray-500 capitalize">{suggestion.status}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{suggestion.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-2 bg-green-50 rounded">
                          <p className="text-sm text-green-600">Revenue</p>
                          <p className="font-semibold text-green-700">+₹{suggestion.potential.revenue.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <p className="text-sm text-blue-600">Cost</p>
                          <p className="font-semibold text-blue-700">
                            {suggestion.potential.cost >= 0 ? '+' : ''}₹{suggestion.potential.cost.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded">
                          <p className="text-sm text-purple-600">Efficiency</p>
                          <p className="font-semibold text-purple-700">+{suggestion.potential.efficiency}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => setSelectedSuggestion(suggestion)}
                      className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                      View Details
                    </button>
                    {suggestion.status === 'pending' && (
                      <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                        Implement
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supply Chain Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Supply Chain Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Inventory Turnover</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">78%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Delivery Performance</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">92%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Cost Efficiency</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">65%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Customer Satisfaction</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">89%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Automation Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-green-900">Inventory Reordering</span>
              </div>
              <span className="text-sm text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-green-900">Price Optimization</span>
              </div>
              <span className="text-sm text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-yellow-900">Route Optimization</span>
              </div>
              <span className="text-sm text-yellow-600">Pending</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-900">Demand Forecasting</span>
              </div>
              <span className="text-sm text-gray-600">Setup Required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSuggestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Optimization Details</h3>
              <button
                onClick={() => setSelectedSuggestion(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {getTypeIcon(selectedSuggestion.type)}
                <h4 className="text-xl font-semibold text-gray-900">{selectedSuggestion.title}</h4>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(selectedSuggestion.impact)}`}>
                  {selectedSuggestion.impact} impact
                </span>
              </div>
              
              <p className="text-gray-600">{selectedSuggestion.description}</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-green-600 mb-1">Revenue Impact</p>
                  <p className="text-xl font-bold text-green-700">+₹{selectedSuggestion.potential.revenue.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Package className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-blue-600 mb-1">Cost Impact</p>
                  <p className="text-xl font-bold text-blue-700">
                    {selectedSuggestion.potential.cost >= 0 ? '+' : ''}₹{selectedSuggestion.potential.cost.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-purple-600 mb-1">Efficiency Gain</p>
                  <p className="text-xl font-bold text-purple-700">+{selectedSuggestion.potential.efficiency}%</p>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Implement Now
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Schedule Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolarisOptimizer;