import React, { useMemo } from "react";
import {
  Typography,
  Box,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";

/* ================= SALARY UTILITIES ================= */
import {
  formatCurrency,
  numberToWords,
} from "../../../../../utils/salaryCalculations";

export default function SmartSoftwareOffer({ company, data }) {
  const {
    issueDate = new Date(),
    candidateName = "",
    address = "",
    position = "",
    joiningDate = "",
    salary = 0,
    mrms = "",
  } = data || {};

  /* ================= TEXT STYLES ================= */

  const baseText = {
    fontSize: "11pt",
    lineHeight: 1.6,
  };

  const labelStyle = {
    fontWeight: 600,
  };

  const para = {
    mt: "16px",
    textAlign: "justify",
  };

  const paraLarge = {
    mt: "20px",
    textAlign: "justify",
  };

  /* ================= FORMATTED VALUES ================= */

  const displayTitle = mrms ? `${mrms}.` : "";

  const firstName = candidateName?.split(" ")[0] || "";

  const formattedJoiningDate = joiningDate
    ? new Date(joiningDate).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : "";

  /* ================= SALARY CALCULATION (48%,18%,12%,16%,6%) ================= */

  const totalAnnual = Number(salary) || 0;
  const totalMonthly = Math.round(totalAnnual / 12);

  const salaryComponents = useMemo(() => {
    const basic = Math.round(totalAnnual * 0.48);
    const hra = Math.round(totalAnnual * 0.18);
    const conveyance = Math.round(totalAnnual * 0.12);
    const special = Math.round(totalAnnual * 0.16);

    const misc = totalAnnual - (basic + hra + conveyance + special);

    return [
      { name: "Basic Salary", annual: basic, monthly: Math.round(basic / 12) },
      { name: "HRA ", annual: hra, monthly: Math.round(hra / 12) },
      { name: "Conveyance Allowance", annual: conveyance, monthly: Math.round(conveyance / 12) },
      { name: "Special Allowance", annual: special, monthly: Math.round(special / 12) },
      { name: "Food Allowance", annual: misc, monthly: Math.round(misc / 12) },
    ];
  }, [totalAnnual]);

  const salaryInWords = numberToWords(totalAnnual);

  /* ================= PF ================= */

  const monthlyPF = 3750;
  const annualPF = monthlyPF * 12;

  /* ================= TABLE CELL STYLE ================= */

  const tableCellStyle = {
    border: "1px solid #333",
    fontSize: "9.75pt",
    py: "0.35mm",
  };

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Layout company={{ ...company, watermark: null, watermarkImage: null }}>
        <Box sx={baseText}>
          <Typography sx={{ textAlign: "right" }}>
            {new Date(issueDate).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </Typography>

          <Typography sx={{ mt: "24px" }}>
            <Box component="span" sx={labelStyle}>Name</Box> : {displayTitle} {candidateName}
          </Typography>

          <Typography sx={{ mt: "12px" }}>
            <Box component="span" sx={labelStyle}>Address</Box> : {address}
          </Typography>

          <Typography sx={{ mt: "12px" }}>
            <Box component="span" sx={labelStyle}>Subject</Box> :
            <Box component="span" sx={{ textDecoration: "underline", ml: 1 }}>
              Letter of intent for the position of {position}.
            </Box>
          </Typography>

          <Typography sx={{ mt: "24px" }}>
            Dear {displayTitle} {firstName},
          </Typography>

          <Typography sx={para}>
            We are pleased to offer you the position of {position}. As discussed,
            you are requested to join on {formattedJoiningDate}. Your total Gross salary
            will be Rs. {formatCurrency(totalAnnual)} ({salaryInWords}) per year.
          </Typography>

          <Typography sx={paraLarge}>
            Subject to various deductions as per company and government policy.
          </Typography>

          <Typography sx={para}>
            The roles and responsibilities and other terms and conditions of your
            employment will be specified in your letter of appointment.
          </Typography>

          <Typography sx={para}>
            We welcome you to <b>{company.name}</b> Family and hope it would be
            the beginning of a long and mutually beneficial association.
          </Typography>

          <Typography sx={{ ...para, ml: "50px" }}>
            Kindly acknowledge the duplicate copy of this letter as an acceptance
            of this offer.
          </Typography>

          <Typography sx={{ mt: "24px" }}>Yours Sincerely,</Typography>
          <Typography>For <b>{company.name?.toUpperCase()}</b></Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
            <Box>
              <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
                {company.signature && (
                  <Box component="img" src={company.signature} sx={{ height: "80px" }} />
                )}
                {company.stamp && (
                  <Box component="img" src={company.stamp} sx={{ height: "100px" }} />
                )}
              </Box>
              <Typography>{company.hrName}</Typography>
              <Typography>HR Relations Lead</Typography>
            </Box>

            <Box sx={{ width: "45%", mt: 8 }}>
              <Typography>Signature : ___________________</Typography>
              <Typography>Candidate Name : {candidateName}</Typography>
            </Box>
          </Box>
        </Box>
      </A4Layout>

      {/* ================= PAGE 2 ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Typography align="center" sx={{ mb: "24px" }}>
          <b>Annexure A – Salary Structure</b>
        </Typography>

        <Typography sx={{ mb: 2 }}>
          <b>Name : {candidateName}</b>
          <span style={{ marginLeft: "120px" }}>
            <b>Designation : {position}</b>
          </span>
        </Typography>

        <TableContainer sx={{ mb: "4mm" }}>
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
                  backgroundColor: "#32a1c2ff",
                  "& th": {
                    fontWeight: 600,
                    fontSize: "10pt",
                    border: "1px solid #333",
                  },
                }}
              >
                <TableCell>Salary Components</TableCell>
                <TableCell align="center">Per month (Rs.)</TableCell>
                <TableCell align="center">Per Annum (Rs.)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryComponents.map((row, i) => (
                <TableRow key={i}>
                  <TableCell sx={tableCellStyle}>{row.name}</TableCell>
                  <TableCell align="center" sx={tableCellStyle}>
                    {formatCurrency(row.monthly)}
                  </TableCell>
                  <TableCell align="center" sx={tableCellStyle}>
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell sx={tableCellStyle}>Provident Fund (PF)</TableCell>
                <TableCell align="center" sx={tableCellStyle}>
                  {formatCurrency(monthlyPF)}
                </TableCell>
                <TableCell align="center" sx={tableCellStyle}>
                  {formatCurrency(annualPF)}
                </TableCell>
              </TableRow>

              <TableRow
                sx={{
                  backgroundColor: "#32a1c2ff",
                  "& td": {
                    fontWeight: 600,
                    fontSize: "10pt",
                    border: "1px solid #333",
                  },
                }}
              >
                <TableCell>Total Monthly Gross Salary</TableCell>
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
      </A4Layout>
    </>
  );
}