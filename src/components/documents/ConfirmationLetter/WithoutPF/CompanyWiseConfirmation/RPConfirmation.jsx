import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { formatCurrency } from "../../../../../utils/salaryCalculations";

const RPConfirmationLetter = ({ company = {}, data = {} }) => {
  const firstName = data.employeeName?.split(" ")[0] || "";

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  /* ================= SALARY LOGIC ================= */

  // 🔹 Round to whole number (no decimals)
const round0 = (num) => Math.round(num);

// ================= MONTHLY CTC =================
const monthlyCTC = round0(Number(data.totalSalary || 0));

// ================= PERCENTAGE BREAKUP =================
const basicMonthly = round0(monthlyCTC * 0.40);
const hraMonthly = round0(monthlyCTC * 0.18);
const daMonthly = round0(monthlyCTC * 0.12);
const specialMonthly = round0(monthlyCTC * 0.16);
const foodMonthly = round0(monthlyCTC * 0.06);
const miscMonthly = round0(monthlyCTC * 0.08); // 8%

// ================= ANNUAL VALUES =================
const basicAnnual = round0(basicMonthly * 12);
const hraAnnual = round0(hraMonthly * 12);
const daAnnual = round0(daMonthly * 12);
const specialAnnual = round0(specialMonthly * 12);
const foodAnnual = round0(foodMonthly * 12);
const miscAnnual = round0(miscMonthly * 12);

// ================= SALARY TABLE STRUCTURE =================
const salaryRows = [
  ["Basic", basicMonthly, basicAnnual],
  ["House Rent Allowance", hraMonthly, hraAnnual],
  ["Dearness Allowance", daMonthly, daAnnual],
  ["Special Allowance", specialMonthly, specialAnnual],
  ["Food Allowance", foodMonthly, foodAnnual],
  ["Misc. Allowance", miscMonthly, miscAnnual],
];

// ================= TOTALS =================
const totalMonthly = round0(
  salaryRows.reduce((sum, row) => sum + row[1], 0)
);

const totalAnnual = round0(
  salaryRows.reduce((sum, row) => sum + row[2], 0)
);

  /* ================= NUMBER TO WORDS ================= */

  const numberToWords = (num = 0) => {
    if (!num) return "Zero Only";

    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six",
      "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
      "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen"
    ];

    const b = [
      "", "", "Twenty", "Thirty", "Forty", "Fifty",
      "Sixty", "Seventy", "Eighty", "Ninety"
    ];

    const inWords = (n) => {
      if (n < 20) return a[n];
      if (n < 100)
        return b[Math.floor(n / 10)] +
          (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return a[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 ? " " + inWords(n % 100) : "");
      if (n < 100000)
        return inWords(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 ? " " + inWords(n % 1000) : "");
      if (n < 10000000)
        return inWords(Math.floor(n / 100000)) +
          " Lakh" +
          (n % 100000 ? " " + inWords(n % 100000) : "");
      return inWords(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 ? " " + inWords(n % 10000000) : "");
    };

    return `${inWords(Math.round(num))} Only`;
  };

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box>
          <Typography align="right" mb={3}>
            {formatDate(data.issueDate)}
          </Typography>

          <Typography mb={1}>
            <strong>Name :</strong> {data.employeeName}
          </Typography>

          <Typography mb={1}>
                        <strong>Address</strong> {data.address}
                       </Typography>

          <Typography mb={3}>
            <strong>Subject :</strong>{" "}
            Letter of intent for continued services as{" "}
            <strong>{data.position}</strong>
          </Typography>

          <Typography mb={2}>Dear {firstName},</Typography>

          <Typography mb={3} textAlign="justify">
                      We are pleased to confirm your continued services at the position of
                      Software Test Engineer with DEVCONS SOFTWARE SOLUTIONS PVT. LTD.
                      with effective date {data.effectiveDate}. 
                      considering your performance and support towards the organization.
                      If there is any change in the date of joining, changes can be taken under consideration.
          
                    </Typography>
          
                    <Typography mb={3} textAlign="justify">
                      Your total Gross salary will be Rs. {formatCurrency(totalAnnual)} per year.
                      
                    </Typography>
          
                    <Typography mb={3} textAlign="justify">
                      Subject to various deductions as per companies and government policy.The roles and responsibilities and other terms and conditions of your employment will be Specified in your letter of appointment. We welcome you to R P BUSINESS SOLUTIONS LLP. Family and hope it would be the beginning of a long and mutually beneficial association. Kindly acknowledge the duplicate copy of this letter as an acceptance of this offer.
                    </Typography>

          <Typography mb={3}>For {company.name}</Typography>

          {/* Signature Block */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Box>
              <Box sx={{ display: "flex", gap: 3 }}>
                {company?.signature && (
                  <img src={company.signature} alt="Signature" style={{ height: 60 }} />
                )}
                {company?.stamp && (
                  <img src={company.stamp} alt="Stamp" style={{ height: 90 }} />
                )}
              </Box>
              <Typography mt={1}>{company.hrName}</Typography>
              <Typography>HR Division</Typography>
            </Box>

            <Box minWidth="250px" sx={{  mt: 10 }}>
              <Typography>Signature: __________________</Typography>
              <Typography mt={2}>
                Candidate Name: {data.employeeName}
              </Typography>
            </Box>
          </Box>

          <Typography
              sx={{
                mt: 9,
                fontSize: "14px",
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              Enclosures: Annexure A–salary Structure
            </Typography>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Typography align="center" fontWeight={600} mb={4}>
          Annexure A – Salary Structure
        </Typography>

        <Table
          sx={{
            width: "100%",
            border: "1px solid #000",
            "& td": {
              border: "1px solid #000",
              padding: "6px",
              fontSize: "14px",
            },
          }}
        >
          <TableBody>
            <TableRow sx={{ backgroundColor: "#ff0000" }}>
              <TableCell sx={{ color: "#fff" }}>
                <b>Salary Components</b>
              </TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}>
                <b>Per month (Rs.)</b>
              </TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}>
                <b>Per Annum (Rs.)</b>
              </TableCell>
            </TableRow>

            {salaryRows.map(([name, monthly, annual], i) => (
              <TableRow key={i}>
                <TableCell>{name}</TableCell>
                <TableCell align="right">
                  {formatCurrency(monthly)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(annual)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "#ff0000" }}>
              <TableCell sx={{ color: "#fff" }}>
                <b>Total Monthly Gross Salary</b>
              </TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}>
                <b>{formatCurrency(totalMonthly)}</b>
              </TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}>
                <b>{formatCurrency(totalAnnual)}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
<Box sx={{ display: "flex", justifyContent: "space-between", mt: 10 }}>
            <Box>
              <Box sx={{ display: "flex", gap: 3 }}>
                {company?.signature && (
                  <img src={company.signature} alt="Signature" style={{ height: 60 }} />
                )}
                {company?.stamp && (
                  <img src={company.stamp} alt="Stamp" style={{ height: 90 }} />
                )}
              </Box>
              <Typography mt={1}>{company.hrName}</Typography>
              <Typography>HR Division</Typography>
            </Box>

            <Box minWidth="250px" sx={{  mt: 10 }}>
              <Typography>Signature: __________________</Typography>
              <Typography mt={2}>
                Candidate Name: {data.employeeName}
              </Typography>
            </Box>
          </Box>

          
        
        
      </A4Page>
    </>
  );
};

export default RPConfirmationLetter;
