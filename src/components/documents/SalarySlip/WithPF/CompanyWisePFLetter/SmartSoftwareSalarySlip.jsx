// // import React, { useMemo } from "react";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableRow,
// //   Typography,
// // } from "@mui/material";
// // import A4Layout from "../../../../layout/A4Page";

// // import {
// //   getProfessionalTax,
// //   numberToWords,
// //   formatCurrency,
// // } from "../../../../../utils/salaryCalculations";

// // /* ================= DATE FORMAT ================= */
// // const formatDate = (date) =>
// //   date
// //     ? new Date(date).toLocaleDateString("en-GB", {
// //         day: "2-digit",
// //         month: "long",
// //         year: "numeric",
// //       })
// //     : "";

// // /* ================= STYLES ================= */
// // const CELL = {
// //   border: "1px solid #000",
// //   padding: "6px",
// //   fontSize: "13px",
// // };

// // /* ================= COMPONENT ================= */
// // const SmartSoftwareSalarySlip= ({ company, data }) => {
// //   if (!company || !data) return null;

// //   const {
// //     month,
// //     employeeName,
// //     employeeId,
// //     gender,
// //     doj,
// //     department,
// //     pan,
// //     designation,
// //     dob,
// //     mode,
// //     accountNo,
// //     workdays,
// //     totalSalary, 
// //    otherDeduction = 2000,
// //   } = data;

// //   /* ================= SALARY CALCULATION (LOCAL) ================= */
// //   const {
// //     basicSalary,
// //     hra,
// //     dearnessAllowance,
// //     foodAllowance,
// //     // miscAllowance,
// //     pf,
// //     professionalTax,
// //     totalDeductions,
// //     netPay,
// //   } = useMemo(() => {
// //     const gross = Number(totalSalary) || 0;

// //     // Calculate earnings components
// //     const basic = Math.round(gross * 0.4);
// //     const hraCalc = Math.round(basic * 0.4);
// //     const da = Math.round(gross * 0.1);
// //     const food = Math.round(gross * 0.1);
// //     // const misc = gross - (basic + hraCalc + da + food);
// //     const PF_DISPLAY = 3750;

// //     const totalEarning = basic + hraCalc + da + food;


// //     // Calculate deductions
// //     const pfCalc = Math.round(basic * 0.12);
// //     const pt = getProfessionalTax(month, gross);
// //     const otherDeduction = 2000;

// //     const deductions = [
// //       { label: "PF", value: pfCalc },
// //       { label: "PT", value: pt },
// //       { label: "Other Deduction", value: otherDeduction },
// //     ];

// //     // Total Deduction including all
// //     const totalDeductions = deductions
// //     .filter(d => d.label === "PT" || d.label === "Other Deduction")
// //     .reduce((sum, d) => sum + (Number(d.value) || 0), 0);

// //     // Net Pay after deducting all



// //     // const net = gross - totalDeductions;

// //      const PF = 3750;

// //       // const OTHER_DEDUCTION = 2000;

// //       /* ================= NET PAY ================= */
// //     const ptn = getProfessionalTax(month, totalEarning);
// //     const totalDeduction = round(PF + ptn + Number(otherDeduction || 0));
// //     const net = round(totalEarning - totalDeduction);


// //     return {
// //       basicSalary: basic,
// //       hra: hraCalc,
// //       dearnessAllowance: da,
// //       foodAllowance: food,
// //       miscAllowance: misc,
// //       pf: pfCalc,
// //       professionalTax: pt,
// //       totalDeductions: totalDeductions,
// //       netPay: net,
// //     };
// //   }, [totalSalary, month]);

// //     const earnings = [
// //       { label:<b> BASIC</b>, value: basicSalary },
// //       { label: <b>HRA</b>, value: hra },
// //       { label: <b>DEARNESS ALLOWANCE</b>, value: dearnessAllowance },
// //       { label: <b>FOOD ALLOWANCE</b>, value: foodAllowance },
// //       { label: <b>PF</b>, value: PF_DISPLAY },
// //     ];

// //     const deductions = [
// //       { label: "PF", value: PF_DISPLAY },
// //       { label: "PT", value: professionalTax },
// //       { label: "Other Deduction", value: 2000 },
// //     ];

// //   // const totalDeductions = deductions.reduce((s, d) => s + d.value, 0);

// //   const formatMonthYear = (month) =>
// //     month
// //       ? new Date(`${month}-01`).toLocaleDateString("en-GB", {
// //           month: "long",
// //           year: "numeric",
// //         })
// //       : "";

// //   /* ================= RENDER ================= */
// //   return (
// //     <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
// //       <Table>
// //         <TableBody>

// //           <TableRow>
// //             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold", fontSize: "16px" }}>
// //               SMART SOFTWARE SERVICES (I) PVT. LTD.
// //             </TableCell>
// //           </TableRow>

// //           <TableRow>
// //             <TableCell
// //               colSpan={4}
// //               sx={{
// //                 ...CELL,
// //                 textAlign: "center",
// //                 fontSize: "13px",
// //               }}
// //             >
// //              <b> 406 Changbhale Heights, Near Kalpataru Estate Phase III, Pimple Gurav, Pune 411 061.</b>
// //             </TableCell>
// //           </TableRow>

// //           <TableRow>
// //             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center" }}>
// //              <b> Salary Slip {formatMonthYear(month)}</b>
// //             </TableCell>
// //           </TableRow>

// //           <TableRow>
// //             <TableCell sx={CELL}><b>Employee Name</b></TableCell>
// //             <TableCell sx={CELL}>{employeeName}</TableCell>
// //             <TableCell sx={CELL}>Employee ID</TableCell>
// //             <TableCell sx={CELL}>{employeeId}</TableCell>
// //           </TableRow>

// //           <TableRow>
// //             <TableCell sx={CELL}><b>Gender <br></br> DOJ</b></TableCell>
// //             <TableCell sx={CELL}>{gender} <br /> {formatDate(doj)}</TableCell>
// //             <TableCell sx={CELL}>Department <br></br> PAN</TableCell>
// //             <TableCell sx={CELL}>{department} <br /> {pan}</TableCell>
// //           </TableRow>

// //           <TableRow>
// //             <TableCell sx={CELL}><b>Designation</b></TableCell>
// //             <TableCell sx={CELL}>{designation}</TableCell>
// //             <TableCell sx={CELL}>DOB</TableCell>
// //             <TableCell sx={CELL}>{dob}</TableCell>
// //           </TableRow>

// //           <TableRow>
// //             <TableCell sx={CELL}><b>Mode</b></TableCell>
// //             <TableCell sx={CELL}>
// //               Bank Name: {mode}<br />
// //               Bank Account No: {accountNo}
// //             </TableCell>
// //             <TableCell sx={CELL}>Working Days</TableCell>
// //             <TableCell sx={CELL}>{workdays}</TableCell>
// //           </TableRow>

// //           {/* SALARY HEADER */}
// //           <TableRow>
// //             <TableCell sx={CELL}><b>Earnings</b></TableCell>
// //             <TableCell sx={CELL}><b>Amount</b></TableCell>
// //             <TableCell sx={CELL}><b>Deductions</b></TableCell>
// //             <TableCell sx={CELL}><b>Amount</b></TableCell>
// //           </TableRow>

// //           {earnings.map((e, i) => (
// //             <TableRow key={i}>
// //               <TableCell sx={CELL}><b>{e.label}</b></TableCell>
// //               <TableCell sx={CELL}>{formatCurrency(e.value)}</TableCell>
// //               <TableCell sx={CELL}>{deductions[i]?.label || ""}</TableCell>
// //               <TableCell sx={CELL}>
// //                 {deductions[i] ? formatCurrency(deductions[i].value) : ""}
// //               </TableCell>
// //             </TableRow>
// //           ))}

// //           <TableRow>
// //             <TableCell sx={CELL}><b>Total</b></TableCell>
// //             <TableCell sx={CELL}>{formatCurrency(totalSalary)}</TableCell>
// //             <TableCell sx={CELL}><b>Total Deduction</b></TableCell>
// //             <TableCell sx={CELL}>{formatCurrency(totalDeductions)}</TableCell>
// //           </TableRow>

// //           <TableRow>
// //             <TableCell sx={CELL}><b>Net Pay</b></TableCell>
// //             <TableCell sx={CELL}>{formatCurrency(netPay)}</TableCell>
// //             <TableCell sx={CELL} />
// //             <TableCell sx={CELL} />
// //           </TableRow>

// //           <TableRow>
// //             <TableCell sx={CELL}><b>In Words</b></TableCell>
// //             <TableCell colSpan={3} sx={CELL}>
// //               {numberToWords(netPay)}
// //             </TableCell>
// //           </TableRow>


// //           <TableRow>
// //             <TableCell
// //               sx={{ border: "1px solid #000", paddingLeft: "150px" }}
// //             ></TableCell>

// //             <TableCell
// //               sx={{ border: "1px solid #000", paddingLeft: "150px" }}
// //             ></TableCell>
// //             <TableCell
// //               sx={{
// //                 border: "1px solid #000",
// //                 verticalAlign: "top",
// //                 padding: "10px",
// //                 width: "50%",
// //                 textAlign: "center",
// //               }}
// //             >
// //               {company.stamp && (
// //                 <img
// //                   src={company.stamp}
// //                   alt="Stamp"
// //                   style={{ height: "100px" }}
// //                 />
// //               )}
// //             </TableCell>

// //             <TableCell
// //               sx={{
// //                 border: "1px solid #000",
// //                 verticalAlign: "top",
// //                 padding: "10px",
// //                 width: "50%",
// //               }}
// //             >
// //               {company.signature && (
// //                 <img
// //                   src={company.signature}
// //                   alt="Signature"
// //                   style={{ height: "60px", marginBottom: "6px" }}

// //                 />

// //               )}
// //               <Typography textAlign="Center"><b>Signature</b></Typography>

// //             </TableCell>


// //           </TableRow>

// //         </TableBody>
// //       </Table>
// //     </A4Layout>
// //   );
// // };

// // export default SmartSoftwareSalarySlip;

// import React, { useMemo } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import A4Layout from "../../../../layout/A4Page";

// import {
//   getProfessionalTax,
//   numberToWords,
//   formatCurrency,
// } from "../../../../../utils/salaryCalculations";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "long",
//         year: "numeric",
//       })
//     : "";

// /* ================= ROUND FUNCTION ================= */
// const round = (num) => Math.round(Number(num) || 0);

// /* ================= STYLES ================= */
// const CELL = {
//   border: "1px solid #000",
//   padding: "6px",
//   fontSize: "13px",
// };

// /* ================= COMPONENT ================= */
// const SmartSoftwareSalarySlip = ({ company, data }) => {
//   if (!company || !data) return null;

//   const {
//     month,
//     employeeName,
//     employeeId,
//     gender,
//     doj,
//     department,
//     pan,
//     designation,
//     dob,
//     mode,
//     accountNo,
//     workdays,
//     totalSalary,
//     otherDeduction = 2000,
//   } = data;

//   /* ================= SALARY CALCULATION ================= */
//   const {
//     basicSalary,
//     hra,
//     dearnessAllowance,
//     foodAllowance,
//     pf,
//     professionalTax,
//     totalDeductions,
//     netPay,
//     earnings,
//     deductions,
//   } = useMemo(() => {
//     const gross = round(totalSalary);

//     /* ===== Earnings Calculation ===== */
//     const basic = round(gross * 0.4);
//     const hraCalc = round(basic * 0.4);
//     const da = round(gross * 0.1);
//     const food = round(gross * 0.1);

//     const totalEarning = basic + hraCalc + da + food;

//     /* ===== Deductions Calculation ===== */
//     const pfCalc = round(basic * 0.12);
//     const pt = getProfessionalTax(month, gross);
//     const other = round(otherDeduction);

//     const totalDeduction = pfCalc + pt + other;
//     const net = totalEarning - totalDeduction;

//     return {
//       basicSalary: basic,
//       hra: hraCalc,
//       dearnessAllowance: da,
//       foodAllowance: food,
//       pf: pfCalc,
//       professionalTax: pt,
//       totalDeductions: totalDeduction,
//       netPay: net,
//       earnings: [
//         { label: "BASIC", value: basic },
//         { label: "HRA", value: hraCalc },
//         { label: "DEARNESS ALLOWANCE", value: da },
//         { label: "FOOD ALLOWANCE", value: food },
//       ],
//       deductions: [
//         { label: "PF", value: pfCalc },
//         { label: "PT", value: pt },
//         { label: "Other Deduction", value: other },
//       ],
//     };
//   }, [totalSalary, month, otherDeduction]);

//   const formatMonthYear = (month) =>
//     month
//       ? new Date(`${month}-01`).toLocaleDateString("en-GB", {
//           month: "long",
//           year: "numeric",
//         })
//       : "";

//   /* ================= RENDER ================= */
//   return (
//     <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
//       <Table>
//         <TableBody>

//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold", fontSize: "16px" }}>
//               SMART SOFTWARE SERVICES (I) PVT. LTD.
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center" }}>
//               <b>406 Changbhale Heights, Near Kalpataru Estate Phase III, Pimple Gurav, Pune 411 061.</b>
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center" }}>
//               <b>Salary Slip {formatMonthYear(month)}</b>
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Employee Name</b></TableCell>
//             <TableCell sx={CELL}>{employeeName}</TableCell>
//             <TableCell sx={CELL}>Employee ID</TableCell>
//             <TableCell sx={CELL}>{employeeId}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Gender <br /> DOJ</b></TableCell>
//             <TableCell sx={CELL}>{gender} <br /> {formatDate(doj)}</TableCell>
//             <TableCell sx={CELL}>Department <br /> PAN</TableCell>
//             <TableCell sx={CELL}>{department} <br /> {pan}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Designation</b></TableCell>
//             <TableCell sx={CELL}>{designation}</TableCell>
//             <TableCell sx={CELL}>DOB</TableCell>
//             <TableCell sx={CELL}>{formatDate(dob)}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Mode</b></TableCell>
//             <TableCell sx={CELL}>
//               Bank Name: {mode}<br />
//               Bank Account No: {accountNo}
//             </TableCell>
//             <TableCell sx={CELL}>Working Days</TableCell>
//             <TableCell sx={CELL}>{workdays}</TableCell>
//           </TableRow>

//           {/* SALARY HEADER */}
//           <TableRow>
//             <TableCell sx={CELL}><b>Earnings</b></TableCell>
//             <TableCell sx={CELL}><b>Amount</b></TableCell>
//             <TableCell sx={CELL}><b>Deductions</b></TableCell>
//             <TableCell sx={CELL}><b>Amount</b></TableCell>
//           </TableRow>

//           {earnings.map((e, i) => (
//             <TableRow key={i}>
//               <TableCell sx={CELL}><b>{e.label}</b></TableCell>
//               <TableCell sx={CELL}>{formatCurrency(e.value)}</TableCell>
//               <TableCell sx={CELL}>{deductions[i]?.label || ""}</TableCell>
//               <TableCell sx={CELL}>
//                 {deductions[i] ? formatCurrency(deductions[i].value) : ""}
//               </TableCell>
//             </TableRow>
//           ))}

//           <TableRow>
//             <TableCell sx={CELL}><b>Total</b></TableCell>
//             <TableCell sx={CELL}>{formatCurrency(basicSalary + hra + dearnessAllowance + foodAllowance)}</TableCell>
//             <TableCell sx={CELL}><b>Total Deduction</b></TableCell>
//             <TableCell sx={CELL}>{formatCurrency(totalDeductions)}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Net Pay</b></TableCell>
//             <TableCell sx={CELL}>{formatCurrency(netPay)}</TableCell>
//             <TableCell sx={CELL} />
//             <TableCell sx={CELL} />
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>In Words</b></TableCell>
//             <TableCell colSpan={3} sx={CELL}>
//               {numberToWords(netPay)}
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={{ border: "1px solid #000" }} />
//             <TableCell sx={{ border: "1px solid #000" }} />
//             <TableCell sx={{ border: "1px solid #000", textAlign: "center" }}>
//               {company.stamp && (
//                 <img src={company.stamp} alt="Stamp" style={{ height: "100px" }} />
//               )}
//             </TableCell>
//             <TableCell sx={{ border: "1px solid #000", textAlign: "center" }}>
//               {company.signature && (
//                 <img src={company.signature} alt="Signature" style={{ height: "60px" }} />
//               )}
//               <Typography textAlign="center"><b>Signature</b></Typography>
//             </TableCell>
//           </TableRow>

//         </TableBody>
//       </Table>
//     </A4Layout>
//   );
// };

// export default SmartSoftwareSalarySlip;

import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { formatCurrency, getProfessionalTax } from "../../../../../utils/salaryCalculations";

/* ================= NUMBER TO WORDS ================= */
const numberToWords = (num = 0) => {
  if (!num) return "Zero Rupees Only";

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const convert = (n) => {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
    if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
    if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
    return convert(Math.floor(n / 10000000)) + " Crore";
  };

  return `${convert(Math.round(num))} Rupees Only`;
};

/* ================= COMPONENT ================= */
const SmartSoftwareSalarySlip = ({ company = {}, data = {} }) => {

  const {
    employeeName = "-",
    employeeId = "-",
    gender = "-",
    department = "-",
    designation = "-",
    doj = "-",
    dob = "-",
    pan = "-",
    mode = "-",
    workdays = "-",
    accountNo = "-",
    month = "-",
    totalSalary = 0,
    otherDeduction = 2000,
  } = data;

  /* ================= MONTH ================= */
  const [year, monthNum] = month ? month.split("-") : ["", ""];
  const monthName = monthNum
    ? new Date(year, monthNum - 1).toLocaleString("en-IN", { month: "long" })
    : "";
  const salaryMonth = monthName && year ? `${monthName} ${year}` : "-";

  /* ================= SALARY LOGIC ================= */
  const round0 = (v) => Math.round(Number(v) || 0);

  const monthlyCTC = round0(totalSalary);

  const PF = 3750;

  const HRA = round0(monthlyCTC * 0.18);
  const DA = round0(monthlyCTC * 0.12);
  const SPECIAL = round0(monthlyCTC * 0.16);
  const FOOD = round0(monthlyCTC * 0.06);

  const BASIC = round0(
    monthlyCTC - (HRA + DA + SPECIAL + FOOD + PF)
  );

  const totalEarning = round0(
    BASIC + HRA + DA + SPECIAL + FOOD + PF
  );

  const pt = month ? getProfessionalTax(month, totalEarning) : 0;

  const totalDeduction = round0(
    PF + pt + Number(otherDeduction || 0)
  );

  const netPay = round0(totalEarning - totalDeduction);

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid black",
          borderRadius: 0,
          boxShadow: "none",

          // ✅ FULL TABLE BORDER
          "& .MuiTableCell-root": {
            border: "1px solid black",
            padding: "6px",
            fontFamily: "Bahnschrift",
          },
        }}
      >
        <Table size="small">
          <TableBody>

            {/* HEADER */}
            <TableRow>
              <TableCell colSpan={4} align="center"><b>SMART SOFTWARE SERVICES (I) PVT. LTD.</b></TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} align="center">
                <b>406 Changbhale Heights, Near Kalpataru Estate Phase III, Pimple Gurav, Pune 411061</b>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} align="center">
                <b>Salary Slip {salaryMonth}</b>
              </TableCell>
            </TableRow>

            {/* DETAILS */}
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>{employeeName}</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>{employeeId}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{gender}</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>{department}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Designation</TableCell>
              <TableCell>{designation}</TableCell>
              <TableCell>PAN</TableCell>
              <TableCell>{pan}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Mode</TableCell>
              <TableCell>{mode}</TableCell>
              <TableCell>Working Days</TableCell>
              <TableCell>{workdays}</TableCell>
            </TableRow>

            {/* HEADER */}
            <TableRow>
              <TableCell align="center"><b>Earnings</b></TableCell>
              <TableCell align="center"><b>Amount</b></TableCell>
              <TableCell align="center"><b>Deductions</b></TableCell>
              <TableCell align="center"><b>Amount</b></TableCell>
            </TableRow>

            {/* ROWS */}
            <TableRow>
              <TableCell>BASIC</TableCell>
              <TableCell align="center">{formatCurrency(BASIC)}</TableCell>
              <TableCell>PF</TableCell>
              <TableCell align="center">{formatCurrency(PF)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>HRA</TableCell>
              <TableCell align="center">{formatCurrency(HRA)}</TableCell>
              <TableCell>PT</TableCell>
              <TableCell align="center">{formatCurrency(pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>DEARNESS ALLOWANCE</TableCell>
              <TableCell align="center">{formatCurrency(DA)}</TableCell>
              <TableCell>Other Deduction</TableCell>
              <TableCell align="center">{formatCurrency(otherDeduction)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>SPECIAL ALLOWANCE</TableCell>
              <TableCell align="center">{formatCurrency(SPECIAL)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell>FOOD ALLOWANCE</TableCell>
              <TableCell align="center">{formatCurrency(FOOD)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            {/* PF ROW */}
            <TableRow>
              <TableCell>PF</TableCell>
              <TableCell align="center">{formatCurrency(PF)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            {/* TOTAL */}
            <TableRow>
              <TableCell><b>Total</b></TableCell>
              <TableCell align="center"><b>{formatCurrency(totalEarning)}</b></TableCell>
              <TableCell><b>Total Deduction</b></TableCell>
              <TableCell align="center"><b>{formatCurrency(totalDeduction)}</b></TableCell>
            </TableRow>

            <TableRow>
              <TableCell><b>Net Pay</b></TableCell>
              <TableCell align="center"><b>{formatCurrency(netPay)}</b></TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell><b>In Words</b></TableCell>
              <TableCell colSpan={3}>{numberToWords(netPay)}</TableCell>
            </TableRow>

            {/* SIGN */}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>

              <TableCell align="center">
                {company?.stamp && (
                  <img
                    src={company.stamp}
                    alt="Stamp"
                    style={{ height: 120 }}
                  />
                )}
              </TableCell>

              <TableCell align="center">
                {company?.signature && (
                  <img
                    src={company.signature}
                    alt="Signature"
                    style={{ height: 80 }}
                  />
                )}
                <Typography><b>Signature</b></Typography>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </A4Page>
  );
};

export default SmartSoftwareSalarySlip;