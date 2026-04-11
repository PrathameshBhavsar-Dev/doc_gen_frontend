import React, { useMemo, useState } from "react";
import { Search, Download, Eye, Calendar, Building2, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../core/constants/routes.constant";

const data = [
  { name: "Rahul Sharma", id: "EMP001", company: "Nimbja Security", generatedBy: "Aditi Khade", date: "Feb 15, 2026", status: "Completed", size: "245 KB" },
  { name: "Rahul Sharma", id: "EMP002", company: "Pento Software", generatedBy: "Aditi Khade", date: "Feb 14, 2026", status: "Completed", size: "189 KB" },
  { name: "Amit Kumar", id: "EMP003", company: "Quick Management", generatedBy: "Aditi Khade", date: "Feb 13, 2026", status: "Pending", size: "267 KB" },
  { name: "Sneha Reddy", id: "EMP004", company: "Smart Software", generatedBy: "Aditi Khade", date: "Feb 12, 2026", status: "Completed", size: "198 KB" },
  { name: "Vikram Singh", id: "EMP005", company: "Cubeage Tech", generatedBy: "Aditi Khade", date: "Feb 11, 2026", status: "Pending", size: "212 KB" },
];

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium ${
        status === "Completed"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {status}
    </span>
  );
};

const EmployeeRow = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.USER_EMPLOYEE_DOCUMENTS, { state: item });
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.01] transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="bg-indigo-100 p-3 rounded-lg">
          <User2 className="text-indigo-600" size={18} />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{item.name}</p>
          <p className="text-xs text-gray-500">{item.size}</p>
        </div>
      </div>

      <div className="hidden md:block text-sm text-gray-600">{item.id}</div>

      <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
        <Building2 size={14} /> {item.company}
      </div>

      <div className="hidden lg:block text-sm text-gray-600">{item.generatedBy}</div>

      <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600">
        <Calendar size={14} /> {item.date}
      </div>

      <StatusBadge status={item.status} />

      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
      >
        <Eye size={16} />
      </button>
    </div>
  );
};

const UserEmployeePage = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return data.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.id.toLowerCase().includes(search.toLowerCase()) ||
        d.company.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Employee Profiles</h1>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-500">
            <Download size={16} /> Export All
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-md mb-6 space-y-4">
          <div className="flex items-center gap-3 border rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, company..."
              className="w-full outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {["Document Type", "Company", "Month", "Year", "Date"].map((f, i) => (
              <select
                key={i}
                className="border rounded-lg px-3 py-2 text-sm text-gray-600"
              >
                <option>{f}</option>
              </select>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filtered.map((item, i) => (
            <EmployeeRow key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserEmployeePage;
