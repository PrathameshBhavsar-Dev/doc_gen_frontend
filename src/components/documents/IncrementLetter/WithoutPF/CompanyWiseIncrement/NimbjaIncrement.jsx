import React from "react";
import { formatCurrency } from "../../../../../utils/salaryCalculations";
import A4Page from "../../../../layout/A4Page";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import SalaryStructureTable from "../../../../common/SalaryStructureTable";
import watermark from "../../../../../assets/images/Nimbja/nimbja_watermark.png";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const NimbjaIncrement = ({ company, data }) => {
  /* ================= SALARY LOGIC (DEVCONS – CUSTOM ANNEXURE) ================= */

  // Helper to keep 2 decimals everywhere
  const round0 = (num) => Math.round(num);

  // Source of truth
  const monthlyCTC = round0(Number(data.newCTC || 0));

  // ================= PERCENTAGE BREAKUP =================
  const basicMonthly = round0(monthlyCTC * 0.4);
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
  const totalMonthly = round0(salaryRows.reduce((sum, row) => sum + row[1], 0));

  const totalAnnual = round0(salaryRows.reduce((sum, row) => sum + row[2], 0));

  return (
    <>
      {/* =========================== PAGE 1 =========================== */}
      <Box
        sx={{
          width: "210mm",
          minHeight: "297mm",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
          "& *": {
            fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
          },
          pageBreakAfter: "always",
        }}
      >
        {company?.headerImage && (
          <img
            src={company.headerImage}
            alt="Header"
            style={{ width: "100%" }}
          />
        )}

        <Box
          component="img"
          src={watermark}
          alt="watermark"
          sx={{
            position: "absolute",
            top: "47%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            opacity: 0.4,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* CONTENT */}
        {/* <Box
                className="a4-content-only"
                sx={{
                  
                }}
              > */}
        <Box
          sx={{
            px: "25mm",
            py: "22mm",
            flexGrow: 1,
            fontSize: "14px",
            lineHeight: 1.8,
            color: "#000",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              textAlign: "right",
              mb: 6,
              mt: "-12mm",
              fontFamily: "Bahnschrift",
            }}
          >
            {new Date(data.issueDate).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </Typography>

          <Typography
            sx={{
              textAlign: "Center",
              marginTop: "-8mm",
              mb: "5mm",
              fontFamily: "Verdana",
              textDecoration: "underline",
              fontSize: "15px",
            }}
          >
            Appraisal Letter
          </Typography>

          <Typography sx={{ mb: 4, fontFamily: "Bahnschrift" }}>
            Dear {data.employeeName},
          </Typography>

          <Typography
            sx={{ mb: 4, textAlign: "justify", fontFamily: "Bahnschrift" }}
          >
            In Recognition of your previous years of service with{" "}
            <strong>{company.name}</strong>, we are pleased to offer you a
            salary increment effective{" "}
            <strong>
              {new Date(data.effectiveDate).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </strong>
            . Your salary will increase to{" "}
            <strong>{formatCurrency(totalAnnual)}</strong> per annum.
          </Typography>

          <Typography
            sx={{ mb: 4, textAlign: "justify", fontFamily: "Bahnschrift" }}
          >
            Your loyalty and commitment to the company over the years have been
            invaluable and this increment is a token of our appreciation. We
            look forward to many more years of your dedication and contribution.
          </Typography>

          <Typography sx={{ mb: 8, fontFamily: "Bahnschrift" }}>
            Once again, thank you for being such a reliable member of our team.
          </Typography>

          <Typography sx={{ mb: 6, fontFamily: "Bahnschrift" }}>
            Yours Sincerely,
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 4, mb: 2 }}>
            {company?.CEO && (
              <img src={company.CEO} alt="Signature" style={{ height: 60 }} />
            )}
            {company?.stamp && (
              <img
                src={company.stamp}
                alt="Stamp"
                style={{ height: 110, marginLeft: "-20px" }}
              />
            )}
          </Box>

          <Typography sx={{ fontWeight: 600, fontFamily: "Bahnschrift" }}>
            CEO & Managing Director
          </Typography>
        </Box>

        {company?.footerImage && (
          <img
            src={company.footerImage}
            alt="Footer"
            style={{ width: "100%" }}
          />
        )}
      </Box>

      {/* =========================== PAGE 2 =========================== */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box
          component="img"
          src={watermark}
          alt="watermark"
          sx={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            opacity: 0.4,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* CONTENT */}
        <Box
          className="a4-content-only"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Date */}
          <Typography
            sx={{
              textAlign: "right",
              fontSize: "11pt",
              fontFamily: "Bahnschrift",
              mb: 2,
            }}
          >
            {formatDate(data.issueDate)}
          </Typography>

          {/* Ref */}
          <Typography
            sx={{
              fontSize: "11pt",
              fontFamily: "Bahnschrift",
              mb: 4,
              fontWeight: 600,
            }}
          >
            Ref:NSS\VER1.1\PUN\PIMGUR\ADM-TEST\{data.employeeId}
          </Typography>

          {/* Title */}
          <Typography
            align="center"
            sx={{
              fontSize: "14pt",
              fontWeight: 600,
              textDecoration: "underline",
              mb: 5,
              fontFamily: "Bahnschrift",
            }}
          >
            Salary Annexure A
          </Typography>

          {/* Employee Details */}

          {/* Table */}
          <Table
            sx={{
              width: "100%",
              border: "1px solid #000",
              fontFamily: "Bahnschrift",
              "& th, & td": {
                border: "1px solid #000",
                padding: "6px",
                fontSize: "14px",
                fontFamily: "Bahnschrift",
              },
            }}
          >
            <TableBody>
              {/* Header Row */}
              <TableRow>
                <TableCell sx={{ backgroundColor: "#8bc34a" }} align="center">
                  <b>Salary Components</b>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#8bc34a" }} align="center">
                  <b>Per month (Rs.)</b>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#8bc34a" }} align="center">
                  <b>Per Annum (Rs.)</b>
                </TableCell>
              </TableRow>

              {/* Salary Rows */}
              <TableRow>
                <TableCell>Basic</TableCell>
                <TableCell align="right">
                  {formatCurrency(basicMonthly)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(basicAnnual)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Bouqet Of Benefits</TableCell>
                <TableCell align="right">
                  {formatCurrency(hraMonthly)}
                </TableCell>
                <TableCell align="right">{formatCurrency(hraAnnual)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>HRA</TableCell>
                <TableCell align="right">{formatCurrency(daMonthly)}</TableCell>
                <TableCell align="right">{formatCurrency(daAnnual)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>City Allowance</TableCell>
                <TableCell align="right">{formatCurrency(specialMonthly)}</TableCell>
                <TableCell align="right">{formatCurrency(specialAnnual)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Superannuation Fund</TableCell>
                <TableCell align="right">{formatCurrency(foodMonthly)}</TableCell>
                <TableCell align="right">{formatCurrency(foodAnnual)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Performance Bonus</TableCell>
                <TableCell align="right">{formatCurrency(miscMonthly)}</TableCell>
                <TableCell align="right">{formatCurrency(miscAnnual)}</TableCell>
              </TableRow>

              {/* Total Row */}
              <TableRow sx={{ backgroundColor: "#8bc34a" }}>
                <TableCell sx={{ fontWeight: 700 }}>Total Salary</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  {formatCurrency(totalMonthly)}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Confidential Note */}
          <Typography
            sx={{
              mt: 6,
              fontSize: "12pt",
              fontFamily: "Bahnschrift",
              textAlign: "center",
            }}
          ></Typography>
        </Box>
      </A4Page>
    </>
  );
};

/* ================= STYLES ================= */
const page = {
  width: "210mm",
  minHeight: "297mm",
  backgroundColor: "#fff",
  fontSize: "11pt",
  lineHeight: "1.5",
  display: "flex",
  flexDirection: "column",
  position: "relative",

  fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
};

const content = { padding: "22mm 25mm", flexGrow: 1 };
const fullWidth = { width: "100%", display: "block" };

const rightDate = { textAlign: "right", marginBottom: "32px" };
const greeting = { marginBottom: "18px" };
const para = { textAlign: "justify", marginBottom: "14px" };
const signOff = { marginBottom: "24mm" };

const signatureRow = {
  display: "flex",
  alignItems: "flex-start",
  gap: "28mm",
  marginBottom: "10px",
};

const signName = { fontWeight: 600 };
const annexureTitle = {
  textAlign: "center",
  fontWeight: 600,
  marginBottom: "20px",
};

const table = { width: "100%", borderCollapse: "collapse" };
const thLeft = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "left",
  fontWeight: 600,
};
const thCenter = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "center",
  fontWeight: 600,
};
const tdLeft = { border: "1px solid #000", padding: "8px", textAlign: "left" };
const tdCenter = {
  border: "1px solid #000",
  padding: "8px",
  textAlign: "center",
};

export default NimbjaIncrement;
