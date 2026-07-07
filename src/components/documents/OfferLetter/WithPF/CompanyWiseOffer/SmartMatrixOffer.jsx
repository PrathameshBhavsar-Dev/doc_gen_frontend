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
import sign from "../../../../../assets/images/smartmatrix/Smartmatrix_sign.png";
import stamp from "../../../../../assets/images/smartmatrix/Smartmatrix_stamp.png";
/* ================= NUMBER TO WORDS ================= */
const numberToWords = (num) => {
  if (num === 0) return "Zero Rupees Only";
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " and " + inWords(n % 100) : "")
      );
    if (n < 100000)
      return (
        inWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 ? " " + inWords(n % 1000) : "")
      );
    if (n < 10000000)
      return (
        inWords(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 ? " " + inWords(n % 100000) : "")
      );
    if (n < 1000000000)
      return (
        inWords(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 ? " " + inWords(n % 10000000) : "")
      );
    return "";
  };

  return inWords(num) + " Rupees Only";
};

const SmartMatrixOffer = ({ company, data }) => {
  if (!company || !data) return null;

  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
      : "";

  const issueDate = data?.offer_letter?.issueDate ?? data?.issueDate;
  const offerDate = fmtDate(issueDate);
  const joiningDate = fmtDate(data.joiningDate);
  const position = data.joiningDesignation  ?? data.position;

  /* ================= CORRECTED LOGIC ================= */
  const round0 = (num) => Math.round(num);

  // ================= ANNUAL CTC INPUT =================
  const annualCTC = round0(Number(data.salary || 0));

  // ================= MONTHLY CTC =================
  const monthlyCTC = round0(annualCTC / 12);

  // ================= STATIC PF =================
  const pfMonthly = 3750;

  // ================= FIXED PERCENTAGES =================
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  // const foodMonthly = round0(monthlyCTC * 0.06);
  const foodMonthly = 3800;

  // ================= ADJUSTED BASIC =================
  const basicMonthly = round0(
    monthlyCTC -
    (hraMonthly + daMonthly + specialMonthly + foodMonthly + pfMonthly),
  );

  // ================= SALARY COMPONENTS =================
  const salaryComponents = [
    {
      name: "Basic",
      monthly: basicMonthly,
      annual: round0(basicMonthly * 12),
    },
    {
      name: "House Rent Allowance",
      monthly: hraMonthly,
      annual: round0(hraMonthly * 12),
    },
    {
      name: "Dearness Allowance",
      monthly: daMonthly,
      annual: round0(daMonthly * 12),
    },
    {
      name: "Special Allowance",
      monthly: specialMonthly,
      annual: round0(specialMonthly * 12),
    },
    {
      name: "Food Allowance",
      monthly: foodMonthly,
      annual: round0(foodMonthly * 12),
    },
    {
      name: "Provident Fund (PF)",
      monthly: pfMonthly,
      annual: round0(pfMonthly * 12),
    },
  ];

  // ================= TOTAL =================
  const totalMonthly = round0(
    basicMonthly +
    hraMonthly +
    daMonthly +
    specialMonthly +
    foodMonthly +
    pfMonthly,
  );

  const totalAnnual = round0(totalMonthly * 12);

  // ================= LPA =================
  const lpa =
    annualCTC % 100000 === 0
      ? (annualCTC / 100000).toString()
      : (annualCTC / 100000).toFixed(1);

  /* ================= TABLE STYLES ================= */

  const TABLE_STYLE = {
    border: "1px solid #333",
    borderCollapse: "collapse",
    width: "100%",
    color: "#fff",
  };

  const HEADER_ROW = {
    backgroundColor: "#f28c28",
  };

  const CELL_BASE = {
    border: "1px solid #333",
    fontSize: "9.75pt",
    pb: "4.2mm",
    verticalAlign: "top",
    lineHeight: 0.8,
  };

  const CELL_HEAD = {
    ...CELL_BASE,
    fontWeight: 600,
    fontSize: "10pt",
  };

  const TOTAL_ROW = {
    backgroundColor: "#f28c28",
  };

  const TOTAL_CELL = {
    ...CELL_HEAD,
  };

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Typography sx={{ textAlign: "right", mb: "6mm" }}>
          {offerDate}
        </Typography>

        <Typography align="center" sx={{ fontWeight: 700, mb: "8mm" }}>
          <Box component="span" sx={{ textDecoration: "underline" }}>
            Offer Letter
          </Box>
        </Typography>
        <Box
          sx={{
            fontFamily: "Calibri, sans-serif",
            fontSize: "11pt",
            lineHeight: 1.5,
            textAlign: "justify",
          }}
        >
          <Typography sx={{ mb: "6mm" }}>Dear {data.employeeName},</Typography>

          <Typography sx={{ mb: "6mm" }}>Welcome to {company.name}</Typography>

          <Typography sx={{ mb: "6mm" }}>
            With reference to your application and subsequent interviews you had
            with us, we are pleased to confirm your offer of employment to join{" "}
            {company.name} We value your abilities and believe that you will
            find our work environment to be challenging as well as fulfilling.
          </Typography>

          <Typography sx={{ mb: "6mm" }}>
            With reference to the interview you had with us, we would like to
            offer you the post of <strong>{position}</strong>.
          </Typography>

          <Typography sx={{ mb: "6mm" }}>
            Your commencement date with us will be on or before{" "}
            <strong>{joiningDate}</strong>.
          </Typography>

          <Typography sx={{ mb: "6mm" }}>
            Your annual salary, allowances, and contributions put together will
            be
            <strong> INR {lpa} LPA.</strong>
          </Typography>

          <Typography sx={{ mb: "12mm" }}>
            The roles and responsibilities and other terms and conditions of
            your employment will be specified in your letter of appointment.
          </Typography>
        </Box>

        <Typography>
          <strong>{company.name}</strong>
        </Typography>

        <Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Box
                component="img"
                src={sign}
                alt="Sign"
                sx={{ width: 120, mt: "26mm" }}
              />
            </Grid>
            <Grid item>
              <Box
                component="img"
                src={company.stamp}
                alt="Stamp"
                sx={{ width: 120, mt: "4mm", ml: "-2mm" }}
              />
            </Grid>
          </Grid>

          <Typography sx={{ mt: "5mm" }}>
            <strong>{company.hrName}</strong>
          </Typography>
          <Typography>
            <strong>HR Manager - HR Services</strong>
          </Typography>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Typography
          align="center"
          sx={{ fontWeight: 700, mb: "8mm", mt: "30px" }}
        >
          Annexure A Salary Structure
        </Typography>

        <TableContainer
          sx={{
            mt: "10mm",
            mb: "8mm",
            fontFamily: "Times New Roman",
          }}
        >
          <Table
            size="small"
            sx={TABLE_STYLE}
          >
            <TableHead>
              <TableRow sx={HEADER_ROW}>
                <TableCell sx={CELL_HEAD}>
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
              {salaryComponents.map((row, i) => (
                <TableRow key={i}>
                  <TableCell sx={CELL_BASE}>
                    {row.name}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={CELL_BASE}
                  >
                    {formatCurrency(row.monthly)}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={CELL_BASE}
                  >
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow sx={TOTAL_ROW}>
                <TableCell sx={TOTAL_CELL}>
                  Total Monthly Gross Salary
                </TableCell>

                <TableCell
                  align="center"
                  sx={TOTAL_CELL}
                >
                  {formatCurrency(totalMonthly)}
                </TableCell>

                <TableCell
                  align="center"
                  sx={TOTAL_CELL}
                >
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Signature Block */}
        <Typography sx={{ mt: "20mm" }}>
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
                  sx={{ width: 120, mt: "26mm" }}
                />
              </Grid>
              <Grid item>
                <Box
                  component="img"
                  src={company.stamp}
                  alt="Signature"
                  sx={{ width: 120, mt: "4mm", ml: "-2mm" }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: "5mm" }}>
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
    </>
  );
};

export default SmartMatrixOffer;
