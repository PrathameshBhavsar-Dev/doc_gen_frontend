
import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { formatAmt as numberFormat, numberToWords } from "../../../../../utils/salaryFormatters";
import { calculateSalaryBreakdown } from "../../../../../utils/salaryCalculator";

/* ---------------- COLORS ---------------- */
const headerBg = "#EAF4FB";
const sectionBg = "#F3F6F8";
const totalBg = "#E1EEF9";

/* ---------------- STYLES ---------------- */
const cell = {
  border: "1px solid #000",
  padding: "0px 12px 12px 12px",
  fontSize: "12px",
  lineHeight: 1.2,
};

const bold = { fontWeight: "bold" };
const center = { textAlign: "center" };

/* ---------------- DATE UTILS ---------------- */
const getDaysInMonth = (monthValue) => {
  if (!monthValue) return 0;
  const date = new Date(`${monthValue}-01`);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB") : "";

const formatMonth = (v) => {
  if (!v) return "";
  const d = new Date(`${v}-01`);
  return d.toLocaleDateString("en-US", { month: "long" });
};

/* ---------------- COMPONENT ---------------- */
const PentaFullandfinal = ({ company, data }) => {

  /* ---- Days ---- */
  const totalDays = getDaysInMonth(data.month);
  const paidDays = Number(data.paiddays || 0);

  const { actual, earned, deductions, netPay: netPayBase } = calculateSalaryBreakdown({
    salary: Number(data.totalSalary || 0) * 12,
    workdays: totalDays,
    paiddays: paidDays,
  });

  const leaveEncashment = Number(data.leaveencashment || 0);
  const netPay = netPayBase + leaveEncashment;

  const earnings = [
    { label: "Basic Salary", actual: actual.basic, earned: earned.basic },
    { label: "HRA", actual: actual.hra, earned: earned.hra },
    { label: "Dearness Allowance", actual: actual.da, earned: earned.da },
    { label: "Special Allowance", actual: actual.special, earned: earned.special },
    { label: "Food Allowance", actual: actual.food, earned: earned.food },
    { label: "PF", actual: actual.pfAllowance, earned: earned.pfAllowance },
  ];

  return (
    <Box
      sx={{
        width: "210mm",
        height: "297mm",
        position: "relative",
        fontFamily: "Cambria, serif",
        backgroundColor: "#fff",
      }}
    >
      {/* HEADER */}
      {company.header && (
        <Box sx={{ position: "absolute", top: 0, width: "100%" }}>
          <img src={company.header} width="100%" alt="header" />
        </Box>
      )}

      {/* CONTENT */}
      <Box
        sx={{
          position: "absolute",
          top: "50mm",
          bottom: "40mm",
          left: "12mm",
          right: "12mm",
        }}
      >
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableBody>

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

            <TableRow>
              <TableCell sx={{ ...cell, ...bold }}>Employee Name</TableCell>
              <TableCell sx={cell}>{data.employeeName}</TableCell>
              <TableCell sx={{ ...cell, ...bold }}>F&F Date</TableCell>
              <TableCell sx={cell}>{formatDate(data.date)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...cell, ...bold }}>Employee ID</TableCell>
              <TableCell sx={cell}>{data.employeeId}</TableCell>
              <TableCell sx={{ ...cell, ...bold }}>Joining Date</TableCell>
              <TableCell sx={cell}>{formatDate(data.doj)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...cell, ...bold }}>Designation</TableCell>
              <TableCell sx={cell}>{data.currentDesignation}</TableCell>
              <TableCell sx={{ ...cell, ...bold }}>Date of Resignation</TableCell>
              <TableCell sx={cell}>{formatDate(data.dateofresignation)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...cell, ...bold }}>Department</TableCell>
              <TableCell sx={cell}>{data.department}</TableCell>
              <TableCell sx={{ ...cell, ...bold }}>Date of Leaving</TableCell>
              <TableCell sx={cell}>{formatDate(data.dateofleaving)}</TableCell>
            </TableRow>



            <TableRow>
              <TableCell colSpan={2} sx={{ ...cell, ...bold }}>
                Salary Particulars
              </TableCell>
              <TableCell sx={{ ...cell, ...bold }}>For Month</TableCell>
              <TableCell sx={cell}>{formatMonth(data.month)}</TableCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: sectionBg }}>
              <TableCell sx={{ ...cell, ...bold }}>Total Days</TableCell>
              <TableCell sx={cell}>{totalDays}</TableCell>
              <TableCell sx={{ ...cell, ...bold }}>Paid Days</TableCell>
              <TableCell sx={cell}>{paidDays}</TableCell>
            </TableRow>


            <TableRow sx={{ backgroundColor: headerBg }}>
              <TableCell colSpan={2} sx={{ ...cell, ...bold }}>Earnings</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...center }}>Actual</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...center }}>Earned</TableCell>
            </TableRow>
            {earnings.map((item, i) => (
              <TableRow key={i}>
                <TableCell colSpan={2} sx={cell}>
                  {item.label}
                </TableCell>
                <TableCell sx={cell}>{numberFormat(item.actual)}</TableCell>
                <TableCell sx={cell}>{numberFormat(item.earned)}</TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: totalBg }}>
              <TableCell colSpan={2} sx={{ ...cell, ...bold }}>
                Total Earnings
              </TableCell>
              <TableCell sx={{ ...cell, ...bold }}>
                {numberFormat(actual.total)}
              </TableCell>
              <TableCell sx={{ ...cell, ...bold }}>
                {numberFormat(earned.total)}
              </TableCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: sectionBg }}>
              <TableCell colSpan={4} sx={{ ...cell, ...bold, ...center }}>
                Less Deductions (-)
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Provident Fund</TableCell>
              <TableCell colSpan={2} sx={cell}></TableCell>
              <TableCell sx={cell}>{numberFormat(deductions.pf)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Professional Tax</TableCell>
              <TableCell colSpan={2} sx={cell}></TableCell>
              <TableCell sx={cell}>{numberFormat(deductions.pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Other</TableCell>
              <TableCell colSpan={2} sx={cell}></TableCell>
              <TableCell sx={cell}>{numberFormat(deductions.others)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...cell, ...bold }}>Total Deductions</TableCell>
              <TableCell colSpan={2} sx={cell}></TableCell>
              <TableCell sx={{ ...cell, ...bold }}>
                {numberFormat(deductions.total)}
              </TableCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: sectionBg }}>
              <TableCell colSpan={4} sx={{ ...cell, ...bold, ...center }}>
                Other Earnings
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Leave encashment (Dys)</TableCell>
              <TableCell colSpan={2} sx={cell}></TableCell>
              <TableCell sx={cell}>{numberFormat(data.leaveencashment)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Total</TableCell>
              <TableCell colSpan={2} sx={cell}></TableCell>
              <TableCell sx={cell}>{numberFormat(data.totalSalary)}</TableCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: totalBg }}>
              <TableCell sx={{ ...cell, ...bold }}>Net Payable (Rs)</TableCell>
              <TableCell colSpan={2} sx={cell}></TableCell>
              <TableCell sx={{ ...cell, ...bold }}>
                {numberFormat(netPay)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...cell, ...bold }}>Amount in Words</TableCell>
              <TableCell colSpan={3} sx={cell}>
                {numberToWords(netPay)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ ...cell, ...center }} style={{ mt: "15" }}>
                Prepared By
              </TableCell>

              <TableCell sx={{ ...cell, ...center }}>
                <img
                  src={company.stamp}
                  alt="stamp"
                  style={{ height: "55px", width: "auto", display: "block", margin: "0 auto" }}
                />
                Verified By
              </TableCell>

              <TableCell colSpan={2} sx={{ ...cell, ...center }}>
                <img
                  src={company.signature}
                  alt="sign"
                  style={{ height: "40px", width: "auto", display: "block", margin: "0 auto" }}
                />
                Approved By
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </Box>

      {/* FOOTER */}
      {company.footer && (
        <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <img src={company.footer} width="100%" alt="footer" />
        </Box>
      )}
    </Box>
  );
};

export default PentaFullandfinal;