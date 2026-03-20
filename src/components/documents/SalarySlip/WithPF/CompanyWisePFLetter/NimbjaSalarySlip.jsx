import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import watermark from "../../../../../assets/images/Nimbja/nimbja_watermark.png";
import {
  formatCurrency,
  getProfessionalTax,
} from "../../../../../utils/salaryCalculations";

/* ================= HELPERS ================= */
const num = (v) => Number(v) || 0;
const round2 = (v) => Math.round(num(v) * 100) / 100;

/* ================= NUMBER TO WORDS ================= */
const numberToWords = (numVal = 0) => {
  if (!numVal) return "Zero Rupees Only";

  const a = [
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

  const b = [
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

  const w = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + w(n % 100) : "")
      );
    if (n < 100000)
      return (
        w(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 ? " " + w(n % 1000) : "")
      );
    return w(Math.floor(n / 100000)) + " Lakh";
  };

  return `${w(Math.round(numVal))} Rupees Only`;
};

const NimbjaSalarySlip = ({ company = {}, data = {} }) => {
  const {
    employeeName = "-",
    employeeId = "-",
    gender = "-",
    department = "-",
    designation = "-",
    doj = "-",
    dob = "-",
    pan = "-",
    workdays = "-",
    mode = "-",
    accountNo = "-",
    month = "-",
    totalSalary = 0,
    otherDeduction = 2000,
  } = data;

  const [year, monthNum] = month.split("-");
  const monthName = new Date(year, monthNum - 1).toLocaleString("en-IN", {
    month: "long",
  });

  const salaryMonth = `${monthName} ${year}`;

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

  const totalEarning = BASIC + HRA + DA + SPECIAL + FOOD;

  const PF = 3750;

  const pt = getProfessionalTax(month, totalEarning);

  const totalDeduction = round2(PF + pt + Number(otherDeduction || 0));

  const netPay = round2(totalEarning - totalDeduction);

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      {/* WATERMARK (same as Full & Final) */}
      <Box
        component="img"
        src={watermark}
        alt="watermark"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          opacity: 0.4,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* CONTENT */}
      <Box
        className="a4-content-only"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            border: "1px solid black",
            borderRadius: 0,
            backgroundColor: "transparent",
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
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  {company.address}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  Salary Slip {salaryMonth}
                </TableCell>
              </TableRow>

              {/* Employee Info */}
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell align="center">{employeeName}</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell align="center">{employeeId}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Gender</TableCell>
                <TableCell align="center">{gender}</TableCell>
                <TableCell>Department</TableCell>
                <TableCell align="center">{department}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>DOJ</TableCell>
                <TableCell align="center">{doj}</TableCell>
                <TableCell>PAN</TableCell>
                <TableCell align="center">{pan}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Designation</TableCell>
                <TableCell align="center">{designation}</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell align="center">{dob}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Mode</TableCell>
                <TableCell align="center">{mode}</TableCell>
                <TableCell>Working Days</TableCell>
                <TableCell align="center">{workdays}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Account No.</TableCell>
                <TableCell align="center">{accountNo}</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>

              {/* Earnings */}
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
                <TableCell align="center">{formatCurrency(BASIC)}</TableCell>
                <TableCell align="center">PF</TableCell>
                <TableCell align="center">{formatCurrency(PF)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Bouqet Of Benefits</TableCell>
                <TableCell align="center">{formatCurrency(HRA)}</TableCell>
                <TableCell align="center">PT</TableCell>
                <TableCell align="center">{formatCurrency(pt)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>HRA</TableCell>
                <TableCell align="center">{formatCurrency(DA)}</TableCell>
                <TableCell align="center">Other Deduction</TableCell>
                <TableCell align="center">
                  {formatCurrency(otherDeduction)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>City Allowance</TableCell>
                <TableCell align="center">{formatCurrency(SPECIAL)}</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>

              <TableRow>
                <TableCell>Superannuation Fund</TableCell>
                <TableCell align="center">{formatCurrency(FOOD)}</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>

              <TableRow>
                <TableCell>PF</TableCell>
                <TableCell align="center">
                  {formatCurrency(PF_DISPLAY)}
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>

              {/* Totals */}
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  {formatCurrency(totalEarning)}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Total Deduction
                </TableCell>
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

              {/* Signature */}
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell align="center">
                  {company.stamp && (
                    <img
                      src={company.stamp}
                      alt="signature"
                      style={{
                        height: "120px",
                        width: "auto",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  {company.signature && (
                    <img
                      src={company.signature}
                      alt="signature"
                      style={{
                        height: "30px",
                        width: "auto",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                  )}
                  <Typography fontWeight="bold" fontSize="10pt">
                    Signature
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </A4Page>
  );
};

export default NimbjaSalarySlip;
