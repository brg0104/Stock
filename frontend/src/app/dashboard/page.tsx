// // app/dashboard/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { fetchLatestData, StockData } from "@/utils/api";

// export default function DashboardPage() {
//   const [data, setData] = useState<StockData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetchLatestData();
//         setData(response.latest_data);
//       } catch (err) {
//         setError("Failed to fetch stock data.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="p-8">
//       <h1 className="text-4xl font-extrabold mb-6 text-gray-800 dark:text-gray-200">
//         Stock Dashboard
//       </h1>
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <p className="text-lg text-gray-500">Loading...</p>
//         </div>
//       ) : error ? (
//         <div className="flex justify-center items-center h-64">
//           <p className="text-red-500 font-medium">{error}</p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto shadow-lg rounded-lg bg-white dark:bg-gray-900 p-6">
//           <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
//             <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
//               <tr>
//                 <th className="px-6 py-4 rounded-l-lg">Stock</th>
//                 <th className="px-6 py-4">Date</th>
//                 <th className="px-6 py-4">Open</th>
//                 <th className="px-6 py-4">High</th>
//                 <th className="px-6 py-4">Low</th>
//                 <th className="px-6 py-4">Close</th>
//                 <th className="px-6 py-4 rounded-r-lg">Volume</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((stock, index) => (
//                 <tr
//                   key={`${stock.Stock}-${stock.Date}`}
//                   className={`${
//                     index % 2 === 0
//                       ? "bg-gray-50 dark:bg-gray-800"
//                       : "bg-white dark:bg-gray-900"
//                   } hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors`}
//                 >
//                   <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
//                     {stock.Stock}
//                   </td>
//                   <td className="px-6 py-4">{new Date(stock.Date).toLocaleDateString()}</td>
//                   <td className="px-6 py-4">{stock.Open.toFixed(2)}</td>
//                   <td className="px-6 py-4">{stock.High.toFixed(2)}</td>
//                   <td className="px-6 py-4">{stock.Low.toFixed(2)}</td>
//                   <td className="px-6 py-4">{stock.Close.toFixed(2)}</td>
//                   <td className="px-6 py-4">{stock.Volume.toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
  
// }


// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchLatestData, StockData } from "@/utils/api";

export default function DashboardPage() {
  const [data, setData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchLatestData();
        setData(response.latest_data);
      } catch (err) {
        setError("Failed to fetch stock data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleRowClick = (stockName: string) => {
    router.push(`/dashboard/${stockName}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 dark:text-gray-200">
        Stock Dashboard
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white dark:bg-gray-900 p-6">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <tr>
                <th className="px-6 py-4 rounded-l-lg">Stock</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Open</th>
                <th className="px-6 py-4">High</th>
                <th className="px-6 py-4">Low</th>
                <th className="px-6 py-4">Close</th>
                <th className="px-6 py-4 rounded-r-lg">Volume</th>
              </tr>
            </thead>
            <tbody>
              {data.map((stock, index) => (
                <tr
                  key={`${stock.Stock}-${stock.Date}`}
                  className={`${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  } hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors cursor-pointer`}
                  onClick={() => handleRowClick(stock.Stock)}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                    {stock.Stock}
                  </td>
                  <td className="px-6 py-4">{new Date(stock.Date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{stock.Open.toFixed(2)}</td>
                  <td className="px-6 py-4">{stock.High.toFixed(2)}</td>
                  <td className="px-6 py-4">{stock.Low.toFixed(2)}</td>
                  <td className="px-6 py-4">{stock.Close.toFixed(2)}</td>
                  <td className="px-6 py-4">{stock.Volume.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

