// // import React from "react";

// // /* ================= DATE FORMAT ================= */
// // const formatDate = (date) => {
// //   if (!date) return "";
// //   return new Date(date).toLocaleDateString("en-US", {
// //     month: "long",
// //     day: "2-digit",
// //     year: "numeric",
// //   });
// // };

// // const SmartMatrixIncrement = ({ company, data }) => {
// //   if (!company || !data) return null;

// //   return (
// //     <div
// //       className="a4-content-only"
// //       style={{
// //         width: "210mm",
// //         minHeight: "297mm",
// //         position: "relative",
// //         fontFamily: "Bahnschrift, 'Segoe UI', Arial, sans-serif",
// //         fontSize: "12pt",
// //         lineHeight: "1.6",
// //         color: "#000",
// //         backgroundColor: "#fff",
// //         overflow: "hidden",
// //       }}
// //     >
// //       {/* ================= HEADER ================= */}
// //       {company.header && (
// //         <img
// //           src={company.header}
// //           alt="SmartMatrix Header"
// //           style={{ width: "100%", display: "block" }}
// //         />
// //       )}

// //       {/* ================= CONTENT ================= */}
// //       <div
// //         style={{
// //           padding: "22mm 25mm",
// //         }}
// //       >
// //         {/* DATE - RIGHT */}
// //         <p
// //           style={{
// //             textAlign: "right",
// //             marginBottom: "14mm",
// //           }}
// //         >
// //           {formatDate(data.issueDate)}
// //         </p>

// //         {/* GREETING */}
// //         <p style={{ marginBottom: "10mm" }}>Dear {data.employeeName},</p>

// //         {/* BODY PARAGRAPH 1 */}
// //         <p style={{ marginBottom: "8mm", textAlign: "justify" }}>
// //           As part of our periodic salary review process, we have adjusted
// //           compensation across the company to reflect market trends. Effective{" "}
// //           <strong>{formatDate(data.effectiveDate)}</strong>, your salary will be
// //           increased to{" "}
// //           <strong>₹{Number(data.newCTC).toLocaleString("en-IN")}</strong>.
// //         </p>

// //         {/* BODY PARAGRAPH 2 */}
// //         <p style={{ marginBottom: "8mm", textAlign: "justify" }}>
// //           This adjustment ensures that your compensation remains competitive
// //           within the industry and we hope this reflects our commitment to
// //           rewarding your ongoing efforts and contributions to the company.
// //         </p>

// //         {/* BODY PARAGRAPH 3 */}
// //         <p style={{ marginBottom: "16mm", textAlign: "justify" }}>
// //           We appreciate your hard work and dedication and look forward to your
// //           continued success at <strong>{company.name}</strong>.
// //         </p>

// //         {/* COMPANY NAME */}
// //         <p style={{ marginBottom: "18mm" }}>
// //           <strong>{company.name}</strong>
// //         </p>

// //         {/* SIGNATURE BLOCK */}
// //         <div
// //           style={{
// //             marginTop: "20mm",
// //           }}
// //         >
// //           {/* SIGNATURE IMAGE */}
// //           {company.signature && (
// //             <img
// //               src={company.signature}
// //               alt="HR Signature"
// //               style={{
// //                 width: "45mm",
// //                 display: "block",
// //                 marginBottom: "6mm",
// //               }}
// //             />
// //           )}

// //           <p style={{ fontWeight: "bold" }}>
// //             {company.hrName || "Authorized Signatory"}
// //           </p>
// //           <p>Group Leader – HR Services</p>
// //         </div>
// //       </div>

// //       {/* ================= FOOTER ================= */}
// //       {company.footer && (
// //         <img
// //           src={company.footer}
// //           alt="SmartMatrix Footer"
// //           style={{
// //             width: "100%",
// //             position: "absolute",
// //             bottom: 0,
// //             left: 0,
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default SmartMatrixIncrement;



// // import React from "react";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableRow,
// //   Paper,
// // } from "@mui/material";
// // import A4Page from "../../../layout/A4Page";
// // import {
// //   formatCurrency,
// //   getProfessionalTax,
// //   numberToWords,
// // } from "../../../../utils/salaryCalculations";

// // import stampImg from "../../../../assets/images/smartmatrix/smartmatrix_stamp.png";
// // import signImg from "../../../../assets/images/smartmatrix/smartmatrix_signature.png";

// // /* ================= WORD STYLES ================= */
// // const FONT = "Cambria, 'Times New Roman', serif";

// // const cell = {
// //   border: "1px solid #000",
// //   fontFamily: FONT,
// //   fontSize: "10.5pt",
// //   padding: "4px 6px",
// //   verticalAlign: "middle",
// // };

// // const bold = { ...cell, fontWeight: 600 };
// // const centerBold = { ...bold, textAlign: "center" };

// // /* ================================================= */
// // const SmartMatrixSalarySlip = ({ company, data }) => {
// //   if (!company || !data) return null;

// //   /* ===== MONTH ===== */
// //   const salaryMonth = (() => {
// //     if (!data.month) return "";
// //     const [y, m] = data.month.split("-");
// //     return `${new Date(y, m - 1).toLocaleString("default", {
// //       month: "long",
// //     })} ${y}`;
// //   })();

// //   /* ===== CALCULATIONS (UNCHANGED) ===== */
// //   const totalSalary = Number(data.totalSalary || 0);

// //   const basic = totalSalary * 0.4013;
// //   const hra = totalSalary * 0.1798;
// //   const da = totalSalary * 0.1599;
// //   const special = totalSalary * 0.1196;
// //   const misc = totalSalary * 0.1394;

// //   const pt = getProfessionalTax(data.month, totalSalary);
// //   const otherDeduction = Number(data.otherDeduction || 0);

// //   const totalEarnings = basic + hra + da + special + misc;
// //   const totalDeduction = pt + otherDeduction;
// //   const netPay = totalEarnings - totalDeduction;

// //   return (
// //     <A4Page
// //       headerSrc={company.header}
// //       footerSrc={company.footer}
// //       contentTop="45mm"
// //       contentBottom="30mm"
// //       company={company}
// //     >
// //       <TableContainer
// //         component={Paper}
// //         sx={{
// //           border: "1px solid #000",
// //           borderRadius: 0,
// //           boxShadow: "none",
// //           mt: "5mm",
// //         }}
// //       >
// //         <Table size="small">
// //           <TableBody>
// //             {/* ===== HEADER ===== */}
// //             <TableRow>
// //               <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "14pt" }}>
// //                 {company.name}
// //               </TableCell>
// //             </TableRow>

// //             <TableRow>
// //               <TableCell colSpan={4} sx={centerBold}>
// //                 {company.address}
// //               </TableCell>
// //             </TableRow>

// //             <TableRow>
// //               <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "11pt" }}>
// //                 Salary Slip {salaryMonth}
// //               </TableCell>
// //             </TableRow>

// //             {/* ===== EMPLOYEE DETAILS ===== */}
// //             <TableRow>
// //               <TableCell sx={bold}>Employee Name</TableCell>
// //               <TableCell sx={cell}>{data.employeeName}</TableCell>
// //               <TableCell sx={bold}>Employee ID</TableCell>
// //               <TableCell sx={cell}>{data.employeeId}</TableCell>
// //             </TableRow>

// //             <TableRow>
// //               <TableCell sx={bold}>Gender</TableCell>
// //               <TableCell sx={cell}>{data.gender}</TableCell>
// //               <TableCell sx={bold}>Department</TableCell>
// //               <TableCell sx={cell}>{data.department}</TableCell>
// //             </TableRow>

// //             <TableRow>
// //               <TableCell sx={bold}>DOJ</TableCell>
// //               <TableCell sx={cell}>{data.doj}</TableCell>
// //               <TableCell sx={bold}>Pan Number</TableCell>
// //               <TableCell sx={cell}>{data.pan}</TableCell>
// //             </TableRow>

// //             <TableRow>
// //               <TableCell sx={bold}>Designation</TableCell>
// //               <TableCell sx={cell}>{data.designation}</TableCell>
// //               <TableCell sx={bold}>DOB</TableCell>
// //               <TableCell sx={cell}>{data.dob}</TableCell>
// //             </TableRow>

// //             <TableRow>
// //               <TableCell sx={bold}>Mode</TableCell>
// //               <TableCell sx={cell}>
// //                 {data.mode}
// //                 <br />
// //                 {data.accountNo}
// //               </TableCell>
// //               <TableCell sx={bold}>Working days</TableCell>
// //               <TableCell sx={cell}>{data.workdays}</TableCell>
// //             </TableRow>

// //             {/* ===== EARNINGS ===== */}
// //             <TableRow>
// //               <TableCell colSpan={3} sx={centerBold}>
// //                 Earnings
// //               </TableCell>
// //               <TableCell sx={centerBold}>Amount</TableCell>
// //             </TableRow>

// //             {[
// //               ["BASIC", basic],
// //               ["HRA", hra],
// //               ["DEARNESS ALLOWANCE", da],
// //               ["SPECIAL ALLOWANCE", special],
// //               ["MISC. ALLOWANCE", misc],
// //             ].map(([label, value]) => (
// //               <TableRow key={label}>
// //                 <TableCell colSpan={3} sx={cell}>
// //                   {label}
// //                 </TableCell>
// //                 <TableCell sx={{ ...cell, textAlign: "right" }}>
// //                   {formatCurrency(value)}
// //                 </TableCell>
// //               </TableRow>
// //             ))}

// //             <TableRow>
// //               <TableCell
// //                 colSpan={3}
// //                 sx={{ ...centerBold, fontStyle: "italic" }}
// //               >
// //                 Total
// //               </TableCell>
// //               <TableCell sx={{ ...cell, textAlign: "right" }}>
// //                 {formatCurrency(totalEarnings)}
// //               </TableCell>
// //             </TableRow>

// //             {/* ===== DEDUCTIONS ===== */}
// //             <TableRow>
// //               <TableCell colSpan={4} sx={centerBold}>
// //                 Deductions
// //               </TableCell>
// //             </TableRow>

// //             <TableRow>
// //               <TableCell colSpan={3} sx={cell}>
// //                 PT
// //               </TableCell>
// //               <TableCell sx={{ ...cell, textAlign: "right" }}>
// //                 {formatCurrency(pt)}
// //               </TableCell>
// //             </TableRow>

// //             <TableRow>
// //               <TableCell colSpan={3} sx={cell}>
// //                 Other Deduction
// //               </TableCell>
// //               <TableCell sx={{ ...cell, textAlign: "right" }}>
// //                 {formatCurrency(otherDeduction)}
// //               </TableCell>
// //             </TableRow>

// //             <TableRow>
// //               <TableCell
// //                 colSpan={3}
// //                 sx={{ ...centerBold, fontStyle: "italic" }}
// //               >
// //                 Total Deduction
// //               </TableCell>
// //               <TableCell sx={{ ...cell, textAlign: "right" }}>
// //                 {formatCurrency(totalDeduction)}
// //               </TableCell>
// //             </TableRow>

// //             <TableRow>
// //               <TableCell colSpan={3} sx={centerBold}>
// //                 Net Pay
// //               </TableCell>
// //               <TableCell sx={{ ...cell, textAlign: "right" }}>
// //                 {formatCurrency(netPay)}
// //               </TableCell>
// //             </TableRow>

// //             {/* ===== IN WORDS ===== */}
// //             <TableRow>
// //               <TableCell sx={centerBold}>In Words</TableCell>
// //               <TableCell colSpan={3} sx={cell}>
// //                 {numberToWords(netPay)}
// //               </TableCell>
// //             </TableRow>

// //             {/* ===== SIGNATURE ===== */}
// //             <TableRow>
// //               <TableCell align="center" sx={cell}>
// //                 <img src={stampImg} alt="Stamp" width={70} />
// //               </TableCell>
// //               <TableCell colSpan={2} sx={cell}></TableCell>
// //               <TableCell align="center" sx={cell}>
// //                 <img src={signImg} alt="Sign" width={120} />
// //               </TableCell>
// //             </TableRow>
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     </A4Page>
// //   );
// // };

// // export default SmartMatrixSalarySlip;



// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import A4Page from "../../../layout/A4Page";
// import {
//   formatCurrency,
//   getProfessionalTax,
//   numberToWords,
// } from "../../../../utils/salaryCalculations";

// import stampImg from "../../../../assets/images/smartmatrix/smartmatrix_stamp.png";
// import signImg from "../../../../assets/images/smartmatrix/smartmatrix_signature.png";

// /* ================= WORD STYLES ================= */
// const FONT = "Cambria, 'Times New Roman', serif";

// const cell = {
//   border: "1px solid #000",
//   fontFamily: FONT,
//   fontSize: "10.5pt",
//   padding: "4px 6px",
//   verticalAlign: "middle",
// };

// const bold = { ...cell, fontWeight: 600 };
// const centerBold = { ...bold, textAlign: "center" };

// /* ================================================= */
// const SmartMatrixSalarySlip = ({ company, data }) => {
//   if (!company || !data) return null;

//   /* ===== MONTH ===== */
//   const salaryMonth = (() => {
//     if (!data.month) return "";
//     const [y, m] = data.month.split("-");
//     return `${new Date(y, m - 1).toLocaleString("default", {
//       month: "long",
//     })} ${y}`;
//   })();

//   /* ===== CALCULATIONS (UNCHANGED) ===== */
//   const totalSalary = Number(data.totalSalary || 0);

//   const basic = totalSalary * 0.4013;
//   const hra = totalSalary * 0.1798;
//   const da = totalSalary * 0.1599;
//   const special = totalSalary * 0.1196;
//   const misc = totalSalary * 0.1394;

//   const pt = getProfessionalTax(data.month, totalSalary);
//   const otherDeduction = Number(data.otherDeduction || 0);

//   const totalEarnings = basic + hra + da + special + misc;
//   const totalDeduction = pt + otherDeduction;

//   // 🔴 FIX: ensure netPay is always a number
//   const netPay = Number(totalEarnings - totalDeduction) || 0;

//   return (
//     <A4Page
//       headerSrc={company.header}
//       footerSrc={company.footer}
//       contentTop="45mm"
//       contentBottom="30mm"
//       company={company}
//     >
//       <TableContainer
//         component={Paper}
//         sx={{
//           border: "1px solid #000",
//           borderRadius: 0,
//           boxShadow: "none",
//           mt: "5mm",
//         }}
//       >
//         <Table size="small">
//           <TableBody>
//             {/* ===== HEADER ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "14pt" }}>
//                 {company.name}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={4} sx={centerBold}>
//                 {company.address}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "11pt" }}>
//                 Salary Slip {salaryMonth}
//               </TableCell>
//             </TableRow>

//             {/* ===== EMPLOYEE DETAILS ===== */}
//             <TableRow>
//               <TableCell sx={bold}>Employee Name</TableCell>
//               <TableCell sx={cell}>{data.employeeName}</TableCell>
//               <TableCell sx={bold}>Employee ID</TableCell>
//               <TableCell sx={cell}>{data.employeeId}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Gender</TableCell>
//               <TableCell sx={cell}>{data.gender}</TableCell>
//               <TableCell sx={bold}>Department</TableCell>
//               <TableCell sx={cell}>{data.department}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>DOJ</TableCell>
//               <TableCell sx={cell}>{data.doj}</TableCell>
//               <TableCell sx={bold}>Pan Number</TableCell>
//               <TableCell sx={cell}>{data.pan}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Designation</TableCell>
//               <TableCell sx={cell}>{data.designation}</TableCell>
//               <TableCell sx={bold}>DOB</TableCell>
//               <TableCell sx={cell}>{data.dob}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Mode</TableCell>
//               <TableCell sx={cell}>
//                 {data.mode}
//                 <br />
//                 {data.accountNo}
//               </TableCell>
//               <TableCell sx={bold}>Working days</TableCell>
//               <TableCell sx={cell}>{data.workdays}</TableCell>
//             </TableRow>

//             {/* ===== EARNINGS ===== */}
//             <TableRow>
//               <TableCell colSpan={3} sx={centerBold}>
//                 Earnings
//               </TableCell>
//               <TableCell sx={centerBold}>Amount</TableCell>
//             </TableRow>

//             {[
//               ["BASIC", basic],
//               ["HRA", hra],
//               ["DEARNESS ALLOWANCE", da],
//               ["SPECIAL ALLOWANCE", special],
//               ["MISC. ALLOWANCE", misc],
//             ].map(([label, value]) => (
//               <TableRow key={label}>
//                 <TableCell colSpan={3} sx={cell}>
//                   {label}
//                 </TableCell>
//                 <TableCell sx={{ ...cell, textAlign: "right" }}>
//                   {formatCurrency(value)}
//                 </TableCell>
//               </TableRow>
//             ))}

//             <TableRow>
//               <TableCell
//                 colSpan={3}
//                 sx={{ ...centerBold, fontStyle: "italic" }}
//               >
//                 Total
//               </TableCell>
//               <TableCell sx={{ ...cell, textAlign: "right" }}>
//                 {formatCurrency(totalEarnings)}
//               </TableCell>
//             </TableRow>

//             {/* ===== DEDUCTIONS ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={centerBold}>
//                 Deductions
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={cell}>
//                 PT
//               </TableCell>
//               <TableCell sx={{ ...cell, textAlign: "right" }}>
//                 {formatCurrency(pt)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={cell}>
//                 Other Deduction
//               </TableCell>
//               <TableCell sx={{ ...cell, textAlign: "right" }}>
//                 {formatCurrency(otherDeduction)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell
//                 colSpan={3}
//                 sx={{ ...centerBold, fontStyle: "italic" }}
//               >
//                 Total Deduction
//               </TableCell>
//               <TableCell sx={{ ...cell, textAlign: "right" }}>
//                 {formatCurrency(totalDeduction)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={centerBold}>
//                 Net Pay
//               </TableCell>
//               <TableCell sx={{ ...cell, textAlign: "right" }}>
//                 {formatCurrency(netPay)}
//               </TableCell>
//             </TableRow>

//             {/* ===== IN WORDS (FIXED) ===== */}
//             <TableRow>
//               <TableCell sx={centerBold}>In Words</TableCell>
//               <TableCell colSpan={3} sx={cell}>
//                 {netPay > 0 ? numberToWords(Math.round(netPay)) : ""}
//               </TableCell>
//             </TableRow>

//             {/* ===== SIGNATURE ===== */}
//             <TableRow>
//               <TableCell align="center" sx={cell}>
//                 <img src={stampImg} alt="Stamp" width={70} />
//               </TableCell>
//               <TableCell colSpan={2} sx={cell}></TableCell>
//               <TableCell align="center" sx={cell}>
//                 <img src={signImg} alt="Sign" width={120} />
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </A4Page>
//   );
// };

// export default SmartMatrixSalarySlip;













// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";
// import {
//   generateAnnexureSalaryStructure,
//   formatCurrency,
// } from "../../../../utils/salaryCalculations";

// const headerCell = {
//   border: "2px solid #000",
//   fontWeight: "bold",
//   fontSize: "14px",
//   backgroundColor: "#f68b1f",
// };

// const bodyCell = {
//   border: "1px solid #000",
//   fontSize: "13px",
// };

// const totalRow = {
//   backgroundColor: "#f68b1f",
//   fontWeight: "bold",
// };

// const SmartMatrixIncrement = ({ company, data }) => {
//   if (!company || !data) return null;

//   const salaryRows = generateAnnexureSalaryStructure(data.newCTC);

//   return (<>
//     <A4Layout
//       headerSrc={company.headerImage}
//       footerSrc={company.footerImage}
//     ></A4Layout>
//     <A4Layout
//       headerSrc={company.headerImage}
//       footerSrc={company.footerImage}
//     >
//       <Typography
//         align="center"
//         sx={{ fontWeight: "bold", mb: 3, fontSize: "16px" }}
//       >
//         Annexure – Salary Structure
//       </Typography>

//       <TableContainer
//         component={Paper}
//         sx={{
//           width: "100%",
//           border: "0.5px solid #000",
//           borderRadius: "0px",
//           boxShadow: "none",
//         }}
//       >
//         <Table
//           size="small"
//           sx={{
//             width: "100%",
//             borderCollapse: "collapse",
//             tableLayout: "fixed",
//           }}
//         >
//           {/* ================= HEADER ================= */}
//           <TableHead>
//             <TableRow sx={{ height: 42 }}>
//               <TableCell
//                 sx={{
//                   border: "2px solid #000",
//                   backgroundColor: "#f68b1f",
//                   fontWeight: "bold",
//                   fontSize: "15px",
//                   padding: "6px 10px",
//                   width: "55%",
//                 }}
//               >
//                 Salary Components
//               </TableCell>

//               <TableCell
//                 sx={{
//                   border: "2px solid #000",
//                   backgroundColor: "#f68b1f",
//                   fontWeight: "bold",
//                   fontSize: "15px",
//                   textAlign: "center",
//                   padding: "6px",
//                   width: "22.5%",
//                 }}
//               >
//                 Per month (Rs.)
//               </TableCell>

//               <TableCell
//                 sx={{
//                   border: "2px solid #000",
//                   backgroundColor: "#f68b1f",
//                   fontWeight: "bold",
//                   fontSize: "15px",
//                   textAlign: "center",
//                   padding: "6px",
//                   width: "22.5%",
//                 }}
//               >
//                 Per Annum (Rs.)
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           {/* ================= BODY ================= */}
//           <TableBody>
//             <TableRow sx={{ height: 32 }}>
//               <TableCell sx={{ border: "1.5px solid #000" }} />
//               <TableCell sx={{ border: "1.5px solid #000" }} />
//               <TableCell sx={{ border: "1.5px solid #000" }} />
//             </TableRow>
//             {salaryRows.map((row, index) => {
//               const isTotal = row.type === "total";

//               return (
//                 <TableRow
//                   key={index}
//                   sx={{
//                     height: isTotal ? 42 : 34,
//                     backgroundColor: isTotal ? "#f68b1f" : "#fff",
//                   }}
//                 >
//                   <TableCell
//                     sx={{
//                       border: "1.5px solid #000",
//                       fontSize: "14px",
//                       padding: "5px 10px",
//                       fontWeight: isTotal ? "bold" : "normal",
//                     }}
//                   >
//                     {row.label}
//                   </TableCell>

//                   <TableCell
//                     sx={{
//                       border: "1.5px solid #000",
//                       fontSize: "14px",
//                       textAlign: "center",
//                       padding: "5px",
//                       fontWeight: isTotal ? "bold" : "normal",
//                     }}
//                   >
//                     {formatCurrency(row.monthly)}
//                   </TableCell>

//                   <TableCell
//                     sx={{
//                       border: "1.5px solid #000",
//                       fontSize: "14px",
//                       textAlign: "center",
//                       padding: "5px",
//                       fontWeight: isTotal ? "bold" : "normal",
//                     }}
//                   >
//                     {formatCurrency(row.annual)}
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>


//       {/* SIGNATURE */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
//         <Box>
//           <img src={company.signature} alt="Signature" height={50} />
//           <img src={company.stamp} alt="Stamp" height={90} />
//           <Typography fontWeight="bold">{company.hrName}</Typography>
//           <Typography>HR Relations Lead</Typography>
//         </Box>

//         <Box>
//           <Typography>Signature: __________________</Typography>
//           <Typography>Candidate Name: {data.employeeName}</Typography>
//         </Box>
//       </Box>
//     </A4Layout>
//   </>
//   );
// };

// export default SmartMatrixIncrement;









// {/* <A4Layout
//   headerSrc={company.headerImage}
//   footerSrc={company.footerImage}
// ></A4Layout> */}



// import React from "react";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) => {
//   if (!date) return "";
//   return new Date(date).toLocaleDateString("en-US", {
//     month: "long",
//     day: "2-digit",
//     year: "numeric",
//   });
// };

// const SmartMatrixIncrement = ({ company, data }) => {
//   if (!company || !data) return null;

//   return (
//     <div
//       className="a4-content-only"
//       style={{
//         width: "210mm",
//         minHeight: "297mm",
//         position: "relative",
//         fontFamily: "Bahnschrift, 'Segoe UI', Arial, sans-serif",
//         fontSize: "12pt",
//         lineHeight: "1.6",
//         color: "#000",
//         backgroundColor: "#fff",
//         overflow: "hidden",
//       }}
//     >
//       {/* ================= HEADER ================= */}
//       {company.header && (
//         <img
//           src={company.header}
//           alt="SmartMatrix Header"
//           style={{ width: "100%", display: "block" }}
//         />
//       )}

//       {/* ================= CONTENT ================= */}
//       <div
//         style={{
//           padding: "22mm 25mm",
//         }}
//       >
//         {/* DATE - RIGHT */}
//         <p
//           style={{
//             textAlign: "right",
//             marginBottom: "14mm",
//           }}
//         >
//           {formatDate(data.issueDate)}
//         </p>

//         {/* GREETING */}
//         <p style={{ marginBottom: "10mm" }}>Dear {data.employeeName},</p>

//         {/* BODY PARAGRAPH 1 */}
//         <p style={{ marginBottom: "8mm", textAlign: "justify" }}>
//           As part of our periodic salary review process, we have adjusted
//           compensation across the company to reflect market trends. Effective{" "}
//           <strong>{formatDate(data.effectiveDate)}</strong>, your salary will be
//           increased to{" "}
//           <strong>₹{Number(data.newCTC).toLocaleString("en-IN")}</strong>.
//         </p>

//         {/* BODY PARAGRAPH 2 */}
//         <p style={{ marginBottom: "8mm", textAlign: "justify" }}>
//           This adjustment ensures that your compensation remains competitive
//           within the industry and we hope this reflects our commitment to
//           rewarding your ongoing efforts and contributions to the company.
//         </p>

//         {/* BODY PARAGRAPH 3 */}
//         <p style={{ marginBottom: "16mm", textAlign: "justify" }}>
//           We appreciate your hard work and dedication and look forward to your
//           continued success at <strong>{company.name}</strong>.
//         </p>

//         {/* COMPANY NAME */}
//         <p style={{ marginBottom: "18mm" }}>
//           <strong>{company.name}</strong>
//         </p>

//         {/* SIGNATURE BLOCK */}
//         <div
//           style={{
//             marginTop: "20mm",
//           }}
//         >
//           {/* SIGNATURE IMAGE */}
//           {company.signature && (
//             <img
//               src={company.signature}
//               alt="HR Signature"
//               style={{
//                 width: "45mm",
//                 display: "block",
//                 marginBottom: "6mm",
//               }}
//             />
//           )}

//           <p style={{ fontWeight: "bold", marginBottom: "2mm" }}>
//             {company.hrName || "Authorized Signatory"}
//           </p>
//           <p>Group Leader – HR Services</p>
//         </div>
//       </div>

//       {/* ================= FOOTER ================= */}
//       {company.footer && (
//         <img
//           src={company.footer}
//           alt="SmartMatrix Footer"
//           style={{
//             width: "100%",
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default SmartMatrixIncrement;







import React from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import {
  generateAnnexureSalaryStructure,
  formatCurrency,
} from "../../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const SmartMatrixIncrement = ({ company, data }) => {
  if (!company || !data) return null;

  const salaryRows = generateAnnexureSalaryStructure(data.newCTC);

  return (
    <>
      {/* ======================================================
          ================= PAGE 1 : INCREMENT LETTER ==========
          ====================================================== */}
      <A4Layout headerSrc={company.header} footerSrc={company.footer}>
        <Box
          sx={{
            fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            fontSize: "12pt",
            lineHeight: "1.42",
            fontWeight: 800,
            color: "#000",
          }}
        >
          {/* DATE */}
          <Typography
            align="right"
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
              mb: "12mm",
            }}
          >
            {formatDate(data.issueDate)}
          </Typography>

          {/* GREETING */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              mb: "8mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            Dear {data.employeeName},
          </Typography>

          {/* PARAGRAPH 1 */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              textAlign: "justify",
              mb: "6mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            As part of our periodic salary review process, we have adjusted
            compensation across the company to reflect market trends. Effective{" "}
            {formatDate(data.effectiveDate)}, your salary will be increased to{" "}
            {Number(data.newCTC).toLocaleString("en-IN")}.
          </Typography>

          {/* PARAGRAPH 2 */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              textAlign: "justify",
              mb: "6mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            This adjustment ensures that your compensation remains competitive
            within the industry and we hope this reflects our commitment to
            rewarding your ongoing efforts and contributions to the company.
          </Typography>

          {/* PARAGRAPH 3 */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 500,
              textAlign: "justify",
              mb: "20mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            We appreciate your hard work and dedication and look forward to your
            continued success at {company.name}.
          </Typography>

          {/* COMPANY NAME (BOLD IN WORD) */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 600,
              mb: "18mm",
              fontFamily: "Verdana",
            }}
          >
            <strong>{company.name}</strong>
          </Typography>

          {/* STAMP + SIGNATURE */}
          <Box sx={{ mt: "4mm" }}>
            {/* STAMP + SIGNATURE SIDE BY SIDE */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: "10mm", // distance between stamp & signature
                mb: "4mm",
              }}
            >
              {/* STAMP */}
              {company.stamp && (
                <img
                  src={company.CEO}
                  alt="Company Stamp"
                  style={{ width: "45mm" }}
                />
              )}

              {/* SIGNATURE */}
              {company.signature && (
                <img
                  src={company.stamp}
                  alt="HR Signature"
                  style={{ width: "38mm" }}
                />
              )}
            </Box>

            {/* HR NAME */}
            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 600,
                fontFamily: '"Verdana","Segoe UI",Arial,sans-serif',
              }}
            >
              <strong>{company.ceoName}</strong>
            </Typography>

            {/* HR TITLE */}
            <Typography
              sx={{
                fontSize: "11pt",
                fontWeight: 400,
                fontFamily: '"Verdana","Segoe UI",Arial,sans-serif',
              }}
            >
              <strong>Group Leader-HR Services</strong>
            </Typography>
          </Box>
        </Box>
      </A4Layout>

      {/* ======================================================
          ================= PAGE 2 : SALARY ANNEXURE ===========
          ====================================================== */}
      <A4Layout headerSrc={company.header} footerSrc={company.footer}>
        <Typography
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 3,
            fontSize: "16px",
            textDecoration: "underline",
          }}
        >
          Salary Annexure
        </Typography>
        <div
          style={{
            marginBottom: "16px",
            fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            fontSize: "12pt",
          }}
        >
          <p>
            <strong>Employee Code :</strong> {data.employeeId}
          </p>
          <p>
            <strong>Employee Name :</strong>{" "}
            {data.candidateName || data.employeeName}
          </p>
          <p>
            <strong>Effective Date :</strong> {formatDate(data.effectiveDate)}
          </p>
        </div>
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            border: "0.5px solid #000",
            borderRadius: 0,
            boxShadow: "none",
          }}
        >
          <Table size="small" sx={{ tableLayout: "fixed" }}>
            {/* TABLE HEADER */}
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    border: "2px solid #000",
                    backgroundColor: "#f68b1f",
                    fontWeight: "bold",
                    fontSize: "15px",
                    width: "55%",
                    fontFamily: "Times New Roman",
                  }}
                >
                  Salary Components
                </TableCell>
                <TableCell
                  sx={{
                    border: "2px solid #000",
                    backgroundColor: "#f68b1f",
                    fontWeight: "bold",
                    fontSize: "15px",
                    textAlign: "center",
                    width: "22.5%",
                  }}
                >
                  Per month (Rs.)
                </TableCell>
                <TableCell
                  sx={{
                    border: "2px solid #000",
                    backgroundColor: "#f68b1f",
                    fontWeight: "bold",
                    fontSize: "15px",
                    textAlign: "center",
                    width: "22.5%",
                  }}
                >
                  Per Annum (Rs.)
                </TableCell>
              </TableRow>
            </TableHead>

            {/* TABLE BODY */}
            <TableBody>
              {salaryRows.map((row, index) => {
                const isTotal = row.type === "total";
                return (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: isTotal ? "#f68b1f" : "#fff",
                    }}
                  >
                    <TableCell
                      sx={{
                        border: "1.5px solid #000",
                        fontWeight: isTotal ? "bold" : "normal",
                        fontSize: "14px",
                      }}
                    >
                      {row.label}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1.5px solid #000",
                        textAlign: "center",
                        fontWeight: isTotal ? "bold" : "normal",
                        fontSize: "14px",
                      }}
                    >
                      {formatCurrency(row.monthly)}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1.5px solid #000",
                        textAlign: "center",
                        fontWeight: isTotal ? "bold" : "normal",
                        fontSize: "14px",
                      }}
                    >
                      {formatCurrency(row.annual)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
        {/* SIGNATURE BLOCK */}
        <Typography
          sx={{
            fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            fontSize: "13pt",
          }}
        >
          Please note that the details in this communication are confidential
          and you are requested not to share the same with others
        </Typography>
      </A4Layout>
    </>
  );
};

export default SmartMatrixIncrement;
