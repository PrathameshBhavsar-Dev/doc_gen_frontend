import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { getProfessionalTax } from "../../../../../utils/salaryCalculations";

/* ── Number to Words ─────────────────────────────────────── */
const numberToWords = (num) => {
  if (!num || num === 0) return "Zero Rupees Only";
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen",
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + inWords(n % 100000) : "");
    return "";
  };
  return inWords(Math.round(num)) + " Rupees Only";
};

const fmt = (n) =>
  Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ── Cell style helper ────────────────────────────────────── */
const C = (extra = {}) => ({
  border: "1px solid #aaa",
  padding: "6px 10px",
  fontSize: "13px",
  ...extra,
});

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const CubeageSalarySlip = ({ data = {}, company = {} }) => {
  const header = data?.header || company?.header;

  /* ── employee info ── */
  const name = data.employeeName || "";
  const empId = data.employeeId || "";
  const gender = data.gender || "";
  const dept = data.department || "";

  /* ── Format Date Helper ── */
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    if (!year || !month || !day) return dateStr;
    return `${day}/${month}/${year}`;
  };

  const doj = formatDate(data.doj);
  const dob = formatDate(data.dob);
  const pan = data.pan || "";
  const desg = data.designation || "";
  const mode = data.mode || "";
  const accountNo = data.accountNumber || "";

  /* ── month label ── */
  const monthLabel = (() => {
    if (!data.month) return "";
    const [year, monthNum] = data.month.split("-");
    const d = new Date(year, monthNum - 1);
    return `${d.toLocaleString("default", { month: "long" })} ${year}`;
  })();

  const getTotalDaysInMonth = (monthStr) => {
    if (!monthStr) return 31;
    const [year, monthNum] = monthStr.split("-");
    return new Date(year, monthNum, 0).getDate();
  };

  const totalDays = getTotalDaysInMonth(data.month);
  const workingDays = data.workdays || totalDays;

  /* ── salary calculations ── */
  const round2 = (n) => Math.floor(n);

  const monthlyCTC = parseFloat(data.totalSalary || 0);

  // Calculate proportional earned CTC based on working days
  const earnedCTC = (monthlyCTC * workingDays) / totalDays;

  // Calculate other components first (rounded down)
  const hra = round2(earnedCTC * 0.18);
  const da = round2(earnedCTC * 0.16);
  const lta = round2(earnedCTC * 0.12);
  const allow = round2(earnedCTC * 0.08);
  const pfAllowance = round2(earnedCTC * 0.06);

  // Basic gets the remaining amount so that the sum strictly equals earnedCTC
  const basic = round2(earnedCTC) - (hra + da + lta + allow + pfAllowance);
  const totalEarnings = basic + hra + da + lta + allow + pfAllowance;

  /* ── deductions ── */
  const pt = getProfessionalTax(data.month, totalEarnings);
  const otherDed = parseFloat(data.otherDeduction || 2000);
  const totalDed = round2(pt + otherDed);

  const netPay = round2(totalEarnings - totalDed);

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "white",
        fontFamily: "'Calibri', 'Arial', sans-serif",
        position: "relative",
      }}
    >
      {/* ── HEADER: Logo top-left | Company name + details on right ── */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, px: 4, py: 2, borderBottom: "2px solid #000", mb: 1 }}>
        {/* Logo — top left */}
        <Box sx={{ flexShrink: 0 }}>
          {company.logo
            ? <img src={company.logo} alt="logo" style={{ height: 70 }} />
            : header
              ? <img src={header} alt="header" style={{ height: 70 }} />
              : null}
        </Box>

        {/* Company Name (heading) + details */}
        <Box>
          <Typography fontWeight="bold" fontSize="18px">
            {company.name || company.companyName}
          </Typography>
          {company.address && (
            <Typography fontSize="11px">{company.address}</Typography>
          )}
          {company.phone && (
            <Typography fontSize="11px">
              <strong>Contact No:</strong> {company.phone}
            </Typography>
          )}
          {company.email && (
            <Typography fontSize="11px">
              <strong>Email:</strong> {company.email}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ px: 6, py: 2 }}>
        {/* TITLE */}
        <Typography fontWeight="bold" textAlign={"center"} fontSize="14px" mb={1.5}>
          Salary Statement for The Month of {monthLabel}
        </Typography>

        {/* ── EMPLOYEE DETAILS TABLE ── */}
        <Table
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            "& td": {
              border: "1px solid #aaa",
              padding: "6px 10px",
              fontSize: "13px",
            },
          }}
        >
          <TableBody>

            {/* ───── EMPLOYEE DETAILS ───── */}

            {/* Name | Designation */}
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: "bold", height: "40px" }}>Name: {data.mrms || ""} {name}</TableCell>
              <TableCell colSpan={2} sx={{ fontWeight: "bold", height: "40px" }}>Designation: {desg}</TableCell>
            </TableRow>

            {/* Emp Code | Total Days */}
            <TableRow>
              <TableCell>Employee Code:</TableCell>
              <TableCell align="center">{empId}</TableCell>
              <TableCell>Total Days:</TableCell>
              <TableCell align="center">{totalDays}</TableCell>
            </TableRow>

            {/* DOJ | Days Present */}
            <TableRow>
              <TableCell>Date Of Joining:</TableCell>
              <TableCell align="center">{doj}</TableCell>
              <TableCell>Days Present:</TableCell>
              <TableCell align="center">{workingDays}</TableCell>
            </TableRow>

            {/* DOB | PAN */}
            <TableRow>
              <TableCell>Date Of Birth:</TableCell>
              <TableCell align="center">{dob}</TableCell>
              <TableCell>PAN NO:</TableCell>
              <TableCell align="center">{pan}</TableCell>
            </TableRow>

            {/* ───── EARNINGS & DEDUCTIONS HEADER ───── */}

            <TableRow >
              <TableCell sx={{ fontWeight: "bold", width: "30%" }}>Specifications(A)</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "20%", textAlign: "center" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "30%" }}>Deductions(B)</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "20%", textAlign: "center" }}>Amount</TableCell>
            </TableRow>

            {/* Salary Rows */}

            <TableRow>
              <TableCell>Basic</TableCell>
              <TableCell align="center">{fmt(basic)}</TableCell>
              <TableCell>P.T.</TableCell>
              <TableCell align="center">{fmt(pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>H.R.A.</TableCell>
              <TableCell align="center">{fmt(hra)}</TableCell>
              <TableCell>Other Deductions</TableCell>
              <TableCell align="center">{fmt(otherDed)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>D.A.</TableCell>
              <TableCell align="center">{fmt(da)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

            <TableRow>
              <TableCell>L.T.A.</TableCell>
              <TableCell align="center">{fmt(lta)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

            <TableRow>
              <TableCell>ALLOWANCE (Shift+Skill)</TableCell>
              <TableCell align="center">{fmt(allow)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

            {/* PF Allowance */}
            <TableRow>
              <TableCell>PF Allowance</TableCell>
              <TableCell align="center">{fmt(pfAllowance)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

            {/* Grand Total A & Total Deductions */}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Grand Total "A"</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>{fmt(totalEarnings)}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Deductions</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>{fmt(totalDed)}</TableCell>
            </TableRow>

            {/* Net Salary */}
            <TableRow sx={{ height: "80px" }}>
              <TableCell colSpan={2} rowSpan={3}></TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Net Salary</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>{fmt(totalEarnings)}</TableCell>
            </TableRow>

            {/* Issued Salary */}
            <TableRow sx={{ height: "40px" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Issued Salary</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>{fmt(netPay)}</TableCell>
            </TableRow>

            {/* Balance Salary */}
            <TableRow sx={{ height: "50px" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Balance Salary</TableCell>
              <TableCell align="center">
                {parseFloat(data.balanceSalary || 0) === 0 ? "Nil" : fmt(parseFloat(data.balanceSalary || 0))}
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>


        <Typography mt={3} fontSize="12px" fontStyle="italic">
          *Computer Generated Salary Slip. No Signature Required
        </Typography>
      </Box>
    </Box>
  );
};

export default CubeageSalarySlip;