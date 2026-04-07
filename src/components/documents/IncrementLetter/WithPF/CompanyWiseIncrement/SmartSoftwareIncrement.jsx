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

  const firstName = employeeName.split(" ")[0] || "";

  /* ================= SAME LOGIC AS CONFIRMATION ================= */
  const totalAnnualCTC = Number(newCTC) || 0;

  const salaryComponents = useMemo(() => {
    const round0 = (num) => Math.round(num);

    const annualCTC = round0(totalAnnualCTC);
    const monthlyCTC = round0(annualCTC / 12);

    const pfMonthly = 3750;

    const hraMonthly = round0(monthlyCTC * 0.18);
    const daMonthly = round0(monthlyCTC * 0.12);
    const specialMonthly = round0(monthlyCTC * 0.16);
    const foodMonthly = round0(monthlyCTC * 0.06);

    const basicMonthly = round0(
      monthlyCTC -
        (hraMonthly + daMonthly + specialMonthly + foodMonthly + pfMonthly)
    );

    return [
      { name: "Basic Salary", monthly: basicMonthly, annual: basicMonthly * 12 },
      { name: "House Rent Allowance", monthly: hraMonthly, annual: hraMonthly * 12 },
      { name: "Conveyance Allowance", monthly: daMonthly, annual: daMonthly * 12 },
      { name: "Special Allowance", monthly: specialMonthly, annual: specialMonthly * 12 },
      { name: "Food Allowance", monthly: foodMonthly, annual: foodMonthly * 12 },
      { name: "Provident Fund (PF)", monthly: pfMonthly, annual: pfMonthly * 12 },
    ];
  }, [totalAnnualCTC]);

  const totalMonthly = salaryComponents.reduce(
    (sum, item) => sum + item.monthly,
    0
  );

  const totalAnnual = salaryComponents.reduce(
    (sum, item) => sum + item.annual,
    0
  );

  /* ================= TABLE CELL STYLE ================= */
  const tableCell = {
    border: "1px solid #333",
    fontSize: "10pt",
    padding: "6px",
  };

  /* ================= PAGE STYLES ================= */
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

  const paragraph = { mb: 3, textAlign: "justify" };
  const headerStyle = { position: "absolute", top: 0, width: "100%" };
  const footerStyle = { position: "absolute", bottom: 0, width: "100%" };

  return (
    <>
      {/* ================= PAGE 1 : INCREMENT LETTER ================= */}
      <Box sx={pageStyle}>
        {company.headerImage && (
          <Box component="img" src={company.headerImage} sx={headerStyle} />
        )}

        <Box sx={contentStyle}>
          <Typography align="right" sx={{ mb: 6 }}>
            {formatDate(issueDate)}
          </Typography>

          <Typography sx={{ mb: 4 }}>Dear {firstName},</Typography>

          <Typography sx={paragraph}>
            At Smart Software Services, employee performance forms the core
            basis for annual compensation review and career enhancement apart
            from ensuring parity.
          </Typography>

          <Typography sx={paragraph}>
            Your performance has been reviewed and your performance banding for
            the year 2024–2025 is <b>"{performanceBand}"</b>.
          </Typography>

          {/* ✅ FIXED HERE */}
          <Typography sx={paragraph}>
            In recognition of your performance your compensation has been revised
            to <b>INR {formatCurrency(totalAnnualCTC)} per Annum</b> effective{" "}
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
         
                     {/* Signature */}
                     {company.incrementSignature && (
                       <Box
                         component="img"
                         src={company.incrementSignature}
                         sx={{ height: 60 }}
                       />
                     )}
         
                     {/* Stamp */}
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

        <Box sx={contentStyle}>
          <Typography align="center" sx={{ fontWeight: "bold", mb: 4 }}>
            Salary Annexure
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography>Employee Code : {employeeId}</Typography>
            <Typography>Employee Name : {employeeName}</Typography>
            <Typography>Effective Date : {formatDate(effectiveDate)}</Typography>
          </Box>

          {/* ================= TABLE ================= */}
          <TableContainer>
            <Table
              size="small"
              sx={{
                border: "1px solid #333",
                borderCollapse: "collapse",
                width: "100%",
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#1f9fb3",
                    "& th": {
                      fontWeight: "bold",
                      color: "#000",
                      border: "1px solid #333",
                      fontSize: "10pt",
                      padding: "6px",
                    },
                  }}
                >
                  <TableCell>Salary Component</TableCell>
                  <TableCell align="center">Per Month (Rs.)</TableCell>
                  <TableCell align="center">Per Annum (Rs.)</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {salaryComponents.map((row, i) => (
                  <TableRow key={i} sx={{ backgroundColor: "#fff" }}>
                    <TableCell sx={tableCell}>{row.name}</TableCell>
                    <TableCell align="center" sx={tableCell}>
                      {formatCurrency(row.monthly)}
                    </TableCell>
                    <TableCell align="center" sx={tableCell}>
                      {formatCurrency(row.annual)}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow
                  sx={{
                    backgroundColor: "#1f9fb3",
                    "& td": {
                      fontWeight: "bold",
                      border: "1px solid #333",
                      padding: "6px",
                    },
                  }}
                >
                  <TableCell>Total Gross Salary</TableCell>
                  <TableCell align="center">
                    {formatCurrency(totalMonthly)}
                  </TableCell>
                  <TableCell align="center">
                    {formatCurrency(totalAnnual)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography sx={{ mt: 4 }}>
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

export default SmartSoftwareIncrement;