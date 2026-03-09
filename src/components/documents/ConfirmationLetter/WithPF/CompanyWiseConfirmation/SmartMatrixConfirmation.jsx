import React from "react";
import sign from "../../../../../assets/images/smartmatrix/Smartmatrix_sign.png";
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

const SmartMatrixConfirmation = ({ company = {}, data = {} }) => {
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

  /* ================= SALARY LOGIC (WITH PF) ================= */

  const round0 = (num) => Math.round(num);

  // 🔹 Source of Truth → Monthly salary entered by user
  const monthlyCTC = round0(Number(data.totalSalary || 0));

  // ================= PERCENTAGE BREAKUP =================
  const basicMonthly = round0(monthlyCTC * 0.48);
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
    ["House Rent Allowance", hraMonthly, hraAnnual],
    ["Dearness Allowance", daMonthly, daAnnual],
    ["Special Allowance", specialMonthly, specialAnnual],
    ["Food Allowance", foodMonthly, foodAnnual],
    ["Provident Fund (PF)", pfMonthly, pfAnnual],
  ];

  // ================= TOTAL GROSS (WITHOUT PF) =================
  const totalMonthly =
    basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly;

  const totalAnnual = totalMonthly * 12;

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box
          sx={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "12pt",
            lineHeight: 1.6,
          }}
        >
          <Typography align="right" mb={3} sx={{ mt: "-5mm" }}>
            {formatDate(data.issueDate)}
          </Typography>

          <Typography
            align="center"
            mb={3}
            sx={{
              mt: "-5mm",
              textDecoration: "underline",
            }}
          >
            Confirmation Letter
          </Typography>

          <Typography mb={1}>
            <strong>Name :</strong> {data.employeeName}
          </Typography>

          <Typography b={2} sx={{ mt: "-2mm" }}>
            <strong>Address:</strong> {data.address}
          </Typography>

          <Typography mb={3}>
            <strong>Subject :</strong>{" "}
            <u>
              Letter of intent for continued services as{" "}
              <strong>{data.position}</strong>.
            </u>
          </Typography>

          <Typography mb={2}>Dear {firstName},</Typography>

          <Typography mb={2} textAlign="justify">
            We are pleased to confirm your continued services at the position of{" "}
            <strong>{data.position}</strong> with
            <strong> SmartMatrix Digital Services Pvt Ltd. </strong>with
            effective date <strong>{formatDate(data.effectiveDate)}</strong>{" "}
            considering your performance and support towards the organization.
          </Typography>

          <Typography mb={2} textAlign="justify">
            If there is any change in the date of joining, changes can be taken
            under consideration. Your total Gross salary will be Rs.{" "}
            <strong>{formatCurrency(totalAnnual)}</strong> (
            {numberToWords(totalAnnual)}) per year.
          </Typography>
          <Typography mb={2}>
            Subject to various deductions as per companies and government
            policy.
          </Typography>

          <Typography mb={2}>
            The roles and responsibilities and other terms and conditions of
            your employment will be specified in your letter of appointment. We
            welcome you to SmartMatrix Digital Services Pvt Ltd. Family and hope
            it would be the beginning of a long and mutually beneficial
            association. Kindly acknowledge the duplicate copy of this letter as
            an acceptance of this offer.
          </Typography>

          <Typography mb={2}></Typography>

          <Typography sx={{ fontSize: "14pt", marginTop: "50px" }}>
            <strong>SmartMatrix Digital Services Pvt Ltd.</strong>
          </Typography>

          {/* Signature Block */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Box>
              <Box sx={{ display: "flex", gap: 3 }}>
                {company?.signature && (
                  <img
                    src={sign}
                    alt="Signature"
                    style={{ height: 42, width: 140, marginTop: "20mm" }}
                  />
                )}
                {company?.stamp && (
                  <img
                    src={company.stamp}
                    alt="Stamp"
                    style={{ height: 110, marginLeft: "-2mm" }}
                  />
                )}
              </Box>
              <Typography mt={1}>
                <strong>{company.hrName}</strong>
              </Typography>
              <Typography>
                <strong>HR Relations Lead</strong>
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
            <TableRow sx={{ backgroundColor: "#f17e25" }}>
              <TableCell>
                <b>Salary Components</b>
              </TableCell>
              <TableCell align="center">
                <b>Per month (Rs.)</b>
              </TableCell>
              <TableCell align="center">
                <b>Per Annum (Rs.)</b>
              </TableCell>
            </TableRow>

            {salaryRows.map(([name, monthly, annual], i) => (
              <TableRow key={i}>
                <TableCell>{name}</TableCell>
                <TableCell align="center">{formatCurrency(monthly)}</TableCell>
                <TableCell align="center">{formatCurrency(annual)}</TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "#f17e25" }}>
              <TableCell>
                <b>Total Monthly Gross Salary</b>
              </TableCell>
              <TableCell align="center">
                <b>{formatCurrency(totalMonthly)}</b>
              </TableCell>
              <TableCell align="center">
                <b>{formatCurrency(totalAnnual)}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Typography
          sx={{ fontFamily: "Verdana", fontSize: "14pt", marginTop: "50px" }}
        >
          <strong>SmartMatrix Digital Services Pvt Ltd.</strong>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
          <Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              {company?.signature && (
                <img
                  src={sign}
                  alt="Signature"
                  style={{ height: 42, width: 140, marginTop: "20mm" }}
                />
              )}
              {company?.stamp && (
                <img
                  src={company.stamp}
                  alt="Stamp"
                  style={{ height: 110, marginLeft: "-2mm" }}
                />
              )}
            </Box>
            <Typography mt={1}>
              <strong>{company.hrName}</strong>
            </Typography>
            <Typography>
              <strong>HR Relations Lead</strong>
            </Typography>
          </Box>
        </Box>
      </A4Page>
    </>
  );
};

export default SmartMatrixConfirmation;
