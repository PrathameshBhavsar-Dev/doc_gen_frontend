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

}

/* ================= COMPONENT ================= */
const RPSalarySlip = ({ company = {}, data = {} }) => {

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
    totalSalary = 0,
    otherDeduction = 2000
  } = data;

  /* ===== MONTH FORMAT ===== */
  const [year, monthNum] = month.split("-");
  const monthName = new Date(year, monthNum - 1).toLocaleString("en-IN", { month: "long" });
  const salaryMonth = `${monthName} ${year}`;

  /* ================= EARNINGS BREAKUP (100%) ================= */
  const monthlyGross = round2(totalSalary);

  const PERCENT = {
    basic: 0.48,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
  };

  const BASIC = round2(monthlyGross * PERCENT.basic);
  const HRA = round2(monthlyGross * PERCENT.hra);
  const DA = round2(monthlyGross * PERCENT.da);
  const SPECIAL = round2(monthlyGross * PERCENT.special);
  const FOOD = round2(monthlyGross * PERCENT.food);
  const PF_DISPLAY = 3750;

  /* ================= TOTAL EARNINGS ================= */
  const totalEarning = BASIC + HRA + DA + SPECIAL + FOOD;

  /* ================= DEDUCTIONS ================= */
  const PF = 3750;
  // const PT = 200;
  // const OTHER_DEDUCTION = 2000;
  // const totalDeduction = PF + PT + OTHER_DEDUCTION;

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
              <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold", fontSize: "14pt" }}>
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

            <TableRow>
              <TableCell>Account No.</TableCell>
              <TableCell>{accountNo}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            {/* EARNINGS / DEDUCTIONS */}
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Earnings</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Deductions</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Amount</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>BASIC</TableCell>
              <TableCell align="right">{formatCurrency(BASIC)}</TableCell>
              <TableCell>PF</TableCell>
              <TableCell align="right">{formatCurrency(PF)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>HRA</TableCell>
              <TableCell align="right">{formatCurrency(HRA)}</TableCell>
              <TableCell>PT</TableCell>
              <TableCell align="right">{formatCurrency(pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>DEARNESS ALLOWANCE</TableCell>
              <TableCell align="right">{formatCurrency(DA)}</TableCell>
              <TableCell>Other Deduction</TableCell>
              <TableCell align="right">{formatCurrency(otherDeduction)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>SPECIAL ALLOWANCE</TableCell>
              <TableCell align="right">{formatCurrency(SPECIAL)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell>FOOD ALLOWANCE</TableCell>
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
                {company.stamp && <img src={company.stamp} height={60} alt="Stamp" />}
              </TableCell>
              <TableCell align="center">
                {company.signature && <img src={company.signature} height={28} alt="Signature" />}
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

export default RPSalarySlip;
