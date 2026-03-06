// // import React, { useMemo } from "react";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableRow,
// //   Typography,
// //   Box,
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

// // /* ================= STYLES (SLIGHTLY SMALLER) ================= */
// // const CELL = {
// //   border: "1px solid #000",
// //   padding: "4px 5px",
// //   fontSize: "11.5px",
// //   lineHeight: 1.2,
// // };

// // /* ================= COMPONENT ================= */
// // const JDITSalarySlip = ({ company, data }) => {
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
// //   } = data;

// //   /* ================= SALARY CALCULATION ================= */
// //   /* ================= SALARY CALCULATION ================= */
// // const {
// //   basicSalary,
// //   hra,
// //   dearnessAllowance,
// //   foodAllowance,
// //   miscAllowance,
// //   pf,
// //   professionalTax,
// //   totalDeductions,
// //   netPay,
// // } = useMemo(() => {
// //   const gross = Number(totalSalary) || 0;

// //   // Calculate earnings components
// //   const basic = Math.round(gross * 0.4);
// //   const hraCalc = Math.round(basic * 0.4);
// //   const da = Math.round(gross * 0.1);
// //   const food = Math.round(gross * 0.1);
// //   const misc = gross - (basic + hraCalc + da + food);

// //   const PF = 3750;

// //   // Calculate deductions
// //   const pfCalc = PF;
// //   const pt = getProfessionalTax(month, gross);
// //   const otherDeduction = 2000;

// //   const deductions = [
// //     { label: "PF", value: pfCalc },
// //     { label: "PT", value: pt },
// //     { label: "Other Deduction", value: otherDeduction },
// //   ];

// //   // Total Deduction including all
// //   const totalDeductions = deductions
// //   .filter(d => d.label === "PT" || d.label === "Other Deduction")
// //   .reduce((sum, d) => sum + (Number(d.value) || 0), 0);

// //   // Net Pay after deducting all
// //   const net = gross - totalDeductions;

// //   return {
// //     basicSalary: basic,
// //     hra: hraCalc,
// //     dearnessAllowance: da,
// //     foodAllowance: food,
// //     miscAllowance: misc,
// //     pf: pfCalc,
// //     professionalTax: pt,
// //     totalDeductions: totalDeductions,
// //     netPay: net,
// //   };
// // }, [totalSalary, month]);

// //   const earnings = [
// //     { label:<b> BASIC</b>, value: basicSalary },
// //     { label: <b>HRA</b>, value: hra },
// //     { label: <b>DEARNESS ALLOWANCE</b>, value: dearnessAllowance },
// //     { label: <b>FOOD ALLOWANCE</b>, value: foodAllowance },
// //     { label: <b>PF</b>, value: 3750 },
// //   ];

// //   const deductions = [
// //     { label: "PF", value: pf },
// //     { label: "PT", value: professionalTax },
// //     { label: "Other Deduction", value: 2000 },
// //   ];

// //   // const totalDeductions = deductions.reduce((s, d) => s + d.value, 0);

// // // const totalDeductions = deductions
// // //   .filter(d => d.label === "PT" || d.label === "Other Deduction")
// // //   .reduce((sum, d) => sum + (Number(d.value) || 0), 0);


// //   const formatMonthYear = (month) =>
// //     new Date(`${month}-01`).toLocaleDateString("en-GB", {
// //       month: "long",
// //       year: "numeric",
// //     });

// //   /* ================= RENDER ================= */
// //   return (
// //     <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
// //       <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
// //         <TableBody>

// //           {/* HEADER */}
// //           <TableRow>
// //             <TableCell
// //               colSpan={4}
// //               sx={{
// //                 ...CELL,
// //                 textAlign: "center",
// //                 fontWeight: "bold",
// //                 fontSize: "14px",
// //               }}
// //             >
// //               JDIT SOFTWARE SOLUTIONS PVT. LTD.
// //             </TableCell>
// //           </TableRow>

// //           <TableRow>
// //             <TableCell
// //               colSpan={4}
// //               sx={{
// //                 ...CELL,
// //                 textAlign: "center",
// //                 fontSize: "11px",
// //               }}
// //             >
// //               <b>
// //                 301 A, 3rd Floor, Sai Villa Commercial Apartment, Sr. No. 166, Malwadi Road, 
// // Opp. Sahyadri Hospital, Hadapsar, Pune - 411028.

// //               </b>
// //             </TableCell>
// //           </TableRow>

// //           <TableRow>
// //             <TableCell
// //               colSpan={4}
// //               sx={{ ...CELL, fontSize: "10px", textAlign: "center" }}
// //             >
// //               <b>Salary Slip {formatMonthYear(month)}</b>
// //             </TableCell>
// //           </TableRow>

// //           {/* EMPLOYEE INFO */}
// //           <TableRow>
// //             <TableCell sx={CELL}><b>Employee Name</b></TableCell>
// //             <TableCell sx={CELL}>{employeeName}</TableCell>
// //             <TableCell sx={CELL}><b>Employee ID</b></TableCell>
// //             <TableCell sx={CELL}>{employeeId}</TableCell>
// //           </TableRow>

// //           <TableRow>
// //             <TableCell sx={CELL}><b>Gender / DOJ</b></TableCell>
// //             <TableCell sx={CELL}>{gender}<br />{formatDate(doj)}</TableCell>
// //             <TableCell sx={CELL}><b>Department <br/> Pan Number</b></TableCell>
// //             <TableCell sx={CELL}>{department}<br />{pan}</TableCell>
// //           </TableRow>

// //           <TableRow>
// //             <TableCell sx={CELL}><b>Designation</b></TableCell>
// //             <TableCell sx={CELL}>{designation}</TableCell>
// //             <TableCell sx={CELL}><b>DOB</b></TableCell>
// //             <TableCell sx={CELL}>{dob}</TableCell>
// //           </TableRow>

// //           <TableRow>
// //             <TableCell sx={CELL}><b>Mode</b></TableCell>
// //             <TableCell sx={CELL}>
// //               Bank Name: {mode}<br />
// //               Bank Account No: {accountNo}
// //             </TableCell>
// //             <TableCell sx={CELL}><b>Working Days</b></TableCell>
// //             <TableCell sx={CELL}>{workdays}</TableCell>
// //           </TableRow>

// //           {/* EARNINGS */}
// //           <TableRow>
// //             <TableCell sx={CELL}><b>Earnings</b></TableCell>
// //             <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
// //               <b>Amount</b>
// //             </TableCell>
// //           </TableRow>

// //           {earnings.map((e, i) => (
// //             <TableRow key={i}>
// //               <TableCell sx={CELL}>{e.label}</TableCell>
// //               <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
// //                 {formatCurrency(e.value)}
// //               </TableCell>
// //             </TableRow>
// //           ))}

// //           <TableRow>
// //             <TableCell sx={CELL}><b>Total</b></TableCell>
// //             <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
// //               {formatCurrency(totalSalary)}
// //             </TableCell>
// //           </TableRow>

// //           {/* SMALLER GAP */}
// //           <TableRow>
// //             <TableCell colSpan={4} sx={{ ...CELL, height: 18 }} />
// //           </TableRow>

// //           {/* DEDUCTIONS */}
// //           <TableRow>
// //   <TableCell sx={CELL}><b>Deductions</b></TableCell>
// //   <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
// //     <b>Amount</b>
// //   </TableCell>
// // </TableRow>

// // {deductions
// //   .filter(d => d.label !== "PF")
// //   .map((d, i) => (
// //     <TableRow key={i}>
// //       <TableCell
// //         sx={{
// //           ...CELL,
// //           fontWeight:
// //             d.label === "PT" || d.label === "Other Deduction"
// //               ? "bold"
// //               : "normal",
// //         }}
// //       >
// //         {d.label}
// //       </TableCell>

// //       <TableCell
// //         colSpan={3}
// //         sx={{ ...CELL, textAlign: "center" }}
// //       >
// //         {formatCurrency(d.value)}
// //       </TableCell>
// //     </TableRow>
// // ))}

// // {/* <TableRow>
// //   <TableCell sx={CELL}><b>Total Deduction</b></TableCell>
// //   <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
// //     {formatCurrency(totalDeductions)}
// //   </TableCell>
// // </TableRow> */}

// // <TableRow>
// //   <TableCell sx={CELL}><b>Total Deduction</b></TableCell>
// //   <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
// //     {formatCurrency(totalDeductions)}
// //   </TableCell>
// // </TableRow>


// //           <TableRow>
// //             <TableCell sx={CELL}><b>Net Pay</b></TableCell>
// //             <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
// //               {formatCurrency(netPay)}
// //             </TableCell>
// //           </TableRow>

// //           <TableRow>
// //             <TableCell sx={CELL}><b>In Words</b></TableCell>
// //             <TableCell colSpan={3} sx={CELL}>
// //               {numberToWords(netPay)}
// //             </TableCell>
// //           </TableRow>

// //         </TableBody>

// //         {/* SIGNATURE */}
// //         <TableBody>
// //           <TableRow>
// //             <TableCell sx={{ ...CELL, width: "33%", height: "110px", textAlign: "center" }}>
// //               {company.stamp && <img src={company.stamp} alt="Stamp" height="100" />}
// //             </TableCell>

// //             <TableCell sx={{ ...CELL, width: "34%", height: "110px" }} />

// //             <TableCell colSpan={2} sx={{ ...CELL, width: "33%", height: "110px", textAlign: "center" }}>
// //               {company.signature && (
// //                 <>
// //                   <img src={company.signature} alt="Signature" height="50" />
// //                   <Typography fontWeight="bold" fontSize="11px">
// //                     Signature
// //                   </Typography>
// //                 </>
// //               )}
// //             </TableCell>
// //           </TableRow>
// //         </TableBody>
// //       </Table>

// //       {/* NOTES */}
// //      <Box sx={{ mt: 2 }}>
// //   <Typography fontWeight="bold" fontSize="11px">
// //     Note:
// //   </Typography>

// //   <Typography fontSize="9px">
// //     1. Please note that all information regarding remuneration is confidential
// //     and should not be disclosed.
// //   </Typography>

// //   <Typography fontSize="9px">
// //     2. TDS, PF, LWF, and ESIC or any other statutory liabilities (if any) falling
// //     within your salary structure would be liable for deduction as per the
// //     statutory norms.
// //   </Typography>

// //   <Typography fontSize="9px">
// //     3. Gratuity will be paid out to the employee as per the Payment of Gratuity
// //     Act, 1972.
// //   </Typography>

// //   <Typography fontSize="9px">
// //     4. The employee will be paid monthly/quarterly/yearly allowances/PLI/Bonus
// //     (if any) only if he/she remains in the service of the company at the end of
// //     that period.
// //   </Typography>

// //   <Typography fontSize="9px">
// //     5. Any incentive/allowance earned during the service will be added to the
// //     CTC and is subject to Income Tax regulations and other laws applicable from
// //     time to time.
// //   </Typography>

// //   <Typography fontSize="9px">
// //     6. Medical insurance policy valued at Rs.12,000/- must be submitted within
// //     30 days of joining. If failed, the same value will be deducted from the CTC
// //     as per the JDITBS policy.
// //   </Typography>

// //   <Typography fontSize="9px">
// //     7. JDIT Software Solutions may review at any time and/or restructure the
// //     compensation package.
// //   </Typography>
// // </Box>

// //     </A4Layout>
// //   );
// // };

// // export default JDITSalarySlip;



// import React, { useMemo } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   Typography,
//   Box,
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

// /* ================= STYLES ================= */
// const CELL = {
//   border: "1px solid #000",
//   padding: "4px 5px",
//   fontSize: "11.5px",
//   lineHeight: 1.2,
// };

// /* ================= COMPONENT ================= */
// const JDITSalarySlip = ({ company, data }) => {
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
//   } = data;

//   /* ================= SALARY CALCULATION ================= */
//   const {
//     basicSalary,
//     hra,
//     dearnessAllowance,
//     foodAllowance,
//     miscAllowance,
//     pf,
//     professionalTax,
//     totalDeductions,
//     netPay,
//   } = useMemo(() => {
//     const gross = Number(totalSalary) || 0;

//     /* ===== Earnings ===== */
//     const basic = Math.round(gross * 0.4);
//     const hraCalc = Math.round(basic * 0.4);
//     const da = Math.round(gross * 0.1);
//     const food = Math.round(gross * 0.1);
//     const misc = gross - (basic + hraCalc + da + food);

//     /* ===== Fixed PF ===== */
//     const PF = 3750;

//     /* ===== Other Deductions ===== */
//     const pt = getProfessionalTax(month, gross);
//     const otherDeduction = 2000;

//     /* ===== PF NOT INCLUDED in total deduction ===== */
//     const totalDeductions =
//       (Number(pt) || 0) +
//       (Number(otherDeduction) || 0);

//     /* ===== Net Pay ===== */
//     const net = gross - totalDeductions;
//     Total Deduction = PF + PT + Other Deduction
// Net Pay = Gross - Total Deduction


//     return {
//       basicSalary: basic,
//       hra: hraCalc,
//       dearnessAllowance: da,
//       foodAllowance: food,
//       miscAllowance: misc,
//       pf: PF,
//       professionalTax: pt,
//       totalDeductions,
//       netPay: net,
//     };
//   }, [totalSalary, month]);

//   /* ================= ARRAYS ================= */
//   const earnings = [
//     { label: <b>BASIC</b>, value: basicSalary },
//     { label: <b>HRA</b>, value: hra },
//     { label: <b>DEARNESS ALLOWANCE</b>, value: dearnessAllowance },
//     { label: <b>FOOD ALLOWANCE</b>, value: foodAllowance },
//     { label: <b>PF</b>, value: pf }, // visible only
//   ];

//   const deductions = [
//     { label: "PF", value: pf }, // visible but NOT counted
//     { label: "PT", value: professionalTax },
//     { label: "Other Deduction", value: 2000 },
//   ];

//   const formatMonthYear = (month) =>
//     new Date(`${month}-01`).toLocaleDateString("en-GB", {
//       month: "long",
//       year: "numeric",
//     });

//   /* ================= RENDER ================= */
//   return (
//     <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
//       <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
//         <TableBody>

//           {/* HEADER */}
//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold", fontSize: "14px" }}>
//               JDIT SOFTWARE SOLUTIONS PVT. LTD.
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontSize: "11px" }}>
//               <b>
//                 301 A, 3rd Floor, Sai Villa Commercial Apartment, Sr. No. 166,
//                 Malwadi Road, Opp. Sahyadri Hospital, Hadapsar, Pune - 411028.
//               </b>
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center" }}>
//               <b>Salary Slip {formatMonthYear(month)}</b>
//             </TableCell>
//           </TableRow>

//           {/* EMPLOYEE INFO */}
//           <TableRow>
//             <TableCell sx={CELL}><b>Employee Name</b></TableCell>
//             <TableCell sx={CELL}>{employeeName}</TableCell>
//             <TableCell sx={CELL}><b>Employee ID</b></TableCell>
//             <TableCell sx={CELL}>{employeeId}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Gender / DOJ</b></TableCell>
//             <TableCell sx={CELL}>{gender}<br />{formatDate(doj)}</TableCell>
//             <TableCell sx={CELL}><b>Department / Pan</b></TableCell>
//             <TableCell sx={CELL}>{department}<br />{pan}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Designation</b></TableCell>
//             <TableCell sx={CELL}>{designation}</TableCell>
//             <TableCell sx={CELL}><b>DOB</b></TableCell>
//             <TableCell sx={CELL}>{dob}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Mode</b></TableCell>
//             <TableCell sx={CELL}>
//               Bank Name: {mode}<br />
//               Bank Account No: {accountNo}
//             </TableCell>
//             <TableCell sx={CELL}><b>Working Days</b></TableCell>
//             <TableCell sx={CELL}>{workdays}</TableCell>
//           </TableRow>

//           {/* EARNINGS */}
//           <TableRow>
//             <TableCell sx={CELL}><b>Earnings</b></TableCell>
//             <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
//               <b>Amount</b>
//             </TableCell>
//           </TableRow>

//           {earnings.map((e, i) => (
//             <TableRow key={i}>
//               <TableCell sx={CELL}>{e.label}</TableCell>
//               <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
//                 {formatCurrency(e.value)}
//               </TableCell>
//             </TableRow>
//           ))}

//           <TableRow>
//             <TableCell sx={CELL}><b>Total</b></TableCell>
//             <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
//               {formatCurrency(totalSalary)}
//             </TableCell>
//           </TableRow>

//           {/* DEDUCTIONS */}
//           <TableRow>
//             <TableCell sx={CELL}><b>Deductions</b></TableCell>
//             <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
//               <b>Amount</b>
//             </TableCell>
//           </TableRow>

//           {deductions.map((d, i) => (
//             <TableRow key={i}>
//               <TableCell sx={CELL}>{d.label}</TableCell>
//               <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
//                 {formatCurrency(d.value)}
//               </TableCell>
//             </TableRow>
//           ))}

//           <TableRow>
//             <TableCell sx={CELL}><b>Total Deduction</b></TableCell>
//             <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
//               {formatCurrency(totalDeductions)}
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Net Pay</b></TableCell>
//             <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
//               {formatCurrency(netPay)}
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>In Words</b></TableCell>
//             <TableCell colSpan={3} sx={CELL}>
//               {numberToWords(netPay)}
//             </TableCell>
//           </TableRow>

//         </TableBody>
//       </Table>

//       {/* SIGNATURE */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//         <Box>
//           {company.stamp && <img src={company.stamp} alt="Stamp" height="100" />}
//         </Box>
//         <Box textAlign="center">
//           {company.signature && <img src={company.signature} alt="Signature" height="50" />}
//           <Typography fontWeight="bold" fontSize="11px">
//             Signature
//           </Typography>
//         </Box>
//       </Box>
//     </A4Layout>
//   );
// };

// export default JDITSalarySlip;

import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";

import {
  getProfessionalTax,
  numberToWords,
  formatCurrency,
} from "../../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

/* ================= STYLES ================= */
const CELL = {
  border: "1px solid #000",
  padding: "4px 5px",
  fontSize: "11.5px",
  lineHeight: 1.2,
};

/* ================= COMPONENT ================= */
const JDITSalarySlip = ({ company, data }) => {
  if (!company || !data) return null;

  const {
    month,
    employeeName,
    employeeId,
    gender,
    doj,
    department,
    pan,
    designation,
    dob,
    mode,
    accountNo,
    workdays,
    totalSalary,
  } = data;

  /* ================= SALARY CALCULATION ================= */
 /* ================= SALARY CALCULATION ================= */
const {
  basicSalary,
  hra,
  dearnessAllowance,
  specialAllowance,
  foodAllowance,
  pf,
  professionalTax,
  otherDeduction,
  totalDeductions,
  totalEarning,
  netPay,
} = useMemo(() => {

  const round2 = (num) => Number(Number(num || 0).toFixed(2));

  const monthlyGross = round2(Number(totalSalary || 0));

  /* ================= PERCENT BREAKUP ================= */
  const PERCENT = {
    basic: 0.48,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
  };

  const BASIC   = round2(monthlyGross * PERCENT.basic);
  const HRA     = round2(monthlyGross * PERCENT.hra);
  const DA      = round2(monthlyGross * PERCENT.da);
  const SPECIAL = round2(monthlyGross * PERCENT.special);
  const FOOD    = round2(monthlyGross * PERCENT.food);

  const PF = 3750; // fixed PF
  const OTHER = 2000; // if needed dynamic later

  /* ================= TOTAL EARNINGS ================= */
  const totalEarning =
    BASIC +
    HRA +
    DA +
    SPECIAL +
    FOOD;

  /* ================= DEDUCTIONS ================= */
  const pt = getProfessionalTax(month, totalEarning);

  const totalDeduction = round2(
    PF +
    pt +
    Number(OTHER || 0)
  );

  /* ================= NET PAY ================= */
  const netPay = round2(totalEarning - totalDeduction);

  return {
    basicSalary: BASIC,
    hra: HRA,
    dearnessAllowance: DA,
    specialAllowance: SPECIAL,
    foodAllowance: FOOD,
    pf: PF,
    professionalTax: pt,
    otherDeduction: OTHER,
    totalDeductions: totalDeduction,
    totalEarning,
    netPay,
  };

}, [totalSalary, month]);

  /* ================= ARRAYS ================= */
  const earnings = [
  { label: <b>BASIC</b>, value: basicSalary },
  { label: <b>HRA</b>, value: hra },
  { label: <b>DEARNESS ALLOWANCE</b>, value: dearnessAllowance },
  { label: <b>SPECIAL ALLOWANCE</b>, value: specialAllowance },
  { label: <b>FOOD ALLOWANCE</b>, value: foodAllowance },
  { label: <b>PF</b>, value: pf },
];

  const deductions = [
    { label: "PF", value: pf },
    { label: "PT", value: professionalTax },
    { label: "Other Deduction", value: otherDeduction },
  ];

  const formatMonthYear = (month) =>
    new Date(`${month}-01`).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });

  /* ================= RENDER ================= */
  return (
    <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
      <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
        <TableBody>

          {/* HEADER */}
          <TableRow>
            <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold", fontSize: "14px" }}>
              JDIT SOFTWARE SOLUTIONS PVT. LTD.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontSize: "12px" }}>
              <b>
                401 A, 4rd Floor, Sai Villa Commercial Apartment, Sr. No. 166,
                Malwadi Road, Opp. Sahyadri Hospital, Hadapsar, Pune - 411028.
              </b>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center",fontSize: "12px" }}>
              <b>Salary Slip {formatMonthYear(month)}</b>
            </TableCell>
          </TableRow>

          {/* EMPLOYEE INFO */}
          <TableRow>
            <TableCell sx={CELL}><b>Employee Name</b></TableCell>
            <TableCell sx={CELL}>{employeeName}</TableCell>
            <TableCell sx={CELL}><b>Employee ID</b></TableCell>
            <TableCell sx={CELL}>{employeeId}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={CELL}><b>Gender / DOJ</b></TableCell>
            <TableCell sx={CELL}>{gender}<br />{formatDate(doj)}</TableCell>
            <TableCell sx={CELL}><b>Department / Pan</b></TableCell>
            <TableCell sx={CELL}>{department}<br />{pan}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={CELL}><b>Designation</b></TableCell>
            <TableCell sx={CELL}>{designation}</TableCell>
            <TableCell sx={CELL}><b>DOB</b></TableCell>
            <TableCell sx={CELL}>{dob}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={CELL}><b>Mode</b></TableCell>
            <TableCell sx={CELL}>
              Bank Name: {mode}<br />
              Bank Account No: {accountNo}
            </TableCell>
            <TableCell sx={CELL}><b>Working Days</b></TableCell>
            <TableCell sx={CELL}>{workdays}</TableCell>
          </TableRow>

          {/* EARNINGS */}
          <TableRow>
            <TableCell sx={CELL}><b>Earnings</b></TableCell>
            <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
              <b>Amount</b>
            </TableCell>
          </TableRow>

          {earnings.map((e, i) => (
            <TableRow key={i}>
              <TableCell sx={CELL}>{e.label}</TableCell>
              <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
                {formatCurrency(e.value)}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell sx={CELL}><b>Total Earnings</b></TableCell>
            <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
              {formatCurrency(totalSalary)}             
              </TableCell>
          </TableRow>

          {/* DEDUCTIONS */}
          <TableRow>
            <TableCell sx={CELL}><b>Deductions</b></TableCell>
            <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
              <b>Amount</b>
            </TableCell>
          </TableRow>

          {deductions.map((d, i) => (
            <TableRow key={i}>
              <TableCell sx={CELL}>{d.label}</TableCell>
              <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
                {formatCurrency(d.value)}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell sx={CELL}><b>Total Deduction</b></TableCell>
            <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
              {formatCurrency(totalDeductions)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={CELL}><b>Net Pay</b></TableCell>
            <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
              {formatCurrency(netPay)}
            </TableCell>
          </TableRow>

<TableRow>
            <TableCell sx={CELL}><b>In Words</b></TableCell>
            <TableCell colSpan={3} sx={CELL}>
              {numberToWords(netPay)}
            </TableCell>
          </TableRow>

        </TableBody>

        {/* SIGNATURE */}
        <TableBody>
          <TableRow>
            <TableCell sx={{ ...CELL, width: "33%", height: "100px", textAlign: "center" }}>
              {company.stamp && <img src={company.stamp} alt="Stamp" height="80" />}
            </TableCell>

            <TableCell sx={{ ...CELL, width: "34%", height: "110px" }} />

            <TableCell colSpan={2} sx={{ ...CELL, width: "33%", height: "100px", textAlign: "center" }}>
              {company.signature && (
                <>
                  <img src={company.signature} alt="Signature" height="40" />
                  <Typography fontWeight="bold" fontSize="11px">
                    Signature
                  </Typography>
                </>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* NOTES */}
     <Box sx={{ mt: 2 }}>
  <Typography fontWeight="bold" fontSize="11px">
    Note:
  </Typography>

  <Typography fontSize="9px">
    1. Please note that all information regarding remuneration is confidential
    and should not be disclosed.
  </Typography>

  <Typography fontSize="9px">
    2. TDS, PF, LWF, and ESIC or any other statutory liabilities (if any) falling
    within your salary structure would be liable for deduction as per the
    statutory norms.
  </Typography>

  <Typography fontSize="9px">
    3. Gratuity will be paid out to the employee as per the Payment of Gratuity
    Act, 1972.
  </Typography>

  <Typography fontSize="9px">
    4. The employee will be paid monthly/quarterly/yearly allowances/PLI/Bonus
    (if any) only if he/she remains in the service of the company at the end of
    that period.
  </Typography>

  <Typography fontSize="9px">
    5. Any incentive/allowance earned during the service will be added to the
    CTC and is subject to Income Tax regulations and other laws applicable from
    time to time.
  </Typography>

  <Typography fontSize="9px">
    6. Medical insurance policy valued at Rs.12,000/- must be submitted within
    30 days of joining. If failed, the same value will be deducted from the CTC
    as per the JDITBS policy.
  </Typography>

  <Typography fontSize="9px">
    7. JDIT Software Solutions may review at any time and/or restructure the
    compensation package.
  </Typography>
</Box>

    </A4Layout>
  );
};

export default JDITSalarySlip;
