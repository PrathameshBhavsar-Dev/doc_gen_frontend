// // // import React from "react";
// // // import {
// // //   Box,
// // //   Typography,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableRow,
// // //   TableHead,
// // // } from "@mui/material";
// // // import A4Layout from "../../../layout/A4Page";

// // // /* ================= DATE FORMAT ================= */
// // // const formatDate = (date) =>
// // //   date
// // //     ? new Date(date).toLocaleDateString("en-US", {
// // //         month: "long",
// // //         day: "2-digit",
// // //         year: "numeric",
// // //       })
// // //     : "";

// // // /* ================= COMMON TEXT STYLE ================= */
// // // const TEXT = {
// // //   fontFamily: "Times New Roman, serif",
// // //   fontSize: "14px",
// // //   lineHeight: 1.8,
// // //   color: "#000",
// // // };

// // // /* ================= TABLE CELL STYLE ================= */
// // // const CELL = {
// // //   border: "1px solid #000",
// // //   padding: "6px 8px",
// // //   fontSize: "14px",
// // //   fontFamily: "Times New Roman, serif",
// // // };

// // // /* ================= MAIN COMPONENT ================= */
// // // const JDITIncrement = ({ company, data }) => {
// // //   if (!company || !data) return null;
// // //   console.log("companyname", company.header);

// // //   const {
// // //     issueDate = "",
// // //     employeeName = "",
// // //     employeeId = "",
// // //     effectiveDate = "",
// // //     newCTC = "",
// // //     signatoryName = "",
// // //     signatoryDesignation = "",
// // //     salaryComponents = [],
// // //   } = data;

// // //   const firstName = employeeName.split(" ")[0] || "";

// // //   /* ================= CALCULATIONS ================= */
// // //   const monthlyGross = salaryComponents.reduce(
// // //     (sum, item) => sum + Number(item.monthly || 0),
// // //     0
// // //   );

// // //   const annualCTC = salaryComponents.reduce(
// // //     (sum, item) => sum + Number(item.annual || 0),
// // //     0
// // //   );

// // //   return (
// // //     <A4Layout
// // //       headerSrc={company.header}
// // //       footerSrc={company.footer}
// // //       watermarkSrc={company.watermarkImage}
// // //     >
// // //       {/* ================= ISSUE DATE ================= */}
// // //       <Typography align="right" sx={{ ...TEXT, mb: 5 }}>
// // //         {formatDate(issueDate)}
// // //       </Typography>

// // //       {/* ================= GREETING ================= */}
// // //       <Typography sx={{ ...TEXT, mb: 4 }}>
// // //         Dear {firstName},
// // //       </Typography>

// // //       {/* ================= BODY ================= */}
// // //       <Typography sx={{ ...TEXT, mb: 5, textAlign: "justify" }}>
// // //         We are delighted to inform you that in recognition of your exceptional
// // //         performance and dedication, your salary has been increased. Your new
// // //         annual salary will be <b>{newCTC}</b>, per annum effective from{" "}
// // //         <b>{formatDate(effectiveDate)}</b>.
// // //       </Typography>

// // //       <Typography sx={{ ...TEXT, mb: 7 }}>
// // //         Thank you for your hard work and dedication. We sincerely appreciate your
// // //         hard work and look forward to your continued contributions to our team.
// // //       </Typography>

// // //       {/* ================= SIGNATURE ================= */}
// // //       <Box sx={{ mt: 10 }}>
// // //         <Typography sx={{ ...TEXT, mb: 2 }}>Best Regards,</Typography>
// // //         <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
// // //           {signatoryName}
// // //         </Typography>
// // //         <Typography sx={{ ...TEXT }}>
// // //           {signatoryDesignation}
// // //         </Typography>
// // //       </Box>

// // //       {/* ================= PAGE BREAK ================= */}
// // //       <Box sx={{ pageBreakBefore: "always" }} />

// // //       {/* ================= SALARY ANNEXURE ================= */}
// // //       <Typography
// // //         align="center"
// // //         sx={{ ...TEXT, fontWeight: "bold", mt: 4, mb: 5 }}
// // //       >
// // //         Salary Annexure
// // //       </Typography>

// // //       {/* ================= EMPLOYEE DETAILS ================= */}
// // //       <Box sx={{ ...TEXT, mb: 5 }}>
// // //         <Typography>Employee Code : {employeeId}</Typography>
// // //         <Typography>Employee Name : {employeeName}</Typography>
// // //         <Typography>
// // //           Effective Date : {formatDate(effectiveDate)}
// // //         </Typography>
// // //       </Box>

// // //       {/* ================= SALARY TABLE ================= */}
// // //       <Table sx={{ borderCollapse: "collapse", mb: 5 }}>
// // //         <TableHead>
// // //           <TableRow>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// // //               Monthly Component
// // //             </TableCell>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// // //               Amount (Rs.)
// // //             </TableCell>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// // //               Yearly Component
// // //             </TableCell>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// // //               Amount (Rs.)
// // //             </TableCell>
// // //           </TableRow>
// // //         </TableHead>

// // //         <TableBody>
// // //           {salaryComponents.map((item, index) => (
// // //             <TableRow key={index}>
// // //               <TableCell sx={CELL}>{item.label}</TableCell>
// // //               <TableCell sx={CELL} align="right">
// // //                 {item.monthly}
// // //               </TableCell>
// // //               <TableCell sx={CELL}>{item.label}</TableCell>
// // //               <TableCell sx={CELL} align="right">
// // //                 {item.annual}
// // //               </TableCell>
// // //             </TableRow>
// // //           ))}

// // //           <TableRow>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
// // //               Monthly Gross
// // //             </TableCell>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
// // //               {monthlyGross}
// // //             </TableCell>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
// // //               Annual CTC
// // //             </TableCell>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
// // //               {annualCTC}
// // //             </TableCell>
// // //           </TableRow>
// // //         </TableBody>
// // //       </Table>

// // //       {/* ================= CONFIDENTIAL NOTE ================= */}
// // //       <Typography sx={{ ...TEXT, fontSize: "13px", mt: 4 }}>
// // //         Please note that the details in this communication are confidential and
// // //         you are requested not to share the same with others.
// // //       </Typography>
// // //     </A4Layout>
// // //   );
// // // };

// // // export default JDITIncrement;


// // // import React, { useMemo } from "react";
// // // import {
// // //   Typography,
// // //   Box,
// // //   Table,
// // //   TableRow,
// // //   TableCell,
// // //   TableBody,
// // //   TableHead,
// // // } from "@mui/material";
// // // import A4Layout from "../../../layout/A4Page";

// // // /* ================= SALARY UTILITIES ================= */
// // // import {
// // //   generateOfferLetterComponents,
// // //   formatCurrency,
// // //   numberToWords,
// // // } from "../../../../utils/salaryCalculations";

// // // export default function JDITIncrement({ company, data }) {
// // //   const {
// // //     candidateName = "",
// // //     address = "",
// // //     position = "",
// // //     joiningDate = "",
// // //     salary = 0,
// // //   } = data || {};

// // //   const firstName = candidateName.split(" ")[0] || "";

// // //   const formattedJoiningDate = joiningDate
// // //     ? new Date(joiningDate).toLocaleDateString("en-IN", {
// // //       day: "2-digit",
// // //       month: "long",
// // //       year: "numeric",
// // //     })
// // //     : "";

// // //   /* ================= SALARY ================= */
// // //   const salaryComponents = useMemo(
// // //     () => generateOfferLetterComponents(salary),
// // //     [salary]
// // //   );

// // //   const totalAnnual = Number(salary) || 0;
// // //   const totalMonthly = Math.round(totalAnnual / 12);
// // //   const salaryInWords = numberToWords(totalAnnual);

// // //   /* ================= TYPOGRAPHY ================= */
// // //   const baseText = {
// // //     fontFamily: "Verdana, Geneva, sans-serif",
// // //     fontSize: "14px",
// // //     lineHeight: 1.8,
// // //     color: "#000",
// // //   };

// // //   const para = { ...baseText, mt: "12px" };
// // //   const paraLarge = { ...baseText, mt: "24px" };

// // //   const labelStyle = {
// // //     display: "inline-block",
// // //     width: "110px",
// // //   };

// // //   /* ================= TABLE STYLES ================= */
// // //   const tableCell = {
// // //     fontFamily: "Verdana, Geneva, sans-serif",
// // //     fontSize: "13px",
// // //     lineHeight: 1.4,
// // //     border: "1px solid #000",
// // //     padding: "4px 6px",
// // //   };

// // //   const tableHeader = {
// // //     ...tableCell,
// // //     backgroundColor: "#32a1c2ff",
// // //     color: "#fff",
// // //     fontWeight: "bold",
// // //   };

// // //   const tableTotal = {
// // //     ...tableCell,
// // //     backgroundColor: "#32a1c2ff",
// // //     color: "#fff",
// // //     fontWeight: "bold",
// // //   };
// // //   const TEXT = {
// // //   fontFamily: "Verdana, Geneva, sans-serif",
// // //   fontSize: "14px",
// // //   lineHeight: 1.8,
// // //   color: "#000",
// // // };
// // // const formatDate = (date) =>
// // //   date
// // //     ? new Date(date).toLocaleDateString("en-IN", {
// // //         day: "2-digit",
// // //         month: "long",
// // //         year: "numeric",
// // //       })
// // //     : "";


// // //   return (
// // //     <>
// // //       {/* ================= PAGE 1 ================= */}
// // //       <A4Layout company={company}>
// // //         <Box sx={baseText}>
// // //           {/* DATE */}
// // //           <Typography sx={{ textAlign: "right" }}>
// // //             {new Date(data.issueDate).toLocaleDateString("en-IN", {
// // //               day: "2-digit",
// // //               month: "long",
// // //               year: "numeric",
// // //             })}
// // //           </Typography>

// // //           {/* GREETING */}
// // //           <Typography sx={{ mt: "40px" }}>
// // //             Dear {data.employeeName},
// // //           </Typography>

// // //           {/* INCREMENT CONTENT */}
// // //           <Typography sx={{ mt: "24px" }}>
// // //             We are delighted to inform you that in recognition of your exceptional
// // //             performance and dedication, your salary has been increased.

// // //             Your new annual salary will be{" "}
// // //             <b>Rs. {formatCurrency(data.currentCTC)}</b> ({salaryInWords}), per annum
// // //             effective from{" "}
// // //             <b>
// // //               {new Date(data.issueDate).toLocaleDateString("en-IN", {
// // //                 day: "2-digit",
// // //                 month: "long",
// // //                 year: "numeric",
// // //               })}
// // //             </b>.
// // //           </Typography>

// // //           <Typography sx={{ mt: "24px" }}>
// // //             Thank you for your hard work and dedication. We sincerely appreciate your
// // //             efforts and look forward to your continued contributions to our team.
// // //           </Typography>

// // //           {/* CLOSING */}
// // //           <Typography sx={{ mt: "40px" }}>
// // //             Best Regards,
// // //           </Typography>

// // //           <Typography>
// // //             <b>{company.hrName}</b>
// // //           </Typography>




// // //         </Box>


// // //         {/* SIGNATURE & STAMP – PAGE 1 */}
// // //         <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
// // //           <Box>
// // //             <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
// // //               {company.signature && (
// // //                 <Box component="img" src={company.signature} sx={{ height: "40px" }} />
// // //               )}
// // //               {company.stamp && (
// // //                 <Box component="img" src={company.stamp} sx={{ height: "60px" }} />
// // //               )}
// // //             </Box>

// // //             <Typography><b>CEO & Managing Director</b></Typography>
// // //           </Box>

// // //           <Box sx={{ width: "45%", mt: 8 }}>
// // //             <Typography>Signature : ___________________</Typography>
// // //             <Typography>Candidate Name : {candidateName}</Typography>
// // //           </Box>
// // //         </Box>


// // //         {/* </Box> */}
// // //       </A4Layout >

// // //       {/* ================= PAGE 2 (SALARY STRUCTURE + SIGNATURE) ================= */}
// // //       <A4Layout
// // //         headerSrc={company.headerImage}
// // //         footerSrc={company.footerImage}

// // //       >
// // //         <Typography align="center" sx={{ ...TEXT, mb: 4, fontWeight: "bold" }}>
// // //           Salary Annexure
// // //         </Typography>

// // //         {/* Employee Info */}
// // //         <Box sx={{ mb: 3 }}>
// // //           <Typography sx={TEXT}>
// // //             <b>Employee Code</b> : {data.employeeId}
// // //           </Typography>
// // //           <Typography sx={TEXT}>
// // //             <b>Employee Name</b> : {data.employeeName}
// // //           </Typography>
// // //           <Typography sx={TEXT}>
// // //             <b>Effective Date</b> : {formatDate(effectiveDate)}
// // //           </Typography>
// // //         </Box>

// // //         {/* Salary Comparison Table */}
// // //         <TableContainer
// // //           component={Paper}
// // //           sx={{
// // //             border: "1.5px solid black",
// // //             borderRadius: 0,
// // //             backgroundColor: "transparent", // ✅ make transparent
// // //             "& .MuiTableCell-root": {
// // //               border: "1px solid black",
// // //               fontSize: "11pt",
// // //               padding: "6px 8px",
// // //               verticalAlign: "middle",
// // //               backgroundColor: "transparent", // ✅ make cells transparent too
// // //             },
// // //             boxShadow: "none", // ✅ remove shadow layer
// // //           }}
// // //         >
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow sx={{ backgroundColor: 'lightblue' }}>
// // //                 <TableCell sx={{ fontWeight: 'bold' }}>Monthly Component</TableCell>
// // //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount (₹)</TableCell>
// // //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Yearly Component</TableCell>
// // //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount (₹)</TableCell>
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               <TableRow>
// // //                 <TableCell>Basic</TableCell>
// // //                 <TableCell align="center">{formatCurrency(basicMonthly)}</TableCell>
// // //                 <TableCell></TableCell>
// // //                 <TableCell align="center">{formatCurrency(basicAnnual)}</TableCell>
// // //               </TableRow>

// // //               <TableRow>
// // //                 <TableCell>House Rent Allowance (HRA)</TableCell>
// // //                 <TableCell align="center">{formatCurrency(hraMonthly)}</TableCell>
// // //                 <TableCell></TableCell>
// // //                 <TableCell align="center">{formatCurrency(hraAnnual)}</TableCell>
// // //               </TableRow>

// // //               <TableRow>
// // //                 <TableCell>Conveyance Allowance</TableCell>
// // //                 <TableCell align="center">{formatCurrency(conveyanceMonthly)}</TableCell>
// // //                 <TableCell></TableCell>
// // //                 <TableCell align="center">{formatCurrency(conveyanceAnnual)}</TableCell>
// // //               </TableRow>

// // //               <TableRow>
// // //                 <TableCell>Medical Allowance</TableCell>
// // //                 <TableCell align="center">{formatCurrency(medicMonthly)}</TableCell>
// // //                 <TableCell></TableCell>
// // //                 <TableCell align="center">{formatCurrency(medicAnnual)}</TableCell>
// // //               </TableRow>

// // //               <TableRow>
// // //                 <TableCell>Special Allowance</TableCell>
// // //                 <TableCell align="center">{formatCurrency(specialMonthly)}</TableCell>
// // //                 <TableCell></TableCell>
// // //                 <TableCell align="center">{formatCurrency(specialAnnual)}</TableCell>
// // //               </TableRow>

// // //               {/* Totals */}
// // //               <TableRow sx={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
// // //                 <TableCell sx={{ fontWeight: 'bold' }}>Monthly Gross</TableCell>
// // //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
// // //                   {formatCurrency(
// // //                     basicMonthly +
// // //                     hraMonthly +
// // //                     conveyanceMonthly +
// // //                     medicMonthly +
// // //                     specialMonthly
// // //                   )}
// // //                 </TableCell>
// // //                 <TableCell sx={{ fontWeight: 'bold' }}>Annual CTC</TableCell>
// // //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
// // //                   {formatCurrency(newCTC)}
// // //                 </TableCell>
// // //               </TableRow>
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>

// // //         <Typography sx={{ ...TEXT, mt: 4 }}>
// // //           Please note that the details in this communication are confidential and
// // //           you are requested not to share the same with others.
// // //         </Typography>



// // //         {/* SIGNATURE & STAMP – PAGE 2 */}
// // //         <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
// // //           <Box>
// // //             <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
// // //               {company.signature && (
// // //                 <Box component="img" src={company.signature} sx={{ height: "40px" }} />
// // //               )}
// // //               {company.stamp && (
// // //                 <Box component="img" src={company.stamp} sx={{ height: "60px" }} />
// // //               )}
// // //             </Box>
// // //             <Typography>{company.hrName}</Typography>
// // //             <Typography>HR Department Pune</Typography>
// // //           </Box>

// // //           <Box sx={{ width: "45%", mt: 8 }}>
// // //             <Typography>Signature : ___________________</Typography>
// // //             <Typography>Candidate Name : {candidateName}</Typography>
// // //           </Box>
// // //         </Box>

// // //     </A4Layout >
// // //     </>
// // //   );
// // // }
// // // // export default JDITIncrement;

// // // import React, { useMemo } from "react";
// // // import {
// // //   Typography,
// // //   Box,
// // //   Table,
// // //   TableRow,
// // //   TableCell,
// // //   TableBody,
// // //   TableHead,
// // //   TableContainer,
// // //   Paper,
// // // } from "@mui/material";
// // // import A4Layout from "../../../layout/A4Page";

// // // /* ================= SALARY UTILITIES ================= */
// // // import {
// // //   generateOfferLetterComponents,
// // //   formatCurrency,
// // //   numberToWords,
// // // } from "../../../../utils/salaryCalculations";

// // // /* ================= COMMON TEXT ================= */
// // // const TEXT = {
// // //   fontFamily: "Verdana, Geneva, sans-serif",
// // //   fontSize: "14px",
// // //   lineHeight: 1.8,
// // // };

// // // /* ================= DATE FORMAT ================= */
// // // const formatDate = (date) =>
// // //   date
// // //     ? new Date(date).toLocaleDateString("en-US", {
// // //       month: "long",
// // //       day: "2-digit",
// // //       year: "numeric",
// // //     })
// // //     : "";


// // // export default function JDITIncrement({ company, data }) {
// // //   const {
// // //     employeeName = "",
// // //     employeeId = "",
// // //     issueDate = "",
// // //     effectiveDate = "",
// // //     newCTC = 0,
// // //   } = data || {};

// // //   const firstName = employeeName.split(" ")[0] || "";

// // //   /* ================= SALARY ================= */
// // //   const salaryComponents = useMemo(
// // //     () => generateOfferLetterComponents(newCTC),
// // //     [newCTC]
// // //   );

// // //   const totalAnnual = Number(newCTC) || 0;
// // //   const totalMonthly = Math.round(totalAnnual / 12);
// // //   const salaryInWords = numberToWords(totalAnnual);

// // // import React from "react";
// // // import {
// // //   Box,
// // //   Typography,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableRow,
// // //   TableHead,
// // // } from "@mui/material";
// // // import A4Layout from "../../../layout/A4Page";

// // // /* ================= DATE FORMAT ================= */
// // // const formatDate = (date) =>
// // //   date
// // //     ? new Date(date).toLocaleDateString("en-US", {
// // //         month: "long",
// // //         day: "2-digit",
// // //         year: "numeric",
// // //       })
// // //     : "";

// // // /* ================= COMMON TEXT STYLE ================= */
// // // const TEXT = {
// // //   fontFamily: "Times New Roman, serif",
// // //   fontSize: "14px",
// // //   lineHeight: 1.8,
// // //   color: "#000",
// // // };

// // // /* ================= TABLE CELL STYLE ================= */
// // // const CELL = {
// // //   border: "1px solid #000",
// // //   padding: "6px 8px",
// // //   fontSize: "14px",
// // //   fontFamily: "Times New Roman, serif",
// // // };

// // // /* ================= MAIN COMPONENT ================= */
// // // const JDITIncrement = ({ company, data }) => {
// // //   if (!company || !data) return null;
// // //   console.log("companyname", company.header);

// // //   const {
// // //     issueDate = "",
// // //     employeeName = "",
// // //     employeeId = "",
// // //     effectiveDate = "",
// // //     newCTC = "",
// // //     signatoryName = "",
// // //     signatoryDesignation = "",
// // //     salaryComponents = [],
// // //   } = data;

// // //   const firstName = employeeName.split(" ")[0] || "";

// // //   /* ================= CALCULATIONS ================= */
// // //   const monthlyGross = salaryComponents.reduce(
// // //     (sum, item) => sum + Number(item.monthly || 0),
// // //     0
// // //   );

// // //   const annualCTC = salaryComponents.reduce(
// // //     (sum, item) => sum + Number(item.annual || 0),
// // //     0
// // //   );

// // //   return (
// // //     <A4Layout
// // //       headerSrc={company.header}
// // //       footerSrc={company.footer}
// // //       watermarkSrc={company.watermarkImage}
// // //     >
// // //       {/* ================= ISSUE DATE ================= */}
// // //       <Typography align="right" sx={{ ...TEXT, mb: 5 }}>
// // //         {formatDate(issueDate)}
// // //       </Typography>

// // //       {/* ================= GREETING ================= */}
// // //       <Typography sx={{ ...TEXT, mb: 4 }}>
// // //         Dear {firstName},
// // //       </Typography>

// // //       {/* ================= BODY ================= */}
// // //       <Typography sx={{ ...TEXT, mb: 5, textAlign: "justify" }}>
// // //         We are delighted to inform you that in recognition of your exceptional
// // //         performance and dedication, your salary has been increased. Your new
// // //         annual salary will be <b>{newCTC}</b>, per annum effective from{" "}
// // //         <b>{formatDate(effectiveDate)}</b>.
// // //       </Typography>

// // //       <Typography sx={{ ...TEXT, mb: 7 }}>
// // //         Thank you for your hard work and dedication. We sincerely appreciate your
// // //         hard work and look forward to your continued contributions to our team.
// // //       </Typography>

// // //       {/* ================= SIGNATURE ================= */}
// // //       <Box sx={{ mt: 10 }}>
// // //         <Typography sx={{ ...TEXT, mb: 2 }}>Best Regards,</Typography>
// // //         <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
// // //           {signatoryName}
// // //         </Typography>
// // //         <Typography sx={{ ...TEXT }}>
// // //           {signatoryDesignation}
// // //         </Typography>
// // //       </Box>

// // //       {/* ================= PAGE BREAK ================= */}
// // //       <Box sx={{ pageBreakBefore: "always" }} />

// // //       {/* ================= SALARY ANNEXURE ================= */}
// // //       <Typography
// // //         align="center"
// // //         sx={{ ...TEXT, fontWeight: "bold", mt: 4, mb: 5 }}
// // //       >
// // //         Salary Annexure
// // //       </Typography>

// // //       {/* ================= EMPLOYEE DETAILS ================= */}
// // //       <Box sx={{ ...TEXT, mb: 5 }}>
// // //         <Typography>Employee Code : {employeeId}</Typography>
// // //         <Typography>Employee Name : {employeeName}</Typography>
// // //         <Typography>
// // //           Effective Date : {formatDate(effectiveDate)}
// // //         </Typography>
// // //       </Box>

// // //       {/* ================= SALARY TABLE ================= */}
// // //       <Table sx={{ borderCollapse: "collapse", mb: 5 }}>
// // //         <TableHead>
// // //           <TableRow>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// // //               Monthly Component
// // //             </TableCell>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// // //               Amount (Rs.)
// // //             </TableCell>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// // //               Yearly Component
// // //             </TableCell>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
// // //               Amount (Rs.)
// // //             </TableCell>
// // //           </TableRow>
// // //         </TableHead>

// // //         <TableBody>
// // //           {salaryComponents.map((item, index) => (
// // //             <TableRow key={index}>
// // //               <TableCell sx={CELL}>{item.label}</TableCell>
// // //               <TableCell sx={CELL} align="right">
// // //                 {item.monthly}
// // //               </TableCell>
// // //               <TableCell sx={CELL}>{item.label}</TableCell>
// // //               <TableCell sx={CELL} align="right">
// // //                 {item.annual}
// // //               </TableCell>
// // //             </TableRow>
// // //           ))}

// // //           <TableRow>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
// // //               Monthly Gross
// // //             </TableCell>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
// // //               {monthlyGross}
// // //             </TableCell>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
// // //               Annual CTC
// // //             </TableCell>
// // //             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
// // //               {annualCTC}
// // //             </TableCell>
// // //           </TableRow>
// // //         </TableBody>
// // //       </Table>

// // //       {/* ================= CONFIDENTIAL NOTE ================= */}
// // //       <Typography sx={{ ...TEXT, fontSize: "13px", mt: 4 }}>
// // //         Please note that the details in this communication are confidential and
// // //         you are requested not to share the same with others.
// // //       </Typography>
// // //     </A4Layout>
// // //   );
// // // };

// // // export default JDITIncrement;


// // // import React, { useMemo } from "react";
// // // import {
// // //   Typography,
// // //   Box,
// // //   Table,
// // //   TableRow,
// // //   TableCell,
// // //   TableBody,
// // //   TableHead,
// // // } from "@mui/material";
// // // import A4Layout from "../../../layout/A4Page";

// // // /* ================= SALARY UTILITIES ================= */
// // // import {
// // //   generateOfferLetterComponents,
// // //   formatCurrency,
// // //   numberToWords,
// // // } from "../../../../utils/salaryCalculations";

// // // export default function JDITIncrement({ company, data }) {
// // //   const {
// // //     candidateName = "",
// // //     address = "",
// // //     position = "",
// // //     joiningDate = "",
// // //     salary = 0,
// // //   } = data || {};

// // //   const firstName = candidateName.split(" ")[0] || "";

// // //   const formattedJoiningDate = joiningDate
// // //     ? new Date(joiningDate).toLocaleDateString("en-IN", {
// // //       day: "2-digit",
// // //       month: "long",
// // //       year: "numeric",
// // //     })
// // //     : "";

// // //   /* ================= SALARY ================= */
// // //   const salaryComponents = useMemo(
// // //     () => generateOfferLetterComponents(salary),
// // //     [salary]
// // //   );

// // //   const totalAnnual = Number(salary) || 0;
// // //   const totalMonthly = Math.round(totalAnnual / 12);
// // //   const salaryInWords = numberToWords(totalAnnual);

// // //   /* ================= TYPOGRAPHY ================= */
// // //   const baseText = {
// // //     fontFamily: "Verdana, Geneva, sans-serif",
// // //     fontSize: "14px",
// // //     lineHeight: 1.8,
// // //     color: "#000",
// // //   };

// // //   const para = { ...baseText, mt: "12px" };
// // //   const paraLarge = { ...baseText, mt: "24px" };

// // //   const labelStyle = {
// // //     display: "inline-block",
// // //     width: "110px",
// // //   };

// // //   /* ================= TABLE STYLES ================= */
// // //   const tableCell = {
// // //     fontFamily: "Verdana, Geneva, sans-serif",
// // //     fontSize: "13px",
// // //     lineHeight: 1.4,
// // //     border: "1px solid #000",
// // //     padding: "4px 6px",
// // //   };

// // //   const tableHeader = {
// // //     ...tableCell,
// // //     backgroundColor: "#32a1c2ff",
// // //     color: "#fff",
// // //     fontWeight: "bold",
// // //   };

// // //   const tableTotal = {
// // //     ...tableCell,
// // //     backgroundColor: "#32a1c2ff",
// // //     color: "#fff",
// // //     fontWeight: "bold",
// // //   };
// // //   const TEXT = {
// // //   fontFamily: "Verdana, Geneva, sans-serif",
// // //   fontSize: "14px",
// // //   lineHeight: 1.8,
// // //   color: "#000",
// // // };
// // // const formatDate = (date) =>
// // //   date
// // //     ? new Date(date).toLocaleDateString("en-IN", {
// // //         day: "2-digit",
// // //         month: "long",
// // //         year: "numeric",
// // //       })
// // //     : "";


// // //   return (
// // //     <>
// // //       {/* ================= PAGE 1 ================= */}
// // //       <A4Layout company={company}>
// // //         <Box sx={baseText}>
// // //           {/* DATE */}
// // //           <Typography sx={{ textAlign: "right" }}>
// // //             {new Date(data.issueDate).toLocaleDateString("en-IN", {
// // //               day: "2-digit",
// // //               month: "long",
// // //               year: "numeric",
// // //             })}
// // //           </Typography>

// // //           {/* GREETING */}
// // //           <Typography sx={{ mt: "40px" }}>
// // //             Dear {data.employeeName},
// // //           </Typography>

// // //           {/* INCREMENT CONTENT */}
// // //           <Typography sx={{ mt: "24px" }}>
// // //             We are delighted to inform you that in recognition of your exceptional
// // //             performance and dedication, your salary has been increased.

// // //             Your new annual salary will be{" "}
// // //             <b>Rs. {formatCurrency(data.currentCTC)}</b> ({salaryInWords}), per annum
// // //             effective from{" "}
// // //             <b>
// // //               {new Date(data.issueDate).toLocaleDateString("en-IN", {
// // //                 day: "2-digit",
// // //                 month: "long",
// // //                 year: "numeric",
// // //               })}
// // //             </b>.
// // //           </Typography>

// // //           <Typography sx={{ mt: "24px" }}>
// // //             Thank you for your hard work and dedication. We sincerely appreciate your
// // //             efforts and look forward to your continued contributions to our team.
// // //           </Typography>

// // //           {/* CLOSING */}
// // //           <Typography sx={{ mt: "40px" }}>
// // //             Best Regards,
// // //           </Typography>

// // //           <Typography>
// // //             <b>{company.hrName}</b>
// // //           </Typography>




// // //         </Box>


// // //         {/* SIGNATURE & STAMP – PAGE 1 */}
// // //         <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
// // //           <Box>
// // //             <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
// // //               {company.signature && (
// // //                 <Box component="img" src={company.signature} sx={{ height: "40px" }} />
// // //               )}
// // //               {company.stamp && (
// // //                 <Box component="img" src={company.stamp} sx={{ height: "60px" }} />
// // //               )}
// // //             </Box>

// // //             <Typography><b>CEO & Managing Director</b></Typography>
// // //           </Box>

// // //           <Box sx={{ width: "45%", mt: 8 }}>
// // //             <Typography>Signature : ___________________</Typography>
// // //             <Typography>Candidate Name : {candidateName}</Typography>
// // //           </Box>
// // //         </Box>


// // //         {/* </Box> */}
// // //       </A4Layout >

// // //       {/* ================= PAGE 2 (SALARY STRUCTURE + SIGNATURE) ================= */}
// // //       <A4Layout
// // //         headerSrc={company.headerImage}
// // //         footerSrc={company.footerImage}

// // //       >
// // //         <Typography align="center" sx={{ ...TEXT, mb: 4, fontWeight: "bold" }}>
// // //           Salary Annexure
// // //         </Typography>

// // //         {/* Employee Info */}
// // //         <Box sx={{ mb: 3 }}>
// // //           <Typography sx={TEXT}>
// // //             <b>Employee Code</b> : {data.employeeId}
// // //           </Typography>
// // //           <Typography sx={TEXT}>
// // //             <b>Employee Name</b> : {data.employeeName}
// // //           </Typography>
// // //           <Typography sx={TEXT}>
// // //             <b>Effective Date</b> : {formatDate(effectiveDate)}
// // //           </Typography>
// // //         </Box>

// // //         {/* Salary Comparison Table */}
// // //         <TableContainer
// // //           component={Paper}
// // //           sx={{
// // //             border: "1.5px solid black",
// // //             borderRadius: 0,
// // //             backgroundColor: "transparent", // ✅ make transparent
// // //             "& .MuiTableCell-root": {
// // //               border: "1px solid black",
// // //               fontSize: "11pt",
// // //               padding: "6px 8px",
// // //               verticalAlign: "middle",
// // //               backgroundColor: "transparent", // ✅ make cells transparent too
// // //             },
// // //             boxShadow: "none", // ✅ remove shadow layer
// // //           }}
// // //         >
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow sx={{ backgroundColor: 'lightblue' }}>
// // //                 <TableCell sx={{ fontWeight: 'bold' }}>Monthly Component</TableCell>
// // //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount (₹)</TableCell>
// // //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Yearly Component</TableCell>
// // //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount (₹)</TableCell>
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               <TableRow>
// // //                 <TableCell>Basic</TableCell>
// // //                 <TableCell align="center">{formatCurrency(basicMonthly)}</TableCell>
// // //                 <TableCell></TableCell>
// // //                 <TableCell align="center">{formatCurrency(basicAnnual)}</TableCell>
// // //               </TableRow>

// // //               <TableRow>
// // //                 <TableCell>House Rent Allowance (HRA)</TableCell>
// // //                 <TableCell align="center">{formatCurrency(hraMonthly)}</TableCell>
// // //                 <TableCell></TableCell>
// // //                 <TableCell align="center">{formatCurrency(hraAnnual)}</TableCell>
// // //               </TableRow>

// // //               <TableRow>
// // //                 <TableCell>Conveyance Allowance</TableCell>
// // //                 <TableCell align="center">{formatCurrency(conveyanceMonthly)}</TableCell>
// // //                 <TableCell></TableCell>
// // //                 <TableCell align="center">{formatCurrency(conveyanceAnnual)}</TableCell>
// // //               </TableRow>

// // //               <TableRow>
// // //                 <TableCell>Medical Allowance</TableCell>
// // //                 <TableCell align="center">{formatCurrency(medicMonthly)}</TableCell>
// // //                 <TableCell></TableCell>
// // //                 <TableCell align="center">{formatCurrency(medicAnnual)}</TableCell>
// // //               </TableRow>

// // //               <TableRow>
// // //                 <TableCell>Special Allowance</TableCell>
// // //                 <TableCell align="center">{formatCurrency(specialMonthly)}</TableCell>
// // //                 <TableCell></TableCell>
// // //                 <TableCell align="center">{formatCurrency(specialAnnual)}</TableCell>
// // //               </TableRow>

// // //               {/* Totals */}
// // //               <TableRow sx={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
// // //                 <TableCell sx={{ fontWeight: 'bold' }}>Monthly Gross</TableCell>
// // //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
// // //                   {formatCurrency(
// // //                     basicMonthly +
// // //                     hraMonthly +
// // //                     conveyanceMonthly +
// // //                     medicMonthly +
// // //                     specialMonthly
// // //                   )}
// // //                 </TableCell>
// // //                 <TableCell sx={{ fontWeight: 'bold' }}>Annual CTC</TableCell>
// // //                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
// // //                   {formatCurrency(newCTC)}
// // //                 </TableCell>
// // //               </TableRow>
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>

// // //         <Typography sx={{ ...TEXT, mt: 4 }}>
// // //           Please note that the details in this communication are confidential and
// // //           you are requested not to share the same with others.
// // //         </Typography>



// // //         {/* SIGNATURE & STAMP – PAGE 2 */}
// // //         <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
// // //           <Box>
// // //             <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
// // //               {company.signature && (
// // //                 <Box component="img" src={company.signature} sx={{ height: "40px" }} />
// // //               )}
// // //               {company.stamp && (
// // //                 <Box component="img" src={company.stamp} sx={{ height: "60px" }} />
// // //               )}
// // //             </Box>
// // //             <Typography>{company.hrName}</Typography>
// // //             <Typography>HR Department Pune</Typography>
// // //           </Box>

// // //           <Box sx={{ width: "45%", mt: 8 }}>
// // //             <Typography>Signature : ___________________</Typography>
// // //             <Typography>Candidate Name : {candidateName}</Typography>
// // //           </Box>
// // //         </Box>

// // //     </A4Layout >
// // //     </>
// // //   );
// // // }
// // // // export default JDITIncrement;

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
// //             performance and dedication as <b>{data.designation}</b> your salary has been increased.

// //             Your new annual salary will be{" "}
// //             <b>Rs. {formatCurrency(totalAnnual)}</b>, per annum
// //             effective from{" "}
// //             <b>{formatDate(effectiveDate)}</b>.
// //           </Typography>

// //           <Typography sx={{ mt: 3 }}>
// //             Thank you for your hard work and dedication. We sincerely appreciate
// //             your efforts and look forward to your continued contributions to our team.
// //           </Typography>

// //           <Typography sx={{ mt: 5 }}>Best Regards,</Typography>

// //           {/* SIGNATURE & STAMP */}
// //           <Box sx={{ display: "flex", gap: 3, mt: 5 }}>
// //             {company.incrementSignature && (
// //               <Box component="img" src={company.incrementSignature} sx={{ height: 50 }} />
// //             )}
// //             {company.stamp && (
// //               <Box component="img" src={company.stamp} sx={{ height: 100 }} />
// //             )}
// //           </Box>
// //         </Box>
// //         <Typography><b>{company.hrNameOne}</b></Typography>
// //         <Typography><b>CEO & Managing Director</b></Typography>
// //       </A4Layout>

// //       {/* ================= PAGE 2 – SALARY ANNEXURE ================= */}
// //       <A4Layout company={company}>
// //         <Typography
// //           align="center"
// //           sx={{ ...TEXT, fontWeight: "bold" }}
// //         >
// //           Salary Annexure
// //         </Typography>

// //         <Box
// //           sx={{
// //             width: "150px",
// //             height: "3px",          // ⬅ makes the line bold
// //             backgroundColor: "#000",
// //             color: "#fff !important",
// //             margin: "0 auto 30px",
// //           }}
// //         />


// //         {/* EMPLOYEE INFO */}
// //         <Box sx={{ mb: 3 }}>
// //           <Typography sx={TEXT}>
// //             Employee Code : {employeeId}
// //           </Typography>
// //           <Typography sx={TEXT}>
// //             Employee Name : {data.mrms}{employeeName}
// //           </Typography>
// //           <Typography sx={TEXT}>
// //             Effective Date : {formatDate(effectiveDate)}
// //           </Typography>
// //         </Box>

// //         {/* SALARY TABLE Start*/}

// //  <TableContainer sx={{ mb: "4mm" }}>
// //           <Table
// //             size="small"
// //             sx={{
// //               border: "1px solid #333",       // 🔽 thinner outer border
// //               borderCollapse: "collapse",
// //               width: "100%",
// //               color: "#ffff",
// //             }}
// //           >
// //             <TableHead>
// //               <TableRow sx={{ backgroundColor: "#000" }}>
// //                 <TableCell
// //                   sx={{
// //                     fontWeight: 600,
// //                     border: "1px solid #333",
// //                     fontSize: "10pt",          // 🔽 smaller font
// //                     color: "#fff !important",
// //                     py: "0.4mm",               // 🔽 compact header height
// //                   }}
// //                 >
// //                   Salary Components
// //                 </TableCell>

// //                 <TableCell
// //                   align="center"
// //                   sx={{
// //                     fontWeight: 600,
// //                     border: "1px solid #333",
// //                     fontSize: "10pt",
// //                     color: "#fff !important",
// //                     py: "0.4mm",
// //                   }}
// //                 >
// //                   Per month (Rs.)
// //                 </TableCell>

// //                 <TableCell
// //                   align="center"
// //                   sx={{
// //                     fontWeight: 600,
// //                     border: "1px solid #333",
// //                     fontSize: "10pt",
// //                     color: "#fff !important",
// //                     py: "0.4mm",
// //                   }}
// //                 >
// //                   Per Annum (Rs.)
// //                 </TableCell>
// //               </TableRow>
// //             </TableHead>

// //             <TableBody>
// //               {/* 🔽 Removed tall blank row – keeps table compact */}

// //               {salaryComponents.map((row, i) => (
// //                 <TableRow key={i}>
// //                   <TableCell
// //                     sx={{
// //                       border: "1px solid #333",
// //                       fontSize: "9.75pt",       // 🔽 smaller body text
// //                       py: "0.35mm",             // 🔽 tight rows
// //                     }}
// //                   >
// //                     {row.name}
// //                   </TableCell>

// //                   <TableCell
// //                     align="center"
// //                     sx={{
// //                       border: "1px solid #333",
// //                       fontSize: "9.75pt",
// //                       py: "0.35mm",
// //                     }}
// //                   >
// //                     {formatCurrency(row.monthly)}
// //                   </TableCell>

// //                   <TableCell
// //                     align="center"
// //                     sx={{
// //                       border: "1px solid #333",
// //                       fontSize: "9.75pt",
// //                       py: "0.35mm",
// //                     }}
// //                   >
// //                     {formatCurrency(row.annual)}
// //                   </TableCell>
// //                 </TableRow>
// //               ))}

// //               {/* Totals Row */}
// //               <TableRow sx={{ backgroundColor: "#000" }}>
// //                 <TableCell
// //                   sx={{
// //                     fontWeight: 600,
// //                     border: "1px solid #333",
// //                     fontSize: "10pt",
// //                     py: "0.4mm",
// //                     color: "#fff !important",
// //                   }}
// //                 >
// //                   Total Monthly Gross Salary
// //                 </TableCell>

// //                 <TableCell
// //                   align="center"
// //                   sx={{
// //                     fontWeight: 600,
// //                     border: "1px solid #333",
// //                     fontSize: "10pt",
// //                     py: "0.4mm",
// //                     color: "#fff !important",
// //                   }}
// //                 >
// //                   {formatCurrency(totalMonthly)}
// //                 </TableCell>

// //                 <TableCell
// //                   align="center"
// //                   sx={{
// //                     fontWeight: 600,
// //                     border: "1px solid #333",
// //                     fontSize: "10pt",
// //                     py: "0.4mm",
// //                     color: "#fff !important",
// //                   }}
// //                 >
// //                   {formatCurrency(totalAnnual)}
// //                 </TableCell>
// //               </TableRow>
// //             </TableBody>
// //           </Table>
// //         </TableContainer>


// //         {/* Salary table closed  */}

// //         <Typography sx={{ ...TEXT, mt: 4 }}>
// //           Please note that the details in this communication are confidential and
// //           you are requested not to share the same with others.
// //         </Typography>

// //         {/* SIGNATURE & STAMP */}


// //       </A4Layout>
// //     </>
// //   );
// // }

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////


// // import React, { useMemo } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Table,
// //   TableBody,
// //   TableRow,
// //   TableCell,
// //   TableHead,
// //   TableContainer,
// // } from "@mui/material";
// // import A4Layout from "../../../layout/A4Page";
// // import { formatCurrency, generateOfferLetterComponents, numberToWords } from "../../../../utils/salaryCalculations";

// // /* ================= DATE FORMAT ================= */
// // const formatDate = (date) =>
// //   date
// //     ? new Date(date).toLocaleDateString("en-GB", {
// //       day: "2-digit",
// //       month: "long",
// //       year: "numeric",
// //     })
// //     : "";

// // /* ================= STYLES ================= */
// // const TEXT = {
// //   fontFamily: "Times New Roman, serif",
// //   fontSize: "14px",
// //   lineHeight: 1.7,
// // };

// // /* ================= COMPONENT ================= */
// // const JDITOffer = ({ company, data }) => {
// //   if (!company || !data) return null;

// //   /* 🔥 OFFER LETTER FIELD NAMES */
// //   const {
// //     issueDate,
// //     candidateName,
// //     position,
// //     joiningDate,
// //     employeeId,
// //     signatoryName,
// //     signatoryDesignation,
// //     newCTC,
// //     salary,          // Annual CTC
// //     location,
// //   } = data;

// //   /* 🔥 DERIVED VALUES */
// //   // const annualCTC = Number(salary || 0);
// //   // const monthlyCTC = Math.round(annualCTC / 12);
// //   const annualCTC = Number(salary || 0);

// //   const salaryComponents = useMemo(
// //     () => generateOfferLetterComponents(annualCTC),
// //     [annualCTC]
// //   );

// //   const totalAnnual = annualCTC;
// //   const totalMonthly = Math.round(annualCTC / 12);




// import React, { useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableHead,
//   TableContainer,
// } from "@mui/material";
// import A4Layout from "../../../../layout/A4Page";
// import { formatCurrency, generateOfferLetterComponents, numberToWords } from "../../../../../utils/salaryCalculations";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     })
//     : "";

// /* ================= STYLES ================= */
// const TEXT = {
//   fontFamily: "Times New Roman, serif",
//   fontSize: "16px",
//   lineHeight: 1.3,
// };

// /* ================= COMPONENT ================= */
// const JDITOffer = ({ company, data }) => {
//   if (!company || !data) return null;

//   /* 🔥 OFFER LETTER FIELD NAMES */
//   const {
//     issueDate,
//     candidateName,
//     position,
//     joiningDate,
//     employeeId,
//     signatoryName,
//     signatoryDesignation,
//     newCTC,
//     salary,          // Annual CTC
//     location,
//   } = data;

//   /* 🔥 DERIVED VALUES */
//   const monthlyCTC = Number(salary || 0);
//   const annualCTC = monthlyCTC * 12;

//   const basic = Math.round(monthlyCTC * 0.4);
//   const hra = Math.round(monthlyCTC * 0.18);
//   const da = Math.round(monthlyCTC * 0.12);
//   const allowance = Math.round(monthlyCTC * 0.06);
//   const specialAllowance = Math.round(monthlyCTC * 0.16);

//   // Calculate Misc Allowance as the balancing figure for any rounding differences
//   const miscAllowance = Math.round(monthlyCTC * 0.08);

//   const salaryComponents = useMemo(() => {
//     return [
//       { name: "Basic", monthly: basic, annual: basic * 12 },
//       { name: "HRA", monthly: hra, annual: hra * 12 },
//       { name: "Dearness Allowance", monthly: da, annual: da * 12 },
//       { name: "Special Allowance", monthly: specialAllowance, annual: specialAllowance * 12 },
//       { name: "Food Allowance", monthly: allowance, annual: allowance * 12 },
//       { name: "Misc Allowance", monthly: miscAllowance, annual: miscAllowance * 12 },
//     ];
//   }, [basic, hra, da, specialAllowance, allowance, miscAllowance]);

//   const totalMonthly = monthlyCTC;
//   const totalAnnual = annualCTC;

//   return (
//     <>
//       {/* ================= PAGE 1 ================= */}
//       <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>

//         {/* ================= COMPANY HEADER ================= */}
//         <Typography align="center" sx={{ ...TEXT, fontWeight: "bold" }}>
//           JDIT Software Solutions Pvt. Ltd.
//         </Typography>

//         <Typography align="center" sx={TEXT}>
//           301 A, 3rd Floor, Sai Villa Commercial Appartment, Sr No 166, Malwadi Road,
//         </Typography>
//         <Typography align="center" sx={TEXT}>
//           Opp. to Sahyadri Hospital, Hadapsar, Pune - 411028
//         </Typography>
//         <Typography align="center" sx={{ ...TEXT, mb: 2 }}>
//           Telephone: 020-27212597, URL: www.jditbs.com
//         </Typography>

//         {/* ================= TITLE ================= */}
//         <Typography align="center" sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
//           EMPLOYMENT OFFER
//         </Typography>

//         {/* ---- thin line below title ---- */}
//         <Box
//           sx={{
//             width: "180px",
//             height: "1px",
//             backgroundColor: "#000",
//             margin: "0 auto 14px",
//           }}
//         />

//         {/* ================= AGREEMENT BLOCK ================= */}
//         <Typography align="center" sx={TEXT}>
//           This agreement is made on <b>{formatDate(issueDate)}</b> at {location}.
//         </Typography>

//         <Typography align="center" sx={TEXT}>Between</Typography>

//         <Typography align="center" sx={TEXT}>
//           JDIT Software Solutions (hereinafter referred to as ‘JDIT’ or ‘Company’)
//         </Typography>

//         <Typography align="center" sx={TEXT}>And</Typography>

//         <Typography align="center" sx={{ ...TEXT, fontWeight: "bold", mb: 2 }}>
//           {candidateName}
//         </Typography>

//         {/* ---- full width divider like screenshot ---- */}
//         <Box
//           sx={{
//             borderBottom: "1px solid #000",
//             mb: 2,
//           }}
//         />

//         {/* ================= OFFER DETAILS ================= */}
//         <Box sx={{ mb: 2 }}>
//           {employeeId && (
//             <Typography sx={{ ...TEXT, mb: 0.5 }}>
//               ➢ Offer ID / Employee ID: <b>{employeeId}</b>
//             </Typography>
//           )}
//           <Typography sx={{ ...TEXT, mb: 0.5 }}>
//             ➢ Position: <b>{position}</b>
//           </Typography>
//           <Typography sx={{ ...TEXT, mb: 0.5 }}>
//             ➢ Employee’s Name: <b>{candidateName}</b>
//           </Typography>
//           <Typography sx={{ ...TEXT, mb: 0.5 }}>
//             ➢ Business / Work Hours per Day: <b>As per business requirement of the client.</b>
//           </Typography>
//           <Typography sx={{ ...TEXT, mb: 0.5 }}>
//             ➢ Payment Date of Salary: <b>On the 7th Working day of the next month.</b>
//           </Typography>
//         </Box>

//         {/* ================= NOTICE PERIOD ================= */}
//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           ➢ <b>Notice Period:</b> A notice of 1 month is required if you wish to resign
//           or terminate this contract. Notice period is considered to start from the
//           point when the written communication is received from the Client / Company /
//           You. However when the client ends the contract without notice to JDIT, same
//           clause is applicable to you as well. When situations warrant, as in the case
//           of breach of policies, the company may decide to terminate the contract with
//           immediate effect.
//         </Typography>

//         {/* ================= COMPENSATION ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
//           Compensation Structure:
//         </Typography>

//         <Typography sx={TEXT}>
//           Compensation is strictly confidential between the employee and the employer.
//           It has been determined based on various factors such as employee job, skills,
//           specific background and professional merit. This information and any changes
//           therein should be treated as personal and confidential.
//         </Typography>

//         {/* ================= PAGE 2 : SALARY (Merged) ================= */}
//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           <b>Name : {candidateName}</b>
//           <span style={{ marginLeft: "120px" }}>
//             <b>Designation :{position}</b>
//           </span>
//         </Typography>

//         <TableContainer sx={{ mb: "4mm" }}>
//           <Table
//             size="small"
//             sx={{
//               border: "1px solid #333",       // 🔽 thinner outer border
//               borderCollapse: "collapse",
//               width: "100%",
//               color: "#ffff !important",
//             }}
//           >
//             <TableHead>
//               <TableRow sx={{
//                 backgroundColor: "#000 !important",
//                 "& th": {
//                   color: "#fff !important",
//                   fontWeight: 600,
//                   fontSize: "10pt",
//                   border: "1px solid #333",
//                   py: "0.4mm",
//                 },
//               }}>
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

//               {salaryComponents.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell
//                     sx={{
//                       border: "1px solid #333",
//                       fontSize: "9.75pt",       // 🔽 smaller body text
//                       py: "0.35mm",             // 🔽 tight rows
//                     }}
//                   >
//                     {row.name}
//                   </TableCell>

//                   <TableCell
//                     align="center"
//                     sx={{
//                       border: "1px solid #333",
//                       fontSize: "9.75pt",
//                       py: "0.35mm",
//                     }}
//                   >
//                     {formatCurrency(row.monthly)}
//                   </TableCell>

//                   <TableCell
//                     align="center"
//                     sx={{
//                       border: "1px solid #333",
//                       fontSize: "9.75pt",
//                       py: "0.35mm",
//                     }}
//                   >
//                     {formatCurrency(row.annual)}
//                   </TableCell>
//                 </TableRow>
//               ))}

//               {/* Totals Row */}
//               <TableRow sx={{
//                 backgroundColor: "#000 !important",
//                 "& td": {
//                   color: "#fff !important",
//                   fontWeight: 600,
//                   fontSize: "10pt",
//                   border: "1px solid #333",
//                   py: "0.4mm",
//                 },
//               }}>
//                 <TableCell
//                   sx={{
//                     fontWeight: 600,
//                     border: "1px solid #333",
//                     fontSize: "10pt",
//                     py: "0.4mm",
//                     // color: "#fff !important",
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
//                     // color: "#fff !important",
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
//                     // color: "#fff !important",
//                   }}
//                 >
//                   {formatCurrency(totalAnnual)}
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </A4Layout>

//       {/* ================= PAGE 2 ================= */}
//       <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
//         {/* ================= RETENTION BONUS ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold", mt: 3, mb: 1 }}>
//           Niche Skill Retention Bonus:
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           You would be eligible for retention bonus. You will receive 48% of Annual
//           earnings of your salary other than special and statutory benefits for each
//           year. This amount is payable subject to completion of 42 Months at JDIT.
//           Please note, this amount is not payable in case of project ramp down or
//           closure, contract completion, termination due to code of conduct or for
//           what so ever is the reason. It is Mandatory to be on project and billable
//           at the time payout after 42 months completion at People Prime.
//         </Typography>

//         {/* ================= BACKGROUND CHECK ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
//           Background Check:
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           The company reserves the right to verify the information furnished by you
//           in your application for employment and through other documents. If it is
//           found that you have misrepresented any information in your application for
//           employment or have furnished any false information or have concealed /
//           suppressed any relevant facts, your services are liable to be terminated
//           any time, without any notice or compensation in lieu thereof. If the client
//           is asking for the BGV report of the deployed resource then, charges may be
//           applicable for BGV Process and will be deducted from your salary in the
//           preceding month. Report will be shared with you for your reference post
//           completion of BGV.
//         </Typography>

//         {/* ================= NOTE ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
//           Note:
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           During the first month of your employment with JDIT, an amount of Rs.750
//           will be deducted towards Administrative expense for Statutory Compliance.
//         </Typography>

//         {/* ================= STATUTORY BENEFITS ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 2 }}>
//           Statutory Benefits:
//         </Typography>

//         <Typography sx={{ ...TEXT }}>
//           You will be governed as per the respective acts of Gratuity as per the rules
//           in force, from time to time.
//         </Typography>

//         {/* ================= PAYMENT OF SALARY ================= */}
//         <Typography sx={{ ...TEXT, }}>
//           Payment of Salary:
//         </Typography>



//       </A4Layout>

//       {/* ================= PAGE 3 : SIGNATURE ================= */}
//       <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>

//         {/* ================= PAYMENT OF SALARY ================= */}

//         <Typography sx={{ ...TEXT }}>
//           a) The employee shall be paid his/her salary on the date specified in the
//           main details of this agreement. JDIT shall not be responsible for any
//           delays in payment of salary of the employee caused by his or her late
//           submission of time sheet. For prompt and accurate payment of salary, the
//           contract employee should keep JDIT informed about all payments due to
//           him/her.
//         </Typography>

//         <Typography sx={{ ...TEXT }}>
//           b) It is agreed by the employee, that this present engagement on contract
//           shall be co-terminus with Terms of Business/Main Contract between JDIT and
//           its Client where being placed in terms of this engagement. In case, same
//           is determined before the expiration of Contract period on any account
//           whatsoever, in that eventuality the services of employee shall also come
//           to an end immediately. The employee has understood in clear terms that
//           tenure of its contract for employment is dependent upon the tenure of the
//           agreement executed between JDIT and Client/Organization/Institution/Entity.
//         </Typography>

//         {/* ================= JOB ROLES ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
//           Job Roles & Responsibilities:
//         </Typography>

//         <Typography sx={{ ...TEXT }}>
//           You shall be responsible for the performance of the functions expected as{" "}
//           <b>{position}</b> and any additional functions and duties that may be
//           assigned to you in connection with the business and operations of the
//           client Company. You shall use the best of your efforts to promote,
//           develop and extend the business of the Company and comply with the
//           directions and regulations of the Company at all times, and in all
//           respects.
//         </Typography>

//         {/* ================= TERMINATION ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
//           Termination of Employment:
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 1 }}>
//           In the event that the employee decides to terminate his or her employment
//           under this agreement with JDIT, he or she shall be required to give notice
//           in writing. Failing to serve notice period as per policy, company can
//           initiate legal proceedings against you. Salary in lieu of notice in
//           accordance with the notice period specified in the main details of this
//           agreement shall be acceptable only at management’s discretion. The client
//           may also terminate the employment with or without notice for any business
//           reasons. JDIT reserves its right to terminate this agreement forthwith
//           without notice or payment in lieu of notice in cases of poor performance,
//           neglect of duty, misconduct, conduct not beneficial to the interests of
//           JDIT or the Client.
//         </Typography>

//         {/* ================= LEAVE POLICY ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
//           Leave Policy:
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 1 }}>
//           Each Personnel are entitled for total 12 days’ annual leaves. The
//           Personnel shall not be entitled for any advance paid leave. These paid
//           leaves cannot be carrying forwarded to month on month and year on year
//           and there shall not be any leave encashment. You shall be entitled to
//           avail only one leave per month and only with prior approval from your
//           Manager. If you avail more than one day in a month, then that would be
//           loss of pay. Pre-approved leave from your manager at the client’s place
//           is only a sanction of leave and does not entitle you to paid leave beyond
//           the stipulated eligible leaves.
//         </Typography>

//         {/* ================= FULL & FINAL ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
//           Full & Final Settlement:
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 1 }}>
//           In case of employees who have resigned from JDIT or Converted to fulltime
//           or Termination from client, their Full & final settlement would be made
//           after 60 days from their last working day with JDIT on receipt of
//           approved time sheet and all tax-related documents.
//         </Typography>



//       </A4Layout>




//       {/* ================= PAGE 4 : SIGNATURE ================= */}


//       <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>

//         {/* ================= ABSENTEEISM ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
//           Absenteeism from Work:
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           Should the employee fail to report for work for more than one (1) day(s)
//           without justifiable reasons, the contract employee’s employment shall be
//           deemed to be terminated forthwith by the Employee himself/ herself and
//           the Employee shall be deemed to be relieved automatically except for any
//           saving by law. Further if any Employee stays absent from work without
//           proper permission/sanction or there being leave due to his credit and / or
//           overstays his leave the same will render the Employee liable for legal
//           action and damages also.
//         </Typography>

//         {/* ================= NO SHOW ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
//           No-Show:
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           Failure to report at the specified office on{" "}
//           <b>{formatDate(joiningDate)}</b> shall be deemed as “No-Show”. In such an
//           event, the offer stands cancelled, and you shall be liable to pay one
//           month’s salary as penalty to the company for the loss suffered by the
//           company.
//         </Typography>

//         {/* ================= EXTENSION ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
//           Extension of Contract:
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           The employee shall remain on Contract, unless his services are confirmed
//           in writing by the client group.
//         </Typography>

//         {/* ================= DECLARATION ================= */}
//         <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
//           DECLARATION:
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           This is to confirm that the documents and information provided by me to
//           the Company for the purpose of my services are true and accurate to the
//           best of my knowledge and belief.
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           I also agree that the various terms and conditions set forth in this
//           Agreement are fair, just and reasonable and I shall strictly adhere to
//           the terms specified.
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           I will at all times follow the rules at regulations at the client’s
//           organizations. I will keep all client information/data confidential. I
//           will be solely responsible for any loss/damages that may arise as a
//           result of my actions.
//         </Typography>

//         {/* ================= SIGNATURE SECTION ================= */}
//         <Box sx={{ mt: 5, mb: 3 }}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "flex-start",
//             }}
//           >
//             {/* ================= LEFT COLUMN ================= */}
//             <Box>
//               <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 3 }}>
//                 Employee Signature: ______________________
//               </Typography>
//               <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
//                 Employee Full Name: {candidateName}
//               </Typography>
//             </Box>

//             {/* ================= RIGHT COLUMN ================= */}
//             <Box>
//               <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 3 }}>
//                 Place: _____________________
//               </Typography>
//               <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
//                 Date: _____________________
//               </Typography>
//             </Box>
//           </Box>
//         </Box>

//         <Box sx={{ mt: 5 }}>
//           <Typography sx={{ ...TEXT, mb: 1 }}>
//             For <b>JDIT SOFTWARE SOLUTIONS PVT. LTD.</b>
//           </Typography>

//           {/* SIGNATURE & STAMP */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 2,
//               mb: 2,
//             }}
//           >
//             {company.signature && (
//               <img
//                 src={company.signature}
//                 alt="Signature"
//                 style={{ height: "60px" }}
//               />
//             )}
//             {company.stamp && (
//               <img
//                 src={company.stamp}
//                 alt="Stamp"
//                 style={{ height: "80px" }}
//               />
//             )}
//           </Box>

//           <Box>
//             <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
//               {signatoryName}
//             </Typography>
//             <Typography sx={{ ...TEXT }}>
//               {signatoryDesignation}
//             </Typography>
//           </Box>
//           <Typography sx={{ ...TEXT, mt: 1 }}>
//             <b>{company.hrName}</b>
//           </Typography>
//           <Typography sx={{ ...TEXT }}>
//             <b>HR Department Lead</b>
//           </Typography>
//         </Box>

//       </A4Layout>

//     </>
//   );
// };

// export default JDITOffer;



// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   TableHead,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-US", {
//         month: "long",
//         day: "2-digit",
//         year: "numeric",
//       })
//     : "";

// /* ================= COMMON TEXT STYLE ================= */
// const TEXT = {
//   fontFamily: "Times New Roman, serif",
//   fontSize: "14px",
//   lineHeight: 1.8,
//   color: "#000",
// };

// /* ================= TABLE CELL STYLE ================= */
// const CELL = {
//   border: "1px solid #000",
//   padding: "6px 8px",
//   fontSize: "14px",
//   fontFamily: "Times New Roman, serif",
// };

// /* ================= MAIN COMPONENT ================= */
// const JDITIncrement = ({ company, data }) => {
//   if (!company || !data) return null;
//   console.log("companyname", company.header);

//   const {
//     issueDate = "",
//     employeeName = "",
//     employeeId = "",
//     effectiveDate = "",
//     newCTC = "",
//     signatoryName = "",
//     signatoryDesignation = "",
//     salaryComponents = [],
//   } = data;

//   const firstName = employeeName.split(" ")[0] || "";

//   /* ================= CALCULATIONS ================= */
//   const monthlyGross = salaryComponents.reduce(
//     (sum, item) => sum + Number(item.monthly || 0),
//     0
//   );

//   const annualCTC = salaryComponents.reduce(
//     (sum, item) => sum + Number(item.annual || 0),
//     0
//   );

//   return (
//     <A4Layout
//       headerSrc={company.header}
//       footerSrc={company.footer}
//       watermarkSrc={company.watermarkImage}
//     >
//       {/* ================= ISSUE DATE ================= */}
//       <Typography align="right" sx={{ ...TEXT, mb: 5 }}>
//         {formatDate(issueDate)}
//       </Typography>

//       {/* ================= GREETING ================= */}
//       <Typography sx={{ ...TEXT, mb: 4 }}>
//         Dear {firstName},
//       </Typography>

//       {/* ================= BODY ================= */}
//       <Typography sx={{ ...TEXT, mb: 5, textAlign: "justify" }}>
//         We are delighted to inform you that in recognition of your exceptional
//         performance and dedication, your salary has been increased. Your new
//         annual salary will be <b>{newCTC}</b>, per annum effective from{" "}
//         <b>{formatDate(effectiveDate)}</b>.
//       </Typography>

//       <Typography sx={{ ...TEXT, mb: 7 }}>
//         Thank you for your hard work and dedication. We sincerely appreciate your
//         hard work and look forward to your continued contributions to our team.
//       </Typography>

//       {/* ================= SIGNATURE ================= */}
//       <Box sx={{ mt: 10 }}>
//         <Typography sx={{ ...TEXT, mb: 2 }}>Best Regards,</Typography>
//         <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
//           {signatoryName}
//         </Typography>
//         <Typography sx={{ ...TEXT }}>
//           {signatoryDesignation}
//         </Typography>
//       </Box>

//       {/* ================= PAGE BREAK ================= */}
//       <Box sx={{ pageBreakBefore: "always" }} />

//       {/* ================= SALARY ANNEXURE ================= */}
//       <Typography
//         align="center"
//         sx={{ ...TEXT, fontWeight: "bold", mt: 4, mb: 5 }}
//       >
//         Salary Annexure
//       </Typography>

//       {/* ================= EMPLOYEE DETAILS ================= */}
//       <Box sx={{ ...TEXT, mb: 5 }}>
//         <Typography>Employee Code : {employeeId}</Typography>
//         <Typography>Employee Name : {employeeName}</Typography>
//         <Typography>
//           Effective Date : {formatDate(effectiveDate)}
//         </Typography>
//       </Box>

//       {/* ================= SALARY TABLE ================= */}
//       <Table sx={{ borderCollapse: "collapse", mb: 5 }}>
//         <TableHead>
//           <TableRow>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
//               Monthly Component
//             </TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
//               Amount (Rs.)
//             </TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
//               Yearly Component
//             </TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
//               Amount (Rs.)
//             </TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {salaryComponents.map((item, index) => (
//             <TableRow key={index}>
//               <TableCell sx={CELL}>{item.label}</TableCell>
//               <TableCell sx={CELL} align="right">
//                 {item.monthly}
//               </TableCell>
//               <TableCell sx={CELL}>{item.label}</TableCell>
//               <TableCell sx={CELL} align="right">
//                 {item.annual}
//               </TableCell>
//             </TableRow>
//           ))}

//           <TableRow>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
//               Monthly Gross
//             </TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
//               {monthlyGross}
//             </TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
//               Annual CTC
//             </TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
//               {annualCTC}
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>

//       {/* ================= CONFIDENTIAL NOTE ================= */}
//       <Typography sx={{ ...TEXT, fontSize: "13px", mt: 4 }}>
//         Please note that the details in this communication are confidential and
//         you are requested not to share the same with others.
//       </Typography>
//     </A4Layout>
//   );
// };

// export default JDITIncrement;


// import React, { useMemo } from "react";
// import {
//   Typography,
//   Box,
//   Table,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableHead,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";

// /* ================= SALARY UTILITIES ================= */
// import {
//   generateOfferLetterComponents,
//   formatCurrency,
//   numberToWords,
// } from "../../../../utils/salaryCalculations";

// export default function JDITIncrement({ company, data }) {
//   const {
//     candidateName = "",
//     address = "",
//     position = "",
//     joiningDate = "",
//     salary = 0,
//   } = data || {};

//   const firstName = candidateName.split(" ")[0] || "";

//   const formattedJoiningDate = joiningDate
//     ? new Date(joiningDate).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     })
//     : "";

//   /* ================= SALARY ================= */
//   const salaryComponents = useMemo(
//     () => generateOfferLetterComponents(salary),
//     [salary]
//   );

//   const totalAnnual = Number(salary) || 0;
//   const totalMonthly = Math.round(totalAnnual / 12);
//   const salaryInWords = numberToWords(totalAnnual);

//   /* ================= TYPOGRAPHY ================= */
//   const baseText = {
//     fontFamily: "Verdana, Geneva, sans-serif",
//     fontSize: "14px",
//     lineHeight: 1.8,
//     color: "#000",
//   };

//   const para = { ...baseText, mt: "12px" };
//   const paraLarge = { ...baseText, mt: "24px" };

//   const labelStyle = {
//     display: "inline-block",
//     width: "110px",
//   };

//   /* ================= TABLE STYLES ================= */
//   const tableCell = {
//     fontFamily: "Verdana, Geneva, sans-serif",
//     fontSize: "13px",
//     lineHeight: 1.4,
//     border: "1px solid #000",
//     padding: "4px 6px",
//   };

//   const tableHeader = {
//     ...tableCell,
//     backgroundColor: "#32a1c2ff",
//     color: "#fff",
//     fontWeight: "bold",
//   };

//   const tableTotal = {
//     ...tableCell,
//     backgroundColor: "#32a1c2ff",
//     color: "#fff",
//     fontWeight: "bold",
//   };
//   const TEXT = {
//   fontFamily: "Verdana, Geneva, sans-serif",
//   fontSize: "14px",
//   lineHeight: 1.8,
//   color: "#000",
// };
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "long",
//         year: "numeric",
//       })
//     : "";


//   return (
//     <>
//       {/* ================= PAGE 1 ================= */}
//       <A4Layout company={company}>
//         <Box sx={baseText}>
//           {/* DATE */}
//           <Typography sx={{ textAlign: "right" }}>
//             {new Date(data.issueDate).toLocaleDateString("en-IN", {
//               day: "2-digit",
//               month: "long",
//               year: "numeric",
//             })}
//           </Typography>

//           {/* GREETING */}
//           <Typography sx={{ mt: "40px" }}>
//             Dear {data.employeeName},
//           </Typography>

//           {/* INCREMENT CONTENT */}
//           <Typography sx={{ mt: "24px" }}>
//             We are delighted to inform you that in recognition of your exceptional
//             performance and dedication, your salary has been increased.

//             Your new annual salary will be{" "}
//             <b>Rs. {formatCurrency(data.currentCTC)}</b> ({salaryInWords}), per annum
//             effective from{" "}
//             <b>
//               {new Date(data.issueDate).toLocaleDateString("en-IN", {
//                 day: "2-digit",
//                 month: "long",
//                 year: "numeric",
//               })}
//             </b>.
//           </Typography>

//           <Typography sx={{ mt: "24px" }}>
//             Thank you for your hard work and dedication. We sincerely appreciate your
//             efforts and look forward to your continued contributions to our team.
//           </Typography>

//           {/* CLOSING */}
//           <Typography sx={{ mt: "40px" }}>
//             Best Regards,
//           </Typography>

//           <Typography>
//             <b>{company.hrName}</b>
//           </Typography>




//         </Box>


//         {/* SIGNATURE & STAMP – PAGE 1 */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
//           <Box>
//             <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
//               {company.signature && (
//                 <Box component="img" src={company.signature} sx={{ height: "40px" }} />
//               )}
//               {company.stamp && (
//                 <Box component="img" src={company.stamp} sx={{ height: "60px" }} />
//               )}
//             </Box>

//             <Typography><b>CEO & Managing Director</b></Typography>
//           </Box>

//           <Box sx={{ width: "45%", mt: 8 }}>
//             <Typography>Signature : ___________________</Typography>
//             <Typography>Candidate Name : {candidateName}</Typography>
//           </Box>
//         </Box>


//         {/* </Box> */}
//       </A4Layout >

//       {/* ================= PAGE 2 (SALARY STRUCTURE + SIGNATURE) ================= */}
//       <A4Layout
//         headerSrc={company.headerImage}
//         footerSrc={company.footerImage}

//       >
//         <Typography align="center" sx={{ ...TEXT, mb: 4, fontWeight: "bold" }}>
//           Salary Annexure
//         </Typography>

//         {/* Employee Info */}
//         <Box sx={{ mb: 3 }}>
//           <Typography sx={TEXT}>
//             <b>Employee Code</b> : {data.employeeId}
//           </Typography>
//           <Typography sx={TEXT}>
//             <b>Employee Name</b> : {data.employeeName}
//           </Typography>
//           <Typography sx={TEXT}>
//             <b>Effective Date</b> : {formatDate(effectiveDate)}
//           </Typography>
//         </Box>

//         {/* Salary Comparison Table */}
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
//               <TableRow sx={{ backgroundColor: 'lightblue' }}>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Monthly Component</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount (₹)</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Yearly Component</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount (₹)</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell>Basic</TableCell>
//                 <TableCell align="center">{formatCurrency(basicMonthly)}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">{formatCurrency(basicAnnual)}</TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>House Rent Allowance (HRA)</TableCell>
//                 <TableCell align="center">{formatCurrency(hraMonthly)}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">{formatCurrency(hraAnnual)}</TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>Conveyance Allowance</TableCell>
//                 <TableCell align="center">{formatCurrency(conveyanceMonthly)}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">{formatCurrency(conveyanceAnnual)}</TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>Medical Allowance</TableCell>
//                 <TableCell align="center">{formatCurrency(medicMonthly)}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">{formatCurrency(medicAnnual)}</TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>Special Allowance</TableCell>
//                 <TableCell align="center">{formatCurrency(specialMonthly)}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">{formatCurrency(specialAnnual)}</TableCell>
//               </TableRow>

//               {/* Totals */}
//               <TableRow sx={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Monthly Gross</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
//                   {formatCurrency(
//                     basicMonthly +
//                     hraMonthly +
//                     conveyanceMonthly +
//                     medicMonthly +
//                     specialMonthly
//                   )}
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Annual CTC</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
//                   {formatCurrency(newCTC)}
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Typography sx={{ ...TEXT, mt: 4 }}>
//           Please note that the details in this communication are confidential and
//           you are requested not to share the same with others.
//         </Typography>



//         {/* SIGNATURE & STAMP – PAGE 2 */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
//           <Box>
//             <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
//               {company.signature && (
//                 <Box component="img" src={company.signature} sx={{ height: "40px" }} />
//               )}
//               {company.stamp && (
//                 <Box component="img" src={company.stamp} sx={{ height: "60px" }} />
//               )}
//             </Box>
//             <Typography>{company.hrName}</Typography>
//             <Typography>HR Department Pune</Typography>
//           </Box>

//           <Box sx={{ width: "45%", mt: 8 }}>
//             <Typography>Signature : ___________________</Typography>
//             <Typography>Candidate Name : {candidateName}</Typography>
//           </Box>
//         </Box>

//     </A4Layout >
//     </>
//   );
// }
// // export default JDITIncrement;

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
// import A4Layout from "../../../layout/A4Page";

// /* ================= SALARY UTILITIES ================= */
// import {
//   generateOfferLetterComponents,
//   formatCurrency,
//   numberToWords,
// } from "../../../../utils/salaryCalculations";

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

//   /* ================= SALARY ================= */
//   const salaryComponents = useMemo(
//     () => generateOfferLetterComponents(newCTC),
//     [newCTC]
//   );

//   const totalAnnual = Number(newCTC) || 0;
//   const totalMonthly = Math.round(totalAnnual / 12);
//   const salaryInWords = numberToWords(totalAnnual);

// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   TableHead,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-US", {
//         month: "long",
//         day: "2-digit",
//         year: "numeric",
//       })
//     : "";

// /* ================= COMMON TEXT STYLE ================= */
// const TEXT = {
//   fontFamily: "Times New Roman, serif",
//   fontSize: "14px",
//   lineHeight: 1.8,
//   color: "#000",
// };

// /* ================= TABLE CELL STYLE ================= */
// const CELL = {
//   border: "1px solid #000",
//   padding: "6px 8px",
//   fontSize: "14px",
//   fontFamily: "Times New Roman, serif",
// };

// /* ================= MAIN COMPONENT ================= */
// const JDITIncrement = ({ company, data }) => {
//   if (!company || !data) return null;
//   console.log("companyname", company.header);

//   const {
//     issueDate = "",
//     employeeName = "",
//     employeeId = "",
//     effectiveDate = "",
//     newCTC = "",
//     signatoryName = "",
//     signatoryDesignation = "",
//     salaryComponents = [],
//   } = data;

//   const firstName = employeeName.split(" ")[0] || "";

//   /* ================= CALCULATIONS ================= */
//   const monthlyGross = salaryComponents.reduce(
//     (sum, item) => sum + Number(item.monthly || 0),
//     0
//   );

//   const annualCTC = salaryComponents.reduce(
//     (sum, item) => sum + Number(item.annual || 0),
//     0
//   );

//   return (
//     <A4Layout
//       headerSrc={company.header}
//       footerSrc={company.footer}
//       watermarkSrc={company.watermarkImage}
//     >
//       {/* ================= ISSUE DATE ================= */}
//       <Typography align="right" sx={{ ...TEXT, mb: 5 }}>
//         {formatDate(issueDate)}
//       </Typography>

//       {/* ================= GREETING ================= */}
//       <Typography sx={{ ...TEXT, mb: 4 }}>
//         Dear {firstName},
//       </Typography>

//       {/* ================= BODY ================= */}
//       <Typography sx={{ ...TEXT, mb: 5, textAlign: "justify" }}>
//         We are delighted to inform you that in recognition of your exceptional
//         performance and dedication, your salary has been increased. Your new
//         annual salary will be <b>{newCTC}</b>, per annum effective from{" "}
//         <b>{formatDate(effectiveDate)}</b>.
//       </Typography>

//       <Typography sx={{ ...TEXT, mb: 7 }}>
//         Thank you for your hard work and dedication. We sincerely appreciate your
//         hard work and look forward to your continued contributions to our team.
//       </Typography>

//       {/* ================= SIGNATURE ================= */}
//       <Box sx={{ mt: 10 }}>
//         <Typography sx={{ ...TEXT, mb: 2 }}>Best Regards,</Typography>
//         <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
//           {signatoryName}
//         </Typography>
//         <Typography sx={{ ...TEXT }}>
//           {signatoryDesignation}
//         </Typography>
//       </Box>

//       {/* ================= PAGE BREAK ================= */}
//       <Box sx={{ pageBreakBefore: "always" }} />

//       {/* ================= SALARY ANNEXURE ================= */}
//       <Typography
//         align="center"
//         sx={{ ...TEXT, fontWeight: "bold", mt: 4, mb: 5 }}
//       >
//         Salary Annexure
//       </Typography>

//       {/* ================= EMPLOYEE DETAILS ================= */}
//       <Box sx={{ ...TEXT, mb: 5 }}>
//         <Typography>Employee Code : {employeeId}</Typography>
//         <Typography>Employee Name : {employeeName}</Typography>
//         <Typography>
//           Effective Date : {formatDate(effectiveDate)}
//         </Typography>
//       </Box>

//       {/* ================= SALARY TABLE ================= */}
//       <Table sx={{ borderCollapse: "collapse", mb: 5 }}>
//         <TableHead>
//           <TableRow>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
//               Monthly Component
//             </TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
//               Amount (Rs.)
//             </TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
//               Yearly Component
//             </TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="center">
//               Amount (Rs.)
//             </TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {salaryComponents.map((item, index) => (
//             <TableRow key={index}>
//               <TableCell sx={CELL}>{item.label}</TableCell>
//               <TableCell sx={CELL} align="right">
//                 {item.monthly}
//               </TableCell>
//               <TableCell sx={CELL}>{item.label}</TableCell>
//               <TableCell sx={CELL} align="right">
//                 {item.annual}
//               </TableCell>
//             </TableRow>
//           ))}

//           <TableRow>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
//               Monthly Gross
//             </TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
//               {monthlyGross}
//             </TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
//               Annual CTC
//             </TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
//               {annualCTC}
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>

//       {/* ================= CONFIDENTIAL NOTE ================= */}
//       <Typography sx={{ ...TEXT, fontSize: "13px", mt: 4 }}>
//         Please note that the details in this communication are confidential and
//         you are requested not to share the same with others.
//       </Typography>
//     </A4Layout>
//   );
// };

// export default JDITIncrement;


// import React, { useMemo } from "react";
// import {
//   Typography,
//   Box,
//   Table,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableHead,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";

// /* ================= SALARY UTILITIES ================= */
// import {
//   generateOfferLetterComponents,
//   formatCurrency,
//   numberToWords,
// } from "../../../../utils/salaryCalculations";

// export default function JDITIncrement({ company, data }) {
//   const {
//     candidateName = "",
//     address = "",
//     position = "",
//     joiningDate = "",
//     salary = 0,
//   } = data || {};

//   const firstName = candidateName.split(" ")[0] || "";

//   const formattedJoiningDate = joiningDate
//     ? new Date(joiningDate).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     })
//     : "";

//   /* ================= SALARY ================= */
//   const salaryComponents = useMemo(
//     () => generateOfferLetterComponents(salary),
//     [salary]
//   );

//   const totalAnnual = Number(salary) || 0;
//   const totalMonthly = Math.round(totalAnnual / 12);
//   const salaryInWords = numberToWords(totalAnnual);

//   /* ================= TYPOGRAPHY ================= */
//   const baseText = {
//     fontFamily: "Verdana, Geneva, sans-serif",
//     fontSize: "14px",
//     lineHeight: 1.8,
//     color: "#000",
//   };

//   const para = { ...baseText, mt: "12px" };
//   const paraLarge = { ...baseText, mt: "24px" };

//   const labelStyle = {
//     display: "inline-block",
//     width: "110px",
//   };

//   /* ================= TABLE STYLES ================= */
//   const tableCell = {
//     fontFamily: "Verdana, Geneva, sans-serif",
//     fontSize: "13px",
//     lineHeight: 1.4,
//     border: "1px solid #000",
//     padding: "4px 6px",
//   };

//   const tableHeader = {
//     ...tableCell,
//     backgroundColor: "#32a1c2ff",
//     color: "#fff",
//     fontWeight: "bold",
//   };

//   const tableTotal = {
//     ...tableCell,
//     backgroundColor: "#32a1c2ff",
//     color: "#fff",
//     fontWeight: "bold",
//   };
//   const TEXT = {
//   fontFamily: "Verdana, Geneva, sans-serif",
//   fontSize: "14px",
//   lineHeight: 1.8,
//   color: "#000",
// };
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "long",
//         year: "numeric",
//       })
//     : "";


//   return (
//     <>
//       {/* ================= PAGE 1 ================= */}
//       <A4Layout company={company}>
//         <Box sx={baseText}>
//           {/* DATE */}
//           <Typography sx={{ textAlign: "right" }}>
//             {new Date(data.issueDate).toLocaleDateString("en-IN", {
//               day: "2-digit",
//               month: "long",
//               year: "numeric",
//             })}
//           </Typography>

//           {/* GREETING */}
//           <Typography sx={{ mt: "40px" }}>
//             Dear {data.employeeName},
//           </Typography>

//           {/* INCREMENT CONTENT */}
//           <Typography sx={{ mt: "24px" }}>
//             We are delighted to inform you that in recognition of your exceptional
//             performance and dedication, your salary has been increased.

//             Your new annual salary will be{" "}
//             <b>Rs. {formatCurrency(data.currentCTC)}</b> ({salaryInWords}), per annum
//             effective from{" "}
//             <b>
//               {new Date(data.issueDate).toLocaleDateString("en-IN", {
//                 day: "2-digit",
//                 month: "long",
//                 year: "numeric",
//               })}
//             </b>.
//           </Typography>

//           <Typography sx={{ mt: "24px" }}>
//             Thank you for your hard work and dedication. We sincerely appreciate your
//             efforts and look forward to your continued contributions to our team.
//           </Typography>

//           {/* CLOSING */}
//           <Typography sx={{ mt: "40px" }}>
//             Best Regards,
//           </Typography>

//           <Typography>
//             <b>{company.hrName}</b>
//           </Typography>




//         </Box>


//         {/* SIGNATURE & STAMP – PAGE 1 */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
//           <Box>
//             <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
//               {company.signature && (
//                 <Box component="img" src={company.signature} sx={{ height: "40px" }} />
//               )}
//               {company.stamp && (
//                 <Box component="img" src={company.stamp} sx={{ height: "60px" }} />
//               )}
//             </Box>

//             <Typography><b>CEO & Managing Director</b></Typography>
//           </Box>

//           <Box sx={{ width: "45%", mt: 8 }}>
//             <Typography>Signature : ___________________</Typography>
//             <Typography>Candidate Name : {candidateName}</Typography>
//           </Box>
//         </Box>


//         {/* </Box> */}
//       </A4Layout >

//       {/* ================= PAGE 2 (SALARY STRUCTURE + SIGNATURE) ================= */}
//       <A4Layout
//         headerSrc={company.headerImage}
//         footerSrc={company.footerImage}

//       >
//         <Typography align="center" sx={{ ...TEXT, mb: 4, fontWeight: "bold" }}>
//           Salary Annexure
//         </Typography>

//         {/* Employee Info */}
//         <Box sx={{ mb: 3 }}>
//           <Typography sx={TEXT}>
//             <b>Employee Code</b> : {data.employeeId}
//           </Typography>
//           <Typography sx={TEXT}>
//             <b>Employee Name</b> : {data.employeeName}
//           </Typography>
//           <Typography sx={TEXT}>
//             <b>Effective Date</b> : {formatDate(effectiveDate)}
//           </Typography>
//         </Box>

//         {/* Salary Comparison Table */}
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
//               <TableRow sx={{ backgroundColor: 'lightblue' }}>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Monthly Component</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount (₹)</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Yearly Component</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>Amount (₹)</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell>Basic</TableCell>
//                 <TableCell align="center">{formatCurrency(basicMonthly)}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">{formatCurrency(basicAnnual)}</TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>House Rent Allowance (HRA)</TableCell>
//                 <TableCell align="center">{formatCurrency(hraMonthly)}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">{formatCurrency(hraAnnual)}</TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>Conveyance Allowance</TableCell>
//                 <TableCell align="center">{formatCurrency(conveyanceMonthly)}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">{formatCurrency(conveyanceAnnual)}</TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>Medical Allowance</TableCell>
//                 <TableCell align="center">{formatCurrency(medicMonthly)}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">{formatCurrency(medicAnnual)}</TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>Special Allowance</TableCell>
//                 <TableCell align="center">{formatCurrency(specialMonthly)}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center">{formatCurrency(specialAnnual)}</TableCell>
//               </TableRow>

//               {/* Totals */}
//               <TableRow sx={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Monthly Gross</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
//                   {formatCurrency(
//                     basicMonthly +
//                     hraMonthly +
//                     conveyanceMonthly +
//                     medicMonthly +
//                     specialMonthly
//                   )}
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Annual CTC</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
//                   {formatCurrency(newCTC)}
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Typography sx={{ ...TEXT, mt: 4 }}>
//           Please note that the details in this communication are confidential and
//           you are requested not to share the same with others.
//         </Typography>



//         {/* SIGNATURE & STAMP – PAGE 2 */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
//           <Box>
//             <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
//               {company.signature && (
//                 <Box component="img" src={company.signature} sx={{ height: "40px" }} />
//               )}
//               {company.stamp && (
//                 <Box component="img" src={company.stamp} sx={{ height: "60px" }} />
//               )}
//             </Box>
//             <Typography>{company.hrName}</Typography>
//             <Typography>HR Department Pune</Typography>
//           </Box>

//           <Box sx={{ width: "45%", mt: 8 }}>
//             <Typography>Signature : ___________________</Typography>
//             <Typography>Candidate Name : {candidateName}</Typography>
//           </Box>
//         </Box>

//     </A4Layout >
//     </>
//   );
// }
// // export default JDITIncrement;

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
  const basicMonthly = round0(monthlyCTC * 0.40);
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);
  const miscMonthly = round0(monthlyCTC * 0.08);

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
  const totalMonthly = round0(
    salaryRows.reduce((sum, row) => sum + row[1], 0)
  );

  const totalAnnual = round0(
    salaryRows.reduce((sum, row) => sum + row[2], 0)
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