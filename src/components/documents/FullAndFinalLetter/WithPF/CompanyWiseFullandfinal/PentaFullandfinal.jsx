
import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

/* ---------------- COLORS ---------------- */
const headerBg = "#EAF4FB";
const sectionBg = "#F3F6F8";
const totalBg = "#E1EEF9";

/* ---------------- STYLES ---------------- */
const cell = {
  border: "1px solid #000",
  padding: "4px",
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

const numberFormat = (n) =>
  Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  });

/* ---------------- SALARY BREAKUP ---------------- */
const getSalaryBreakup = (totalSalary = 0) => {
  const basic = +(totalSalary * 0.48).toFixed(2);
  const hra = +(totalSalary * 0.18).toFixed(2);
  const da = +(totalSalary * 0.12).toFixed(2);
  const special = +(totalSalary * 0.16).toFixed(2);
  const food = +(totalSalary * 0.06).toFixed(2);
  // ✅ PF Allowance Static
  const pfAllowance = 3750;


  return {
    basic,
    hra,
    da,
    special,
    food,
    pf: 3750,
    pt: 200,
    other: 2000,
  };
};

/* ---------------- NUMBER TO WORDS ---------------- */
const numberToWords = (num) => {
  if (!num) return "Zero Only";

  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six",
    "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const b = [
    "", "", "Twenty", "Thirty", "Forty",
    "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
  ];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100)
      return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " " + inWords(n % 100) : "")
      );
    if (n < 100000)
      return (
        inWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 ? " " + inWords(n % 1000) : "")
      );
    if (n < 10000000)
      return (
        inWords(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 ? " " + inWords(n % 100000) : "")
      );
    return (
      inWords(Math.floor(n / 10000000)) + " Crore"
    );
  };

  return inWords(Math.round(num)) + " Rs Only";
};

/* ---------------- COMPONENT ---------------- */
const PentaFullandfinal = ({ company, data }) => {
  /* ---- Days ---- */
  const totalDays = getDaysInMonth(data.month);
  const paidDays = Number(data.paiddays || 0);
  const paidRatio = totalDays ? paidDays / totalDays : 0;

  /* ---- Salary ---- */
  const totalSalary = Number(data.totalSalary || 0);
  const salary = getSalaryBreakup(totalSalary);

  /* ---- Earnings ---- */
  const earnings = [
    { label: "Basic Salary", value: salary.basic },
    { label: "HRA", value: salary.hra },
    { label: "Dearness Allowance", value: salary.da },
    { label: "Special Allowance", value: salary.special },
    { label: "Food Allowance", value: salary.food },
    { label: "PF", value: salary.pf, excludeFromTotal: true },
  ];

  const earningsTotal = earnings.reduce(
    (sum, item) =>
      item.excludeFromTotal
        ? sum
        : sum + item.value,
    0
  );

 const earnedTotal = Math.floor(
  earnings.reduce(
    (sum, item) =>
      item.excludeFromTotal
        ? sum
        : sum + Math.floor(item.value * paidRatio),
    0
  )
);
  /* ---- Deductions ---- */
  const deductionsTotal = salary.pt + salary.other + salary.pf;

  /* ---- Other Earnings ---- */
  const leaveEncashment = Number(data.leaveencashment || 0);

  /* ---- Net Pay ---- */
  const netPay =
    earnedTotal - deductionsTotal + leaveEncashment;

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
              <TableCell sx={cell}>{data.designation}</TableCell>
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

                <TableCell sx={cell}>
                  {numberFormat(item.value)}
                </TableCell>

               <TableCell sx={cell}>
  {numberFormat(
    item.label === "PF"
      ? item.value
      : Math.floor(item.value * paidRatio)
  )}
                </TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: totalBg }}>
              <TableCell colSpan={2} sx={{ ...cell, ...bold }}>
                Total Earnings
              </TableCell>
              <TableCell sx={{ ...cell, ...bold }}>
                {numberFormat(earningsTotal)}
              </TableCell>
              <TableCell sx={{ ...cell, ...bold }}>
                {numberFormat(earnedTotal)}
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
              <TableCell sx={cell}>{numberFormat(salary.pf)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Professional Tax</TableCell>
              <TableCell colSpan={2} sx={cell}></TableCell>
              <TableCell sx={cell}>{numberFormat(salary.pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Other</TableCell>
              <TableCell colSpan={2} sx={cell}></TableCell>
              <TableCell sx={cell}>{numberFormat(salary.other)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...cell, ...bold }}>Total Deductions</TableCell>
              <TableCell colSpan={2} sx={cell}></TableCell>
              <TableCell sx={{ ...cell, ...bold }}>
                {numberFormat(deductionsTotal)}
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
              <TableCell sx={{ ...cell, ...center }}>
                Prepared By
              </TableCell>
              <TableCell sx={{ ...cell, ...center }}>
                <img src={company.stamp} height={50} alt="stamp" />
                <br />
                Verified By
              </TableCell>
              <TableCell colSpan={2} sx={{ ...cell, ...center }}>
                <img src={company.signature} height={45} alt="sign" />
                <br />
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