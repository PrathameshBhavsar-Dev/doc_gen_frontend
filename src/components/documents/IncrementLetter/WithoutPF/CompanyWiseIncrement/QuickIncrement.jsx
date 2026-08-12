// import React from "react";
// import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, } from "@mui/material";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-US", {
//       month: "long",
//       day: "2-digit",
//       year: "numeric",
//     })
//     : "";

// /* ================= HELPERS ================= */
// const round2 = (num) => Number(num.toFixed(2));

// // auto detect monthly / annual
// const normalizeAnnualCTC = (ctc) => {
//   const value = Number(ctc || 0);
//   return value < 100000 ? value * 12 : value;
// };

// /* ================= INCREMENT CALC ================= */
// const calculateIncrement = (currentCTC, incrementPercentage) => {
//   const annualCTC = normalizeAnnualCTC(currentCTC);
//   const incrementAmount = round2(
//     (annualCTC * Number(incrementPercentage || 0)) / 100
//   );
//   const newCTC = round2(annualCTC + incrementAmount);
//   return { newCTC };
// };

// /* ================= A4 PAGE ================= */
// const A4Page = ({ children, company }) => (
//   <Box
//     sx={{
//       width: "210mm",
//       minHeight: "297mm",
//       background: "#fff",
//       fontFamily: "Verdana, Geneva, sans-serif",
//       mx: "auto",
//       pageBreakAfter: "always",
//     }}
//   >
//     {company?.header && (
//       <img src={company.header} alt="header" style={{ width: "100%" }} />
//     )}
//     {children}
//   </Box>
// );

// /* ================= PAGE 1 – INCREMENT LETTER ================= */
// const IncrementLetterPage = ({ company, data }) => {
//   const { employeeName, designation, issueDate, effectiveDate, newCTC } = data;

//   return (
//     <A4Page company={company}>
//       <Box sx={{ px: "28mm", pt: "20mm" }}>
//         <Typography align="center" fontSize={18} fontWeight="bold" mb={4} mt={-6}>
//           Appraisal Letter
//         </Typography>

//         <Box textAlign="right" mb={7}>
//           <Typography fontSize={14}>{formatDate(issueDate)}</Typography>
//         </Box>

//         <Typography fontSize={13} mb={3}>
//           Dear <b>{employeeName}</b>,
//         </Typography>

//         <Typography fontSize={13} lineHeight={1.8} mb={3} align="justify">
//           Congratulations on your promotion to the position of{" "}
//           <b>{designation}</b>.Along with your new
//           responsibilities, we are please to offer you a salary increment.
//           Effective from <b>{formatDate(effectiveDate)}</b>, your revised annual
//           Cost to Company (CTC) will be{" "}
//           <b>₹ {newCTC.toLocaleString("en-IN")}</b>.
//         </Typography>



//         <Typography fontSize={13} mb={4} align="justify">
//           Your promotion is a reflection of your exceptional performance and leadership abilities in your previous
//           role. We are confident that you will continue to excel in your new position and we look forward to seeing you
//           take on new challenges.
//         </Typography>

//         <Typography fontSize={13} mb={4} align="justify">
//           Thank you for your hard work and commitment to Quick Management Services Pvt Ltd. We are excited
//           to see you grow further on your career with us.
//         </Typography>

//         <Typography fontSize={13} mb={2}>
//           Yours Sincerely,
//         </Typography>

//         {/* ✅ SIGN + STAMP FIX */}
//         <Box display="flex" alignItems="center" gap={3} mb={1}>
//           {company?.satish_sign && (
//             <img
//               src={company.satish_sign}
//               alt="Signature"
//               style={{ height: 55, objectFit: "contain" }}
//             />
//           )}
//           {company?.stamp && (
//             <img
//               src={company.stamp}
//               alt="Stamp"
//               style={{ height: 85, objectFit: "contain" }}
//             />
//           )}
//         </Box>

//         <Typography fontSize={13} fontWeight="bold">
//           {company?.ceoName}
//         </Typography>
//         <Typography fontSize={13} fontWeight="bold">CEO & Managing Director</Typography>
//       </Box>
//     </A4Page>
//   );
// };

// /* ================= PAGE 2 – SALARY ANNEXURE ================= */
// const SalaryAnnexurePage = ({ company, data }) => {
//   const rows = data.salaryComponents;

//   const monthlyGross = rows
//     .filter(r => r.name !== "Provident Fund (PF)")
//     .reduce((sum, r) => sum + r.monthly, 0);

//   const annualCTC = rows
//     .filter(r => r.name !== "Provident Fund (PF)")
//     .reduce((sum, r) => sum + r.annual, 0);

//   return (
//     <A4Page company={company}>
//       <Box sx={{ px: "28mm", pt: "30mm" }}>
//         <Typography align="center" fontSize={14} fontWeight="bold" mb={3}>
//           Salary Annexure
//         </Typography>

//         <Table sx={{ border: "1px solid #000", "& th, & td": { border: "1px solid #000", fontSize: 12, p: "6px", }, }}
//         >
//           <TableHead sx={{ backgroundColor: "#1fb5e9" }}>
//             <TableRow>
//               <TableCell align="center"><b>Monthly Component</b></TableCell>
//               <TableCell align="center"><b>Amount (Rs.)</b></TableCell>
//               {/* <TableCell align="center"><b>Yearly Component</b></TableCell> */}
//               <TableCell align="center"><b>Amount (Rs.)</b></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {rows.map((r, i) => (
//               <TableRow key={i}>
//                 <TableCell align="center">{r.name}</TableCell>

//                 <TableCell align="center">
//                   {Math.round(r.monthly).toLocaleString("en-IN")}
//                 </TableCell>

//                 <TableCell align="center">
//                   {Math.round(r.annual).toLocaleString("en-IN")}
//                 </TableCell>
//               </TableRow>
//             ))}

//             <TableRow sx={{ backgroundColor: "#1fb5e9" }}>
//               <TableCell align="center">
//                 <b>Monthly Gross</b>
//               </TableCell>

//               <TableCell align="center">
//                 <b>{Math.round(monthlyGross).toLocaleString("en-IN")}</b>
//               </TableCell>

//               <TableCell align="center">
//                 <b>{Math.round(annualCTC).toLocaleString("en-IN")}</b>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </Box>
//     </A4Page>
//   );
// };

// /* ================= MAIN ================= */

// const QuickIncrement = ({ company, data }) => {

//   /* 1️⃣ Calculate New CTC */
//   // The form provides 'newCTC' directly for Increment Letters
//   const annualCTC = normalizeAnnualCTC(data.newCTC);

//   /* 2️⃣ Generate Salary Breakup */
//   const generateSalaryBreakup = (annualCTC) => {

//     // ✅ Monthly CTC
//     const monthlyCTC = annualCTC / 12;

//     // ✅ Percentages total = 100%
//     const percentages = {
//       basic: 0.4,
//       hra: 0.18,
//       da: 0.12,
//       special: 0.16,
//       food: 0.06,
//       misc: 0.08
//     };

//     // ✅ Monthly calculations (rounded)
//     const basic = round2(monthlyCTC * percentages.basic);
//     const hra = round2(monthlyCTC * percentages.hra);
//     const da = round2(monthlyCTC * percentages.da);
//     const special = round2(monthlyCTC * percentages.special);
//     const food = round2(monthlyCTC * percentages.food);
//     const misc = round2(monthlyCTC * percentages.misc);

//     // ✅ Annual = Monthly × 12 (important)
//     const basicAnnual = round2(basic * 12);
//     const hraAnnual = round2(hra * 12);
//     const daAnnual = round2(da * 12);
//     const specialAnnual = round2(special * 12);
//     const foodAnnual = round2(food * 12);
//     const miscAnnual = round2(misc * 12);


//     return [
//       { name: "Basic Salary", monthly: basic, annual: basicAnnual },
//       { name: "House Rent Allowance", monthly: hra, annual: hraAnnual },
//       { name: "Dearness Allowance", monthly: da, annual: daAnnual },
//       { name: "Special Allowance", monthly: special, annual: specialAnnual },
//       { name: "Food Allowance", monthly: food, annual: foodAnnual },
//       { name: "Misc Allowance", monthly: misc, annual: miscAnnual }
//     ];
//   };

//   const salaryComponents = generateSalaryBreakup(annualCTC);

//   const finalData = {
//     ...data,
//     newCTC: annualCTC,
//     salaryComponents
//   };

//   return (
//     <>
//       <IncrementLetterPage company={company} data={finalData} />
//       <SalaryAnnexurePage company={company} data={finalData} />
//     </>
//   );
// };

// export default QuickIncrement;

import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

/* ---------- Month Year Formatter ---------- */
const formatMonthYear = (value) => {
  if (!value) return "";

  const date =
    typeof value === "string" && value.length === 7
      ? new Date(`${value}-01`)
      : new Date(value);

  if (isNaN(date)) return value;

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

/* ---------- Utils ---------- */
const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-GB") : "";

const numberFormat = (num) =>
  Number(num || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  });

const safe = (val) => (val !== undefined && val !== null ? val : "");

/* ---------- Salary Auto + Manual Fallback Logic (FIXED ONLY) ---------- */
const getSalaryBreakup = (data) => {
  const total = Number(data.totalSalary || 0);

  // 🔹 Manual fallback (UNCHANGED)
  if (!total) {
    return {
      basic: data.basic,
      hra: data.hra,
      da: data.da,
      special: data.special,
      food: data.food,
      misc: data.misc,
      pt: data.pt,
    };
  }

  // 🔹 AUTO calculation (CORRECTED)
  const basic = +(total * 0.40).toFixed(2);
  const hra = +(total * 0.18).toFixed(2);
  const da = +(total * 0.12).toFixed(2);
  const special = +(total * 0.16).toFixed(2);
  const food = +(total * 0.06).toFixed(2);

  // 🔥 BALANCE → no loss, no extra
  const misc = +(
    total - (basic + hra + da + special + food)
  ).toFixed(2);

  return {
    basic,
    hra,
    da,
    special,
    food,
    misc,
    pt: data.pt ?? 200,
  };
};

/* ---------- Number to Words (English – INR) ---------- */
const numberToWords = (num) => {
  if (num === 0) return "Zero";

  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen",
  ];

  const b = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety",
  ];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
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
    return (
      inWords(Math.floor(n / 10000000)) +
      " Crore" +
      (n % 10000000 ? " " + inWords(n % 10000000) : "")
    );
  };

  return inWords(num).trim();
};

/* ---------- Styles ---------- */
const cell = {
  border: "1px solid #000",
  // padding: "6px",
  padding: "0px 12px 12px 12px",
  fontSize: "13px",
};

const bold = { fontWeight: "bold" };

const QuickSalarySlip = ({ data = {}, company = {} }) => {
  const salary = getSalaryBreakup(data);

  const earnings = [
    { label: "BASIC", value: salary.basic },
    { label: "HRA", value: salary.hra },
    { label: "DEARNESS ALLOWANCE", value: salary.da },
    { label: "SPECIAL ALLOWANCE", value: salary.special },
    { label: "FOOD ALLOWANCE", value: salary.food },
    { label: "MISC ALLOWANCE", value: salary.misc },
  ];

  const deductions = [
    { label: "PT", value: salary.pt },
    { label: "OTHER DEDUCTION", value: data.otherDeduction || 2000 },
  ];

  const uniqueDeductions = deductions.filter((deduction, index, array) => {
    const label = deduction?.label?.trim();
    const value = Math.trunc(Number(deduction?.value || 0));

    if (!label || value === 0) {
      return false;
    }

    return (
      index ===
      array.findIndex(
        (d) =>
          d?.label?.trim() === label &&
          Math.trunc(Number(d?.value || 0)) === value
      )
    );
  });

  const totalEarning = earnings.reduce(
    (sum, e) => sum + Number(e.value || 0),
    0
  );

  const totalDeduction = deductions.reduce(
    (sum, d) => sum + Number(d.value || 0),
    0
  );

  const netPay = totalEarning - totalDeduction;
  const maxRows = Math.max(earnings.length, deductions.length);
  const designation = data.currentDesignation ?? data.position ?? "";

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        p: "20mm",
        fontFamily: "Cambria, serif",
        color: "#000",
      }}
    >
      {/* 🔹 UI CODE EXACT SAME – NOT TOUCHED */}

      {/* ---------- HEADER IMAGE ---------- */}
      {company.header && (
        <Box mt={-10} mb={3}>
          <img
            src={company.header}
            alt="Company Header"
            style={{ width: "100%", display: "block" }}
          />
        </Box>
      )}

      {/* ---------- TABLE ---------- */}
      <Table sx={{ border: "1px solid #000" }}>
        <TableBody>

          {/* ================= COMPANY NAME ================= */}

          <TableRow>
            <TableCell
              colSpan={4}
              sx={{
                ...cell,
                ...bold,
                textAlign: "center",
                fontSize: 16,
                textTransform: "uppercase",
              }}
            >
              {company.name}
            </TableCell>
          </TableRow>

          {/* ================= COMPANY ADDRESS ================= */}

          <TableRow>
            <TableCell
              colSpan={4}
              sx={{
                ...cell,
                textAlign: "center",
              }}
            >
              {company.address}
            </TableCell>
          </TableRow>

          {/* ================= SALARY SLIP ================= */}

          <TableRow>
            <TableCell
              colSpan={4}
              sx={{
                ...cell,
                ...bold,
                textAlign: "center",
              }}
            >
              Salary Slip {formatMonthYear(data.month)}
            </TableCell>
          </TableRow>

          {/* ================= EMPLOYEE NAME ================= */}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>
              Employee Name
            </TableCell>

            <TableCell sx={cell} colSpan={3}>
              {safe(data.mrms)} {safe(data.employeeName)}
            </TableCell>
          </TableRow>

          {/* ================= GENDER / DOJ ================= */}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>
              Gender
              <br />
              DOJ
            </TableCell>

            <TableCell sx={cell} colSpan={3}>
              {safe(data.gender)}
              <br />
              {formatDate(data.doj)}
            </TableCell>
          </TableRow>

          {/* ================= DESIGNATION ================= */}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>
              Designation
            </TableCell>

            <TableCell sx={cell} colSpan={3}>
              {safe(designation)}
            </TableCell>
          </TableRow>

          {/* ================= MODE ================= */}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>
              Mode
            </TableCell>

            <TableCell sx={cell} colSpan={3}>
              Bank Name : {safe(data.mode)} {safe(data.bankName)}
              <br />
              Bank Account No: {safe(data.accountNo)}
            </TableCell>
          </TableRow>

          {/* ================= EMPLOYEE ID ================= */}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>
              Employee ID
            </TableCell>

            <TableCell sx={cell} colSpan={3}>
              {safe(data.employeeId)}
            </TableCell>
          </TableRow>

          {/* ================= DEPARTMENT ================= */}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>
              Department
            </TableCell>

            <TableCell sx={cell} colSpan={3}>
              {safe(data.department)}
            </TableCell>
          </TableRow>

          {/* ================= PAN ================= */}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>
              PAN Number
            </TableCell>

            <TableCell sx={cell} colSpan={3}>
              {safe(data.pan)}
            </TableCell>
          </TableRow>

          {/* ================= DOB ================= */}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>
              DOB
            </TableCell>

            <TableCell sx={cell} colSpan={3}>
              {formatDate(data.dob)}
            </TableCell>
          </TableRow>

          {/* ================= WORKING DAYS ================= */}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>
              Working Days
            </TableCell>

            <TableCell sx={cell} colSpan={3}>
              {safe(data.workdays)}
            </TableCell>
          </TableRow>

          {/* ================= EARNINGS / DEDUCTIONS HEADER ================= */}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>
              Earnings
            </TableCell>

            <TableCell sx={{ ...cell, ...bold }}>
              Amount
            </TableCell>

            <TableCell sx={{ ...cell, ...bold }}>
              Deductions
            </TableCell>

            <TableCell sx={{ ...cell, ...bold }}>
              Amount
            </TableCell>
          </TableRow>

          {/* ================= EARNINGS / DEDUCTIONS ROWS ================= */}

          {Array.from({
            length: Math.max(maxRows, uniqueDeductions.length),
          }).map((_, i) => {

            const earning = earnings[i];
            const deduction = uniqueDeductions[i];

            const earningValue = Math.trunc(
              Number(earning?.value || 0)
            );

            const deductionValue = Math.trunc(
              Number(deduction?.value || 0)
            );

            return (
              <TableRow key={i}>

                {/* ---------- EARNING NAME ---------- */}

                <TableCell sx={{ ...cell, ...bold }}>
                  {earning?.label || ""}
                </TableCell>

                {/* ---------- EARNING AMOUNT ---------- */}

                <TableCell sx={cell}>
                  {earning
                    ? earningValue.toLocaleString("en-IN")
                    : ""}
                </TableCell>

                {/* ---------- DEDUCTION NAME ---------- */}

                <TableCell sx={{ ...cell, ...bold }}>
                  {deduction?.label || ""}
                </TableCell>

                {/* ---------- DEDUCTION AMOUNT ---------- */}

                <TableCell sx={cell}>
                  {deduction
                    ? deductionValue.toLocaleString("en-IN")
                    : ""}
                </TableCell>

              </TableRow>
            );
          })}

          {/* ================= TOTAL ================= */}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>
              Total
            </TableCell>

            <TableCell sx={{ ...cell, ...bold }}>
              {Math.trunc(totalEarning || 0).toLocaleString("en-IN")}
            </TableCell>

            <TableCell sx={{ ...cell, ...bold }}>
              Total Deduction
            </TableCell>

            <TableCell sx={{ ...cell, ...bold }}>
              {Math.trunc(totalDeduction || 0).toLocaleString("en-IN")}
            </TableCell>
          </TableRow>

          {/* ================= NET PAY ================= */}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>
              Net Pay
            </TableCell>

            <TableCell
              sx={{ ...cell, ...bold }}
              colSpan={3}
            >
              {Math.trunc(netPay || 0).toLocaleString("en-IN")}
            </TableCell>
          </TableRow>

          {/* ================= AMOUNT IN WORDS ================= */}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>
              In Words
            </TableCell>

            <TableCell sx={cell} colSpan={3}>
              {numberToWords(Math.round(netPay))} Rs Only
            </TableCell>
          </TableRow>

          {/* ================= STAMP / SIGNATURE ================= */}

          <TableRow>

            {/* ---------- STAMP ---------- */}

            <TableCell
              colSpan={2}
              sx={{
                ...cell,
                height: 100,
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              {company.stamp && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={company.stamp}
                    style={{
                      height: "90px",
                      width: "auto",
                    }}
                    alt="Stamp"
                  />
                </Box>
              )}
            </TableCell>

            {/* ---------- SIGNATURE ---------- */}

            <TableCell
              colSpan={2}
              sx={{
                ...cell,
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              {company.signature && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={company.signature}
                    style={{
                      height: "75px",
                      width: "auto",
                    }}
                    alt="Signature"
                  />

                  <Typography
                    fontSize={12}
                    fontWeight="bold"
                  >
                    Signature
                  </Typography>
                </Box>
              )}
            </TableCell>

          </TableRow>

        </TableBody>
      </Table>
    </Box>
  );
};

export default QuickSalarySlip;