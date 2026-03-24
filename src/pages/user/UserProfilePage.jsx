// import React from "react";
// import {
//   ArrowLeft,
//   User,
//   Mail,
//   Phone,
//   Building2,
//   Camera,
//   Calendar,
//   Briefcase,
// } from "lucide-react";

// const stats = [
//   {
//     label: "Documents Created",
//     value: "1,247",
//     sub: "Total documents",
//     icon: Mail,
//     iconBg: "bg-blue-100",
//     iconColor: "text-blue-500",
//   },
//   {
//     label: "This Month",
//     value: "348",
//     sub: "+23% from last month",
//     icon: Calendar,
//     iconBg: "bg-green-100",
//     iconColor: "text-green-500",
//   },
//   {
//     label: "Companies Managed",
//     value: "10",
//     sub: "Active companies",
//     icon: Briefcase,
//     iconBg: "bg-purple-100",
//     iconColor: "text-purple-500",
//   },
// ];

// const fields = [
//   { label: "Full Name",     value: "Admin User",          icon: User      },
//   { label: "Email Address", value: "admin@docgen.com",    icon: Mail      },
//   { label: "Phone Number",  value: "+91 98765 43210",     icon: Phone     },
//   { label: "Department",    value: "Administration",      icon: Building2 },
// ];

// const UserProfilePage = () => {
//   return (
//     <div className=" p-6 md:p-10">

//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex items-center gap-3 mb-1">
//           <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
//         </div>
//         <p className="text-sm text-gray-500">Manage your personal information and settings</p>
//       </div>

//       {/* Top Section */}
//       <div className="flex flex-col md:flex-row gap-4 mb-4">

//         {/* Avatar Card */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-center justify-center w-full md:w-64 shrink-0">
//           <div className="relative mb-3">
//             <div className="w-25 h-25 rounded-full bg-gradient-to-br from-[#0E145E] to-[#B37BD6] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
//               P
//             </div>
//             <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full border border-gray-200 shadow flex items-center justify-center hover:bg-purple-50 transition">
//               <Camera size={13} className="text-gray-500" />
//             </button>
//           </div>
//           <h3 className="font-bold text-gray-800 text-base">User</h3>
//           <p className="text-xs text-gray-400 mb-2">Super Administrator</p>
//           <span className="text-xs bg-green-100 text-green-600 font-semibold px-3 py-0.5 rounded-full">
//             Active
//           </span>
//         </div>

//         {/* Personal Info Card */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex-1">
//           <h2 className="text-lg font-bold text-gray-800 mb-5">Personal Information</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {fields.map((field) => {
//               const Icon = field.icon;
//               return (
//                 <div key={field.label}>
//                   <label className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
//                     <Icon size={13} className="text-gray-400" />
//                     {field.label}
//                   </label>
//                   <div className="bg-gray-100 rounded-lg px-4 py-2.5 text-sm text-gray-700 font-medium">
//                     {field.value}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Stats Row */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
//         {stats.map((stat) => {
//           const Icon = stat.icon;
//           return (
//             <div
//               key={stat.label}
//               className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 flex flex-col gap-3"
//             >
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-semibold text-gray-700">{stat.label}</span>
//                 <div className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
//                   <Icon size={18} className={stat.iconColor} />
//                 </div>
//               </div>
//               <div>
//                 <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
//                 <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//     </div>
//   );
// };

// export default UserProfilePage;

import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  Camera,
  Calendar,
  Briefcase,
} from "lucide-react";

import ApiService from "../../core/services/api.service";
import ServerUrl from "../../core/constants/serverURL.constant";
import { useAuth } from "../../core/contexts/AuthContext";

const UserProfilePage = () => {
  const api = new ApiService();

  const { user: authUser } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 NEW: document stats state
  const [docStats, setDocStats] = useState({
    total: 0,
    thisMonth: 0,
    companies: 0,
  });

  const userId = authUser?._id;

  // ================= PROFILE =================
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await api.apiget(
        `${ServerUrl.API_MODULE_AUTH}/profile/${userId}`,
      );

      console.log("PROFILE RESPONSE:", res);

      setUser(res?.data || null);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= DOCUMENTS =================
  const fetchDocuments = async () => {
    try {
      const res = await api.apiget(ServerUrl.API_ALL_DOCUMENTS);

      console.log("DOCUMENTS RESPONSE:", res);

      const documents = res?.data || [];

      // 🔥 Total
      const totalDocs = res?.total || 0;

      // 🔥 This month
      const thisMonthDocs = documents.filter((doc) => {
        const docDate = new Date(doc.createdAt);
        const now = new Date();

        return (
          docDate.getMonth() === now.getMonth() &&
          docDate.getFullYear() === now.getFullYear()
        );
      }).length;

      // 🔥 Unique companies
      const uniqueCompanies = [
        ...new Set(documents.map((doc) => doc.companyName)),
      ].length;

      setDocStats({
        total: totalDocs,
        thisMonth: thisMonthDocs,
        companies: uniqueCompanies,
      });
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetchProfile();
    fetchDocuments(); // 🔥 NEW
  }, [userId]);

  // 🔥 Loading
  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (!user) {
    return <div className="p-6">User not found</div>;
  }

  const fields = [
    { label: "Full Name", value: user.name || "—", icon: User },
    { label: "Email Address", value: user.email || "—", icon: Mail },
    { label: "Phone Number", value: user.phone || "+91 —", icon: Phone },
    { label: "Department", value: user.role || "User", icon: Building2 },
  ];

  // 🔥 NEW dynamic stats
  const stats = [
    {
      label: "Documents Created",
      value: docStats.total,
      sub: "Total documents",
      icon: Mail,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      label: "This Month",
      value: docStats.thisMonth,
      sub: "Current month",
      icon: Calendar,
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      label: "Companies Managed",
      value: docStats.companies,
      sub: "Active companies",
      icon: Briefcase,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-sm text-gray-500">
          Manage your personal information and settings
        </p>
      </div>

      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Avatar */}
        <div className="bg-white rounded-2xl shadow-lg  p-6 flex flex-col items-center w-full md:w-64">
          <div className="relative mb-3">
            <div className="w-25 h-25 rounded-full bg-gradient-to-br from-[#0E145E] to-[#B37BD6] flex items-center justify-center text-white text-3xl font-bold">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full  shadow flex items-center justify-center">
              <Camera size={13} />
            </button>
          </div>

          <h3 className="font-bold">{user.name}</h3>
          <p className="text-xs text-gray-400">{user.role}</p>

          <span className="text-xs bg-green-100 text-green-600 px-3 py-0.5 rounded-full mt-2">
            Active
          </span>
        </div>

        {/* Info */}
        <div className="bg-white rounded-2xl shadow-lg  p-6 flex-1">
          <h2 className="text-lg font-bold mb-5">Personal Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.label}>
                  <label className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Icon size={13} />
                    {field.label}
                  </label>

                  <div className="bg-gray-100 rounded-lg px-4 py-2 text-sm font-medium">
                    {field.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl shadow  p-5"
            >
              <div className="flex justify-between mb-3">
                <span className="text-sm font-semibold">{stat.label}</span>

                <div
                  className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center`}
                >
                  <Icon size={18} className={stat.iconColor} />
                </div>
              </div>

              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.sub}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfilePage;