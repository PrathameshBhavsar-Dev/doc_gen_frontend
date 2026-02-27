import React from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  TableContainer,
  Grid,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { formatCurrency } from "../../../../../utils/salaryCalculations";

const SmartMatrixOfferPage2 = ({ data, company }) => {
  /* ======================================================
     ✅ SALARY LOGIC — INJECTED (DEVCONS SOURCE OF TRUTH)
     ====================================================== */

  const round2 = (num) => Number(num.toFixed(2));

  // Source of truth
  const annualCTC = round2(
    Number(data.salary || data.ctc || data.annualSalary || 0)
  );

  // Annual breakup (percent based)
  const basicAnnual = round2(annualCTC * 0.4);
  const hraAnnual = round2(annualCTC * 0.18);
  const daAnnual = round2(annualCTC * 0.12);
  const specialAnnual = round2(annualCTC * 0.16);
  const foodAnnual = round2(annualCTC * 0.06);

  const usedAnnual =
    basicAnnual + hraAnnual + daAnnual + specialAnnual + foodAnnual;

  // Adjustment to avoid rounding mismatch
  const miscAnnual = round2(annualCTC - usedAnnual);

  // Rows (derived ONLY from final annual values)
  const salaryComponents = [
    {
      name: "Basic",
      monthly: round2(basicAnnual / 12),
      annual: basicAnnual,
    },
    {
      name: "House Rent Allowance",
      monthly: round2(hraAnnual / 12),
      annual: hraAnnual,
    },
    {
      name: "Dearness Allowance",
      monthly: round2(daAnnual / 12),
      annual: daAnnual,
    },
    {
      name: "Special Allowance",
      monthly: round2(specialAnnual / 12),
      annual: specialAnnual,
    },
    {
      name: "Food Allowance",
      monthly: round2(foodAnnual / 12),
      annual: foodAnnual,
    },
    {
      name: "Misc. Allowance",
      monthly: round2(miscAnnual / 12),
      annual: miscAnnual,
    },
  ];

  // Totals guaranteed to match CTC
  const totalMonthly = round2(
    salaryComponents.reduce((sum, r) => sum + r.monthly, 0)
  );

  const totalAnnual = round2(
    salaryComponents.reduce((sum, r) => sum + r.annual, 0)
  );

  return (
    <A4Page
      headerSrc={company?.header || "/assets/jdit_header.png"}
      footerSrc={company?.footer || "/assets/jdit_footer.png"}
      contentTop="45mm"
      contentBottom="28mm"
      company={company}
    >
      {/* Document Title */}
      <Typography
        align="center"
        sx={{
          fontSize: "16pt",
          fontWeight: 700,
          fontFamily: "Verdana",
          textDecoration: "underline",
          mb: "8mm",
        }}
      ></Typography>

      <Typography
        sx={{
          fontSize: "11pt",
          fontWeight: "bold",
          textAlign: "center",
          mb: "6mm",
        }}
      >
        Annexure A Salary Structure
      </Typography>

      {/* Salary Table */}
      <TableContainer sx={{ mb: "6mm" }}>
        <Table sx={{ border: "2px solid #333" }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "rgba(215, 121, 34, 0.9)",
                fontFamily: "Times New Roman",
              }}
            >
              <TableCell sx={headCell}>Salary Components</TableCell>
              <TableCell align="center" sx={headCell}>
                Per month (Rs.)
              </TableCell>
              <TableCell align="center" sx={headCell}>
                Per Annum (Rs.)
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {salaryComponents.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={bodyCell}>{row.name}</TableCell>
                <TableCell align="right" sx={bodyCell}>
                  {formatCurrency(row.monthly)}
                </TableCell>
                <TableCell align="right" sx={bodyCell}>
                  {formatCurrency(row.annual)}
                </TableCell>
              </TableRow>
            ))}

            {/* Totals Row */}
            <TableRow
              sx={{
                backgroundColor: "rgba(215, 121, 34, 0.9)",
                fontFamily: "Times New Roman",
              }}
            >
              <TableCell sx={totalCell}>Total Monthly Gross Salary</TableCell>
              <TableCell align="right" sx={totalCell}>
                {formatCurrency(totalMonthly)}
              </TableCell>
              <TableCell align="right" sx={totalCell}>
                {formatCurrency(totalAnnual)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Signature Block (UNCHANGED) */}
      <Typography sx={{ mb: "2mm", fontFamily: "Verdana, Geneva, sans-serif" }}>
        <strong>{company.name}</strong>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ mt: "",mb:"8mm" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Box
                component="img"
                src={company.signature}
                alt="Sign"
                sx={{ width: 110,ml:"-5mm",mt:"18mm" }}
              />
            </Grid>
            <Grid item>
              <Box
                component="img"
                src={company.stamp}
                alt="Signature"
                sx={{ width: 130, mt: "18mm", ml: "-2mm" }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: "2mm" }}>
            <Typography>
              <strong>{company.hrName}</strong>
            </Typography>
            <Typography>
              <strong>HR Manager - HR Services</strong>
            </Typography>
          </Box>
        </Box>
      </Box>
    </A4Page>
  );
};

/* ================= STYLES ================= */

const headCell = {
  fontWeight: "bold",
  border: "1px solid #333",
  fontSize: "11pt",
  color: "white",
  py: "0.5mm",
};

const bodyCell = {
  border: "1px solid #333",
  fontSize: "11pt",
  py: "0.5mm",
};

const totalCell = {
  fontWeight: "bold",
  border: "2px solid #333",
  fontSize: "11pt",
  py: "0.5mm",
};

export default SmartMatrixOfferPage2;
