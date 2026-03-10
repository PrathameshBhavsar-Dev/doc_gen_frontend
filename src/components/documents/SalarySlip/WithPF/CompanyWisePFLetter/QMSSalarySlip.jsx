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
    //   misc: data.misc,
      pt: data.pt,
    };
  }

  // 🔹 AUTO calculation (CORRECTED)
  const basic = +(total * 0.48).toFixed(2);
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
    pf: data.pf ?? 3750,
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
  padding: "6px",
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
  { label: "PF", value: salary.pf }, // ✅ Keep PF here (display only)
];

 const deductions = [
  { label: "PF", value: salary.pf },
  { label: "PT", value: salary.pt },
  { label: "OTHER DEDUCTION", value: data.otherDeduction || 2000 },
];

const totalEarning = earnings.reduce(
  (sum, e) =>
    e.label === "PF"
      ? sum   // ❌ Do NOT count PF
      : sum + Number(e.value || 0),
  0
);
const totalDeduction = deductions.reduce(
  (sum, d) => sum + Number(d.value || 0),
  0
);

const netPay = totalEarning - totalDeduction;
  const maxRows = Math.max(earnings.length, deductions.length);

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
        <Box mt={-10} mb={10}>
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

          <TableRow>
            <TableCell colSpan={4} sx={{ ...cell, textAlign: "center" }}>
              {company.address}
            </TableCell>
          </TableRow>

        <TableRow>
  <TableCell
    colSpan={4}
    sx={{ ...cell, ...bold, textAlign: "center" }}
  >
    Salary Slip {formatMonthYear(data.month)}
  </TableCell>
</TableRow>

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>Employee Name</TableCell>
            <TableCell sx={cell} colSpan={3}>
              {safe(data.mrms)} {safe(data.employeeName)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>Gender <br/> DOJ</TableCell>
            <TableCell sx={cell} colSpan={3}>
              {safe(data.gender)} <br/> {formatDate(data.doj)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>Designation</TableCell>
            <TableCell sx={cell} colSpan={3}>
              {safe(data.designation)}
            </TableCell>
          </TableRow>

           <TableRow>
             <TableCell sx={{ ...cell, ...bold }}>Mode</TableCell>
             <TableCell sx={cell} colSpan={3}>
           {/* Bank Account No:  {safe(data.accountNo)}<br/> */}
             Bank Name :{safe (data.mode)} {safe(data.bankName)}<br/>
              Bank Account No:  {safe(data.accountNo)}
             </TableCell>
           </TableRow>

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>Employee ID</TableCell>
            <TableCell sx={cell} colSpan={3}>
              {safe(data.employeeId)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>Department</TableCell>
            <TableCell sx={cell} colSpan={3}>
              {safe(data.department)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>PAN Number</TableCell>
            <TableCell sx={cell} colSpan={3}>
              {safe(data.pan)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>DOB</TableCell>
            <TableCell sx={cell} colSpan={3}>
              {formatDate(data.dob)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>Working Days</TableCell>
            <TableCell sx={cell} colSpan={3}>
              {safe(data.workdays)}
            </TableCell>
          </TableRow>

          {/* ---------- Earnings / Deductions ---------- */}
          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>Earnings</TableCell>
            <TableCell sx={{ ...cell, ...bold }}>Amount</TableCell>
            <TableCell sx={{ ...cell, ...bold }}>Deductions</TableCell>
            <TableCell sx={{ ...cell, ...bold }}>Amount</TableCell>
          </TableRow>

          {Array.from({ length: maxRows }).map((_, i) => (
            <TableRow key={i}>
              <TableCell sx={{ ...cell, ...bold }}>
                {earnings[i]?.label || ""}
              </TableCell>
              <TableCell sx={cell}>
                {numberFormat(earnings[i]?.value)}
              </TableCell>
              <TableCell sx={{ ...cell, ...bold }}>
                {deductions[i]?.label || ""}
              </TableCell>
              <TableCell sx={cell}>
                {numberFormat(deductions[i]?.value)}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>Total</TableCell>
            <TableCell sx={{ ...cell, ...bold }}>
              {numberFormat(totalEarning)}
            </TableCell>
            <TableCell sx={{ ...cell, ...bold }}>Total Deduction</TableCell>
            <TableCell sx={{ ...cell, ...bold }}>
              {numberFormat(totalDeduction)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ ...cell, ...bold }}>Net Pay</TableCell>
            <TableCell sx={{ ...cell, ...bold }} colSpan={3}>
              {numberFormat(netPay)}
            </TableCell>
          </TableRow>

          <TableRow>
  <TableCell sx={{ ...cell, ...bold }}>In Words</TableCell>
  <TableCell sx={cell} colSpan={3}>
    {numberToWords(Math.round(netPay))} Rs Only
  </TableCell>
</TableRow>


          <TableRow>
            <TableCell
              colSpan={2}
              sx={{ ...cell, height: 80, textAlign: "center" }}
            >
              {company.stamp && (
                <img src={company.stamp} height={75} alt="Stamp" />
              )}
            </TableCell>
            <TableCell
              colSpan={2}
              sx={{ ...cell, textAlign: "center" }}
            >
              {company.signature && (
                <img src={company.signature} height={50} alt="Signature" />
              )}
              <Typography fontSize={12} fontWeight="bold">
                Signature
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default QuickSalarySlip;
