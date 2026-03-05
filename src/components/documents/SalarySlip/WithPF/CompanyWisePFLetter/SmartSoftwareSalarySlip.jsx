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

/* ================= HELPERS ================= */
const num = (v) => Number(v) || 0;
const round2 = (v) => Math.round(num(v) * 100) / 100;

/* ================= NUMBER TO WORDS ================= */
const numberToWords = (numVal = 0) => {
  if (!numVal) return "Zero Rupees Only";

  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six",
    "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const w = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + w(n % 100) : "");
    if (n < 100000) return w(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + w(n % 1000) : "");
    return w(Math.floor(n / 100000)) + " Lakh";
  };

  return `${w(Math.round(numVal))} Rupees Only`;
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
    bankName = "-",
    accountNo = "-",
    month = "-",
    totalSalary = 0,
    otherDeduction = 2000,
  } = data;

  /* ===== MONTH FORMAT ===== */
  const [year, monthNum] = month.split("-");
  const monthName = new Date(year, monthNum - 1).toLocaleString("en-IN", { month: "long" });
  const salaryMonth = `${monthName} ${year}`;

  /* ================= EARNINGS BREAKUP ================= */
  const monthlyGross = round2(totalSalary);

  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.14,
  };

  const BASIC = round2(monthlyGross * PERCENT.basic);
  const HRA = round2(monthlyGross * PERCENT.hra);
  const DA = round2(monthlyGross * PERCENT.da);
  const SPECIAL = round2(monthlyGross * PERCENT.special);
  const FOOD = round2(monthlyGross * PERCENT.food);

  /* ================= DEDUCTIONS ================= */
  const PF = 3750;
  const pt = getProfessionalTax(month, monthlyGross);
  const totalDeduction = round2(PF + pt + Number(otherDeduction || 0));

  /* ================= NET PAY ================= */
  const totalEarning = BASIC + HRA + DA + SPECIAL + FOOD;
  const netPay = round2(totalEarning - totalDeduction);

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid black",
          borderRadius: 0,
          boxShadow: "none",
          "& .MuiTableCell-root": {
            border: "1px solid black",
            padding: "4px 6px",
            fontFamily: "Bahnschrift",
          },
        }}
      >
        <Table
          size="small"
          sx={{
            tableLayout: "fixed",
            width: "100%",
            "& td, & th": {
              width: "25%",
            },
          }}
        >
          <TableBody>

            {/* HEADER */}
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold", fontSize: "14pt" }}>
                SMART SOFTWARE SERVICES (I) PVT. LTD.
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold" }}>
                406 Changbhale Heights, Near Kalpataru Estate Phase III, Pimple Gurav, Pune 411 061
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold" }}>
                Salary Slip {salaryMonth}
              </TableCell>
            </TableRow>

            {/* EMPLOYEE DETAILS */}
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
              <TableCell>DOJ</TableCell>
              <TableCell>{doj}</TableCell>
              <TableCell>PAN</TableCell>
              <TableCell>{pan}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Designation</TableCell>
              <TableCell>{designation}</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>{dob}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Mode</TableCell>
              <TableCell>{mode}</TableCell>
              <TableCell>Working Days</TableCell>
              <TableCell>{workdays}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Account No.</TableCell>
              <TableCell>{accountNo}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            {/* EARNINGS / DEDUCTIONS */}
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Earnings</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Deductions</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Amount</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>BASIC</TableCell>
              <TableCell align="right">{formatCurrency(BASIC)}</TableCell>
              <TableCell>PF</TableCell>
              <TableCell align="right">{formatCurrency(PF)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>HRA</TableCell>
              <TableCell align="right">{formatCurrency(HRA)}</TableCell>
              <TableCell>PT</TableCell>
              <TableCell align="right">{formatCurrency(pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>DEARNESS ALLOWANCE</TableCell>
              <TableCell align="right">{formatCurrency(DA)}</TableCell>
              <TableCell>Other Deduction</TableCell>
              <TableCell align="right">{formatCurrency(otherDeduction)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>SPECIAL ALLOWANCE</TableCell>
              <TableCell align="right">{formatCurrency(SPECIAL)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell>FOOD ALLOWANCE</TableCell>
              <TableCell align="right">{formatCurrency(FOOD)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell>PF</TableCell>
              <TableCell align="right">{formatCurrency(PF)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            {/* TOTAL */}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>{formatCurrency(totalEarning)}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Deduction</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>{formatCurrency(totalDeduction)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Net Pay</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>{formatCurrency(netPay)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>In Words</TableCell>
              <TableCell colSpan={3}>{numberToWords(netPay)}</TableCell>
            </TableRow>

            {/* SIGNATURE */}
            <TableRow>
              <TableCell
                sx={{ border: "1px solid #000", paddingLeft: "150px" }}
              ></TableCell>

              <TableCell
                sx={{ border: "1px solid #000", paddingLeft: "150px" }}
              ></TableCell>
              <TableCell
                sx={{
                  border: "1px solid #000",
                  verticalAlign: "top",
                  padding: "10px",
                  width: "50%",
                  textAlign: "center",
                }}
              >
                {company.stamp && (
                  <img
                    src={company.stamp}
                    alt="Stamp"
                    style={{ height: "100px" }}
                  />
                )}
              </TableCell>

              <TableCell
                sx={{
                  border: "1px solid #000",
                  verticalAlign: "top",
                  padding: "10px",
                  width: "50%",
                }}
              >
                {company.signature && (
                  <img
                    src={company.signature}
                    alt="Signature"
                    style={{ height: "60px", marginBottom: "6px" }}

                  />

                )}
                <Typography textAlign="Center"><b>Signature</b></Typography>

              </TableCell>


            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </A4Page>
  );
};

export default SmartSoftwareSalarySlip;

