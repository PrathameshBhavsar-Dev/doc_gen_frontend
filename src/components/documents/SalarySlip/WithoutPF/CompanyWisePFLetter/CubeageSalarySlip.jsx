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
import { formatCurrency, getProfessionalTax } from "../../../../../utils/salaryCalculations";

/* 🔢 Utility — Convert number to words */
const numberToWords = (num) => {
  if (num === 0) return "Zero Rupees Only";
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + inWords(n % 100) : "");
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
    return "Value too large";
  };
  return inWords(num) + " Rupees Only";
};

const CubeageSalarySlip = ({ data, company }) => {
  if (company?.name === "JDIT Software Solutions Pvt. Ltd.") {
    return <JDITSalarySlipTemplate data={data} company={company} />;
  }

  // === Basic Info ===
  const name = data.employeeName || "Anagha Arun Kapse";
  const empId = data.employeeId || "SSS2104";
  const doj = data.doj || "05/01/2021";
  const gender = data.gender;
  const pan = data.pan || "ABCDE1234F";
  const dob = data.dob || "15/08/1995";
  const bankMode = data.mode || "HDFC Bank";
  const totalWorkdays = data.workdays || "30";
  const dept = data.department || "IT";
  const desg = data.designation || "Quality Analyst";
  // Convert "YYYY-MM" → "Month YY" (e.g. "2025-07" → "July 25")
  const month = (() => {
    if (!data.month) return "March 2022"; // fallback

    const [year, monthNum] = data.month.split("-");
    const date = new Date(year, monthNum - 1); // JS months start at 0
    const monthName = date.toLocaleString("default", { month: "long" });

    return `${monthName} ${year}`; // ✅ Full year
  })();


  // === Total Salary ===
  const totalSalary = parseFloat(data.totalSalary || 35000); // default fallback

  
  // === Auto-calculated components (percentages of totalSalary) ===
  const basic = totalSalary * 0.4013;
  const hra = totalSalary * 0.1798;
  const conveyance = totalSalary * 0.1599;
  const food = totalSalary * 0.0797;
  const special = totalSalary * 0.1196;
  const others = totalSalary * 0.0597; // optional, can be removed if 0

  const pt = getProfessionalTax(data.month, totalSalary);
  const otherDed = parseFloat(data.otherDeduction || 2000);

const totalEarning = Math.round(
  basic + hra + conveyance + food + special + others,
);
console.log("total earning  frontend : ",totalEarning)

const totalDed = pt + otherDed;

const net = totalEarning - totalDed;
console.log("net  frontend : ", net);
const adjustment = 2200;

const issuedSalary = totalEarning - adjustment;
console.log("issuedSalary  frontend : ", issuedSalary);
   
  return (
    <A4Page headerSrc={company?.header}>
      <Box sx={{ pt: "16mm", mt: "10mm", textAlign: "center" }}>
        <Typography>Salary Statement for The Month of {month}</Typography>
        <TableContainer
          sx={{
            border: "1.5px solid black",
            borderRadius: 0,
            mt: "5mm",
            boxShadow: "none",
            "& table": {
              borderCollapse: "collapse",
            },
          }}
        >
          <Table size="small">
            <TableBody>
              {/* ===== TOP DETAILS BOX (FULL BORDER) ===== */}
              <TableRow>
                <TableCell sx={{ border: "1.5px solid black" }} colSpan={2}>
                  <strong>Name:</strong> {name}
                </TableCell>
                <TableCell sx={{ border: "1.5px solid black" }} colSpan={2}>
                  <strong>Designation:</strong> {desg}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1.5px solid black" }}>
                  Employee Code:
                </TableCell>
                <TableCell sx={{ border: "1.5px solid black" }}>
                  {empId}
                </TableCell>
                <TableCell sx={{ border: "1.5px solid black" }}>
                  Total Days:
                </TableCell>
                <TableCell sx={{ border: "1.5px solid black" }}>
                  {totalWorkdays}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1.5px solid black" }}>
                  Date Of Joining:
                </TableCell>
                <TableCell sx={{ border: "1.5px solid black" }}>
                  {doj}
                </TableCell>
                <TableCell sx={{ border: "1.5px solid black" }}>
                  Days Present:
                </TableCell>
                <TableCell sx={{ border: "1.5px solid black" }}>
                  {totalWorkdays}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ border: "1.5px solid black" }}>
                  Date Of Birth:
                </TableCell>
                <TableCell sx={{ border: "1.5px solid black" }}>
                  {dob}
                </TableCell>
                <TableCell sx={{ border: "1.5px solid black" }}>
                  PAN NO:
                </TableCell>
                <TableCell sx={{ border: "1.5px solid black" }}>
                  {pan}
                </TableCell>
              </TableRow>

              {/* ==== SECTION HEADER (THICK BORDER LIKE WORD) ===== */}
              <TableRow>
                <TableCell
                  sx={{ border: "1.5px solid black", fontWeight: "bold" }}
                >
                  Specifications (A)
                </TableCell>
                <TableCell
                  sx={{ border: "1.5px solid black", fontWeight: "bold" }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{ border: "1.5px solid black", fontWeight: "bold" }}
                >
                  Deductions (B)
                </TableCell>
                <TableCell
                  sx={{ border: "1.5px solid black", fontWeight: "bold" }}
                >
                  Amount
                </TableCell>
              </TableRow>

              {/* ===== ROWS EXACT LIKE IMAGE ===== */}
              <TableRow>
                <TableCell sx={{ borderRight: "1.5px solid black" }}>
                  Basic
                </TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                  align="right"
                >
                  {formatCurrency(basic)}
                </TableCell>
                <TableCell sx={{ borderRight: "1.5px solid black" }}>
                  P.T.
                </TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                  align="right"
                >
                  {formatCurrency(pt)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderRight: "1.5px solid black" }}>
                  H.R.A.
                </TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                  align="right"
                >
                  {formatCurrency(hra)}
                </TableCell>
                <TableCell sx={{ borderRight: "1.5px solid black" }}>
                  Other Deductions
                </TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                  align="right"
                >
                  {formatCurrency(otherDed)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderRight: "1.5px solid black" }}>
                  D.A.
                </TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                  align="right"
                >
                  {formatCurrency(conveyance)}
                </TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderRight: "1.5px solid black" }}>
                  L.T.A.
                </TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                  align="right"
                >
                  {formatCurrency(food)}
                </TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderRight: "1.5px solid black" }}>
                  ALLOWANCE (Shift+Skill)
                </TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                  align="right"
                >
                  {formatCurrency(special)}
                </TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderRight: "1.5px solid black" }}>
                  Special Allowance
                </TableCell>
                <TableCell sx={{ border: "1.5px solid black" }} align="right">
                  {formatCurrency(others)}
                </TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
                <TableCell sx={{ border: "1.5px solid black" }}></TableCell>
              </TableRow>

              {/* ===== TOTALS EXACT LIKE IMAGE ===== */}
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", borderRight: "1.5px solid black" }}
                >
                  Grand Total "A"
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: "bold",
                    border: "1.5px solid black",
                    borderTop: "1.5px solid black",
                  }}
                >
                  {formatCurrency(totalEarning)}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", borderRight: "1.5px solid black" }}
                ></TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", border: "1.5px solid black" }}
                >
                  {formatCurrency(totalDed)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    border: "1.5px solid black",
                    py: 2.7,
                  }}
                >
                  Net Salary
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: "bold",
                    border: "1.5px solid black",
                    py: 2.7,
                  }}
                >
                  {formatCurrency(totalEarning)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", border: "1.5px solid black" }}
                >
                  Issued Salary
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", border: "1.5px solid black" }}
                >
                  {formatCurrency(issuedSalary)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    border: "1.5px solid black",
                    pt: 2,
                  }}
                >
                  Balance Salary
                </TableCell>
                <TableCell
                  sx={{ border: "1.5px solid black", pt: 2 }}
                  align="right"
                >
                  Nil
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
                <TableCell
                  sx={{ borderRight: "1.5px solid black" }}
                ></TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    borderRight: "1.5px solid black",
                    py: 2,
                  }}
                  colSpan={2}
                ></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography>
          *Computer Generated Salary Slip. No Signature Required
        </Typography>
      </Box>
    </A4Page>
  );
};

export default CubeageSalarySlip;