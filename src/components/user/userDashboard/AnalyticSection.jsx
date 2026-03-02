import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const COLORS = ["#15253F", "#2B3D5B", "#455C82", "#687C9F", "#E4E0FF"];

const donutData = [
  { name: "Salary Slips", value: 35 },
  { name: "Offer Letters", value: 23 },
  { name: "Experience", value: 20 },
  { name: "Relieving", value: 12 },
  { name: "Others", value: 10 },
];

const barData = [
  { time: "10 AM", value: 5 },
  { time: "11 AM", value: 12 },
  { time: "12 PM", value: 18 },
  { time: "1 PM", value: 14 },
  { time: "2 PM", value: 8 },
  { time: "3 PM", value: 13 },
  { time: "4 PM", value: 22 },
  { time: "5 PM", value: 17 },
  { time: "6 PM", value: 15 },
];

const monthlyData = [
  { month: "Jan", value: 60 },
  { month: "Feb", value: 65 },
  { month: "Mar", value: 70 },
  { month: "Apr", value: 62 },
  { month: "May", value: 50 },
  { month: "Jun", value: 60 },
  { month: "Jul", value: 80 },
  { month: "Aug", value: 79 },
  { month: "Sep", value: 77 },
  { month: "Oct", value: 70 },
  { month: "Nov", value: 45 },
  { month: "Dec", value: 40 },
];

const topCompaniesData = [
  { name: "Nimbja Security", value: 160 },
  { name: "Smart Software", value: 145 },
  { name: "Penta Software", value: 135 },
  { name: "Cubeage Tech", value: 120 },
  { name: "Quick Management", value: 105 },
];

const calendarDays = [
  27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
];
const getCalendarData = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based
  const date = today.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const daysArray = [];

  // Empty spaces before first day
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }

  // Actual days
  for (let d = 1; d <= totalDays; d++) {
    daysArray.push(d);
  }

  return { today, year, month, date, daysArray };
};
const cardStyle =
  "bg-white rounded-3xl p-3 border border-gray-100 shadow-[0px_12px_30px_rgba(0,0,0,0.06)]";

const AnalyticSection = () => {
  const { today, year, month, date, daysArray } = getCalendarData();

  const monthName = today.toLocaleString("default", { month: "long" });
  return (
    <div className="min-h-screen mt-3 font-inter">
      <h2 className="text-lg font-semibold text-gray-800 mb-5">
        <i class="fa-solid fa-chart-column mr-3"></i> Analytics
      </h2>

      {/* TOP ROW */}
      {/* <div className="grid grid-cols-12 gap-8 mb-10"> */}

      <div className="grid grid-cols-12 gap-6 mb-10 items-stretch">
        {/* DOCUMENT TYPES */}
        <div className={`${cardStyle} col-span-14 md:col-span-6 xl:col-span-3`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Document Types
          </h3>

          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={donutData}
                  innerRadius={70}
                  outerRadius={95}
                  dataKey="value"
                  stroke="none"
                  labelLine={false}
                  label={({ cx, cy, midAngle, outerRadius, percent }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius + 14;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#64748B"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                        className="text-xs font-semibold"
                      >
                        {(percent * 100).toFixed(0)}%
                      </text>
                    );
                  }}
                >
                  {donutData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-5 text-sm">
              {donutData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TODAY ACTIVITY */}
        {/* <div className={`${cardStyle} col-span-12 md:col-span-6 xl:col-span-6`}> */}
        <div
          className={`${cardStyle} col-span-12 md:col-span-6 xl:col-span-6 flex flex-col`}
        >
          <h3 className="text-lg mt-2 mb-2 font-semibold text-gray-800">
            Today's Activity
          </h3>
          <p className="text-sm text-gray-400 mb-10">
            Hourly document generation
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid stroke="#EAEAEA" vertical={false} />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />

              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0E145E" />
                  <stop offset="100%" stopColor="#B37BD6" />
                </linearGradient>
              </defs>

              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                barSize={18}
                fill="url(#barGradient)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CALENDAR */}
        <div className="col-span-12 md:col-span-12 xl:col-span-3">
          {/* DATE TITLE OUTSIDE CARD */}
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {date} {monthName}, {year}
          </h3>

          <div className={`${cardStyle} p-6`}>
            {/* Month Row */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-gray-800">
                {monthName} <span className="font-semibold">{year}</span>
              </span>
              <div className="text-gray-400 flex gap-4 cursor-pointer">
                <span>‹</span>
                <span>›</span>
              </div>
            </div>

            {/* Week Names */}
            <div className="grid grid-cols-7 text-xs text-gray-400 mb-4">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="text-center">
                  {d}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-2">
              {daysArray.map((day, index) => (
                <div
                  key={index}
                  className={`h-13 w-13 flex items-center justify-center rounded-lg text-sm
          ${
            day === date
              ? "bg-[#8B6CEB] text-white font-semibold"
              : day === null
                ? ""
                : "text-gray-700 hover:bg-gray-100 cursor-pointer"
          }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="grid grid-cols-12 gap-8">
        {/* TOP COMPANIES */}
        <div className="bg-white rounded-3xl p-8 col-span-12 xl:col-span-6 shadow-[0px_30px_60px_rgba(0,0,0,0.08)]">
          <h3 className="text-lg font-semibold text-gray-800 mb-8">
            Top Performing Companies
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topCompaniesData}
              layout="vertical"
              margin={{ top: 10, right: 20, bottom: 10 }}
            >
              <CartesianGrid stroke="#EAEAEA" horizontal={false} />

              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                width={150}
              />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[0, 12, 12, 0]}
                fill="url(#colorGradient)"
                barSize={34}
              />

              {/* Gradient Definition */}
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#393B8B" />
                  <stop offset="100%" stopColor="#B37BD6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* MONTHLY ACTIVITY */}
        <div className={`${cardStyle} col-span-12 xl:col-span-6`}>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Monthly Activity</h3>
            <span className="text-[#45556C] text-[14px] leading-[20px]">
              Documents generated this month
            </span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyData}>
              <CartesianGrid stroke="#EAEAEA" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8B6CEB"
                fill="#8B6CEB"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticSection;
