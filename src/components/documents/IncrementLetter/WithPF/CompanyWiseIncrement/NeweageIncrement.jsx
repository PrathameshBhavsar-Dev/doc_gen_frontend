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

/* ================= HELPERS ================= */
const round2 = (num) => Number(Number(num).toFixed(2));

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const NeweageIncrement = ({ company, data }) => {
  if (!company || !data) return null;

  /* ======================================================
     ✅ SMARTMATRIX LOGIC (INPUT IS MONTHLY) WITH PF
  ====================================================== */

  const monthlyGross = round2(Number(data.newCTC || 0)); // 🔥 INPUT MONTHLY
  const annualCTC = round2(monthlyGross * 12);

  /* Percentage on MONTHLY */
  const basicMonthly = round2(monthlyGross * 0.48);
  const hraMonthly = round2(monthlyGross * 0.18);
  const daMonthly = round2(monthlyGross * 0.12);
  const specialMonthly = round2(monthlyGross * 0.16);

  const used = basicMonthly + hraMonthly + daMonthly + specialMonthly;
  const foodMonthly = round2(monthlyGross - used);

  /* Annual */
  const basicAnnual = round2(basicMonthly * 12);
  const hraAnnual = round2(hraMonthly * 12);
  const daAnnual = round2(daMonthly * 12);
  const specialAnnual = round2(specialMonthly * 12);
  const foodAnnual = round2(foodMonthly * 12);

  /* PF (DISPLAY ONLY – NOT INCLUDED IN TOTAL) */
  const pfMonthly = 3750;
  const pfAnnual = pfMonthly * 12;

  /* Total WITHOUT PF */
  const totalMonthly = monthlyGross;
  const totalAnnual = annualCTC;

  const salaryRows = [
    { label: "Basic", monthly: basicMonthly, annual: basicAnnual },
    { label: "House Rent Allowance", monthly: hraMonthly, annual: hraAnnual },
    { label: "Dearness Allowance", monthly: daMonthly, annual: daAnnual },
    {
      label: "Special Allowance",
      monthly: specialMonthly,
      annual: specialAnnual,
    },
    { label: "Food Allowance", monthly: foodMonthly, annual: foodAnnual },
    { label: "Provident Fund (PF)", monthly: pfMonthly, annual: pfAnnual },
    {
      label: "Total Monthly Gross Salary",
      monthly: totalMonthly,
      annual: totalAnnual,
      type: "total",
    },
  ];

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Typography align="right" sx={{ mb: 6 }}>
          {formatDate(data.issueDate)}
        </Typography>

        <Typography sx={{ mb: 4 }}>Dear {data.employeeName},</Typography>

        <Typography sx={{ mb: 3, textAlign: "justify" }}>
          After careful evaluation of your contributions and dedication, we are
          pleased to inform you that your salary has been revised.
        </Typography>

        <Typography sx={{ mb: 3, textAlign: "justify" }}>
          Your new salary will be <strong>₹{formatCurrency(annualCTC)}</strong>{" "}
          per annum, effective <strong>{formatDate(data.effectiveDate)}</strong>
          .
        </Typography>

        <Typography sx={{ mb: 3, textAlign: "justify" }}>
          We appreciate your continued hard work and dedication and look forward
          to your ongoing contributions.
        </Typography>

        <Typography sx={{ fontWeight: "bold", mt: 6 }}>
          {company.name}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          <strong>{company.ceoName}</strong>
        </Typography>
        <Typography>
          <strong>Group Leader-HR Services</strong>
        </Typography>
      </A4Layout>

      {/* ================= PAGE 2 ================= */}
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
            border: "0.5px solid #000",
            borderRadius: 0,
            boxShadow: "none",
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    border: "2px solid #000",
                    backgroundColor: "rgba(3, 171, 197, 0.95)",
                    fontWeight: "bold",
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
