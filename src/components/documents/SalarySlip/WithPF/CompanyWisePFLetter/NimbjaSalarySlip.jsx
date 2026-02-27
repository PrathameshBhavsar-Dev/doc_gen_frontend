import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { formatCurrency,getProfessionalTax } from "../../../../../utils/salaryCalculations";

/* ================= HELPERS ================= */
const num = (v) => Number(v) || 0;
const round2 = (v) => Math.round(num(v) * 100) / 100;

/* ================= NUMBER TO WORDS ================= */
const numberToWords = (numVal = 0) => {
  if (!numVal) return "Zero Rupees Only";

  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six",
    "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const w = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + w(n % 100) : "");
    if (n < 100000) return w(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + w(n % 1000) : "");
    return w(Math.floor(n / 100000)) + " Lakh";
  };

  return `${w(Math.round(numVal))} Rupees Only`;
};

const NimbjaSalarySlip = ({ company = {}, data = {} }) => {

  /* ================= EMPLOYEE DATA ================= */
  const {
    employeeName = "-",
    employeeId = "-",
    gender = "-",
    department = "-",
    designation = "-",
    doj = "-",
    dob = "-",
    pan = "-",
    mode = "-",
    workdays = "-",
    bankName = "-",
    accountNo = "-",
    month = "-",
    totalSalary = 0, // ✅ GROSS SALARY
    otherDeduction = 2000,
  } = data;


  /* ===== MONTH FORMAT ===== */
  const [year, monthNum] = month.split("-");
  const monthName = new Date(year, monthNum - 1).toLocaleString("en-IN", { month: "long" });
  const salaryMonth = `${monthName} ${year}`;

  /* ================= EARNINGS BREAKUP (100%) ================= */
  const monthlyGross = round2(totalSalary);

  const PERCENT = {
    basic: 0.40,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.14, // adjusted so total = 100%
  };

  const BASIC = round2(monthlyGross * PERCENT.basic);
  const HRA = round2(monthlyGross * PERCENT.hra);
  const DA = round2(monthlyGross * PERCENT.da);
  const SPECIAL = round2(monthlyGross * PERCENT.special);
  const FOOD = round2(monthlyGross * PERCENT.food);
  const PF_DISPLAY = 3750; // 👈 ONLY for showing in earnings

  /* ================= TOTAL EARNINGS ================= */
  const totalEarning =
    BASIC + HRA + DA + SPECIAL + FOOD; // ✅ EXACT = totalSalary

  /* ================= DEDUCTIONS ================= */
  const PF = 3750;
  // const PT = 200;
  // const OTHER_DEDUCTION = 2000;


  /* ================= NET PAY ================= */
const pt = getProfessionalTax(month, totalEarning);
const totalDeduction = round2(PF + pt + Number(otherDeduction || 0));
const netPay = round2(totalEarning - totalDeduction);

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid black",
          borderRadius: 0,
          boxShadow: "none",
          "& .MuiTableCell-root": {
            border: "1px solid black",

            padding: "4px 6px",
            fontFamily: "Bahnschrift",
          },
        }}
      >
        <Table size="small">
          <TableBody>
            {/* HEADER */}
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{ fontWeight: "bold", fontSize: "14pt" }}
              >
                {company.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold" }}>
                {company.address}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold" }}>
                Salary Slip {salaryMonth}
              </TableCell>
            </TableRow>

            {/* EMPLOYEE DETAILS */}
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>{employeeName}</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>{employeeId}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{gender}</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>{department}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>DOJ</TableCell>
              <TableCell>{doj}</TableCell>
              <TableCell>PAN</TableCell>
              <TableCell>{pan}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Designation</TableCell>
              <TableCell>{designation}</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>{dob}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Mode</TableCell>
              <TableCell>{mode}</TableCell>
              <TableCell>Working Days</TableCell>
              <TableCell>{workdays}</TableCell>
            </TableRow>

            {/* <TableRow>
              {/* <TableCell>Bank</TableCell> */}
            {/* <TableCell>{bankName}</TableCell> */}
            {/* <TableCell />
              <TableCell />
            </TableRow>  */}

            <TableRow>
              <TableCell>Account No.</TableCell>
              <TableCell>{accountNo}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            {/* EARNINGS / DEDUCTIONS */}
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
              <TableCell>Basic</TableCell>
              <TableCell align="right">{formatCurrency(BASIC)}</TableCell>
              <TableCell>PF</TableCell>
              <TableCell align="right">{formatCurrency(PF)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Bouqet Of Benefits</TableCell>
              <TableCell align="right">{formatCurrency(HRA)}</TableCell>
              <TableCell>PT</TableCell>
              <TableCell align="right">{formatCurrency(pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>HRA</TableCell>
              <TableCell align="right">{formatCurrency(DA)}</TableCell>
              <TableCell>Other Deduction</TableCell>
              <TableCell align="right">
                {formatCurrency(otherDeduction)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>City Allowance</TableCell>
              <TableCell align="right">{formatCurrency(SPECIAL)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell>Superannuation Fund</TableCell>
              <TableCell align="right">{formatCurrency(FOOD)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell>PF</TableCell>
              <TableCell align="right">{formatCurrency(PF_DISPLAY)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            {/* TOTAL */}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {formatCurrency(totalEarning)}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Deduction</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {formatCurrency(totalDeduction)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Net Pay</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {formatCurrency(netPay)}
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>In Words</TableCell>
              <TableCell colSpan={3}>{numberToWords(netPay)}</TableCell>
            </TableRow>

            {/* SIGNATURE */}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell align="center">
                {company.stamp && (
                  <img src={company.stamp} height={60} alt="Stamp" />
                )}
              </TableCell>
              <TableCell align="center">
                {company.signature && (
                  <img src={company.signature} height={28} alt="Signature" />
                )}
                <Typography fontWeight="bold" fontSize="9pt">
                  Signature
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </A4Page>
  );
};

export default NimbjaSalarySlip;
