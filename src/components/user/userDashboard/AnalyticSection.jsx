// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from "recharts";

// const COLORS = ["#15253F", "#2B3D5B", "#455C82", "#687C9F", "#E4E0FF"];

// const donutData = [
//   { name: "Salary Slips", value: 35 },
//   { name: "Offer Letters", value: 23 },
//   { name: "Experience", value: 20 },
//   { name: "Relieving", value: 12 },
//   { name: "Others", value: 10 },
// ];

// const barData = [
//   { time: "10 AM", value: 5 },
//   { time: "11 AM", value: 12 },
//   { time: "12 PM", value: 18 },
//   { time: "1 PM", value: 14 },
//   { time: "2 PM", value: 8 },
//   { time: "3 PM", value: 13 },
//   { time: "4 PM", value: 22 },
//   { time: "5 PM", value: 17 },
//   { time: "6 PM", value: 15 },
// ];

// const monthlyData = [
//   { month: "Jan", value: 60 },
//   { month: "Feb", value: 65 },
//   { month: "Mar", value: 70 },
//   { month: "Apr", value: 62 },
//   { month: "May", value: 50 },
//   { month: "Jun", value: 60 },
//   { month: "Jul", value: 80 },
//   { month: "Aug", value: 79 },
//   { month: "Sep", value: 77 },
//   { month: "Oct", value: 70 },
//   { month: "Nov", value: 45 },
//   { month: "Dec", value: 40 },
// ];

// const topCompaniesData = [
//   { name: "Nimbja Security", value: 160 },
//   { name: "Smart Software", value: 145 },
//   { name: "Penta Software", value: 135 },
//   { name: "Cubeage Tech", value: 120 },
//   { name: "Quick Management", value: 105 },
// ];

// const calendarDays = [
//   27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
//   18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
// ];
// const getCalendarData = () => {
//   const today = new Date();

//   const year = today.getFullYear();
//   const month = today.getMonth(); // 0-based
//   const date = today.getDate();

//   const firstDay = new Date(year, month, 1).getDay();
//   const totalDays = new Date(year, month + 1, 0).getDate();

//   const daysArray = [];

//   // Empty spaces before first day
//   for (let i = 0; i < firstDay; i++) {
//     daysArray.push(null);
//   }

//   // Actual days
//   for (let d = 1; d <= totalDays; d++) {
//     daysArray.push(d);
//   }

//   return { today, year, month, date, daysArray };
// };
// const cardStyle =
//   "bg-white rounded-3xl p-3 border border-gray-100 shadow-[0px_12px_30px_rgba(0,0,0,0.06)]";

// const AnalyticSection = () => {
//   const { today, year, month, date, daysArray } = getCalendarData();

//   const monthName = today.toLocaleString("default", { month: "long" });
//   return (
//     <div className="min-h-screen mt-3 font-inter">
//       <h2 className="text-lg font-semibold text-gray-800 mb-5">
//         <i class="fa-solid fa-chart-column mr-3"></i> Analytics
//       </h2>

//       {/* TOP ROW */}
//       {/* <div className="grid grid-cols-12 gap-8 mb-10"> */}

//       <div className="grid grid-cols-12 gap-6 mb-10 items-stretch">
//         {/* DOCUMENT TYPES */}
//         <div className={`${cardStyle} col-span-14 md:col-span-6 xl:col-span-3`}>
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             Document Types
//           </h3>

//           <div className="flex flex-col items-center">
//             <ResponsiveContainer width="100%" height={260}>
//               <PieChart>
//                 <Pie
//                   data={donutData}
//                   innerRadius={70}
//                   outerRadius={95}
//                   dataKey="value"
//                   stroke="none"
//                   labelLine={false}
//                   label={({ cx, cy, midAngle, outerRadius, percent }) => {
//                     const RADIAN = Math.PI / 180;
//                     const radius = outerRadius + 14;
//                     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//                     return (
//                       <text
//                         x={x}
//                         y={y}
//                         fill="#64748B"
//                         textAnchor={x > cx ? "start" : "end"}
//                         dominantBaseline="central"
//                         className="text-xs font-semibold"
//                       >
//                         {(percent * 100).toFixed(0)}%
//                       </text>
//                     );
//                   }}
//                 >
//                   {donutData.map((entry, index) => (
//                     <Cell key={index} fill={COLORS[index]} />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>

//             <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-5 text-sm">
//               {donutData.map((item, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <span
//                     className="w-3 h-3 rounded-full"
//                     style={{ backgroundColor: COLORS[index] }}
//                   />
//                   <span className="text-gray-600">{item.name}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* TODAY ACTIVITY */}
//         {/* <div className={`${cardStyle} col-span-12 md:col-span-6 xl:col-span-6`}> */}
//         <div
//           className={`${cardStyle} col-span-12 md:col-span-6 xl:col-span-6 flex flex-col`}
//         >
//           <h3 className="text-lg mt-2 mb-2 font-semibold text-gray-800">
//             Today's Activity
//           </h3>
//           <p className="text-sm text-gray-400 mb-10">
//             Hourly document generation
//           </p>

//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={barData}>
//               <CartesianGrid stroke="#EAEAEA" vertical={false} />
//               <XAxis dataKey="time" />
//               <YAxis />
//               <Tooltip />

//               <defs>
//                 <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#0E145E" />
//                   <stop offset="100%" stopColor="#B37BD6" />
//                 </linearGradient>
//               </defs>

//               <Bar
//                 dataKey="value"
//                 radius={[8, 8, 0, 0]}
//                 barSize={18}
//                 fill="url(#barGradient)"
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* CALENDAR */}
//         <div className="col-span-12 md:col-span-12 xl:col-span-3">
//           {/* DATE TITLE OUTSIDE CARD */}
//           <h3 className="text-xl font-semibold text-gray-900 mb-6">
//             {date} {monthName}, {year}
//           </h3>

//           <div className={`${cardStyle} p-6`}>
//             {/* Month Row */}
//             <div className="flex justify-between items-center mb-6">
//               <span className="font-medium text-gray-800">
//                 {monthName} <span className="font-semibold">{year}</span>
//               </span>
//               <div className="text-gray-400 flex gap-4 cursor-pointer">
//                 <span>‹</span>
//                 <span>›</span>
//               </div>
//             </div>

//             {/* Week Names */}
//             <div className="grid grid-cols-7 text-xs text-gray-400 mb-4">
//               {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
//                 <div key={i} className="text-center">
//                   {d}
//                 </div>
//               ))}
//             </div>

//             {/* Days */}
//             <div className="grid grid-cols-7 gap-2">
//               {daysArray.map((day, index) => (
//                 <div
//                   key={index}
//                   className={`h-13 w-13 flex items-center justify-center rounded-lg text-sm
//           ${
//             day === date
//               ? "bg-[#8B6CEB] text-white font-semibold"
//               : day === null
//                 ? ""
//                 : "text-gray-700 hover:bg-gray-100 cursor-pointer"
//           }`}
//                 >
//                   {day}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM ROW */}
//       <div className="grid grid-cols-12 gap-8">
//         {/* TOP COMPANIES */}
//         <div className="bg-white rounded-3xl p-8 col-span-12 xl:col-span-6 shadow-[0px_30px_60px_rgba(0,0,0,0.08)]">
//           <h3 className="text-lg font-semibold text-gray-800 mb-8">
//             Top Performing Companies
//           </h3>

//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart
//               data={topCompaniesData}
//               layout="vertical"
//               margin={{ top: 10, right: 20, bottom: 10 }}
//             >
//               <CartesianGrid stroke="#EAEAEA" horizontal={false} />

//               <XAxis type="number" />
//               <YAxis
//                 type="category"
//                 dataKey="name"
//                 axisLine={false}
//                 tickLine={false}
//                 width={150}
//               />

//               <Tooltip />

//               <Bar
//                 dataKey="value"
//                 radius={[0, 12, 12, 0]}
//                 fill="url(#colorGradient)"
//                 barSize={34}
//               />

//               {/* Gradient Definition */}
//               <defs>
//                 <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
//                   <stop offset="0%" stopColor="#393B8B" />
//                   <stop offset="100%" stopColor="#B37BD6" />
//                 </linearGradient>
//               </defs>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* MONTHLY ACTIVITY */}
//         <div className={`${cardStyle} col-span-12 xl:col-span-6`}>
//           <div className="mb-8">
//             <h3 className="text-lg font-semibold mb-2">Monthly Activity</h3>
//             <span className="text-[#45556C] text-[14px] leading-[20px]">
//               Documents generated this month
//             </span>
//           </div>
//           <ResponsiveContainer width="100%" height={250}>
//             <AreaChart data={monthlyData}>
//               <CartesianGrid stroke="#EAEAEA" vertical={false} />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Area
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#8B6CEB"
//                 fill="#8B6CEB"
//                 fillOpacity={0.2}
//                 strokeWidth={2}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticSection;
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import ApiService from "../../../core/services/api.service";

const api = new ApiService();

const COLORS = ["#15253F", "#2B3D5B", "#455C82", "#687C9F", "#E4E0FF"];

/* ================= CALENDAR ================= */
const getCalendarData = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push("");
  for (let d = 1; d <= totalDays; d++) daysArray.push(d);

  return { today, year, month, date, daysArray };
};

const cardStyle =
  "bg-white rounded-2xl p-5 border border-gray-100 shadow-md";

/* ================= COMPONENT ================= */
const AnalyticSection = () => {
  const { today, year, date, daysArray } = getCalendarData();
  const monthName = today.toLocaleString("default", { month: "long" });

  const [documents, setDocuments] = useState([]);

  // ── Pagination state ──────────────────────────────────────────
  const [currentPage, setCurrentPage]   = useState(1);
  const [totalPages,  setTotalPages]    = useState(1);
  const [totalDocs,   setTotalDocs]     = useState(0);
  const [loading,     setLoading]       = useState(false);
  // ─────────────────────────────────────────────────────────────

  /* ================= API ================= */
  useEffect(() => {
    fetchDocuments(currentPage);
  }, [currentPage]);

  /**
   * Fetch one page of documents.
   *
   * Expected API response shape (adjust field names to match your backend):
   * {
   *   data:       [...],   // array of documents for this page
   *   totalPages: 10,      // total number of pages
   *   total:      95,      // total document count  (optional)
   *   page:       1        // current page          (optional)
   * }
   */
  const fetchDocuments = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.apiget(`/documents/getalldoc?page=${page}`);

      // ── Adapt these lines to your actual response structure ──
      setDocuments(res.data?.data        || res.data        || []);
      setTotalPages(res.data?.totalPages || 1);
      setTotalDocs (res.data?.total      || 0);
      // ─────────────────────────────────────────────────────────
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PAGINATION HELPERS ================= */
  const goToPage   = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  /**
   * Build a compact page-number list like: 1 … 4 5 6 … 10
   */
  const getPageNumbers = () => {
    const delta   = 2;          // pages shown around current page
    const range   = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2)         range.unshift("...");
    if (currentPage + delta < totalPages - 1) range.push("...");

    rangeWithDots.push(1);
    range.forEach((p) => rangeWithDots.push(p));
    if (totalPages > 1) rangeWithDots.push(totalPages);

    return rangeWithDots;
  };

  /* ================= DONUT ================= */
  const getDonutData = () => {
    if (!Array.isArray(documents)) return [];

    const buckets = {
      SalarySlip:        { value: 0, color: "#1a2f5e" },
      OfferLetter:       { value: 0, color: "#2d4a8a" },
      AppointmentLetter: { value: 0, color: "#9896b8" },
      RelievingLetter:   { value: 0, color: "#c8c4f0" },
      Others:            { value: 0, color: "#e8e6f8" },
    };

    documents.forEach((doc) => {
      const type = doc.documentType || "Others";
      if (buckets[type] !== undefined) {
        buckets[type].value++;
      } else {
        buckets["Others"].value++;
      }
    });

    const labels = {
      SalarySlip:        "Salary Slips",
      OfferLetter:       "Offer Letters",
      AppointmentLetter: "Appointment Letter",
      RelievingLetter:   "Relieving Letter",
      Others:            "Others",
    };

    return Object.keys(buckets)
      .filter((key) => buckets[key].value > 0)
      .map((key) => ({
        name:  labels[key],
        value: buckets[key].value,
        color: buckets[key].color,
      }));
  };

  /* ================= COMPANIES ================= */
  const getTopCompaniesData = () => {
    if (!Array.isArray(documents)) return [];

    const counts = {};
    documents.forEach((doc) => {
      const company = doc.company || "Unknown";
      counts[company] = (counts[company] || 0) + 1;
    });

    return Object.keys(counts)
      .map((key) => ({
        name:     key.split(" ")[0],
        fullName: key,
        value:    counts[key],
      }))
      .sort((a, b) => b.value - a.value);
  };

  /* ================= MONTHLY ================= */
  const getMonthlyData = () => {
    if (!Array.isArray(documents)) return [];

    const monthsOrder = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ];

    const counts = {};
    monthsOrder.forEach((m) => (counts[m] = 0));

    documents.forEach((doc) => {
      const d     = new Date(doc.createdAt);
      const month = d.toLocaleString("default", { month: "short" });
      counts[month]++;
    });

    return monthsOrder.map((month) => ({ month, value: counts[month] }));
  };

  /* ================= TODAY ================= */
  const getTodayHourlyData = () => {
    if (!Array.isArray(documents)) return [];

    const hours = {};

    documents.forEach((doc) => {
      const d    = new Date(doc.createdAt);
      const hour = d.getHours();

      const label =
        hour === 0  ? "12 AM"
        : hour < 12 ? `${hour} AM`
        : hour === 12 ? "12 PM"
        : `${hour - 12} PM`;

      hours[label] = (hours[label] || 0) + 1;
    });

    return Object.keys(hours).map((key) => ({ time: key, value: hours[key] }));
  };

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen p-4 font-inter bg-gray-50">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Analytics</h2>

        {/* Total docs badge */}
        {totalDocs > 0 && (
          <span className="text-sm text-gray-500">
            Total documents:&nbsp;
            <span className="font-semibold text-gray-700">{totalDocs}</span>
          </span>
        )}
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="flex items-center justify-center py-10">
          <div className="w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
        </div>
      )}

      {!loading && (
        <>
          {/* ================= TOP SECTION ================= */}
          <div className="grid grid-cols-12 gap-6 mb-8">

            {/* DOCUMENT TYPES */}
            <div className={`${cardStyle} col-span-12 sm:col-span-6 xl:col-span-3`}>
              <h3 className="font-semibold mb-4">Document Types</h3>

              <ResponsiveContainer width="100%" height={220}>
                <PieChart margin={{ top: 30, right: 40, left: 40, bottom: 10 }}>
                  <Pie
                    data={getDonutData()}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={3}
                    labelLine={false}
                    label={({ cx, cy, midAngle, outerRadius, percent }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius + 25;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text
                          x={x} y={y}
                          fill="#555"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={12}
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {getDonutData().map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1">
                {getDonutData().map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-xs text-gray-600 truncate">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TODAY ACTIVITY */}
            <div className={`${cardStyle} col-span-12 sm:col-span-6 xl:col-span-6`}>
              <h3 className="font-semibold mb-4">Today's Activity</h3>

              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={getTodayHourlyData()} barCategoryGap="40%">
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#C084FC" stopOpacity={1} />
                      <stop offset="100%" stopColor="#2E1065" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="url(#barGradient)" radius={[6,6,0,0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* CALENDAR */}
            <div className={`${cardStyle} col-span-12 xl:col-span-3`}>
              <h3 className="font-semibold mb-4">
                {date} {monthName}, {year}
              </h3>

              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {daysArray.map((day, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg ${
                      day === date
                        ? "bg-purple-500 text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= BOTTOM SECTION ================= */}
          <div className="grid grid-cols-12 gap-6">

            {/* TOP COMPANIES */}
            <div className={`${cardStyle} col-span-12 xl:col-span-6`}>
              <h3 className="font-semibold mb-4">Top Performing Companies</h3>

              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={getTopCompaniesData()}
                  layout="vertical"
                  barCategoryGap="40%"
                  margin={{ top: 0, right: 10, left: 60, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="horizontalBarGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor="#2E1065" stopOpacity={1} />
                      <stop offset="100%" stopColor="#C084FC" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" fill="url(#horizontalBarGradient)" radius={[0,6,6,0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* MONTHLY */}
            <div className={`${cardStyle} col-span-12 xl:col-span-6`}>
              <h3 className="font-semibold mb-4">Monthly Activity</h3>
              <p className="text-sm text-gray-400 -mt-3 mb-4">Documents generated this month</p>

              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={getMonthlyData()} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#8B6CEB" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#8B6CEB" stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={true} horizontal={false} strokeDasharray="4 4" stroke="#e0e0e0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Area
                    dataKey="value"
                    stroke="#8B6CEB"
                    strokeWidth={2}
                    fill="url(#areaGradient)"
                    type="monotone"
                    dot={false}
                    label={{ position: "top", fontSize: 11, fill: "#8B6CEB", fontWeight: 500 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-8 flex-wrap">

              {/* Prev */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200
                           text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
                           transition-colors"
              >
                ← Prev
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`dots-${idx}`} className="px-2 py-1.5 text-gray-400 text-sm select-none">
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      page === currentPage
                        ? "bg-purple-500 text-white shadow-sm"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200
                           text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
                           transition-colors"
              >
                Next →
              </button>

              {/* Page info */}
              <span className="ml-3 text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AnalyticSection;