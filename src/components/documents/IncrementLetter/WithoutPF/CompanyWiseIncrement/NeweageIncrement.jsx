import React from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import { formatCurrency } from "../../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

const NeweageIncrement = ({ company, data }) => {
  if (!company || !data) return null;

  /* ======================================================
     ✅ SMARTMATRIX LOGIC (INPUT IS MONTHLY)
  ====================================================== */

  const round2 = (v) => Math.round(Number(v) * 100) / 100;

  const monthlyGross = round2(data.newCTC || 0); // 🔥 INPUT IS MONTHLY
  const annualCTC = round2(monthlyGross * 12);

  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
  };

  const basic = round2(monthlyGross * PERCENT.basic);
  const hra = round2(monthlyGross * PERCENT.hra);
  const da = round2(monthlyGross * PERCENT.da);
  const special = round2(monthlyGross * PERCENT.special);
  const food = round2(monthlyGross * PERCENT.food);

  // Adjustment row to prevent mismatch
  const misc = round2(monthlyGross - (basic + hra + da + special + food));

  const salaryRows = [
    { label: "Basic", monthly: basic, annual: round2(basic * 12) },
    { label: "House Rent Allowance", monthly: hra, annual: round2(hra * 12) },
    { label: "Dearness Allowance", monthly: da, annual: round2(da * 12) },
    {
      label: "Special Allowance",
      monthly: special,
      annual: round2(special * 12),
    },
    { label: "Food Allowance", monthly: food, annual: round2(food * 12) },
    { label: "Misc. Allowance", monthly: misc, annual: round2(misc * 12) },
    {
      label: "Total Monthly Gross Salary",
      monthly: monthlyGross,
      annual: annualCTC,
      type: "total",
    },
  ];

  return (
    <>
      {/* ================= PAGE 1 – INCREMENT LETTER ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Typography align="right" sx={{ mb: 6 }}>
          {formatDate(data.issueDate)}
        </Typography>

        <Typography sx={{ mb: 4 }}>Dear {data.employeeName},</Typography>

        <Typography sx={{ mb: 3 }}>
          After careful evaluation of your contributions and dedication, we are
          pleased to inform you that you have demonstrated exceptional
          performance.
        </Typography>

        <Typography sx={{ mb: 3 }}>
          Your new salary will be <b>₹{formatCurrency(annualCTC)}</b> per annum,
          effective <b>{formatDate(data.effectiveDate)}</b>.
        </Typography>

        <Typography sx={{ mb: 3 }}>
          We appreciate your continued dedication and look forward to your
          ongoing contributions.
        </Typography>

        <Typography sx={{ mb: 4 }}>Best regards,</Typography>

        <Typography sx={{ fontWeight: "bold" }}>{company.ceoName}</Typography>
      </A4Layout>

      {/* ================= PAGE 2 – SALARY ANNEXURE ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Typography
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 3,
            fontSize: "16px",
            textDecoration: "underline",
          }}
        >
          Salary Annexure
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography>
            <strong>Employee Code :</strong> {data.employeeId}
          </Typography>
          <Typography>
            <strong>Employee Name :</strong> {data.employeeName}
          </Typography>
          <Typography>
            <strong>Effective Date :</strong> {formatDate(data.effectiveDate)}
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            border: "0.5px solid #000",
            borderRadius: 0,
            boxShadow: "none",
          }}
        >
          <Table size="small" sx={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    border: "2px solid #000",
                    backgroundColor: "rgba(3, 171, 197, 0.95)",
                    fontWeight: "bold",
                    fontSize: "15px",
                    width: "55%",
                  }}
                >
                  Salary Components
                </TableCell>
                <TableCell
                  sx={{
                    border: "2px solid #000",
                    backgroundColor: "rgba(3, 171, 197, 0.95)",
                    fontWeight: "bold",
                    textAlign: "center",
                    width: "22.5%",
                  }}
                >
                  Per month (Rs.)
                </TableCell>
                <TableCell
                  sx={{
                    border: "2px solid #000",
                    backgroundColor: "rgba(3, 171, 197, 0.95)",
                    fontWeight: "bold",
                    textAlign: "center",
                    width: "22.5%",
                  }}
                >
                  Per Annum (Rs.)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryRows.map((row, index) => {
                const isTotal = row.type === "total";
                return (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: isTotal
                        ? "rgba(3, 171, 197, 0.95)"
                        : "#fff",
                    }}
                  >
                    <TableCell
                      sx={{
                        border: "1.5px solid #000",
                        fontWeight: isTotal ? "bold" : "normal",
                      }}
                    >
                      {row.label}
                    </TableCell>

                    <TableCell
                      sx={{
                        border: "1.5px solid #000",
                        textAlign: "center",
                        fontWeight: isTotal ? "bold" : "normal",
                      }}
                    >
                      {formatCurrency(row.monthly)}
                    </TableCell>

                    <TableCell
                      sx={{
                        border: "1.5px solid #000",
                        textAlign: "center",
                        fontWeight: isTotal ? "bold" : "normal",
                      }}
                    >
                      {formatCurrency(row.annual)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography sx={{ mt: 4 }}>
          Please note that the details in this communication are confidential
          and you are requested not to share the same with others.
        </Typography>
      </A4Layout>
    </>
  );
};

export default NeweageIncrement;
