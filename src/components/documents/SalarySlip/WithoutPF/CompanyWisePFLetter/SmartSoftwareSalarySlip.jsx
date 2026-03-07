import React, { useMemo } from "react";
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

import { formatCurrency, getProfessionalTax } from "../../../../../utils/salaryCalculations";

/* 🔢 Number to Words (Indian System) */
const numberToWords = (num = 0) => {
  if (!num) return "Zero Rupees Only";

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const inWords = (n) => {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + inWords(n % 100000) : "");
    return inWords(Math.floor(n / 10000000)) + " Crore";
  };

  return `${inWords(Math.round(num))} Rupees Only`;
};

const SmartSoftwareSalarySlip = ({ company = {}, data = {} }) => {
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
    accountNo = "-",
    workdays = "",
    month = "2025-02",
    totalSalary = 0,
    otherDeduction = 2000,
  } = data;

  /* ===== MONTH FORMAT ===== */
  const [year, monthNum] = month.split("-");
  const monthName = new Date(year, monthNum - 1).toLocaleString("en-IN", { month: "long" });
  const salaryMonth = `${monthName} ${year}`;

  /* ===== SALARY CALCULATION (WITHOUT PF) ===== */
  const {
    basic,
    hra,
    dearnessAllowance,
    specialAllowance,
    foodAllowance,
    miscAllowance,
    professionalTax,
    totalEarnings,
    totalDeductions,
    netPay,
  } = useMemo(() => {
    const gross = round2(Number(totalSalary || 0));

    // Earnings % calculation
    const basic = round2(gross * 0.40);
    const hra = round2(gross * 0.18);
    const dearnessAllowance = round2(gross * 0.12);
    const specialAllowance = round2(gross * 0.16);
    const foodAllowance = round2(gross * 0.06);
    const miscAllowance = round2(gross * 0.08);

    const totalEarnings = basic + hra + dearnessAllowance + specialAllowance + foodAllowance + miscAllowance;

    // Deductions (NO PF)
    const professionalTax = getProfessionalTax(month, totalEarnings);
    const totalDeductions = round2(professionalTax + Number(otherDeduction || 0));

    const netPay = round2(totalEarnings - totalDeductions);

    return {
      basic,
      hra,
      dearnessAllowance,
      specialAllowance,
      foodAllowance,
      miscAllowance,
      professionalTax,
      totalEarnings,
      totalDeductions,
      netPay,
    };
  }, [totalSalary, month, otherDeduction]);

  /* ===== EARNINGS & DEDUCTIONS ARRAY ===== */
  const earnings = [
    { label: "BASIC", value: basic },
    { label: "HRA", value: hra },
    { label: "CONVEYANCE ALLOWANCE", value: dearnessAllowance },
    { label: "SPECIAL ALLOWANCE", value: specialAllowance },
    { label: "FOOD ALLOWANCE", value: foodAllowance },
    { label: "MISC ALLOWANCE", value: miscAllowance },
  ];

  const deductions = [
    { label: "PT", value: professionalTax },
    { label: "Other Deduction", value: otherDeduction },
  ];

  const CELL = {
    border: "1px solid #000",
    padding: "6px",
    fontSize: "12pt",
  };

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer} watermarkSrc={company.watermark}>
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid black",      // Outer table border
          borderRadius: 0,
          mt: "5mm",
          boxShadow: "none",
          "& .MuiTable-root": {
            borderCollapse: "collapse",   // Ensure borders are crisp
          },
          "& .MuiTableCell-root": {
            border: "1px solid black",    // Add border to every cell
          },
        }}
      >
        <Table size="small">
          <TableBody>

            {/* HEADER */}
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold", fontSize: "14pt" }}>{company.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold" }}>{company.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold" }}>Salary Slip {salaryMonth}</TableCell>
            </TableRow>

            {/* EMPLOYEE DETAILS */}
            <TableRow>
              <TableCell sx={CELL}><b>Employee Name</b></TableCell>
              <TableCell sx={CELL}>{employeeName}</TableCell>
              <TableCell sx={CELL}>Employee ID</TableCell>
              <TableCell sx={CELL}>{employeeId}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={CELL}><b>Gender</b></TableCell>
              <TableCell sx={CELL}>{gender}</TableCell>
              <TableCell sx={CELL}><b>Department</b></TableCell>
              <TableCell sx={CELL}>{department}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={CELL}><b>Designation</b></TableCell>
              <TableCell sx={CELL}>{designation}</TableCell>
              <TableCell sx={CELL}>DOJ</TableCell>
              <TableCell sx={CELL}>{doj}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={CELL}><b>DOB</b></TableCell>
              <TableCell sx={CELL}>{dob}</TableCell>
              <TableCell sx={CELL}>PAN</TableCell>
              <TableCell sx={CELL}>{pan}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={CELL}><b>Mode</b></TableCell>
              <TableCell sx={CELL}>Bank: {mode} <br />Account: {accountNo}</TableCell>
              <TableCell sx={CELL}>Working Days</TableCell>
              <TableCell sx={CELL}>{workdays}</TableCell>
            </TableRow>

            {/* SALARY HEADERS */}
            <TableRow>
              <TableCell sx={CELL}><b>Earnings</b></TableCell>
              <TableCell sx={CELL}><b>Amount</b></TableCell>
              <TableCell sx={CELL}><b>Deductions</b></TableCell>
              <TableCell sx={CELL}><b>Amount</b></TableCell>
            </TableRow>

            {earnings.map((e, i) => (
              <TableRow key={i}>
                <TableCell sx={CELL}>{e.label}</TableCell>
                <TableCell sx={CELL} align="right">{formatCurrency(e.value)}</TableCell>
                <TableCell sx={CELL}>{deductions[i]?.label || ""}</TableCell>
                <TableCell sx={CELL} align="right">{deductions[i] ? formatCurrency(deductions[i].value) : ""}</TableCell>
              </TableRow>
            ))}

            {/* TOTALS */}
            <TableRow>
              <TableCell sx={CELL}><b>Total</b></TableCell>
              <TableCell sx={CELL} align="right">{formatCurrency(totalEarnings)}</TableCell>
              <TableCell sx={CELL}><b>Total Deduction</b></TableCell>
              <TableCell sx={CELL} align="right">{formatCurrency(totalDeductions)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={CELL}><b>Net Pay</b></TableCell>
              <TableCell sx={CELL} align="right">{formatCurrency(netPay)}</TableCell>
              <TableCell sx={CELL} />
              <TableCell sx={CELL} />
            </TableRow>

            <TableRow>
              <TableCell sx={CELL}><b>In Words</b></TableCell>
              <TableCell colSpan={3} sx={CELL}>{numberToWords(netPay)}</TableCell>
            </TableRow>

            {/* SIGNATURE */}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell align="center">
                {company?.stamp && <img src={company.stamp} height={80} alt="Stamp" />}
              </TableCell>
              <TableCell align="center">
                {company?.signature && <img src={company.signature} height={50} alt="Signature" />}
                <Typography fontWeight="bold">Signature</Typography>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </A4Page>
  );
};

export default SmartSoftwareSalarySlip;