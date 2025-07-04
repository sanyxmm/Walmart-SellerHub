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
} from 'lucide-react';

const PolarisOptimizer = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  /* ---------- Sample data (would usually come from an API) ---------- */
  const suggestions = [
    {
      id: '1',
      type: 'inventory',
      title: 'Optimize Wireless Headphones Stock',
      description:
        'Increase inventory for Wireless Headphones by 40% based on demand forecasting. Current stock will run out in 3 days.',
      impact: 'high',
      potential: { revenue: 15000, cost: -2000, efficiency: 25 },
      status: 'pending',
    },
    {
      id: '2',
      type: 'pricing',
      title: 'Dynamic Pricing for Smart Watches',
      description:
        'Adjust Smart Watch pricing to ₹8,299 (8% decrease) to increase sales velocity by 35% based on competitor analysis.',
      impact: 'high',
      potential: { revenue: 22000, cost: 0, efficiency: 18 },
      status: 'pending',
    },
    {
      id: '3',
      type: 'logistics',
      title: 'Optimize Delivery Routes',
      description:
        'Restructure delivery routes for Mumbai zone to reduce delivery time from 3‑4 hours to 2‑3 hours.',
      impact: 'medium',
      potential: { revenue: 8000, cost: -3000, efficiency: 30 },
      status: 'implementing',
    },
    {
      id: '4',
      type: 'marketing',
      title: 'Targeted Clothing Campaign',
      description:
        'Launch targeted marketing campaign for clothing category during weekend peak hours to boost conversion.',
      impact: 'medium',
      potential: { revenue: 12000, cost: -1500, efficiency: 15 },
      status: 'completed',
    },
  ];

  /* ---------- KPI cards ---------- */
  const metrics = {
    totalRevenuePotential: suggestions.reduce(
      (sum, s) => sum + s.potential.revenue,
      0
    ),
    totalCostSaving: Math.abs(
      suggestions.reduce((sum, s) => sum + s.potential.cost, 0)
    ),
    avgEfficiencyGain:
      suggestions.reduce((sum, s) => sum + s.potential.efficiency, 0) /
      suggestions.length,
    implementationRate:
      (suggestions.filter((s) => s.status === 'completed').length /
        suggestions.length) *
      100,
  };

  /* ---------- Helpers ---------- */
  const impactColor = (impact) =>
    impact === 'high'
      ? 'bg-red-100 text-red-800'
      : impact === 'medium'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-green-100 text-green-800';

  const statusIcon = (status) =>
    status === 'completed' ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : status === 'implementing' ? (
      <Clock className="w-4 h-4 text-yellow-500" />
    ) : (
      <AlertCircle className="w-4 h-4 text-gray-500" />
    );

  const typeIcon = (type) => {
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

  const runOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 5000); // fake 5‑second run
  };

  /* ---------- JSX ---------- */
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Polaris Optimizer</h1>
          <p className="text-gray-600">
            AI‑powered supply‑chain optimization engine
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runOptimization}
            disabled={isOptimizing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isOptimizing
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isOptimizing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Optimizing…
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Run Optimization
              </>
            )}
          </button>

          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <KpiCard
          title="Revenue Potential"
          value={`₹${metrics.totalRevenuePotential.toLocaleString()}`}
          icon={TrendingUp}
          color="text-green-600"
        />
        <KpiCard
          title="Cost Savings"
          value={`₹${metrics.totalCostSaving.toLocaleString()}`}
          icon={Package}
          color="text-blue-600"
        />
        <KpiCard
          title="Efficiency Gain"
          value={`${Math.round(metrics.avgEfficiencyGain)}%`}
          icon={Zap}
          color="text-purple-600"
        />
        <KpiCard
          title="Implementation"
          value={`${Math.round(metrics.implementationRate)}%`}
          icon={BarChart3}
          color="text-orange-600"
        />
      </div>

      {/* Progress box while running */}
      {isOptimizing && (
        <div className="p-6 bg-blue-50 border rounded-lg flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <div>
            <h3 className="font-semibold text-blue-900">
              Running Optimization Analysis
            </h3>
            <p className="text-blue-700">
              Analyzing supply‑chain patterns, demand forecasting, and market
              conditions…
            </p>
          </div>
        </div>
      )}

      {/* Suggestion list */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Optimization Recommendations</h3>
        </div>

        <div className="p-6 space-y-4">
          {suggestions.map((s) => (
            <div
              key={s.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between gap-4">
                {/* left */}
                <div className="flex gap-3 flex-1">
                  {typeIcon(s.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{s.title}</h4>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${impactColor(
                          s.impact
                        )}`}
                      >
                        {s.impact} impact
                      </span>
                      {statusIcon(s.status)}
                      <span className="text-sm text-gray-500 capitalize">
                        {s.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{s.description}</p>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <MetricTile
                        label="Revenue"
                        value={`+₹${s.potential.revenue.toLocaleString()}`}
                        color="green"
                      />
                      <MetricTile
                        label="Cost"
                        value={`${
                          s.potential.cost >= 0 ? '+' : ''
                        }₹${s.potential.cost.toLocaleString()}`}
                        color="blue"
                      />
                      <MetricTile
                        label="Efficiency"
                        value={`+${s.potential.efficiency}%`}
                        color="purple"
                      />
                    </div>
                  </div>
                </div>

                {/* right buttons */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedSuggestion(s)}
                    className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100"
                  >
                    View Details
                  </button>
                  {s.status === 'pending' && (
                    <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700">
                      Implement
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supply‑chain health + Automation status */}
      <SupplyChainAndAutomation />

      {/* Detail modal */}
      {selectedSuggestion && (
        <SuggestionModal
          suggestion={selectedSuggestion}
          onClose={() => setSelectedSuggestion(null)}
          impactColor={impactColor}
          typeIcon={typeIcon}
        />
      )}
    </div>
  );
};

/* ---------- Reusable sub‑components ---------- */

const KpiCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-lg p-6 border shadow-sm flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
    <Icon className={`w-8 h-8 ${color}`} />
  </div>
);

const MetricTile = ({ label, value, color }) => (
  <div className={`p-2 bg-${color}-50 rounded`}>
    <p className={`text-sm text-${color}-600`}>{label}</p>
    <p className={`font-semibold text-${color}-700`}>{value}</p>
  </div>
);

const SupplyChainAndAutomation = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Supply chain health */}
    <div className="bg-white rounded-lg p-6 border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Supply Chain Health</h3>
      {[
        ['Inventory Turnover', 78, 'green'],
        ['Delivery Performance', 92, 'blue'],
        ['Cost Efficiency', 65, 'yellow'],
        ['Customer Satisfaction', 89, 'purple'],
      ].map(([name, pct, clr]) => (
        <ProgressRow key={name} label={name} percent={pct} color={clr} />
      ))}
    </div>

    {/* Automation status */}
    <div className="bg-white rounded-lg p-6 border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Automation Status</h3>
      {[
        ['Inventory Reordering', 'Active', CheckCircle, 'green'],
        ['Price Optimization', 'Active', CheckCircle, 'green'],
        ['Route Optimization', 'Pending', Clock, 'yellow'],
        ['Demand Forecasting', 'Setup Required', AlertCircle, 'gray'],
      ].map(([name, status, Icon, c]) => (
        <StatusRow key={name} label={name} status={status} icon={Icon} color={c} />
      ))}
    </div>
  </div>
);

const ProgressRow = ({ label, percent, color }) => (
  <div className="flex items-center justify-between mb-4">
    <span className="text-gray-600">{label}</span>
    <div className="flex items-center gap-2">
      <div className="w-32 bg-gray-200 rounded-full h-2">
        <div
          className={`bg-${color}-600 h-2 rounded-full`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-900">{percent}%</span>
    </div>
  </div>
);

const StatusRow = ({ label, status, icon: Icon, color }) => (
  <div
    className={`flex items-center justify-between p-3 bg-${color}-50 rounded-lg mb-2`}
  >
    <div className="flex items-center gap-3">
      <Icon className={`w-5 h-5 text-${color}-500`} />
      <span className={`font-medium text-${color}-900`}>{label}</span>
    </div>
    <span className={`text-sm text-${color}-600`}>{status}</span>
  </div>
);

const SuggestionModal = ({ suggestion, onClose, impactColor, typeIcon }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Optimization Details</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
          ×
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {typeIcon(suggestion.type)}
          <h4 className="text-xl font-semibold">{suggestion.title}</h4>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${impactColor(
              suggestion.impact
            )}`}
          >
            {suggestion.impact} impact
          </span>
        </div>

        <p className="text-gray-600">{suggestion.description}</p>

        <div className="grid grid-cols-3 gap-4 text-center">
          <MetricTile
            label="Revenue Impact"
            value={`+₹${suggestion.potential.revenue.toLocaleString()}`}
            color="green"
          />
          <MetricTile
            label="Cost Impact"
            value={`${
              suggestion.potential.cost >= 0 ? '+' : ''
            }₹${suggestion.potential.cost.toLocaleString()}`}
            color="blue"
          />
          <MetricTile
            label="Efficiency Gain"
            value={`+${suggestion.potential.efficiency}%`}
            color="purple"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Implement Now
          </button>
          <button className="flex-1 border py-2 rounded-lg hover:bg-gray-50">
            Schedule Later
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default PolarisOptimizer;
