

import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";

/* ================= HELPERS ================= */

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

const formatCurrency = (num) =>
  Number(num || 0).toLocaleString("en-IN", {
    // minimumFractionDigits: 2,
    // maximumFractionDigits: 2,
  });

/* ================= MAIN COMPONENT ================= */

const PentaConfirmation = ({ company = {}, data = {} }) => {
  if (!company || !data) return null;

  const round0 = (num) => Math.round(num);

  /* ================= SALARY LOGIC ================= */

  // ✅ FIXED (removed extra `1`)
  const monthlyCTC = round0(Number(data.totalSalary || 0));

  // ===== Percentage Breakup =====
  const basicMonthly = round0(monthlyCTC * 0.4);
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);
  const miscMonthly = round0(monthlyCTC * 0.08);

  // ===== Annual Values =====
  const basicAnnual = basicMonthly * 12;
  const hraAnnual = hraMonthly * 12;
  const daAnnual = daMonthly * 12;
  const specialAnnual = specialMonthly * 12;
  const foodAnnual = foodMonthly * 12;
  const miscAnnual = miscMonthly * 12;

  // ===== Salary Table Rows =====
  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["House Rent Allowance", hraMonthly, hraAnnual],
    ["Dearness Allowance", daMonthly, daAnnual],
    ["Special Allowance", specialMonthly, specialAnnual],
    ["Food Allowance", foodMonthly, foodAnnual],
    ["Misc. Allowance", miscMonthly, miscAnnual],
  ];

  // ===== Totals =====
  const totalMonthly = round0(
    salaryRows.reduce((sum, row) => sum + row[1], 0)
  );

  const totalAnnual = round0(
    salaryRows.reduce((sum, row) => sum + row[2], 0)
  );

  /* ================= RETURN ================= */

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box mt={2}>
          {/* Candidate Details */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "100px 10px auto",
              rowGap: 1,
            }}
          >
            <Typography fontWeight={600}>Name</Typography>
            <Typography fontWeight={600}>:</Typography>
            <Typography>
              {data.mrms} {data.employeeName}
            </Typography>

            <Typography fontWeight={600}>Address</Typography>
            <Typography fontWeight={600}>:</Typography>
            <Typography>{data.address}</Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "100px 10px auto",
              mt: 2,
            }}
          >
            <Typography fontWeight={600}>Subject</Typography>
            <Typography fontWeight={600}>:</Typography>
            <Typography>
              Letter of Confirmation for continued services as{" "}
              <strong>{data.position}</strong>
            </Typography>
          </Box>

          <Typography fontSize={14} mt={2}>
            Dear {data.employeeName?.split(" ")[0]},
          </Typography>

          <Typography fontSize={14} textAlign="justify" mt={2}>
            We are pleased to confirm your continued services at the position
            of <strong>{data.position}</strong> with{" "}
            <strong>{company.name}</strong> with effective date{" "}
            <strong>{formatDate(data.effectiveDate)}</strong>, considering your
            performance and support towards the organization.
          </Typography>

          <Typography fontSize={14} textAlign="justify" mt={2}>
            Your total Gross salary will be{" "}
            <strong>Rs. {formatCurrency(totalAnnual)}</strong> per year.
          </Typography>

          <Typography fontSize={14} textAlign="justify" mt={2}>
            Subject to various deductions as per company and government policy.
            The roles and responsibilities and other terms and conditions of
            your employment will be specified in your letter of appointment. We
            welcome you to {company.name} family and hope it would be the
            beginning of a long and mutually beneficial association.
          </Typography>

          {/* Signature */}
          <Box mt={6} display="flex" justifyContent="space-between">
            <Box>
              <Typography>
                For <strong>{company.name}</strong>
              </Typography>

              <Box mt={2} display="flex" alignItems="center" gap={2}>
                {company.signature && (
                  <img src={company.signature} alt="Sign" style={{ height: 30 }} />
                )}
                {company.stamp && (
                  <img src={company.stamp} alt="Stamp" style={{ height: 95 }} />
                )}
              </Box>

              <Typography fontWeight={600} mt={1}>
                {company.hrName}
              </Typography>
              <Typography fontSize={13}>HR Relations Lead</Typography>
            </Box>

            <Box mt={10}>
              <Typography>Signature: __________________</Typography>
              <Typography mt={1}>Date: __________________</Typography>
            </Box>
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Typography align="center" fontWeight={700} mt={4} mb={3}>
          Annexure A - Salary Structure
        </Typography>

        <Table
          sx={{
            width: "100%",
            border: "1px solid #000",
            "& th, & td": {
              border: "1px solid #000",
              fontSize: 14,
              padding: "6px",
            },
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1cc9e0" }}>
              <TableCell><strong>Salary Components</strong></TableCell>
              <TableCell align="right"><strong>Per Month (Rs.)</strong></TableCell>
              <TableCell align="right"><strong>Per Annum (Rs.)</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {salaryRows.map(([name, monthly, annual], index) => (
              <TableRow key={index}>
                <TableCell>{name}</TableCell>
                <TableCell align="right">{formatCurrency(monthly)}</TableCell>
                <TableCell align="right">{formatCurrency(annual)}</TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "#1cc9e0" }}>
              <TableCell><strong>Total Monthly Gross Salary</strong></TableCell>
              <TableCell align="right">
                <strong>{formatCurrency(totalMonthly)}</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{formatCurrency(totalAnnual)}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Signature */}
        <Box mt={8} display="flex" justifyContent="space-between">
          <Box>
            <Box mt={2} display="flex" alignItems="center" gap={2}>
              {company.signature && (
                <img src={company.signature} alt="Sign" style={{ height: 30 }} />
              )}
              {company.stamp && (
                <img src={company.stamp} alt="Stamp" style={{ height: 95 }} />
              )}
            </Box>

            <Typography mt={1}>{company.hrName}</Typography>
            <Typography fontSize={13}>HR Relations Lead</Typography>
          </Box>

          <Box mt={10}>
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

export default PentaConfirmation;