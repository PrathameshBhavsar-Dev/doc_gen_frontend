import React from "react";
import PropTypes from "prop-types";
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
    performanceBand = "Met Expectation",
  } = data;

  const firstName = employeeName?.trim().split(" ")[0] || "";

  /* ================= ACCURATE SALARY LOGIC ================= */

  const round0 = (num) => Math.round(num);

  const annualInput = round0(Number(newCTC || 0));
  const monthlyCTC = round0(annualInput / 12);

  // Annual breakup based on Annual CTC
  const basicAnnual = round0(annualInput * 0.4);
  const hraAnnual = round0(annualInput * 0.18);
  const daAnnual = round0(annualInput * 0.12);
  const specialAnnual = round0(annualInput * 0.16);
  const foodAnnual = round0(annualInput * 0.06);

  // Dynamic last component to avoid mismatch
  const miscAnnual =
    annualInput -
    (basicAnnual +
      hraAnnual +
      daAnnual +
      specialAnnual +
      foodAnnual);

  // Monthly from annual
  const basicMonthly = round0(basicAnnual / 12);
  const hraMonthly = round0(hraAnnual / 12);
  const daMonthly = round0(daAnnual / 12);
  const specialMonthly = round0(specialAnnual / 12);
  const foodMonthly = round0(foodAnnual / 12);
  const miscMonthly = round0(miscAnnual / 12);

  const salaryRows = [
    { name: "Basic", monthly: basicMonthly, annual: basicAnnual },
    { name: "House Rent Allowance", monthly: hraMonthly, annual: hraAnnual },
    { name: "Dearness Allowance", monthly: daMonthly, annual: daAnnual },
    { name: "Special Allowance", monthly: specialMonthly, annual: specialAnnual },
    { name: "Food Allowance", monthly: foodMonthly, annual: foodAnnual },
    { name: "Misc. Allowance", monthly: miscMonthly, annual: miscAnnual },
  ];

  const monthlyGross = monthlyCTC;
  const annualCTC = annualInput;

  return (
    <>
      {/* ================= PAGE 1 ================= */}
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

          <Typography sx={{ mb: 4 }}>
            Dear {firstName},
          </Typography>

          <Typography sx={paragraph}>
            At Smart Software Services, employee performance forms the core
            basis for annual compensation review and career enhancement apart
            from ensuring parity.
          </Typography>

          <Typography sx={paragraph}>
            Your performance has been reviewed and your performance banding for
            the year 2024–2025 is <b>"{performanceBand}"</b>.
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
            We look forward to your very active participation and contribution
            in our journey of scaling newer heights.
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Wishing you a happy and rewarding career with Smart Software
            Services (I) Pvt Ltd.
          </Typography>

          <Typography sx={{ mb: 2 }}>Yours Sincerely,</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 2 }}>
            {company.incrementSignature && (
              <Box
                component="img"
                src={company.incrementSignature}
                sx={{ height: 60 }}
              />
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

      {/* ================= PAGE 2 ================= */}
      <Box sx={pageStyle}>
        {company.headerImage && (
          <Box component="img" src={company.headerImage} sx={headerStyle} />
        )}

        {company.watermarkImage && (
          <Box component="img" src={company.watermarkImage} sx={watermarkStyle} />
        )}

        <Box sx={contentStyle}>
          <Typography
            align="center"
            sx={{ fontWeight: "bold", fontSize: "16px", mb: 4 }}
          >
            Salary Annexure
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography>Employee Code : {employeeId}</Typography>
            <Typography>Employee Name : {employeeName}</Typography>
            <Typography>
              Effective Date : {formatDate(effectiveDate)}
            </Typography>
          </Box>

          <TableContainer
            component={Paper}
            sx={{ border: "1px solid #000", boxShadow: "none" }}
          >
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(3,171,197,0.95)" }}>
                  <TableCell sx={headerCell}>Salary Components</TableCell>
                  <TableCell sx={headerCell} align="center">
                    Per Month (Rs.)
                  </TableCell>
                  <TableCell sx={headerCell} align="center">
                    Per Annum (Rs.)
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {salaryRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={bodyCell}>{row.name}</TableCell>
                    <TableCell sx={bodyCell} align="center">
                      {formatCurrency(row.monthly)}
                    </TableCell>
                    <TableCell sx={bodyCell} align="center">
                      {formatCurrency(row.annual)}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow sx={{ backgroundColor: "rgba(3,171,197,0.95)" }}>
                  <TableCell sx={totalCell}>Total Gross</TableCell>
                  <TableCell sx={totalCell} align="center">
                    {formatCurrency(monthlyGross)}
                  </TableCell>
                  <TableCell sx={totalCell} align="center">
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
  "@media print": {
    boxShadow: "none",
  },
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

const headerCell = {
  border: "1px solid #000",
  fontWeight: 600,
  fontSize: "12px",
};

const bodyCell = {
  border: "1px solid #000",
  fontSize: "11px",
};

const totalCell = {
  border: "1px solid #000",
  fontWeight: 600,
};

SmartSoftwareIncrement.propTypes = {
  company: PropTypes.object,
  data: PropTypes.object,
};

export default SmartSoftwareIncrement;