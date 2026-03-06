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

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const SmartMatrixIncrement = ({ company, data }) => {
  if (!company || !data) return null;

  const monthlyGross = round2(Number(data.newCTC || 0));
  const annualCTC = round2(monthlyGross * 12);

  /* Apply percentages on MONTHLY */
  const basicMonthly = round2(monthlyGross * 0.48);
  const hraMonthly = round2(monthlyGross * 0.18);
  const daMonthly = round2(monthlyGross * 0.12);
  const specialMonthly = round2(monthlyGross * 0.16);

  // Adjustment for perfect match
  const usedMonthly = basicMonthly + hraMonthly + daMonthly + specialMonthly;

  const foodMonthly = round2(monthlyGross - usedMonthly);

  /* Annual */
  const basicAnnual = round2(basicMonthly * 12);
  const hraAnnual = round2(hraMonthly * 12);
  const daAnnual = round2(daMonthly * 12);
  const specialAnnual = round2(specialMonthly * 12);
  const foodAnnual = round2(foodMonthly * 12);

  /* PF (DISPLAY ONLY – NOT INCLUDED IN TOTAL) */
  const pfMonthly = 3750;
  const pfAnnual = pfMonthly * 12;

  /* Totals WITHOUT PF */
  const totalMonthly = round2(
    basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly,
  );

  const totalAnnual = round2(
    basicAnnual + hraAnnual + daAnnual + specialAnnual + foodAnnual,
  );

  /* Salary Rows */
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
      <A4Layout headerSrc={company.header} footerSrc={company.footer}>
        <Box
          sx={{
            fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            fontSize: "12pt",
            lineHeight: "1.42",
            fontWeight: 800,
            color: "#000",
          }}
        >
          <Typography
            align="right"
            sx={{ mb: "12mm", fontFamily: "Bahnschrift" }}
          >
            {formatDate(data.issueDate)}
          </Typography>

          <Typography sx={{ mb: "8mm", fontFamily: "Bahnschrift" }}>
            Dear {data.employeeName},
          </Typography>

          <Typography
            sx={{ textAlign: "justify", mb: "6mm", fontFamily: "Bahnschrift" }}
          >
            As part of our periodic salary review process, we have adjusted
            compensation across the company to reflect market trends. Effective{" "}
            {formatDate(data.effectiveDate)}, your salary will be increased to{" "}
            <strong> {formatCurrency(annualCTC)}</strong> .
          </Typography>

          <Typography
            sx={{ textAlign: "justify", mb: "6mm", fontFamily: "Bahnschrift" }}
          >
            This adjustment ensures that your compensation remains competitive
            within the industry and we hope this reflects our commitment to
            rewarding your ongoing efforts and contributions to the company.
          </Typography>

          <Typography
            sx={{ textAlign: "justify", mb: "20mm", fontFamily: "Bahnschrift" }}
          >
            We appreciate your hard work and dedication and look forward to your
            continued success at {company.name}.
          </Typography>

          <Typography
            sx={{ fontWeight: 600, mb: "18mm", fontFamily: "Bahnschrift" }}
          >
            <strong>{company.name}</strong>
          </Typography>

          <Box sx={{ mt: "4mm" }}>
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: "10mm" }}>
              {company.stamp && (
                <img
                  src={company.CEO}
                  alt="Company Stamp"
                  style={{ width: "45mm" }}
                />
              )}
              {company.signature && (
                <img
                  src={company.stamp}
                  alt="HR Signature"
                  style={{ width: "38mm" }}
                />
              )}
            </Box>

            <Typography sx={{ fontWeight: 600 }}>
              <strong>{company.ceoName}</strong>
            </Typography>

            <Typography>
              <strong>Group Leader-HR Services</strong>
            </Typography>
          </Box>
        </Box>
      </A4Layout>

      {/* ================= PAGE 2 ================= */}
      <A4Layout headerSrc={company.header} footerSrc={company.footer}>
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

        <div style={{ marginBottom: "16px", fontSize: "12pt" }}>
          <p>
            <strong>Employee Code :</strong> {data.employeeId}
          </p>
          <p>
            <strong>Employee Name :</strong> {data.employeeName}
          </p>
          <p>
            <strong>Effective Date :</strong> {formatDate(data.effectiveDate)}
          </p>
        </div>

        <TableContainer
          component={Paper}
          sx={{
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
                    backgroundColor: "#f68b1f",
                    fontWeight: "bold",
                  }}
                >
                  Salary Components
                </TableCell>
                <TableCell
                  sx={{
                    border: "2px solid #000",
                    backgroundColor: "#f68b1f",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Per month (Rs.)
                </TableCell>
                <TableCell
                  sx={{
                    border: "2px solid #000",
                    backgroundColor: "#f68b1f",
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
                    sx={{ backgroundColor: isTotal ? "#f68b1f" : "#fff" }}
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

        <br />
        <br />

        <Typography
          sx={{
            fontSize: "13pt",
            fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
          }}
        >
          Please note that the details in this communication are confidential
          and you are requested not to share the same with others
        </Typography>
      </A4Layout>
    </>
  );
};

export default SmartMatrixIncrement;
