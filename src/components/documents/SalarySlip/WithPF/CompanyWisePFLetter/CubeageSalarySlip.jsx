import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { getProfessionalTax } from "../../../../../utils/salaryCalculations";

/* ── Number to Words ───────────────────────── */
const numberToWords = (num) => {
  if (!num || num === 0) return "Zero Rupees Only";
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
    "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty",
    "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
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

const C = (extra = {}) => ({
  border: "1px solid #000",
  padding: "0px 12px 12px 12px",
  fontSize: "12.5px",
  verticalAlign: "middle",
  ...extra,
});

const W = { label: "30%", amt: "20%", dlabel: "30%", damt: "20%" };

/* ============================================================ */

const CubeageSalarySlip = ({ data = {}, company = {} }) => {
  const header = data?.header || company?.header;

  const name = data.employeeName || "";
  const mrms = data.mrms || "";
  const empId = data.employeeId || "";
  const desg = data.designation || "";

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
  const presentDays = data.workdays || totalDays;


  /* ── Salary ── */
  const round0 = (n) => Math.round(Number(n) || 0);

  const monthlyCTC = parseFloat(data.totalSalary || 0);

  // Calculate proportional earned CTC based on present days
  const earnedCTC = (monthlyCTC * presentDays) / totalDays;

  // Calculate other components, rounded down
  const hra = round0(earnedCTC * 0.18);
  const da = round0(earnedCTC * 0.12);
  const lta = round0(earnedCTC * 0.16);
  const allow = round0(earnedCTC * 0.06);
  const pfAllowance = 3750;

  // Basic carries the remaining amount so that all positive components exactly sum to earnedCTC
  const basic = round0(earnedCTC) - (hra + da + lta + allow + pfAllowance);

  const grandTotalA = basic + hra + da + lta + allow + pfAllowance;

  /* ── Deductions — fixed constants ── */
  const pfDeduction = 3750;
  const pt = getProfessionalTax(data.month, grandTotalA);
  const otherDed = 2000;
  const totalDeductions = round0(pfDeduction + pt + otherDed);

  const netSalary = grandTotalA;
  const issuedSalary = round0(netSalary - totalDeductions);
  const balanceSalary = parseFloat(data.balanceSalary || 0);

  return (
    <Box sx={{ width: "210mm", minHeight: "297mm", backgroundColor: "white", fontFamily: "'Calibri', 'Arial', sans-serif" }}>

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

      <Box sx={{ px: 4, py: 1 }}>
        {/* Title */}
        <Typography fontWeight="bold" textAlign={"center"} fontSize="14px" mb={1.5}>
          Salary Statement for The Month of {monthLabel}
        </Typography>

        <Table sx={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <TableBody>

            {/* Name | Designation */}
            <TableRow>
              <TableCell colSpan={2} sx={C({ fontWeight: "bold", height: "40px" })}>Name: {mrms} {name}</TableCell>
              <TableCell colSpan={2} sx={C({ fontWeight: "bold", height: "40px" })}>Designation: {desg}</TableCell>
            </TableRow>

            {/* Emp Code | Total Days */}
            <TableRow>
              <TableCell sx={C()}>Employee Code:</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{empId}</TableCell>
              <TableCell sx={C()}>Total Days:</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{totalDays}</TableCell>
            </TableRow>

            {/* DOJ | Days Present */}
            <TableRow>
              <TableCell sx={C()}>Date Of Joining:</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{doj}</TableCell>
              <TableCell sx={C()}>Days Present:</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{presentDays}</TableCell>
            </TableRow>

            {/* DOB | PAN */}
            <TableRow>
              <TableCell sx={C()}>Date Of Birth:</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{dob}</TableCell>
              <TableCell sx={C()}>PAN NO:</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{pan}</TableCell>
            </TableRow>

            {/* Column Headers */}
            <TableRow>
              <TableCell sx={C({ fontWeight: "bold", width: W.label })}>Specifications(A)</TableCell>
              <TableCell sx={C({ fontWeight: "bold", width: W.amt, textAlign: "center" })}>Amount</TableCell>
              <TableCell sx={C({ fontWeight: "bold", width: W.dlabel })}>Deductions(B)</TableCell>
              <TableCell sx={C({ fontWeight: "bold", width: W.damt, textAlign: "center" })}>Amount</TableCell>
            </TableRow>

            {/* Basic | P.F. */}
            <TableRow>
              <TableCell sx={C()}>Basic</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{fmt(basic)}</TableCell>
              <TableCell sx={C()}>P.F.</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{fmt(pfDeduction)}</TableCell>
            </TableRow>

            {/* HRA | P.T. */}
            <TableRow>
              <TableCell sx={C()}>H.R.A.</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{fmt(hra)}</TableCell>
              <TableCell sx={C()}>P.T.</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{fmt(pt)}</TableCell>
            </TableRow>

            {/* DA | Other Deductions */}
            <TableRow>
              <TableCell sx={C()}>D.A.</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{fmt(da)}</TableCell>
              <TableCell sx={C()}>Other Deductions</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{fmt(otherDed)}</TableCell>
            </TableRow>

            {/* LTA | empty */}
            <TableRow>
              <TableCell sx={C()}>L.T.A.</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{fmt(lta)}</TableCell>
              <TableCell sx={C()}></TableCell>
              <TableCell sx={C()}></TableCell>
            </TableRow>

            {/* Allowance | empty */}
            <TableRow>
              <TableCell sx={C()}>ALLOWANCE (Shift+Skill)</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{fmt(allow)}</TableCell>
              <TableCell sx={C()}></TableCell>
              <TableCell sx={C()}></TableCell>
            </TableRow>

            {/* PF */}
            <TableRow>
              <TableCell sx={C()}>PF</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>{fmt(pfAllowance)}</TableCell>
              <TableCell sx={C()}></TableCell>
              <TableCell sx={C()}></TableCell>
            </TableRow>

            {/* Grand Total A & Total Deductions */}
            <TableRow>
              <TableCell sx={C({ fontWeight: "bold" })}>Grand Total "A"</TableCell>
              <TableCell sx={C({ textAlign: "center", fontWeight: "bold" })}>{fmt(grandTotalA)}</TableCell>
              <TableCell sx={C({ fontWeight: "bold" })}>Total Deductions</TableCell>
              <TableCell sx={C({ textAlign: "center", fontWeight: "bold" })}>{fmt(totalDeductions)}</TableCell>
            </TableRow>

            {/* Net Salary */}
            <TableRow sx={{ height: "80px" }}>
              <TableCell colSpan={2} rowSpan={3} sx={C()}></TableCell>
              <TableCell sx={C({ fontWeight: "bold" })}>Net Salary</TableCell>
              <TableCell sx={C({ textAlign: "center", fontWeight: "bold" })}>{fmt(netSalary)}</TableCell>
            </TableRow>

            {/* Issued Salary */}
            <TableRow sx={{ height: "40px" }}>
              <TableCell sx={C({ fontWeight: "bold" })}>Issued Salary</TableCell>
              <TableCell sx={C({ textAlign: "center", fontWeight: "bold" })}>{fmt(issuedSalary)}</TableCell>
            </TableRow>

            {/* Balance Salary */}
            <TableRow sx={{ height: "50px" }}>
              <TableCell sx={C({ fontWeight: "bold" })}>Balance Salary</TableCell>
              <TableCell sx={C({ textAlign: "center" })}>
                {balanceSalary === 0 ? "Nil" : fmt(balanceSalary)}
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