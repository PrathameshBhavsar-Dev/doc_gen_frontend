import React, { useEffect, useState } from "react";
import { FiSearch, FiEye, FiEdit, FiFileText } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../core/constants/routes.constant";
import { getAllUsersService } from "../../core/services/v2/userService";

// const navigate = useNavigate();

const ProfileListPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const GRID_LAYOUT =
    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.5fr_1.2fr_1.5fr_1.2fr_1.3fr_1.3fr_120px]";

  const filteredProfiles = profiles.filter((p) =>
    p.employeeName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const fetchProfiles = async () => {
    try {

      setLoading(true);
      const result = await getAllUsersService({
        page: 0,
        size: 5,
      });

      console.log("Users API Response:", result);

      if (result.success) {
        setProfiles(result.data.content);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log("Fetch Profiles Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading profiles...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F6F8FF] via-[#EEF2FF] to-[#FDF4FF] px-4 sm:px-5 lg:px-6 py-4 sm:py-6">
      {" "}
      <div className="max-w-[1350px] ">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            {/* BACK BUTTON */}
            <button
              onClick={() => navigate(-1)}
              className="
      w-9 h-9 flex items-center justify-center
      rounded-lg
      bg-[#F1F2F6]
      hover:bg-[#E4E7EC]
      transition-all duration-200
    "
            >
              <FiArrowLeft className="text-[16px] text-[#334155]" />
            </button>

            {/* TITLE */}
            <div>
              <h2 className="text-2xl font-semibold text-[#1E293B]">
                Employee Profiles
              </h2>
              <p className="text-sm text-[#64748B]">
                Manage and generate documents for employees
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {" "}
            {/* SEARCH */}
            <div className="relative w-full sm:w-[260px] md:w-[280px]">
              {" "}
              <FiSearch className="absolute left-3 top-3 text-[#2f3032]" />
              <input
                type="text"
                placeholder="Search profiles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 h-[42px] rounded-xl 
                border border-[#E2E8F0] bg-white/80 backdrop-blur 
                focus:ring-2 focus:ring-[#6366F1]/20 outline-none transition"
              />
            </div>
            {/* CREATE BUTTON */}
            <button
              onClick={() => navigate(ROUTES.USER_FORM)}
              className="
w-full sm:w-auto
px-5 py-2.5 rounded-xl
              bg-gradient-to-r from-[#0E145E] to-[#B37BD6] 
              text-white text-sm font-medium
              shadow-[0_6px_20px_rgba(99,102,241,0.35)]
              hover:shadow-[0_10px_30px_rgba(99,102,241,0.45)]
              hover:scale-[1.03] active:scale-[0.97]
              transition-all duration-300
            "
            >
              + Create Profile
            </button>
          </div>
        </div>

        {/* CARD TABLE */}
        <div className="space-y-4 overflow-x-auto">
          {/* PREMIUM FLOATING HEADER */}
          <div className="relative">
            {/* subtle top fade (depth effect) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F6F8FF] to-transparent pointer-events-none" />

            {/* FIXED HEADER */}
            <div className="relative">
              <div
                className={`
    hidden lg:grid ${GRID_LAYOUT}
    gap-6
    px-7 pb-3
    text-[13px]
    font-semibold
    text-[#334155]
  `}
              >
                <div>Name</div>
                <div>Company</div>
                <div>Role</div>
                <div>Payment</div>
                <div>Created</div>
                <div>Status</div>
                <div className="text-right pr-2">Actions</div>
              </div>

              <div className="h-[1px] bg-[#E2E8F0]" />
            </div>
            {/* elegant divider */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#E2E8F0]/80 to-transparent" />
          </div>
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              onClick={() =>
                navigate(ROUTES.USER_EMPLOYEE_DOCUMENTS, { state: profile })
              }
              className={`
cursor-pointer
grid ${GRID_LAYOUT}
gap-4 lg:gap-6
px-4 sm:px-5 lg:px-7
py-4 sm:py-5
rounded-2xl
bg-white/70 backdrop-blur-md
border border-[#E2E8F0]/50
shadow-[0_2px_10px_rgba(0,0,0,0.03)]
hover:shadow-[0_8px_25px_rgba(99,102,241,0.12)]
hover:bg-white/90
transition-all duration-300
`}
            >
              {/* PROFILE */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="
      w-10 h-10 rounded-xl 
      bg-gradient-to-br from-[#0E145E] to-[#B37BD6]
      flex items-center justify-center 
      text-white text-sm font-semibold
    "
                >
                  {profile.employeeName?.charAt(0) || "U"}
                </div>

                <div className="min-w-0 leading-tight">
                  <p className="text-[14px] font-semibold text-[#1E293B] truncate">
                    {profile.employeeName}
                  </p>
                  <p className="text-[12px] text-[#64748B] truncate">
                    {profile.email || "N/A"}
                  </p>
                </div>
              </div>

              {/* COMPANY */}
              <div className="flex flex-col">
                <span className="text-[11px] text-[#94A3B8] lg:hidden mb-1">
                  Company
                </span>

                <div className="text-[13px] text-[#475569]">
{profile.company}
                </div>
              </div>

              {/* ROLE */}
              <div className="flex flex-col">
                <span className="text-[11px] text-[#94A3B8] lg:hidden mb-1">
                  Role
                </span>

                <div className="text-[13px] text-[#475569]">{profile.designation || "N/A"}</div>
              </div>

              {/* PAYMENT */}
              <div className="flex flex-col">
                <span className="text-[11px] text-[#94A3B8] lg:hidden mb-1">
                  Payment
                </span>

                <div className="flex justify-start">
                  <span
                    className={`
                      px-3 py-[4px]
                      text-[12px]
                      rounded-full
                      font-medium
                      w-fit
                      ${profile.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                      }
                    `}
                  >
                    {/* {profile.paymentStatus} */}
                  </span>
                </div>
              </div>

              {/* CREATED */}
              <div className="flex flex-col">
                <span className="text-[11px] text-[#94A3B8] lg:hidden mb-1">
                  Created
                </span>

                <div className="text-[13px] text-[#475569]">
{profile.joiningDate || "N/A"}
                </div>
              </div>

              {/* STATUS */}
              <div className="flex flex-col">
                <span className="text-[11px] text-[#94A3B8] lg:hidden mb-1">
                  Status
                </span>

                <div className="flex justify-start">
                  <span
                    className={`
                      px-3 py-[4px]
                      text-[12px]
                      rounded-full
                      font-medium
                      w-fit
                      ${profile.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {profile.status}
                  </span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-start lg:justify-end items-center gap-2 pt-2 lg:pt-0">
                {" "}
                {/* VIEW */}
                <div className="relative group">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("View clicked");
                    }}
                    className="p-2 rounded-md hover:bg-[#EEF2FF] transition"
                  >
                    <FiEye className="text-[16px] text-[#6366F1]" />
                  </button>

                  <span
                    className="
      absolute bottom-full mb-2 left-1/2 -translate-x-1/2
      whitespace-nowrap
      px-2 py-1 text-[11px] font-medium
      bg-[#1E293B] text-white rounded-md
      opacity-0 group-hover:opacity-100
      pointer-events-none
      transition-all duration-200
    "
                  >
                    View Profile
                  </span>
                </div>
                {/* EDIT */}
                <div className="relative group">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("View clicked");
                    }}
                    className="p-2 rounded-md hover:bg-[#EEF2FF] transition"
                  >
                    <FiEdit className="text-[16px] text-[#6366F1]" />
                  </button>

                  <span
                    className="
      absolute bottom-full mb-2 left-1/2 -translate-x-1/2
      whitespace-nowrap
      px-2 py-1 text-[11px] font-medium
      bg-[#1E293B] text-white rounded-md
      opacity-0 group-hover:opacity-100
      pointer-events-none
      transition-all duration-200
    "
                  >
                    Edit Profile
                  </span>
                </div>
                {/* DOCUMENT */}
                <div className="relative group">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("View clicked");
                    }}
                    className="p-2 rounded-md hover:bg-[#EEF2FF] transition"
                  >
                    <FiFileText className="text-[16px] text-[#6366F1]" />
                  </button>

                  <span
                    className="
      absolute bottom-full mb-2 left-1/2 -translate-x-1/2
      whitespace-nowrap
      px-2 py-1 text-[11px] font-medium
      bg-[#1E293B] text-white rounded-md
      opacity-0 group-hover:opacity-100
      pointer-events-none
      transition-all duration-200
    "
                  >
                    Generate Docs
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* EMPTY */}
          {filteredProfiles.length === 0 && (
            <div className="text-center py-10 text-[#94A3B8]">
              No profiles found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileListPage;
