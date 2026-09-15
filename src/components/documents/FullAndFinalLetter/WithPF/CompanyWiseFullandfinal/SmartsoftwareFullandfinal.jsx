import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { formatAmt, numberToWords } from "../../../../../utils/salaryFormatters";
import { calculateSalaryBreakdown } from "../../../../../utils/salaryCalculator";

/* ================== COMMON STYLES ================== */
const cell = {
  border: "1px solid #000",
  fontSize: "13px",
  padding: "0px 12px 12px 12px",    // less spacing
  lineHeight: 1.1,
};

const bold = { fontWeight: 700 };
const center = { textAlign: "center" };
const right = { textAlign: "right" };

/* ================== UTILS ================== */
const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB") : "";

const formatMonth = (m) =>
  m ? new Date(`${m}-01`).toLocaleString("default", { month: "long" }) : "";

/* ================== COMPONENT ================== */
const SmartsoftwareFullAndfinal = ({ company = {}, data = {} }) => {
  const totalDays = Number(data.workdays || 0);
  const paidDays = Number(data.paiddays || 0);
  const ratio = totalDays ? paidDays / totalDays : 0;

  const { actual, earned, deductions, netPay: netPayBase } = calculateSalaryBreakdown({
    salary: Number(data.totalSalary || 0) * 12,
    workdays: totalDays,
    paiddays: paidDays,
  });

  const leaveEncashment = Number(data.leaveencashment || 0);
  const netPay = netPayBase + leaveEncashment;

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <Box sx={{ width: "95%", margin: "0 auto" }}>
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableBody>

            {/* TITLE */}
            <TableRow>
              <TableCell colSpan={4} sx={{ ...cell, ...bold, ...center }}>
                Full & Final Settlement Statement
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} sx={{ ...cell, ...bold, ...center }}>
                {company.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} sx={{ ...cell, ...center }}>
                {company.address}
              </TableCell>
            </TableRow>

            {/* EMPLOYEE DETAILS */}
            <TableRow>
              <TableCell sx={cell}>Name of the employee</TableCell>
              <TableCell sx={cell}>{data.employeeName}</TableCell>
              <TableCell sx={cell}>F&F Date</TableCell>
              <TableCell sx={cell}>{formatDate(data.date)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Employee ID</TableCell>
              <TableCell sx={cell}>{data.employeeId}</TableCell>
              <TableCell sx={cell}>Joining Date</TableCell>
              <TableCell sx={cell}>{formatDate(data.doj)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Designation</TableCell>
              <TableCell sx={cell}>{data.currentDesignation}</TableCell>
              <TableCell sx={cell}>Date of Resignation</TableCell>
              <TableCell sx={cell}>{formatDate(data.dateofresignation)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Department</TableCell>
              <TableCell sx={cell}>{data.department}</TableCell>
              <TableCell sx={cell}>Date of Leaving</TableCell>
              <TableCell sx={cell}>{formatDate(data.dateofleaving)}</TableCell>
            </TableRow>

            {/* SALARY PARTICULARS */}
            <TableRow>
              <TableCell colSpan={2} sx={{ ...cell, ...bold, ...center }}>Salary particulars</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...center }}>For the month</TableCell>
              <TableCell sx={{ ...cell, ...center }}>{formatMonth(data.month)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Total Day in the month</TableCell>
              <TableCell sx={{ ...cell, ...center }}>{totalDays}</TableCell>
              <TableCell sx={cell}>Paid days</TableCell>
              <TableCell sx={{ ...cell, ...center }}>{paidDays}</TableCell>
            </TableRow>

            {/* Earnings Section */}
            <TableRow>
              <TableCell colSpan={2} sx={{ ...cell, ...bold }}>Earnings</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...center }}>Actual</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...center }}>Earned</TableCell>
            </TableRow>

            {[
              ["Basic", actual.basic, earned.basic],
              ["HRA", actual.hra, earned.hra],
              ["Conveyance Allowance", actual.da, earned.da],
              ["Special Allowances", actual.special, earned.special],
              ["Food Allowance", actual.food, earned.food],
              ["PF Allowance", actual.pfAllowance, earned.pfAllowance],
            ].map(([label, actVal, earnVal]) => (
              <TableRow key={label}>
                <TableCell colSpan={2} sx={cell}>{label}</TableCell>
                <TableCell sx={{ ...cell, ...center }}>{formatAmt(actVal)}</TableCell>
                <TableCell sx={{ ...cell, ...center }}>{formatAmt(earnVal)}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={2} sx={{ ...cell, ...bold }}>Total</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...center }}>{formatAmt(actual.total)}</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...center }}>{formatAmt(earned.total)}</TableCell>
            </TableRow>

            {/* Deductions */}
            <TableRow>
              <TableCell colSpan={4} sx={{ ...cell, ...bold, ...center }}>Less Deductions (-)</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>Provident Fund</TableCell>
              <TableCell sx={{ ...cell, ...right }}>{formatAmt(deductions.pf)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>Professional Tax</TableCell>
              <TableCell sx={{ ...cell, ...right }}>{formatAmt(deductions.pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>Others</TableCell>
              <TableCell sx={{ ...cell, ...right }}>{formatAmt(deductions.others)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={{ ...cell, ...bold }}>Total Deductions</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...right }}>{formatAmt(deductions.total)}</TableCell>
            </TableRow>

            {/* OTHER EARNINGS */}
            <TableRow>
              <TableCell colSpan={4} sx={{ ...cell, ...bold, ...center }}>Other Earnings</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={cell}>Leave encashment</TableCell>
              <TableCell colSpan={2} sx={{ ...cell, ...right }}>{formatAmt(data.leaveencashment || 0)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={cell}>Total</TableCell>
              <TableCell colSpan={2} sx={{ ...cell, ...right }}>{formatAmt(earned.total)}</TableCell>
            </TableRow>

            {/* Net Pay */}
            <TableRow>
              <TableCell colSpan={3} sx={{ ...cell, ...bold }}>Net Payable (Rs)</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...right }}>{formatAmt(netPay)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Amount in Words</TableCell>
              <TableCell colSpan={3} sx={cell}>{numberToWords(netPay)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...cell, ...center }}></TableCell>

              {/* STAMP */}
              <TableCell sx={{ ...cell }}>
                {company.stamp && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px", // ✅ increased to match stamp
                    }}
                  >
                    <img
                      src={company.stamp}
                      alt="Stamp"
                      style={{
                        height: "100px",   // ✅ big stamp
                        width: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                )}
              </TableCell>

              {/* SIGNATURE */}
              <TableCell colSpan={2} sx={{ ...cell }}>
                {company.signature && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px", // ✅ same as stamp for alignment
                    }}
                  >
                    <img
                      src={company.signature}
                      alt="Signature"
                      style={{
                        height: "80px",   // ✅ balanced size
                        width: "auto",
                      }}
                    />
                  </Box>
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...cell, ...center }}>Prepared By</TableCell>
              <TableCell sx={{ ...cell, ...center }}>Verified By</TableCell>
              <TableCell colSpan={2} sx={{ ...cell, ...center }}>Approved By</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </Box>
    </A4Page>
  );
};

export default SmartsoftwareFullAndfinal;