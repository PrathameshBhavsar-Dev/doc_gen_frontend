import React, { useMemo } from "react";
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
import { getProfessionalTax, formatCurrency } from "../../../../../utils/salaryCalculations";

/* ================= NUMBER TO WORDS ================= */
const numberToWords = (num = 0) => {
  if (!num) return "Zero Rupees Only";

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const convert = (n) => {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
    if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
    if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
    return convert(Math.floor(n / 10000000)) + " Crore";
  };

  return `${convert(Math.round(num))} Rupees Only`;
};

/* ================= COMPONENT ================= */
const SmartSoftwareSalarySlip = ({ company = {}, data = {} }) => {

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
    accountNo = "-",
    month = "-",
    totalSalary = 0,
    otherDeduction = 2000,
  } = data;

  /* ================= MONTH ================= */
  const [year, monthNum] = month ? month.split("-") : ["", ""];
  const monthName = monthNum
    ? new Date(year, monthNum - 1).toLocaleString("en-IN", { month: "long" })
    : "";
  const salaryMonth = monthName && year ? `${monthName} ${year}` : "-";

  /* ================= SALARY LOGIC (NO PF) ================= */
  const round0 = (v) => Math.round(Number(v) || 0);

  const monthlyCTC = round0(totalSalary);

  const HRA = round0(monthlyCTC * 0.18);
  const DA = round0(monthlyCTC * 0.12);
  const SPECIAL = round0(monthlyCTC * 0.16);
  const FOOD = round0(monthlyCTC * 0.06);

  const BASIC = round0(
    monthlyCTC - (HRA + DA + SPECIAL + FOOD)
  );

  const totalEarning = round0(
    BASIC + HRA + DA + SPECIAL + FOOD
  );

  const pt = month ? getProfessionalTax(month, totalEarning) : 0;

  const totalDeduction = round0(
    pt + Number(otherDeduction || 0)
  );

  const netPay = round0(totalEarning - totalDeduction);

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
           // padding: "6px",
           padding: "0px 12px 12px 12px",
            fontFamily: "Bahnschrift",
          },
        }}
      >
        <Table size="small">
          <TableBody>

            {/* HEADER */}
            <TableRow>
              <TableCell colSpan={4} align="center">
                <b>SMART SOFTWARE SERVICES (I) PVT. LTD.</b>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} align="center">
                <b>406 Changbhale Heights, Near Kalpataru Estate Phase III, Pimple Gurav, Pune 411061</b>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} align="center">
                <b>Salary Slip {salaryMonth}</b>
              </TableCell>
            </TableRow>

            {/* DETAILS */}
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
              <TableCell>Designation</TableCell>
              <TableCell>{designation}</TableCell>
              <TableCell>PAN</TableCell>
              <TableCell>{pan}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Mode</TableCell>
              <TableCell>{mode}</TableCell>
              <TableCell>Working Days</TableCell>
              <TableCell>{workdays}</TableCell>
            </TableRow>

            {/* HEADER */}
            <TableRow>
              <TableCell align="center"><b>Earnings</b></TableCell>
              <TableCell align="center"><b>Amount</b></TableCell>
              <TableCell align="center"><b>Deductions</b></TableCell>
              <TableCell align="center"><b>Amount</b></TableCell>
            </TableRow>

            {/* ROWS */}
            <TableRow>
              <TableCell>BASIC</TableCell>
              <TableCell align="center">{formatCurrency(BASIC)}</TableCell>
              <TableCell>PT</TableCell>
              <TableCell align="center">{formatCurrency(pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>HRA</TableCell>
              <TableCell align="center">{formatCurrency(HRA)}</TableCell>
              <TableCell>Other Deduction</TableCell>
              <TableCell align="center">{formatCurrency(otherDeduction)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>DEARNESS ALLOWANCE</TableCell>
              <TableCell align="center">{formatCurrency(DA)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell>SPECIAL ALLOWANCE</TableCell>
              <TableCell align="center">{formatCurrency(SPECIAL)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell>FOOD ALLOWANCE</TableCell>
              <TableCell align="center">{formatCurrency(FOOD)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            {/* TOTAL */}
            <TableRow>
              <TableCell><b>Total</b></TableCell>
              <TableCell align="center"><b>{formatCurrency(totalEarning)}</b></TableCell>
              <TableCell><b>Total Deduction</b></TableCell>
              <TableCell align="center"><b>{formatCurrency(totalDeduction)}</b></TableCell>
            </TableRow>

            <TableRow>
              <TableCell><b>Net Pay</b></TableCell>
              <TableCell align="center"><b>{formatCurrency(netPay)}</b></TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell><b>In Words</b></TableCell>
              <TableCell colSpan={3}>{numberToWords(netPay)}</TableCell>
            </TableRow>

            {/* SIGN ROW (4 COLUMN SAME) */}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>

              <TableCell align="center">
                {company?.stamp && (
                  <img src={company.stamp} alt="Stamp" style={{ height: 120 }} />
                )}
              </TableCell>

              <TableCell align="center">
                {company?.signature && (
                  <img src={company.signature} alt="Signature" style={{ height: 80 }} />
                )}
                <Typography><b>Signature</b></Typography>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </A4Page>
  );
};

export default SmartSoftwareSalarySlip;