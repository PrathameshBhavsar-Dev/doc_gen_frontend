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
  "bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.06)] transition-all duration-300";

/* ================= COMPONENT ================= */
const AnalyticSection = () => {
  const { today, year, date, daysArray } = getCalendarData();
  const monthName = today.toLocaleString("default", { month: "long" });

  const [documents, setDocuments] = useState([]);

  // ── Pagination state ──────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [loading, setLoading] = useState(false);
  // ─────────────────────────────────────────────────────────────

  /* ================= API ================= */
  useEffect(() => {
    fetchDocuments(currentPage);
  }, [currentPage]);

  const fetchDocuments = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.apiget(`/documents/getalldoc?page=${page}`);

      // ── Adapt these lines to your actual response structure ──
      setDocuments(res.data?.data || res.data || []);
      setTotalPages(res.data?.totalPages || 1);
      setTotalDocs(res.data?.total || 0);
      // ─────────────────────────────────────────────────────────
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PAGINATION HELPERS ================= */
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const delta = 2; // pages shown around current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) range.unshift("...");
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
      SalarySlip: { value: 0, color: "#1a2f5e" },
      OfferLetter: { value: 0, color: "#2d4a8a" },
      AppointmentLetter: { value: 0, color: "#9896b8" },
      RelievingLetter: { value: 0, color: "#c8c4f0" },
      Others: { value: 0, color: "#e8e6f8" },
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
      SalarySlip: "Salary Slips",
      OfferLetter: "Offer Letters",
      AppointmentLetter: "Appointment Letter",
      RelievingLetter: "Relieving Letter",
      Others: "Others",
    };

    return Object.keys(buckets)
      .filter((key) => buckets[key].value > 0)
      .map((key) => ({
        name: labels[key],
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
        name: key.split(" ")[0],
        fullName: key,
        value: counts[key],
      }))
      .sort((a, b) => b.value - a.value);
  };

  /* ================= MONTHLY ================= */
  const getMonthlyData = () => {
    if (!Array.isArray(documents)) return [];

    const monthsOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const counts = {};
    monthsOrder.forEach((m) => (counts[m] = 0));

    documents.forEach((doc) => {
      const d = new Date(doc.createdAt);
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
      const d = new Date(doc.createdAt);
      const hour = d.getHours();

      const label =
        hour === 0
          ? "12 AM"
          : hour < 12
            ? `${hour} AM`
            : hour === 12
              ? "12 PM"
              : `${hour - 12} PM`;

      hours[label] = (hours[label] || 0) + 1;
    });

    return Object.keys(hours).map((key) => ({ time: key, value: hours[key] }));
  };

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen p-3 xs:p-4 sm:p-4 md:p-4 lg:p-1 font-inter bg-linear-to-br from-gray-50 via-gray-50 to-purple-50/30">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-3 mb-6 sm:mb-8">
        <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800">
          Analytics
        </h2>

        {/* Total docs badge */}
        {totalDocs > 0 && (
          <span className="text-xs xs:text-sm text-gray-500">
            Total documents:&nbsp;
            <span className="font-semibold text-gray-700">{totalDocs}</span>
          </span>
        )}
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="flex items-center justify-center py-8 sm:py-12">
          <div className="w-6 h-6 xs:w-8 xs:h-8 border-3 xs:border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
        </div>
      )}

      {!loading && (
        <>
          {/* ================= TOP SECTION ================= */}
          <div className="grid grid-cols-12 gap-3 xs:gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
            {/* DOCUMENT TYPES */}
            <div
              className={`${cardStyle} col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3`}
            >
              <h3 className="text-[15px] xs:text-base font-semibold mb-3 xs:mb-4">
                Document Types
              </h3>

              <ResponsiveContainer width="100%" height={180}>
                <PieChart margin={{ top: 20, right: 20, left: 20, bottom: 8 }}>
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
                          x={x}
                          y={y}
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
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-2 xs:gap-x-3 gap-y-1.5 xs:gap-y-2 mt-2 xs:mt-3">
                {getDonutData().map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 xs:gap-2"
                  >
                    <span
                      className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-[11px] xs:text-xs text-gray-600 truncate">
                      {entry.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* TODAY ACTIVITY */}
            <div
              className={`${cardStyle} col-span-12 sm:col-span-6 lg:col-span-8 xl:col-span-6`}
            >
              <h3 className="text-[15px] xs:text-base font-semibold mb-10 xs:mb-8">
                Today's Activity
              </h3>

              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={getTodayHourlyData()} barCategoryGap="40%">
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#B37BD6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#393B8B" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="url(#barGradient)"
                    radius={[6, 6, 0, 0]}
                    barSize={18}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* CALENDAR */}
            <div
              className={`${cardStyle} col-span-12 sm:col-span-6 lg:col-span-12 xl:col-span-3`}
            >
              <h3 className="text-[16px] xs:text-base font-semibold mb-3 xs:mb-4">
                {date} {monthName}, {year}
              </h3>

              <div className="grid grid-cols-7 gap-1 xs:gap-1.5 text-center mb-2 xs:mb-3">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div
                    key={i}
                    className="text-gray-500 font-medium text-[14px] xs:text-xs"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 xs:gap-1.5 text-center">
                {daysArray.map((day, i) => (
                  <div
                    key={i}
                    className={`p-1.5 xs:p-2 rounded text-[13px] xs:text-xs font-medium transition-colors ${
                      day === date
                        ? "bg-[#8965BD] text-white font-semibold"
                        : day
                          ? "text-gray-700 hover:bg-gray-100 cursor-pointer rounded-lg"
                          : "text-gray-300"
                    }`}
                  >
                    {day || ""}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= BOTTOM SECTION ================= */}
          <div className="grid grid-cols-12 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
            {/* TOP COMPANIES */}
            <div className={`${cardStyle} col-span-12 lg:col-span-6`}>
              <h3 className="text-[15px] xs:text-base font-semibold mb-3 xs:mb-4">
                Top Performing Companies
              </h3>

              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={getTopCompaniesData()}
                  layout="vertical"
                  barCategoryGap="40%"
                  margin={{ top: 0, right: 10, left: 60, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="horizontalBarGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#393B8B" stopOpacity={1} />
                      <stop offset="100%" stopColor="#B37BD6" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="url(#horizontalBarGradient)"
                    radius={[0, 6, 6, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* MONTHLY */}
            <div className={`${cardStyle} col-span-12 lg:col-span-6`}>
              <h3 className="text-[15px] xs:text-base font-semibold mb-2 xs:mb-3">
                Monthly Activity
              </h3>
              <p className="text-[13px] xs:text-xs text-gray-400 mb-3 xs:mb-4">
                Documents generated this month
              </p>

              <ResponsiveContainer width="100%" height={240}>
                <AreaChart
                  data={getMonthlyData()}
                  margin={{ top: 20, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="areaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#B37BD6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#393B8B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    vertical={true}
                    horizontal={false}
                    strokeDasharray="4 4"
                    stroke="#e0e0e0"
                  />
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
                    label={{
                      position: "top",
                      fontSize: 11,
                      fill: "#8B6CEB",
                      fontWeight: 500,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 xs:gap-1.5 mt-8 sm:mt-10 md:mt-12 flex-wrap col-span-12">
              {/* Prev */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 xs:px-3 py-1 xs:py-1.5 rounded text-xs xs:text-sm font-medium border border-gray-200
                           text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
                           transition-colors"
              >
                ← Prev
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`dots-${idx}`}
                    className="px-1 xs:px-2 py-1 xs:py-1.5 text-gray-400 text-xs xs:text-sm select-none"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-8 h-8 xs:w-9 xs:h-9 rounded text-xs xs:text-sm font-medium transition-colors ${
                      page === currentPage
                        ? "bg-purple-500 text-white shadow-sm"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              {/* Next */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 xs:px-3 py-1 xs:py-1.5 rounded text-xs xs:text-sm font-medium border border-gray-200
                           text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
                           transition-colors"
              >
                Next →
              </button>

              {/* Page info */}
              <span className="ml-2 xs:ml-3 text-xs xs:text-sm text-gray-400">
                Pg {currentPage}/{totalPages}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AnalyticSection;
