// import React from 'react'
// import A4Page from '../../../../layout/A4Page'

// const NimbjaConfirmation = ({ company, data }) => {
//   return (
//     <>
//       <A4Page headerSrc={company.header} footerSrc={company.footer}></A4Page>
//       <A4Page headerSrc={company.header} footerSrc={company.footer}></A4Page>
//     </>
//   );
// }

// export default NimbjaConfirmation

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

const NimbjaConfirmation = ({ company = {}, data = {} }) => {
  const firstName = data.employeeName?.split(" ")[0] || "";

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  const numberToWords = (num = 0) => {
    if (!num) return "Zero Rupees Only";

    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const inWords = (n) => {
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100)
        return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
      if (n < 1000)
        return (
          ones[Math.floor(n / 100)] +
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
      return inWords(Math.floor(n / 10000000)) + " Crore";
    };

    return `${inWords(Math.round(num))} Rupees Only`;
  };

  /* ================= SALARY LOGIC ================= */

  const round0 = (num) => Math.round(num);

  // ================= MONTHLY CTC =================
  const monthlyCTC = round0(Number(data.totalSalary || 0));

  // ================= UPDATED PERCENTAGES =================
  const basicMonthly = round0(monthlyCTC * 0.48); // 40% + 8%
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);

  // ================= STATIC PF =================
  const pfMonthly = 3750;

  // ================= ANNUAL VALUES =================
  const basicAnnual = basicMonthly * 12;
  const hraAnnual = hraMonthly * 12;
  const daAnnual = daMonthly * 12;
  const specialAnnual = specialMonthly * 12;
  const foodAnnual = foodMonthly * 12;
  const pfAnnual = pfMonthly * 12;

  // ================= SALARY TABLE =================
  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["Bouqet of Benefits", hraMonthly, hraAnnual],
    ["HRA", daMonthly, daAnnual],
    ["City Allowance", specialMonthly, specialAnnual],
    ["Superannuation Fund", foodMonthly, foodAnnual],
    ["Provident Fund (PF)", pfMonthly, pfAnnual], // Separate
  ];

  // ================= TOTAL EARNINGS =================
  const totalMonthly =
    basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly;

  const totalAnnual = totalMonthly * 12;

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box>
          <Typography align="right" mb={3} sx={{ fontFamily: "Bahnschrift" }}>
            {formatDate(data.issueDate)}
          </Typography>

          <Typography mb={1} sx={{ fontFamily: "Bahnschrift" }}>
            <strong>Name :</strong> {data.employeeName}
          </Typography>

          <Typography b={2} sx={{ fontFamily: "Bahnschrift", mt: "-2mm" }}>
                      <strong>Address:</strong> {data.address}
                    </Typography>

          <Typography mb={3} sx={{ fontFamily: "Bahnschrift" }}>
            <strong>Subject :</strong> Letter of intent for continued services
            as <strong>{data.position}</strong>
          </Typography>

          <Typography mb={2} sx={{ fontFamily: "Bahnschrift" }}>
            Dear {firstName},
          </Typography>

          <Typography
            mb={3}
            textAlign="justify"
            sx={{ fontFamily: "Bahnschrift" }}
          >
            We are pleased to confirm your continued services at the position of{" "}
            <strong>{data.position}</strong> with{" "}
            <strong>Nimbja Security Solutions Pvt. Ltd.</strong> with effective
            date <strong>{data.effectiveDate}</strong>, considering your
            performance and support towards the organization.
          </Typography>

          <Typography
            mb={2}
            textAlign="justify"
            sx={{ fontFamily: "Bahnschrift" }}
          >
            If there is any change in the date of joining, changes can be taken
            under consideration. Your total Gross salary will be Rs.{" "}
            <strong>{formatCurrency(data.totalSalary)}</strong> per year.
          </Typography>

          <Typography
            mb={2}
            textAlign="justify"
            sx={{ fontFamily: "Bahnschrift" }}
          >
            Subject to various deductions as per company and government policy.
            Kindly acknowledge the duplicate copy of this letter as an
            acceptance of this offer.
          </Typography>

          <Typography mb={2} sx={{ fontFamily: "Bahnschrift" }}>
            The roles and responsibilities and other terms and conditions of
            your employment will be specified in your letter of appointment.
          </Typography>

          <Typography mb={2} sx={{ fontFamily: "Bahnschrift" }}>
            We welcome you to Nimbja Security Solutions Pvt. Ltd. Family and
            hope it would be the beginning of a long and mutually beneficial
            association.
          </Typography>

          <Typography sx={{ fontFamily: "Bahnschrift", fontSize: "14pt" }}>
            for <strong>Nimbja Security Solutions Pvt. Ltd.</strong>
          </Typography>

          {/* Signature Block */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Box>
              <Box sx={{ display: "flex", gap: 3 }}>
                {company?.signature && (
                  <img
                    src={company.signature}
                    alt="Signature"
                    style={{ height: 50 }}
                  />
                )}
                {company?.stamp && (
                  <img
                    src={company.stamp}
                    alt="Stamp"
                    style={{ height: 100 }}
                  />
                )}
              </Box>
              <Typography mt={1} sx={{ fontFamily: "Bahnschrift" }}>
                {company.hrName}
              </Typography>
              <Typography sx={{ fontFamily: "Bahnschrift" }}>
                HR Relations Lead
              </Typography>
            </Box>

            <Box minWidth="250px" sx={{ mt: 13, fontFamily: "Bahnschrift" }}>
              <Typography sx={{ fontFamily: "Bahnschrift" }}>
                Signature: __________________
              </Typography>
              <Typography mt={2} sx={{ mt: 1.5, fontFamily: "Bahnschrift" }}>
                Candidate Name: {data.employeeName}
              </Typography>
            </Box>
          </Box>
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
            <TableRow sx={{ backgroundColor: "#a1f569" }}>
              <TableCell>
                <b>Salary Components</b>
              </TableCell>
              <TableCell align="right">
                <b>Per month (Rs.)</b>
              </TableCell>
              <TableCell align="right">
                <b>Per Annum (Rs.)</b>
              </TableCell>
            </TableRow>

            {salaryRows.map(([name, monthly, annual], i) => (
              <TableRow key={i}>
                <TableCell>{name}</TableCell>
                <TableCell align="right">{formatCurrency(monthly)}</TableCell>
                <TableCell align="right">{formatCurrency(annual)}</TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "#a1f569" }}>
              <TableCell>
                <b>Total Monthly Gross Salary</b>
              </TableCell>
              <TableCell align="right">
                <b>{formatCurrency(totalMonthly)}</b>
              </TableCell>
              <TableCell align="right">
                <b>{formatCurrency(totalAnnual)}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 10 }}>
          <Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              {company?.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: 50 }}
                />
              )}
              {company?.stamp && (
                <img src={company.stamp} alt="Stamp" style={{ height: 100 }} />
              )}
            </Box>
            <Typography mt={1} sx={{ fontFamily: "Bahnschrift" }}>
              {company.hrName}
            </Typography>
            <Typography sx={{ fontFamily: "Bahnschrift" }}>
              HR Relations Lead
            </Typography>
          </Box>

          <Box minWidth="250px" sx={{ mt: 13, fontFamily: "Bahnschrift" }}>
            <Typography sx={{ fontFamily: "Bahnschrift" }}>
              Signature: __________________
            </Typography>
            <Typography mt={2} sx={{ mt: 1.5, fontFamily: "Bahnschrift" }}>
              Candidate Name: {data.employeeName}
            </Typography>
          </Box>
        </Box>
      </A4Page>
    </>
  );
};

export default NimbjaConfirmation;

