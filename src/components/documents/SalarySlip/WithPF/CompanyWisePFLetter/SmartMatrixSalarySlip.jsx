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
import {
  formatCurrency,
  // getProfessionalTax,
} from "../../../../../utils/salaryCalculations";
import signImg from "../../../../../assets/images/smartmatrix/Smartmatrix_sign.png";

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

  /* ================= SALARY LOGIC (MONTHLY DIRECT) ================= */

  const monthlyGross = round2(data.totalSalary);

  /* Earnings Percentages */
  const PERCENT = {
    basic: 0.48,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
  };

  // ================= STATIC PF =================
  const pfAllowance = 3750;

  // ================= FIXED PERCENTAGES =================
  const hra = round2(monthlyGross * 0.18);
  const da = round2(monthlyGross * 0.12);
  const special = round2(monthlyGross * 0.16);
  const food = round2(monthlyGross * 0.06);

  // ================= ADJUSTED BASIC =================
  const basic = round2(
    monthlyGross - (hra + da + special + food + pfAllowance),
  );

  /* Total Earnings */
  const totalEarning = monthlyGross;

  /* ================= DEDUCTIONS ================= */

  const PF = 3750;
  const pt = monthName.toLowerCase() === "february" ? 300 : 200;
  const otherDeduction = 2000;

  const totalDed = round2(PF + pt + otherDeduction);

  /* ================= NET PAY ================= */

  const netPay = round2(monthlyGross - totalDed);
  const netInWords = numberToWords(netPay);
  /* ===== ASSETS ===== */
  const stamp = company?.stamp || "";
  // const sign = company?.sign || signature;

  return (
    <A4Page
      headerSrc={company?.header}
      footerSrc={company?.footer}
      watermarkSrc={company?.watermark}
      contentTop="35mm"
      contentBottom="30mm"
    >
      <TableContainer
        component={Paper}
        sx={{
          border: "1.5px solid black",
          borderRadius: 0,
          mt: "20mm",
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
              <TableCell
                colSpan={4}
                align="center"
                sx={{ fontWeight: "bold", fontSize: "12px !important" }}
              >
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
              <TableCell>
                {bankMode}
                <br></br>
                {data.accountNo}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Working Days</TableCell>
              <TableCell>{totalWorkdays}</TableCell>
            </TableRow>

            {/* Earnings & Deduction Section */}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>BASIC</TableCell>
              <TableCell align="center">{formatCurrency(basic)}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PF</TableCell>
              <TableCell align="center">{formatCurrency(PF)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>HRA</TableCell>
              <TableCell align="center">{formatCurrency(hra)}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PT</TableCell>
              <TableCell align="center">{formatCurrency(pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                DEARNESS ALLOWANCE
              </TableCell>
              <TableCell align="center">{formatCurrency(da)}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Other Deduction</TableCell>
              <TableCell align="center">
                {formatCurrency(otherDeduction)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                SPECIAL ALLOWANCE
              </TableCell>
              <TableCell align="center">{formatCurrency(special)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>FOOD ALLOWANCE</TableCell>
              <TableCell align="center">{formatCurrency(food)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>PF ALLOWANCE</TableCell>
              <TableCell align="center">
                {formatCurrency(pfAllowance)}
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            {/* Totals */}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total Earnings</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {formatCurrency(totalEarning)}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Deduction</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {formatCurrency(totalDed)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Net Pay</TableCell>
              <TableCell
                align="center"
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
                  <Box
                    component="img"
                    src={stamp}
                    sx={{
                      width: 115,
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
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
