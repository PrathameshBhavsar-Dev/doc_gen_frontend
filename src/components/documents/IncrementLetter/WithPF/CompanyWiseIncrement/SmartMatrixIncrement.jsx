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

  const round2 = (num) => Number(Number(num).toFixed(2));

  /* ================= INPUT IS ANNUAL ================= */
  const annualCTC = round2(Number(data.newCTC || data.currentCTC || 0));
  const monthlyCTC = round2(annualCTC / 12);
  console.log("annualCTC =", annualCTC);
  console.log("monthlyCTC =", monthlyCTC);
  // console.log("salaryRows =", salaryRows);

  /* ================= STATIC PF ================= */
  const pfMonthly = 3750;
  const pfAnnual = round2(pfMonthly * 12);

  /* ================= FIXED PERCENTAGES ================= */
  const hraMonthly = round2(monthlyCTC * 0.18);
  const daMonthly = round2(monthlyCTC * 0.12);
  const specialMonthly = round2(monthlyCTC * 0.16);
  const foodMonthly = round2(monthlyCTC * 0.06);

  /* ================= ADJUSTED BASIC ================= */
  const basicMonthly = round2(
    monthlyCTC -
    (hraMonthly + daMonthly + specialMonthly + foodMonthly + pfMonthly),
  );

  /* ================= ANNUAL ================= */
  const basicAnnual = round2(basicMonthly * 12);
  const hraAnnual = round2(hraMonthly * 12);
  const daAnnual = round2(daMonthly * 12);
  const specialAnnual = round2(specialMonthly * 12);
  const foodAnnual = round2(foodMonthly * 12);

  /* ================= TOTAL ================= */
  const totalMonthly = round2(
    basicMonthly +
    hraMonthly +
    daMonthly +
    specialMonthly +
    foodMonthly +
    pfMonthly,
  );

  const totalAnnual = round2(totalMonthly * 12);

  /* ================= SALARY ROWS ================= */
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
  console.log("salaryRows =", salaryRows);


  /* ================= TABLE STYLES ================= */

  const TABLE_CONTAINER_STYLE = {
    marginBottom: "20px",
    border: "0.5px solid #000",
    borderRadius: 0,
    boxShadow: "none",
    "& *": {
      fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
    },
  };

  const TABLE_STYLE = {
    tableLayout: "fixed",
    width: "100%",
    borderCollapse: "collapse",
  };

  const CELL_BASE = {
    border: "1px solid #000",
    fontSize: "10pt",
    pb: "4.2mm",
    verticalAlign: "top",
    lineHeight: 0.8,
  };

  const CELL_HEAD = {
    ...CELL_BASE,
    backgroundColor: "#f68b1f",
    fontWeight: 600,
  };

  const COMPONENT_CELL = {
    ...CELL_BASE,
    width: "40%",
  };

  const AMOUNT_CELL = {
    ...CELL_BASE,
    textAlign: "center",
  };

  const TOTAL_ROW = {
    backgroundColor: "#f68b1f",
  };

  const TOTAL_CELL = {
    ...CELL_BASE,
    fontWeight: 600,
  };

  const issueDate = data.increment_letter?.issueDate ?? data.issueDate;

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
            "& *": {
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            },
          }}
        >
          <Typography
            align="right"
            sx={{ mb: "12mm", mt: "4mm", fontFamily: "Bahnschrift" }}
          >
            {formatDate(issueDate)}
          </Typography>

          <Typography sx={{ mb: "8mm", fontFamily: "Bahnschrift" }}>
            Dear {data.employeeName},
          </Typography>

          {/* <Typography
            sx={{ textAlign: "justify", mb: "6mm", fontFamily: "Bahnschrift" }}
          > */}
          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 200,
              textAlign: "justify",
              mb: "6mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            As part of our periodic salary review process, we have adjusted
            compensation across the company to reflect market trends. Effective{" "}
            {formatDate(data.effectiveDate)}, your salary will be increased to{" "}
            <strong> {formatCurrency(annualCTC)} per annum</strong> .
          </Typography>

          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 200,
              textAlign: "justify",
              mb: "6mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            This adjustment ensures that your compensation remains competitive
            within the industry and we hope this reflects our commitment to
            rewarding your ongoing efforts and contributions to the company.
          </Typography>

          <Typography
            sx={{
              fontSize: "12pt",
              fontWeight: 200,
              textAlign: "justify",
              mb: "20mm",
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            }}
          >
            We appreciate your hard work and dedication and look forward to your
            continued success at {company.name}.
          </Typography>

          <Typography sx={{ fontSize: "14pt", marginTop: "80px" }}>
            <strong>SmartMatrix Digital Services Pvt Ltd.</strong>
          </Typography>

          <Box sx={{ mt: "5mm" }}>
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: "10mm" }}>
              {company.stamp && (
                <img
                  src={company.CEO}
                  alt="Company Stamp"
                  style={{ width: "35mm" }}
                />
              )}
              {company.signature && (
                <img
                  src={company.stamp}
                  alt="HR Signature"
                  style={{ width: "30mm" }}
                />
              )}
            </Box>

            <Typography
              sx={{
                fontSize: "13pt",
                fontWeight: 600,
                fontFamily: '"Verdana","Segoe UI",Arial,sans-serif',
              }}
            >
              {" "}
              <strong>{company.ceoName}</strong>
            </Typography>

            <Typography
              sx={{
                fontSize: "12pt",
                fontWeight: 400,
                fontFamily: '"Verdana","Segoe UI",Arial,sans-serif',
              }}
            >
              {" "}
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
            mt: 8,
            fontSize: "16px",
            textDecoration: "underline",
            "& *": {
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            },
          }}
        >
          Salary Annexure
        </Typography>

        <Box
          sx={{
            marginBottom: "35px",
            fontSize: "13pt",
            "& *": {
              fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
            },

            "& p": {
              mt: 1,
            },
          }}
        >
          <p>
            <strong>Employee Code :</strong> {data.employeeId}
          </p>
          <p>
            <strong>Employee Name :</strong> {data.employeeName}
          </p>
          <p>
            <strong>Effective Date :</strong> {formatDate(data.effectiveDate)}
          </p>
        </Box>

        <TableContainer
          component={Paper}
          sx={TABLE_CONTAINER_STYLE}
        >
          <Table
            size="small"
            sx={TABLE_STYLE}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    ...CELL_HEAD,
                    width: "40%",
                  }}
                >
                  Salary Components
                </TableCell>

                <TableCell
                  align="center"
                  sx={CELL_HEAD}
                >
                  Per month (Rs.)
                </TableCell>

                <TableCell
                  align="center"
                  sx={CELL_HEAD}
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
                    sx={isTotal ? TOTAL_ROW : {}}
                  >
                    <TableCell
                      sx={isTotal ? TOTAL_CELL : COMPONENT_CELL}
                    >
                      {row.label}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={isTotal ? TOTAL_CELL : AMOUNT_CELL}
                    >
                      {formatCurrency(row.monthly)}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={isTotal ? TOTAL_CELL : AMOUNT_CELL}
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
            mt: "5",
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
