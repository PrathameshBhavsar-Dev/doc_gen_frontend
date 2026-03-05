// NeweageOfferWithPF.jsx

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
import { formatCurrency } from "../../../../../utils/salaryCalculations";

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
  fontFamily: "Times New Roman, serif",
  fontSize: "14px",
  lineHeight: 1.8,
};

const NeweageOffer = ({ company, data }) => {
  if (!company || !data) return null;

  /* ======================================================
     ✅ SMARTMATRIX PF LOGIC (INPUT IS MONTHLY)
  ====================================================== */

  const round0 = (num) => Math.round(Number(num) || 0);

  const monthlyCTC = round0(data.salary || 0);
  const annualCTC = round0(monthlyCTC * 12);

  const basicMonthly = round0(monthlyCTC * 0.48);
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);

  const used = basicMonthly + hraMonthly + daMonthly + specialMonthly;

  const foodMonthly = round0(monthlyCTC - used);

  const pfMonthly = 3750; // DISPLAY ONLY

  const salaryComponents = [
    { name: "Basic", monthly: basicMonthly, annual: basicMonthly * 12 },
    {
      name: "House Rent Allowance",
      monthly: hraMonthly,
      annual: hraMonthly * 12,
    },
    { name: "Dearness Allowance", monthly: daMonthly, annual: daMonthly * 12 },
    {
      name: "Special Allowance",
      monthly: specialMonthly,
      annual: specialMonthly * 12,
    },
    { name: "Food Allowance", monthly: foodMonthly, annual: foodMonthly * 12 },
    {
      name: "Provident Fund (Employer Contribution)",
      monthly: pfMonthly,
      annual: pfMonthly * 12,
    },
  ];

  const totalMonthly = monthlyCTC; // PF NOT included
  const totalAnnual = annualCTC;

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
          successful completion of your background check and aim to get you
          settled into your new role by <b>{formatDate(joiningDate)}</b>.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          <b>{COMPANY_NAME}</b> will start you out at{" "}
          <b>{annualCTC.toLocaleString()}</b> per year.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          You can expect to receive payment monthly.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Please keep in mind, this employment offer is in no way a legally
          binding contract. As an at-will employee, both you and{" "}
          <b>{COMPANY_NAME}</b> are able to terminate employment for any reason
          at any time.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          <b>{COMPANY_NAME}</b> looks forward to bringing you on board!
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>Yours Sincerely,</Typography>

        <Typography sx={TEXT}>
          For <b>{COMPANY_NAME}</b>
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography>{company.hrName}</Typography>
          <Typography>HR Relations Lead</Typography>
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
              border: "1px solid #333",
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "rgba(3, 171, 197, 0.95)" }}>
                <TableCell
                  sx={{
                    border: "1px solid #333",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  Salary Components
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    border: "1px solid #333",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  Per month (Rs.)
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    border: "1px solid #333",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  Per Annum (Rs.)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryComponents.map((row, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ border: "1px solid #333" }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #333" }}>
                    {formatCurrency(row.monthly)}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #333" }}>
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow sx={{ backgroundColor: "rgba(3, 171, 197, 0.95)" }}>
                <TableCell sx={{ border: "1px solid #333", fontWeight: 600 }}>
                  Total Monthly Gross Salary
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ border: "1px solid #333", fontWeight: 600 }}
                >
                  {formatCurrency(totalMonthly)}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ border: "1px solid #333", fontWeight: 600 }}
                >
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </A4Layout>
    </>
  );
};

export default NeweageOffer;
