// // // // import React from "react";
// // // // import { Box, Typography, Divider } from "@mui/material";

// // // // const NimbjaOffer = ({ company, data }) => {
// // // //   return (
// // // //     <Box
// // // //       sx={{
// // // //         width: "210mm",
// // // //         minHeight: "297mm",
// // // //         backgroundColor: "#fff",
// // // //         fontFamily: "Times New Roman",
// // // //         color: "#000",
// // // //       }}
// // // //     >
// // // //       {/* ================= HEADER ================= */}
// // // //       <Box>
// // // //         <img
// // // //           src={company.headerImage}
// // // //           alt="Company Header"
// // // //           style={{ width: "100%" }}
// // // //         />
// // // //       </Box>

// // // //       {/* ================= CONTENT ================= */}
// // // //       <Box sx={{ px: 6, py: 4 }}>
// // // //         {/* Date */}
// // // //         <Typography align="right" sx={{ mb: 4 }}>
// // // //           {new Date(data.issueDate).toLocaleDateString("en-IN", {
// // // //             day: "numeric",
// // // //             month: "long",
// // // //             year: "numeric",
// // // //           })}
// // // //         </Typography>

// // // //         {/* Candidate Details */}
// // // //         <Typography sx={{ mb: 1 }}>
// // // //           <strong>Name :</strong> {data.candidateName}
// // // //         </Typography>
// // // //         {data.address && (
// // // //           <Typography sx={{ mb: 3 }}>
// // // //             <strong>Address :</strong> {data.address}
// // // //           </Typography>
// // // //         )}

// // // //         {/* Subject */}
// // // //         <Typography sx={{ fontWeight: "bold", mb: 3 }}>
// // // //           Subject : Letter of Intent for the position of {data.position}
// // // //         </Typography>

// // // //         {/* Greeting */}
// // // //         <Typography sx={{ mb: 3 }}>
// // // //           Dear {data.candidateName.split(" ")[0]},
// // // //         </Typography>

// // // //         {/* Body */}
// // // //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// // // //           Welcome to <strong>{company.name}</strong>. Quality is not just a
// // // //           destination but a journey in which every employee contributes. We
// // // //           invite you to be part of this journey!
// // // //         </Typography>

// // // //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// // // //           This has reference to your application and subsequent interviews you
// // // //           had with us. We are pleased to offer you the role of{" "}
// // // //           <strong>{data.position}</strong>.
// // // //         </Typography>

// // // //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// // // //           On joining, your all-inclusive Cost to the Company (CTC) will be{" "}
// // // //           <strong>Rs. {Number(data.salary).toLocaleString("en-IN")}/-</strong>{" "}
// // // //           per annum as per Annexure A. This offer is subject to verification of
// // // //           documents and background checks as per company policy.
// // // //         </Typography>

// // // //         <Typography sx={{ mb: 3 }}>
// // // //           You are required to join the services of the Company on or before{" "}
// // // //           <strong>
// // // //             {new Date(data.joiningDate).toLocaleDateString("en-IN")}
// // // //           </strong>
// // // //           .
// // // //         </Typography>

// // // //         {/* Closing */}
// // // //         <Typography sx={{ mb: 4 }}>
// // // //           Thanking you and looking forward to having you with us.
// // // //         </Typography>

// // // //         {/* Signature */}
// // // //         <Typography sx={{ mt: 4 }}>
// // // //           For <strong>{company.name}</strong>
// // // //         </Typography>

// // // //         <Box sx={{ mt: 3, display: "flex", gap: 4 }}>
// // // //           <Box>
// // // //             <Typography sx={{ fontWeight: "bold" }}>
// // // //               {company.hrName}
// // // //             </Typography>
// // // //             <Typography>HR Relations Lead</Typography>
// // // //           </Box>

// // // //           <Box>
// // // //             <img
// // // //               src={company.signature}
// // // //               alt="HR Signature"
// // // //               style={{ height: 50 }}
// // // //             />
// // // //           </Box>
// // // //         </Box>

// // // //         <Typography sx={{ mt: 3 }}>
// // // //           Candidate Name: {data.candidateName}
// // // //         </Typography>

// // // //         <Divider sx={{ my: 4 }} />

// // // //         <Typography sx={{ fontStyle: "italic" }}>
// // // //           Enclosures: Annexure A – Salary Structure
// // // //         </Typography>
// // // //       </Box>

// // // //       {/* ================= FOOTER ================= */}
// // // //       <Box sx={{ mt: "auto" }}>
// // // //         <img
// // // //           src={company.footerImage}
// // // //           alt="Company Footer"
// // // //           style={{ width: "100%" }}
// // // //         />
// // // //       </Box>
// // // //     </Box>
// // // //   );
// // // // };

// // // // export default NimbjaOffer;

// // // import React from "react";
// // // import { Box, Typography, Divider } from "@mui/material";

// // // const NimbjaOffer = ({ company, data }) => {
// // //   return (
// // //     <Box
// // //       sx={{
// // //         width: "210mm",
// // //         minHeight: "297mm",
// // //         backgroundColor: "#fff",
// // //         fontFamily: "Times New Roman",
// // //         color: "#000",
// // //       }}
// // //     >
// // //       {/* ================= HEADER ================= */}
// // //       <Box>
// // //         <img
// // //           src={company.headerImage}
// // //           alt="Company Header"
// // //           style={{ width: "100%" }}
// // //         />
// // //       </Box>

// // //       {/* ================= CONTENT ================= */}
// // //       <Box sx={{ px: 6, py: 4 }}>
// // //         {/* Date */}
// // //         <Typography align="right" sx={{ mb: 4 }}>
// // //           {new Date(data.issueDate).toLocaleDateString("en-IN", {
// // //             day: "numeric",
// // //             month: "long",
// // //             year: "numeric",
// // //           })}
// // //         </Typography>

// // //         {/* Candidate Details */}
// // //         <Typography sx={{ mb: 1 }}>
// // //           <strong>Name :</strong> {data.candidateName}
// // //         </Typography>
// // //         {data.address && (
// // //           <Typography sx={{ mb: 3 }}>
// // //             <strong>Address :</strong> {data.address}
// // //           </Typography>
// // //         )}

// // //         {/* Subject */}
// // //         <Typography sx={{ fontWeight: "bold", mb: 3 }}>
// // //           Subject : Letter of Intent for the position of {data.position}
// // //         </Typography>

// // //         {/* Greeting */}
// // //         <Typography sx={{ mb: 3 }}>
// // //           Dear {data.candidateName.split(" ")[0]},
// // //         </Typography>

// // //         {/* Body */}
// // //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// // //           Welcome to <strong>{company.name}</strong>. Quality is not just a
// // //           destination but a journey in which every employee contributes. We
// // //           invite you to be part of this journey!
// // //         </Typography>

// // //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// // //           This has reference to your application and subsequent interviews you
// // //           had with us. We are pleased to offer you the role of{" "}
// // //           <strong>{data.position}</strong>.
// // //         </Typography>

// // //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// // //           On joining, your all-inclusive Cost to the Company (CTC) will be{" "}
// // //           <strong>Rs. {Number(data.salary).toLocaleString("en-IN")}/-</strong>{" "}
// // //           per annum as per Annexure A. This offer is subject to verification of
// // //           documents and background checks as per company policy.
// // //         </Typography>

// // //         <Typography sx={{ mb: 3 }}>
// // //           You are required to join the services of the Company on or before{" "}
// // //           <strong>
// // //             {new Date(data.joiningDate).toLocaleDateString("en-IN")}
// // //           </strong>
// // //           .
// // //         </Typography>

// // //         {/* Closing */}
// // //         <Typography sx={{ mb: 4 }}>
// // //           Thanking you and looking forward to having you with us.
// // //         </Typography>

// // //         {/* Signature */}
// // //         <Typography sx={{ mt: 4 }}>
// // //           For <strong>{company.name}</strong>
// // //         </Typography>

// // //         <Box sx={{ mt: 3, display: "flex", gap: 4 }}>
// // //           <Box>
// // //             <Typography sx={{ fontWeight: "bold" }}>
// // //               {company.hrName}
// // //             </Typography>
// // //             <Typography>HR Relations Lead</Typography>
// // //           </Box>

// // //           <Box>
// // //             <img
// // //               src={company.signature}
// // //               alt="HR Signature"
// // //               style={{ height: 50 }}
// // //             />
// // //           </Box>
// // //         </Box>

// // //         <Typography sx={{ mt: 3 }}>
// // //           Candidate Name: {data.candidateName}
// // //         </Typography>

// // //         <Divider sx={{ my: 4 }} />

// // //         <Typography sx={{ fontStyle: "italic" }}>
// // //           Enclosures: Annexure A – Salary Structure
// // //         </Typography>
// // //       </Box>

// // //       {/* ================= FOOTER ================= */}
// // //       <Box sx={{ mt: "auto" }}>
// // //         <img
// // //           src={company.footerImage}
// // //           alt="Company Footer"
// // //           style={{ width: "100%" }}
// // //         />
// // //       </Box>
// // //     </Box>
// // //   );
// // // };

// // // export default NimbjaOffer;

// // // NimbjaOffer.jsx
// // import React from "react";
// // import NimbjaOfferPage1 from "../../../ExperienceLetter/CompanyWiseExperience/NimbjaOfferTemplates/NimbjaOfferPage1";
// // import NimbjaOfferPage2 from "../../../ExperienceLetter/CompanyWiseExperience/NimbjaOfferTemplates/NimbjaOfferPage2";
// // import A4Page from "../../../../layout/A4Page";

// // /**
// //  * NimbjaOffer
// //  * -------------------------
// //  * This component ONLY orchestrates pages.
// //  * No layout, no header/footer logic here.
// //  */
// // const NimbjaOffer = ({ company, data }) => {
// //   if (!company || !data) return null;

// //   return (
// //     <>
// //       <A4Page
// //         headerSrc={company.header}
// //         footerSrc={company.footer}
// //         watermarkSrc={company.watermarkImage || company.watermark || null}
// //         contentTop="48mm"
// //         contentBottom="28mm"
// //         company={company}
// //       >
// //         {/* ================= DATE ================= */}
// //         <Typography
// //           sx={{ ...baseText, fontWeight: 600, textAlign: "right", mb: "9mm" }}
// //         >
// //           {offerDate}
// //         </Typography>

// //         {/* ================= DETAILS ================= */}
// //         <Typography
// //           sx={{
// //             ...baseText,
// //             mb: "2.5mm",
// //             fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
// //           }}
// //         >
// //           Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
// //           <Typography
// //             component="span"
// //             sx={{
// //               fontWeight: "",
// //               fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
// //             }}
// //           >
// //             {data.candidateName}
// //           </Typography>
// //         </Typography>

// //         <Typography sx={{ ...baseText, mb: "2.5mm" }}>
// //           Address&nbsp;&nbsp;&nbsp;:{" "}
// //           <Typography
// //             component="span"
// //             sx={{
// //               fontWeight: "",
// //               fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
// //             }}
// //           >
// //             {data.address}
// //           </Typography>
// //         </Typography>

// //         <Typography sx={{ ...baseText, mb: "5mm", fontFamily: "Bahnschrift" }}>
// //           Subject&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
// //           <Typography
// //             component="span"
// //             sx={{
// //               borderBottom: "1px solid #000",
// //               display: "inline",
// //               paddingBottom: "1px",
// //               fontFamily: "Bahnschrift",
// //             }}
// //           >
// //             Letter of intent for the position of {data.position}.
// //           </Typography>
// //         </Typography>

// //         {/* ================= GREETING ================= */}
// //         <Typography sx={{ ...baseText, mb: "5mm" }}>
// //           Dear{" "}
// //           <Typography
// //             component="span"
// //             sx={{ fontWeight: 400, fontFamily: "Bahnschrift" }}
// //           >
// //             {firstName}
// //           </Typography>
// //           ,
// //         </Typography>

// //         {/* ================= PARAGRAPHS ================= */}
// //         <Typography
// //           sx={{
// //             ...baseText,
// //             textAlign: "justify",
// //             mb: "5mm",
// //             marginTop: "-2mm",
// //           }}
// //         >
// //           Welcome to{" "}
// //           <Typography
// //             component="span"
// //             sx={{
// //               fontWeight: 500,
// //               fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
// //             }}
// //           >
// //             {company.name}
// //           </Typography>
// //           . Quality is not just a destination but a journey in which every
// //           employee contributes. We invite you to be part of this journey!
// //           <br />
// //           This has reference to your application and subsequent interviews you
// //           had with us.
// //           <br />
// //           We are pleased to offer you the role of{" "}
// //           <strong>{data.position}.</strong>
// //         </Typography>
// //         <Typography
// //           sx={{ ...baseText, textAlign: "justify", mb: "2mm", mt: "2mm" }}
// //         >
// //           {/* with us. We are pleased to offer you the role of{" "} */}
// //           <Typography component="span" sx={{ fontWeight: 600 }}></Typography>
// //         </Typography>

// //         <Typography sx={{ ...baseText, textAlign: "justify", mb: "5mm" }}>
// //           On Joining, your all-inclusive Cost to the Company (CTC) will be{" "}
// //           <Typography component="span" sx={{ fontWeight: 600 }}>
// //             Rs.{formatIndianCurrency(data.salary)}/-
// //           </Typography>
// //           as per Annexure A. This offer is made on the basis of your having
// //           furnished to the Company information and documents in support of your
// //           age, academic qualifications, previous work experience, relieving
// //           letter from your last employer and other particulars on or before your
// //           day of joining. The Company shall conduct a background and reference
// //           check as per Company policy and this appointment is conditional upon
// //           receiving positive feedback.
// //           <br />
// //           You are required to join the services of the Company at the earliest,
// //           but in any case, not later than{" "}
// //           <Typography component="span" sx={{ fontWeight: 600 }}>
// //             {joiningDate}
// //           </Typography>
// //         </Typography>
// //         <Typography sx={{ ...baseText, textAlign: "justify", mb: "5mm" }}>
// //           Thanking you and looking forward to having you with us. .
// //         </Typography>

// //         <Typography
// //           sx={{
// //             ...baseText,
// //             mb: "5mm",
// //             fontFamily: "Bahnschrift",
// //             fontSize: "18pt",
// //           }}
// //         >
// //           For <strong>{company.name}</strong>
// //         </Typography>

// //         {/* ================= SIGNATURE BLOCK ================= */}
// //         {/* ================= SIGNATURE BLOCK (ABOVE FOOTER) ================= */}
// //         <Box
// //           sx={{
// //             mt: "5mm",
// //             mb: "20mm", // 🔑 IMPORTANT: pushes content ABOVE footer
// //             fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
// //           }}
// //         >
// //           <Grid
// //             container
// //             justifyContent="space-between"
// //             alignItems="flex-start"
// //           >
// //             {/* LEFT — HR */}
// //             <Grid item>
// //               {company.signature && (
// //                 <Box
// //                   component="img"
// //                   src={company.signature}
// //                   alt="Signature"
// //                   sx={{
// //                     width: "45mm",
// //                     display: "block",
// //                     mb: "19mm",
// //                     mt: "9mm",
// //                   }}
// //                 />
// //               )}

// //               <strong>
// //                 <Typography sx={{ fontWeight: 600 }}>
// //                   {company.hrName}
// //                 </Typography>

// //                 <Typography
// //                   sx={{
// //                     fontFamily: '"Bahnschrift", "Segoe UI", sans-serif', // 🔑 ADDED
// //                     fontSize: "12pt", // 🔑 ADDED
// //                     mt: "mm", // 🔑 ADDED
// //                   }}
// //                 >
// //                   <strong>HR Relations Lead</strong>
// //                 </Typography>
// //               </strong>
// //             </Grid>

// //             {/* RIGHT — STAMP + CANDIDATE */}
// //             <Grid item>
// //               {company.stamp && (
// //                 <Box
// //                   component="img"
// //                   src={company.stamp}
// //                   alt="Company Stamp"
// //                   sx={{
// //                     width: "34mm",
// //                     display: "block",
// //                     mb: "4mm",
// //                     ml: "-52mm",
// //                   }}
// //                 />
// //               )}

// //               <Typography
// //                 sx={{
// //                   fontFamily: '"Bahnschrift", "Segoe UI", sans-serif', // 🔑 ADDED
// //                 }}
// //               >
// //                 <strong>Signature :</strong> _________________________
// //               </Typography>

// //               <Typography
// //                 sx={{
// //                   fontFamily: '"Bahnschrift", "Segoe UI", sans-serif', // 🔑 ADDED
// //                 }}
// //               >
// //                 <strong>Candidate Name:</strong>{" "}
// //                 <strong>{data.candidateName}</strong> {/* 🔑 NAME BOLD */}
// //               </Typography>
// //             </Grid>
// //           </Grid>
// //         </Box>
// //       </A4Page>

// //       {/* ================= PAGE 2 : ANNEXURE / SALARY ================= */}
// //       <NimbjaOfferPage2 company={company} data={data} />
// //     </>
// //   );
// // };

// // export default NimbjaOffer;

// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// import A4Page from "../../../../layout/A4Page";
// import { formatCurrency } from "../../../../../utils/salaryCalculations";


// /**
//  * NimbjaOffer
//  * ----------------------------------
//  * Orchestrates Offer Letter Pages
//  * No header/footer logic here
//  */

// const NimbjaOffer = ({ company, data }) => {
//   if (!company || !data) return null;

//   // ================= HELPERS =================
//   const round0 = (num) => Math.round(num);

//   // ================= CTC =================
//   const monthlyCTC = round0(Number(data.salary || data.ctc || 0));

//   // ================= UPDATED PERCENTAGES =================
//   const basicMonthly = round0(monthlyCTC * 0.48); // 40% + 8%
//   const hraMonthly = round0(monthlyCTC * 0.18);
//   const daMonthly = round0(monthlyCTC * 0.12);
//   const specialMonthly = round0(monthlyCTC * 0.16);
//   const foodMonthly = round0(monthlyCTC * 0.06);

//   // ================= STATIC PF =================
//   const pfMonthly = 3750;

//   // ================= ANNUAL VALUES =================
//   const basicAnnual = basicMonthly * 12;
//   const hraAnnual = hraMonthly * 12;
//   const daAnnual = daMonthly * 12;
//   const specialAnnual = specialMonthly * 12;
//   const foodAnnual = foodMonthly * 12;
//   const pfAnnual = pfMonthly * 12;

//   // ================= SALARY TABLE =================
//   const salaryRows = [
//     ["Basic", basicMonthly, basicAnnual],
//     ["House Rent Allowance", hraMonthly, hraAnnual],
//     ["Dearness Allowance", daMonthly, daAnnual],
//     ["Special Allowance", specialMonthly, specialAnnual],
//     ["Food Allowance", foodMonthly, foodAnnual],
//     ["Provident Fund (PF)", pfMonthly, pfAnnual], // Separate
//   ];

//   // ================= TOTAL EARNINGS =================
//   const totalMonthly =
//     basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly;

//   const totalAnnual = totalMonthly * 12;

//   const firstName = data.candidateName?.trim().split(" ")[0];

//   return (
//     <>
//       {/* ================= PAGE 1 ================= */}
//       <A4Page headerSrc={company.header} footerSrc={company.footer}>
//         {/* DATE */}
//         <Typography sx={{ fontWeight: 600, textAlign: "right", mb: "9mm" }}>
//           {""}
//         </Typography>

//         {/* DETAILS */}
//         <Typography sx={{ mb: "3mm" }}>
//           Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
//           {data.candidateName}
//         </Typography>

//         <Typography sx={{ mb: "5mm" }}>
//           Address&nbsp;&nbsp;&nbsp;:&nbsp;
//           <span>{data.address}</span>
//         </Typography>

//         <Typography sx={{ mb: "8mm", mt: "-2mm" }}>
//           Subject&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
//           <span
//             style={{
//               borderBottom: "1px solid #000",
//               paddingBottom: "1px",
//               mt: "-2mm",
//             }}
//           >
//             Letter of Intent for the position of {data.position}.
//           </span>
//         </Typography>

//         {/* GREETING */}
//         <Typography sx={{ mb: "5mm" }}>Dear {firstName},</Typography>

//         {/* BODY */}
//         <Typography
//           sx={{
//             textAlign: "justify",
//             mb: "4mm",
//             mt: "-2mm",
//           }}
//         >
//           Welcome to <strong>{company.name}</strong>. Quality is not just a
//           destination but a journey in which every employee contributes. We
//           invite you to be part of this journey.
//         </Typography>

//         <Typography
//           sx={{
//             textAlign: "justify",
//             mb: "5mm",
//             mt: "-2mm",
//           }}
//         >
//           This has reference to your application and subsequent interviews. We
//           are pleased to offer you the role of <strong>{data.position}</strong>.
//         </Typography>

//         <Typography
//           sx={{
//             textAlign: "justify",
//             mb: "4mm",
//             mt: "-3mm",
//           }}
//         >
//           On joining, your all-inclusive Cost to the Company (CTC) will be{" "}
//           <strong>Rs. {formatCurrency(totalAnnual)}/-</strong> per annum as per
//           Annexure A.
//         </Typography>

//         <Typography
//           sx={{
//             textAlign: "justify",
//             mb: "5mm",
//             mt: "-3mm",
//           }}
//         >
//           This offer is subject to verification of documents, background checks,
//           and positive reference validation as per company policy.
//         </Typography>

//         <Typography sx={{ textAlign: "justify", mb: "6mm", mt: "-3mm" }}>
//           You are required to join the services of the Company on or before{" "}
//           <strong>{data.joiningDate}</strong>.
//         </Typography>

//         <Typography sx={{ mb: "8mm" }}>
//           Thanking you and looking forward to having you with us.
//         </Typography>

//         {/* COMPANY SIGN */}
//         <Typography
//           sx={{
//             fontSize: "16pt",
//             fontWeight: 600,
//             mb: "6mm",
//           }}
//         >
//           For {company.name}
//         </Typography>

//         {/* SIGNATURE BLOCK */}
//         <Box sx={{ mb: "25mm" }}>
//           <Grid container justifyContent="space-between">
//             {/* LEFT SIDE */}
//             <Grid item>
//               {company.signature && (
//                 <Box
//                   component="img"
//                   src={company.signature}
//                   alt="Signature"
//                   sx={{
//                     width: "45mm",
//                     mb: "4mm",
//                     mt: "5mm",
//                   }}
//                 />
//               )}

//               <Box sx={{ mt: "18mm" }}>
//                 <Typography sx={{ fontWeight: 600 }}>
//                   {company.hrName}
//                 </Typography>

//                 <Typography sx={""}>HR Relations Lead</Typography>
//               </Box>
//             </Grid>

//             {/* RIGHT SIDE */}
//             <Grid item>
//               {company.stamp && (
//                 <Box
//                   component="img"
//                   src={company.stamp}
//                   alt="Company Stamp"
//                   sx={{
//                     width: "35mm",
//                     mb: "5mm",
//                     ml: "-52mm",
//                     mt: "-5mm",
//                   }}
//                 />
//               )}

//               <Typography sx={{}}>
//                 <strong>Signature :</strong> _______________________
//               </Typography>

//               <Typography sx={""}>
//                 <strong>Candidate Name:</strong> {data.candidateName}
//               </Typography>
//             </Grid>
//           </Grid>
//         </Box>
//       </A4Page>

//       {/* ================= PAGE 2 =================
//       <NimbjaOfferPage2 company={company} data={data} /> */}
//       <A4Page headerSrc={company.header} footerSrc={company.footer}>
//         <Box>
//           <Typography
//             align="center"
//             fontWeight={600}
//             mb={7}
//             sx={{ textDecoration: "underline", fontSize: "15px" }}
//           >
//             Annexure A Salary Structure
//           </Typography>

//           <TableContainer
//             component={Paper}
//             elevation={0}
//             sx={{ borderRadius: 0 }}
//           >
//             <Table
//               sx={{
//                 width: "100%",
//                 border: "1px solid #000",
//                 borderCollapse: "collapse",
//                 "& th, & td": {
//                   border: "1px solid #000",
//                   padding: "6px",
//                   fontSize: "15px",
//                 },
//               }}
//             >
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#ffc000" }}>
//                   <TableCell sx={{ fontWeight: 700 }}>
//                     Salary Components
//                   </TableCell>
//                   <TableCell align="right" sx={{ fontWeight: 700 }}>
//                     Per month (Rs.)
//                   </TableCell>
//                   <TableCell align="right" sx={{ fontWeight: 700 }}>
//                     Per Annum (Rs.)
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {salaryRows.map(([name, monthly, annual], i) => (
//                   <TableRow key={i}>
//                     <TableCell>{name}</TableCell>
//                     <TableCell align="right">
//                       {formatCurrency(monthly)}
//                     </TableCell>
//                     <TableCell align="right">
//                       {formatCurrency(annual)}
//                     </TableCell>
//                   </TableRow>
//                 ))}

//                 {/* <TableRow>
//                   <TableCell sx={{ fontWeight: 700 }}>
//                     Professional Tax (PT)
//                   </TableCell>
//                   <TableCell align="right">
//                     {formatCurrency(ptMonthly)}
//                   </TableCell>
//                   <TableCell align="right">
//                     {formatCurrency(ptAnnual)}
//                   </TableCell>
//                 </TableRow> */}

//                 <TableRow sx={{ backgroundColor: "#ffc000" }}>
//                   <TableCell sx={{ fontWeight: 700 }}>
//                     Total Monthly Gross Salary
//                   </TableCell>
//                   <TableCell align="right" sx={{ fontWeight: 700 }}>
//                     {formatCurrency(totalMonthly)}
//                   </TableCell>
//                   <TableCell align="right" sx={{ fontWeight: 700 }}>
//                     {formatCurrency(totalAnnual)}
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       </A4Page>
//     </>
//   );
// };;

// export default NimbjaOffer;




import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { formatCurrency } from "../../../../../utils/salaryCalculations";
import A4Page from "../../../../layout/A4Page";
import SalaryStructureTable from "../../../../common/SalaryStructureTable";


const NimbjaOffer = ({ company, data }) => {
  if (!company || !data) return null;

  // ================= HELPERS =================
  const round0 = (num) => Math.round(num);

  // ================= CTC =================
  const monthlyCTC = round0(Number(data.salary || data.ctc || 0));

  // ================= UPDATED PERCENTAGES =================
  const basicMonthly = round0(monthlyCTC * 0.48); // 40% + 8%
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);

  // ================= STATIC PF =================
  const pfMonthly = 3750;

  // ================= ANNUAL VALUES =================
  const basicAnnual = basicMonthly * 12;
  const hraAnnual = hraMonthly * 12;
  const daAnnual = daMonthly * 12;
  const specialAnnual = specialMonthly * 12;
  const foodAnnual = foodMonthly * 12;
  const pfAnnual = pfMonthly * 12;

  // ================= SALARY TABLE =================
  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["Bouqet Of Benefits", hraMonthly, hraAnnual],
    ["HRA", daMonthly, daAnnual],
    ["City Allowance", specialMonthly, specialAnnual],
    ["Superannuation Fund", foodMonthly, foodAnnual],
    ["Provident Fund (PF)", pfMonthly, pfAnnual], // Separate
  ];

  // ================= TOTAL EARNINGS =================
  const totalMonthly =
    basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly;

  const totalAnnual = totalMonthly * 12;

  const firstName = data.candidateName?.trim().split(" ")[0];
  
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  return (
    <>
      {/* ================================================================= */}
      {/* ================= PAGE 1 – OFFER LETTER ================= */}
      {/* ================================================================= */}

      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
        // watermarkSrc={company.watermark}
      >
        {/* =====================================================
    PAGE 1 – OFFER LETTER (FIXED LIKE INCREMENT)
===================================================== */}
        {/* =====================================================
    PAGE 1 – OFFER LETTER (FIXED LIKE INCREMENT)
===================================================== */}
        <Box>
          {/* CONTENT */}
          <Box>
            {/* DATE – RIGHT ALIGNED */}
            {/* <Typography sx={{ textAlign: "right", mb: 0 }}>
      {new Date(data.issueDate || new Date()).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })}
    </Typography> */}
            <Typography
              sx={{
                textAlign: "right",
                mb: "5mm",
                mt: "-12mm",
                fontSize: "11pt",
                fontFamily: "Bahnschrift",
              }}
            >
              {formatDate(data.issueDate)}
            </Typography>

            <Typography
              sx={{
                textAlign: "Center",
                marginTop: "-8mm",
                mb: "5mm",
                fontFamily: "Verdana",
                textDecoration: "underline",
                fontSize: "15px",
              }}
            >
              Offer Letter
            </Typography>
            {/* NAME */}
            <Typography sx={{ mb: 2, fontFamily: "Bahnschrift" }}>
              Name : {data.mrms} {data.candidateName}
            </Typography>

            <Typography sx={{ mb: 2, fontFamily: "Bahnschrift", mt: "-2mm" }}>
              Address : {data.address}
            </Typography>

            {/* SUBJECT */}
            <Typography sx={{ mb: 2, fontFamily: "Bahnschrift", mt: "-2mm" }}>
              Subject : Letter of intent for the position of {data.position}
            </Typography>

            <Typography sx={{ mb: 3, fontFamily: "Bahnschrift" }}>
              Dear {firstName},
            </Typography>

            <Typography
              sx={{ mb: 2, textAlign: "justify", fontFamily: "Bahnschrift" }}
            >
              Welcome to {company.name} Quality is not just a destination but a
              journey in which every employee contributes. We invite you to be
              part of this journey! This has reference to your application and
              subsequent interviews you had with us. We are pleased to offer you
              the role of <b>{data.position} </b>
              {/* {new Date(data.joiningDate).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })} */}
              .
            </Typography>

            <Typography
              sx={{ mb: 2, textAlign: "justify", fontFamily: "Bahnschrift" }}
            >
              On Joining, your all-inclusive Cost to the Company (CTC) will be{" "}
              <b>Rs.{formatCurrency(totalAnnual)}/-</b>
              as per Annexure A. This offer is made on the basis of your having
              furnished to the Company information and documents in support of
              your age, academic qualifications, previous work experience,
              relieving letter from your last employer and other particulars on
              or before your day of joining. The Company shall conduct a
              background and reference check as per Company policy and this
              appointment is conditional upon receiving positive feedback. If at
              any time it is found that you have furnished false information or
              withheld or suppressed any material fact or information, the
              Company shall be entitled to forthwith terminate your employment
              without notice. You are required to join the services of the
              Company at the earliest, but in any case, not later than{" "}
              <b>{formatDate(data.joiningDate)}.</b>
            </Typography>

            <Typography sx={{ mb: 2, fontFamily: "Bahnschrift" }}>
              Thanking you and looking forward to having you with us.
            </Typography>

            <Typography sx={{ mb: 2, fontFamily: "Bahnschrift" }}>
              For <b>{company.name} </b>
            </Typography>

            {/* SIGNATURE */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {company?.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: 42 }}
                />
              )}
              {company?.stamp && (
                <img src={company.stamp} alt="Stamp" style={{ height: 90 }} />
              )}
            </Box>

            <Typography sx={{ fontWeight: 600, fontFamily: "Bahnschrift" }}>
              {company.hrName}
            </Typography>
            <Typography sx={{ fontWeight: 600, fontFamily: "Bahnschrift" }}>
              HR Manager
            </Typography>
          </Box>
        </Box>
      </A4Page>

      {/* ================================================================= */}
      {/* ================= PAGE 2 – ANNEXURE A ================= */}
      {/* ================================================================= */}

      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box className="a4-content-only">
          <Typography
            sx={{
              textAlign: "right",
              mb: "5mm",
              mt: "-12mm",
              fontSize: "11pt",
              fontFamily: "Bahnschrift",
            }}
          >
            {formatDate(data.issueDate)}
          </Typography>

          {/* <Typography
            sx={{ mb: "6mm", fontSize: "11pt", fontFamily: "Bahnschrift" }}
          >
            <strong>
              Ref:NSS\VER1.1\PUN\PIMGUR\ADM-TEST\NSS0757 {data.employeeId}
            </strong>
          </Typography>

          {/* 🔥 ONLY THIS PART IS REPLACED */}
          <SalaryStructureTable
            salaryRows={salaryRows}
            totalMonthly={totalMonthly}
            totalAnnual={totalAnnual}
            data={data}
            formatDate={formatDate}
          />
        </Box>
        {/* Signature Block */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 9 }}>
          <Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              {company?.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: 45 }}
                />
              )}
              {company?.stamp && (
                <img src={company.stamp} alt="Stamp" style={{ height: 100 }} />
              )}
            </Box>
            <Typography mt={1} sx={{ fontFamily: "Bahnschrift" }}>
              {company.hrName}
            </Typography>
            <Typography sx={{ fontFamily: "Bahnschrift" }}>
              HR Relations Lead
            </Typography>
          </Box>

          <Box minWidth="250px" sx={{ mt: 13, fontFamily: "Bahnschrift" }}>
            <Typography sx={{ fontFamily: "Bahnschrift" }}>
              Signature: __________________
            </Typography>
            <Typography mt={2} sx={{ mt: 1.5, fontFamily: "Bahnschrift" }}>
              Candidate Name: {data.candidateName}
            </Typography>
          </Box>
        </Box>
      </A4Page>
    </>
  );
};

export default NimbjaOffer;


