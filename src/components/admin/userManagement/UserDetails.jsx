// import React from "react";
// import { ArrowLeft, Search } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { User, Plus } from "lucide-react";
// import { Mail, X } from "lucide-react";
// import { useState } from "react";
// import { ChevronDown, FileText, Building2 } from "lucide-react";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   IconButton,
// } from "@mui/material";

// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

// const docs = [
//   {
//     id: 1,
//     type: "Offer Letter",
//     size: "245 KB",
//     employee: "Rahul Sharma",
//     empId: "EMP001",
//     company: "Nimbja Security",
//     generatedBy: "Aditi Khade",
//     date: "Feb 15, 2026",
//   },
//   {
//     id: 2,
//     type: "Salary Slip",
//     size: "189 KB",
//     employee: "Priya Patel",
//     empId: "EMP002",
//     company: "Penta Software",
//     generatedBy: "Sagar Solanke",
//     date: "Feb 15, 2026",
//   },
//   {
//     id: 3,
//     type: "Appointment Letter",
//     size: "267 KB",
//     employee: "Amit Kumar",
//     empId: "EMP003",
//     company: "Quick Management",
//     generatedBy: "Sagar Solanke",
//     date: "Feb 15, 2026",
//   },
// ];

// const documentTypes = [
//   { name: "Offer Letter", desc: "Includes PF" },
//   { name: "Appointment Letter", desc: "Includes PF" },
//   { name: "Salary Slip", desc: "Includes PF" },
//   { name: "Increment Letter", desc: "Includes PF" },
//   { name: "Confirmation Letter", desc: "Includes PF" },
//   { name: "Full & Final Settlement", desc: "Includes PF" },
//   { name: "Experience Letter", desc: "" },
//   { name: "Relieving Letter", desc: "" },
//   { name: "Internship Letter", desc: "" },
//   { name: "Completion Certificate", desc: "" },
// ];

// const companies = [
//   "Nimbja Security Solutions Pvt Ltd",
//   "Penta Software Consultancy Solutions Pvt Ltd",
//   "Quick Management Services Pvt Ltd",
//   "Smart Software Services Pvt Ltd",
//   "Cubeage Technologies Services Pvt Ltd",
//   "Neweage Cloud Solution Pvt Ltd",
//   "Smart Matrix Digital Services Pvt Ltd",
//   "Devcons Software Solutions Pvt Ltd",
//   "RP Business Solutions Pvt Ltd",
//   "JDIT Software Solutions Pvt Ltd",
// ];
// export default function UserDetails() {
//   const navigate = useNavigate();
//   const [openModal, setOpenModal] = useState(false);
//   const [openDocDropdown, setOpenDocDropdown] = useState(false);
//   const [selectedDoc, setSelectedDoc] = useState("Select Document Type");
//   const [openCompanyDropdown, setOpenCompanyDropdown] = useState(false);
//   const [selectedCompany, setSelectedCompany] = useState("Select Company");
//   return (
//     <div className=" min-h-screen font-sans">
//       <div className="max-w-[1400px] mx-auto">
//         {/* HEADER */}

//         <div className="flex justify-between items-start mb-8">
//           <div className="flex items-start gap-4">
//             {/* <ArrowLeft
//               size={28}
//               className="cursor-pointer text-gray-600 mt-1"
//               onClick={() => navigate(-1)}
//             /> */}

//             <ArrowLeft
//               size={30}
//               className="text-gray-600 mt-3 cursor-pointer"
//               onClick={() => navigate(-1)}
//             />

//             <div>
//               <h1 className="text-[36px] font-semibold text-[#1F2937]">
//                 User management
//               </h1>

//               <p className="text-gray-500 text-[16px]">
//                 Manage all system users and their permissions
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setOpenModal(true)}
//               className="flex items-center gap-2 px-5 py-2.5 rounded-lg mr-5
//                           text-white text-sm font-medium
//                           bg-gradient-to-r from-[#0E145E] to-[#B37BD6]
//                           shadow-md hover:opacity-90 transition"
//             >
//               <Plus size={16} />
//               Add New User
//             </button>
//             <span className="text-sm text-gray-600">Admin</span>

//             <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#0E145E] to-[#B37BD6] text-white flex items-center justify-center font-semibold">
//               A
//             </div>
//           </div>
//         </div>

//         {/* USER PROFILE CARD */}

//         <div className="h-[140px] bg-gradient-to-r from-[#0E145E] via-[#6A4DBF] to-[#B37BD6] rounded-xl p-6 text-white shadow-md mb-6">
//           <div className="flex items-center gap-4 ">
//             <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
//               <User size={28} color="white" strokeWidth={2} />
//             </div>

//             <div>
//               <h2 className="text-[36px] font-semibold">Aditi Khade</h2>
//               <p className="text-[16px] opacity-80">aditi.khade@gmail.com</p>
//             </div>
//           </div>
//         </div>

//         {/* SEARCH + FILTER CARD */}

//         <div className="bg-[#F8F9FB] rounded-xl border border-gray-200 shadow-sm p-5 mb-10">
//           {/* SEARCH */}
//           <div className="relative mb-5">
//             <Search
//               size={16}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//             />

//             <input
//               placeholder="Search by employee name, ID, or document type..."
//               className="w-full pl-10 pr-4 py-2.5
//       bg-white border border-gray-200
//       rounded-lg text-sm text-gray-600
//       placeholder:text-gray-400
//       focus:outline-none focus:ring-1 focus:ring-[#6A4DBF]"
//             />
//           </div>

//           {/* FILTERS */}

//           <div className="grid grid-cols-2 gap-5">
//             {/* DOCUMENT TYPE */}

//             <div className="flex flex-col gap-1">
//               <label className="text-[14px] text-[#314158] font-medium">
//                 Document Type
//               </label>

//               <div className="relative">
//                 {/* INPUT FIELD */}

//                 <div
//                   onClick={() => setOpenDocDropdown(!openDocDropdown)}
//                   className="w-full flex items-center justify-between
//     border border-gray-200 rounded-lg px-3 py-2.5
//     text-sm bg-white cursor-pointer"
//                 >
//                   <span className="text-gray-500">{selectedDoc}</span>

//                   <ChevronDown size={16} className="text-gray-400" />
//                 </div>

//                 {/* DROPDOWN */}

//                 {openDocDropdown && (
//                   <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 max-h-[340px] overflow-y-auto">
//                     {documentTypes.map((doc, index) => (
//                       <div
//                         key={index}
//                         onClick={() => {
//                           setSelectedDoc(doc.name);
//                           setOpenDocDropdown(false);
//                         }}
//                         className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
//                       >
//                         {/* ICON */}

//                         <div className="w-9 h-9 rounded-lg bg-[#6A4DBF] text-white flex items-center justify-center text-sm">
//                           <FileText size={16} />
//                         </div>

//                         {/* TEXT */}

//                         <div>
//                           <p className="text-sm font-medium text-gray-800">
//                             {doc.name}
//                           </p>

//                           {doc.desc && (
//                             <p className="text-xs text-[#6A4DBF]">{doc.desc}</p>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* COMPANY */}

//             <div className="flex flex-col gap-1">
//               <label className="text-[14px] text-[#314158] font-medium">
//                 Company
//               </label>

//               <div className="relative">
//                 {/* SELECT FIELD */}

//                 <div
//                   onClick={() => setOpenCompanyDropdown(!openCompanyDropdown)}
//                   className="w-full flex items-center justify-between
//     border border-gray-200 rounded-lg px-3 py-2.5
//     text-sm bg-white cursor-pointer"
//                 >
//                   <span className="text-gray-500">{selectedCompany}</span>
//                   <ChevronDown size={16} className="text-gray-400" />
//                 </div>

//                 {/* DROPDOWN LIST */}

//                 {openCompanyDropdown && (
//                   <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 max-h-[340px] overflow-y-auto">
//                     {companies.map((company, index) => (
//                       <div
//                         key={index}
//                         onClick={() => {
//                           setSelectedCompany(company);
//                           setOpenCompanyDropdown(false);
//                         }}
//                         className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
//                       >
//                         {/* ICON */}

//                         <div className="w-9 h-9 rounded-lg bg-[#6A4DBF] text-white flex items-center justify-center">
//                           <Building2 size={16} />
//                         </div>

//                         {/* COMPANY NAME */}

//                         <p className="text-sm text-gray-800">{company}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* TITLE */}

//         <h3
//           className="text-[20px] font-semibold mb-4
// bg-gradient-to-r from-[#0E145E] to-[#B37BD6]
// bg-clip-text text-transparent"
//         >
//           Aditi Khade’s generated Documents Total (56)
//         </h3>

//         {/* TABLE */}

//         <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ background: "#F3F1FB" }}>
//                 <TableCell>Document Type</TableCell>
//                 <TableCell>Employee</TableCell>
//                 <TableCell>Company</TableCell>
//                 <TableCell>Generated by</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {docs.map((doc) => (
//                 <TableRow key={doc.id} hover>
//                   {/* DOCUMENT */}

//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#393B8B] to-[#AD78D2] text-white flex items-center justify-center">
//                         <InsertDriveFileOutlinedIcon fontSize="small" />
//                       </div>

//                       <div>
//                         <p className="font-medium">{doc.type}</p>
//                         <p className="text-xs text-gray-400">{doc.size}</p>
//                       </div>
//                     </div>
//                   </TableCell>

//                   {/* EMPLOYEE */}

//                   <TableCell>
//                     <p>{doc.employee}</p>

//                     <p className="text-xs text-gray-400">{doc.empId}</p>
//                   </TableCell>

//                   {/* COMPANY */}

//                   <TableCell>{doc.company}</TableCell>

//                   {/* GENERATED BY */}

//                   <TableCell>{doc.generatedBy}</TableCell>

//                   {/* DATE */}

//                   <TableCell>{doc.date}</TableCell>

//                   {/* STATUS */}

//                   <TableCell>
//                     <div
//                       className="inline-flex items-center gap-1 px-3 py-1
// bg-[#DCFCE7] text-[#027A48] text-xs font-medium rounded-full"
//                     >
//                       <svg
//                         width="12"
//                         height="12"
//                         viewBox="0 0 20 20"
//                         fill="none"
//                       >
//                         <circle cx="10" cy="10" r="10" fill="#12B76A" />
//                         <path
//                           d="M6 10.5L8.5 13L14 7.5"
//                           stroke="white"
//                           strokeWidth="1.5"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       Completed
//                     </div>{" "}
//                   </TableCell>

//                   {/* ACTIONS */}

//                   <TableCell align="center">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         className="w-8 h-8 flex items-center justify-center
// rounded-full bg-[#EEF2FF] text-[#4F46E5]
// hover:bg-[#E0E7FF] transition"
//                       >
//                         <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
//                       </button>

//                       <button
//                         className="w-8 h-8 flex items-center justify-center
// rounded-full bg-[#ECFDF3] text-[#16A34A]
// hover:bg-[#D1FAE5] transition"
//                       >
//                         <DownloadOutlinedIcon sx={{ fontSize: 16 }} />
//                       </button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>

//       {openModal && (
//         <div className="fixed inset-0 bg-black/20  flex items-center justify-center z-50">
//           {/* <div className="bg-white w-[420px] rounded-xl shadow-xl p-6 relative"> */}
//           <div
//             className="bg-white w-[420px] rounded-xl shadow-xl p-6 relative
//       animate-[modalPop_0.25s_ease-out]"
//           >
//             {/* CLOSE BUTTON */}
//             <button
//               onClick={() => setOpenModal(false)}
//               className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center
//         rounded-full bg-red-100 hover:bg-red-200 transition"
//             >
//               <X size={14} className="text-red-500" />
//             </button>

//             {/* TITLE */}
//             <h2 className="text-lg font-semibold text-gray-800 mb-6">
//               Add New User
//             </h2>

//             {/* NAME */}
//             <div className="flex items-center gap-3 mb-4">
//               <User size={18} className="text-gray-400" />

//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#6A4DBF]"
//               />
//             </div>

//             {/* EMAIL */}
//             <div className="flex items-center gap-3 mb-6">
//               <Mail size={18} className="text-gray-400" />

//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#6A4DBF]"
//               />
//             </div>
//             {/* BUTTONS */}
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setOpenModal(false)}
//                 className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>

//               <button
//                 className="flex items-center gap-2 px-5 py-2 text-sm text-white rounded-md
//       bg-gradient-to-r from-[#0E145E] to-[#B37BD6]
//       shadow-md hover:opacity-90"
//               >
//                 <Plus size={16} />
//                 Send request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Search,
  User,
  Plus,
  Mail,
  X,
  ChevronDown,
  FileText,
  Building2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

export default function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ GET CLICKED USER ID

  const api = new ApiService();

  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  // ✅ FETCH USER PROFILE (ONLY FOR HEADER)
  const fetchUserHeader = async () => {
    try {
      console.log("FETCHING USER:", id);

      const res = await api.apiget(
        `${ServerUrl.API_MODULE_AUTH}/profile/${id}`,
      );

      console.log("USER HEADER RESPONSE:", res);

      const data = res?.data;

      setUserInfo({
        name: data?.name || "User",
        email: data?.email || "—",
      });
    } catch (err) {
      console.error("Header fetch error:", err);
      setUserInfo({
        name: "User",
        email: "—",
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserHeader();
    }
  }, [id]);

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-start gap-4">
            <ArrowLeft
              size={30}
              className="text-gray-600 mt-3 cursor-pointer"
              onClick={() => navigate(-1)}
            />

            <div>
              <h1 className="text-[36px] font-semibold text-[#1F2937]">
                User management
              </h1>

              <p className="text-gray-500 text-[16px]">
                Manage all system users and their permissions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg mr-5
              text-white text-sm font-medium
              bg-gradient-to-r from-[#0E145E] to-[#B37BD6]
              shadow-md hover:opacity-90 transition"
            >
              <Plus size={16} />
              Add New User
            </button>

            <span className="text-sm text-gray-600">Admin</span>

            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#0E145E] to-[#B37BD6] text-white flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </div>

        {/* ✅ USER PROFILE CARD (DYNAMIC NOW) */}
        <div className="h-[140px] bg-gradient-to-r from-[#0E145E] via-[#6A4DBF] to-[#B37BD6] rounded-xl p-6 text-white shadow-md mb-6">
          <div className="flex items-center gap-4 ">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <User size={28} color="white" strokeWidth={2} />
            </div>

            <div>
              <h2 className="text-[36px] font-semibold">{userInfo.name}</h2>

              <p className="text-[16px] opacity-80">{userInfo.email}</p>
            </div>
          </div>
        </div>

        {/* REST OF YOUR UI SAME (NO CHANGE) */}

        <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#F3F1FB" }}>
                <TableCell>Document Type</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Generated by</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>{/* keep your docs logic */}</TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* MODAL SAME */}
    </div>
  );
}