import React from "react";
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,RadialBarChart,RadialBar,
  BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,AreaChart,Area,
} from "recharts";
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,Camera,
} from 'lucide-react';

import { mockAnalytics, mockProducts, mockOrders } from '../data/mockData';

const donutSales = 4498;
const donutSalesMax = 6000;
const donutCosts = 12442;
const donutCostsMax = 20000;
const donutSaving = 10765;
const donutSavingMax = 15000;
const donutOverrun = 3231;
const donutOverMax = 5000;
// Mock data
const progressPalette = ["#0071ce", "#e5e7eb"]; // blue + light gray remainder
const piePalette = ["#0071ce", "#6ee7b7", "#8b5cf6", "#f59e0b"];

const viewsData = [
  { name: "Day 1", value: 200 },
  { name: "Day 2", value: 300 },
  { name: "Day 3", value: 250 },
  { name: "Day 4", value: 400 },
  { name: "Day 5", value: 350 },
  { name: "Day 6", value: 450 },
];

const purchasesData = [
  { name: "1", value: 20 },
  { name: "2", value: 30 },
  { name: "3", value: 40 },
  { name: "4", value: 35 },
  { name: "5", value: 50 },
  { name: "6", value: 60 },
  { name: "7", value: 45 },
  { name: "8", value: 40 },
  { name: "9", value: 35 },
  { name: "10", value: 50 },
  { name: "11", value: 60 },
  { name: "12", value: 45 },
];

const transactionsData = [
  { name: "1", amount: 1000 ,baseline:400},
  { name: "2", amount: 600 ,baseline:400},
  { name: "3", amount: 800 ,baseline:500},
  { name: "4", amount: 900 ,baseline:300},
  { name: "5", amount: 700 ,baseline:700},
  { name: "6", amount: 1000,baseline:600 },
  { name: "7", amount: 900 ,baseline:800},
  { name: "8", amount: 900 ,baseline:500},
  { name: "9", amount: 1000,baseline:900 },
  { name: "10", amount: 1100 ,baseline:1000},
  { name: "11", amount: 900 ,baseline:400},
  { name: "12", amount: 950 ,baseline:500},
  { name: "13", amount: 1100,baseline:700 },
  { name: "14", amount: 1150,baseline:700 },
  { name: "15", amount: 1000,baseline:500 },
];

const radarData = [
  { subject: "A", A: 120, B: 110, fullMark: 150 },
  { subject: "B", A: 98, B: 130, fullMark: 150 },
  { subject: "C", A: 86, B: 130, fullMark: 150 },
  { subject: "D", A: 99, B: 100, fullMark: 150 },
  { subject: "E", A: 85, B: 90, fullMark: 150 },
  { subject: "F", A: 65, B: 85, fullMark: 150 },
];

const statsData = [
  { name: "A", value: 40 },
  { name: "B", value: 80 },
  { name: "C", value: 60 },
  { name: "D", value: 30 },
  { name: "E", value: 50 },
  { name: "F", value: 90 },
];
const analysisData = [
  { subject: "A", score: 120 },
  { subject: "B", score: 98 },
  { subject: "C", score: 86 },
  { subject: "D", score: 99 },
  { subject: "E", score: 85 },
];

const statusData = [
  { name: "Status 1", value: 920 , color: "#00C49F"},
  { name: "Status 2", value: 1080 ,color: "#FFBB28"},
  { name: "Status 3", value: 460 ,color: "#0088FE"},
  { name: "Status 4", value: 1190 , color: "#AA66CC"},
];

const portionData = [
  { name: "Portion 1", value: 400, color: "#00C49F" },
  { name: "Portion 2", value: 300, color: "#FFBB28" },
  { name: "Portion 3", value: 300, color: "#0088FE" },
  { name: "Portion 4", value: 200, color: "#AA66CC" },
];

const comparisonData = [
  { name: "Level 1", value: 30, fill: "#f59e0b" },
  { name: "Level 2", value: 20, fill: "#34d399" },
  { name: "Level 3", value: 10, fill: "#6366f1" },
];
const stats = [
  {
    title: "Total Revenue",
    value: (mockAnalytics.revenue.total),
    change: `▲ ${mockAnalytics.revenue.growth}%`,
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
    trend: "▼ 42.8%",
    trendColor: "text-red-500",
    chartColor: "#008000",
    chartBg: "rgba(144, 238, 144, 0.12)",
    data: [2, 3, 2, 9, 7, 7, 4],
  },
  {
    title: "Total Orders",
    value: mockAnalytics.orders.total.toLocaleString(),
    change: `▲ ${mockAnalytics.orders.growth}%`,
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    trend: "▲ 57.1%",
    trendColor: "text-green-500",
    chartColor: "#6574CD",
    chartBg: "rgba(101, 116, 205, 0.12)",
    data: [1, 2, 1, 3, 5, 4, 7],
  },
  {
    title: "Active Products",
    value: mockAnalytics.products.active.toString(),
    change: `▼ ${(mockAnalytics.products.total * 0.02).toFixed(1)}%`,
    icon: Package,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    trend: "▼ 42.8%",
    trendColor: "text-red-500",
    chartColor: "#6B21A8",
    chartBg: "rgba(221, 160, 221, 0.12)",
    data: [2, 3, 2, 9, 7, 7, 4],
  },
  {
    title: "Conversion Rate",
    value: `${mockAnalytics.marketing.conversionRate}%`,
    change: "▲ 0.5% from last month",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    trend: "8.2%",
    trendColor: "text-green-500",
    chartColor: "#F6993F",
    chartBg: "rgba(246, 153, 63, 0.12)",
    data: [2, 5, 1, 3, 2, 6, 7],
  },
];
const toChartData = arr => arr.map((v, i) => ({ x: i, y: v }));

export default function Analytics() {
  const DonutProgress = ({ value, max, label }: { value: number; max: number; label: string }) => {
    const percentage = (value / max) * 100;
  
    return (
      <div className="flex flex-row items-center justify-center space-y-2">
        <RadialBarChart width={120} height={120} innerRadius="80%" outerRadius="30%"  data={[
    { name: label, value: percentage, fill: "#0071ce" },
    { name: "max", value: 100, fill: "transparent" }
  ]} startAngle={90} endAngle={-270}>
          <RadialBar background dataKey="value" cornerRadius={50} fill="#0071ce" />
        </RadialBarChart>
        <p className="text-sm text-gray-600 text-center">
          <span className="block font-semibold text-gray-800 text-lg">{value.toLocaleString()}</span>
          {label}
        </p>
      </div>
    );
  };
  
  return (
 <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">All systems operational</span>
          </div>
        </div>
      </div>
      <div className="max-w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[170px]">
           {stats.map((stat, index) => {
             const Icon = stat.icon;
             return (
               <div key={index} className="relative bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                     <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                     <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                   </div>
                   <div className={`${stat.bgColor} p-3 rounded-lg`}>
                     <Icon className={`w-6 h-6 ${stat.color}`} />
                   </div>
                   <div className="absolute bottom-0 inset-x-0 h-[45px]">
                       <ResponsiveContainer width="100%" height="100%">
                         <LineChart data={toChartData(stat.data)}>
                           <Line
                             type="monotone"
                             dataKey="y"
                             stroke={stat.chartColor}
                             strokeWidth={2}
                             dot={false}
                             isAnimationActive={true}
                           />
                         </LineChart>
                       </ResponsiveContainer>
                       {/* Chart background */}
                       <div
                         className="absolute inset-0 pointer-events-none"
                         style={{ background: stat.chartBg, zIndex: 0 }}
                       />
                     </div>
                 </div>
               </div>
             );
           })}
         </div>
    <div className="min-h-screen bg-gray-100 p-6 grid grid-cols-4 gap-4 auto-rows-min">
      {/* Second Row */}
      <div className="bg-white p-4 rounded-xl shadow-sm">    <div className="flex flex-row items-center justify-center space-y-2">
        <RadialBarChart width={120} height={120} innerRadius="80%" outerRadius="30%"  data={[
    { name: donutSales, value: 70, fill: "#22C55E" },
    { name: "max", value: 100, fill: "transparent" }
  ]} startAngle={90} endAngle={-270}>
          <RadialBar background dataKey="value" cornerRadius={50} fill="#22C55E" />
        </RadialBarChart>
        <p className="text-sm text-gray-500 text-center">
          <span className="block font-semibold text-green-500  text-lg">{donutSales.toLocaleString()}</span>
          Sales
        </p>
      </div></div>
       <div className="bg-white rounded-xl shadow p-4 col-span-2 row-span-2">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-800">Transactions</p>
                <span className="text-sm text-gray-500">December</span>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={transactionsData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                
                  <defs>
                    <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" hide />
                  <YAxis domain={['auto', 'auto']}  hide />
                  <Tooltip formatter={(v: number) => v.toLocaleString()} />
                  <Area type="monotone" dataKey="baseline" stroke="#f59e0b"  fill="url(#colorOrange)" />
                  <Area type="monotone" dataKey="amount" stroke="#000000"  fill="url(#colorWhite)"  />
                </AreaChart>
           
              </ResponsiveContainer>
              <div className="absolute right-10 top-36 bg-white shadow rounded-full px-3 py-1 text-xs font-semibold text-gray-800 border border-gray-200">
                12,216
              </div>
            </div>


      {/* Third Row */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">

      <DonutProgress value={donutSaving} max={donutSavingMax} label="Saving" /></div>

      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
          <p className="font-medium mb-2 text-gray-800">Analysis</p>
          <RadarChart width={180} height={160} data={analysisData} outerRadius={70}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" stroke="#6b7280" fontSize={10} />
            {/* Filled radar shape */}
            <Radar dataKey="score" stroke="#6366f1" fill="#8b5cf6" fillOpacity={0.6} />
          </RadarChart>
        </div>

   
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
               <p className="font-medium mb-2 text-gray-800">Portion</p>
               <PieChart width={180} height={160}>
                 <Pie data={portionData} dataKey="value" outerRadius={70} innerRadius={40} paddingAngle={4}>
                   {portionData.map((_, i) => (
                     <Cell key={`cell-${i}`} fill={piePalette[i % piePalette.length]} />
                   ))}
                 </Pie>
                 <Tooltip />
               </PieChart>
               <ul className="text-xs text-gray-600 grid grid-cols-2 gap-x-2 mt-1">
                 {portionData.map((p, i) => (
                   <li key={p.name} className="flex items-center space-x-1">
                     <span className="inline-block w-2 h-2 rounded-full" style={{ background: piePalette[i % piePalette.length] }}></span>
                     <span>{p.name}</span>
                   </li>
                 ))}
               </ul>
             </div>

      {/* Fourth Row */}
      {/* <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
        <div className="text-gray-700 font-semibold mb-2">Statistics</div>
        <ResponsiveContainer width={120} height={60}>
          <BarChart data={statsData}>
            <Bar dataKey="value" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
        {/* Comparison radial bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-2">
            <p className="font-medium text-gray-800">Comparison</p>
            <span className="text-sm font-semibold text-gray-800">10,765</span>
          </div>
          <RadialBarChart
            width={180}
            height={160}
            innerRadius="30%"
            outerRadius="100%"
            barSize={15}
            data={comparisonData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={6} />
            <Tooltip />
          </RadialBarChart>
          <ul className="grid grid-cols-3 gap-1 text-xs mt-2 text-gray-600">
            {comparisonData.map(d => (
              <li key={d.name} className="flex items-center space-x-1">
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: d.fill }}></span>
                <span>{d.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="font-medium mb-2 text-gray-800">Status <span className="text-xs text-gray-500 ml-1">(December)</span></p>
          {statusData.map(s => (
            <div key={s.name} className="mb-2">
              <div className="flex justify-between text-s text-gray-600">
                <span>{s.name}</span>
                <span>{s.value.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full">
                <div className="h-2 rounded-full bg-[#0071ce]" style={{ width: `${(s.value / 1500) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center col-span-2">
      
      <ResponsiveContainer width="100%" aspect={2.5} >
                   <BarChart width={500} height={200} data={purchasesData}>
                     <Bar dataKey="value" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                   </BarChart>
                   <p className="font-medium text-gray-800  ">Purchases</p>
           </ResponsiveContainer>
  </div>
                 
    </div>
  </div>
  );
}
