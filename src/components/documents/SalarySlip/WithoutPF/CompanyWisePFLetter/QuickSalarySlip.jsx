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

  // Check whether the selected month is February
  const date =
    typeof data.month === "string" && data.month.length === 7
      ? new Date(`${data.month}-01`)
      : new Date(data.month);

  const isFebruary = !isNaN(date) && date.getMonth() === 1;

  const ptAmount = isFebruary ? 300 : 200;

  // Manual fallback
  if (!total) {
    return {
      basic: data.basic,
      hra: data.hra,
      da: data.da,
      special: data.special,
      food: data.food,
      misc: data.misc,
      pt: ptAmount,
    };
  }

  // AUTO calculation
  const basic = +(total * 0.40).toFixed(2);
  const hra = +(total * 0.18).toFixed(2);
  const da = +(total * 0.12).toFixed(2);
  const special = +(total * 0.16).toFixed(2);
  const food = +(total * 0.06).toFixed(2);

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
    pt: ptAmount,
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
              Bank Name : {safe(data.bankName)}
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