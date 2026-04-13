import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiEdit, FiFileText } from "react-icons/fi";
import { documentTypes } from "../../components/constant/publicData/mockData";

const UserEmployeeDocumentsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedDocs, setSelectedDocs] = useState([]);
  const isMultiSelect = selectedDocs.length > 1;

  if (!state) return <div className="p-6">No data found</div>;

  const excludedDocIds = [6, 8, 9, 10, 13, 14, 15];

  const filteredDocuments = documentTypes.filter(
    (doc) => !excludedDocIds.includes(doc.id),
  );

  const docs = filteredDocuments.map((doc, index) => ({
    id: doc.id,
    name: doc.name,
    status: index % 2 === 0 ? "Generated" : "Pending",
    createdAt: index % 2 === 0 ? "12 Feb 2026" : "-",
    // payment: index % 2 === 0 ? "Paid" : "Pending",
  }));

  // ✅ Toggle single doc
  const toggleDoc = (id) => {
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  };

  // ✅ Select All
  const allSelected = selectedDocs.length === docs.length;

  const toggleAll = () => {
    setSelectedDocs(allSelected ? [] : docs.map((d) => d.id));
  };

  return (
    <div
      className="
min-h-screen 

 relative
"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#6366F1]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#A78BFA]/10 blur-[120px] rounded-full"></div>

      <div className="max-w-[1350px] mx-auto px-4 flex flex-col gap-6 relative">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-white/50 transition"
            >
              <FiArrowLeft />
            </button>

            <div>
              <h2 className="text-[20px] font-semibold text-[#1E293B]">
                {state.fullName || state.name}
              </h2>
              <p className="text-[14px] text-[#64748B]">{state.company}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl bg-white/70 backdrop-blur text-[14px] flex items-center gap-1 shadow-sm hover:shadow transition">
              <FiEdit /> Edit
            </button>

            <button
              disabled={selectedDocs.length === 0}
              onClick={() => {
                console.log("Generate docs:", selectedDocs);
              }}
              className={`
                px-4 py-2 rounded-xl text-[14px] flex items-center gap-1 transition
                ${
                  selectedDocs.length === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#0E145E] to-[#B37BD6] text-white shadow-md hover:shadow-lg"
                }
              `}
            >
              <FiFileText />
              Generate {selectedDocs.length > 0 && `(${selectedDocs.length})`}
            </button>
          </div>
        </div>

        {/* PROFILE SECTION */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-[0_10px_40px_rgba(99,102,241,0.08)]">
          <h3 className="text-[15px] font-semibold text-[#1e208e] uppercase mb-5">
            Profile Information
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-7 gap-x-12">
            {[
              { label: "Full Name", value: state.fullName || state.name },
              { label: "Email", value: state.email },
              { label: "Mobile", value: state.mobile },
              { label: "PAN", value: state.pan },
              { label: "DOB", value: state.dob },
              { label: "Department", value: state.department },
              { label: "Joining Date", value: state.joiningDate },
              { label: "CTC", value: state.currentCTC },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[12px] text-[#64748B]">{item.label}</p>
                <p className="text-[15px] font-medium text-[#1E293B]">
                  {item.value || "-"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DOCUMENT SECTION */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-[0_10px_40px_rgba(99,102,241,0.08)]">
          {/* TOP BAR */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[15px] font-semibold text-[#1e208e] uppercase">
              Documents
            </h3>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleAll}
                className="text-[13px] text-[#1e208e] font-medium hover:underline"
              >
                {allSelected ? "Unselect All" : "Select All"}
              </button>

              <p className="text-[13px] text-[#64748B]">
                {docs.filter((d) => d.status === "Generated").length} /{" "}
                {docs.length}
              </p>
            </div>
          </div>

          {/* DOCUMENT GRID (NO SCROLL) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {docs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => toggleDoc(doc.id)}
                className={`
                  group relative flex flex-col justify-between
                  p-6 rounded-r-2xl cursor-pointer
                  backdrop-blur-xl
                  transition-all duration-300
                  ${
                    selectedDocs.includes(doc.id)
                      ? "bg-[#EEF2FF] border border-[#6366F1]"
                      : "bg-gradient-to-br from-[#EEF2FF]/70 via-[#F8FAFF] to-[#FAF5FF]/70"
                  }
                  shadow-[0_4px_15px_rgba(99,102,241,0.08)]
                  hover:shadow-[0_10px_30px_rgba(99,102,241,0.18)]
                  hover:-translate-y-[4px]
                `}
              >
                {/* CHECKBOX */}
                <div className="absolute top-3 right-3">
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes(doc.id)}
                    onChange={() => toggleDoc(doc.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-4 h-4 accent-[#222476] cursor-pointer"
                  />
                </div>

                {/* ACCENT */}
                <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-[#6366F1] to-[#A78BFA]"></div>

                <div className="pl-3">
                  <p className="text-[15px] font-semibold text-[#1E293B]">
                    {doc.name}
                  </p>

                  <div className="flex flex-col gap-1 mt-3 text-[13px] text-[#64748B]">
                    <span>Created: {doc.createdAt}</span>
                    {/* <span>Payment: {doc.payment}</span> */}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pl-3">
                  <span
                    className={`
                      text-[12px] px-3 py-[5px] rounded-full font-medium
                      ${
                        doc.status === "Generated"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {doc.status}
                  </span>

                  <button
                    disabled={isMultiSelect}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isMultiSelect) return;
                      console.log(
                        doc.status === "Generated" ? "View" : "Generate",
                      );
                    }}
                    className={`
    text-[14px] font-semibold transition
    ${
      isMultiSelect
        ? "text-gray-400 cursor-not-allowed"
        : "text-[#373891] hover:underline"
    }
  `}
                  >
                    {doc.status === "Generated" ? "View" : "Generate"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedDocs.length > 1 && (
        <div
          className="
    fixed bottom-6 right-6
    bg-white/80 backdrop-blur-xl
    border border-[#E2E8F0]
    shadow-xl
    px-5 py-3 rounded-xl
    flex items-center gap-4
  "
        >
          <span className="text-[13px] text-[#475569]">
            {selectedDocs.length} selected
          </span>

          {/* VIEW BUTTON (only if all selected are generated) */}
          <button
            disabled={
              !selectedDocs.every((id) => {
                const doc = docs.find((d) => d.id === id);
                return doc.status === "Generated";
              })
            }
            className={`
        px-3 py-1.5 rounded-lg text-sm font-medium transition
        ${
          selectedDocs.every((id) => {
            const doc = docs.find((d) => d.id === id);
            return doc.status === "Generated";
          })
            ? "bg-[#EEF2FF] text-[#2e2f85] hover:bg-[#E0E7FF]"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }
      `}
          >
            View
          </button>

          {/* GENERATE BUTTON (only if pending exists) */}
          <button
            disabled={
              !selectedDocs.some((id) => {
                const doc = docs.find((d) => d.id === id);
                return doc.status !== "Generated";
              })
            }
            className={`
        px-4 py-1.5 rounded-lg text-sm font-medium transition
        ${
          selectedDocs.some((id) => {
            const doc = docs.find((d) => d.id === id);
            return doc.status !== "Generated";
          })
            ? "bg-gradient-to-r from-[#2e2f85] to-[#A78BFA] text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }
      `}
          >
            Generate
          </button>
        </div>
      )}
    </div>
  );
};

export default UserEmployeeDocumentsPage;
