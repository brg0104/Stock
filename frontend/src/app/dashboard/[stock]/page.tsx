// // app/dashboard/[stock]/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { fetchStockData, StockData } from "@/utils/api";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// export default function StockPage({ params }: { params: { stock: string } }) {
//   const [data, setData] = useState<{ Date: string; Close: number }[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [period, setPeriod] = useState<string>("1y");

//   const stockName = params.stock;

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetchStockData(stockName, period);
//         setData(response.stock_data);
//       } catch (err) {
//         setError("Failed to fetch stock data.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, [stockName, period]);

//   const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setPeriod(event.target.value);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-4xl font-extrabold mb-6 text-gray-800 dark:text-gray-200">
//         Stock Data for {stockName}
//       </h1>
//       <div className="mb-4">
//         <label className="mr-2 text-gray-700">Select Period:</label>
//         <select value={period} onChange={handlePeriodChange} className="p-2 border rounded-md">
//           <option value="1w">1 Week</option>
//           <option value="1m">1 Month</option>
//           <option value="6m">6 Months</option>
//           <option value="1y">1 Year</option>
//         </select>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <p className="text-lg text-gray-500">Loading...</p>
//         </div>
//       ) : error ? (
//         <div className="flex justify-center items-center h-64">
//           <p className="text-red-500 font-medium">{error}</p>
//         </div>
//       ) : (
//         <div className="shadow-lg rounded-lg bg-white dark:bg-gray-900 p-6">
//           <ResponsiveContainer width="100%" height={400}>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="Date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="Close" stroke="#8884d8" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { fetchStockData } from "@/utils/api";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Area,
//   AreaChart,
// } from "recharts";

// export default function StockPage({ params }: { params: { stock: string } }) {
//   const [data, setData] = useState<{ Date: string; Close: number }[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [period, setPeriod] = useState<string>("1y");
//   const [chartType, setChartType] = useState<"line" | "area">("area");

//   const stockName = params.stock;

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetchStockData(stockName, period);
//         setData(response.stock_data);
//       } catch (err) {
//         setError("Failed to fetch stock data.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, [stockName, period]);

//   const getStockMetrics = () => {
//     if (data.length < 2) return { change: 0, changePercent: 0 };
//     const latest = data[data.length - 1].Close;
//     const previous = data[data.length - 2].Close;
//     const change = latest - previous;
//     const changePercent = (change / previous) * 100;
//     return { change, changePercent };
//   };

//   const { change, changePercent } = getStockMetrics();
//   const isPositive = change >= 0;

//   const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
//           <p className="text-gray-600 dark:text-gray-300">{label}</p>
//           <p className="font-bold text-lg">
//             ${payload[0].value.toFixed(2)}
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const renderChart = () => {
//     const ChartComponent = chartType === "line" ? LineChart : AreaChart;
//     return (
//       <ResponsiveContainer width="100%" height={500}>
//         <ChartComponent data={data}>
//           <defs>
//             <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
//               <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
//             </linearGradient>
//           </defs>
//           <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//           <XAxis
//             dataKey="Date"
//             stroke="#6B7280"
//             tick={{ fill: '#6B7280' }}
//           />
//           <YAxis
//             stroke="#6B7280"
//             tick={{ fill: '#6B7280' }}
//             domain={['auto', 'auto']}
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <Legend />
//           {chartType === "line" ? (
//             <Line
//               type="monotone"
//               dataKey="Close"
//               stroke="#8884d8"
//               strokeWidth={2}
//               dot={false}
//             />
//           ) : (
//             <Area
//               type="monotone"
//               dataKey="Close"
//               stroke="#8884d8"
//               fill="url(#colorClose)"
//             />
//           )}
//         </ChartComponent>
//       </ResponsiveContainer>
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200">
//               {stockName}
//             </h1>
//             <div className="flex items-center gap-2 mt-2">
//               <span className={`text-2xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
//                 ${data[data.length - 1]?.Close.toFixed(2)}
//               </span>
//               <span className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
//                 {isPositive ? '↑' : '↓'}
//                 {Math.abs(changePercent).toFixed(2)}%
//               </span>
//             </div>
//           </div>
          
//           <div className="flex gap-4">
//             <select
//               value={period}
//               onChange={(e) => setPeriod(e.target.value)}
//               className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-gray-700 dark:text-gray-200"
//             >
//               <option value="1w">1 Week</option>
//               <option value="1m">1 Month</option>
//               <option value="6m">6 Months</option>
//               <option value="1y">1 Year</option>
//             </select>
            
//             <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
//               <button
//                 onClick={() => setChartType("line")}
//                 className={`px-4 py-2 ${
//                   chartType === "line"
//                     ? "bg-blue-500 text-white"
//                     : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
//                 }`}
//               >
//                 Line
//               </button>
//               <button
//                 onClick={() => setChartType("area")}
//                 className={`px-4 py-2 ${
//                   chartType === "area"
//                     ? "bg-blue-500 text-white"
//                     : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
//                 }`}
//               >
//                 Area
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Metrics Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//             <div className="flex items-center justify-between">
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                 Market Cap
//               </h3>
//               <span className="text-gray-400">$</span>
//             </div>
//             <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">4.89M</p>
//           </div>
          
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//             <div className="flex items-center justify-between">
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                 Volume
//               </h3>
//               <span className="text-gray-400">📊</span>
//             </div>
//             <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">2.4M</p>
//           </div>
          
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//             <div className="flex items-center justify-between">
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                 Trading Hours
//               </h3>
//               <span className="text-gray-400">🕒</span>
//             </div>
//             <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">9:30 - 16:00</p>
//           </div>
//         </div>

//         {/* Chart Section */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//           {loading ? (
//             <div className="flex justify-center items-center h-[500px]">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600" />
//             </div>
//           ) : error ? (
//             <div className="flex justify-center items-center h-[500px]">
//               <p className="text-red-500 font-medium">{error}</p>
//             </div>
//           ) : (
//             renderChart()
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchStockData } from "@/utils/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export default function StockPage({ params }: { params: { stock: string } }) {
  const [data, setData] = useState<{ Date: string; Close: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<string>("1y");
  const [chartType, setChartType] = useState<"line" | "area">("area");

  const stockName = params.stock;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchStockData(stockName, period);
        setData(response.stock_data);
      } catch (err) {
        setError("Failed to fetch stock data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [stockName, period]);

  const getStockMetrics = () => {
    if (data.length < 2) return { periodChange: 0, periodChangePercent: 0, dayChange: 0, dayChangePercent: 0 };
    
    // Calculate period change (first to last)
    const latest = data[data.length - 1].Close;
    const first = data[0].Close;
    const periodChange = latest - first;
    const periodChangePercent = (periodChange / first) * 100;
    
    // Calculate 1-day change (last two points)
    const previous = data[data.length - 2].Close;
    const dayChange = latest - previous;
    const dayChangePercent = (dayChange / previous) * 100;
    
    return { 
      periodChange, 
      periodChangePercent, 
      dayChange, 
      dayChangePercent 
    };
  };

  const { periodChange, periodChangePercent, dayChange, dayChangePercent } = getStockMetrics();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300">{label}</p>
          <p className="font-bold text-lg">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const ChartComponent = chartType === "line" ? LineChart : AreaChart;
    return (
      <ResponsiveContainer width="100%" height={500}>
        <ChartComponent data={data}>
          <defs>
            <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="Date"
            stroke="#6B7280"
            tick={{ fill: '#6B7280' }}
          />
          <YAxis
            stroke="#6B7280"
            tick={{ fill: '#6B7280' }}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {chartType === "line" ? (
            <Line
              type="monotone"
              dataKey="Close"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          ) : (
            <Area
              type="monotone"
              dataKey="Close"
              stroke="#8884d8"
              fill="url(#colorClose)"
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200">
              {stockName}
            </h1>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ${data[data.length - 1]?.Close.toFixed(2)}
                </span>
                {/* 1-day change */}
                <span className={`flex items-center text-sm ${dayChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {dayChange >= 0 ? '↑' : '↓'}
                  ${Math.abs(dayChange).toFixed(2)} ({Math.abs(dayChangePercent).toFixed(2)}%) 1d
                </span>
              </div>
              {/* Period change */}
              <span className={`flex items-center text-sm ${periodChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {periodChange >= 0 ? '↑' : '↓'}
                ${Math.abs(periodChange).toFixed(2)} ({Math.abs(periodChangePercent).toFixed(2)}%) {period}
              </span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-gray-700 dark:text-gray-200"
            >
              <option value="1w">1 Week</option>
              <option value="1m">1 Month</option>
              <option value="6m">6 Months</option>
              <option value="1y">1 Year</option>
            </select>
            
            <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
              <button
                onClick={() => setChartType("line")}
                className={`px-4 py-2 ${
                  chartType === "line"
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                }`}
              >
                Line
              </button>
              <button
                onClick={() => setChartType("area")}
                className={`px-4 py-2 ${
                  chartType === "area"
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                }`}
              >
                Area
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          {loading ? (
            <div className="flex justify-center items-center h-[500px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600" />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-[500px]">
              <p className="text-red-500 font-medium">{error}</p>
            </div>
          ) : (
            renderChart()
          )}
        </div>
      </div>
    </div>
  );
}