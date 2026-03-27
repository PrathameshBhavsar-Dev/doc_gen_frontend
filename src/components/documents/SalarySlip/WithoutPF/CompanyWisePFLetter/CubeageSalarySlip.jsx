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
    if (n < 100000) return iWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + inWords(n % 100000) : "");
    return "";
  };
  return inWords(Math.round(num)) + " Rupees Only";
};

const fmt = (n) =>
  Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ── Cell style helper ────────────────────────────────────── */
const C = (extra = {}) => ({
  border: "1px solid #000",
  padding: "6px 10px",
  fontSize: "13px",
  color: "#000",
  wordBreak: "break-word",
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
  const specialAllowance = round2(earnedCTC * 0.06);

  // Basic gets the remaining amount so that the sum strictly equals earnedCTC
  const basic = round2(earnedCTC) - (hra + da + lta + allow + specialAllowance);
  const totalEarnings = basic + hra + da + lta + allow + specialAllowance;

  /* ── deductions ── */
  const pt = getProfessionalTax(data.month, totalEarnings);
  const otherDed = parseFloat(data.otherDeduction || 2000);
  const totalDed = round2(pt + otherDed);

  const netPay = round2(totalEarnings - totalDed);

  // Standardized Column Widths
  const w1 = "35%";
  const w2 = "15%";
  const w3 = "35%";
  const w4 = "15%";

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
      {/* ── HEADER ── */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, px: 4, py: 2, borderBottom: "2px solid #000", mb: 1 }}>
        <Box sx={{ flexShrink: 0 }}>
          {company.logo
            ? <img src={company.logo} alt="logo" style={{ height: 70 }} />
            : header
              ? <img src={header} alt="header" style={{ height: 70 }} />
              : null}
        </Box>
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
        <Typography fontWeight="bold" textAlign={"center"} fontSize="14px" mb={1.5}>
          Salary Statement for The Month of {monthLabel}
        </Typography>

        <Table
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #000",
            tableLayout: "fixed",
          }}
        >
          <TableBody>

            {/* Name | Designation */}
            <TableRow>
              <TableCell colSpan={2} sx={C({ fontWeight: "bold", height: "40px", width: "50%" })}>
                Name: {data.mrms || ""} {name}
              </TableCell>
              <TableCell colSpan={2} sx={C({ fontWeight: "bold", height: "40px", width: "50%" })}>
                Designation: {desg}
              </TableCell>
            </TableRow>

            {/* Emp Code | Total Days */}
            <TableRow>
              <TableCell sx={C({ width: w1 })}>Employee Code:</TableCell>
              <TableCell sx={C({ width: w2, textAlign: "center" })}>{empId}</TableCell>
              <TableCell sx={C({ width: w3 })}>Total Days:</TableCell>
              <TableCell sx={C({ width: w4, textAlign: "center" })}>{totalDays}</TableCell>
            </TableRow>

            {/* DOJ | Days Present */}
            <TableRow>
              <TableCell sx={C()}>Date Of Joining:</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{doj}</TableCell>
              <TableCell sx={C()}>Days Present:</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{workingDays}</TableCell>
            </TableRow>

            {/* DOB | PAN */}
            <TableRow>
              <TableCell sx={C()}>Date Of Birth:</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{dob}</TableCell>
              <TableCell sx={C()}>PAN NO:</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{pan}</TableCell>
            </TableRow>

            {/* Earnings & Deductions Headers */}
            <TableRow>
              <TableCell sx={C({ fontWeight: "bold" })}>Specifications(A)</TableCell>
              <TableCell sx={C({ fontWeight: "bold", textAlign: "center" })}>Amount</TableCell>
              <TableCell sx={C({ fontWeight: "bold" })}>Deductions(B)</TableCell>
              <TableCell sx={C({ fontWeight: "bold", textAlign: "center" })}>Amount</TableCell>
            </TableRow>

            {/* row 1: Basic | P.T. */}
            <TableRow>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}>Basic</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none", textAlign: "right" })}>{fmt(basic)}</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}>P.T.</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none", textAlign: "right" })}>{fmt(pt)}</TableCell>
            </TableRow>

            {/* row 2: H.R.A. | Other Deductions */}
            <TableRow>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}>H.R.A.</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none", textAlign: "right" })}>{fmt(hra)}</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}>Other Deductions</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none", textAlign: "right" })}>{fmt(otherDed)}</TableCell>
            </TableRow>

            {/* row 3: D.A. | empty */}
            <TableRow>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}>D.A.</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none", textAlign: "right" })}>{fmt(da)}</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}></TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}></TableCell>
            </TableRow>

            {/* row 4: L.T.A. | empty */}
            <TableRow>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}>L.T.A.</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none", textAlign: "right" })}>{fmt(lta)}</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}></TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}></TableCell>
            </TableRow>

            {/* row 5: ALLOWANCE | empty */}
            <TableRow>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}>ALLOWANCE (Shift+Skill)</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none", textAlign: "right" })}>{fmt(allow)}</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}></TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}></TableCell>
            </TableRow>

            {/* row 6: Special Allowance | empty */}
            <TableRow>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}>SPECIAL ALLOWANCE</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none", textAlign: "right" })}>{fmt(specialAllowance)}</TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}></TableCell>
              <TableCell sx={C({ borderTop: "none", borderBottom: "none" })}></TableCell>
            </TableRow>

            {/* Grand Total A & Total Deductions */}
            <TableRow>
              <TableCell sx={C({ fontWeight: "bold" })}>Grand Total "A"</TableCell>
              <TableCell sx={C({ fontWeight: "bold", textAlign: "right" })}>{fmt(totalEarnings)}</TableCell>
              <TableCell sx={C({ fontWeight: "bold" })}>Total Deductions</TableCell>
              <TableCell sx={C({ fontWeight: "bold", textAlign: "right" })}>{fmt(totalDed)}</TableCell>
            </TableRow>

            {/* Net Salary (Gross) */}
            <TableRow sx={{ height: "60px" }}>
              <TableCell colSpan={2} sx={{ borderLeft: "1px solid #000", borderRight: "1px solid #000", borderBottom: "none", borderTop: "none" }}></TableCell>
              <TableCell sx={C({ fontWeight: "bold" })}>Net Salary</TableCell>
              <TableCell sx={C({ fontWeight: "bold", textAlign: "right" })}>{fmt(totalEarnings)}</TableCell>
            </TableRow>

            {/* Issued Salary (Net Pay) */}
            <TableRow sx={{ height: "40px" }}>
              <TableCell colSpan={2} sx={{ borderLeft: "1px solid #000", borderRight: "1px solid #000", borderBottom: "none", borderTop: "none" }}></TableCell>
              <TableCell sx={C({ fontWeight: "bold" })}>Issued Salary</TableCell>
              <TableCell sx={C({ fontWeight: "bold", textAlign: "right" })}>{fmt(netPay)}</TableCell>
            </TableRow>

            {/* Balance Salary */}
            <TableRow sx={{ height: "40px" }}>
              <TableCell colSpan={2} sx={{ borderLeft: "1px solid #000", borderRight: "1px solid #000", borderBottom: "1px solid #000", borderTop: "none" }}></TableCell>
              <TableCell sx={C({ fontWeight: "bold" })}>Balance Salary</TableCell>
              <TableCell sx={C({ textAlign: "right", border: "1px solid #000" })}>
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