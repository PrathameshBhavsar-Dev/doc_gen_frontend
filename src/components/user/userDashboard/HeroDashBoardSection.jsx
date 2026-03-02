// import React from "react";
// import icon from "../../../assets/images/icon.png";
// import icon1 from "../../../assets/images/icon1.png";
// import icon2 from "../../../assets/images/icon2.png";
// import icon3 from "../../../assets/images/icon3.png";

// const HeroDashBoardSection = () => {
//   const stats = [
//     { img: icon, value: "10", label: "Active Companies", badge: "+2" },
//     {
//       img: icon1,
//       value: "247",
//       label: "Total Documents Generated",
//       badge: "+12.5%",
//     },
//     { img: icon2, value: "48", label: "This Month", badge: "+23.1%" },
//     { img: icon3, value: "4", label: "Active Users", badge: "+5" },
//   ];

//   return (
//     <section className="bg-[#f3f4f8] w-full mb-4">
//       {/* Container */}
//       <div className="max-w-7xl ">
//         {/* Heading */}
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D293D]">
//           Welcome to Doc Gen
//         </h1>

//         <p className="text-sm sm:text-base text-[#45556C] mt-2 mb-6 sm:mb-10">
//           Generate professional documents for your organization
//         </p>

//         {/* Stats Wrapper */}
//         <div className="bg-[#8B5CF6]/10 rounded-3xl p-4 sm:p-6 lg:p-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
//             {stats.map((card, index) => (
//               <div
//                 key={index}
//                 className="group relative bg-white rounded-2xl p-2 sm:p-6
//                            shadow-sm hover:shadow-xl
//                            transition-all duration-300
//                            hover:bg-gradient-to-r
//                            hover:from-[#0E145E]
//                            hover:to-[#B37BD6]
//                            flex flex-col justify-between min-h-[160px]"
//               >
//                 {/* Top Section */}
//                 <div className="flex items-start justify-between">
//                   {/* Icon */}
//                   <div
//                     className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#61489A]
//                                flex items-center justify-center
//                                transition-all duration-300
//                                group-hover:bg-white"
//                   >
//                     <img
//                       src={card.img}
//                       alt=""
//                       className="w-4 h-4 sm:w-5 sm:h-5
//                                  filter brightness-0 invert
//                                  group-hover:invert-0 group-hover:brightness-0"
//                     />
//                   </div>

//                   {/* Badge */}
//                   <span
//                     className="bg-green-100 text-green-600
//                                text-[10px] sm:text-xs px-2 sm:px-3 py-1
//                                rounded-full font-medium
//                                transition-all duration-300
//                                group-hover:bg-white/20 group-hover:text-white"
//                   >
//                     {card.badge}
//                   </span>
//                 </div>

//                 {/* Bottom Section */}
//                 <div>
//                   <h2
//                     className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4
//                                transition-all duration-300
//                                group-hover:text-white"
//                   >
//                     {card.value}
//                   </h2>

//                   <p
//                     className="text-xs sm:text-sm text-gray-500 mt-1 font-medium
//                                transition-all duration-300
//                                group-hover:text-white/80"
//                   >
//                     {card.label}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroDashBoardSection;

import React from "react";
import icon from "../../../assets/images/icon.png";
import icon1 from "../../../assets/images/icon1.png";
import icon2 from "../../../assets/images/icon2.png";
import icon3 from "../../../assets/images/icon3.png";

const HeroDashBoardSection = () => {
  const stats = [
    { img: icon, value: "10", label: "Active Companies", badge: "+2" },
    {
      img: icon1,
      value: "247",
      label: "Total Documents Generated",
      badge: "+12.5%",
    },
    { img: icon2, value: "48", label: "This Month", badge: "+23.1%" },
    { img: icon3, value: "4", label: "Active Users", badge: "+5" },
  ];

  return (
    <section className="bg-[#f3f4f8] w-full">
      {/* Container */}
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1D293D]">
          Welcome to Doc Gen
        </h1>

        <p className="text-sm sm:text-base text-[#45556C] mt-2 mb-6 sm:mb-10 max-w-2xl">
          Generate professional documents for your organization
        </p>

        {/* Stats Wrapper */}
        <div className="bg-[#8B5CF6]/10 rounded-3xl p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((card, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-5 sm:p-6
                           shadow-sm hover:shadow-xl
                           transition-all duration-300 ease-in-out
                           hover:bg-gradient-to-r 
                           hover:from-[#0E145E] 
                           hover:to-[#B37BD6]
                           flex flex-col justify-between
                           min-h-[150px] sm:min-h-[170px]"
              >
                {/* Top Section */}
                <div className="flex items-start justify-between">
                  {/* Icon */}
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#61489A] 
                               flex items-center justify-center
                               transition-all duration-300
                               group-hover:bg-white"
                  >
                    <img
                      src={card.img}
                      alt=""
                      className="w-4 h-4 sm:w-5 sm:h-5 
                                 filter brightness-0 invert
                                 group-hover:invert-0 group-hover:brightness-0"
                    />
                  </div>

                  {/* Badge */}
                  <span
                    className="bg-green-100 text-green-600 
                               text-[10px] sm:text-xs px-2 sm:px-3 py-1 
                               rounded-full font-medium
                               transition-all duration-300
                               group-hover:bg-white/20 group-hover:text-white"
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Bottom Section */}
                <div className="mt-4">
                  <h2
                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900
                               transition-all duration-300
                               group-hover:text-white"
                  >
                    {card.value}
                  </h2>

                  <p
                    className="text-xs sm:text-sm text-gray-500 mt-1 font-medium
                               transition-all duration-300
                               group-hover:text-white/80"
                  >
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
