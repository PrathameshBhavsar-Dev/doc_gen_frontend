import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableRow } from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import cubeage_stamp from "../../../../../assets/images/cubeagetechnology/cubeage_stamp.png";

/* ── Number to Words ── */
const numberToWords = (num) => {
  if (!num || num === 0) return "Zero Rupees Only";
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + inWords(n % 100000) : "");
    return "";
  };
  return inWords(Math.round(num)) + " Rupees Only";
};

const fmt = (n) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const round2 = (n) => Math.round(n * 100) / 100;

const C = (extra = {}) => ({
  border: "1px solid #000",
  padding: "5px 8px",
  fontSize: "12.5px",
  height: "35px",
  verticalAlign: "middle",
  ...extra,
});

const W = { label: "30%", amt: "20%", dlabel: "30%", damt: "20%" };

const getMonthLabel = (month) => {
  if (!month) return "";
  const [year, monthNum] = month.split("-");
  const d = new Date(year, monthNum - 1);
  return `${d.toLocaleString("default", { month: "long" })} ${year}`;
};

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return isNaN(d) ? date : d.toLocaleDateString("en-GB");
};

const CubeageFullAndFinal = ({ data = {}, company = {} }) => {
  const header = data?.header || company?.header;

  const name = data.employeeName || "";
  const empId = data.employeeId || "";
  const desg = data.designation || "";
  const doj = data.doj || "";
  const dateOfResignation = data.dateofresignation || "";
  const dateOfLeaving = data.dateofleaving || "";
  const fnfDate = data.date || "";

  // Automatically calculate total days in the month
  const getTotalDaysInMonth = (monthStr) => {
    if (!monthStr) return 31;
    const [year, monthNum] = monthStr.split("-");
    return new Date(year, monthNum, 0).getDate();
  };

  const totalDaysInMonth = Number(data.workdays || getTotalDaysInMonth(data.month));
  const paidDays = Number(data.paiddays || totalDaysInMonth);
  const monthLabel = getMonthLabel(data.month);

  /* ── Salary (With PF) ── */

  const monthlyCTC = Math.floor(parseFloat(data.totalSalary || 0));

  // Calculate actual components
  const basicActual = Math.floor(monthlyCTC * 0.48);
  const hraActual = Math.floor(monthlyCTC * 0.18);
  const daActual = Math.floor(monthlyCTC * 0.12);
  const allowActual = Math.floor(monthlyCTC * 0.16);

  let pfAllowanceActual = Math.floor(monthlyCTC * 0.06);
  const totalAfterRoundingActual = basicActual + hraActual + daActual + allowActual + pfAllowanceActual;
  pfAllowanceActual = pfAllowanceActual + (monthlyCTC - totalAfterRoundingActual);
  const grandTotalActual = basicActual + hraActual + daActual + allowActual + pfAllowanceActual;

  // Calculate earned components (Strictly matching Salary Slip's Math.floor logic)
  const earnedCTC = (monthlyCTC * paidDays) / totalDaysInMonth;

  const basicEarned = Math.floor(earnedCTC * 0.48);
  const hraEarned = Math.floor(earnedCTC * 0.18);
  const daEarned = Math.floor(earnedCTC * 0.12);
  const allowEarned = Math.floor(earnedCTC * 0.16);

  // Earned PF Allowance is exactly what is left after pulling out the fixed values from the total prorated earned salary
  const pfAllowanceEarned = Math.floor(earnedCTC) - (basicEarned + hraEarned + daEarned + allowEarned);
  const grandTotalEarned = basicEarned + hraEarned + daEarned + allowEarned + pfAllowanceEarned;

  /* ── leave encashment and total earning ── */
  const leaveEncashment = round2(Number(data.leaveencashment || 0));
  const totalEarned = grandTotalEarned;

  /* ── Deductions ── */
  const pf = 3750;
  const pt = 200;
  const otherDed = 2000;
  const totalDeductions = round2(pf + pt + otherDed); // From screenshot, deduction section doesn't show PF explicitly

  /* ── Net ── */
  const netPayable = round2(totalEarned - totalDeductions);
  const balanceSalary = parseFloat(data.balanceSalary || 0);

  return (
    <A4Page
      company={{ ...company, footer: null, footerImage: null, watermark: null, watermarkImage: null }}
      headerSrc={header}
    >
      <Box sx={{ px: 0, py: 1 }}>
        {/* Title */}
        <Typography align="center" fontWeight="bold" fontSize="14px" mt={9} sx={{ textDecoration: "underline" }}>
          Full &amp; Final Settlement Statement
        </Typography>

        <Table sx={{ width: "100%", borderCollapse: "collapse", marginTop: "30px" }}>
          <TableBody>

            {/* Table Header: Employee Details Row 1 */}
            <TableRow>
              <TableCell colSpan={2} sx={C({ textAlign: "center" })}>Name Of The Employee</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{name}</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}>F&F Date</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{formatDate(fnfDate)}</TableCell>
            </TableRow>

            {/* Employee Code | Total Days */}
            <TableRow>
              <TableCell colSpan={2} sx={C({ textAlign: "center" })}>Employee ID</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{empId}</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}>Joining Date</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{formatDate(doj)}</TableCell>
            </TableRow>

            {/* Designation | Resignation Date */}
            <TableRow>
              <TableCell colSpan={2} sx={C({ textAlign: "center" })}>Designation</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{desg}</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}>Date of Resignation</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{formatDate(dateOfResignation)}</TableCell>
            </TableRow>

            {/* Department | Leaving Date */}
            <TableRow>
              <TableCell colSpan={2} sx={C({ textAlign: "center" })}>Department</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{data.department || "IT"}</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}>Date of Leaving</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{formatDate(dateOfLeaving)}</TableCell>
            </TableRow>

            {/* Salary Particulars | For the month */}
            <TableRow>
              <TableCell colSpan={2} rowSpan={2} sx={C({ textAlign: "center", fontWeight: "bold" })}>

                Total Day in the month
              </TableCell>
              <TableCell colSpan={1} rowSpan={2} sx={C({ textAlign: "center", fontWeight: "bold" })}>
                {totalDaysInMonth}
              </TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", fontWeight: "bold" })}>
                For the month
              </TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", fontWeight: "bold" })}>
                {monthLabel ? monthLabel.split(" ")[0] : ""}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={1} sx={C({ textAlign: "center", fontWeight: "bold" })}>
                Paid days
              </TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", fontWeight: "bold" })}>
                {paidDays}
              </TableCell>
            </TableRow>

            {/* Earnings Header */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center", fontWeight: "bold" })}>Earnings</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", fontWeight: "bold" })}>Actual</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", fontWeight: "bold" })}>Earned</TableCell>
            </TableRow>

            {/* Salary Components */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>Basic</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{fmt(basicActual)}</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{fmt(basicEarned)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>H.R.A.</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{fmt(hraActual)}</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{fmt(hraEarned)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>D.A.</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{fmt(daActual)}</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{fmt(daEarned)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>ALLOWANCE (Shift+Skill)</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{fmt(allowActual)}</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{fmt(allowEarned)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>Special Allowance</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{fmt(pfAllowanceActual)}</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{fmt(pfAllowanceEarned)}</TableCell>
            </TableRow>

            {/* Grand Total A */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center", fontWeight: "bold" })}>Grand Total "A"</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{fmt(grandTotalActual)}</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", color: "black" })}>{fmt(grandTotalEarned)}</TableCell>
            </TableRow>

            {/* Deductions Header */}
            <TableRow>
              <TableCell colSpan={5} sx={C({ textAlign: "center", fontWeight: "bold" })}>Less Deductions (-)</TableCell>
            </TableRow>

            {/* Deductions */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>Provident Fund</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}></TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}>{fmt(pf)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>Professional Tax</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}></TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}>{fmt(pt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>Others</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}></TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}>{fmt(otherDed)}</TableCell>
            </TableRow>

            {/* Total Deductions */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center", fontWeight: "bold" })}>Total Deductions</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}></TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", fontWeight: "bold" })}>{fmt(totalDeductions)}</TableCell>
            </TableRow>

            {/* Other Earnings */}
            <TableRow>
              <TableCell colSpan={5} sx={C({ textAlign: "center", fontWeight: "bold" })}>Other Earnings</TableCell>
            </TableRow>

            {/* Total Earnings */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center", fontWeight: "bold" })}>Total</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}></TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", fontWeight: "bold" })}>{fmt(totalEarned)}</TableCell>
            </TableRow>

            {/* Net Payable */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center", fontWeight: "bold" })}>Net Payable (Rs)</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}></TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", fontWeight: "bold" })}>{fmt(netPayable)}</TableCell>
            </TableRow>

            {/* Amount in Words */}
            <TableRow>
              <TableCell colSpan={2} sx={C({ textAlign: "center", fontWeight: "bold" })}>Amount in Words</TableCell>
              <TableCell colSpan={3} sx={C({ textAlign: "center", fontWeight: "bold" })}>{numberToWords(netPayable)}</TableCell>
            </TableRow>

          </TableBody>
        </Table>



        <Typography mt={3} fontSize="12px" fontStyle="italic" textAlign={"center"}>
          *Computer Generated Full &amp; Final Settlement. No Signature Required.
        </Typography>
      </Box>
    </A4Page>
  );
};

export default CubeageFullAndFinal;
