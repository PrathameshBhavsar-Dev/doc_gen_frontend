// // import React, { useMemo } from "react";
// // import {
// //   Typography,
// //   Box,
// //   Table,
// //   TableRow,
// //   TableCell,
// //   TableBody,
// //   TableHead,
// //   TableContainer,
// // } from "@mui/material";
// // import A4Layout from "../../../../layout/A4Page";

// // /* ================= SALARY UTILITIES ================= */
// // import {
// //   generateOfferLetterComponents,
// //   formatCurrency,
// //   numberToWords,
// // } from "../../../../../utils/salaryCalculations";

// // /* ================= COMMON TEXT ================= */
// // const TEXT = {
// //   fontFamily: "Verdana, Geneva, sans-serif",
// //   fontSize: "14px",
// //   lineHeight: 1.8,
// // };

// // /* ================= DATE FORMAT ================= */
// // const formatDate = (date) =>
// //   date
// //     ? new Date(date).toLocaleDateString("en-US", {
// //         month: "long",
// //         day: "2-digit",
// //         year: "numeric",
// //       })
// //     : "";

// // export default function JDITIncrement({ company, data }) {
// //   const {
// //     employeeName = "",
// //     employeeId = "",
// //     issueDate = "",
// //     effectiveDate = "",
// //     newCTC = 0,
// //     designation = "",
// //     mrms = "",
// //   } = data || {};

// //   const firstName = employeeName.split(" ")[0] || "";

// //   /* ================= SALARY ================= */
// //   const salaryComponents = useMemo(
// //     () => generateOfferLetterComponents(newCTC),
// //     [newCTC]
// //   );

// //   const totalAnnual = Number(newCTC) || 0;
// //   const totalMonthly = Math.round(totalAnnual / 12);
// //   const salaryInWords = numberToWords(totalAnnual);

// //   const monthlyPF = 3750;
// //   const annualPF = monthlyPF * 12;

// //   return (
// //     <>
// //       {/* ================= PAGE 1 – INCREMENT LETTER ================= */}
// //       <A4Layout company={company}>
// //         <Box sx={TEXT}>
// //           <Typography align="right">
// //             {formatDate(issueDate)}
// //           </Typography>

// //           <Typography sx={{ mt: 5 }}>
// //             Dear {firstName},
// //           </Typography>

// //           <Typography sx={{ mt: 3 }}>
// //             We are delighted to inform you that in recognition of your exceptional
// //             performance and dedication as <b>{designation}</b>, your salary has been increased.
// //             <br /><br />
// //             Your new annual salary will be{" "}
// //             <b>Rs. {formatCurrency(totalAnnual)}</b> per annum
// //             effective from <b>{formatDate(effectiveDate)}</b>.
// //           </Typography>

// //           <Typography sx={{ mt: 3 }}>
// //             Thank you for your hard work and dedication. We sincerely appreciate
// //             your efforts and look forward to your continued contributions to our team.
// //           </Typography>

// //           <Typography sx={{ mt: 5 }}>Best Regards,</Typography>

// //           {/* SIGNATURE & STAMP */}
// //           <Box sx={{ display: "flex", gap: 3, mt: 5 }}>
// //             {company.incrementSignature && (
// //               <Box
// //                 component="img"
// //                 src={company.incrementSignature}
// //                 sx={{ height: 50 }}
// //               />
// //             )}
// //             {company.stamp && (
// //               <Box
// //                 component="img"
// //                 src={company.stamp}
// //                 sx={{ height: 100 }}
// //               />
// //             )}
// //           </Box>
// //         </Box>

// //         <Typography><b>{company.hrNameOne}</b></Typography>
// //         <Typography><b>CEO & Managing Director</b></Typography>
// //       </A4Layout>

// //       {/* ================= PAGE 2 – SALARY ANNEXURE ================= */}
// //       <A4Layout company={company}>
// //         <Typography align="center" sx={{ ...TEXT, fontWeight: "bold" }}>
// //           Salary Annexure
// //         </Typography>

// //         <Box
// //           sx={{
// //             width: "150px",
// //             height: "3px",
// //             backgroundColor: "#000",
// //             margin: "0 auto 30px",
// //           }}
// //         />

// //         {/* EMPLOYEE INFO */}
// //         <Box sx={{ mb: 3 }}>
// //           <Typography sx={TEXT}>
// //             Employee Code : {employeeId}
// //           </Typography>
// //           <Typography sx={TEXT}>
// //             Employee Name : {mrms}{employeeName}
// //           </Typography>
// //           <Typography sx={TEXT}>
// //             Effective Date : {formatDate(effectiveDate)}
// //           </Typography>
// //         </Box>

// //         {/* ================= SALARY TABLE ================= */}
// //         <TableContainer sx={{ mb: "4mm" }}>
// //           <Table
// //             size="small"
// //             sx={{
// //               border: "1px solid #333",
// //               borderCollapse: "collapse",
// //               width: "100%",
// //             }}
// //           >
// //             <TableHead>
// //               <TableRow
// //                 sx={{
// //                   backgroundColor: "#000",
// //                   "& th": {
// //                     color: "#fff",
// //                     fontWeight: 600,
// //                     fontSize: "10pt",
// //                     border: "1px solid #333",
// //                     py: "0.4mm",
// //                   },
// //                 }}
// //               >
// //                 <TableCell>Salary Components</TableCell>
// //                 <TableCell align="center">Per month (Rs.)</TableCell>
// //                 <TableCell align="center">Per Annum (Rs.)</TableCell>
// //               </TableRow>
// //             </TableHead>

// //             <TableBody>
// //               {/* Dynamic Components except Misc */}
// //               {salaryComponents
// //                 .filter((row) => row.name !== "Misc")
// //                 .map((row, i) => (
// //                   <TableRow key={i}>
// //                     <TableCell
// //                       sx={{
// //                         border: "1px solid #333",
// //                         fontSize: "9.75pt",
// //                         py: "0.35mm",
// //                       }}
// //                     >
// //                       {row.name}
// //                     </TableCell>

// //                     <TableCell
// //                       align="center"
// //                       sx={{
// //                         border: "1px solid #333",
// //                         fontSize: "9.75pt",
// //                         py: "0.35mm",
// //                       }}
// //                     >
// //                       {formatCurrency(row.monthly)}
// //                     </TableCell>

// //                     <TableCell
// //                       align="center"
// //                       sx={{
// //                         border: "1px solid #333",
// //                         fontSize: "9.75pt",
// //                         py: "0.35mm",
// //                       }}
// //                     >
// //                       {formatCurrency(row.annual)}
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}

// //               {/* Static PF Row */}
// //               <TableRow>
// //                 <TableCell
// //                   sx={{
// //                     border: "1px solid #333",
// //                     fontSize: "9.75pt",
// //                     py: "0.35mm",
// //                   }}
// //                 >
// //                   Provident Fund (PF)
// //                 </TableCell>

// //                 <TableCell
// //                   align="center"
// //                   sx={{
// //                     border: "1px solid #333",
// //                     fontSize: "9.75pt",
// //                     py: "0.35mm",
// //                   }}
// //                 >
// //                   {formatCurrency(monthlyPF)}
// //                 </TableCell>

// //                 <TableCell
// //                   align="center"
// //                   sx={{
// //                     border: "1px solid #333",
// //                     fontSize: "9.75pt",
// //                     py: "0.35mm",
// //                   }}
// //                 >
// //                   {formatCurrency(annualPF)}
// //                 </TableCell>
// //               </TableRow>

// //               {/* Total Row */}
// //               <TableRow
// //                 sx={{
// //                   backgroundColor: "#000",
// //                   "& td": {
// //                     color: "#fff",
// //                     fontWeight: 600,
// //                     fontSize: "10pt",
// //                     border: "1px solid #333",
// //                     py: "0.4mm",
// //                   },
// //                 }}
// //               >
// //                 <TableCell>Total Monthly Gross Salary</TableCell>
// //                 <TableCell align="center">
// //                   {formatCurrency(totalMonthly)}
// //                 </TableCell>
// //                 <TableCell align="center">
// //                   {formatCurrency(totalAnnual)}
// //                 </TableCell>
// //               </TableRow>
// //             </TableBody>
// //           </Table>
// //         </TableContainer>

// //         <Typography sx={{ ...TEXT, mt: 4 }}>
// //           Please note that the details in this communication are confidential and
// //           you are requested not to share the same with others.
// //         </Typography>
// //       </A4Layout>
// //     </>
// //   );
// // }


// // //////////////////////////////////////////////////////////////////////////////////////////

// // import React from "react";
// // import {
// //   Box,
// //   Typography,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableRow,
// //   TableHead,
// // } from "@mui/material";
// // import A4Layout from "../../../layout/A4Page";

// // /* ================= DATE FORMAT ================= */
// // const formatDate = (date) =>
// //   date
// //     ? new Date(date).toLocaleDateString("en-US", {
// //         month: "long",
// //         day: "2-digit",
// //         year: "numeric",
// //       })
// //     : "";

// // /* ================= COMMON TEXT STYLE ================= */
// // const TEXT = {
// //   fontFamily: "Times New Roman, serif",
// //   fontSize: "14px",
// //   lineHeight: 1.8,
// //   color: "#000",
// // };

// // /* ================= TABLE CELL STYLE ================= */
// // const CELL = {
// //   border: "1px solid #000",
// //   padding: "6px 8px",
// //   fontSize: "14px",
// //   fontFamily: "Times New Roman, serif",
// // };

// // /* ================= MAIN COMPONENT ================= */
// // const JDITIncrement = ({ company, data }) => {
// //   if (!company || !data) return null;
// //   console.log("companyname", company.header);

// //   const {
// //     issueDate = "",
// //     employeeName = "",
// //     employeeId = "",
// //     effectiveDate = "",
// //     newCTC = "",
// //     signatoryName = "",
// //     signatoryDesignation = "",
// //     salaryComponents = [],
// //   } = data;

// //   const firstName = employeeName.split(" ")[0] || "";

// //   /* ================= CALCULATIONS ================= */
// //   const monthlyGross = salaryComponents.reduce(
// //     (sum, item) => sum + Number(item.monthly || 0),
// //     0
// //   );

// //   const annualCTC = salaryComponents.reduce(
// //     (sum, item) => sum + Number(item.annual || 0),
// //     0
// //   );

// //   return (
// //     <A4Layout
// //       headerSrc={company.header}
// //       footerSrc={company.footer}
// //       watermarkSrc={company.watermarkImage}
// //     >
// //       {/* ================= ISSUE DATE ================= */}
// //       <Typography align="right" sx={{ ...TEXT, mb: 5 }}>
// //         {formatDate(issueDate)}
// //       </Typography>

// //       {/* ================= GREETING ================= */}
// //       <Typography sx={{ ...TEXT, mb: 4 }}>
// //         Dear {firstName},
// //       </Typography>

// //       {/* ================= BODY ================= */}
// //       <Typography sx={{ ...TEXT, mb: 5, textAlign: "justify" }}>
// //         We are delighted to inform you that in recognition of your exceptional
// //         performance and dedication, your salary has been increased. Your new
// //         annual salary will be <b>{newCTC}</b>, per annum effective from{" "}
// //         <b>{formatDate(effectiveDate)}</b>.
// //       </Typography>

// //       <Typography sx={{ ...TEXT, mb: 7 }}>
// //         Thank you for your hard work and dedication. We sincerely appreciate your
// //         hard work and look forward to your continued contributions to our team.
// //       </Typography>

// //       {/* ================= SIGNATURE ================= */}
// //       <Box sx={{ mt: 10 }}>
// //         <Typography sx={{ ...TEXT, mb: 2 }}>Best Regards,</Typography>
// //         <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
// //           {signatoryName}
// //         </Typography>
// //         <Typography sx={{ ...TEXT }}>
// //           {signatoryDesignation}
// //         </Typography>
// //       </Box>

// //       {/* ================= PAGE BREAK ================= */}
// //       <Box sx={{ pageBreakBefore: "always" }} />

// //       {/* ================= SALARY ANNEXURE ================= */}
// //       <Typography
// //         align="center"
// //         sx={{ ...TEXT, fontWeight: "bold", mt: 4, mb: 5 }}
// //       >
// //         Salary Annexure
// //       </Typography>

// //       {/* ================= EMPLOYEE DETAILS ================= */}
// //       <Box sx={{ ...TEXT, mb: 5 }}>
// //         <Typography>Employee Code : {employeeId}</Typography>
// //         <Typography>Employee Name : {employeeName}</Typography>
// //         <Typography>
// //           Effective Date : {formatDate(effectiveDate)}
// //         </Typography>
// //       </Box>

// //       {/* ================= SALARY TABLE ================= */}
// //       <Table sx={{ borderCollapse: "collapse", mb: 5 }}>
// //         <TableHead>
// //           <TableRow>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// //               Monthly Component
// //             </TableCell>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// //               Amount (Rs.)
// //             </TableCell>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// //               Yearly Component
// //             </TableCell>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// //               Amount (Rs.)
// //             </TableCell>
// //           </TableRow>
// //         </TableHead>

// //         <TableBody>
// //           {salaryComponents.map((item, index) => (
// //             <TableRow key={index}>
// //               <TableCell sx={CELL}>{item.label}</TableCell>
// //               <TableCell sx={CELL} align="right">
// //                 {item.monthly}
// //               </TableCell>
// //               <TableCell sx={CELL}>{item.label}</TableCell>
// //               <TableCell sx={CELL} align="right">
// //                 {item.annual}
// //               </TableCell>
// //             </TableRow>
// //           ))}

// //           <TableRow>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
// //               Monthly Gross
// //             </TableCell>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
// //               {monthlyGross}
// //             </TableCell>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
// //               Annual CTC
// //             </TableCell>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
// //               {annualCTC}
// //             </TableCell>
// //           </TableRow>
// //         </TableBody>
// //       </Table>

// //       {/* ================= CONFIDENTIAL NOTE ================= */}
// //       <Typography sx={{ ...TEXT, fontSize: "13px", mt: 4 }}>
// //         Please note that the details in this communication are confidential and
// //         you are requested not to share the same with others.
// //       </Typography>
// //     </A4Layout>
// //   );
// // };

// // export default JDITIncrement;


// // import React, { useMemo } from "react";
// // import {
// //   Typography,
// //   Box,
// //   Table,
// //   TableRow,
// //   TableCell,
// //   TableBody,
// //   TableHead,
// // } from "@mui/material";
// // import A4Layout from "../../../layout/A4Page";

// // /* ================= SALARY UTILITIES ================= */
// // import {
// //   generateOfferLetterComponents,
// //   formatCurrency,
// //   numberToWords,
// // } from "../../../../utils/salaryCalculations";

// // export default function JDITIncrement({ company, data }) {
// //   const {
// //     candidateName = "",
// //     address = "",
// //     position = "",
// //     joiningDate = "",
// //     salary = 0,
// //   } = data || {};

// //   const firstName = candidateName.split(" ")[0] || "";

// //   const formattedJoiningDate = joiningDate
// //     ? new Date(joiningDate).toLocaleDateString("en-IN", {
// //       day: "2-digit",
// //       month: "long",
// //       year: "numeric",
// //     })
// //     : "";

// //   /* ================= SALARY ================= */
// //   const salaryComponents = useMemo(
// //     () => generateOfferLetterComponents(salary),
// //     [salary]
// //   );

// //   const totalAnnual = Number(salary) || 0;
// //   const totalMonthly = Math.round(totalAnnual / 12);
// //   const salaryInWords = numberToWords(totalAnnual);

// //   /* ================= TYPOGRAPHY ================= */
// //   const baseText = {
// //     fontFamily: "Verdana, Geneva, sans-serif",
// //     fontSize: "14px",
// //     lineHeight: 1.8,
// //     color: "#000",
// //   };

// //   const para = { ...baseText, mt: "12px" };
// //   const paraLarge = { ...baseText, mt: "24px" };

// //   const labelStyle = {
// //     display: "inline-block",
// //     width: "110px",
// //   };

// //   /* ================= TABLE STYLES ================= */
// //   const tableCell = {
// //     fontFamily: "Verdana, Geneva, sans-serif",
// //     fontSize: "13px",
// //     lineHeight: 1.4,
// //     border: "1px solid #000",
// //     padding: "4px 6px",
// //   };

// //   const tableHeader = {
// //     ...tableCell,
// //     backgroundColor: "#32a1c2ff",
// //     color: "#fff",
// //     fontWeight: "bold",
// //   };

// //   const tableTotal = {
// //     ...tableCell,
// //     backgroundColor: "#32a1c2ff",
// //     color: "#fff",
// //     fontWeight: "bold",
// //   };
// //   const TEXT = {
// //   fontFamily: "Verdana, Geneva, sans-serif",
// //   fontSize: "14px",
// //   lineHeight: 1.8,
// //   color: "#000",
// // };
// // const formatDate = (date) =>
// //   date
// //     ? new Date(date).toLocaleDateString("en-IN", {
// //         day: "2-digit",
// //         month: "long",
// //         year: "numeric",
// //       })
// //     : "";


// //   return (
// //     <>
// //       {/* ================= PAGE 1 ================= */}
// //       <A4Layout company={company}>
// //         <Box sx={baseText}>
// //           {/* DATE */}
// //           <Typography sx={{ textAlign: "right" }}>
// //             {new Date(data.issueDate).toLocaleDateString("en-IN", {
// //               day: "2-digit",
// //               month: "long",
// //               year: "numeric",
// //             })}
// //           </Typography>

// //           {/* GREETING */}
// //           <Typography sx={{ mt: "40px" }}>
// //             Dear {data.employeeName},
// //           </Typography>

// //           {/* INCREMENT CONTENT */}
// //           <Typography sx={{ mt: "24px" }}>
// //             We are delighted to inform you that in recognition of your exceptional
// //             performance and dedication, your salary has been increased.

// //             Your new annual salary will be{" "}
// //             <b>Rs. {formatCurrency(data.currentCTC)}</b> ({salaryInWords}), per annum
// //             effective from{" "}
// //             <b>
// //               {new Date(data.issueDate).toLocaleDateString("en-IN", {
// //                 day: "2-digit",
// //                 month: "long",
// //                 year: "numeric",
// //               })}
// //             </b>.
// //           </Typography>

// //           <Typography sx={{ mt: "24px" }}>
// //             Thank you for your hard work and dedication. We sincerely appreciate your
// //             efforts and look forward to your continued contributions to our team.
// //           </Typography>

// //           {/* CLOSING */}
// //           <Typography sx={{ mt: "40px" }}>
// //             Best Regards,
// //           </Typography>

// //           <Typography>
// //             <b>{company.hrName}</b>
// //           </Typography>




// //         </Box>


// //         {/* SIGNATURE & STAMP – PAGE 1 */}
// //         <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
// //           <Box>
// //             <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
// //               {company.signature && (
// //                 <Box component="img" src={company.signature} sx={{ height: "40px" }} />
// //               )}
// //               {company.stamp && (
// //                 <Box component="img" src={company.stamp} sx={{ height: "60px" }} />
// //               )}
// //             </Box>

// //             <Typography><b>CEO & Managing Director</b></Typography>
// //           </Box>

// //           <Box sx={{ width: "45%", mt: 8 }}>
// //             <Typography>Signature : ___________________</Typography>
// //             <Typography>Candidate Name : {candidateName}</Typography>
// //           </Box>
// //         </Box>


// //         {/* </Box> */}
// //       </A4Layout >

// //       {/* ================= PAGE 2 (SALARY STRUCTURE + SIGNATURE) ================= */}
// //       <A4Layout
// //         headerSrc={company.headerImage}
// //         footerSrc={company.footerImage}

// //       >
// //         <Typography align="center" sx={{ ...TEXT, mb: 4, fontWeight: "bold" }}>
// //           Salary Annexure
// //         </Typography>

// //         {/* Employee Info */}
// //         <Box sx={{ mb: 3 }}>
// //           <Typography sx={TEXT}>
// //             <b>Employee Code</b> : {data.employeeId}
// //           </Typography>
// //           <Typography sx={TEXT}>
// //             <b>Employee Name</b> : {data.employeeName}
// //           </Typography>
// //           <Typography sx={TEXT}>
// //             <b>Effective Date</b> : {formatDate(effectiveDate)}
// //           </Typography>
// //         </Box>

// //         {/* Salary Comparison Table */}
// //         <TableContainer
// //           component={Paper}
// //           sx={{
// //             border: "1.5px solid black",
// //             borderRadius: 0,
// //             backgroundColor: "transparent", // ✅ make transparent
// //             "& .MuiTableCell-root": {
// //               border: "1px solid black",
// //               fontSize: "11pt",
// //               padding: "6px 8px",
// //               verticalAlign: "middle",
// //               backgroundColor: "transparent", // ✅ make cells transparent too
// //             },
// //             boxShadow: "none", // ✅ remove shadow layer
// //           }}
// //         >
// //           <Table>
// //             <TableHead>
// //               <TableRow sx={{ backgroundColor: 'lightblue' }}>
// //                 <TableCell sx={{ fontWeight: 'bold' }}>Monthly Component</TableCell>
// //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount (₹)</TableCell>
// //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Yearly Component</TableCell>
// //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount (₹)</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               <TableRow>
// //                 <TableCell>Basic</TableCell>
// //                 <TableCell align="center">{formatCurrency(basicMonthly)}</TableCell>
// //                 <TableCell></TableCell>
// //                 <TableCell align="center">{formatCurrency(basicAnnual)}</TableCell>
// //               </TableRow>

// //               <TableRow>
// //                 <TableCell>House Rent Allowance (HRA)</TableCell>
// //                 <TableCell align="center">{formatCurrency(hraMonthly)}</TableCell>
// //                 <TableCell></TableCell>
// //                 <TableCell align="center">{formatCurrency(hraAnnual)}</TableCell>
// //               </TableRow>

// //               <TableRow>
// //                 <TableCell>Conveyance Allowance</TableCell>
// //                 <TableCell align="center">{formatCurrency(conveyanceMonthly)}</TableCell>
// //                 <TableCell></TableCell>
// //                 <TableCell align="center">{formatCurrency(conveyanceAnnual)}</TableCell>
// //               </TableRow>

// //               <TableRow>
// //                 <TableCell>Medical Allowance</TableCell>
// //                 <TableCell align="center">{formatCurrency(medicMonthly)}</TableCell>
// //                 <TableCell></TableCell>
// //                 <TableCell align="center">{formatCurrency(medicAnnual)}</TableCell>
// //               </TableRow>

// //               <TableRow>
// //                 <TableCell>Special Allowance</TableCell>
// //                 <TableCell align="center">{formatCurrency(specialMonthly)}</TableCell>
// //                 <TableCell></TableCell>
// //                 <TableCell align="center">{formatCurrency(specialAnnual)}</TableCell>
// //               </TableRow>

// //               {/* Totals */}
// //               <TableRow sx={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
// //                 <TableCell sx={{ fontWeight: 'bold' }}>Monthly Gross</TableCell>
// //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
// //                   {formatCurrency(
// //                     basicMonthly +
// //                     hraMonthly +
// //                     conveyanceMonthly +
// //                     medicMonthly +
// //                     specialMonthly
// //                   )}
// //                 </TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold' }}>Annual CTC</TableCell>
// //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
// //                   {formatCurrency(newCTC)}
// //                 </TableCell>
// //               </TableRow>
// //             </TableBody>
// //           </Table>
// //         </TableContainer>

// //         <Typography sx={{ ...TEXT, mt: 4 }}>
// //           Please note that the details in this communication are confidential and
// //           you are requested not to share the same with others.
// //         </Typography>



// //         {/* SIGNATURE & STAMP – PAGE 2 */}
// //         <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
// //           <Box>
// //             <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
// //               {company.signature && (
// //                 <Box component="img" src={company.signature} sx={{ height: "40px" }} />
// //               )}
// //               {company.stamp && (
// //                 <Box component="img" src={company.stamp} sx={{ height: "60px" }} />
// //               )}
// //             </Box>
// //             <Typography>{company.hrName}</Typography>
// //             <Typography>HR Department Pune</Typography>
// //           </Box>

// //           <Box sx={{ width: "45%", mt: 8 }}>
// //             <Typography>Signature : ___________________</Typography>
// //             <Typography>Candidate Name : {candidateName}</Typography>
// //           </Box>
// //         </Box>

// //     </A4Layout >
// //     </>
// //   );
// // }
// // // export default JDITIncrement;

// // import React, { useMemo } from "react";
// // import {
// //   Typography,
// //   Box,
// //   Table,
// //   TableRow,
// //   TableCell,
// //   TableBody,
// //   TableHead,
// //   TableContainer,
// //   Paper,
// // } from "@mui/material";
// // import A4Layout from "../../../layout/A4Page";

// // /* ================= SALARY UTILITIES ================= */
// // import {
// //   generateOfferLetterComponents,
// //   formatCurrency,
// //   numberToWords,
// // } from "../../../../utils/salaryCalculations";

// // /* ================= COMMON TEXT ================= */
// // const TEXT = {
// //   fontFamily: "Verdana, Geneva, sans-serif",
// //   fontSize: "14px",
// //   lineHeight: 1.8,
// // };

// // /* ================= DATE FORMAT ================= */
// // const formatDate = (date) =>
// //   date
// //     ? new Date(date).toLocaleDateString("en-US", {
// //       month: "long",
// //       day: "2-digit",
// //       year: "numeric",
// //     })
// //     : "";


// // export default function JDITIncrement({ company, data }) {
// //   const {
// //     employeeName = "",
// //     employeeId = "",
// //     issueDate = "",
// //     effectiveDate = "",
// //     newCTC = 0,
// //   } = data || {};

// //   const firstName = employeeName.split(" ")[0] || "";

// //   /* ================= SALARY ================= */
// //   const salaryComponents = useMemo(
// //     () => generateOfferLetterComponents(newCTC),
// //     [newCTC]
// //   );

// //   const totalAnnual = Number(newCTC) || 0;
// //   const totalMonthly = Math.round(totalAnnual / 12);
// //   const salaryInWords = numberToWords(totalAnnual);

// // import React from "react";
// // import {
// //   Box,
// //   Typography,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableRow,
// //   TableHead,
// // } from "@mui/material";
// // import A4Layout from "../../../layout/A4Page";

// // /* ================= DATE FORMAT ================= */
// // const formatDate = (date) =>
// //   date
// //     ? new Date(date).toLocaleDateString("en-US", {
// //         month: "long",
// //         day: "2-digit",
// //         year: "numeric",
// //       })
// //     : "";

// // /* ================= COMMON TEXT STYLE ================= */
// // const TEXT = {
// //   fontFamily: "Times New Roman, serif",
// //   fontSize: "14px",
// //   lineHeight: 1.8,
// //   color: "#000",
// // };

// // /* ================= TABLE CELL STYLE ================= */
// // const CELL = {
// //   border: "1px solid #000",
// //   padding: "6px 8px",
// //   fontSize: "14px",
// //   fontFamily: "Times New Roman, serif",
// // };

// // /* ================= MAIN COMPONENT ================= */
// // const JDITIncrement = ({ company, data }) => {
// //   if (!company || !data) return null;
// //   console.log("companyname", company.header);

// //   const {
// //     issueDate = "",
// //     employeeName = "",
// //     employeeId = "",
// //     effectiveDate = "",
// //     newCTC = "",
// //     signatoryName = "",
// //     signatoryDesignation = "",
// //     salaryComponents = [],
// //   } = data;

// //   const firstName = employeeName.split(" ")[0] || "";

// //   /* ================= CALCULATIONS ================= */
// //   const monthlyGross = salaryComponents.reduce(
// //     (sum, item) => sum + Number(item.monthly || 0),
// //     0
// //   );

// //   const annualCTC = salaryComponents.reduce(
// //     (sum, item) => sum + Number(item.annual || 0),
// //     0
// //   );

// //   return (
// //     <A4Layout
// //       headerSrc={company.header}
// //       footerSrc={company.footer}
// //       watermarkSrc={company.watermarkImage}
// //     >
// //       {/* ================= ISSUE DATE ================= */}
// //       <Typography align="right" sx={{ ...TEXT, mb: 5 }}>
// //         {formatDate(issueDate)}
// //       </Typography>

// //       {/* ================= GREETING ================= */}
// //       <Typography sx={{ ...TEXT, mb: 4 }}>
// //         Dear {firstName},
// //       </Typography>

// //       {/* ================= BODY ================= */}
// //       <Typography sx={{ ...TEXT, mb: 5, textAlign: "justify" }}>
// //         We are delighted to inform you that in recognition of your exceptional
// //         performance and dedication, your salary has been increased. Your new
// //         annual salary will be <b>{newCTC}</b>, per annum effective from{" "}
// //         <b>{formatDate(effectiveDate)}</b>.
// //       </Typography>

// //       <Typography sx={{ ...TEXT, mb: 7 }}>
// //         Thank you for your hard work and dedication. We sincerely appreciate your
// //         hard work and look forward to your continued contributions to our team.
// //       </Typography>

// //       {/* ================= SIGNATURE ================= */}
// //       <Box sx={{ mt: 10 }}>
// //         <Typography sx={{ ...TEXT, mb: 2 }}>Best Regards,</Typography>
// //         <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
// //           {signatoryName}
// //         </Typography>
// //         <Typography sx={{ ...TEXT }}>
// //           {signatoryDesignation}
// //         </Typography>
// //       </Box>

// //       {/* ================= PAGE BREAK ================= */}
// //       <Box sx={{ pageBreakBefore: "always" }} />

// //       {/* ================= SALARY ANNEXURE ================= */}
// //       <Typography
// //         align="center"
// //         sx={{ ...TEXT, fontWeight: "bold", mt: 4, mb: 5 }}
// //       >
// //         Salary Annexure
// //       </Typography>

// //       {/* ================= EMPLOYEE DETAILS ================= */}
// //       <Box sx={{ ...TEXT, mb: 5 }}>
// //         <Typography>Employee Code : {employeeId}</Typography>
// //         <Typography>Employee Name : {employeeName}</Typography>
// //         <Typography>
// //           Effective Date : {formatDate(effectiveDate)}
// //         </Typography>
// //       </Box>

// //       {/* ================= SALARY TABLE ================= */}
// //       <Table sx={{ borderCollapse: "collapse", mb: 5 }}>
// //         <TableHead>
// //           <TableRow>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// //               Monthly Component
// //             </TableCell>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// //               Amount (Rs.)
// //             </TableCell>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// //               Yearly Component
// //             </TableCell>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// //               Amount (Rs.)
// //             </TableCell>
// //           </TableRow>
// //         </TableHead>

// //         <TableBody>
// //           {salaryComponents.map((item, index) => (
// //             <TableRow key={index}>
// //               <TableCell sx={CELL}>{item.label}</TableCell>
// //               <TableCell sx={CELL} align="right">
// //                 {item.monthly}
// //               </TableCell>
// //               <TableCell sx={CELL}>{item.label}</TableCell>
// //               <TableCell sx={CELL} align="right">
// //                 {item.annual}
// //               </TableCell>
// //             </TableRow>
// //           ))}

// //           <TableRow>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
// //               Monthly Gross
// //             </TableCell>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
// //               {monthlyGross}
// //             </TableCell>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
// //               Annual CTC
// //             </TableCell>
// //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
// //               {annualCTC}
// //             </TableCell>
// //           </TableRow>
// //         </TableBody>
// //       </Table>

// //       {/* ================= CONFIDENTIAL NOTE ================= */}
// //       <Typography sx={{ ...TEXT, fontSize: "13px", mt: 4 }}>
// //         Please note that the details in this communication are confidential and
// //         you are requested not to share the same with others.
// //       </Typography>
// //     </A4Layout>
// //   );
// // };

// // export default JDITIncrement;


// // import React, { useMemo } from "react";
// // import {
// //   Typography,
// //   Box,
// //   Table,
// //   TableRow,
// //   TableCell,
// //   TableBody,
// //   TableHead,
// // } from "@mui/material";
// // import A4Layout from "../../../layout/A4Page";

// // /* ================= SALARY UTILITIES ================= */
// // import {
// //   generateOfferLetterComponents,
// //   formatCurrency,
// //   numberToWords,
// // } from "../../../../utils/salaryCalculations";

// // export default function JDITIncrement({ company, data }) {
// //   const {
// //     candidateName = "",
// //     address = "",
// //     position = "",
// //     joiningDate = "",
// //     salary = 0,
// //   } = data || {};

// //   const firstName = candidateName.split(" ")[0] || "";

// //   const formattedJoiningDate = joiningDate
// //     ? new Date(joiningDate).toLocaleDateString("en-IN", {
// //       day: "2-digit",
// //       month: "long",
// //       year: "numeric",
// //     })
// //     : "";

// //   /* ================= SALARY ================= */
// //   const salaryComponents = useMemo(
// //     () => generateOfferLetterComponents(salary),
// //     [salary]
// //   );

// //   const totalAnnual = Number(salary) || 0;
// //   const totalMonthly = Math.round(totalAnnual / 12);
// //   const salaryInWords = numberToWords(totalAnnual);

// //   /* ================= TYPOGRAPHY ================= */
// //   const baseText = {
// //     fontFamily: "Verdana, Geneva, sans-serif",
// //     fontSize: "14px",
// //     lineHeight: 1.8,
// //     color: "#000",
// //   };

// //   const para = { ...baseText, mt: "12px" };
// //   const paraLarge = { ...baseText, mt: "24px" };

// //   const labelStyle = {
// //     display: "inline-block",
// //     width: "110px",
// //   };

// //   /* ================= TABLE STYLES ================= */
// //   const tableCell = {
// //     fontFamily: "Verdana, Geneva, sans-serif",
// //     fontSize: "13px",
// //     lineHeight: 1.4,
// //     border: "1px solid #000",
// //     padding: "4px 6px",
// //   };

// //   const tableHeader = {
// //     ...tableCell,
// //     backgroundColor: "#32a1c2ff",
// //     color: "#fff",
// //     fontWeight: "bold",
// //   };

// //   const tableTotal = {
// //     ...tableCell,
// //     backgroundColor: "#32a1c2ff",
// //     color: "#fff",
// //     fontWeight: "bold",
// //   };
// //   const TEXT = {
// //   fontFamily: "Verdana, Geneva, sans-serif",
// //   fontSize: "14px",
// //   lineHeight: 1.8,
// //   color: "#000",
// // };
// // const formatDate = (date) =>
// //   date
// //     ? new Date(date).toLocaleDateString("en-IN", {
// //         day: "2-digit",
// //         month: "long",
// //         year: "numeric",
// //       })
// //     : "";


// //   return (
// //     <>
// //       {/* ================= PAGE 1 ================= */}
// //       <A4Layout company={company}>
// //         <Box sx={baseText}>
// //           {/* DATE */}
// //           <Typography sx={{ textAlign: "right" }}>
// //             {new Date(data.issueDate).toLocaleDateString("en-IN", {
// //               day: "2-digit",
// //               month: "long",
// //               year: "numeric",
// //             })}
// //           </Typography>

// //           {/* GREETING */}
// //           <Typography sx={{ mt: "40px" }}>
// //             Dear {data.employeeName},
// //           </Typography>

// //           {/* INCREMENT CONTENT */}
// //           <Typography sx={{ mt: "24px" }}>
// //             We are delighted to inform you that in recognition of your exceptional
// //             performance and dedication, your salary has been increased.

// //             Your new annual salary will be{" "}
// //             <b>Rs. {formatCurrency(data.currentCTC)}</b> ({salaryInWords}), per annum
// //             effective from{" "}
// //             <b>
// //               {new Date(data.issueDate).toLocaleDateString("en-IN", {
// //                 day: "2-digit",
// //                 month: "long",
// //                 year: "numeric",
// //               })}
// //             </b>.
// //           </Typography>

// //           <Typography sx={{ mt: "24px" }}>
// //             Thank you for your hard work and dedication. We sincerely appreciate your
// //             efforts and look forward to your continued contributions to our team.
// //           </Typography>

// //           {/* CLOSING */}
// //           <Typography sx={{ mt: "40px" }}>
// //             Best Regards,
// //           </Typography>

// //           <Typography>
// //             <b>{company.hrName}</b>
// //           </Typography>




// //         </Box>


// //         {/* SIGNATURE & STAMP – PAGE 1 */}
// //         <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
// //           <Box>
// //             <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
// //               {company.signature && (
// //                 <Box component="img" src={company.signature} sx={{ height: "40px" }} />
// //               )}
// //               {company.stamp && (
// //                 <Box component="img" src={company.stamp} sx={{ height: "60px" }} />
// //               )}
// //             </Box>

// //             <Typography><b>CEO & Managing Director</b></Typography>
// //           </Box>

// //           <Box sx={{ width: "45%", mt: 8 }}>
// //             <Typography>Signature : ___________________</Typography>
// //             <Typography>Candidate Name : {candidateName}</Typography>
// //           </Box>
// //         </Box>


// //         {/* </Box> */}
// //       </A4Layout >

// //       {/* ================= PAGE 2 (SALARY STRUCTURE + SIGNATURE) ================= */}
// //       <A4Layout
// //         headerSrc={company.headerImage}
// //         footerSrc={company.footerImage}

// //       >
// //         <Typography align="center" sx={{ ...TEXT, mb: 4, fontWeight: "bold" }}>
// //           Salary Annexure
// //         </Typography>

// //         {/* Employee Info */}
// //         <Box sx={{ mb: 3 }}>
// //           <Typography sx={TEXT}>
// //             <b>Employee Code</b> : {data.employeeId}
// //           </Typography>
// //           <Typography sx={TEXT}>
// //             <b>Employee Name</b> : {data.employeeName}
// //           </Typography>
// //           <Typography sx={TEXT}>
// //             <b>Effective Date</b> : {formatDate(effectiveDate)}
// //           </Typography>
// //         </Box>

// //         {/* Salary Comparison Table */}
// //         <TableContainer
// //           component={Paper}
// //           sx={{
// //             border: "1.5px solid black",
// //             borderRadius: 0,
// //             backgroundColor: "transparent", // ✅ make transparent
// //             "& .MuiTableCell-root": {
// //               border: "1px solid black",
// //               fontSize: "11pt",
// //               padding: "6px 8px",
// //               verticalAlign: "middle",
// //               backgroundColor: "transparent", // ✅ make cells transparent too
// //             },
// //             boxShadow: "none", // ✅ remove shadow layer
// //           }}
// //         >
// //           <Table>
// //             <TableHead>
// //               <TableRow sx={{ backgroundColor: 'lightblue' }}>
// //                 <TableCell sx={{ fontWeight: 'bold' }}>Monthly Component</TableCell>
// //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount (₹)</TableCell>
// //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Yearly Component</TableCell>
// //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount (₹)</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               <TableRow>
// //                 <TableCell>Basic</TableCell>
// //                 <TableCell align="center">{formatCurrency(basicMonthly)}</TableCell>
// //                 <TableCell></TableCell>
// //                 <TableCell align="center">{formatCurrency(basicAnnual)}</TableCell>
// //               </TableRow>

// //               <TableRow>
// //                 <TableCell>House Rent Allowance (HRA)</TableCell>
// //                 <TableCell align="center">{formatCurrency(hraMonthly)}</TableCell>
// //                 <TableCell></TableCell>
// //                 <TableCell align="center">{formatCurrency(hraAnnual)}</TableCell>
// //               </TableRow>

// //               <TableRow>
// //                 <TableCell>Conveyance Allowance</TableCell>
// //                 <TableCell align="center">{formatCurrency(conveyanceMonthly)}</TableCell>
// //                 <TableCell></TableCell>
// //                 <TableCell align="center">{formatCurrency(conveyanceAnnual)}</TableCell>
// //               </TableRow>

// //               <TableRow>
// //                 <TableCell>Medical Allowance</TableCell>
// //                 <TableCell align="center">{formatCurrency(medicMonthly)}</TableCell>
// //                 <TableCell></TableCell>
// //                 <TableCell align="center">{formatCurrency(medicAnnual)}</TableCell>
// //               </TableRow>

// //               <TableRow>
// //                 <TableCell>Special Allowance</TableCell>
// //                 <TableCell align="center">{formatCurrency(specialMonthly)}</TableCell>
// //                 <TableCell></TableCell>
// //                 <TableCell align="center">{formatCurrency(specialAnnual)}</TableCell>
// //               </TableRow>

// //               {/* Totals */}
// //               <TableRow sx={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
// //                 <TableCell sx={{ fontWeight: 'bold' }}>Monthly Gross</TableCell>
// //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
// //                   {formatCurrency(
// //                     basicMonthly +
// //                     hraMonthly +
// //                     conveyanceMonthly +
// //                     medicMonthly +
// //                     specialMonthly
// //                   )}
// //                 </TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold' }}>Annual CTC</TableCell>
// //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
// //                   {formatCurrency(newCTC)}
// //                 </TableCell>
// //               </TableRow>
// //             </TableBody>
// //           </Table>
// //         </TableContainer>

// //         <Typography sx={{ ...TEXT, mt: 4 }}>
// //           Please note that the details in this communication are confidential and
// //           you are requested not to share the same with others.
// //         </Typography>



// //         {/* SIGNATURE & STAMP – PAGE 2 */}
// //         <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
// //           <Box>
// //             <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
// //               {company.signature && (
// //                 <Box component="img" src={company.signature} sx={{ height: "40px" }} />
// //               )}
// //               {company.stamp && (
// //                 <Box component="img" src={company.stamp} sx={{ height: "60px" }} />
// //               )}
// //             </Box>
// //             <Typography>{company.hrName}</Typography>
// //             <Typography>HR Department Pune</Typography>
// //           </Box>

// //           <Box sx={{ width: "45%", mt: 8 }}>
// //             <Typography>Signature : ___________________</Typography>
// //             <Typography>Candidate Name : {candidateName}</Typography>
// //           </Box>
// //         </Box>

// //     </A4Layout >
// //     </>
// //   );
// // }
// // // export default JDITIncrement;

// import React, { useMemo } from "react";
// import {
//   Typography,
//   Box,
//   Table,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableHead,
//   TableContainer,
//   Paper,
// } from "@mui/material";
// import A4Layout from "../../../../layout/A4Page";

// /* ================= SALARY UTILITIES ================= */
// import {
//   generateOfferLetterComponents,
//   formatCurrency,
//   numberToWords,
// } from "../../../../../utils/salaryCalculations";

// /* ================= COMMON TEXT ================= */
// const TEXT = {
//   fontFamily: "Verdana, Geneva, sans-serif",
//   fontSize: "14px",
//   lineHeight: 1.8,
// };

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-US", {
//       month: "long",
//       day: "2-digit",
//       year: "numeric",
//     })
//     : "";


// export default function JDITIncrement({ company, data }) {
//   const {
//     employeeName = "",
//     employeeId = "",
//     issueDate = "",
//     effectiveDate = "",
//     newCTC = 0,
//   } = data || {};

//   const firstName = employeeName.split(" ")[0] || "";

//   /* ================= SALARY LOGIC ================= */
//   // Helper to keep 2 decimals everywhere
//   const round0 = (num) => Math.round(num);

//   // Source of truth
//   const monthlyCTC = round0(Number(data.newCTC || 0));

//   // ================= PERCENTAGE BREAKUP =================
//   const basicMonthly = round0(monthlyCTC * 0.40);
//   const hraMonthly = round0(monthlyCTC * 0.18);
//   const daMonthly = round0(monthlyCTC * 0.12);
//   const specialMonthly = round0(monthlyCTC * 0.16);
//   const foodMonthly = round0(monthlyCTC * 0.06);
//   const miscMonthly = round0(monthlyCTC * 0.08);

//   // ================= ANNUAL VALUES =================
//   const basicAnnual = round0(basicMonthly * 12);
//   const hraAnnual = round0(hraMonthly * 12);
//   const daAnnual = round0(daMonthly * 12);
//   const specialAnnual = round0(specialMonthly * 12);
//   const foodAnnual = round0(foodMonthly * 12);
//   const miscAnnual = round0(miscMonthly * 12);

//   // ================= SALARY TABLE STRUCTURE =================
//   const salaryRows = [
//     ["Basic", basicMonthly, basicAnnual],
//     ["House Rent Allowance", hraMonthly, hraAnnual],
//     ["Dearness Allowance", daMonthly, daAnnual],
//     ["Special Allowance", specialMonthly, specialAnnual],
//     ["Food Allowance", foodMonthly, foodAnnual],
//     ["Misc. Allowance", miscMonthly, miscAnnual],
//   ];

//   // ================= TOTALS =================
//   const totalMonthly = round0(
//     salaryRows.reduce((sum, row) => sum + row[1], 0)
//   );

//   const totalAnnual = round0(
//     salaryRows.reduce((sum, row) => sum + row[2], 0)
//   );

//   const salaryInWords = numberToWords(totalAnnual);

//   return (
//     <>
//       {/* ================= PAGE 1 – INCREMENT LETTER ================= */}
//       <A4Layout company={company}>
//         <Box sx={TEXT}>
//           <Typography align="right">
//             {formatDate(issueDate)}
//           </Typography>

//           <Typography sx={{ mt: 5 }}>
//             Dear {firstName},
//           </Typography>

//           <Typography sx={{ mt: 3 }}>
//             We are delighted to inform you that in recognition of your exceptional
//             performance and dedication as <b>{data.designation}</b> your salary has been increased.

//             Your new annual salary will be{" "}
//             <b>Rs. {formatCurrency(totalAnnual)}</b>, per annum
//             effective from{" "}
//             <b>{formatDate(effectiveDate)}</b>.
//           </Typography>

//           <Typography sx={{ mt: 3 }}>
//             Thank you for your hard work and dedication. We sincerely appreciate
//             your efforts and look forward to your continued contributions to our team.
//           </Typography>

//           <Typography sx={{ mt: 5 }}>Best Regards,</Typography>

//           {/* SIGNATURE & STAMP */}
//           <Box sx={{ display: "flex", gap: 3, mt: 5 }}>
//             {company.incrementSignature && (
//               <Box component="img" src={company.incrementSignature} sx={{ height: 50 }} />
//             )}
//             {company.stamp && (
//               <Box component="img" src={company.stamp} sx={{ height: 100 }} />
//             )}
//           </Box>
//         </Box>
//         <Typography><b>{company.hrNameOne}</b></Typography>
//         <Typography><b>CEO & Managing Director</b></Typography>
//       </A4Layout>

//       {/* ================= PAGE 2 – SALARY ANNEXURE ================= */}
//       <A4Layout company={company}>
//         <Typography
//           align="center"
//           sx={{ ...TEXT, fontWeight: "bold" }}
//         >
//           Salary Annexure
//         </Typography>

//         <Box
//           sx={{
//             width: "150px",
//             height: "3px",          // ⬅ makes the line bold
//             backgroundColor: "#000",
//             color: "#fff !important",
//             margin: "0 auto 30px",
//           }}
//         />


//         {/* EMPLOYEE INFO */}
//         <Box sx={{ mb: 3 }}>
//           <Typography sx={TEXT}>
//             Employee Code : {employeeId}
//           </Typography>
//           <Typography sx={TEXT}>
//             Employee Name : {data.mrms}{employeeName}
//           </Typography>
//           <Typography sx={TEXT}>
//             Effective Date : {formatDate(effectiveDate)}
//           </Typography>
//         </Box>

//         {/* SALARY TABLE Start*/}

//         <TableContainer sx={{ mb: "4mm" }}>
//           <Table
//             size="small"
//             sx={{
//               border: "1px solid #333",       // 🔽 thinner outer border
//               borderCollapse: "collapse",
//               width: "100%",
//               color: "#ffff",
//             }}
//           >
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#000" }}>
//                 <TableCell
//                   sx={{
//                     fontWeight: 600,
//                     border: "1px solid #333",
//                     fontSize: "10pt",          // 🔽 smaller font
//                     color: "#fff !important",
//                     py: "0.4mm",               // 🔽 compact header height
//                   }}
//                 >
//                   Salary Components
//                 </TableCell>

//                 <TableCell
//                   align="center"
//                   sx={{
//                     fontWeight: 600,
//                     border: "1px solid #333",
//                     fontSize: "10pt",
//                     color: "#fff !important",
//                     py: "0.4mm",
//                   }}
//                 >
//                   Per month (Rs.)
//                 </TableCell>

//                 <TableCell
//                   align="center"
//                   sx={{
//                     fontWeight: 600,
//                     border: "1px solid #333",
//                     fontSize: "10pt",
//                     color: "#fff !important",
//                     py: "0.4mm",
//                   }}
//                 >
//                   Per Annum (Rs.)
//                 </TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {/* 🔽 Removed tall blank row – keeps table compact */}

//               {salaryRows.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell
//                     sx={{
//                       border: "1px solid #333",
//                       fontSize: "9.75pt",       // 🔽 smaller body text
//                       py: "0.35mm",             // 🔽 tight rows
//                     }}
//                   >
//                     {row[0]}
//                   </TableCell>

//                   <TableCell
//                     align="center"
//                     sx={{
//                       border: "1px solid #333",
//                       fontSize: "9.75pt",
//                       py: "0.35mm",
//                     }}
//                   >
//                     {formatCurrency(row[1])}
//                   </TableCell>

//                   <TableCell
//                     align="center"
//                     sx={{
//                       border: "1px solid #333",
//                       fontSize: "9.75pt",
//                       py: "0.35mm",
//                     }}
//                   >
//                     {formatCurrency(row[2])}
//                   </TableCell>
//                 </TableRow>
//               ))}

//               {/* Totals Row */}
//               <TableRow sx={{ backgroundColor: "#000" }}>
//                 <TableCell
//                   sx={{
//                     fontWeight: 600,
//                     border: "1px solid #333",
//                     fontSize: "10pt",
//                     py: "0.4mm",
//                     color: "#fff !important",
//                   }}
//                 >
//                   Total Monthly Gross Salary
//                 </TableCell>

//                 <TableCell
//                   align="center"
//                   sx={{
//                     fontWeight: 600,
//                     border: "1px solid #333",
//                     fontSize: "10pt",
//                     py: "0.4mm",
//                     color: "#fff !important",
//                   }}
//                 >
//                   {formatCurrency(totalMonthly)}
//                 </TableCell>

//                 <TableCell
//                   align="center"
//                   sx={{
//                     fontWeight: 600,
//                     border: "1px solid #333",
//                     fontSize: "10pt",
//                     py: "0.4mm",
//                     color: "#fff !important",
//                   }}
//                 >
//                   {formatCurrency(totalAnnual)}
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>


//         {/* Salary table closed  */}

//         <Typography sx={{ ...TEXT, mt: 4 }}>
//           Please note that the details in this communication are confidential and
//           you are requested not to share the same with others.
//         </Typography>

//         {/* SIGNATURE & STAMP */}


//       </A4Layout>
//     </>
//   );
// }





////////////////////////////////////////////////////////////////////////////////////////////


import React, { useMemo } from "react";
import {
  Typography,
  Box,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";

/* ================= SALARY UTILITIES ================= */
import {
  generateOfferLetterComponents,
  formatCurrency,
  numberToWords,
} from "../../../../../utils/salaryCalculations";

/* ================= COMMON TEXT ================= */
const TEXT = {
  fontFamily: "Verdana, Geneva, sans-serif",
  fontSize: "14px",
  lineHeight: 1.8,
};

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    })
    : "";


export default function JDITIncrement({ company, data }) {
  const {
    employeeName = "",
    employeeId = "",
    issueDate = "",
    effectiveDate = "",
    newCTC = 0,
  } = data || {};

  const firstName = employeeName.split(" ")[0] || "";

  /* ================= SALARY LOGIC ================= */
  // Helper to keep 2 decimals everywhere
  const round0 = (num) => Math.round(num);

  // Source of truth
  const monthlyCTC = round0(Number(data.newCTC || 0));

  // ================= PERCENTAGE BREAKUP =================
  const basicMonthly = round0(monthlyCTC * 0.48);
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const foodMonthly = round0(monthlyCTC * 0.06);

  /* ================= STATIC PF ================= */
  const pfMonthly = 3750;

  /* ================= BALANCING FIGURE ================= */
  const specialMonthly = round0(monthlyCTC * 0.16);

  // ================= ANNUAL VALUES =================
  const basicAnnual = round0(basicMonthly * 12);
  const hraAnnual = round0(hraMonthly * 12);
  const daAnnual = round0(daMonthly * 12);
  const foodAnnual = round0(foodMonthly * 12);
  const specialAnnual = round0(specialMonthly * 12);
  const pfAnnual = round0(pfMonthly * 12);

  // ================= SALARY TABLE STRUCTURE =================
  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["House Rent Allowance", hraMonthly, hraAnnual],
    ["Dearness Allowance", daMonthly, daAnnual],
    ["Special Allowance", specialMonthly, specialAnnual],
    ["Food Allowance", foodMonthly, foodAnnual],
  ];

  // ================= TOTALS =================
  const totalMonthly = round0(
    basicMonthly +
    hraMonthly +
    daMonthly +
    specialMonthly +
    foodMonthly
  );

  const totalAnnual = round0(
    basicAnnual +
    hraAnnual +
    daAnnual +
    specialAnnual +
    foodAnnual
  );

  const salaryInWords = numberToWords(totalAnnual);

  return (
    <>
      {/* ================= PAGE 1 – INCREMENT LETTER ================= */}
      <A4Layout company={company}>
        <Box sx={TEXT}>
          <Typography align="right">
            {formatDate(issueDate)}
          </Typography>

          <Typography sx={{ mt: 5 }}>
            Dear {firstName},
          </Typography>

          <Typography sx={{ mt: 3 }}>
            We are delighted to inform you that in recognition of your exceptional
            performance and dedication as <b>{data.designation}</b> your salary has been increased.

            Your new annual salary will be{" "}
            <b>Rs. {formatCurrency(totalAnnual)}</b>, per annum
            effective from{" "}
            <b>{formatDate(effectiveDate)}</b>.
          </Typography>

          <Typography sx={{ mt: 3 }}>
            Thank you for your hard work and dedication. We sincerely appreciate
            your efforts and look forward to your continued contributions to our team.
          </Typography>

          <Typography sx={{ mt: 5 }}>Best Regards,</Typography>

          {/* SIGNATURE & STAMP */}
          <Box sx={{ display: "flex", gap: 3, mt: 5 }}>
            {company.incrementSignature && (
              <Box component="img" src={company.incrementSignature} sx={{ height: 50 }} />
            )}
            {company.stamp && (
              <Box component="img" src={company.stamp} sx={{ height: 100 }} />
            )}
          </Box>
        </Box>
        <Typography><b>{company.hrNameOne}</b></Typography>
        <Typography><b>CEO & Managing Director</b></Typography>
      </A4Layout>

      {/* ================= PAGE 2 – SALARY ANNEXURE ================= */}
      <A4Layout company={company}>
        <Typography
          align="center"
          sx={{ ...TEXT, fontWeight: "bold" }}
        >
          Salary Annexure
        </Typography>

        <Box
          sx={{
            width: "150px",
            height: "3px",          // ⬅ makes the line bold
            backgroundColor: "#000",
            color: "#fff !important",
            margin: "0 auto 30px",
          }}
        />


        {/* EMPLOYEE INFO */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={TEXT}>
            Employee Code : {employeeId}
          </Typography>
          <Typography sx={TEXT}>
            Employee Name : {data.mrms}{employeeName}
          </Typography>
          <Typography sx={TEXT}>
            Effective Date : {formatDate(effectiveDate)}
          </Typography>
        </Box>

        {/* SALARY TABLE Start*/}

        <TableContainer sx={{ mb: "4mm" }}>
          <Table
            size="small"
            sx={{
              border: "1px solid #333",       // 🔽 thinner outer border
              borderCollapse: "collapse",
              width: "100%",
              color: "#ffff",
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#000" }}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",          // 🔽 smaller font
                    color: "#fff !important",
                    py: "0.4mm",               // 🔽 compact header height
                  }}
                >
                  Salary Components
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    color: "#fff !important",
                    py: "0.4mm",
                  }}
                >
                  Per month (Rs.)
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    color: "#fff !important",
                    py: "0.4mm",
                  }}
                >
                  Per Annum (Rs.)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* 🔽 Removed tall blank row – keeps table compact */}

              {salaryRows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell
                    sx={{
                      border: "1px solid #333",
                      fontSize: "9.75pt",       // 🔽 smaller body text
                      py: "0.35mm",             // 🔽 tight rows
                    }}
                  >
                    {row[0]}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #333",
                      fontSize: "9.75pt",
                      py: "0.35mm",
                    }}
                  >
                    {formatCurrency(row[1])}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #333",
                      fontSize: "9.75pt",
                      py: "0.35mm",
                    }}
                  >
                    {formatCurrency(row[2])}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell
                  sx={{
                    border: "1px solid #333",
                    fontSize: "9.75pt",
                    py: "0.35mm",
                  }}
                >
                  Provident Fund (PF)
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    border: "1px solid #333",
                    fontSize: "9.75pt",
                    py: "0.35mm",
                  }}
                >
                  {formatCurrency(pfMonthly)}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    border: "1px solid #333",
                    fontSize: "9.75pt",
                    py: "0.35mm",
                  }}
                >
                  {formatCurrency(pfAnnual)}
                </TableCell>
              </TableRow>

              {/* Totals Row */}
              <TableRow sx={{ backgroundColor: "#000" }}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    py: "0.4mm",
                    color: "#fff !important",
                  }}
                >
                  Total Monthly Gross Salary
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    py: "0.4mm",
                    color: "#fff !important",
                  }}
                >
                  {formatCurrency(totalMonthly)}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    py: "0.4mm",
                    color: "#fff !important",
                  }}
                >
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>


        {/* Salary table closed  */}

        <Typography sx={{ ...TEXT, mt: 4 }}>
          Please note that the details in this communication are confidential and
          you are requested not to share the same with others.
        </Typography>

        {/* SIGNATURE & STAMP */}


      </A4Layout>
    </>
  );
}