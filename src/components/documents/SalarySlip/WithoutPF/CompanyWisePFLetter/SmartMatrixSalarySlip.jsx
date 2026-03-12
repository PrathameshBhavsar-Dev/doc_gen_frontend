import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import {
  formatCurrency,
  getProfessionalTax,
  numberToWords,
} from "../../../../../utils/salaryCalculations";

import stampImg from "../../../../../assets/images/smartmatrix/Smartmatrix_stamp.png";
import signImg from "../../../../../assets/images/smartmatrix/Smartmatrix_sign.png";

/* ================= WORD STYLES ================= */
const FONT = "Cambria, 'Times New Roman', serif";

const cell = {
  border: "1px solid #000",
  fontFamily: FONT,
  fontSize: "10.5pt",
  padding: "4px 6px",
  verticalAlign: "middle",
};

const bold = { ...cell, fontWeight: 600 };
const centerBold = { ...bold, textAlign: "center" };

/* ================================================= */
const SmartMatrixSalarySlip = ({ company, data }) => {
  if (!company || !data) return null;

  const [year, monthNum] = (data.month || "2025-01").split("-");
  const monthName = new Date(year, monthNum - 1).toLocaleString("en-IN", {
    month: "long",
  });
  const month = `${monthName} ${year}`;

  /* ===== MONTHLY SALARY LOGIC (Company 2 Style) ===== */

  const round2 = (num) => Number(num.toFixed(2));

  // totalSalary is already MONTHLY
  const monthlyGross = round2(Number(data.totalSalary || 0));

  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
    misc: 0.08,
  };

  // Monthly breakup
  const basic = round2(monthlyGross * PERCENT.basic);
  const hra = round2(monthlyGross * PERCENT.hra);
  const da = round2(monthlyGross * PERCENT.da);
  const special = round2(monthlyGross * PERCENT.special);
  const food = round2(monthlyGross * PERCENT.food);
  const misc = round2(monthlyGross - (basic + hra + da + special + food));

  // Deductions
  const pt = monthName.toLowerCase() === "february" ? 300 : 200;
  const otherDeduction = 2000;

  const totalDeduction = round2(pt + otherDeduction);

  // Net Pay
  const netPay = round2(monthlyGross - totalDeduction);

  return (
    <A4Page
      headerSrc={company.header}
      footerSrc={company.footer}
      contentTop="45mm"
      contentBottom="30mm"
    >
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid #000",
          borderRadius: 0,
          boxShadow: "none",
          mt: "5mm",
        }}
      >
        <Table size="small">
          <colgroup>
            <col style={{ width: "22%" }} />
            <col style={{ width: "28%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "28%" }} />
          </colgroup>{" "}
          <TableBody>
            {/* ===== HEADER ===== */}
            <TableRow>
              <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "14pt" }}>
                {company.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "10pt" }}>
                <strong>{company.address}</strong>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "11pt" }}>
                Salary Slip {month}
              </TableCell>
            </TableRow>

            {/* ===== EMPLOYEE DETAILS ===== */}
            <TableRow>
              <TableCell sx={bold}>Employee Name</TableCell>
              <TableCell sx={cell}>{data.employeeName}</TableCell>
              <TableCell sx={bold}>Employee ID</TableCell>
              <TableCell sx={cell}>{data.employeeId}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={bold}>Gender</TableCell>
              <TableCell sx={cell}>{data.gender}</TableCell>
              <TableCell sx={bold}>Department</TableCell>
              <TableCell sx={cell}>{data.department}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={bold}>DOJ</TableCell>
              <TableCell sx={cell}>{data.doj}</TableCell>
              <TableCell sx={bold}>Pan Number</TableCell>
              <TableCell sx={cell}>{data.pan}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={bold}>Designation</TableCell>
              <TableCell sx={cell}>{data.designation}</TableCell>
              <TableCell sx={bold}>DOB</TableCell>
              <TableCell sx={cell}>{data.dob}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={bold}>Mode</TableCell>
              <TableCell sx={cell}>
                Bank Name- {data.mode}
                <br />
                Bank Account No.- {data.accountNo}
              </TableCell>
              <TableCell sx={bold}>Working days</TableCell>
              <TableCell sx={cell}>{data.workdays}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={centerBold}>
                Earnings
              </TableCell>
              <TableCell colSpan={2} sx={centerBold}>
                Amount
              </TableCell>
            </TableRow>

            {[
              ["BASIC", basic],
              ["HRA", hra],
              ["DEARNESS ALLOWANCE", da],
              ["SPECIAL ALLOWANCE", special],
              ["FACILITY ALLOWANCE", misc],
              ["FOOD ALLOWANCE", food],
            ].map(([label, value]) => (
              <TableRow key={label}>
                <TableCell colSpan={2} sx={cell}>
                  {label}
                </TableCell>

                <TableCell colSpan={2} sx={{ ...cell, textAlign: "center" }}>
                  {formatCurrency(value)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={2} sx={centerBold}>
                Total
              </TableCell>

              <TableCell
                colSpan={2}
                sx={{ ...centerBold, textAlign: "center" }}
              >
                {formatCurrency(monthlyGross)}
              </TableCell>
            </TableRow>

            {/* ===== DEDUCTIONS ===== */}
            <TableRow>
              <TableCell colSpan={4} sx={centerBold}>
                Deductions
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={cell}>
                PT
              </TableCell>

              <TableCell colSpan={2} sx={{ ...cell, textAlign: "center" }}>
                {formatCurrency(pt)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={cell}>
                Other Deduction
              </TableCell>

              <TableCell colSpan={2} sx={{ ...cell, textAlign: "center" }}>
                {formatCurrency(otherDeduction)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={centerBold}>
                Total Deduction
              </TableCell>

              <TableCell
                colSpan={2}
                sx={{ ...centerBold, textAlign: "center" }}
              >
                {formatCurrency(totalDeduction)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={centerBold}>
                Net Pay
              </TableCell>

              <TableCell
                colSpan={2}
                sx={{ ...centerBold, textAlign: "center" }}
              >
                {formatCurrency(netPay)}
              </TableCell>
            </TableRow>

            {/* ===== IN WORDS ===== */}
            <TableRow>
              <TableCell colSpan={2} sx={centerBold}>
                In Words
              </TableCell>

              <TableCell colSpan={2} sx={cell} align="center">
                <strong>{numberToWords(Math.round(netPay))}</strong>
              </TableCell>
            </TableRow>

            {/* ===== SIGNATURE ===== */}
            <TableRow>
              <TableCell align="center" sx={cell}>
                <img
                  src={stampImg}
                  alt="Stamp"
                  width={90}
                  style={{ display: "block", margin: "0 auto" }}
                />
              </TableCell>

              <TableCell colSpan={2} sx={cell}></TableCell>

              <TableCell align="center" sx={cell}>
                <img
                  src={signImg}
                  alt="Sign"
                  width={120}
                  style={{ display: "block", margin: "0 auto" }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </A4Page>
  );
};

export default SmartMatrixSalarySlip;
