import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { calculateSalaryBreakdown } from "../../../../../utils/salaryCalculator";
import { numberToWords, formatAmt } from "../../../../../utils/salaryFormatters";

/* ================= COMMON STYLES ================= */

const formatMonth = (m) =>
  m ? new Date(`${m}-01`).toLocaleString("default", { month: "long" }) : "";

const tableCell = {
  border: "1px solid #000",
  fontSize: "12px",
  padding: "0px 12px 12px 12px",
};

const centerBold = { ...tableCell, fontWeight: 700, textAlign: "center" };
const boldCell = { ...tableCell, fontWeight: 700 };
const centerCell = { ...tableCell, textAlign: "center" };
const rightCell = { ...tableCell, textAlign: "right" };

const headerBg = { backgroundColor: "#ffffff" };
const subHeaderBg = { backgroundColor: "#ffffff" };

/* ================= COMPONENT ================= */

const NeweageFullandfinal = ({ company, data }) => {
  const totalDays = Number(data.workdays || 0);
  const paidDays = Number(data.paiddays || 0);
  const ratio = paidDays / totalDays;

  const totalDaysInMonth = Number(data.workdays || 0);
  const paidDaysVal = Number(data.paiddays || 0);
  const monthlyCTC = parseFloat(data.totalSalary || 0);

  const { actual, earned, deductions, netPay } = calculateSalaryBreakdown({
    salary: monthlyCTC * 12,
    workdays: totalDaysInMonth,
    paiddays: paidDaysVal,
  });

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <Box mt={-1}>
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
              <TableCell sx={centerCell}>{totalDaysInMonth}</TableCell>
              <TableCell sx={boldCell}>Paid Days</TableCell>
              <TableCell sx={centerCell}>{paidDaysVal}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={boldCell} colSpan={2}>Earnings</TableCell>
              <TableCell sx={centerBold}>Actual</TableCell>
              <TableCell sx={centerBold}>Earned</TableCell>
            </TableRow>
            {[
              ["Basic", actual.basic, earned.basic],
              ["HRA", actual.hra, earned.hra],
              ["Dearness Allowance", actual.da, earned.da],
              ["Special Allowance", actual.special, earned.special],
              ["Food Allowance", actual.food, earned.food],
              ["PF", actual.pfAllowance, earned.pfAllowance],
            ].map(([label, actVal, earnVal]) => (
              <TableRow key={label}>
                <TableCell sx={tableCell} colSpan={2}>
                  {label}
                </TableCell>

                <TableCell sx={centerCell}>
                  {formatAmt(actVal)}
                </TableCell>

                <TableCell sx={centerCell}>
                  {formatAmt(earnVal)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell sx={boldCell} colSpan={2}>Total</TableCell>
              <TableCell sx={centerCell}>{formatAmt(actual.total)}</TableCell>
              <TableCell sx={centerCell}>{formatAmt(earned.total)}</TableCell>
            </TableRow>

            {/* ================= DEDUCTIONS ================= */}
            <TableRow>
              <TableCell sx={centerBold} colSpan={4}>
                Less Deductions (-)
              </TableCell>
            </TableRow>


            <TableRow>
              <TableCell sx={{ ...tableCell, textAlign: "center" }} colSpan={2}>Provident Fund</TableCell>
              <TableCell sx={rightCell}></TableCell>
<TableCell sx={rightCell}>{formatAmt(deductions.pf)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...tableCell, textAlign: "center" }} colSpan={2}>
                Professional Tax
              </TableCell>
              <TableCell sx={rightCell}></TableCell>
              <TableCell sx={rightCell}>{formatAmt(deductions.pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...tableCell, textAlign: "center" }} colSpan={2}>
                Others
              </TableCell>
              <TableCell sx={rightCell}></TableCell>
              <TableCell sx={rightCell}>{formatAmt(deductions.others)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...tableCell, textAlign: "center" }} colSpan={2}>
                Total Deductions
              </TableCell>
              <TableCell sx={rightCell}></TableCell>
              <TableCell sx={rightCell}>{formatAmt(deductions.total)}</TableCell>
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