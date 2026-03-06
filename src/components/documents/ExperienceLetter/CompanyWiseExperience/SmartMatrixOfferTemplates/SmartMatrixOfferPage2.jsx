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
import sign from "../../../../../assets/images/smartmatrix/Smartmatrix_signature.png";
const SmartMatrixOfferPage2 = ({ data, company }) => {
  /* ======================================================
   ✅ SMARTMATRIX IMAGE LOGIC (INPUT IS MONTHLY)
   ====================================================== */

  const round2 = (num) => Math.round((Number(num) || 0) * 100) / 100;

  /* INPUT IS MONTHLY */
  const monthlyGross = round2(data.salary || 0);

  /* ANNUAL DERIVED */
  const annualCTC = round2(monthlyGross * 12);

  /* Percentage Structure (Same as Image) */
  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
    misc: 0.08,
  };

  /* Monthly Calculation */
  const basicMonthly = round2(monthlyGross * PERCENT.basic);
  const hraMonthly = round2(monthlyGross * PERCENT.hra);
  const daMonthly = round2(monthlyGross * PERCENT.da);
  const specialMonthly = round2(monthlyGross * PERCENT.special);
  const foodMonthly = round2(monthlyGross * PERCENT.food);

  /* Adjustment to prevent ₹1 mismatch */
  const miscMonthly = round2(
    monthlyGross -
      (basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly),
  );

  /* Salary Rows */
  const salaryComponents = [
    { name: "Basic", monthly: basicMonthly, annual: round2(basicMonthly * 12) },
    {
      name: "House Rent Allowance",
      monthly: hraMonthly,
      annual: round2(hraMonthly * 12),
    },
    {
      name: "Dearness Allowance",
      monthly: daMonthly,
      annual: round2(daMonthly * 12),
    },
    {
      name: "Special Allowance",
      monthly: specialMonthly,
      annual: round2(specialMonthly * 12),
    },
    {
      name: "Facilty Allowance",
      monthly: miscMonthly,
      annual: round2(miscMonthly * 12),
    },
    {
      name: "Food Allowance",
      monthly: foodMonthly,
      annual: round2(foodMonthly * 12),
    },
  ];

  /* Totals (Guaranteed Correct) */
  const totalMonthly = monthlyGross;
  const totalAnnual = annualCTC;
  return (
    <A4Page
      headerSrc={company?.header || "/assets/jdit_header.png"}
      footerSrc={company?.footer || "/assets/jdit_footer.png"}
      contentTop="45mm"
      contentBottom="28mm"
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
      <TableContainer
        sx={{
          mt: "10mm",
          mb: "8mm",
          fontFamily: "Times New Roman",
        }}
      >
        <Table
          sx={{
            border: "2px solid #000",
            borderCollapse: "collapse",
            tableLayout: "fixed",
            width: "100%",
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#f28c28",
              }}
            >
              <TableCell
                sx={{
                  width: "50%",
                  border: "1px solid #000",
                  fontWeight: 700,
                  fontSize: "12px",
                  padding: "4px 6px",
                }}
              >
                Salary Components
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  width: "25%",
                  border: "1px solid #000",
                  fontWeight: 700,
                  fontSize: "12px",
                  padding: "4px 6px",
                }}
              >
                Per month (Rs.)
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  width: "25%",
                  border: "1px solid #000",
                  fontWeight: 700,
                  fontSize: "12px",
                  padding: "4px 6px",
                }}
              >
                Per Annum (Rs.)
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {salaryComponents.map((row, i) => (
              <TableRow key={i}>
                <TableCell
                  sx={{
                    border: "1px solid #000",
                    fontSize: "12px",
                    padding: "3px 6px",
                  }}
                >
                  {row.name}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    border: "1px solid #000",
                    fontSize: "12px",
                    padding: "3px 6px",
                  }}
                >
                  {formatCurrency(row.monthly)}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    border: "1px solid #000",
                    fontSize: "12px",
                    padding: "3px 6px",
                  }}
                >
                  {formatCurrency(row.annual)}
                </TableCell>
              </TableRow>
            ))}

            {/* TOTAL ROW */}
            <TableRow
              sx={{
                backgroundColor: "#f28c28",
              }}
            >
              <TableCell
                sx={{
                  border: "1px solid #000",
                  fontWeight: 700,
                  fontSize: "12px",
                  padding: "4px 6px",
                }}
              >
                Total Monthly Gross Salary
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  border: "1px solid #000",
                  fontWeight: 700,
                  fontSize: "12px",
                  padding: "4px 6px",
                }}
              >
                {formatCurrency(totalMonthly)}
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  border: "1px solid #000",
                  fontWeight: 700,
                  fontSize: "12px",
                  padding: "4px 6px",
                }}
              >
                {formatCurrency(totalAnnual)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Signature Block (UNCHANGED) */}
      <Typography
        sx={{ mt: "20mm", fontFamily: "Verdana, Geneva, sans-serif" }}
      >
        <strong>{company.name}</strong>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ mb: "8mm" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Box
                component="img"
                src={sign}
                alt="Sign"
                sx={{ width: 110, mt: "35mm" }}
              />
            </Grid>
            <Grid item>
              <Box
                component="img"
                src={company.stamp}
                alt="Signature"
                sx={{ width: 130, mt: "10mm", ml: "-2mm" }}
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

export default SmartMatrixOfferPage2;
