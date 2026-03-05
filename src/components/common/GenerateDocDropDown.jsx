import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  { id: 1, docTypeId: 2, title: "Offer Letter", hasPF: true, icon: FileText, bg: "bg-blue-500" },
  { id: 2, docTypeId: 3, title: "Appointment Letter", hasPF: true, icon: Briefcase, bg: "bg-purple-500" },
  { id: 3, docTypeId: 1, title: "Salary Slip", hasPF: true, icon: Receipt, bg: "bg-green-500" },
  { id: 4, docTypeId: 7, title: "Increment Letter", hasPF: true, icon: TrendingUp, bg: "bg-teal-400" },
  { id: 5, docTypeId: 17, title: "Confirmation Letter", hasPF: true, icon: CheckCircle, bg: "bg-indigo-500" },
  { id: 6, docTypeId: 16, title: "Full & Final Settlement", hasPF: true, icon: DollarSign, bg: "bg-pink-500" },
  { id: 7, docTypeId: 4, title: "Experience Letter", hasPF: false, icon: Award, bg: "bg-orange-500" },
  { id: 8, docTypeId: 5, title: "Relieving Letter", hasPF: false, icon: LogOut, bg: "bg-red-500" },
  { id: 9, docTypeId: 11, title: "Internship Letter", hasPF: false, icon: GraduationCap, bg: "bg-yellow-500" },
  { id: 10, docTypeId: 12, title: "Completion Certificate", hasPF: false, icon: ClipboardList, bg: "bg-teal-500" },
];

const GenerateDocDropDown = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // ✅ Uses doc.docTypeId to match correct mockData documentType
  const handleCardClick = (doc) => {
    navigate("/document/create", {
      state: {
        documentType: doc.docTypeId,
      },
    });
  };


  return (
    <div className="w-64 bg-white rounded-2xl border border-gray-100 overflow-hidden inset-shadow-sm">
      <div className="flex flex-col divide-y divide-gray-100">
        {docItems.map((item) => {
          const Icon = item.icon;
          const isSelected = selected === item.id;

          return (
            <div
              key={item.id}
              // onClick={() => setSelected(item.id)}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-all duration-200 
                ${isSelected ? "bg-purple-50" : "hover:bg-gray-50"}`}
              item={item}
              onClick={() => handleCardClick(item)}
            >
              {/* Icon */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.bg}`}
              >
                <Icon size={18} className="text-white" />
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">{item.title}</span>
                {item.hasPF && (
                  <span className="text-xs text-purple-500 font-medium">Includes PF</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenerateDocDropDown;