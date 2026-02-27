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
  const computedSalary = useMemo(
    () => generateSalaryComponents(newCTC),
    [newCTC]
  );

  const monthlyGross = computedSalary.reduce(
    (sum, row) => sum + Number(row.monthly || 0),
    0
  );

  const annualCTC = monthlyGross * 12;

  return (
    <>
      {/* ================= PAGE 1 : INCREMENT LETTER ================= */}
      <Box sx={pageStyle}>
        {company.headerImage && (
          <Box component="img" src={company.headerImage} sx={headerStyle} />
        )}

        {company.watermarkImage && (
          <Box
            component="img"
            src={company.watermarkImage}
            sx={watermarkStyle}
          />
        )}

        <Box sx={contentStyle}>
          <Typography align="right" sx={{ mb: 6 }}>
            {formatDate(issueDate)}
          </Typography>

          <Typography sx={{ mb: 4 }}>
            Dear {firstName},
          </Typography>

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
            to <b>INR {formatCurrency(annualCTC)} per Annum</b> effective{" "}
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

        {company.footerImage && (
          <Box component="img" src={company.footerImage} sx={footerStyle} />
        )}
      </Box>

      {/* ================= PAGE BREAK ================= */}
      <Box sx={{ pageBreakBefore: "always" }} />

      {/* ================= PAGE 2 : SALARY ANNEXURE ================= */}
      <Box sx={pageStyle}>
        {company.headerImage && (
          <Box component="img" src={company.headerImage} sx={headerStyle} />
        )}

        {company.watermarkImage && (
          <Box
            component="img"
            src={company.watermarkImage}
            sx={watermarkStyle}
          />
        )}

        <Box sx={contentStyle}>
          <Typography
            align="center"
            sx={{ fontWeight: "bold", fontSize: "16px", mb: 4 }}
          >
            Salary Annexure
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography>
              Employee Code : {employeeId}
            </Typography>
            <Typography>
              Employee Name : {employeeName}
            </Typography>
            <Typography>
              Effective Date : {formatDate(effectiveDate)}
            </Typography>
          </Box>

          {/* ================= TABLE ================= */}
         
          <TableContainer
            component={Paper}
            sx={{
              border: "1px solid #000",          // 🔽 thinner outer border
              boxShadow: "none",
              borderRadius: 0,
              fontFamily: "Verdana, Arial, sans-serif", // ✅ Verdana applied
            }}
          >
            <Table
              size="small"
              sx={{
                borderCollapse: "collapse",
                width: "100%",
                tableLayout: "fixed",
                fontFamily: "Verdana, Arial, sans-serif", // ✅ Verdana
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(3, 171, 197, 0.95)",
                    "& th": {
                      color: "#000",
                      border: "1px solid #000",
                      fontWeight: 600,            // 🔽 lighter than bold
                      fontSize: "11px",           // 🔽 smaller header text
                      padding: "4px 6px",         // 🔽 compact header
                      fontFamily: "Verdana, Arial, sans-serif",
                    },
                  }}
                >
                  <TableCell sx={{ width: "50%" }}>Salary Components</TableCell>
                  <TableCell sx={{ width: "25%",textAlign: "center" }}>
                    Per month  (Rs.)
                  </TableCell>
                  <TableCell sx={{ width: "25%",textAlign: "center" }}>
                    Per Annum  (Rs.)
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {computedSalary.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell
                      sx={{
                        border: "1px solid #000",
                        fontSize: "10.5px",        // 🔽 smaller body text
                        padding: "4px 6px",        // 🔽 compact rows
                        textAlign: "left",
                        fontFamily: "Verdana, Arial, sans-serif",
                      }}
                    >
                      {row.name}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #000",
                        fontSize: "10.5px",
                        padding: "4px 6px",
                        fontFamily: "Verdana, Arial, sans-serif",
                      }}
                    >
                      {formatCurrency(row.monthly)}
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid #000",
                        fontSize: "10.5px",
                        padding: "4px 6px",
                        fontFamily: "Verdana, Arial, sans-serif",
                      }}
                    >
                      {formatCurrency(row.annual)}
                    </TableCell>
                  </TableRow>
                ))}

                {/* TOTAL ROW */}
                <TableRow
                  sx={{
                    backgroundColor: "rgba(3, 171, 197, 0.95)",
                    "& td": {
                      color: "#000",
                      border: "1px solid #000",
                      fontWeight: 600,            // 🔽 not heavy bold
                      fontSize: "11px",
                      padding: "4px 6px",
                      fontFamily: "Verdana, Arial, sans-serif",
                    },
                  }}
                >
                  <TableCell>Total Gross</TableCell>
                  <TableCell align="center">
                    {formatCurrency(monthlyGross)}
                  </TableCell>
                  <TableCell align="center">
                    {formatCurrency(annualCTC)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography sx={{ mt: 4, fontSize: "13px" }}>
            Please note that the details in this communication are confidential
            and you are requested not to share the same with others.
          </Typography>
        </Box>

        {company.footerImage && (
          <Box component="img" src={company.footerImage} sx={footerStyle} />
        )}
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
