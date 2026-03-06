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

/* 🔢 Number to Words (Indian system – up to Crores) */
const numberToWords = (num = 0) => {
  if (!num) return "Zero Rupees Only";

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
    return inWords(Math.floor(n / 10000000)) + " Crore";
  };

  return `${inWords(Math.round(num))} Rupees Only`;
};

const NimbjaSalarySlip = ({ company = {}, data = {} }) => {
  const round2 = (num) => Number(num.toFixed(2));

  /* ===== EMPLOYEE DETAILS ===== */
  const {
    employeeName = "-",
    employeeId = "-",
    gender = "-",
    department = "-",
    designation = "-",
    doj = "-",
    dob = "-",
    pan = "-",
    mode = "Bank Transfer",
    workdays = "",
    month = "2025-02",
    totalSalary = 0,
    otherDeduction = 500,
  } = data;

  /* ===== MONTH FORMAT ===== */
  const [year, monthNum] = month.split("-");
  const monthName = new Date(year, monthNum - 1).toLocaleString("en-IN", {
    month: "long",
  });
  const salaryMonth = `${monthName} ${year}`;

  /* ===== MONTHLY SALARY LOGIC (PERCENTAGE-WISE) ===== */

  const monthlyGross = round2(Number(totalSalary || 0));

  // Percentages (TOTAL = 100%)
  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.06,
    food: 0.16,
    misc: 0.08,
  };

  // Monthly breakup
  const basic = round2(monthlyGross * PERCENT.basic);
  const hra = round2(monthlyGross * PERCENT.hra);
  const conveyance = round2(monthlyGross * PERCENT.da); // DA
  const special = round2(monthlyGross * PERCENT.special);
  const food = round2(monthlyGross * PERCENT.food);
  const others = round2(monthlyGross * PERCENT.misc);

  // Totals
  const totalEarning = basic + hra + conveyance + special + food + others;

  // Deductions
  const pt = getProfessionalTax(month, totalEarning);
  const totalDeduction = round2(pt + Number(otherDeduction || 0));
  const netPay = round2(totalEarning - totalDeduction);

  /* ===== ASSETS (company driven) ===== */
  const stamp = company?.stamp || "";
  const sign = company?.sign || signature;

  return (
    <A4Page
      headerSrc={company?.header}
      footerSrc={company?.footer}
      watermarkSrc={company?.watermark}
      contentTop="35mm"
      contentBottom="45mm"
    >
      <TableContainer
        component={Paper}
        sx={{
          width: "95%",
          margin: "0 auto",
          border: "1px solid #000",
          borderRadius: 0,
          boxShadow: "none",
          "& .MuiTableCell-root": {
            border: "1px solid #000",
            padding: "5px 8px",
            fontFamily: "Bahnschrift",
            fontSize: "10.5pt",
          },
        }}
      >
        <Table size="small">
          <colgroup>
            <col style={{ width: "22%" }} /> {/* Label */}
            <col style={{ width: "28%" }} /> {/* Value */}
            <col style={{ width: "28%" }} /> {/* Label */}
            <col style={{ width: "22%" }} /> {/* Value */}
          </colgroup>
          <TableBody>
            {/* ===== COMPANY HEADER ===== */}
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{ fontWeight: "bold", fontSize: "14pt" }}
              >
                {company?.name || "Nimbja Technologies Pvt. Ltd."}
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
                Salary Slip {salaryMonth}
              </TableCell>
            </TableRow>
            {/* ===== EMPLOYEE INFO ===== */}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell>{employeeName}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
              <TableCell>{employeeId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "none" }}>
                Gender
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>{gender}</TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "none" }}>
                Department
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>{department}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", borderTop: "none" }}>
                DOJ
              </TableCell>
              <TableCell sx={{ borderTop: "none" }}>{doj}</TableCell>
              <TableCell sx={{ fontWeight: "bold", borderTop: "none" }}>
                PAN
              </TableCell>
              <TableCell sx={{ borderTop: "none" }}>{pan}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Designation</TableCell>
              <TableCell>{designation}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>DOB</TableCell>
              <TableCell>{dob}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Mode</TableCell>
              <TableCell>{mode}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Working Days</TableCell>
              <TableCell>{workdays}</TableCell>
            </TableRow>
            {/* ===== EARNINGS / DEDUCTIONS ===== */}
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
              <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                Basic
              </TableCell>
              <TableCell align="right">{formatCurrency(basic)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Bouquet Of Benefits
              </TableCell>
              <TableCell align="right">{formatCurrency(hra)}</TableCell>
              <TableCell>Professional Tax</TableCell>
              <TableCell align="right">{formatCurrency(pt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                HRA
              </TableCell>
              <TableCell align="right">{formatCurrency(conveyance)}</TableCell>
              <TableCell whiteSpace="nowrap">Other Deduction</TableCell>
              <TableCell align="right">
                {formatCurrency(otherDeduction)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>City Allowance</TableCell>
              <TableCell align="right">{formatCurrency(food)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Superannuation Fund
              </TableCell>
              <TableCell align="right">{formatCurrency(special)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Performance Bonus
              </TableCell>
              <TableCell align="right">{formatCurrency(others)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

            {/* ===== TOTALS ===== */}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total Earnings</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {formatCurrency(totalEarning)}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Deduction</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {formatCurrency(totalDeduction)}
              </TableCell>
            </TableRow>
            {/* ===== NET PAY ===== */}
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
              <TableCell sx={{ fontWeight: "bold", fontStyle: "Bahnschrift" }}>
                In Words:
              </TableCell>
              <TableCell colSpan={3} sx={{ fontStyle: "Bahnschrift" }}>
                {numberToWords(netPay)}
              </TableCell>
            </TableRow>
            {/* ===== SIGNATURE ===== */}
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell align="center">
                {stamp && (
                  <Box
                    component="img"
                    src={stamp}
                    sx={{ width: 115, objectFit: "contain" }}
                  />
                )}
              </TableCell>
              <TableCell align="center">
                {sign && (
                  <Box
                    component="img"
                    src={sign}
                    sx={{ width: 140, height: 60, objectFit: "contain", mb: 1 }}
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

export default NimbjaSalarySlip;
