import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import ServerUrl from "../../../core/constants/serverURL.constant";
import icon from "../../../assets/images/Icon.png";
import icon1 from "../../../assets/images/Icon1.png";
import icon2 from "../../../assets/images/Icon2.png";
import icon3 from "../../../assets/images/Icon3.png";

const HeroDashBoardSection = () => {
  const [totalDocuments, setTotalDocuments] = useState("-");
  const [thisMonthDocuments, setThisMonthDocuments] = useState("-");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // First call to get total and page count
        const firstRes = await axiosInstance.get(
          `/v1${ServerUrl.API_ALL_DOCUMENTS}?page=1`,
        );

        const total = firstRes.data.total;
        const totalPages = firstRes.data.pages;
        let allDocs = [...firstRes.data.data];

        // Fetch remaining pages to get all documents
        for (let i = 2; i <= totalPages; i++) {
          const res = await axiosInstance.get(
            `/v1${ServerUrl.API_ALL_DOCUMENTS}?page=${i}`,
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
    <section className="w-full ">
      {/* Responsive Container */}
      <div className="w-full max-w-screen-2xl mx-auto">
        {/* Heading */}
        {/* Heading + Button Row */}
        <div className="mb-6 sm:mb-8 lg:mb-10 px-3 sm:px-4 md:px-6 lg:px-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left Side - Text */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1D293D] leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-br from-[#1C1D68] to-[#B37BD6] bg-clip-text text-transparent">
                Doc Gen
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#45556C] mt-2 max-w-2xl">
              Generate professional documents for your organization
            </p>
          </div>

          {/* Right Side - Button */}
          <div className="flex justify-start sm:justify-end">
            <button
              onClick={() => navigate("/user/form")}
              className="
    px-5 py-2.5 
    rounded-lg 
    bg-gradient-to-r from-[#1C1D68] to-[#B37BD6]
    text-white text-sm font-medium
    shadow-md hover:shadow-lg
    transition-all duration-300
    hover:scale-105
  "
            >
              + Profile Creation
            </button>
          </div>
        </div>

        {/* Stats Wrapper */}
        <div
          className="bg-[#8B5CF6]/10 rounded-2xl sm:rounded-3xl 
                        p-3 sm:p-5 lg:p-8"
        >
          <div
            className="grid 
                          grid-cols-1 
                          sm:grid-cols-2 
                          lg:grid-cols-3 
                          gap-4 sm:gap-6"
          >
            {stats.map((card, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl 
                           p-5 sm:p-6 lg:p-8
                           shadow-sm hover:shadow-xl
                           transition-all duration-300
                           hover:bg-gradient-to-r 
                           hover:from-[#0E145E] 
                           hover:to-[#B37BD6]
                           flex flex-col justify-between
                           h-full min-h-[150px]"
              >
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 
                               rounded-xl bg-[#61489A] 
                               flex items-center justify-center
                               transition-all duration-300
                               group-hover:bg-white"
                  >
                    <img
                      src={card.img}
                      alt=""
                      className="w-4 h-4 sm:w-5 sm:h-5 
                                 transition-all duration-300
                                 filter brightness-0 invert
                                 group-hover:invert-0"
                    />
                  </div>

                  <span
                    className="bg-green-100 text-green-600 
                               text-[10px] sm:text-xs
                               px-2 sm:px-3 py-1 
                               rounded-full font-medium
                               transition-all duration-300
                               group-hover:bg-white/20 group-hover:text-white"
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Bottom Section */}
                <div className="mt-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 transition-all duration-300 group-hover:text-white">
                    {card.value}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium transition-all duration-300 group-hover:text-white/80">
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
