// import React, { useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";

// import {
//   calculateSalaryBreakdown,
//   getProfessionalTax,
//   numberToWords,
//   formatCurrency,
// } from "../../../../utils/salaryCalculations";
// import { Style } from "@mui/icons-material";


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
// const CELL = {
//   border: "1px solid #000",
//   padding: "6px",
//   fontSize: "10px",
// };

// /* ================= COMPONENT ================= */
// const JDITSalarySlip = ({ company, data }) => {
//   if (!company || !data) return null;

//   const {
//     month = "2025-02",
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
//     ctc = 480000,
//   } = data;

//   /* ================= CALCULATIONS ================= */
//   const breakdown = useMemo(() => calculateSalaryBreakdown(ctc), [ctc]);

//   const earnings = [
//     { label: "BASIC", value: breakdown.monthly.basicSalary },
//     { label: "HRA", value: breakdown.monthly.hra },
//     { label: "DEARNESS ALLOWANCE", value: 1500 },
//     { label: "SPECIAL ALLOWANCE", value: breakdown.monthly.specialAllowance },
//     { label: "FOOD ALLOWANCE", value: 2000 },
//     { label: "MISC ALLOWANCE", value: 1500 },
//   ];

//   const professionalTax = getProfessionalTax(
//     month,
//     breakdown.monthly.totalEarnings
//   );

//   const deductions = [
//     { label: "PT", value: professionalTax },
//     { label: "Other Deduction", value: 2000 },
//   ];

//   const totalEarnings = earnings.reduce((s, e) => s + e.value, 0);
//   const totalDeductions = deductions.reduce((s, d) => s + d.value, 0);
//   const netPay = totalEarnings - totalDeductions;

//   const formatMonthYear = (month) =>
//     new Date(`${month}-01`).toLocaleDateString("en-GB", {
//       month: "long",
//       year: "numeric",
//     });

//   /* ================= RENDER ================= */
//   return (
//     <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
//       {/* ================= EMPLOYEE DETAILS ================= */}

//       <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
//         <TableBody>
//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold", fontSize: "16px" }}>
//               JDIT SOFTWARE SOLUTIONS PVT. LTD.
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center" }}>
//               <b>
//                 301 A, 3rd Floor, Sai Villa Commercial Apartment,
//                 Hadapsar, Pune - 411028
//               </b>
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold" }}>
//               Salary Slip – {formatMonthYear(month)}
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL} id="text_size">Employee Name</TableCell>
//             <TableCell sx={CELL}>{employeeName}</TableCell>
//             <TableCell sx={CELL}>Employee ID</TableCell>
//             <TableCell sx={CELL}>{employeeId}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}>Gender<br />DOJ</TableCell>
//             <TableCell sx={CELL}>{gender}<br />{formatDate(doj)}</TableCell>
//             <TableCell sx={CELL}>Department<br />PAN</TableCell>
//             <TableCell sx={CELL}>{department}<br />{pan}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}>Designation</TableCell>
//             <TableCell sx={CELL}>{designation}</TableCell>
//             <TableCell sx={CELL}>DOB</TableCell>
//             <TableCell sx={CELL}>{dob}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}>Mode</TableCell>
//             <TableCell sx={CELL}>
//               Bank: {mode}<br />
//               Acc No: {accountNo}
//             </TableCell>
//             <TableCell sx={CELL}>Working Days</TableCell>
//             <TableCell sx={CELL}>{workdays}</TableCell>
//           </TableRow>
//         </TableBody>
//       {/* </Table> */}

//       {/* ================= EARNINGS & DEDUCTIONS ================= */}
//       {/* <Table colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold" }}> */}
//         <TableBody>
//           {/* Earnings Header */}
//           <TableRow>
//             <TableCell sx={CELL}><b>Earnings</b></TableCell>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold" }}>
//             <b>Amount</b></TableCell>
//           </TableRow>

//           {earnings.map((e, i) => (
//             <TableRow key={i}>
//               <TableCell sx={CELL}>{e.label}</TableCell>
//               <TableCell 
//                 // sx={{ ...CELL, textAlign: "center" }}>
//                 colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold" }}>
//                 {formatCurrency(e.value)}
//               </TableCell>
//             </TableRow>
//           ))}

//           <TableRow>
//             <TableCell sx={CELL}><b>Total Earnings</b></TableCell>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold" }}>
//               <b>{formatCurrency(totalEarnings)}</b>
//             </TableCell>
//           </TableRow>

//           {/* ✅ EMPTY ROW BETWEEN EARNINGS & DEDUCTIONS */}
//           <TableRow>
//             <TableCell
//               colSpan={4}
//               sx={{
//                 height: "20px",
//                 borderLeft: "1px solid #000",
//                 borderRight: "1px solid #000",
//                 borderTop: "none",
//                 borderBottom: "none",
//               }}
//             />
//           </TableRow>

//           {/* Deductions Header */}

//           <TableRow>
//             <TableCell sx={CELL}><b>Deductions</b></TableCell>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold" }}>
//             <b>Amount</b></TableCell>
//           </TableRow>
// {/* 
//           <TableRow colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold" }}>>
//             <TableCell sx={CELL}><b></b></TableCell>
//             <TableCell sx={{ ...CELL, textAlign: "center" }}><b></b></TableCell>
//           </TableRow> */}

//           {deductions.map((d, i) => (
//             <TableRow key={i}>
//               <TableCell sx={CELL}>{d.label}</TableCell>
//               <TableCell 
//               colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold" }}>
//                 {formatCurrency(d.value)}
//               </TableCell>
//             </TableRow>
//           ))}

//           <TableRow >
//             <TableCell sx={CELL}><b>Net Pay</b></TableCell>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold" }}>
//               <b>{formatCurrency(netPay)}</b>
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>In Words</b></TableCell>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold" }}>
//               {numberToWords(netPay)}
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>

// <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
//   <TableBody>
//     <TableRow>
//       {/* STAMP */}
//       <TableCell
//         sx={{
//           ...CELL,
//           width: "34.70%",
//           height: "140px",
//           textAlign: "center",
//           verticalAlign: "middle",
//         }}
//       >
//         {company.stamp && (
//           <img src={company.stamp} alt="Stamp" height="90" />
//         )}
//       </TableCell>

//       {/* EMPTY MIDDLE BOX */}
//       <TableCell
//         sx={{
//           ...CELL,
//           width: "33.33%",
//           height: "140px",
//         }}
//       />

//       {/* SIGNATURE */}
//       <TableCell
//         sx={{
//           ...CELL,
//           width: "33.33%",
//           height: "140px",
//           textAlign: "center",
//           verticalAlign: "middle",
//         }}
//       >
//         {company.signature && (
//           <>
//             <img src={company.signature} alt="Signature" height="60" />
//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 fontWeight: "bold",
//                 mt: 1,
//               }}
//             >
//               Signature
//             </Typography>
//           </>
//         )}
//       </TableCell>
//     </TableRow>
//   </TableBody>
// </Table>

      // {/* ================= NOTES / TERMS ================= */}
      // <Box sx={{ mt: 2, px: 1 }}>
      //   <Typography sx={{ fontSize: "12px", fontWeight: "bold", mb: 0.5 }}>
      //     Note:
      //   </Typography>

      //   <Typography sx={{ fontSize: "8px", lineHeight: 1.4 }}>
      //     1. Please note that all information regarding remuneration is confidential
      //     and should not be disclosed.
      //   </Typography>

      //   <Typography sx={{ fontSize: "8px", lineHeight: 1.4 }}>
      //     2. TDS, PF, LWF, and ESIC or any other statutory liabilities (if any)
      //     falling within your salary structure would be liable for deduction as per
      //     statutory norms.
      //   </Typography>

      //   <Typography sx={{ fontSize: "8px", lineHeight: 1.4 }}>
      //     3. Gratuity will be paid out to the employee as per the Payment of
      //     Gratuity Act, 1972.
      //   </Typography>

      //   <Typography sx={{ fontSize: "8px", lineHeight: 1.4 }}>
      //     4. The employee will be paid monthly/quarterly/yearly
      //     allowances/PLI/Bonus (if any) only if he/she remains in the service of the
      //     company at the end of that period.
      //   </Typography>

      //   <Typography sx={{ fontSize: "8px", lineHeight: 1.4 }}>
      //     5. Any incentive/allowance earned during service will be added to the CTC
      //     and is subject to Income Tax regulations and other applicable laws.
      //   </Typography>

      //   <Typography sx={{ fontSize: "8px", lineHeight: 1.4 }}>
      //     6. Medical insurance policy valued at Rs. 12,000/- must be submitted
      //     within 30 days of joining. If not submitted, the same amount will be
      //     deducted from the CTC as per the JDIT policy.
      //   </Typography>

      //   <Typography sx={{ fontSize: "8px", lineHeight: 1.4 }}>
      //     7. JDIT Software Solutions may review and/or restructure the compensation
      //     package at any time.
      //   </Typography>
      // </Box>
//     </A4Layout>
//   );
// };

// export default JDITSalarySlip;

// import React, { useMemo } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";

// import {
//   getProfessionalTax,
//   numberToWords,
//   formatCurrency,
// } from "../../../../utils/salaryCalculations";

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
//   padding: "6px",
//   fontSize: "13px",
// };

// /* ================= COMPONENT ================= */
// const JDITSalarySlip= ({ company, data }) => {
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

//   /* ================= SALARY CALCULATION (LOCAL) ================= */
//   const {
//     basicSalary,
//     hra,
//     dearnessAllowance,
//     foodAllowance,
//     miscAllowance,
//     pf,
//     professionalTax,
//     netPay,
//   } = useMemo(() => {
//     const gross = Number(totalSalary) || 0;

//     const basic = Math.round(gross * 0.40);
//     const hraCalc = Math.round(basic * 0.40);
//     const da = Math.round(gross * 0.10);
//     const food = Math.round(gross * 0.10);

//     const pfCalc = Math.round(basic * 0.12);
//     const pt = getProfessionalTax(month, gross);

//     const misc =
//       gross - (basic + hraCalc + da + food);

//     const net =
//       gross - (pfCalc + pt);

//     return {
//       basicSalary: basic,
//       hra: hraCalc,
//       dearnessAllowance: da,
//       foodAllowance: food,
//       miscAllowance: misc,
//       pf: pfCalc,
//       professionalTax: pt,
//       netPay: net,
//     };
//   }, [totalSalary, month]);

//   const earnings = [
//     { label: "BASIC", value: basicSalary },
//     { label: "HRA", value: hra },
//     { label: "DEARNESS ALLOWANCE", value: dearnessAllowance },
//     { label: "FOOD ALLOWANCE", value: foodAllowance },
//     { label: "MISC ALLOWANCE", value: miscAllowance },
//   ];

//   const deductions = [
//     { label: "PF", value: pf },
//     { label: "PT", value: professionalTax },
//   ];

//   const totalDeductions = deductions.reduce((s, d) => s + d.value, 0);
//   const otherDeduction = deductions.find(d => d.label === "Other Deduction");


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

          // <TableRow>
          //   <TableCell
          //     colSpan={4}
          //     sx={{
          //       ...CELL,
          //       textAlign: "center",
          //       fontSize: "13px",
          //     }}
          //   >
          //     406 Changbhale Heights, Near Kalpataru Estate Phase III, Pimple Gurav, Pune 411 061.
          //   </TableCell>
          // </TableRow>

//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center" }}>
//               Salary Slip – {formatMonthYear(month)}
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Employee Name</b></TableCell>
//             <TableCell sx={CELL}>{employeeName}</TableCell>
//             <TableCell sx={CELL}><b>Employee ID</b></TableCell>
//             <TableCell sx={CELL}>{employeeId}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Gender <br></br> DOJ</b></TableCell>
//             <TableCell sx={CELL}>{gender} <br /> {formatDate(doj)}</TableCell>
//             <TableCell sx={CELL}><b>Department <br></br> PAN</b></TableCell>
//             <TableCell sx={CELL}>{department} <br /> {pan}</TableCell>
//           </TableRow>

          // <TableRow>
          //   <TableCell sx={CELL}><b>Designation</b></TableCell>
          //   <TableCell sx={CELL}>{designation}</TableCell>
          //   <TableCell sx={CELL}><b>DOB</b></TableCell>
          //   <TableCell sx={CELL}>{dob}</TableCell>
          // </TableRow>

          // <TableRow>
          //   <TableCell sx={CELL}><b>Mode</b></TableCell>
          //   <TableCell sx={CELL}>
          //     <b>Bank:</b> {mode}<br />
          //     <b>A/C No:</b> {accountNo}
          //   </TableCell>
          //   <TableCell sx={CELL}><b>Working Days</b></TableCell>
          //   <TableCell sx={CELL}>{workdays}</TableCell>
          // </TableRow>

//           {/* SALARY HEADER */}
//           <TableRow>
//             <TableCell colSpan={1} sx={{ ...CELL, textAlign: "center" }}><b>Earnings</b></TableCell>
//             <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}><b>Amount</b></TableCell>
//             {/* <TableCell sx={CELL}><b>Deductions</b></TableCell>
//             <TableCell sx={CELL}><b>Amount</b></TableCell> */}
//           </TableRow>

//           {earnings.map((e, i) => (
//             <TableRow key={i}>
//               <TableCell sx={CELL}><b>{e.label}</b></TableCell>
//               <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>{formatCurrency(e.value)}</TableCell>
//               {/* <TableCell sx={CELL}>{deductions[i]?.label || ""}</TableCell>
//               <TableCell sx={CELL}>
//                 {deductions[i] ? formatCurrency(deductions[i].value) : ""}
//               </TableCell> */}
//             </TableRow>
//           ))}
          
//           <TableRow>
//             <TableCell sx={CELL}><b>Total</b></TableCell>
//             <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}><b>{formatCurrency(totalSalary)}</b></TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center" }}></TableCell>
//           </TableRow>
          
//           <TableRow>
//             <TableCell colSpan={1} sx={{ ...CELL, textAlign: "center" }}><b>Deductions</b></TableCell>
//             <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}><b>Amount</b></TableCell>
//           </TableRow>
          
//    {deductions
//   .filter(d => d.label === "PT")
//   .map((d, i) => (
//     <TableRow key={i}>
//       <TableCell sx={CELL}><b>{d.label}</b></TableCell>
//       <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
//         {formatCurrency(d.value)}
//       </TableCell>
//     </TableRow>
// ))}
// <TableRow>
// {otherDeduction && (
//   <TableRow>
//     <TableCell sx={CELL}><b>Other Deduction</b></TableCell>
//     <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
//       <b>{formatCurrency(otherDeduction.value)}</b>
//     </TableCell>
//   </TableRow>
// )}          </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Total Deduction</b></TableCell>
//             <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}><b>{formatCurrency(totalDeductions)}</b></TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Net Pay</b></TableCell>
//             <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}><b>{formatCurrency(netPay)}</b></TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>In Words</b></TableCell>
//             <TableCell colSpan={3} sx={CELL}>
//               {numberToWords(netPay)}
//             </TableCell>
//           </TableRow>


//           <TableRow>
//             <TableCell
//               sx={{ border: "1px solid #000", paddingLeft: "150px" }}
//             ></TableCell>

//             <TableCell
//               sx={{ border: "1px solid #000", paddingLeft: "150px" }}
//             ></TableCell>
//             <TableCell
//               sx={{
//                 border: "1px solid #000",
//                 verticalAlign: "top",
//                 padding: "10px",
//                 width: "50%",
//                 textAlign: "center",
//               }}
//             >
//               {company.stamp && (
//                 <img
//                   src={company.stamp}
//                   alt="Stamp"
//                   style={{ height: "100px" }}
//                 />
//               )}
//             </TableCell>

//             <TableCell
//               sx={{
//                 border: "1px solid #000",
//                 verticalAlign: "top",
//                 padding: "10px",
//                 width: "50%",
//               }}
//             >
//               {company.signature && (
//                 <img
//                   src={company.signature}
//                   alt="Signature"
//                   style={{ height: "60px", marginBottom: "6px" }}
                  
//                 />
                
//               )}
//               <Typography textAlign="Center"><b>Signature</b></Typography>
              
//             </TableCell>

            
//           </TableRow>

//         </TableBody>
//       </Table>
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

/* ================= STYLES (SLIGHTLY SMALLER) ================= */
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
  foodAllowance,
  miscAllowance,
  pf,
  professionalTax,
  totalDeductions,
  netPay,
} = useMemo(() => {
  const gross = Number(totalSalary) || 0;

  // Calculate earnings components
  const basic = Math.round(gross * 0.4);
  const hraCalc = Math.round(basic * 0.4);
  const da = Math.round(gross * 0.1);
  const food = Math.round(gross * 0.1);
  const misc = gross - (basic + hraCalc + da + food);

  // Calculate deductions
  const pfCalc = Math.round(basic * 0.12);
  const pt = getProfessionalTax(month, gross);
  const otherDeduction = 2000;

  const deductions = [
    { label: "PF", value: pfCalc },
    { label: "PT", value: pt },
    { label: "Other Deduction", value: otherDeduction },
  ];

  // Total Deduction including all
  const totalDeductions = deductions
  .filter(d => d.label === "PT" || d.label === "Other Deduction")
  .reduce((sum, d) => sum + (Number(d.value) || 0), 0);

  // Net Pay after deducting all
  const net = gross - totalDeductions;

  return {
    basicSalary: basic,
    hra: hraCalc,
    dearnessAllowance: da,
    foodAllowance: food,
    miscAllowance: misc,
    pf: pfCalc,
    professionalTax: pt,
    totalDeductions: totalDeductions,
    netPay: net,
  };
}, [totalSalary, month]);

  const earnings = [
    { label:<b> BASIC</b>, value: basicSalary },
    { label: <b>HRA</b>, value: hra },
    { label: <b>DEARNESS ALLOWANCE</b>, value: dearnessAllowance },
    { label: <b>FOOD ALLOWANCE</b>, value: foodAllowance },
    { label: <b>MISC ALLOWANCE</b>, value: miscAllowance },
  ];

  const deductions = [
    { label: "PF", value: pf },
    { label: "PT", value: professionalTax },
    { label: "Other Deduction", value: 2000 },
  ];

  // const totalDeductions = deductions.reduce((s, d) => s + d.value, 0);

// const totalDeductions = deductions
//   .filter(d => d.label === "PT" || d.label === "Other Deduction")
//   .reduce((sum, d) => sum + (Number(d.value) || 0), 0);


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
            <TableCell
              colSpan={4}
              sx={{
                ...CELL,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              JDIT SOFTWARE SOLUTIONS PVT. LTD.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              colSpan={4}
              sx={{
                ...CELL,
                textAlign: "center",
                fontSize: "11px",
              }}
            >
              <b>
                301 A, 3rd Floor, Sai Villa Commercial Apartment, Sr. No. 166, Malwadi Road, 
Opp. Sahyadri Hospital, Hadapsar, Pune - 411028.

              </b>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              colSpan={4}
              sx={{ ...CELL, fontSize: "10px", textAlign: "center" }}
            >
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
            <TableCell sx={CELL}><b>Department <br/> Pan Number</b></TableCell>
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
            <TableCell sx={CELL}><b>Total</b></TableCell>
            <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
              {formatCurrency(totalSalary)}
            </TableCell>
          </TableRow>

          {/* SMALLER GAP */}
          <TableRow>
            <TableCell colSpan={4} sx={{ ...CELL, height: 18 }} />
          </TableRow>

          {/* DEDUCTIONS */}
          <TableRow>
  <TableCell sx={CELL}><b>Deductions</b></TableCell>
  <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
    <b>Amount</b>
  </TableCell>
</TableRow>

{deductions
  .filter(d => d.label !== "PF")
  .map((d, i) => (
    <TableRow key={i}>
      <TableCell
        sx={{
          ...CELL,
          fontWeight:
            d.label === "PT" || d.label === "Other Deduction"
              ? "bold"
              : "normal",
        }}
      >
        {d.label}
      </TableCell>

      <TableCell
        colSpan={3}
        sx={{ ...CELL, textAlign: "center" }}
      >
        {formatCurrency(d.value)}
      </TableCell>
    </TableRow>
))}

{/* <TableRow>
  <TableCell sx={CELL}><b>Total Deduction</b></TableCell>
  <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
    {formatCurrency(totalDeductions)}
  </TableCell>
</TableRow> */}

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
            <TableCell sx={{ ...CELL, width: "33%", height: "110px", textAlign: "center" }}>
              {company.stamp && <img src={company.stamp} alt="Stamp" height="100" />}
            </TableCell>

            <TableCell sx={{ ...CELL, width: "34%", height: "110px" }} />

            <TableCell colSpan={2} sx={{ ...CELL, width: "33%", height: "110px", textAlign: "center" }}>
              {company.signature && (
                <>
                  <img src={company.signature} alt="Signature" height="50" />
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









// import React, { useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";
// import {
//   calculateSalaryBreakdown,
//   getProfessionalTax,
//   numberToWords,
//   formatCurrency,
// } from "../../../../utils/salaryCalculations";

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
// const CELL = {
//   border: "1px solid #000",
//   padding: "6px",
//   fontSize: "13px",
// };

// const JDITSalarySlip = ({ company, data }) => {
//   if (!company || !data) return null;

//   const {
//     month = "2025-02",
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
//     ctc = 480000,
//   } = data;

//   /* ================= CALCULATIONS ================= */
//   const breakdown = useMemo(() => calculateSalaryBreakdown(ctc), [ctc]);

//   const earnings = [
//     { label: "BASIC", value: breakdown.monthly.basicSalary },
//     { label: "HRA", value: breakdown.monthly.hra },
//     { label: "DEARNESS ALLOWANCE", value: 1500 },
//     { label: "SPECIAL ALLOWANCE", value: breakdown.monthly.specialAllowance },
//     { label: "FOOD ALLOWANCE", value: 2000 },
//     { label: "MISC ALLOWANCE", value: 1500 },
//   ];

//   const deductions = [
//     {
//       label: "PT",
//       value: getProfessionalTax(month, breakdown.monthly.totalEarnings),
//     },
//     { label: "Other Deduction", value: 2000 },
//   ];

//   const totalEarnings = earnings.reduce((s, e) => s + e.value, 0);
//   const totalDeductions = deductions.reduce((s, d) => s + d.value, 0);
//   const netPay = totalEarnings - totalDeductions;

//   const formatMonthYear = (month) =>
//     new Date(`${month}-01`).toLocaleDateString("en-GB", {
//       month: "long",
//       year: "numeric",
//     });

//   return (
//     <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
//       {/* ================= HEADER ================= */}
//       <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
//         <TableBody>
//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold", fontSize: "16px" }}>
//               JDIT SOFTWARE SOLUTIONS PVT. LTD.
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center" }}>
//               301 A, 3rd Floor, Sai Villa Commercial Apartment,
//               Hadapsar, Pune - 411028
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold" }}>
//               Salary Slip {formatMonthYear(month)}
//             </TableCell>
//           </TableRow>

//           {/* ================= EMPLOYEE INFO ================= */}
//           <TableRow>
//             <TableCell sx={CELL}>Employee Name</TableCell>
//             <TableCell sx={CELL}>{employeeName}</TableCell>
//             <TableCell sx={CELL}>Employee ID</TableCell>
//             <TableCell sx={CELL}>{employeeId}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}>Gender<br />DOJ</TableCell>
//             <TableCell sx={CELL}>{gender}<br />{formatDate(doj)}</TableCell>
//             <TableCell sx={CELL}>Department<br />PAN</TableCell>
//             <TableCell sx={CELL}>{department}<br />{pan}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}>Designation</TableCell>
//             <TableCell sx={CELL}>{designation}</TableCell>
//             <TableCell sx={CELL}>DOB</TableCell>
//             <TableCell sx={CELL}>{dob}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}>Mode</TableCell>
//             <TableCell sx={CELL}>
//               Bank Name: {mode}<br />
//               Account No: {accountNo}
//             </TableCell>
//             <TableCell sx={CELL}>Working days</TableCell>
//             <TableCell sx={CELL}>{workdays}</TableCell>
//           </TableRow>

//           {/* ================= EARNINGS & DEDUCTIONS ================= */}
//           <TableRow>
//             <TableCell sx={{ ...CELL, fontWeight: "bold", textAlign: "center" }}>Earnings</TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold", textAlign: "center" }}>Amount</TableCell>
          
//           </TableRow>

//           {earnings.map((e, i) => (
//             <TableRow key={i}>
//               <TableCell sx={CELL}>{e.label}</TableCell>
//               <TableCell sx={CELL}>{formatCurrency(e.value)}</TableCell>
//               <TableCell sx={CELL}>{deductions[i]?.label || ""}</TableCell>
//               <TableCell sx={CELL}>
//                 {deductions[i] ? formatCurrency(deductions[i].value) : ""}
//               </TableCell>
//             </TableRow>
//           ))}

//           <TableRow>
//             <TableCell sx={CELL}><b>Total</b></TableCell>
//             <TableCell sx={CELL}><b>{formatCurrency(totalEarnings)}</b></TableCell>
//             <TableCell sx={CELL}><b>Total Deduction</b></TableCell>
//             <TableCell sx={CELL}><b>{formatCurrency(totalDeductions)}</b></TableCell>
//           </TableRow>

//           <TableRow>
//             {earnings.map((e, i) => (
//             <TableRow key={i}>
//               <TableCell sx={CELL}>{deductions[i]?.label || ""}</TableCell>
//               <TableCell sx={CELL}>
//                 {deductions[i] ? formatCurrency(deductions[i].value) : ""}
//               </TableCell>
//             </TableRow>
//           ))}
//           </TableRow>

//           <TableRow>
//               <TableCell sx={{ ...CELL, fontWeight: "bold", textAlign: "center" }}>Deductions</TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold", textAlign: "center" }}>Amount</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Net Pay</b></TableCell>
//             <TableCell sx={CELL}><b>{formatCurrency(netPay)}</b></TableCell>
//             <TableCell sx={CELL} />
//             <TableCell sx={CELL} />
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>In Words</b></TableCell>
//             <TableCell colSpan={3} sx={CELL}>
//               {numberToWords(netPay)}
//             </TableCell>
//           </TableRow>

//           {/* ================= SIGNATURE & STAMP ================= */}
//           <TableRow>
//             <TableCell colSpan={1} sx={{ ...CELL, height: "120px", textAlign: "center" }}>
//               {company.stamp && <img src={company.stamp} alt="Stamp" height="90" />}
//             </TableCell>
//             <TableCell colSpan={1} sx={{ ...CELL, height: "120px", textAlign: "center" }}>

//             </TableCell>
//             <TableCell colSpan={2} sx={{ ...CELL, height: "120px", textAlign: "center" }}>
//               {company.signature && (
//                 <>
//                   <img src={company.signature} alt="Signature" height="60" />
//                   <Typography sx={{ fontSize: "13px", fontWeight: "bold", mt: 1 }}>
//                     Signature
//                   </Typography>
//                 </>
//               )}
//             </TableCell>
//           </TableRow>

//         </TableBody>
//       </Table>



//     </A4Layout>
//   );
// };

// export default JDITSalarySlip;

//     <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
//       <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
//         <TableBody>

//           {/* HEADER */}
//           <TableRow>
//             <TableCell
//               colSpan={4}
//               sx={{
//                 ...CELL,
//                 textAlign: "center",
//                 fontWeight: "bold",
//                 fontSize: "14px",
//               }}
//             >
//               JDIT SOFTWARE SOLUTIONS PVT. LTD.
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell
//               colSpan={4}
//               sx={{
//                 ...CELL,
//                 textAlign: "center",
//                 fontSize: "11px",
//               }}
//             >
//               <b>
//                 301 A, 3rd Floor, Sai Villa Commercial Apartment, Sr. No. 166, Malwadi Road, 
// Opp. Sahyadri Hospital, Hadapsar, Pune - 411028.

//               </b>
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell
//               colSpan={4}
//               sx={{ ...CELL, fontSize: "10px", textAlign: "center" }}
//             >
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
//             <TableCell sx={CELL}><b>Department <br/> Pan Number</b></TableCell>
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

//           {/* SMALLER GAP */}
//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, height: 18 }} />
//           </TableRow>

//           {/* DEDUCTIONS */}
//           <TableRow>
//   <TableCell sx={CELL}><b>Deductions</b></TableCell>
//   <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
//     <b>Amount</b>
//   </TableCell>
// </TableRow>

// {deductions
//   .filter(d => d.label !== "PF")
//   .map((d, i) => (
//     <TableRow key={i}>
//       <TableCell
//         sx={{
//           ...CELL,
//           fontWeight:
//             d.label === "PT" || d.label === "Other Deduction"
//               ? "bold"
//               : "normal",
//         }}
//       >
//         {d.label}
//       </TableCell>

//       <TableCell
//         colSpan={3}
//         sx={{ ...CELL, textAlign: "center" }}
//       >
//         {formatCurrency(d.value)}
//       </TableCell>
//     </TableRow>
// ))}

// {/* <TableRow>
//   <TableCell sx={CELL}><b>Total Deduction</b></TableCell>
//   <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
//     {formatCurrency(totalDeductions)}
//   </TableCell>
// </TableRow> */}

// <TableRow>
//   <TableCell sx={CELL}><b>Total Deduction</b></TableCell>
//   <TableCell colSpan={3} sx={{ ...CELL, textAlign: "center" }}>
//     {formatCurrency(totalDeductions)}
//   </TableCell>
// </TableRow>


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

//         {/* SIGNATURE */}
//         <TableBody>
//           <TableRow>
//             <TableCell sx={{ ...CELL, width: "33%", height: "110px", textAlign: "center" }}>
//               {company.stamp && <img src={company.stamp} alt="Stamp" height="100" />}
//             </TableCell>

//             <TableCell sx={{ ...CELL, width: "34%", height: "110px" }} />

//             <TableCell colSpan={2} sx={{ ...CELL, width: "33%", height: "110px", textAlign: "center" }}>
//               {company.signature && (
//                 <>
//                   <img src={company.signature} alt="Signature" height="50" />
//                   <Typography fontWeight="bold" fontSize="11px">
//                     Signature
//                   </Typography>
//                 </>
//               )}
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>

//       {/* NOTES */}
//      <Box sx={{ mt: 2 }}>
//   <Typography fontWeight="bold" fontSize="11px">
//     Note:
//   </Typography>

//   <Typography fontSize="9px">
//     1. Please note that all information regarding remuneration is confidential
//     and should not be disclosed.
//   </Typography>

//   <Typography fontSize="9px">
//     2. TDS, PF, LWF, and ESIC or any other statutory liabilities (if any) falling
//     within your salary structure would be liable for deduction as per the
//     statutory norms.
//   </Typography>

//   <Typography fontSize="9px">
//     3. Gratuity will be paid out to the employee as per the Payment of Gratuity
//     Act, 1972.
//   </Typography>

//   <Typography fontSize="9px">
//     4. The employee will be paid monthly/quarterly/yearly allowances/PLI/Bonus
//     (if any) only if he/she remains in the service of the company at the end of
//     that period.
//   </Typography>

//   <Typography fontSize="9px">
//     5. Any incentive/allowance earned during the service will be added to the
//     CTC and is subject to Income Tax regulations and other laws applicable from
//     time to time.
//   </Typography>

//   <Typography fontSize="9px">
//     6. Medical insurance policy valued at Rs.12,000/- must be submitted within
//     30 days of joining. If failed, the same value will be deducted from the CTC
//     as per the JDITBS policy.
//   </Typography>

//   <Typography fontSize="9px">
//     7. JDIT Software Solutions may review at any time and/or restructure the
//     compensation package.
//   </Typography>
// </Box>

//     </A4Layout>
//   );
// };

// export default JDITSalarySlip;









// import React, { useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";
// import {
//   calculateSalaryBreakdown,
//   getProfessionalTax,
//   numberToWords,
//   formatCurrency,
// } from "../../../../utils/salaryCalculations";

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
// const CELL = {
//   border: "1px solid #000",
//   padding: "6px",
//   fontSize: "13px",
// };

// const JDITSalarySlip = ({ company, data }) => {
//   if (!company || !data) return null;

//   const {
//     month = "2025-02",
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
//     ctc = 480000,
//   } = data;

//   /* ================= CALCULATIONS ================= */
//   const breakdown = useMemo(() => calculateSalaryBreakdown(ctc), [ctc]);

//   const earnings = [
//     { label: "BASIC", value: breakdown.monthly.basicSalary },
//     { label: "HRA", value: breakdown.monthly.hra },
//     { label: "DEARNESS ALLOWANCE", value: 1500 },
//     { label: "SPECIAL ALLOWANCE", value: breakdown.monthly.specialAllowance },
//     { label: "FOOD ALLOWANCE", value: 2000 },
//     { label: "MISC ALLOWANCE", value: 1500 },
//   ];

//   const deductions = [
//     {
//       label: "PT",
//       value: getProfessionalTax(month, breakdown.monthly.totalEarnings),
//     },
//     { label: "Other Deduction", value: 2000 },
//   ];

//   const totalEarnings = earnings.reduce((s, e) => s + e.value, 0);
//   const totalDeductions = deductions.reduce((s, d) => s + d.value, 0);
//   const netPay = totalEarnings - totalDeductions;

//   const formatMonthYear = (month) =>
//     new Date(`${month}-01`).toLocaleDateString("en-GB", {
//       month: "long",
//       year: "numeric",
//     });

//   return (
//     <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
//       {/* ================= HEADER ================= */}
//       <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
//         <TableBody>
//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold", fontSize: "16px" }}>
//               JDIT SOFTWARE SOLUTIONS PVT. LTD.
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center" }}>
//               301 A, 3rd Floor, Sai Villa Commercial Apartment,
//               Hadapsar, Pune - 411028
//             </TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold" }}>
//               Salary Slip {formatMonthYear(month)}
//             </TableCell>
//           </TableRow>

//           {/* ================= EMPLOYEE INFO ================= */}
//           <TableRow>
//             <TableCell sx={CELL}>Employee Name</TableCell>
//             <TableCell sx={CELL}>{employeeName}</TableCell>
//             <TableCell sx={CELL}>Employee ID</TableCell>
//             <TableCell sx={CELL}>{employeeId}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}>Gender<br />DOJ</TableCell>
//             <TableCell sx={CELL}>{gender}<br />{formatDate(doj)}</TableCell>
//             <TableCell sx={CELL}>Department<br />PAN</TableCell>
//             <TableCell sx={CELL}>{department}<br />{pan}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}>Designation</TableCell>
//             <TableCell sx={CELL}>{designation}</TableCell>
//             <TableCell sx={CELL}>DOB</TableCell>
//             <TableCell sx={CELL}>{dob}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}>Mode</TableCell>
//             <TableCell sx={CELL}>
//               Bank Name: {mode}<br />
//               Account No: {accountNo}
//             </TableCell>
//             <TableCell sx={CELL}>Working days</TableCell>
//             <TableCell sx={CELL}>{workdays}</TableCell>
//           </TableRow>

//           {/* ================= EARNINGS & DEDUCTIONS ================= */}
//           <TableRow>
//             <TableCell sx={{ ...CELL, fontWeight: "bold", textAlign: "center" }}>Earnings</TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold", textAlign: "center" }}>Amount</TableCell>
          
//           </TableRow>

//           {earnings.map((e, i) => (
//             <TableRow key={i}>
//               <TableCell sx={CELL}>{e.label}</TableCell>
//               <TableCell sx={CELL}>{formatCurrency(e.value)}</TableCell>
//               <TableCell sx={CELL}>{deductions[i]?.label || ""}</TableCell>
//               <TableCell sx={CELL}>
//                 {deductions[i] ? formatCurrency(deductions[i].value) : ""}
//               </TableCell>
//             </TableRow>
//           ))}

//           <TableRow>
//             <TableCell sx={CELL}><b>Total</b></TableCell>
//             <TableCell sx={CELL}><b>{formatCurrency(totalEarnings)}</b></TableCell>
//             <TableCell sx={CELL}><b>Total Deduction</b></TableCell>
//             <TableCell sx={CELL}><b>{formatCurrency(totalDeductions)}</b></TableCell>
//           </TableRow>

//           <TableRow>
//             {earnings.map((e, i) => (
//             <TableRow key={i}>
//               <TableCell sx={CELL}>{deductions[i]?.label || ""}</TableCell>
//               <TableCell sx={CELL}>
//                 {deductions[i] ? formatCurrency(deductions[i].value) : ""}
//               </TableCell>
//             </TableRow>
//           ))}
//           </TableRow>

//           <TableRow>
//               <TableCell sx={{ ...CELL, fontWeight: "bold", textAlign: "center" }}>Deductions</TableCell>
//             <TableCell sx={{ ...CELL, fontWeight: "bold", textAlign: "center" }}>Amount</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>Net Pay</b></TableCell>
//             <TableCell sx={CELL}><b>{formatCurrency(netPay)}</b></TableCell>
//             <TableCell sx={CELL} />
//             <TableCell sx={CELL} />
//           </TableRow>

//           <TableRow>
//             <TableCell sx={CELL}><b>In Words</b></TableCell>
//             <TableCell colSpan={3} sx={CELL}>
//               {numberToWords(netPay)}
//             </TableCell>
//           </TableRow>

//           {/* ================= SIGNATURE & STAMP ================= */}
//           <TableRow>
//             <TableCell colSpan={1} sx={{ ...CELL, height: "120px", textAlign: "center" }}>
//               {company.stamp && <img src={company.stamp} alt="Stamp" height="90" />}
//             </TableCell>
//             <TableCell colSpan={1} sx={{ ...CELL, height: "120px", textAlign: "center" }}>

//             </TableCell>
//             <TableCell colSpan={2} sx={{ ...CELL, height: "120px", textAlign: "center" }}>
//               {company.signature && (
//                 <>
//                   <img src={company.signature} alt="Signature" height="60" />
//                   <Typography sx={{ fontSize: "13px", fontWeight: "bold", mt: 1 }}>
//                     Signature
//                   </Typography>
//                 </>
//               )}
//             </TableCell>
//           </TableRow>

//         </TableBody>
//       </Table>



//     </A4Layout>
//   );
// };

// export default JDITSalarySlip;
