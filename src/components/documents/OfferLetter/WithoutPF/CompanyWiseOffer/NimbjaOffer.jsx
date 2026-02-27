// // import React from "react";
// // import { Box, Typography, Divider } from "@mui/material";

// // const NimbjaOffer = ({ company, data }) => {
// //   return (
// //     <Box
// //       sx={{
// //         width: "210mm",
// //         minHeight: "297mm",
// //         backgroundColor: "#fff",
// //         fontFamily: "Times New Roman",
// //         color: "#000",
// //       }}
// //     >
// //       {/* ================= HEADER ================= */}
// //       <Box>
// //         <img
// //           src={company.headerImage}
// //           alt="Company Header"
// //           style={{ width: "100%" }}
// //         />
// //       </Box>

// //       {/* ================= CONTENT ================= */}
// //       <Box sx={{ px: 6, py: 4 }}>
// //         {/* Date */}
// //         <Typography align="right" sx={{ mb: 4 }}>
// //           {new Date(data.issueDate).toLocaleDateString("en-IN", {
// //             day: "numeric",
// //             month: "long",
// //             year: "numeric",
// //           })}
// //         </Typography>

// //         {/* Candidate Details */}
// //         <Typography sx={{ mb: 1 }}>
// //           <strong>Name :</strong> {data.candidateName}
// //         </Typography>
// //         {data.address && (
// //           <Typography sx={{ mb: 3 }}>
// //             <strong>Address :</strong> {data.address}
// //           </Typography>
// //         )}

// //         {/* Subject */}
// //         <Typography sx={{ fontWeight: "bold", mb: 3 }}>
// //           Subject : Letter of Intent for the position of {data.position}
// //         </Typography>

// //         {/* Greeting */}
// //         <Typography sx={{ mb: 3 }}>
// //           Dear {data.candidateName.split(" ")[0]},
// //         </Typography>

// //         {/* Body */}
// //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// //           Welcome to <strong>{company.name}</strong>. Quality is not just a
// //           destination but a journey in which every employee contributes. We
// //           invite you to be part of this journey!
// //         </Typography>

// //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// //           This has reference to your application and subsequent interviews you
// //           had with us. We are pleased to offer you the role of{" "}
// //           <strong>{data.position}</strong>.
// //         </Typography>

// //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// //           On joining, your all-inclusive Cost to the Company (CTC) will be{" "}
// //           <strong>Rs. {Number(data.salary).toLocaleString("en-IN")}/-</strong>{" "}
// //           per annum as per Annexure A. This offer is subject to verification of
// //           documents and background checks as per company policy.
// //         </Typography>

// //         <Typography sx={{ mb: 3 }}>
// //           You are required to join the services of the Company on or before{" "}
// //           <strong>
// //             {new Date(data.joiningDate).toLocaleDateString("en-IN")}
// //           </strong>
// //           .
// //         </Typography>

// //         {/* Closing */}
// //         <Typography sx={{ mb: 4 }}>
// //           Thanking you and looking forward to having you with us.
// //         </Typography>

// //         {/* Signature */}
// //         <Typography sx={{ mt: 4 }}>
// //           For <strong>{company.name}</strong>
// //         </Typography>

// //         <Box sx={{ mt: 3, display: "flex", gap: 4 }}>
// //           <Box>
// //             <Typography sx={{ fontWeight: "bold" }}>
// //               {company.hrName}
// //             </Typography>
// //             <Typography>HR Relations Lead</Typography>
// //           </Box>

// //           <Box>
// //             <img
// //               src={company.signature}
// //               alt="HR Signature"
// //               style={{ height: 50 }}
// //             />
// //           </Box>
// //         </Box>

// //         <Typography sx={{ mt: 3 }}>
// //           Candidate Name: {data.candidateName}
// //         </Typography>

// //         <Divider sx={{ my: 4 }} />

// //         <Typography sx={{ fontStyle: "italic" }}>
// //           Enclosures: Annexure A – Salary Structure
// //         </Typography>
// //       </Box>

// //       {/* ================= FOOTER ================= */}
// //       <Box sx={{ mt: "auto" }}>
// //         <img
// //           src={company.footerImage}
// //           alt="Company Footer"
// //           style={{ width: "100%" }}
// //         />
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default NimbjaOffer;

// import React from "react";
// import { Box, Typography, Divider } from "@mui/material";

// const NimbjaOffer = ({ company, data }) => {
//   return (
//     <Box
//       sx={{
//         width: "210mm",
//         minHeight: "297mm",
//         backgroundColor: "#fff",
//         fontFamily: "Times New Roman",
//         color: "#000",
//       }}
//     >
//       {/* ================= HEADER ================= */}
//       <Box>
//         <img
//           src={company.headerImage}
//           alt="Company Header"
//           style={{ width: "100%" }}
//         />
//       </Box>

//       {/* ================= CONTENT ================= */}
//       <Box sx={{ px: 6, py: 4 }}>
//         {/* Date */}
//         <Typography align="right" sx={{ mb: 4 }}>
//           {new Date(data.issueDate).toLocaleDateString("en-IN", {
//             day: "numeric",
//             month: "long",
//             year: "numeric",
//           })}
//         </Typography>

//         {/* Candidate Details */}
//         <Typography sx={{ mb: 1 }}>
//           <strong>Name :</strong> {data.candidateName}
//         </Typography>
//         {data.address && (
//           <Typography sx={{ mb: 3 }}>
//             <strong>Address :</strong> {data.address}
//           </Typography>
//         )}

//         {/* Subject */}
//         <Typography sx={{ fontWeight: "bold", mb: 3 }}>
//           Subject : Letter of Intent for the position of {data.position}
//         </Typography>

//         {/* Greeting */}
//         <Typography sx={{ mb: 3 }}>
//           Dear {data.candidateName.split(" ")[0]},
//         </Typography>

//         {/* Body */}
//         <Typography sx={{ mb: 3, textAlign: "justify" }}>
//           Welcome to <strong>{company.name}</strong>. Quality is not just a
//           destination but a journey in which every employee contributes. We
//           invite you to be part of this journey!
//         </Typography>

//         <Typography sx={{ mb: 3, textAlign: "justify" }}>
//           This has reference to your application and subsequent interviews you
//           had with us. We are pleased to offer you the role of{" "}
//           <strong>{data.position}</strong>.
//         </Typography>

//         <Typography sx={{ mb: 3, textAlign: "justify" }}>
//           On joining, your all-inclusive Cost to the Company (CTC) will be{" "}
//           <strong>Rs. {Number(data.salary).toLocaleString("en-IN")}/-</strong>{" "}
//           per annum as per Annexure A. This offer is subject to verification of
//           documents and background checks as per company policy.
//         </Typography>

//         <Typography sx={{ mb: 3 }}>
//           You are required to join the services of the Company on or before{" "}
//           <strong>
//             {new Date(data.joiningDate).toLocaleDateString("en-IN")}
//           </strong>
//           .
//         </Typography>

//         {/* Closing */}
//         <Typography sx={{ mb: 4 }}>
//           Thanking you and looking forward to having you with us.
//         </Typography>

//         {/* Signature */}
//         <Typography sx={{ mt: 4 }}>
//           For <strong>{company.name}</strong>
//         </Typography>

//         <Box sx={{ mt: 3, display: "flex", gap: 4 }}>
//           <Box>
//             <Typography sx={{ fontWeight: "bold" }}>
//               {company.hrName}
//             </Typography>
//             <Typography>HR Relations Lead</Typography>
//           </Box>

//           <Box>
//             <img
//               src={company.signature}
//               alt="HR Signature"
//               style={{ height: 50 }}
//             />
//           </Box>
//         </Box>

//         <Typography sx={{ mt: 3 }}>
//           Candidate Name: {data.candidateName}
//         </Typography>

//         <Divider sx={{ my: 4 }} />

//         <Typography sx={{ fontStyle: "italic" }}>
//           Enclosures: Annexure A – Salary Structure
//         </Typography>
//       </Box>

//       {/* ================= FOOTER ================= */}
//       <Box sx={{ mt: "auto" }}>
//         <img
//           src={company.footerImage}
//           alt="Company Footer"
//           style={{ width: "100%" }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default NimbjaOffer;

// NimbjaOffer.jsx
import React from "react";
import NimbjaOfferPage1 from "../../../ExperienceLetter/CompanyWiseExperience/NimbjaOfferTemplates/NimbjaOfferPage1";
import NimbjaOfferPage2 from "../../../ExperienceLetter/CompanyWiseExperience/NimbjaOfferTemplates/NimbjaOfferPage2";



/**
 * NimbjaOffer
 * -------------------------
 * This component ONLY orchestrates pages.
 * No layout, no header/footer logic here.
 */
const NimbjaOffer = ({ company, data }) => {
  if (!company || !data) return null;

  return (
    <>
      {/* ================= PAGE 1 : OFFER LETTER ================= */}
      <NimbjaOfferPage1
        company={company}
        data={data}
      />

      {/* ================= PAGE 2 : ANNEXURE / SALARY ================= */}
      <NimbjaOfferPage2
        company={company}
        data={data}
      />
    </>
  );
};

export default NimbjaOffer;
