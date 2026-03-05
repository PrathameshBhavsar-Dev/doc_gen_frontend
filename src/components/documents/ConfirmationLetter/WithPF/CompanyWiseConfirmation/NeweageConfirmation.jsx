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

const NeweageConfirmation = ({ company = {}, data = {} }) => {
  if (!company || !data) return null;

  const firstName = data.employeeName?.split(" ")[0] || "";

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  const round0 = (num) => Math.round(Number(num) || 0);

  /* ================= SMARTMATRIX PF LOGIC ================= */

  const monthlyCTC = round0(data.totalSalary || 0);

  // Percentage Breakup
  const basicMonthly = round0(monthlyCTC * 0.48);
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);

  // PF (Display only)
  const pfMonthly = 3750;

  // Annual
  const basicAnnual = basicMonthly * 12;
  const hraAnnual = hraMonthly * 12;
  const daAnnual = daMonthly * 12;
  const specialAnnual = specialMonthly * 12;
  const foodAnnual = foodMonthly * 12;
  const pfAnnual = pfMonthly * 12;

  // Gross WITHOUT PF
  const totalMonthly =
    basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly;

  const totalAnnual = totalMonthly * 12;

  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["House Rent Allowance", hraMonthly, hraAnnual],
    ["Dearness Allowance", daMonthly, daAnnual],
    ["Special Allowance", specialMonthly, specialAnnual],
    ["Food Allowance", foodMonthly, foodAnnual],
    ["Provident Fund (PF)", pfMonthly, pfAnnual],
  ];

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box sx={{ fontSize: "14px", lineHeight: 1.7 }}>
          <Typography align="right" mb={3}>
            {formatDate(data.issueDate)}
          </Typography>

          <Typography
            align="center"
            mb={3}
            sx={{ textDecoration: "underline" }}
          >
            Confirmation Letter
          </Typography>

          <Typography mb={1}>
            <strong>Name :</strong> {data.employeeName}
          </Typography>

          <Typography mb={2}>
            <strong>Address :</strong> {data.address}
          </Typography>

          <Typography mb={3}>
            <strong>Subject :</strong> Letter of confirmation for continued
            services as <strong>{data.position}</strong>.
          </Typography>

          <Typography mb={2}>Dear {firstName},</Typography>

          <Typography mb={2} textAlign="justify">
            We are pleased to confirm your continued services as{" "}
            <strong>{data.position}</strong> with{" "}
            <strong>{company.name}</strong> effective{" "}
            <strong>{formatDate(data.effectiveDate)}</strong>.
          </Typography>

          <Typography mb={2} textAlign="justify">
            Your total Gross salary will be Rs.{" "}
            <strong>{formatCurrency(totalAnnual)}</strong> per annum, subject to
            deductions as per company and government policy.
          </Typography>

          <Typography mt={5}>
            <strong>For {company.name}</strong>
          </Typography>

          <Typography mt={3}>
            <strong>{company.hrName}</strong>
          </Typography>
          <Typography>HR Relations Lead</Typography>
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
            <TableRow sx={{ backgroundColor: "#26acba" }}>
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

            <TableRow sx={{ backgroundColor: "#26acba" }}>
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

        <Typography sx={{ marginTop: "50px" }}>
          <strong>For {company.name}</strong>
        </Typography>

        <Typography mt={3}>
          <strong>{company.hrName}</strong>
        </Typography>
        <Typography>HR Relations Lead</Typography>
      </A4Page>
    </>
  );
};

export default NeweageConfirmation;
