import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import {
  formatCurrency,
  numberToWords,
} from "../../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : "";

/* ================= COMMON STYLE ================= */
const TEXT = {
  fontFamily: "Times New Roman, serif",
  fontSize: "14px",
  lineHeight: 1.8,
};

export default function SmartsoftwareConfirmation({ company, data }) {
  if (!company || !data) return null;

  const {
    mrms = "",
    candidateName = "",
    employeeName = "",
    address = "",
    position = "",
    effectiveDate = "",
    issueDate = "",
    totalSalary = 0,
  } = data;

  const NAME = candidateName || employeeName;
  const COMPANY_NAME = company.name?.toUpperCase() || "";

  /* ================= SAME LOGIC AS OFFER LETTER ================= */
  const totalAnnual = Number(totalSalary) || 0;

  const salaryComponents = useMemo(() => {
    const round0 = (num) => Math.round(num);

    const annualCTC = round0(totalAnnual);
    const monthlyCTC = round0(annualCTC / 12);

    const pfMonthly = 3750;

    const hraMonthly = round0(monthlyCTC * 0.18);
    const daMonthly = round0(monthlyCTC * 0.12);
    const specialMonthly = round0(monthlyCTC * 0.16);
    const foodMonthly = round0(monthlyCTC * 0.06);

    const basicMonthly = round0(
      monthlyCTC -
        (hraMonthly + daMonthly + specialMonthly + foodMonthly + pfMonthly)
    );

    const basicAnnual = round0(basicMonthly * 12);
    const hraAnnual = round0(hraMonthly * 12);
    const daAnnual = round0(daMonthly * 12);
    const specialAnnual = round0(specialMonthly * 12);
    const foodAnnual = round0(foodMonthly * 12);
    const pfAnnual = round0(pfMonthly * 12);

    return [
      { name: "Basic Salary", monthly: basicMonthly, annual: basicAnnual },
      { name: "House Rent Allowance", monthly: hraMonthly, annual: hraAnnual },
      { name: "Conveyance Allowance", monthly: daMonthly, annual: daAnnual },
      { name: "Special Allowance", monthly: specialMonthly, annual: specialAnnual },
      { name: "Food Allowance", monthly: foodMonthly, annual: foodAnnual },
      { name: "Provident Fund (PF)", monthly: pfMonthly, annual: pfAnnual },
    ];
  }, [totalAnnual]);

  const totalMonthly = salaryComponents.reduce(
    (sum, item) => sum + item.monthly,
    0
  );

  const totalAnnualFinal = salaryComponents.reduce(
    (sum, item) => sum + item.annual,
    0
  );

  /* ================= REMOVE .00 ================= */
  const NoDecimal = (value) => {
    return formatCurrency(value).replace(/\.00$/, "");
  };

  const tableCellStyle = {
    border: "1px solid #333",
    fontSize: "10pt",
  };

  return (
    <>
      {/* ================= PAGE 1 ================= */}
 <A4Layout
        headerSrc={company.headerImage}
        footerSrc={company.footerImage}
      >
        <Typography sx={{ ...TEXT, mb: 2 }}>
          {formatDate(issueDate)}
        </Typography>

        <Typography sx={TEXT}>
          <b>Name</b> : {mrms} {NAME}
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          <b>Address</b> : {address}
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Dear {NAME},
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          We are pleased to confirm your continued services at the position of{" "}
          <b>{position}</b> with{" "}
          <b>{COMPANY_NAME}</b> with effective date{" "}
          <b>{formatDate(effectiveDate)}</b> considering your performance and
          support towards the organization.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          If there is any change in the date of joining, changes can be taken
          under consideration. Your total Gross salary will be Rs.{" "}
          <b>{formatCurrency(totalAnnual)}</b> (
          <b>{numberToWords(totalAnnual)}</b>) per year.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Subject to various deductions as per company and government policy.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          The roles and responsibilities and other terms and conditions of your
          employment will be specified in your letter of appointment.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          We welcome you to <b>{COMPANY_NAME}</b> family and hope it would be the
          beginning of a long and mutually beneficial association.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Kindly acknowledge the duplicate copy of this letter as an acceptance
          of this offer.
        </Typography>


        <Typography sx={{ ...TEXT, mt: 4 }}>
          Yours Sincerely,
        </Typography>

        <Typography sx={TEXT}>
          For <b>{COMPANY_NAME}</b>
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
          <Box>
            <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
              {company.signature && (
                <Box component="img" src={company.signature} sx={{ height: "80px" }} />
              )}
              {company.stamp && (
                <Box component="img" src={company.stamp} sx={{ height: "100px" }} />
              )}
            </Box>
            <Typography>{company.hrName}</Typography>
            <Typography>HR Relations Lead</Typography>
          </Box>

          <Box sx={{ width: "45%", mt: 8 }}>
            <Typography>Signature : ___________________</Typography>
            <Typography>Candidate Name : {employeeName}</Typography>
          </Box>
        </Box>
      </A4Layout>

      {/* ================= PAGE 2 ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Typography align="center" sx={{ ...TEXT, mb: 3 }}>
          <b>Annexure – Salary Structure</b>
        </Typography>
<TableContainer>
  <Table
    size="small"   // ✅ makes rows compact
    sx={{
      border: "1px solid #333",
      borderCollapse: "collapse",
      width: "100%",
    }}
  >
    {/* HEADER */}
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: "#1f9fb3",
          "& th": {
            fontWeight: "bold",
            color: "#000",
            border: "1px solid #333",
            fontSize: "10pt",
            padding: "6px",   // ✅ reduced padding
          },
        }}
      >
        <TableCell>Salary Component</TableCell>
        <TableCell align="center">Per Month (Rs.)</TableCell>
        <TableCell align="center">Per Annum (Rs.)</TableCell>
      </TableRow>
    </TableHead>

    {/* BODY */}
    <TableBody>
      {salaryComponents.map((row, i) => (
        <TableRow
          key={i}
          sx={{
            backgroundColor: "#fff",   // ✅ white rows
          }}
        >
          <TableCell sx={{ ...tableCellStyle, padding: "6px" }}>
            {row.name}
          </TableCell>
          <TableCell align="center" sx={{ ...tableCellStyle, padding: "6px" }}>
            {NoDecimal(row.monthly)}
          </TableCell>
          <TableCell align="center" sx={{ ...tableCellStyle, padding: "6px" }}>
            {NoDecimal(row.annual)}
          </TableCell>
        </TableRow>
      ))}

      {/* TOTAL ROW */}
      <TableRow
        sx={{
          backgroundColor: "#1f9fb3",
          "& td": {
            fontWeight: "bold",
            border: "1px solid #333",
            padding: "6px",
          },
        }}
      >
        <TableCell>Total Gross Salary</TableCell>
        <TableCell align="center">
          {NoDecimal(totalMonthly)}
        </TableCell>
        <TableCell align="center">
          {NoDecimal(totalAnnualFinal)}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
      </A4Layout>
    </>
  );
}