import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableRow } from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { numberToWords, formatAmt as fmt } from "../../../../../utils/salaryFormatters";
import { calculateSalaryBreakdown } from "../../../../../utils/salaryCalculator";

const C = (extra = {}) => ({
  border: "1px solid #000",
  padding: "0px 12px 12px 12px",
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
  const desg = data.currentDesignation || "";
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
  // const paidDays = Number(data.paiddays || totalDaysInMonth);
  const monthLabel = getMonthLabel(data.month);

  const totalDays = Number(data.workdays || totalDaysInMonth);
  const paidDays = Number(data.paiddays || totalDays);

  const { actual, earned, deductions, netPay } = calculateSalaryBreakdown({
    ...data,
    workdays: totalDays,
    paiddays: paidDays,
  });

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

            {/* Basic */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>
                Basic
              </TableCell>

              <TableCell sx={C({ textAlign: "center" })}>
                {fmt(actual.basic)}
              </TableCell>

              <TableCell sx={C({ textAlign: "center" })}>
                {fmt(earned.basic)}
              </TableCell>
            </TableRow>


            {/* HRA */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>
                H.R.A.
              </TableCell>

              <TableCell sx={C({ textAlign: "center" })}>
                {fmt(actual.hra)}
              </TableCell>

              <TableCell sx={C({ textAlign: "center" })}>
                {fmt(earned.hra)}
              </TableCell>
            </TableRow>


            {/* DA */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>
                D.A.
              </TableCell>

              <TableCell sx={C({ textAlign: "center" })}>
                {fmt(actual.da)}
              </TableCell>

              <TableCell sx={C({ textAlign: "center" })}>
                {fmt(earned.da)}
              </TableCell>
            </TableRow>


            {/* Special Allowance */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>
                Special Allowance
              </TableCell>

              <TableCell sx={C({ textAlign: "center" })}>
                {fmt(actual.special)}
              </TableCell>

              <TableCell sx={C({ textAlign: "center" })}>
                {fmt(earned.special)}
              </TableCell>
            </TableRow>


            {/* Food Allowance */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>
                Food Allowance
              </TableCell>

              <TableCell sx={C({ textAlign: "center" })}>
                {fmt(actual.food)}
              </TableCell>

              <TableCell sx={C({ textAlign: "center" })}>
                {fmt(earned.food)}
              </TableCell>
            </TableRow>


            {/* PF Allowance */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>
                PF Allowance
              </TableCell>

              <TableCell sx={C({ textAlign: "center" })}>
                {fmt(actual.pfAllowance)}
              </TableCell>

              <TableCell sx={C({ textAlign: "center" })}>
                {fmt(earned.pfAllowance)}
              </TableCell>
            </TableRow>


            {/* Grand Total A */}
            <TableRow>
              <TableCell
                colSpan={3}
                sx={C({
                  textAlign: "center",
                  fontWeight: "bold"
                })}
              >
                Grand Total "A"
              </TableCell>

              <TableCell
                sx={C({
                  textAlign: "center"
                })}
              >
                {fmt(actual.total)}
              </TableCell>

              <TableCell
                sx={C({
                  textAlign: "center"
                })}
              >
                {fmt(earned.total)}
              </TableCell>
            </TableRow>

            {/* Deductions Header */}
            <TableRow>
              <TableCell colSpan={5} sx={C({ textAlign: "center", fontWeight: "bold" })}>Less Deductions (-)</TableCell>
            </TableRow>

            {/* Deductions */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>Provident Fund</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}></TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}>{fmt(deductions.pf)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>Professional Tax</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}></TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}>{fmt(deductions.pt)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center" })}>Others</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}></TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}>{fmt(deductions.others)}</TableCell>
            </TableRow>

            {/* Total Deductions */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center", fontWeight: "bold" })}>Total Deductions</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}></TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", fontWeight: "bold" })}>{fmt(deductions.total)}</TableCell>
            </TableRow>

            {/* Other Earnings */}
            <TableRow>
              <TableCell colSpan={5} sx={C({ textAlign: "center", fontWeight: "bold" })}>Other Earnings</TableCell>
            </TableRow>

            {/* Total Earnings */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center", fontWeight: "bold" })}>Total</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}></TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", fontWeight: "bold" })}>{fmt(earned.total)}</TableCell>
            </TableRow>

            {/* Net Payable */}
            <TableRow>
              <TableCell colSpan={3} sx={C({ textAlign: "center", fontWeight: "bold" })}>Net Payable (Rs)</TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center" })}></TableCell>
              <TableCell colSpan={1} sx={C({ textAlign: "center", fontWeight: "bold" })}>{fmt(netPay)}</TableCell>
            </TableRow>

            {/* Amount in Words */}
            <TableRow>
              <TableCell colSpan={2} sx={C({ textAlign: "center", fontWeight: "bold" })}>Amount in Words</TableCell>
              <TableCell colSpan={3} sx={C({ textAlign: "center", fontWeight: "bold" })}>{numberToWords(netPay)}</TableCell>
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
