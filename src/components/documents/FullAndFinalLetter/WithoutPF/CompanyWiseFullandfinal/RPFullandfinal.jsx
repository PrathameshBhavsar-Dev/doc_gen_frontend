
import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import A4Page from "../../../../layout/A4Page";


/* ================== COMMON STYLES ================== */
const cell = {
  border: "1px solid #000",
  fontSize: "13px",
  padding: "4px 6px",
};

const bold = { fontWeight: 700 };
const center = { textAlign: "center" };
const right = { textAlign: "right" };

/* ================== UTILS ================== */
const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB") : "";

const formatMonth = (m) =>
  m ? new Date(`${m}-01`).toLocaleString("default", { month: "long" }) : "";

const formatAmt = (n) =>
  Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 });

/* ================== NUMBER TO WORDS ================== */
const numberToWords = (num = 0) => {
  if (!num) return "Zero Only";

  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six",
    "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const inWords = (n) => {
    if (n < 20) return a[n];

    if (n < 100)
      return (
        b[Math.floor(n / 10)] +
        (n % 10 ? " " + a[n % 10] : "")
      );

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
      inWords(Math.floor(n / 10000000)) +
      " Crore" +
      (n % 10000000 ? " " + inWords(n % 10000000) : "")
    );
  };

  return `${inWords(Math.round(num))} Only`;
};

/* ================== COMPONENT ================== */
const RPFullAndFinal = ({ company = {}, data = {} }) => {
  const totalDays = Number(data.workdays || ' ');
  const paidDays = Number(data.paiddays || 0);
  const ratio = paidDays / totalDays;

  /* ---------- PENTA SALARY LOGIC ---------- */
  const gross = Number(data.totalSalary || 0);

  const basic = +(gross * 0.4).toFixed(2);
  const hra = +(gross * 0.18).toFixed(2);
  const da = +(gross * 0.12).toFixed(2);
  const special = +(gross * 0.16).toFixed(2);
  const food = +(gross * 0.06).toFixed(2);
  const pfAllowance = +(gross - (basic + hra + da + special + food)).toFixed(2);

  const earned = (v) => +(v * ratio).toFixed(2);

  const totalActual =
    basic + hra + da + special + food + pfAllowance;

  const totalEarned =
    earned(basic) +
    earned(hra) +
    earned(da) +
    earned(special) +
    earned(food) +
    earned(pfAllowance);

  /* ---------- DEDUCTIONS ---------- */
  // const pf = 1800;
  const pt = 200;
  const others = 2000;
  const totalDeductions =   pt + others;

  const netPay =
    totalEarned -
    totalDeductions +
    Number(data.leaveencashment || 0);

  return (

    <A4Page headerSrc={company.header} footerSrc={company.footer}>
    

      <Box>
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableBody>

            {/* TITLE */}
            <TableRow sx={{ background: "#d89a9a" }}>
              <TableCell colSpan={4} sx={{ ...cell, ...bold, ...center }}>
                Full & Final Settlement Statement
              </TableCell>
            </TableRow>

            <TableRow sx={{ background: "#d89a9a" }}>
              <TableCell colSpan={4} sx={{ ...cell, ...bold, ...center }}>
                {company.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} sx={{ ...cell, ...center }}>
                {company.address}
              </TableCell>
            </TableRow>

            {/* EMP DETAILS */}
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
              <TableCell sx={cell}>{data.designation}</TableCell>
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
            <TableRow sx={{ background: "#f5f5f5" }}>
              <TableCell colSpan={2} sx={{ ...cell, ...bold }}>
                Salary particulars
              </TableCell>
              <TableCell sx={{ ...cell, ...bold, ...center }}>For the month</TableCell>
              <TableCell sx={{ ...cell, ...center }}>{formatMonth(data.month)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Total Day in the month</TableCell>
              <TableCell sx={{ ...cell, ...center }}>{totalDays}</TableCell>
              <TableCell sx={cell}>Paid days</TableCell>
              <TableCell sx={{ ...cell, ...center }}>{paidDays}</TableCell>
            </TableRow>

            {/* EARNINGS */}
            <TableRow sx={{ background: "#f2dede" }}>
              <TableCell colSpan={2} sx={{ ...cell, ...bold }}>Earnings</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...center }}>Actual</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...center }}>Earned</TableCell>
            </TableRow>

            {[
              ["Basic", basic],
              ["HRA", hra],
              ["Dearness Allowance", da],
              ["Special Allowances", special],
              ["Food Allowances", food],
              ["Misc Allowances", pfAllowance],
            ].map(([label, val]) => (
              <TableRow key={label}>
                <TableCell colSpan={2} sx={cell}>{label}</TableCell>
                <TableCell sx={{ ...cell, ...right }}>{formatAmt(val)}</TableCell>
                <TableCell sx={{ ...cell, ...right }}>{formatAmt(earned(val))}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={2} sx={{ ...cell, ...bold }}>Total</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...right }}>{formatAmt(totalActual)}</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...right }}>{formatAmt(totalEarned)}</TableCell>
            </TableRow>

            {/* DEDUCTIONS */}
            <TableRow>
              <TableCell colSpan={4} sx={{ ...cell, ...bold, ...center }}>
                Less Deductions (-)
              </TableCell>
            </TableRow>

            {/* <TableRow>
              <TableCell colSpan={3} sx={cell}>Provident Fund</TableCell>
              <TableCell sx={{ ...cell, ...right }}>{formatAmt(pf)}</TableCell>
            </TableRow> */}

            <TableRow>
              <TableCell colSpan={3} sx={cell}>Professional Tax</TableCell>
              <TableCell sx={{ ...cell, ...right }}>{formatAmt(pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>Others</TableCell>
              <TableCell sx={{ ...cell, ...right }}>{formatAmt(others)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={{ ...cell, ...bold }}>Total Deductions</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...right }}>{formatAmt(totalDeductions)}</TableCell>
            </TableRow>

            {/* OTHER EARNINGS */}
            <TableRow>
              <TableCell colSpan={4} sx={{ ...cell, ...bold, ...center }}>
                Other Earnings
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={cell}>Leave encashment </TableCell>
              <TableCell colSpan={2} sx={{ ...cell, ...right }}>
                00
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={cell}>Total</TableCell>
              <TableCell colSpan={2} sx={{ ...cell, ...right }}>
                {formatAmt(totalEarned)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={{ ...cell, ...bold }}>Net Payable (Rs)</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...right }}>{formatAmt(netPay)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Amount in Words</TableCell>
              <TableCell colSpan={3} sx={cell}>{numberToWords(netPay)}</TableCell>
            </TableRow>

            {/* SIGNATURE */}
            <TableRow>
              <TableCell sx={{ ...cell, ...center }}></TableCell>
              <TableCell sx={{ ...cell, ...center }}>
                {company.stamp && <img src={company.stamp} height={60} alt="" />}
              </TableCell>
              <TableCell colSpan={2} sx={{ ...cell, ...center }}>
                {company.signature && <img src={company.signature} height={45} alt="" />}
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

export default RPFullAndFinal;
