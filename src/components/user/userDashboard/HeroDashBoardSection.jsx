import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import ServerUrl from "../../../core/constants/serverURL.constant";
import icon from "../../../assets/images/Icon.png";
import icon1 from "../../../assets/images/Icon1.png";
import icon2 from "../../../assets/images/Icon2.png";
import ROUTES from "../../../core/constants/routes.constant";

const HeroDashBoardSection = () => {
  const [totalDocuments, setTotalDocuments] = useState("-");
  const [thisMonthDocuments, setThisMonthDocuments] = useState("-");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // First call to get total and page count
        const firstRes = await axiosInstance.get(
          `${ServerUrl.API_ALL_DOCUMENTS}?page=1`,
        );

        const total = firstRes.data.total;
        const totalPages = firstRes.data.pages;
        let allDocs = [...firstRes.data.data];

        // Fetch remaining pages to get all documents
        for (let i = 2; i <= totalPages; i++) {
          const res = await axiosInstance.get(
            `${ServerUrl.API_ALL_DOCUMENTS}?page=${i}`,
          );
          allDocs = [...allDocs, ...res.data.data];
        }

        // Accurate "This Month" from full dataset
        const now = new Date();
        const thisMonth = allDocs.filter((doc) => {
          const docDate = new Date(doc.createdAt);
          return (
            docDate.getMonth() === now.getMonth() &&
            docDate.getFullYear() === now.getFullYear()
          );
        }).length;

        setTotalDocuments(total);
        setThisMonthDocuments(thisMonth);
      } catch (error) {
        console.error("Dashboard fetch failed:", error);
      }
    };

    fetchDocuments();
  }, []);

  const stats = [
    { img: icon, value: "10", label: "Active Companies", badge: "+2" },
    {
      img: icon1,
      value: totalDocuments,
      label: "Total Documents Generated",
      badge: "+12.5%",
    },
    {
      img: icon2,
      value: thisMonthDocuments,
      label: "This Month",
      badge: "+23.1%",
    },
  ];

  return (
    <section className="w-full">
      {/* Responsive Container */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-0">
        {/* Heading + Button Row */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 md:gap-8">
          {/* Left Side - Text */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1D293D] leading-tight wrap-break-word">
              Welcome to{" "}
              <span className="bg-linear-to-br from-[#1C1D68] to-[#B37BD6] bg-clip-text text-transparent">
                Doc Gen
              </span>
            </h1>

            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-[#45556C] mt-2 sm:mt-3 max-w-2xl leading-relaxed">
              Generate professional documents for your organization
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-2 xs:gap-3 shrink-0">
            <button
              onClick={() => navigate(ROUTES.USER_FORM)}
              className="px-3 xs:px-3 sm:px-3 py-3 xs:py-2
              rounded-lg 
              bg-linear-to-r from-[#1C1D68] to-[#B37BD6]
              text-white text-[14px] xs:text-sm font-medium
              shadow-md hover:shadow-lg
              transition-all duration-300
              hover:scale-105
              whitespace-nowrap
              shrink-0"
            >
              + Create New Profile
            </button>
            <button
              onClick={() => navigate(ROUTES.USER_EMPLOYEE_DATA)}
              className="px-3 xs:px-3 sm:px-3 py-3 xs:py-2
              rounded-lg 
              bg-linear-to-r from-[#1C1D68] to-[#B37BD6]
              text-white text-[14px] xs:text-sm font-medium
              shadow-md hover:shadow-lg
              transition-all duration-300
              hover:scale-105
              whitespace-nowrap
              shrink-0"
            >
              Existing Profile{" "}
            </button>
          </div>
        </div>

        {/* Stats Wrapper */}
        <div
          className="bg-[#8B5CF6]/10 rounded-xl xs:rounded-2xl sm:rounded-3xl 
          p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10"
        >
          <div
            className="grid 
            grid-cols-1 
            xs:grid-cols-2 
            lg:grid-cols-3 
            gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8"
          >
            {stats.map((card, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl xs:rounded-2xl
                           p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8
                           shadow-sm hover:shadow-xl
                           transition-all duration-300
                           hover:bg-linear-to-r 
                           hover:from-[#0E145E] 
                           hover:to-[#B37BD6]
                           flex flex-col justify-between
                           h-full min-h-35 xs:min-h-[150px]"
              >
                {/* Top Section */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12
                               rounded-lg xs:rounded-xl bg-[#61489A]
                               flex items-center justify-center shrink-0
                               transition-all duration-300
                               group-hover:bg-white"
                  >
                    <img
                      src={card.img}
                      alt=""
                      className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5
                                 transition-all duration-300
                                 filter brightness-0 invert
                                 group-hover:invert-0"
                    />
                  </div>

                  <span
                    className="bg-green-100 text-green-600
                               text-[9px] xs:text-[10px] sm:text-xs md:text-sm
                               px-2 xs:px-2.5 sm:px-3 py-1
                               rounded-full font-medium
                               transition-all duration-300
                               group-hover:bg-white/20 group-hover:text-white
                               shrink-0"
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Bottom Section */}
                <div className="mt-3 xs:mt-4 sm:mt-5 min-w-0">
                  <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 transition-all duration-300 group-hover:text-white wrap-break-word">
                    {card.value}
                  </h2>

                  <p className="text-[11px] xs:text-xs sm:text-sm md:text-base text-gray-500 mt-1 xs:mt-2 font-medium transition-all duration-300 group-hover:text-white/80 wrap-break-word">
                    {card.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDashBoardSection;
