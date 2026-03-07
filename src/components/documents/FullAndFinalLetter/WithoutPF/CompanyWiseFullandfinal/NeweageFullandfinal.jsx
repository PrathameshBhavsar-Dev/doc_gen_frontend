import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";

/* ================= COMMON STYLES ================= */

const tableCell = {
  border: "1px solid #000",
  fontSize: "12px",
  padding: "6px",
};

const centerBold = { ...tableCell, fontWeight: 700, textAlign: "center" };
const boldCell = { ...tableCell, fontWeight: 700 };
const centerCell = { ...tableCell, textAlign: "center" };
const rightCell = { ...tableCell, textAlign: "right" };

const headerBg = { backgroundColor: "#ffffff" };
const subHeaderBg = { backgroundColor: "#ffffff" };

/* ================= UTILS ================= */

const formatMonth = (m) =>
  m ? new Date(`${m}-01`).toLocaleString("default", { month: "long" }) : "";

const formatAmt = (n) =>
  Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 });

const numberToWords = (num = 0) => {
  if (!num) return "Zero Only";
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + inWords(n % 100000) : "");
    return inWords(Math.floor(n / 10000000)) + " Crore";
  };

  return `${inWords(Math.round(num))} Only`;
};

/* ================= COMPONENT ================= */

const NeweageFullandfinal = ({ company, data }) => {
  const totalDays = Number(data.workdays || 0);
  const paidDays = Number(data.paiddays || 0);
  const ratio = paidDays / totalDays;

  /* ---------- SALARY LOGIC (NEWEAGE) ---------- */
const gross = Number(data.totalSalary || 0);

// Correct Percentage Breakup (100%)
const basic = Math.floor(gross * 0.40);     // 40%
const hra = Math.floor(gross * 0.18);       // 18%
const special = Math.floor(gross * 0.12);   // 12%
const da = Math.floor(gross * 0.16);        // 16%
const food = Math.floor(gross * 0.06);      // 6%
const facility = Math.floor(gross * 0.08);  // 8%

const earned = (value) =>
  Math.floor(
    value * (paidDays && totalDays ? paidDays / totalDays : 0)
  );

const totalActual = Math.floor(
  basic + hra + special + da + food + facility
);

const totalEarned = Math.floor(
  earned(basic) +
  earned(hra) +
  earned(special) +
  earned(da) +
  earned(food) +
  earned(facility)
);

  /* ---------- DEDUCTIONS ---------- */
  const pt = 200;
  const others = 2000;
  const totalDeductions = pt + others;

  const netPay = totalEarned - totalDeductions;

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <Box mt={2}>
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableBody>

            {/* ================= HEADER ================= */}
            <TableRow>
              <TableCell sx={{ ...centerBold, ...headerBg }} colSpan={4}>
                Full & Final Settlement Statement
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...centerBold, ...headerBg }} colSpan={4}>
                NEWEAGE CLOUD SOFTWARE SERVICES PVT. LTD.
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...centerCell, ...headerBg }} colSpan={4}>
                Office No-4B, Second Floor, Ganesham Wing-A,<br />
                On BRTS Road, Pimple Saudagar, Pune - 411027
              </TableCell>
            </TableRow>

            {/* ================= EMPLOYEE DETAILS ================= */}
            {[
              ["Name of the Employee", data.employeeName, "F & F Date", data.date],
              ["Employee ID", data.employeeId, "Joining Date", data.doj],
              ["Designation", data.designation, "Date of Resignation", data.dateofresignation],
              ["Department", data.department, "Date of Leaving", data.dateofleaving],
            ].map((r, i) => (
              <TableRow key={i}>
                <TableCell sx={boldCell}>{r[0]}</TableCell>
                <TableCell sx={tableCell}>{r[1]}</TableCell>
                <TableCell sx={boldCell}>{r[2]}</TableCell>
                <TableCell sx={tableCell}>{r[3]}</TableCell>
              </TableRow>
            ))}

            {/* ================= SALARY HEADER ================= */}
            <TableRow>
              <TableCell sx={{ ...centerBold, ...subHeaderBg }} colSpan={2}>
                Salary particulars
              </TableCell>
              <TableCell sx={{ ...centerBold, ...subHeaderBg }}>
                For the month
              </TableCell>
              <TableCell sx={{ ...centerBold, ...subHeaderBg }}>
                {formatMonth(data.month)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={boldCell}>Total Days</TableCell>
              <TableCell sx={centerCell}>{totalDays}</TableCell>
              <TableCell sx={boldCell}>Paid Days</TableCell>
              <TableCell sx={centerCell}>{paidDays}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={boldCell} colSpan={2}>Earnings</TableCell>
              <TableCell sx={centerBold}>Actual</TableCell>
              <TableCell sx={centerBold}>Earned</TableCell>
            </TableRow>

            {[
              ["Basic", basic],
              ["HRA", hra],
              ["Dearness Allowance", da],
              ["Special Allowance", special],
              ["Facility Allowance", facility],
              ["Food Allowance", food],
            ].map(([l, v]) => (
              <TableRow key={l}>
                <TableCell sx={tableCell} colSpan={2}>{l}</TableCell>
                <TableCell sx={centerCell}>{formatAmt(v)}</TableCell>
                <TableCell sx={centerCell}>{formatAmt(earned(v))}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell sx={boldCell} colSpan={2}>Total</TableCell>
              <TableCell sx={centerCell}>{formatAmt(totalActual)}</TableCell>
              <TableCell sx={centerCell}>{formatAmt(totalEarned)}</TableCell>
            </TableRow>

            {/* ================= DEDUCTIONS ================= */}
            <TableRow>
              <TableCell sx={centerBold} colSpan={4}>
                Less Deductions (-)
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...tableCell, textAlign: "center" }} colSpan={2}>
                Professional Tax
              </TableCell>
              <TableCell sx={rightCell}></TableCell>
              <TableCell sx={rightCell}>{formatAmt(pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...tableCell, textAlign: "center" }} colSpan={2}>
                Others
              </TableCell>
              <TableCell sx={rightCell}></TableCell>
              <TableCell sx={rightCell}>{formatAmt(others)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...tableCell, textAlign: "center" }} colSpan={2}>
                Total Deductions
              </TableCell>
              <TableCell sx={rightCell}></TableCell>
              <TableCell sx={rightCell}>{formatAmt(totalDeductions)}</TableCell>
            </TableRow>

            {/* ================= NET PAY ================= */}
            <TableRow>
              <TableCell sx={{ ...tableCell, textAlign: "center" }} colSpan={2}>
                Net Payable (Rs)
              </TableCell>
              <TableCell sx={rightCell}></TableCell>
              <TableCell sx={rightCell}>{formatAmt(netPay)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={boldCell} colSpan={4}>
                <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
                  <span>Amount in Words</span>
                  <span>{numberToWords(netPay)}</span>
                </Box>
              </TableCell>
            </TableRow>

            {/* ================= SIGNATURES ================= */}
            <TableRow>
              <TableCell sx={centerBold}></TableCell>
              <TableCell sx={centerBold}>
                <img src={company.stamp} width="80" height="80" />
              </TableCell>
              <TableCell sx={centerBold} colSpan={2}>
                <img src={company.signature} width="120" height="60" />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={centerCell}>Prepared By</TableCell>
              <TableCell sx={centerCell}>Verified By</TableCell>
              <TableCell sx={centerCell} colSpan={2}>Approved By</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </Box>
    </A4Page>
  );
};

export default NeweageFullandfinal;