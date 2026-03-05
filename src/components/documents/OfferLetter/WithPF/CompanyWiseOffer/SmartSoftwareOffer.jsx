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

  /* ================= SALARY CALCULATION (48%,18%,12%,16%,6%) ================= */

  const totalAnnual = Number(salary) || 0;
  const totalMonthly = Math.round(totalAnnual / 12);

  const salaryComponents = useMemo(() => {

    const basic = Math.round(totalAnnual * 0.48);
    const hra = Math.round(totalAnnual * 0.18);
    const conveyance = Math.round(totalAnnual * 0.12);
    const special = Math.round(totalAnnual * 0.16);

    // MISC = remaining 6% (adjusts rounding automatically)
    const misc = totalAnnual - (basic + hra + conveyance + special);

    return [
      { name: "Basic Salary (48%)", annual: basic, monthly: Math.round(basic / 12) },
      { name: "HRA (18%)", annual: hra, monthly: Math.round(hra / 12) },
      { name: "Conveyance Allowance (12%)", annual: conveyance, monthly: Math.round(conveyance / 12) },
      { name: "Special Allowance (16%)", annual: special, monthly: Math.round(special / 12) },
      { name: "MISC Allowance (6%)", annual: misc, monthly: Math.round(misc / 12) },
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

              {/* Salary Breakup Rows */}
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

              {/* PF Row */}
              <TableRow>
                <TableCell sx={tableCellStyle}>
                  Provident Fund (PF)
                </TableCell>
                <TableCell align="center" sx={tableCellStyle}>
                  {formatCurrency(monthlyPF)}
                </TableCell>
                <TableCell align="center" sx={tableCellStyle}>
                  {formatCurrency(annualPF)}
                </TableCell>
              </TableRow>

              {/* TOTAL ROW */}
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