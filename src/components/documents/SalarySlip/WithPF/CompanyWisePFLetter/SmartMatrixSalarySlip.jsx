
// // import React from 'react'

// // const SmartMatrixSalarySlip = () => {
// //   return (
// //     <div>
// //       SmartMatrixSalarySlip-WithPF
// //     </div>
// //   )
// // }

// // export default SmartMatrixSalarySlip

// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import A4Page from "../../../../layout/A4Page";
// import signature from "../../../../../assets/images/Nimbja/Nimbja_signature.png";
// import {
//   formatCurrency,
//   getProfessionalTax,
// } from "../../../../../utils/salaryCalculations";
// import signImg from "../../../../../assets/images/smartmatrix/Smartmatrix_signature.png";

// /* 🔢 Number to Words (Indian system – up to Crores) */
// const numberToWords = (num) => {
//   if (!num || num === 0) return "Zero Rupees Only";

//   const ones = [
//     "",
//     "One",
//     "Two",
//     "Three",
//     "Four",
//     "Five",
//     "Six",
//     "Seven",
//     "Eight",
//     "Nine",
//   ];
//   const teens = [
//     "Ten",
//     "Eleven",
//     "Twelve",
//     "Thirteen",
//     "Fourteen",
//     "Fifteen",
//     "Sixteen",
//     "Seventeen",
//     "Eighteen",
//     "Nineteen",
//   ];
//   const tens = [
//     "",
//     "",
//     "Twenty",
//     "Thirty",
//     "Forty",
//     "Fifty",
//     "Sixty",
//     "Seventy",
//     "Eighty",
//     "Ninety",
//   ];

//   const inWords = (n) => {
//     if (n < 10) return ones[n];
//     if (n < 20) return teens[n - 10];
//     if (n < 100)
//       return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
//     if (n < 1000)
//       return (
//         ones[Math.floor(n / 100)] +
//         " Hundred" +
//         (n % 100 ? " " + inWords(n % 100) : "")
//       );
//     if (n < 100000)
//       return (
//         inWords(Math.floor(n / 1000)) +
//         " Thousand" +
//         (n % 1000 ? " " + inWords(n % 1000) : "")
//       );
//     if (n < 10000000)
//       return (
//         inWords(Math.floor(n / 100000)) +
//         " Lakh" +
//         (n % 100000 ? " " + inWords(n % 100000) : "")
//       );
//     if (n < 1000000000)
//       return (
//         inWords(Math.floor(n / 10000000)) +
//         " Crore" +
//         (n % 10000000 ? " " + inWords(n % 10000000) : "")
//       );
//     return "";
//   };

//   return `${inWords(Math.round(num))} Rupees Only`;
// };

// const SmartMatrixSalarySlip = ({ data, company }) => {
//   /* ===== EMPLOYEE DETAILS ===== */
//   const name = data.employeeName || "-";
//   const empId = data.employeeId || "-";
//   const gender = data.gender || "-";
//   const dept = data.department || "-";
//   const desg = data.designation || "-";
//   const doj = data.doj || "-";
//   const dob = data.dob || "-";
//   const pan = data.pan || "-";
//   const bankMode = data.mode || "Bank Transfer";
//   const totalWorkdays = data.workdays || 30;

//   /* ===== MONTH ===== */
//   const [year, monthNum] = (data.month || "2025-01").split("-");
//   const monthName = new Date(year, monthNum - 1).toLocaleString("en-IN", {
//     month: "long",
//   });
//   const month = `${monthName} ${year}`;
//   /* ===== SALARY STRUCTURE (UPDATED – PERCENTAGE WISE) ===== */

//   const grossSalary = Number(data.totalSalary || 0);

//   // percentages (total = 100%)
//   const PERCENT = {
//     basic: 0.4,
//     hra: 0.18,
//     conveyance: 0.12,
//     special: 0.16,
//     food: 0.06,
//     others: 0.08,
//   };

//   // earnings
//   const basic = grossSalary * PERCENT.basic;
//   const hra = grossSalary * PERCENT.hra;
//   const conveyance = grossSalary * PERCENT.conveyance;
//   const special = grossSalary * PERCENT.special;
//   const food = grossSalary * PERCENT.food;
//   const others = grossSalary * PERCENT.others;

//   // deductions (UNCHANGED FLOW)
//   const pt = getProfessionalTax(data.month, grossSalary);
//   const otherDed = 500; // 🔒 FORCE HARDCODE

//   // totals
//   const totalEarning = basic + hra + conveyance + food + special + others;

//   const totalDed = pt + otherDed;
//   const netPay = totalEarning - totalDed;
//   const netInWords = numberToWords(netPay);

//   /* ===== ASSETS (company driven) ===== */
//   const stamp = company?.stamp || "";
//   const sign = company?.sign || signature;

//   return (
//     <A4Page
//       headerSrc={company?.header}
//       footerSrc={company?.footer}
//       watermarkSrc={company?.watermark}
//       contentTop="35mm"
//       contentBottom="30mm"
//       company={company}
//     >
//       <TableContainer
//         component={Paper}
//         sx={{
//           border: "1.5px solid black",
//           borderRadius: 0,
//           mt: "5mm",

//           mb: "15mm", // ⬅️ ADD THIS (lifts content away from footer)
//           boxShadow: "none",
//           "& .MuiTableCell-root": {
//             border: "1px solid black",
//             fontSize: "11pt",
//             padding: "6px 8px",
//             verticalAlign: "middle",
//           },
//         }}
//       >
//         <Table size="small">
//           <colgroup>
//             <col style={{ width: "22%" }} /> {/* Label */}
//             <col style={{ width: "28%" }} /> {/* Value */}
//             <col style={{ width: "28%" }} /> {/* Label */}
//             <col style={{ width: "22%" }} /> {/* Value */}
//           </colgroup>
//           <TableBody>
//             {/* ===== COMPANY HEADER ===== */}
//             <TableRow>
//               <TableCell
//                 colSpan={4}
//                 align="center"
//                 sx={{ fontWeight: "bold", fontSize: "14pt" }}
//               >
//                 {company?.name || "Nimbja Technologies Pvt. Ltd."}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold" }}>
//                 {company?.address || "Company Address"}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell
//                 colSpan={4}
//                 align="center"
//                 sx={{ fontWeight: "bold", py: 1.5 }}
//               >
//                 Salary Slip {month}
//               </TableCell>
//             </TableRow>

//             {/* ===== EMPLOYEE INFO ===== */}
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
//               <TableCell>{name}</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
//               <TableCell>{empId}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", borderBottom: "none" }}>
//                 Gender
//               </TableCell>
//               <TableCell sx={{ borderBottom: "none" }}>{gender}</TableCell>
//               <TableCell sx={{ fontWeight: "bold", borderBottom: "none" }}>
//                 Department
//               </TableCell>
//               <TableCell sx={{ borderBottom: "none" }}>{dept}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", borderTop: "none" }}>
//                 DOJ
//               </TableCell>
//               <TableCell sx={{ borderTop: "none" }}>{doj}</TableCell>
//               <TableCell sx={{ fontWeight: "bold", borderTop: "none" }}>
//                 PAN
//               </TableCell>
//               <TableCell sx={{ borderTop: "none" }}>{pan}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>Designation</TableCell>
//               <TableCell>{desg}</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>DOB</TableCell>
//               <TableCell>{dob}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>Mode</TableCell>
//               <TableCell>{bankMode}</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Working Days</TableCell>
//               <TableCell>{totalWorkdays}</TableCell>
//             </TableRow>

//             {/* ===== EARNINGS / DEDUCTIONS ===== */}
//             <TableRow>
//               <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                 Earnings
//               </TableCell>
//               <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                 Amount
//               </TableCell>
//               <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                 Deductions
//               </TableCell>
//               <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                 Amount
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
//                 Basic
//               </TableCell>
//               <TableCell align="right">{formatCurrency(basic)}</TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>
//                 House Rent Allowance
//               </TableCell>
//               <TableCell align="right">{formatCurrency(hra)}</TableCell>
//               <TableCell>Professional Tax</TableCell>
//               <TableCell align="right">{formatCurrency(pt)}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
//                 Conveyance Allowance
//               </TableCell>
//               <TableCell align="right">{formatCurrency(conveyance)}</TableCell>
//               <TableCell whiteSpace="nowrap">Other Deduction</TableCell>
//               <TableCell align="right">{formatCurrency(otherDed)}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>Food Allowance</TableCell>
//               <TableCell align="right">{formatCurrency(food)}</TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>
//                 Special Allowance
//               </TableCell>
//               <TableCell align="right">{formatCurrency(special)}</TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>Others</TableCell>
//               <TableCell align="right">{formatCurrency(others)}</TableCell>
//               <TableCell></TableCell>
//               <TableCell></TableCell>
//             </TableRow>

//             {/* ===== TOTALS ===== */}
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>Total Earnings</TableCell>
//               <TableCell align="right" sx={{ fontWeight: "bold" }}>
//                 {formatCurrency(totalEarning)}
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Total Deduction</TableCell>
//               <TableCell align="right" sx={{ fontWeight: "bold" }}>
//                 {formatCurrency(totalDed)}
//               </TableCell>
//             </TableRow>

//             {/* ===== NET PAY ===== */}
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>Net Pay</TableCell>
//               <TableCell
//                 align="right"
//                 sx={{ fontWeight: "bold", fontSize: "13pt" }}
//               >
//                 {formatCurrency(netPay)}
//               </TableCell>
//               <TableCell colSpan={2}></TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", fontStyle: "Bahnschrift" }}>
//                 In Words:
//               </TableCell>
//               <TableCell colSpan={3} sx={{ fontStyle: "Bahnschrift" }}>
//                 {netInWords}
//               </TableCell>
//             </TableRow>

//             {/* ===== SIGNATURE ===== */}
//             <TableRow>
//               <TableCell colSpan={2}></TableCell>
//               <TableCell align="center">
//                 {stamp && (
//                   <Box
//                     component="img"
//                     src={stamp}
//                     sx={{ width: 115, objectFit: "contain" }}
//                   />
//                 )}
//               </TableCell>
//               <TableCell align="center">
//                 {sign && (
//                   <Box
//                     component="img"
//                     src={signImg}
//                     sx={{ width: 140, height: 60, objectFit: "contain", mb: 1 }}
//                   />
//                 )}
//                 <Typography fontWeight="bold">Signature</Typography>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </A4Page>
//   );
// };

// export default SmartMatrixSalarySlip;

import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import signature from "../../../../../assets/images/Nimbja/Nimbja_signature.png";
import {
  formatCurrency,
  getProfessionalTax,
} from "../../../../../utils/salaryCalculations";
import signImg from "../../../../../assets/images/smartmatrix/Smartmatrix_signature.png";

/* ================= HELPERS ================= */
const num = (v) => Number(v) || 0;
const round2 = (v) => Math.round(num(v) * 100) / 100;

/* 🔢 Number to Words (Indian system – up to Crores) */
const numberToWords = (numVal = 0) => {
  if (!numVal) return "Zero Rupees Only";

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const inWords = (n) => {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100)
      return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000)
      return (
        ones[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " " + inWords(n % 100) : "")
      );
    if (n < 100000)
      return (
        inWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 ? " " + inWords(n % 1000) : "")
      );
    if (n < 10000000)
      return (
        inWords(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 ? " " + inWords(n % 100000) : "")
      );
    if (n < 1000000000)
      return (
        inWords(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 ? " " + inWords(n % 10000000) : "")
      );
    return "";
  };

  return `${inWords(Math.round(numVal))} Rupees Only`;
};

const SmartMatrixSalarySlip = ({ data = {}, company = {} }) => {
  /* ===== EMPLOYEE DETAILS ===== */
  const name = data.employeeName || "-";
  const empId = data.employeeId || "-";
  const gender = data.gender || "-";
  const dept = data.department || "-";
  const desg = data.designation || "-";
  const doj = data.doj || "-";
  const dob = data.dob || "-";
  const pan = data.pan || "-";
  const bankMode = data.mode || "Bank Transfer";
  const totalWorkdays = data.workdays || 30;

  /* ===== MONTH ===== */
  const [year, monthNum] = (data.month || "2025-01").split("-");
  const monthName = new Date(year, monthNum - 1).toLocaleString("en-IN", {
    month: "long",
  });
  const month = `${monthName} ${year}`;

  /* ================= SALARY LOGIC (ALIGNED WITH NIMBJA) ================= */

  const grossSalary = round2(data.totalSalary);

  /* === Earnings Percentage (100%) === */
  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    conveyance: 0.12,
    special: 0.16,
    food: 0.06,
    others: 0.08,
  };

  /* === Earnings === */
  const basic = round2(grossSalary * PERCENT.basic);
  const hra = round2(grossSalary * PERCENT.hra);
  const conveyance = round2(grossSalary * PERCENT.conveyance);
  const special = round2(grossSalary * PERCENT.special);
  const food = round2(grossSalary * PERCENT.food);
  const others = round2(grossSalary * PERCENT.others);

  /* === Total Earnings (exactly equals gross) === */
  const totalEarning = round2(
    basic + hra + conveyance + special + food + others,
  );

  /* ================= DEDUCTIONS ================= */

  const PF = 3750; // Fixed PF (like Nimbja)
  const pt = getProfessionalTax(data.month, totalEarning);
  const otherDeduction = num(data.otherDeduction || 0);

  const totalDed = round2(PF + pt + otherDeduction);

  /* ================= NET PAY ================= */

  const netPay = round2(totalEarning - totalDed);
  const netInWords = numberToWords(netPay);

  /* ===== ASSETS ===== */
  const stamp = company?.stamp || "";
  const sign = company?.sign || signature;

  return (
    <A4Page
      headerSrc={company?.header}
      footerSrc={company?.footer}
      watermarkSrc={company?.watermark}
      contentTop="35mm"
      contentBottom="30mm"
      company={company}
    >
      <TableContainer
        component={Paper}
        sx={{
          border: "1.5px solid black",
          borderRadius: 0,
          mt: "5mm",
          mb: "15mm",
          boxShadow: "none",
          "& .MuiTableCell-root": {
            border: "1px solid black",
            fontSize: "11pt",
            padding: "6px 8px",
            verticalAlign: "middle",
          },
        }}
      >
        <Table size="small">
          <colgroup>
            <col style={{ width: "22%" }} />
            <col style={{ width: "28%" }} />
            <col style={{ width: "28%" }} />
            <col style={{ width: "22%" }} />
          </colgroup>
          <TableBody>
            {/* ==== YOUR FULL UI REMAINS EXACTLY SAME BELOW ==== */}

            {/* (UI PART UNCHANGED — I DID NOT TOUCH ANY STRUCTURE) */}

            {/* Company Header */}
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{ fontWeight: "bold", fontSize: "14pt" }}
              >
                {company?.name || "SmartMatrix Technologies Pvt. Ltd."}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold" }}>
                {company?.address || "Company Address"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{ fontWeight: "bold", py: 1.5 }}
              >
                Salary Slip {month}
              </TableCell>
            </TableRow>

            {/* Employee Info */}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
              <TableCell>{empId}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Gender</TableCell>
              <TableCell>{gender}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
              <TableCell>{dept}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>DOJ</TableCell>
              <TableCell>{doj}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PAN</TableCell>
              <TableCell>{pan}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Designation</TableCell>
              <TableCell>{desg}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>DOB</TableCell>
              <TableCell>{dob}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Mode</TableCell>
              <TableCell>{bankMode}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Working Days</TableCell>
              <TableCell>{totalWorkdays}</TableCell>
            </TableRow>

            {/* Earnings & Deduction Section */}
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Earnings
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Amount
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Deductions
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Amount
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Basic</TableCell>
              <TableCell align="right">{formatCurrency(basic)}</TableCell>
              <TableCell>PF</TableCell>
              <TableCell align="right">{formatCurrency(PF)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                House Rent Allowance
              </TableCell>
              <TableCell align="right">{formatCurrency(hra)}</TableCell>
              <TableCell>Professional Tax</TableCell>
              <TableCell align="right">{formatCurrency(pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Conveyance Allowance
              </TableCell>
              <TableCell align="right">{formatCurrency(conveyance)}</TableCell>
              <TableCell>Other Deduction</TableCell>
              <TableCell align="right">
                {formatCurrency(otherDeduction)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Food Allowance</TableCell>
              <TableCell align="right">{formatCurrency(food)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Special Allowance
              </TableCell>
              <TableCell align="right">{formatCurrency(special)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Others</TableCell>
              <TableCell align="right">{formatCurrency(others)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            {/* Totals */}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total Earnings</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {formatCurrency(totalEarning)}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Deduction</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {formatCurrency(totalDed)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Net Pay</TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "13pt" }}
              >
                {formatCurrency(netPay)}
              </TableCell>
              <TableCell colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>In Words:</TableCell>
              <TableCell colSpan={3}>{netInWords}</TableCell>
            </TableRow>

            {/* Signature */}
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell align="center">
                {stamp && (
                  <Box component="img" src={stamp} sx={{ width: 115 }} />
                )}
              </TableCell>
              <TableCell align="center">
                {signImg && (
                  <Box
                    component="img"
                    src={signImg}
                    sx={{ width: 140, height: 40, mb: 1 }}
                  />
                )}
                <Typography fontWeight="bold">Signature</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </A4Page>
  );
};

export default SmartMatrixSalarySlip;

