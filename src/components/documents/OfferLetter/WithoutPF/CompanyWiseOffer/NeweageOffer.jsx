import React from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import {
  generateOfferLetterComponents,
  formatCurrency,
} from "../../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : "";

/* ================= STYLES ================= */
const TEXT = {
  fontFamily: '"Times New Roman", Times, serif',
  fontSize: "12pt", // Real document size
  lineHeight: 1.6, // Professional spacing
  textAlign: "justify", // IMPORTANT (matches letter style)
  letterSpacing: "0.2px",
  color: "#000",
};

/* 🔽 Smaller table cells */
const CELL = {
  border: "1px solid #000",
  padding: "4px",
  fontSize: "12.5px",
};

/* ================= FIXED SALARY DATA ================= */
const SALARY_COMPONENTS = [
  { name: "Basic", monthly: 4000, annual: 48000 },
  { name: "House Rent Allowance", monthly: 1800, annual: 21600 },
  { name: "Dearness Allowance", monthly: 1200, annual: 14400 },
  { name: "Special Allowance", monthly: 1600, annual: 19200 },
  { name: "Food Allowance", monthly: 600, annual: 7200 },
  { name: "Misc. Allowance", monthly: 800, annual: 9600 },
];

const NeweageOffer = ({ company, data }) => {
  /* ======================================================
   ✅ SMARTMATRIX LOGIC (INPUT IS MONTHLY) – NO PF
====================================================== */

  const round2 = (num) => Math.round((Number(num) || 0) * 100) / 100;

  /* 🔥 INPUT IS MONTHLY */
  const monthlyGross = round2(data.salary || 0);

  /* Annual Derived */
  const annualCTC = round2(monthlyGross * 12);

  /* Same Percentage Structure as SmartMatrix */
  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
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
      name: "Food Allowance",
      monthly: foodMonthly,
      annual: round2(foodMonthly * 12),
    },
    {
      name: "Misc. Allowance",
      monthly: miscMonthly,
      annual: round2(miscMonthly * 12),
    },
  ];

  /* Totals */
  const totalMonthly = monthlyGross;
  const totalAnnual = annualCTC;

  if (!company || !data) return null;

  const {
    mrms = "",
    candidateName = "",
    address = "",
    position = "",
    joiningDate = "",
    salary = 0,
    issueDate = "",
  } = data;

  const COMPANY_NAME = company.name.toUpperCase();

  // const totalMonthly = SALARY_COMPONENTS.reduce(
  //   (sum, item) => sum + item.monthly,
  //   0
  // );

  // const totalAnnual = SALARY_COMPONENTS.reduce(
  //   (sum, item) => sum + item.annual,
  //   0
  // );

  return (
    <>
      {/* ================= PAGE 1 : OFFER LETTER ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Typography sx={{ ...TEXT, mb: 2 }}>{formatDate(issueDate)}</Typography>

        <Typography sx={TEXT}>
          <b>Name</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {mrms}{" "}
          {candidateName}
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          <b>Address</b> &nbsp;&nbsp;&nbsp;: {address}
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>Dear {candidateName},</Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Congratulations! <b>{COMPANY_NAME}</b> is excited to call you our new{" "}
          {position}.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          We’ll focus on wrapping up a few more formalities, including the
          successful completion of your [background check, drug screening,
          reference check, etc.], and aim to get you settled into your new role
          by <b>{formatDate(joiningDate)}</b>.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Keep reading to learn more about this opportunity and—hopefully—
          answer any lingering questions you may have.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          <b>{COMPANY_NAME}</b> will start you out at{" "}
          <b>{salary.toLocaleString()}</b> per year. You can expect to receive
          payment monthly.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          You’ll also have access to some awesome perks.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Please keep in mind, this employment offer is in no way a legally
          binding contract. As an at-will employee, both you and{" "}
          <b>{COMPANY_NAME}</b> are able to terminate employment for any reason
          at any time.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          <b>{COMPANY_NAME}</b> looks forward to bringing you on board!If you
          have any questions,please feel free to reach out at any time and we'll
          be more happy to help you.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>Yours Sincerely,</Typography>
        <Typography sx={TEXT}>
          For <b>{COMPANY_NAME}</b>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mt: 2,
            marginRight: "-20px",
          }}
        >
          <Box>
            <img
              src={company.signature}
              alt="Signature"
              style={{ height: "50px" }}
            />
            <img src={company.stamp} alt="Stamp" style={{ height: "100px" }} />
            <Typography>{company.hrName}</Typography>
            <Typography>HR Relations Lead</Typography>
          </Box>

          <Box sx={{ width: "55%" }}>
            <Typography>Signature : ___________________</Typography>
            <Typography>Candidate Name:{candidateName}</Typography>
          </Box>
        </Box>
      </A4Layout>

      {/* ================= PAGE 2 : SALARY ANNEXURE ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Typography align="center" sx={{ ...TEXT, mb: 3 }}>
          <b>Annexure A Salary Structure</b>
        </Typography>
        <TableContainer sx={{ mb: "4mm" }}>
          <Table
            size="small"
            sx={{
              border: "1px solid #333", // 🔽 thinner outer border
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "rgba(3, 171, 197, 0.95)" }}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt", // 🔽 smaller font
                    color: "white",
                    py: "0.4mm", // 🔽 compact header height
                  }}
                >
                  Salary Components
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    color: "white",
                    py: "0.4mm",
                  }}
                >
                  Per month (Rs.)
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    color: "white",
                    py: "0.4mm",
                  }}
                >
                  Per Annum (Rs.)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* 🔽 Removed tall blank row – keeps table compact */}

              {salaryComponents.map((row, i) => (
                <TableRow key={i}>
                  <TableCell
                    sx={{
                      border: "1px solid #333",
                      fontSize: "9.75pt", // 🔽 smaller body text
                      py: "0.35mm", // 🔽 tight rows
                    }}
                  >
                    {row.name}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #333",
                      fontSize: "9.75pt",
                      py: "0.35mm",
                    }}
                  >
                    {formatCurrency(row.monthly)}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #333",
                      fontSize: "9.75pt",
                      py: "0.35mm",
                    }}
                  >
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              {/* Totals Row */}
              <TableRow sx={{ backgroundColor: "rgba(3, 171, 197, 0.95)" }}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    py: "0.4mm",
                  }}
                >
                  Total Monthly Gross Salary
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    py: "0.4mm",
                  }}
                >
                  {formatCurrency(totalMonthly)}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    py: "0.4mm",
                  }}
                >
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mt: 2,
            marginRight: "-20px",
          }}
        >
          <Box>
            <img
              src={company.signature}
              alt="Signature"
              style={{ height: "50px" }}
            />
            <img src={company.stamp} alt="Stamp" style={{ height: "100px" }} />
            <Typography>{company.hrName}</Typography>
            <Typography>HR Relations Lead</Typography>
          </Box>

          <Box sx={{ width: "55%" }}>
            <Typography>Signature : ___________________</Typography>
            <Typography>Candidate Name :{candidateName}</Typography>
          </Box>
        </Box>
      </A4Layout>
    </>
  );
};

export default NeweageOffer;
