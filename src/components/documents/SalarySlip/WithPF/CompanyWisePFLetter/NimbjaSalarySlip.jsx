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
    currentDesignation,
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
  const finalDesignation = currentDesignation || designation || "-";

  const [year, monthNum] = month.split("-");
  const monthName = new Date(year, monthNum - 1).toLocaleString("en-IN", {
    month: "long",
  });

  const salaryMonth = `${monthName} ${year}`;

  const round0 = (num) => Math.round(num);

  const monthlyCTC = round0(totalSalary);
  const annualCTC = round0(monthlyCTC * 12);

  const PF = 3750;

  const HRA = round0(monthlyCTC * 0.18);
  const DA = round0(monthlyCTC * 0.12);
  const SPECIAL = round0(monthlyCTC * 0.16);
  const FOOD = round0(monthlyCTC * 0.06);

  const BASIC = round0(monthlyCTC - (HRA + DA + SPECIAL + FOOD + PF));

  const totalEarning = round0(BASIC + HRA + DA + SPECIAL + FOOD + PF);

  // ✅ FIXED HERE
  const pt = getProfessionalTax(month, monthlyCTC);

  const totalDeduction = round0(PF + pt + Number(otherDeduction || 0));
  const netPay = round0(totalEarning - totalDeduction);

  /* ================= TABLE STYLES ================= */

  const TABLE_CONTAINER_STYLE = {
    border: "1px solid #333",
    borderRadius: 0,
    backgroundColor: "transparent",
    boxShadow: "none",
  };

  const TABLE_STYLE = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const CELL_BASE = {
    border: "1px solid #333",
    borderRadius: 0,
    fontSize: "9.75pt",
    padding: "0px 12px 12px 12px",
    verticalAlign: "top",
    lineHeight: 1,
    fontFamily: "Bahnschrift",
  };

  const CELL_HEAD = {
    ...CELL_BASE,
    fontWeight: 600,
    fontSize: "10pt",
    textAlign: "center",
  };

  const COMPANY_NAME_CELL = {
    ...CELL_HEAD,
    fontSize: "14pt",
  };

  const COMPANY_ADDRESS_CELL = {
    ...CELL_HEAD,
  };

  const TITLE_CELL = {
    ...CELL_HEAD,
  };

  const LABEL_CELL = {
    ...CELL_BASE,
    fontWeight: 600,
  };

  const VALUE_CELL = {
    ...CELL_BASE,
    // textAlign: "center",
  };

  const TOTAL_CELL = {
    ...CELL_HEAD,
  };

  const SIGNATURE_CELL = {
    ...CELL_BASE,
    // textAlign: "center",
  };

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
          sx={TABLE_CONTAINER_STYLE}
        >
          <Table size="small" sx={TABLE_STYLE}>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={COMPANY_NAME_CELL}
                >
                  {company.name}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={COMPANY_ADDRESS_CELL}
                >
                  {company.address}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={TITLE_CELL}
                >
                  Salary Slip {salaryMonth}
                </TableCell>
              </TableRow>

              {/* Employee Info */}
              <TableRow>
                <TableCell sx={LABEL_CELL}>Employee Name</TableCell>
                <TableCell align="center" sx={VALUE_CELL}>
                  {employeeName}
                </TableCell>

                <TableCell sx={LABEL_CELL}>Employee ID</TableCell>
                <TableCell align="center" sx={VALUE_CELL}>
                  {employeeId}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={LABEL_CELL}>Gender</TableCell>
                <TableCell align="center" sx={VALUE_CELL}>
                  {gender}
                </TableCell>

                <TableCell sx={LABEL_CELL}>Department</TableCell>
                <TableCell align="center" sx={VALUE_CELL}>
                  {department}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={LABEL_CELL}>DOJ</TableCell>
                <TableCell align="center" sx={VALUE_CELL}>
                  {doj}
                </TableCell>

                <TableCell sx={LABEL_CELL}>PAN</TableCell>
                <TableCell align="center" sx={VALUE_CELL}>
                  {pan}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={LABEL_CELL}>Designation</TableCell>
                <TableCell align="center" sx={VALUE_CELL}>
                  {finalDesignation}
                </TableCell>

                <TableCell sx={LABEL_CELL}>DOB</TableCell>
                <TableCell align="center" sx={VALUE_CELL}>
                  {dob}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={LABEL_CELL}>Mode</TableCell>
                <TableCell align="center" sx={VALUE_CELL}>
                  {mode}
                </TableCell>

                <TableCell sx={LABEL_CELL}>Working Days</TableCell>
                <TableCell align="center" sx={VALUE_CELL}>
                  {workdays}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={LABEL_CELL}>Account No.</TableCell>
                <TableCell align="center" sx={VALUE_CELL}>
                  {accountNo}
                </TableCell>

                <TableCell sx={VALUE_CELL} />
                <TableCell sx={VALUE_CELL} />
              </TableRow>

              {/* Earnings */}
              <TableRow>
                <TableCell sx={CELL_HEAD}>
                  Earnings
                </TableCell>
                <TableCell sx={CELL_HEAD}>
                  Amount
                </TableCell>
                <TableCell sx={CELL_HEAD}>
                  Deductions
                </TableCell>
                <TableCell sx={CELL_HEAD}>
                  Amount
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={CELL_BASE}>Basic</TableCell>
                <TableCell
                  align="center"
                  sx={VALUE_CELL}
                >{formatCurrency(BASIC)}</TableCell>
                <TableCell
                  align="center"
                  sx={VALUE_CELL}
                >PF</TableCell>
                <TableCell
                  align="center"
                  sx={VALUE_CELL}
                >{formatCurrency(PF)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={CELL_BASE}>Bouqet Of Benefits</TableCell>
                <TableCell
                  align="center"
                  sx={VALUE_CELL}
                >{formatCurrency(HRA)}</TableCell>
                <TableCell
                  align="center"
                  sx={VALUE_CELL}
                >PT</TableCell>
                <TableCell
                  align="center"
                  sx={VALUE_CELL}
                >{formatCurrency(pt)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={CELL_BASE}>HRA</TableCell>
                <TableCell
                  align="center"
                  sx={VALUE_CELL}
                >{formatCurrency(DA)}</TableCell>
                <TableCell
                  align="center"
                  sx={VALUE_CELL}
                >Other Deduction</TableCell>
                <TableCell
                  align="center"
                  sx={VALUE_CELL}
                >
                  {formatCurrency(otherDeduction)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={CELL_BASE}>City Allowance</TableCell>
                <TableCell
                  align="center"
                  sx={VALUE_CELL}
                >{formatCurrency(SPECIAL)}</TableCell>
                <TableCell sx={CELL_BASE} />
                <TableCell sx={CELL_BASE} />
              </TableRow>

              <TableRow>
                <TableCell sx={CELL_BASE}>Superannuation Fund</TableCell>
                <TableCell
                  align="center"
                  sx={VALUE_CELL}
                >{formatCurrency(FOOD)}</TableCell>
                <TableCell sx={CELL_BASE} />
                <TableCell sx={CELL_BASE} />
              </TableRow>

              <TableRow>
                <TableCell sx={CELL_BASE}>PF</TableCell>
                <TableCell
                  align="center"
                  sx={VALUE_CELL}
                >
                  {formatCurrency(PF)}
                </TableCell>
                <TableCell sx={CELL_BASE} />
                <TableCell sx={CELL_BASE} />
              </TableRow>

              {/* Totals */}
              <TableRow>
                <TableCell sx={TOTAL_CELL}>Total</TableCell>
                <TableCell sx={CELL_HEAD}>
                  {formatCurrency(totalEarning)}
                </TableCell>
                <TableCell sx={TOTAL_CELL}>
                  Total Deduction
                </TableCell>
                <TableCell sx={CELL_HEAD}>
                  {formatCurrency(totalDeduction)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={TOTAL_CELL}>Net Pay</TableCell>
                <TableCell sx={CELL_HEAD}>
                  {formatCurrency(netPay)}
                </TableCell>
                <TableCell sx={CELL_BASE} />
                <TableCell sx={CELL_BASE} />
              </TableRow>

              <TableRow>
                <TableCell sx={TOTAL_CELL}>In Words</TableCell>
                <TableCell sx={CELL_BASE} colSpan={3}>{numberToWords(netPay)}</TableCell>
              </TableRow>

              {/* Signature */}
              <TableRow>
                <TableCell sx={SIGNATURE_CELL} />
                <TableCell sx={SIGNATURE_CELL} />
                <TableCell
                  align="center"
                  sx={SIGNATURE_CELL}
                >
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
                <TableCell
                  align="center"
                  sx={VALUE_CELL}
                >
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
