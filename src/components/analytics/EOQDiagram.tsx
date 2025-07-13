
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Package, TrendingDown, Calculator } from 'lucide-react';

const EOQDiagram = () => {
  // EOQ Calculation Parameters
  const annualDemand = 10800; // units per year
  const orderingCostPerOrder = 50; // cost per order
  const holdingCostPerUnit = 2.5; // cost per unit per year
  
  // Calculate EOQ
  const eoq = Math.sqrt((2 * annualDemand * orderingCostPerOrder) / holdingCostPerUnit);
  const numberOfOrders = annualDemand / eoq;
  const totalOrderingCost = numberOfOrders * orderingCostPerOrder;
  const totalHoldingCost = (eoq / 2) * holdingCostPerUnit;
  const totalCost = totalOrderingCost + totalHoldingCost;

  // Generate data for the cost curves
  const generateCostData = () => {
    const data = [];
    for (let q = 100; q <= 1000; q += 50) {
      const orderingCost = (annualDemand / q) * orderingCostPerOrder;
      const holdingCost = (q / 2) * holdingCostPerUnit;
      const totalCost = orderingCost + holdingCost;
      
      data.push({
        quantity: q,
        orderingCost: Math.round(orderingCost),
        holdingCost: Math.round(holdingCost),
        totalCost: Math.round(totalCost),
      });
    }
    return data;
  };

  const costData = generateCostData();

  return (
    <div className="space-y-6">
      {/* EOQ Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
              <Package className="h-5 w-5" />
              Optimal Order Quantity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 mb-1">
              {Math.round(eoq)} units
            </div>
            <p className="text-sm text-blue-600">
              Economic Order Quantity (EOQ)
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-green-800">
              <TrendingDown className="h-5 w-5" />
              Total Annual Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 mb-1">
              ${Math.round(totalCost).toLocaleString()}
            </div>
            <p className="text-sm text-green-600">
              Minimized inventory cost
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-purple-800">
              <Calculator className="h-5 w-5" />
              Order Frequency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 mb-1">
              {Math.round(numberOfOrders)} times/year
            </div>
            <p className="text-sm text-purple-600">
              Optimal reorder frequency
            </p>
          </CardContent>
        </Card>
      </div>

      {/* EOQ Cost Analysis Chart */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            EOQ Cost Analysis
          </CardTitle>
          <CardDescription>
            Relationship between order quantity and annual costs. The intersection point shows the optimal EOQ.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="quantity" 
                  stroke="#666"
                  label={{ value: 'Order Quantity (units)', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  stroke="#666"
                  label={{ value: 'Annual Cost ($)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => [`$${value}`, name]}
                  labelFormatter={(label) => `Order Quantity: ${label} units`}
                />
                <Legend />
                
                {/* Cost curves */}
                <Line 
                  type="monotone" 
                  dataKey="orderingCost" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Ordering Cost"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="holdingCost" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Holding Cost"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="totalCost" 
                  stroke="#059669" 
                  strokeWidth={3}
                  name="Total Cost"
                  dot={false}
                />
                
                {/* EOQ reference line */}
                <ReferenceLine 
                  x={Math.round(eoq)} 
                  stroke="#7c3aed" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{ value: `EOQ: ${Math.round(eoq)}`, position: "top" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* EOQ Calculation Details */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            EOQ Calculation Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Input Parameters</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Annual Demand (D):</span>
                  <span className="font-medium">{annualDemand.toLocaleString()} units</span>
                </div>
                <div className="flex justify-between">
                  <span>Ordering Cost (S):</span>
                  <span className="font-medium">${orderingCostPerOrder}</span>
                </div>
                <div className="flex justify-between">
                  <span>Holding Cost per Unit (H):</span>
                  <span className="font-medium">${holdingCostPerUnit}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Calculated Results</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>EOQ Formula: √(2DS/H)</span>
                  <span className="font-medium">{Math.round(eoq)} units</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of Orders:</span>
                  <span className="font-medium">{Math.round(numberOfOrders)} per year</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Ordering Cost:</span>
                  <span className="font-medium">${Math.round(totalOrderingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Holding Cost:</span>
                  <span className="font-medium">${Math.round(totalHoldingCost)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total Annual Cost:</span>
                  <span>${Math.round(totalCost)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Interpretation:</strong> The EOQ model shows that ordering {Math.round(eoq)} units 
              {Math.round(numberOfOrders)} times per year minimizes your total inventory costs. 
              At this quantity, your ordering and holding costs are balanced, resulting in the lowest 
              possible total annual inventory cost of ${Math.round(totalCost).toLocaleString()}.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EOQDiagram;
