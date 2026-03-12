import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Briefcase,
  Wallet,
  CheckCircle,
  TrendingUp,
  HandCoins,
  Award,
  ClipboardList,
  GraduationCap,
  LogOut,
} from "lucide-react";

// ✅ docTypeId matches the IDs in mockData documentTypes
const documents = [
  {
    id: 1,
    docTypeId: 2,   // Offer Letter → mockData id: 2
    title: "Offer Letter",
    description: "Generate offer letters with PF details",
    icon: FileText,
    hasPFToggle: true,
  },
  {
    id: 2,
    docTypeId: 3,   // Appointment Letter → mockData id: 3
    title: "Appointment Letter",
    description: "Create appointment letters with terms",
    icon: Briefcase,
    hasPFToggle: true,
  },
  {
    id: 3,
    docTypeId: 1,   // Salary Slip → mockData id: 1
    title: "Salary Slip",
    description: "Generate monthly salary slips with PF",
    icon: Wallet,
    hasPFToggle: true,
  },
  {
    id: 4,
    docTypeId: 17,  // Confirmation Letter → mockData id: 17
    title: "Confirmation Letter",
    description: "Generate employment confirmations",
    icon: CheckCircle,
    hasPFToggle: true,
  },
  {
    id: 5,
    docTypeId: 7,   // Increment Letter → mockData id: 7
    title: "Increment Letter",
    description: "Create salary increment letters",
    icon: TrendingUp,
    hasPFToggle: true,
  },
  {
    id: 6,
    docTypeId: 16,  // Full & Final → mockData id: 16
    title: "Full & Final Settlement",
    description: "Create full and final settlement letters",
    icon: HandCoins,
    hasPFToggle: true,
  },
  {
    id: 7,
    docTypeId: 4,   // Experience Letter → mockData id: 4
    title: "Experience Letter",
    description: "Issue experience certificates",
    icon: Award,
    hasPFToggle: false,
  },
  {
    id: 8,
    docTypeId: 12,  // Completion Letter → mockData id: 12
    title: "Completion Letter",
    description: "Generate completion letter",
    icon: ClipboardList,
    hasPFToggle: false,
  },
  {
    id: 9,
    docTypeId: 11,  // Internship Certificate → mockData id: 11
    title: "Internship Certificate",
    description: "Issue internship offer letters",
    icon: GraduationCap,
    hasPFToggle: false,
  },
  {
    id: 10,
    docTypeId: 5,   // Relieving Letter → mockData id: 5
    title: "Relieving Letter",
    description: "Generate relieving letters",
    icon: LogOut,
    hasPFToggle: false,
  },
];

/* ========================= */
/*          Toggle           */
/* ========================= */
const Toggle = ({ enabled, onToggle }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors 
                duration-200 focus:outline-none 
                ${enabled ? "bg-[#61489A]" : "bg-gray-300"}`}
  >
    <span
      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow 
                  transition-transform duration-200 
                  ${enabled ? "translate-x-5" : "translate-x-1"}`}
    />
  </button>
);

/* ========================= */
/*       Document Card       */
/* ========================= */
const DocumentCard = ({ doc, onClick }) => {
  const [pfEnabled, setPfEnabled] = useState(false);
  const Icon = doc.icon;

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col bg-white gap-3 rounded-2xl border p-3 sm:p-4 cursor-pointer
                  transition-all duration-300 ease-in-out shadow-lg
                  hover:border-[#B37BD6] hover:-translate-y-1 hover:bg-purple-50
                  hover:shadow-[#B37BD6] bg-[#FFFEF8]
                  ${doc.highlighted ? "border-purple-300" : "border-gray-200"}`}
    >
      {/* Top row: icon + toggle */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center
                        rounded-xl bg-[#61489A]">
          <Icon className="text-white" size={18} />
        </div>

        {/* {doc.hasPFToggle && (
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] sm:text-xs text-[#61489A] whitespace-nowrap">
              PF/without PF
            </span>
            <Toggle
              enabled={pfEnabled}
              onToggle={() => setPfEnabled(!pfEnabled)}
            />
          </div>
        )} */}
      </div>

      {/* Title */}
      <h3 className="text-xs sm:text-sm font-semibold text-black leading-snug">
        {doc.title}
      </h3>

      {/* Description */}
      <p className="text-[11px] sm:text-[12px] text-gray-500 leading-relaxed">
        {doc.description}
      </p>
    </div>
  );
};

/* ========================= */
/*      Document Section     */
/* ========================= */
const DocumentSection = () => {
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
    <div className="w-full py-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            onClick={() => handleCardClick(doc)}
          />
        ))}
      </div>
      {/* ✅ Test button removed */}
    </div>
  );
};

export default DocumentSection;