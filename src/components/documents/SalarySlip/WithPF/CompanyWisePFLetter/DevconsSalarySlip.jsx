import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { formatCurrency, getProfessionalTax } from "../../../../../utils/salaryCalculations";

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
const DevconsSalarySlip = ({ company = {}, data = {} }) => {

  /* ================= EMPLOYEE DATA ================= */
  const {
    employeeName = "-",
    employeeId = "-",
    gender = "-",
    department = "-",
    doj = "-",
    dob = "-",
    pan = "-",
    mode = "-",
    workdays = "-",
    bankName = "-",
    accountNo = "-",
    month = "-",
    totalSalary = 0,
    otherDeduction = 2000,
  } = data;

  /* ===== MONTH FORMAT ===== */
  const [year, monthNum] = month.split("-");
  const monthName = new Date(year, monthNum - 1).toLocaleString("en-IN", { month: "long" });
  const salaryMonth = `${monthName} ${year}`;
  const designation = data.currentDesignation ?? data.position ?? "";

  /* ================= EARNINGS BREAKUP (100%) ================= */
  const round0 = (num) => Math.round(num);

  // ================= MONTHLY INPUT =================
  const monthlyCTC = round0(totalSalary);

  // ================= ANNUAL =================
  const annualCTC = round0(monthlyCTC * 12);

  // ================= FIXED PF =================
  const PF = 3750;

  // ================= OTHER COMPONENTS =================
  const HRA = round0(monthlyCTC * 0.18);
  const DA = round0(monthlyCTC * 0.12);
  const SPECIAL = round0(monthlyCTC * 0.16);
  const FOOD = round0(monthlyCTC * 0.06);

  // ================= ADJUSTED BASIC =================
  const BASIC = round0(
    monthlyCTC - (HRA + DA + SPECIAL + FOOD + PF)
  );

  // ================= TOTAL EARNINGS =================
  const totalEarning = round0(
    BASIC + HRA + DA + SPECIAL + FOOD + PF
  );

  // ================= NET PAY =================
  const pt = getProfessionalTax(month, totalEarning);
  const totalDeduction = round0(PF + pt + Number(otherDeduction || 0));
  const netPay = round0(totalEarning - totalDeduction);

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <Box
        sx={{
          border: "1px solid black",
          width: "100%",
          boxSizing: "border-box",
          "& .MuiTableCell-root": {
            border: "1px solid black",
            // padding: "4px 6px",
            padding: "0px 12px 12px 12px",
            fontFamily: "Bahnschrift",
            color: "#000",
          },
        }}
      >
        <Table size="small" sx={{
          borderCollapse: "collapse",
          width: "100%",
          tableLayout: "fixed", // Force fixed layout for perfect alignment
          "& .MuiTableCell-root": {
            width: "25%", // Each of the 4 columns gets exactly 25%
          }
        }}>
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
              <TableCell>Gender <br/>DOJ</TableCell>
              <TableCell>
                {gender} <br/>{doj}
              </TableCell>
              <TableCell>Department  <br/>Pan Number</TableCell>
              <TableCell>
                {department} <br/>{pan}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Designation</TableCell>
              <TableCell>{designation}</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>{dob}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Mode</TableCell>
              <TableCell>
                Bank Name- {mode}
                <br />
                Bank Account No.- {accountNo}
              </TableCell>
              <TableCell>Working days</TableCell>
              <TableCell>{data.workdays}</TableCell>
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
              <TableCell align="center">{formatCurrency(BASIC)}</TableCell>
              <TableCell>PF</TableCell>
              <TableCell align="center">{formatCurrency(PF)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>HRA</TableCell>
              <TableCell align="center">{formatCurrency(HRA)}</TableCell>
              <TableCell>PT</TableCell>
              <TableCell align="center">{formatCurrency(pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>DEARNESS ALLOWANCE</TableCell>
              <TableCell align="center">{formatCurrency(DA)}</TableCell>
              <TableCell>Other Deduction</TableCell>
              <TableCell align="center">{formatCurrency(otherDeduction)}</TableCell>
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

            <TableRow>
              <TableCell>PF</TableCell>
              <TableCell align="center">{formatCurrency(PF)}</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
            {/* TOTAL */}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {formatCurrency(totalEarning)}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Deduction</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {formatCurrency(totalDeduction)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Net Pay</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
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
              <TableCell colSpan={2} />
              <TableCell align="center" sx={{ verticalAlign: "middle" }}>
                {company?.stamp && (
                  <img
                    src={company.stamp}
                    alt="Stamp"
                    style={{ height: 85, width: "auto", maxWidth: "100%", display: "block", margin: "0 auto" }}
                  />
                )}
              </TableCell>
              <TableCell align="center" sx={{ verticalAlign: "middle" }}>
                {company?.signature && (
                  <img
                    src={company.signature}
                    alt="Signature"
                    style={{ height: 50, width: "auto", maxWidth: "100%", display: "block", margin: "0 auto" }}
                  />
                )}
                <Typography fontWeight="bold">Signature</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </A4Page>
  );

};

export default DevconsSalarySlip;