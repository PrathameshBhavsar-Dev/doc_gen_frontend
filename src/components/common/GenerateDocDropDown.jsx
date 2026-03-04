import React, { useState } from "react";
import {
  FileText,
  Briefcase,
  Receipt,
  TrendingUp,
  CheckCircle,
  DollarSign,
  Award,
  LogOut,
  GraduationCap,
  ClipboardList,
} from "lucide-react";

const docItems = [
  { id: 1, title: "Offer Letter", hasPF: true, icon: FileText, bg: "bg-blue-500" },
  { id: 2, title: "Appointment Letter", hasPF: true, icon: Briefcase, bg: "bg-purple-500" },
  { id: 3, title: "Salary Slip", hasPF: true, icon: Receipt, bg: "bg-green-500" },
  { id: 4, title: "Increment Letter", hasPF: true, icon: TrendingUp, bg: "bg-teal-400" },
  { id: 5, title: "Confirmation Letter", hasPF: true, icon: CheckCircle, bg: "bg-indigo-500" },
  { id: 6, title: "Full & Final Settlement", hasPF: true, icon: DollarSign, bg: "bg-pink-500" },
  { id: 7, title: "Experience Letter", hasPF: false, icon: Award, bg: "bg-orange-500" },
  { id: 8, title: "Relieving Letter", hasPF: false, icon: LogOut, bg: "bg-red-500" },
  { id: 9, title: "Internship Letter", hasPF: false, icon: GraduationCap, bg: "bg-yellow-500" },
  { id: 10, title: "Completion Certificate", hasPF: false, icon: ClipboardList, bg: "bg-teal-500" },
];

const GenerateDocDropDown = ({ onClose, compact }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden inset-shadow-sm
    ${compact ? "w-20" : "w-64"}
  `}
>
      <div className="flex flex-col divide-y divide-gray-100">
        {docItems.map((item) => {
          const Icon = item.icon;
          const isSelected = selected === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-all duration-200 
                ${isSelected ? "bg-purple-50" : "hover:bg-gray-50"}`}
            >
              {/* Icon */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.bg}`}
              >
                <Icon size={18} className="text-white" />
              </div>

              {/* Text */}
              {/* Text */}
{!compact && (
  <div className="flex flex-col">
    <span className="text-sm font-semibold text-gray-800">
      {item.title}
    </span>
    {item.hasPF && (
      <span className="text-xs text-purple-500 font-medium">
        Includes PF
      </span>
    )}
  </div>
)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenerateDocDropDown;


