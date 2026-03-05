// import React from "react";

// const NimbjaIncrement = ({ company, data }) => {
//   return (
//     <div
//       style={{
//         width: "210mm",
//         minHeight: "297mm",
//         backgroundColor: "#fff",
//         fontFamily: `"Times New Roman", serif`,
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* ================= HEADER ================= */}
//       {company?.headerImage && (
//         <img
//           src={company.headerImage}
//           alt="Header"
//           style={{ width: "100%", display: "block" }}
//         />
//       )}

//       {/* ================= CONTENT ================= */}
//       <div
//         style={{
//           padding: "22mm 25mm",
//           flexGrow: 1,
//         }}
//       >
//         {/* DATE */}
//         <p
//           style={{
//             fontSize: "14px",
//             textAlign: "right",
//             marginBottom: "48px",
//           }}
//         >
//           {data.issueDate}
//         </p>

//         {/* GREETING */}
//         <p style={{ fontSize: "14px", marginBottom: "32px" }}>
//           Dear {data.employeeName},
//         </p>

//         {/* PARAGRAPH 1 */}
//         <p style={{ fontSize: "14px", lineHeight: 1.8, marginBottom: "32px" }}>
//           In recognition of your previous years of service with{" "}
//           <strong>{company.name}</strong>, we are pleased to offer you a salary
//           increment. Effective <strong>{data.effectiveDate}</strong>, your
//           salary will increase to <strong>{data.newCTC}</strong> per annum.
//         </p>

//         {/* PARAGRAPH 2 */}
//         <p style={{ fontSize: "14px", lineHeight: 1.8, marginBottom: "32px" }}>
//           Your loyalty and commitment to the company over the years have been
//           invaluable and this increment is a token of our appreciation. We look
//           forward to many more years of your dedication and contribution.
//         </p>

//         {/* PARAGRAPH 3 */}
//         <p style={{ fontSize: "14px", lineHeight: 1.8, marginBottom: "64px" }}>
//           Once again, thank you for being such a reliable member of our team.
//         </p>

//         {/* SIGN OFF */}
//         <p style={{ fontSize: "14px", marginBottom: "40px" }}>
//           Yours Sincerely,
//         </p>

//         {/* SIGNATURE & STAMP */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "32px",
//             marginBottom: "16px",
//           }}
//         >
//           {data?.signature && (
//             <img
//               src={data.signature}
//               alt="Signature"
//               style={{ height: "60px" }}
//             />
//           )}

//           {data?.stamp && (
//             <img src={data.stamp} alt="Stamp" style={{ height: "70px" }} />
//           )}
//         </div>

//         {/* CEO NAME */}
//         <p style={{ fontSize: "14px", fontWeight: "bold" }}>
//           {company.ceoName}
//         </p>

//         <p style={{ fontSize: "14px" }}>CEO & Managing Director</p>
//       </div>

//       {/* ================= FOOTER ================= */}
//       {company?.footerImage && (
//         <img
//           src={company.footerImage}
//           alt="Footer"
//           style={{ width: "100%", display: "block" }}
//         />
//       )}
//     </div>
//   );
// };

// export default NimbjaIncrement;


// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   Paper,
//   TableBody,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";
// import {
//   calculateIncrement,
//   formatCurrency,
//   numberToWords,
// } from "../../../../utils/salaryCalculations";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-US", {
//         month: "long",
//         day: "2-digit",
//         year: "numeric",
//       })
//     : "";

// /* ================= STYLES ================= */
// const TEXT = {
//   fontFamily: "Times New Roman, serif",
//   fontSize: "14px",
//   lineHeight: 1.8,
// };

// /* 🔽 Smaller table cells */
// const CELL = {
//   border: "1px solid #000",
//   padding: "4px",
//   fontSize: "12.5px",
// };

// /* ================= FIXED SALARY DATA ================= */
// const SALARY_COMPONENTS = [
//   { name: "Basic", monthly: 4000, annual: 48000 },
//   { name: "House Rent Allowance", monthly: 1800, annual: 21600 },
//   { name: "Dearness Allowance", monthly: 1200, annual: 14400 },
//   { name: "Special Allowance", monthly: 1600, annual: 19200 },
//   { name: "Food Allowance", monthly: 600, annual: 7200 },
//   { name: "Misc. Allowance", monthly: 800, annual: 9600 },
// ];

// const NimbjaIncrement = ({ company, data }) => {
//   const newCTC = parseFloat(data.newCTC); // annual salary

//   // === Annual components (percentages of totalSalaryAnually) ===
//   const basicAnnual = newCTC * 0.4013;
//   const hraAnnual = newCTC * 0.1798;
//   const conveyanceAnnual = newCTC * 0.1599;
//   const medicAnnual = newCTC * 0.1394;
//   const specialAnnual = newCTC * 0.1196;

//   // === Monthly components ===
//   const basicMonthly = Math.round(basicAnnual / 12);
//   const hraMonthly = Math.round(hraAnnual / 12);
//   const conveyanceMonthly = Math.round(conveyanceAnnual / 12);
//   const medicMonthly = Math.round(medicAnnual / 12);
//   const specialMonthly = Math.round(specialAnnual / 12);

//   // Calculate increment details
//   const incrementDetails = calculateIncrement(
//     data.currentCTC || 350000, // Default to 3.5 LPA
//     data.incrementPercentage || 10 // Default to 10% increment
//   );

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   // Calculate previous year and issue year dynamically
//   const issueDate = data.issueDate ? new Date(data.issueDate) : new Date();
//   const issueYear = issueDate.getFullYear();
//   const prevYear = issueYear - 1;

//   if (!company || !data) return null;

//   const {
//     mrms = "",
//     candidateName = "",
//     address = "",
//     position = "",
//     joiningDate = "",
//     salary = 0,
//   } = data;

//   const COMPANY_NAME = company.name.toUpperCase();

//   return (
//     <>
//       <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
//         {/* ================= DATE ================= */}
//         <Typography
//           sx={{
//             ...TEXT,
//             textAlign: "right",
//             mb: "48px",
//           }}
//         >
//           {data.issueDate}
//         </Typography>

//         {/* ================= GREETING ================= */}
//         <Typography sx={{ ...TEXT, mb: "32px" }}>
//           Dear {data.employeeName},
//         </Typography>

//         {/* ================= PARAGRAPH 1 ================= */}
//         <Typography sx={{ ...TEXT, mb: "32px" }}>
//           In recognition of your previous years of service with{" "}
//           <b>{company.name}</b>, we are pleased to offer you a salary increment.
//           Effective <b>{data.effectiveDate}</b>, your salary will increase to{" "}
//           <b>{data.newCTC}</b> per annum.
//         </Typography>

//         {/* ================= PARAGRAPH 2 ================= */}
//         <Typography sx={{ ...TEXT, mb: "32px" }}>
//           Your loyalty and commitment to the company over the years have been
//           invaluable and this increment is a token of our appreciation. We look
//           forward to many more years of your dedication and contribution.
//         </Typography>

//         {/* ================= PARAGRAPH 3 ================= */}
//         <Typography sx={{ ...TEXT, mb: "64px" }}>
//           Once again, thank you for being such a reliable member of our team.
//         </Typography>

//         {/* ================= SIGN OFF ================= */}
//         <Typography sx={{ ...TEXT, mb: "40px" }}>Yours Sincerely,</Typography>

//         {/* ================= SIGNATURE & STAMP ================= */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: "32px",
//             mb: "16px",
//           }}
//         >
//           {data.signature && (
//             <Box
//               component="img"
//               src={data.signature}
//               alt="Signature"
//               sx={{ height: "60px" }}
//             />
//           )}

//           {data.stamp && (
//             <Box
//               component="img"
//               src={data.stamp}
//               alt="Stamp"
//               sx={{ height: "70px" }}
//             />
//           )}
//         </Box>

//         {/* ================= CEO DETAILS ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
//           {company.ceoName}
//         </Typography>
//         <Typography sx={TEXT}>CEO & Managing Director</Typography>
//       </A4Layout>
//       {/* ================= PAGE 2 : SALARY ANNEXURE ================= */}
//       <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
//         <Typography align="center" sx={{ ...TEXT, mb: 3 }}>
//           <b>Annexure A Salary Structure</b>
//         </Typography>

//         <TableContainer
//           component={Paper}
//           sx={{
//             border: "1.5px solid black",
//             borderRadius: 0,
//             backgroundColor: "transparent", // ✅ make transparent
//             "& .MuiTableCell-root": {
//               border: "1px solid black",
//               fontSize: "11pt",
//               padding: "6px 8px",
//               verticalAlign: "middle",
//               backgroundColor: "transparent", // ✅ make cells transparent too
//             },
//             boxShadow: "none", // ✅ remove shadow layer
//           }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "lightblue" }}>
//                 <TableCell sx={{ fontWeight: "bold" }}>
//                   Monthly Component
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                   Amount (₹)
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                   Yearly Component
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                   Amount (₹)
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell>Basic</TableCell>
//                 <TableCell align="center">
//                   {formatCurrency(basicMonthly)}
//                 </TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">
//                   {formatCurrency(basicAnnual)}
//                 </TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>House Rent Allowance (HRA)</TableCell>
//                 <TableCell align="center">
//                   {formatCurrency(hraMonthly)}
//                 </TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">
//                   {formatCurrency(hraAnnual)}
//                 </TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>Conveyance Allowance</TableCell>
//                 <TableCell align="center">
//                   {formatCurrency(conveyanceMonthly)}
//                 </TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">
//                   {formatCurrency(conveyanceAnnual)}
//                 </TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>Medical Allowance</TableCell>
//                 <TableCell align="center">
//                   {formatCurrency(medicMonthly)}
//                 </TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">
//                   {formatCurrency(medicAnnual)}
//                 </TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>Special Allowance</TableCell>
//                 <TableCell align="center">
//                   {formatCurrency(specialMonthly)}
//                 </TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">
//                   {formatCurrency(specialAnnual)}
//                 </TableCell>
//               </TableRow>

//               {/* Totals */}
//               <TableRow sx={{ backgroundColor: "rgba(173, 216, 230, 0.5)" }}>
//                 <TableCell sx={{ fontWeight: "bold" }}>Monthly Gross</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                   {formatCurrency(
//                     basicMonthly +
//                       hraMonthly +
//                       conveyanceMonthly +
//                       medicMonthly +
//                       specialMonthly
//                   )}
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Annual CTC</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                   {formatCurrency(newCTC)}
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-end",
//             mt: 2,
//             marginRight: "-20px",
//           }}
//         >
//           <Box>
//             <img
//               src={company.signature}
//               alt="Signature"
//               style={{ height: "50px" }}
//             />
//             <img src={company.stamp} alt="Stamp" style={{ height: "100px" }} />
//             <Typography>{company.hrName}</Typography>
//             <Typography>HR Relations Lead</Typography>
//           </Box>

//           <Box sx={{ width: "45%" }}>
//             <Typography>Signature : _______</Typography>
//             <Typography>Candidate Name : {candidateName}</Typography>
//           </Box>
//         </Box>
//       </A4Layout>
//     </>
//   );
// };

// export default NimbjaIncrement;


// import React from "react";
// import { calculateSalaryBreakdown, formatCurrency } from "../../../../utils/salaryCalculations"; // 🔴 adjust path if needed

// const NimbjaIncrement = ({ company, data }) => {
//   /* ================= BASIC DATA ================= */
//   const {
//     employeeName,
//     issueDate,
//     effectiveDate,
//     newCTC,
//     signature,
//     stamp,
//     candidateName,
//   } = data;

//   /* ================= CALL EXISTING LOGIC ================= */
//   const salary = calculateSalaryBreakdown(newCTC);

//   const {
//     monthly: {
//       basicSalary: basicMonthly,
//       hra: hraMonthly,
//       conveyanceAllowance: conveyanceMonthly,
//       medicalAllowance: medicMonthly,
//       specialAllowance: specialMonthly,
//       totalEarnings: monthlyGross,
//     },
//     annual: {
//       basicSalary: basicAnnual,
//       hra: hraAnnual,
//       conveyanceAllowance: conveyanceAnnual,
//       medicalAllowance: medicAnnual,
//       specialAllowance: specialAnnual,
//       ctc: annualCTC,
//     },
//   } = salary;

//   return (
//     <>
//       {/* =====================================================
//           ======================= PAGE 1 ======================
//           ===================================================== */}
//       <div
//         style={{
//           width: "210mm",
//           minHeight: "297mm",
//           backgroundColor: "#fff",
//           fontFamily: `"Times New Roman", serif`,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* HEADER */}
//         {company?.headerImage && (
//           <img
//             src={company.headerImage}
//             alt="Header"
//             style={{ width: "100%", display: "block" }}
//           />
//         )}

//         {/* CONTENT */}
//         <div style={{ padding: "22mm 25mm", flexGrow: 1 }}>
//           <p style={rightDate}>{issueDate}</p>

//           <p style={text}>Dear {employeeName},</p>

//           <p style={para}>
//             In recognition of your previous years of service with{" "}
//             <strong>{company.name}</strong>, we are pleased to offer you a
//             salary increment. Effective <strong>{effectiveDate}</strong>, your
//             salary will increase to <strong>{formatCurrency(annualCTC)}</strong>{" "}
//             per annum.
//           </p>

//           <p style={para}>
//             Your loyalty and commitment to the company over the years have been
//             invaluable and this increment is a token of our appreciation. We
//             look forward to many more years of your dedication and contribution.
//           </p>

//           <p style={{ ...para, marginBottom: "64px" }}>
//             Once again, thank you for being such a reliable member of our team.
//           </p>

//           <p style={{ fontSize: "14px", marginBottom: "40px" }}>
//             Yours Sincerely,
//           </p>

//           <div style={{ display: "flex", gap: "32px", marginBottom: "16px" }}>
//             {signature && (
//               <img src={signature} alt="Signature" style={{ height: "60px" }} />
//             )}
//             {stamp && (
//               <img src={stamp} alt="Stamp" style={{ height: "70px" }} />
//             )}
//           </div>

//           <p style={{ fontSize: "14px", fontWeight: "bold" }}>
//             {company.ceoName}
//           </p>
//           <p style={{ fontSize: "14px" }}>CEO & Managing Director</p>
//         </div>

//         {/* FOOTER */}
//         {company?.footerImage && (
//           <img
//             src={company.footerImage}
//             alt="Footer"
//             style={{ width: "100%", display: "block" }}
//           />
//         )}
//       </div>

//       {/* =====================================================
//           ======================= PAGE 2 ======================
//           ===================================================== */}
//       <div
//         style={{
//           width: "210mm",
//           minHeight: "297mm",
//           backgroundColor: "#fff",
//           fontFamily: `"Times New Roman", serif`,
//           display: "flex",
//           flexDirection: "column",
//           pageBreakBefore: "always",
//         }}
//       >
//         {/* HEADER */}
//         {company?.headerImage && (
//           <img
//             src={company.headerImage}
//             alt="Header"
//             style={{ width: "100%", display: "block" }}
//           />
//         )}

//         {/* CONTENT */}
//         <div style={{ padding: "22mm 25mm", flexGrow: 1 }}>
//           <p style={annexureTitle}>Annexure A – Salary Structure</p>

//           <table style={table}>
//             <thead>
//               <tr style={{ backgroundColor: "#abe568ff" }}>
//                 <th style={th}>Monthly Component</th>
//                 <th style={th}>Amount (₹)</th>
//                 <th style={th}>Yearly Component</th>
//                 <th style={th}>Amount (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               <Row label="Basic Salary" m={basicMonthly} y={basicAnnual} />
//               <Row
//                 label="House Rent Allowance (HRA)"
//                 m={hraMonthly}
//                 y={hraAnnual}
//               />
//               <Row
//                 label="Conveyance Allowance"
//                 m={conveyanceMonthly}
//                 y={conveyanceAnnual}
//               />
//               <Row label="Medical Allowance" m={medicMonthly} y={medicAnnual} />
//               <Row
//                 label="Special Allowance"
//                 m={specialMonthly}
//                 y={specialAnnual}
//               />

//               <tr style={{ backgroundColor: "#abe568ff" }}>
//                 <td style={td}>Monthly Gross</td>
//                 <td style={td}>{formatCurrency(monthlyGross)}</td>
//                 <td style={td}>Annual CTC</td>
//                 <td style={td}>{formatCurrency(annualCTC)}</td>
//               </tr>
//             </tbody>
//           </table>

//           {/* SIGNATURE BLOCK */}
//           <div style={signBlock}>
//             <div>
//               <img
//                 src={company.signature}
//                 alt="HR Signature"
//                 style={{ height: "50px" }}
//               />
//               <img
//                 src={company.stamp}
//                 alt="Stamp"
//                 style={{ height: "100px" }}
//               />
//               <p>{company.hrName}</p>
//               <p>HR Relations Lead</p>
//             </div>

//             <div>
//               <p>Signature : ____________________</p>
//               <p>Candidate Name : {candidateName}</p>
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         {company?.footerImage && (
//           <img
//             src={company.footerImage}
//             alt="Footer"
//             style={{ width: "100%", display: "block" }}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// /* ================= STYLES ================= */
// const rightDate = {
//   fontSize: "14px",
//   textAlign: "right",
//   marginBottom: "48px",
// };

// const text = {
//   fontSize: "14px",
//   marginBottom: "32px",
// };

// const para = {
//   fontSize: "14px",
//   lineHeight: 1.8,
//   marginBottom: "32px",
// };

// const annexureTitle = {
//   textAlign: "center",
//   fontSize: "15px",
//   fontWeight: "bold",
//   marginBottom: "24px",
// };

// const table = {
//   width: "100%",
//   borderCollapse: "collapse",
//   fontSize: "14px",
// };

// const th = {
//   border: "1px solid black",
//   padding: "8px",
//   textAlign: "center",
// };

// const td = {
//   border: "1px solid black",
//   padding: "8px",
//   textAlign: "center",
// };

// const totalRow = {
//   backgroundColor: "#eef7fb",
//   fontWeight: "bold",
// };

// const signBlock = {
//   display: "flex",
//   justifyContent: "space-between",
//   marginTop: "40px",
// };

// const Row = ({ label, m, y }) => (
//   <tr>
//     <td style={td}>{label}</td>
//     <td style={td}>{formatCurrency(m)}</td>
//     <td style={td}></td>
//     <td style={td}>{formatCurrency(y)}</td>
//   </tr>
// );

// export default NimbjaIncrement;
















// import React from "react";
// import {
//   calculateSalaryBreakdown,
//   formatCurrency,
// } from "../../../../utils/salaryCalculations";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) => {
//   if (!date) return "";
//   return new Date(date).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });
// };

// const NimbjaIncrement = ({ company, data }) => {
//   if (!company || !data) return null;

//   /* ================= BASIC DATA ================= */
//   const { employeeName, issueDate, effectiveDate, newCTC, candidateName } =
//     data;

//   /* ================= CALL EXISTING LOGIC ================= */
//   const salary = calculateSalaryBreakdown(newCTC);

//   const {
//     monthly: {
//       basicSalary: basicMonthly,
//       hra: hraMonthly,
//       conveyanceAllowance: conveyanceMonthly,
//       medicalAllowance: medicMonthly,
//       specialAllowance: specialMonthly,
//       totalEarnings: monthlyGross,
//     },
//     annual: {
//       basicSalary: basicAnnual,
//       hra: hraAnnual,
//       conveyanceAllowance: conveyanceAnnual,
//       medicalAllowance: medicAnnual,
//       specialAllowance: specialAnnual,
//       ctc: annualCTC,
//     },
//   } = salary;

//   return (
//     <>
//       {/* =====================================================
//           ======================= PAGE 1 ======================
//           ===================================================== */}
//       <div
//         className="a4-content-only"
//         style={{
//           width: "210mm",
//           minHeight: "297mm",
//           backgroundColor: "#fff",
//           fontFamily: "Bahnschrift, 'Segoe UI', Arial, sans-serif",
//           fontSize: "11pt",
//           lineHeight: "1.5",
//           color: "#000",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* ================= HEADER ================= */}
//         {company?.headerImage && (
//           <img
//             src={company.headerImage}
//             alt="Header"
//             style={{ width: "100%", display: "block" }}
//           />
//         )}

//         {/* ================= CONTENT ================= */}
//         <div style={{ padding: "22mm 25mm", flexGrow: 1 }}>
//           {/* DATE */}
//           <p style={rightDate}>{formatDate(issueDate)}</p>

//           {/* GREETING */}
//           <p style={greeting}>Dear {employeeName},</p>

//           {/* PARAGRAPH 1 */}
//           <p style={para}>
//             In recognition of your previous years of service with{" "}
//             <strong>{company.name}</strong>, we are pleased to offer you a
//             salary increment. Effective{" "}
//             <strong>{formatDate(effectiveDate)}</strong>, your salary will
//             increase to <strong>{formatCurrency(annualCTC)}</strong> per annum.
//           </p>

//           {/* PARAGRAPH 2 */}
//           <p style={para}>
//             Your loyalty and commitment to the company over the years have been
//             invaluable and this increment is a token of our appreciation. We
//             look forward to many more years of your dedication and contribution.
//           </p>

//           {/* PARAGRAPH 3 */}
//           <p style={{ ...para, marginBottom: "36px" }}>
//             Once again, thank you for being such a reliable member of our team.
//           </p>

//           {/* SIGN OFF */}
//           <p style={signOff}>Yours sincerely,</p>

//           {/* SIGNATURE & STAMP */}
//           <div style={signatureRow}>
//             {company.signature && (
//               <img
//                 src={company.signature}
//                 alt="Signature"
//                 style={{ height: "42px" }}
//               />
//             )}
//             {company.stamp && (
//               <img src={company.stamp} alt="Stamp" style={{ height: "70px" }} />
//             )}
//           </div>

//           {/* NAME & DESIGNATION */}
//           <p style={signName}>{company.ceoName}</p>
//           <p>CEO & Managing Director</p>
//         </div>

//         {/* ================= FOOTER ================= */}
//         {company?.footerImage && (
//           <img
//             src={company.footerImage}
//             alt="Footer"
//             style={{ width: "100%", display: "block" }}
//           />
//         )}
//       </div>

//       {/* =====================================================
//           ======================= PAGE 2 ======================
//           ===================================================== */}
//       <div
//         className="a4-content-only"
//         style={{
//           width: "210mm",
//           minHeight: "297mm",
//           backgroundColor: "#fff",
//           fontFamily: "Bahnschrift, 'Segoe UI', Arial, sans-serif",
//           fontSize: "11pt",
//           lineHeight: "1.5",
//           display: "flex",
//           flexDirection: "column",
//           pageBreakBefore: "always",
//         }}
//       >
//         {/* HEADER */}
//         {company?.headerImage && (
//           <img
//             src={company.headerImage}
//             alt="Header"
//             style={{ width: "100%", display: "block" }}
//           />
//         )}

//         {/* CONTENT */}
//         <div style={{ padding: "22mm 25mm", flexGrow: 1 }}>
//           <p style={annexureTitle}>Annexure – A : Salary Structure</p>

//           <table style={table}>
//             <thead>
//               <tr style={{ backgroundColor: "#abe568ff" }}>
//                 <th style={th}>Monthly Component</th>
//                 <th style={th}>Amount (₹)</th>
//                 <th style={th}>Yearly Component</th>
//                 <th style={th}>Amount (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               <Row label="Basic Salary" m={basicMonthly} y={basicAnnual} />
//               <Row label="House Rent Allowance" m={hraMonthly} y={hraAnnual} />
//               <Row
//                 label="Conveyance Allowance"
//                 m={conveyanceMonthly}
//                 y={conveyanceAnnual}
//               />
//               <Row label="Medical Allowance" m={medicMonthly} y={medicAnnual} />
//               <Row
//                 label="Special Allowance"
//                 m={specialMonthly}
//                 y={specialAnnual}
//               />

//               <tr style={{ backgroundColor: "#abe568ff", fontWeight: "600" }}>
//                 <td style={td}>Monthly Gross</td>
//                 <td style={td}>{formatCurrency(monthlyGross)}</td>
//                 <td style={td}>Annual CTC</td>
//                 <td style={td}>{formatCurrency(annualCTC)}</td>
//               </tr>
//             </tbody>
//           </table>

//           {/* SIGNATURE BLOCK */}
//           <div style={signBlock}>
//             <div>
//               {company.signature && (
//                 <img
//                   src={company.signature}
//                   alt="HR Signature"
//                   style={{ height: "45px" }}
//                 />
//               )}
//               {company.stamp && (
//                 <img
//                   src={company.stamp}
//                   alt="Stamp"
//                   style={{ height: "90px" }}
//                 />
//               )}
//               <p>{company.hrName}</p>
//               <p>HR Relations Lead</p>
//             </div>

//             <div>
//               <p>Signature : _________________________</p>
//               <p>Candidate Name : {candidateName}</p>
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         {company?.footerImage && (
//           <img
//             src={company.footerImage}
//             alt="Footer"
//             style={{ width: "100%", display: "block" }}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// /* ================= STYLES ================= */

// const rightDate = {
//   textAlign: "right",
//   marginBottom: "32px",
// };

// const greeting = {
//   marginBottom: "18px",
// };

// const para = {
//   textAlign: "justify",
//   marginBottom: "14px",
// };

// const signOff = {
//   marginBottom: "24mm",
// };

// const signatureRow = {
//   display: "flex",
//   alignItems: "flex-start",
//   gap: "28mm",
//   marginBottom: "10px",
// };

// const signName = {
//   fontWeight: 600,
// };

// const annexureTitle = {
//   textAlign: "center",
//   fontWeight: 600,
//   marginBottom: "20px",
// };

// const table = {
//   width: "100%",
//   borderCollapse: "collapse",
// };

// const th = {
//   border: "1px solid #000",
//   padding: "8px",
//   textAlign: "center",
//   fontWeight: 600,
// };

// const td = {
//   border: "1px solid #000",
//   padding: "8px",
//   textAlign: "center",
// };

// const signBlock = {
//   display: "flex",
//   justifyContent: "space-between",
//   marginTop: "36px",
// };

// const Row = ({ label, m, y }) => (
//   <tr>
//     <td style={td}>{label}</td>
//     <td style={td}>{formatCurrency(m)}</td>
//     <td style={td}></td>
//     <td style={td}>{formatCurrency(y)}</td>
//   </tr>
// );

// export default NimbjaIncrement;











// import React from "react";
// import { formatCurrency } from "../../../../utils/salaryCalculations";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) => {
//   if (!date) return "";
//   return new Date(date).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });
// };

// const NimbjaIncrement = ({ company, data }) => {
//   if (!company || !data) return null;

//   /* ================= SALARY CALCULATION ================= */
//   const annualCTC = Number(data.newCTC || 0);

//   const basicAnnual = annualCTC * 0.4;
//   const hraAnnual = annualCTC * 0.18;
//   const daAnnual = annualCTC * 0.12;
//   const specialAnnual = annualCTC * 0.16;
//   const foodAnnual = annualCTC * 0.06;
//   const miscAnnual = annualCTC * 0.08;

//   const salaryComponents = [
//     {
//       name: "Basic",
//       monthly: Math.round(basicAnnual / 12),
//       annual: basicAnnual,
//     },
//     {
//       name: "Bouquet Of Benefits",
//       monthly: Math.round(hraAnnual / 12),
//       annual: hraAnnual,
//     },
//     {
//       name: "City Allowance",
//       monthly: Math.round(daAnnual / 12),
//       annual: daAnnual,
//     },
//     {
//       name: "Retirals",
//       monthly: Math.round(specialAnnual / 12),
//       annual: specialAnnual,
//     },
//     {
//       name: "Superannuation Fund",
//       monthly: Math.round(foodAnnual / 12),
//       annual: foodAnnual,
//     },
//     {
//       name: "Performance Bonus",
//       monthly: Math.round(miscAnnual / 12),
//       annual: miscAnnual,
//     },
//   ];

//   const totalMonthly = salaryComponents.reduce((sum, i) => sum + i.monthly, 0);
//   const totalAnnual = salaryComponents.reduce((sum, i) => sum + i.annual, 0);

//   return (
//     <>
//       {/* =========================== PAGE 1 =========================== */}
//       <div className="a4-content-only" style={page}>
//         {company.headerImage && (
//           <img src={company.headerImage} alt="Header" style={fullWidth} />
//         )}

//         <div style={content}>
//           <p style={rightDate}>{formatDate(data.issueDate)}</p>

//           <p style={greeting}>
//             Dear {data.candidateName || data.employeeName},
//           </p>

//           <p style={para}>
//             In recognition of your previous years of service with{" "}
//             <strong>{company.name}</strong>, we are pleased to inform you of a
//             salary increment. Effective{" "}
//             <strong>{formatDate(data.effectiveDate)}</strong>, your revised
//             annual CTC will be <strong>{formatCurrency(annualCTC)}</strong>.
//           </p>

//           <p style={para}>
//             Your dedication and commitment to the organization are truly
//             appreciated, and we look forward to your continued contribution and
//             success.
//           </p>

//           <p style={{ ...para, marginBottom: "36px" }}>
//             We wish you continued growth and success with the organization.
//           </p>

//           <p style={signOff}>Yours sincerely,</p>

//           <div style={signatureRow}>
//             {company.signature && (
//               <img
//                 src={company.CEO}
//                 alt="Signature"
//                 style={{ height: "42px",
                  
//                  }}
//               />
//             )}
//             {company.stamp && (
//               <img
//                 src={company.stamp}
//                 alt="Stamp"
//                 style={{
//                   height: "100px",
//                   mt:"1mm",
//                   marginLeft: "-20mm", // 🔑 ADDED → moves stamp to LEFT
//                 }}
//               />
//             )}
//           </div>

//           <p style={signName}>{company.ceoName}</p>
//           <p>CEO & Managing Director</p>
//         </div>

//         {company.footerImage && (
//           <img src={company.footerImage} alt="Footer" style={fullWidth} />
//         )}
//       </div>

//       {/* =========================== PAGE 2 =========================== */}
//       <div
//         className="a4-content-only"
//         style={{ ...page, pageBreakBefore: "always" }}
//       >
//         {company.headerImage && (
//           <img src={company.headerImage} alt="Header" style={fullWidth} />
//         )}

//         <div style={content}>
//           <p style={annexureTitle}>Annexure – A : Salary Structure</p>

//           <div style={{ marginBottom: "16px" }}>
//             <p>
//               <strong>Employee Code :</strong> {data.employeeId}
//             </p>
//             <p>
//               <strong>Employee Name :</strong>{" "}
//               {data.candidateName || data.employeeName}
//             </p>
//             <p>
//               <strong>Effective Date :</strong> {formatDate(data.effectiveDate)}
//             </p>
//           </div>

//           <table style={table}>
//             <thead>
//               <tr style={{ backgroundColor: "#abe568ff" }}>
//                 <th style={thLeft}>Salary Components</th>
//                 <th style={thCenter}>Per Month (Rs.)</th>
//                 <th style={thCenter}>Per Annum (Rs.)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {salaryComponents.map((item, idx) => (
//                 <tr key={idx}>
//                   <td style={tdLeft}>{item.name}</td>
//                   <td style={tdCenter}>{formatCurrency(item.monthly)}</td>
//                   <td style={tdCenter}>{formatCurrency(item.annual)}</td>
//                 </tr>
//               ))}

//               <tr style={{ backgroundColor: "#abe568ff", fontWeight: 600 }}>
//                 <td style={tdLeft}>Total Gross Salary</td>
//                 <td style={tdCenter}>{formatCurrency(totalMonthly)}</td>
//                 <td style={tdCenter}>{formatCurrency(totalAnnual)}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {company.footerImage && (
//           <img src={company.footerImage} alt="Footer" style={fullWidth} />
//         )}
//       </div>
//     </>
//   );
// };

// /* ================= STYLES ================= */

// const page = {
//   width: "210mm",
//   minHeight: "297mm",
//   backgroundColor: "#fff",
//   fontFamily: "Bahnschrift, 'Segoe UI', Arial, sans-serif",
//   fontSize: "11pt",
//   lineHeight: "1.5",
//   display: "flex",
//   flexDirection: "column",
// };

// const content = { padding: "22mm 25mm", flexGrow: 1 };
// const fullWidth = { width: "100%", display: "block" };

// const rightDate = { textAlign: "right", marginBottom: "32px" };
// const greeting = { marginBottom: "18px" };
// const para = { textAlign: "justify", marginBottom: "14px" };
// const signOff = { marginBottom: "24mm" };

// const signatureRow = {
//   display: "flex",
//   alignItems: "flex-start",
//   gap: "28mm",
//   marginBottom: "10px",
// };

// const signName = { fontWeight: 600 };
// const annexureTitle = {
//   textAlign: "center",
//   fontWeight: 600,
//   marginBottom: "20px",
// };

// const table = { width: "100%", borderCollapse: "collapse" };
// const thLeft = {
//   border: "1px solid #000",
//   padding: "8px",
//   textAlign: "left",
//   fontWeight: 600,
// };
// const thCenter = {
//   border: "1px solid #000",
//   padding: "8px",
//   textAlign: "center",
//   fontWeight: 600,
// };
// const tdLeft = { border: "1px solid #000", padding: "8px", textAlign: "left" };
// const tdCenter = {
//   border: "1px solid #000",
//   padding: "8px",
//   textAlign: "center",
// };

// export default NimbjaIncrement;






import React from "react";
import { formatCurrency } from "../../../../../utils/salaryCalculations";
import A4Page from "../../../../layout/A4Page";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import SalaryStructureTable from "../../../../common/SalaryStructureTable";


/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const NimbjaIncrement = ({ company, data }) => {
  /* ================= SALARY LOGIC (DEVCONS – CUSTOM ANNEXURE) ================= */

  // Helper to keep 2 decimals everywhere
  const round0 = (num) => Math.round(num);

  // Source of truth
  const monthlyCTC = round0(Number(data.newCTC || 0));

  // ================= PERCENTAGE BREAKUP =================
  const basicMonthly = round0(monthlyCTC * 0.4);
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);
  const miscMonthly = round0(monthlyCTC * 0.08); // 8%

  // ================= ANNUAL VALUES =================
  const basicAnnual = round0(basicMonthly * 12);
  const hraAnnual = round0(hraMonthly * 12);
  const daAnnual = round0(daMonthly * 12);
  const specialAnnual = round0(specialMonthly * 12);
  const foodAnnual = round0(foodMonthly * 12);
  const miscAnnual = round0(miscMonthly * 12);

  // ================= SALARY TABLE STRUCTURE =================
  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["House Rent Allowance", hraMonthly, hraAnnual],
    ["Dearness Allowance", daMonthly, daAnnual],
    ["Special Allowance", specialMonthly, specialAnnual],
    ["Food Allowance", foodMonthly, foodAnnual],
    ["Misc. Allowance", miscMonthly, miscAnnual],
  ];

  // ================= TOTALS =================
  const totalMonthly = round0(salaryRows.reduce((sum, row) => sum + row[1], 0));

  const totalAnnual = round0(salaryRows.reduce((sum, row) => sum + row[2], 0));

  return (
    <>
      {/* =========================== PAGE 1 =========================== */}
      <div className="a4-content-only" style={page}>
        {company.headerImage && (
          <img src={company.headerImage} alt="Header" style={fullWidth} />
        )}

        <div style={content}>
          <p style={rightDate}>{formatDate(data.issueDate)}</p>

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
            Appraisal Letter
          </Typography>

          <p style={greeting}>
            Dear {data.candidateName || data.employeeName},
          </p>

          <p style={para}>
            I am pleased to inform you that due to your consistent outstanding
            performance and dedication to your role as Software Test Engineer,
            we are providing you with a salary increment effective{" "}
            <strong>{formatDate(data.effectiveDate)}</strong>, your revised
            annual CTC will be <strong>{formatCurrency(totalAnnual)}</strong>.
          </p>

          <p style={para}>
            Your dedication and commitment to the organization are truly
            appreciated, and we look forward to your continued contribution and
            success.
          </p>

          <p style={{ ...para, marginBottom: "36px" }}>
            We wish you continued growth and success with the organization.
          </p>

          <p style={signOff}>Yours sincerely,</p>

          <div style={signatureRow}>
            {company.signature && (
              <img
                src={company.CEO}
                alt="Signature"
                style={{ height: "42px" }}
              />
            )}
            {company.stamp && (
              <img
                src={company.stamp}
                alt="Stamp"
                style={{
                  height: "100px",
                  marginLeft: "-26mm",
                  marginTop: "-8mm",
                }}
              />
            )}
          </div>

          <p style={signName}>{company.ceoName}</p>
          <strong>
            <p>CEO & Managing Director</p>
          </strong>
        </div>

        {company.footerImage && (
          <img src={company.footerImage} alt="Footer" style={fullWidth} />
        )}
      </div>

      {/* =========================== PAGE 2 =========================== */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        {/* Date */}
        <Typography
          sx={{
            textAlign: "right",
            fontSize: "11pt",
            fontFamily: "Bahnschrift",
            mb: 2,
          }}
        >
          {formatDate(data.issueDate)}
        </Typography>

        {/* Ref */}
        <Typography
          sx={{
            fontSize: "11pt",
            fontFamily: "Bahnschrift",
            mb: 4,
            fontWeight: 600,
          }}
        >
          Ref:NSS\VER1.1\PUN\PIMGUR\ADM-TEST\{data.employeeId} 
        </Typography>

        {/* Title */}
        <Typography
          align="center"
          sx={{
            fontSize: "14pt",
            fontWeight: 600,
            textDecoration: "underline",
            mb: 5,
            fontFamily: "Bahnschrift",
          }}
        >
          Salary Annexure A
        </Typography>

        {/* Employee Details */}
       

        {/* Table */}
        <Table
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            "& th": {
              backgroundColor: "#8bc34a",
              fontWeight: 700,
              fontSize: "13px",
              border: "1px solid #000",
              padding: "6px",
            },
            "& td": {
              border: "1px solid #000",
              padding: "6px",
              fontSize: "13px",
              fontFamily: `"Times New Roman", Times, serif`,
            },
          }}
        >
          <TableBody>
            {/* Header Row */}
            <TableRow>
              <TableCell sx={{ backgroundColor: "#8bc34a" }} align="center">
                <b>Salary Components</b>
              </TableCell>
              <TableCell sx={{ backgroundColor: "#8bc34a" }} align="center">
                <b>Per month (Rs.)</b>
              </TableCell>
              <TableCell sx={{ backgroundColor: "#8bc34a" }} align="center">
                <b>Per Annum (Rs.)</b>
              </TableCell>
            </TableRow>

            {/* Salary Rows */}
            <TableRow>
              <TableCell>Basic</TableCell>
              <TableCell align="right">{basicMonthly}</TableCell>
              <TableCell align="right">{basicAnnual}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Bouqet Of Benefits</TableCell>
              <TableCell align="right">{hraMonthly}</TableCell>
              <TableCell align="right">{hraAnnual}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>HRA</TableCell>
              <TableCell align="right">{daMonthly}</TableCell>
              <TableCell align="right">{daAnnual}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>City Allowance</TableCell>
              <TableCell align="right">{specialMonthly}</TableCell>
              <TableCell align="right">{specialAnnual}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Superannuation Fund</TableCell>
              <TableCell align="right">{foodMonthly}</TableCell>
              <TableCell align="right">{foodAnnual}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Performance Bonus</TableCell>
              <TableCell align="right">{miscMonthly}</TableCell>
              <TableCell align="right">{miscAnnual}</TableCell>
            </TableRow>

            {/* Total Row */}
            <TableRow sx={{ backgroundColor: "#8bc34a" }}>
              <TableCell sx={{ fontWeight: 700 }}>Total Salary</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                {totalMonthly}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                {totalAnnual}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Confidential Note */}
        <Typography
          sx={{
            mt: 6,
            fontSize: "12pt",
            fontFamily: "Bahnschrift",
            textAlign: "center",
          }}
        >
          
        </Typography>
      </A4Page>
    </>
  );
};

/* ================= STYLES ================= */

const page = {
  width: "210mm",
  minHeight: "297mm",
  backgroundColor: "#fff",
  fontFamily: "Bahnschrift, 'Segoe UI', Arial, sans-serif",
  fontSize: "11pt",
  lineHeight: "1.5",
  display: "flex",
  flexDirection: "column",
};

const content = { padding: "22mm 25mm", flexGrow: 1 };
const fullWidth = { width: "100%", display: "block" };

const rightDate = { textAlign: "right", marginBottom: "32px" };
const greeting = { marginBottom: "18px" };
const para = { textAlign: "justify", marginBottom: "14px" };
const signOff = { marginBottom: "24mm" };

const signatureRow = {
  display: "flex",
  alignItems: "flex-start",
  gap: "28mm",
  marginBottom: "10px",
};

const signName = { fontWeight: 600 };
const annexureTitle = {
  textAlign: "center",
  fontWeight: 600,
  marginBottom: "20px",
};

const table = { width: "100%", borderCollapse: "collapse" };
const thLeft = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "left",
  fontWeight: 600,
};
const thCenter = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "center",
  fontWeight: 600,
};
const tdLeft = { border: "1px solid #000", padding: "8px", textAlign: "left" };
const tdCenter = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "center",
};

export default NimbjaIncrement;



