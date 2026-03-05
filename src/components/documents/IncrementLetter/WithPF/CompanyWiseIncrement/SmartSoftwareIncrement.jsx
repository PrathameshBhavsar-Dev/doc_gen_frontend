import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";

import { generateSalaryComponents } from "../../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : "";

/* ================= CURRENCY FORMAT ================= */
const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-IN");

/* ================= MAIN COMPONENT ================= */
const SmartSoftwareIncrement = ({ company, data }) => {
  if (!company || !data) return null;

  const {
    employeeName = "",
    employeeId = "",
    issueDate = "",
    effectiveDate = "",
    newCTC = 0,
  } = data;

  const firstName = employeeName.split(" ")[0] || "";

  /* ================= SALARY ================= */
  const computedSalary = useMemo(() => generateSalaryComponents(newCTC), [newCTC]);

  const salaryComponents = computedSalary;

  // ✅ Calculate totals
  const totalMonthly = salaryComponents.reduce(
    (sum, row) => sum + Number(row.monthly || 0),
    0
  );

  const totalAnnual = salaryComponents.reduce(
    (sum, row) => sum + Number(row.annual || 0),
    0
  );

  const monthlyPF = 3750;
  const annualPF = monthlyPF * 12;

  return (
    <>
      {/* ================= PAGE 1 : INCREMENT LETTER ================= */}
      <Box sx={pageStyle}>
        {company.headerImage && (
          <Box component="img" src={company.headerImage} sx={headerStyle} />
        )}

        {company.watermarkImage && (
          <Box component="img" src={company.watermarkImage} sx={watermarkStyle} />
        )}

        <Box sx={contentStyle}>
          <Typography align="right" sx={{ mb: 6 }}>
            {formatDate(issueDate)}
          </Typography>

          <Typography sx={{ mb: 4 }}>Dear {firstName},</Typography>

          <Typography sx={paragraph}>
            At Smart Software Services, employee performance forms the core basis
            for annual compensation review and career enhancement apart from
            ensuring parity.
          </Typography>

          <Typography sx={paragraph}>
            Your performance has been reviewed and your performance banding for
            the year 2024–2025 is <b>"Met Expectation"</b>.
          </Typography>

          <Typography sx={paragraph}>
            In recognition of your performance your compensation has been revised
            to <b>INR {formatCurrency(totalAnnual)} per Annum</b> effective{" "}
            <b>{formatDate(effectiveDate)}</b>.
          </Typography>

          <Typography sx={{ mb: 3 }}>
            Details of your revised compensation are given in Salary Annexure.
          </Typography>

          <Typography sx={{ mb: 2 }}>
            We look forward to your very active participation and contribution in
            our journey of scaling newer heights.
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Wishing you a happy and rewarding career with Smart Software Services
            (I) Pvt Ltd.
          </Typography>

          <Typography sx={{ mb: 2 }}>Yours Sincerely,</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 2 }}>
            {company.incrementSignature && (
              <Box component="img" src={company.incrementSignature} sx={{ height: 60 }} />
            )}
            {company.stamp && (
              <Box component="img" src={company.stamp} sx={{ height: 90 }} />
            )}
          </Box>

          <Typography fontWeight="bold" sx={{ mt: 2 }}>
            CEO & Managing Director
          </Typography>
        </Box>

        {company.footerImage && <Box component="img" src={company.footerImage} sx={footerStyle} />}
      </Box>

      {/* ================= PAGE BREAK ================= */}
      <Box sx={{ pageBreakBefore: "always" }} />

      {/* ================= PAGE 2 : SALARY ANNEXURE ================= */}
      <Box sx={pageStyle}>
        {company.headerImage && <Box component="img" src={company.headerImage} sx={headerStyle} />}

        {company.watermarkImage && (
          <Box component="img" src={company.watermarkImage} sx={watermarkStyle} />
        )}

        <Box sx={contentStyle}>
          <Typography align="center" sx={{ fontWeight: "bold", fontSize: "16px", mb: 4 }}>
            Salary Annexure
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography>Employee Code : {employeeId}</Typography>
            <Typography>Employee Name : {employeeName}</Typography>
            <Typography>Effective Date : {formatDate(effectiveDate)}</Typography>
          </Box>

          {/* ================= TABLE ================= */}
          <TableContainer sx={{ mb: "4mm" }}>
            <Table
              size="small"
              sx={{ border: "1px solid #333", borderCollapse: "collapse", width: "100%" }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#32a1c2ff",
                    "& th": {
                      color: "#000",
                      fontWeight: 600,
                      fontSize: "10pt",
                      border: "1px solid #333",
                      py: "0.4mm",
                    },
                  }}
                >
                  <TableCell>Salary Components</TableCell>
                  <TableCell align="center">Per month (Rs.)</TableCell>
                  <TableCell align="center">Per Annum (Rs.)</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {salaryComponents
                  .filter((row) => row.name !== "Misc")
                  .map((row, i) => (
                    <TableRow key={i}>
                      <TableCell sx={tableCell}>{row.name}</TableCell>
                      <TableCell align="center" sx={tableCell}>
                        {formatCurrency(row.monthly)}
                      </TableCell>
                      <TableCell align="center" sx={tableCell}>
                        {formatCurrency(row.annual)}
                      </TableCell>
                    </TableRow>
                  ))}

                {/* Static PF Row */}
                <TableRow>
                  <TableCell sx={tableCell}>Provident Fund (PF)</TableCell>
                  <TableCell align="center" sx={tableCell}>
                    {formatCurrency(monthlyPF)}
                  </TableCell>
                  <TableCell align="center" sx={tableCell}>
                    {formatCurrency(annualPF)}
                  </TableCell>
                </TableRow>

                {/* Total Row */}
                <TableRow
                  sx={{
                    backgroundColor: "#32a1c2ff",
                    "& td": {
                      color: "#000",
                      fontWeight: 600,
                      fontSize: "10pt",
                      border: "1px solid #333",
                      py: "0.4mm",
                    },
                  }}
                >
                  <TableCell>Total Monthly Gross Salary</TableCell>
                  <TableCell align="center">{formatCurrency(totalMonthly)}</TableCell>
                  <TableCell align="center">{formatCurrency(totalAnnual)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography sx={{ mt: 4, fontSize: "13px" }}>
            Please note that the details in this communication are confidential and
            you are requested not to share the same with others.
          </Typography>
        </Box>

        {company.footerImage && <Box component="img" src={company.footerImage} sx={footerStyle} />}
      </Box>
    </>
  );
};

/* ================= STYLES ================= */
const pageStyle = {
  width: "210mm",
  minHeight: "297mm",
  position: "relative",
  backgroundColor: "#fff",
  fontFamily: `"Times New Roman", serif`,
  fontSize: "14px",
};

const contentStyle = {
  padding: "45mm 25mm 35mm 25mm",
  position: "relative",
  zIndex: 2,
};

const paragraph = {
  mb: 3,
  textAlign: "justify",
};

const headerStyle = {
  position: "absolute",
  top: 0,
  width: "100%",
};

const footerStyle = {
  position: "absolute",
  bottom: 0,
  width: "100%",
};

const watermarkStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "120mm",
  opacity: 0.07,
};

const tableCell = {
  border: "1px solid #000",
  fontSize: "11.5px",
  padding: "3px 6px",
};

export default SmartSoftwareIncrement;
