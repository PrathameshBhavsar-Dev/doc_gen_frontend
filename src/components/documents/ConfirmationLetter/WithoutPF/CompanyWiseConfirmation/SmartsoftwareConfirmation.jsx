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
  formatCurrency,
  numberToWords,
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

/* ================= COMMON STYLE ================= */
const TEXT = {
  fontFamily: "Times New Roman, serif",
  fontSize: "14px",
  lineHeight: 1.8,
};

const SmartsoftwareConfirmation = ({ company, data }) => {
  if (!company || !data) return null;

  /* ================= SAFE DATA ================= */
  const {
    mrms = "",
    candidateName = "",
    employeeName = "",
    address = "",
    position = "",
    effectiveDate = "",
    issueDate = "",
    totalSalary = 0,
  } = data;

  const NAME = candidateName || employeeName;
  const COMPANY_NAME = company.name?.toUpperCase() || "";

  /* ================= UPDATED SALARY LOGIC ================= */
  const totalAnnual = parseFloat(totalSalary || 0);

  const salaryPercentages = [
    { name: "Basic Salary", percent: 40 },
    { name: "House Rent Allowance (HRA)", percent: 18 },
    { name: "Conveyance Allowance", percent: 12 },
    { name: "Special Allowance", percent: 16 },
    { name: "Food Allowance", percent: 6 },
    { name: "Misc. Allowance", percent: 8 },
  ];

  const salaryComponents = salaryPercentages.map((item) => {
    const annual = Math.round((totalAnnual * item.percent) / 100);
    return {
      name: item.name,
      annual,
      monthly: Math.round(annual / 12),
    };
  });

  const totalMonthly = salaryComponents.reduce(
    (sum, item) => sum + item.monthly,
    0
  );

  const finalAnnual = salaryComponents.reduce(
    (sum, item) => sum + item.annual,
    0
  );

  return (
    <>
      {/* ================= PAGE 1 ================= */}
       <A4Layout
        headerSrc={company.headerImage}
        footerSrc={company.footerImage}
      >
        <Typography sx={{ ...TEXT, mb: 2 }}>
          {formatDate(issueDate)}
        </Typography>

        <Typography sx={TEXT}>
          <b>Name</b> : {mrms} {NAME}
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          <b>Address</b> : {address}
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Dear {NAME},
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          We are pleased to confirm your continued services at the position of{" "}
          <b>{position}</b> with{" "}
          <b>{COMPANY_NAME}</b> with effective date{" "}
          <b>{formatDate(effectiveDate)}</b> considering your performance and
          support towards the organization.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          If there is any change in the date of joining, changes can be taken
          under consideration. Your total Gross salary will be Rs.{" "}
          <b>{formatCurrency(totalAnnual)}</b> (
          <b>{numberToWords(totalAnnual)}</b>) per year.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Subject to various deductions as per company and government policy.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          The roles and responsibilities and other terms and conditions of your
          employment will be specified in your letter of appointment.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          We welcome you to <b>{COMPANY_NAME}</b> family and hope it would be the
          beginning of a long and mutually beneficial association.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Kindly acknowledge the duplicate copy of this letter as an acceptance
          of this offer.
        </Typography>


        <Typography sx={{ ...TEXT, mt: 4 }}>
          Yours Sincerely,
        </Typography>

        <Typography sx={TEXT}>
          For <b>{COMPANY_NAME}</b>
        </Typography>

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
            <Typography>Candidate Name : {employeeName}</Typography>
          </Box>
        </Box>
      </A4Layout>

      {/* ================= PAGE 2 ================= */}
      <A4Layout
        headerSrc={company.headerImage}
        footerSrc={company.footerImage}
      >
        <Typography align="center" sx={{ ...TEXT, mb: 3 }}>
          <b>Annexure – Salary Structure</b>
        </Typography>

        <TableContainer>
          <Table
            size="small"
            sx={{
              border: "1px solid #333",
              borderCollapse: "collapse",
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "rgba(3,171,197,0.95)" }}>
                <TableCell sx={{ border: "1px solid #333", color: "white" }}>
                  <b>Salary Component</b>
                </TableCell>
                <TableCell align="center" sx={{ border: "1px solid #333", color: "white" }}>
                  <b>Per Month (Rs.)</b>
                </TableCell>
                <TableCell align="center" sx={{ border: "1px solid #333", color: "white" }}>
                  <b>Per Annum (Rs.)</b>
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

              <TableRow sx={{ backgroundColor: "rgba(3,171,197,0.95)" }}>
                <TableCell sx={{ border: "1px solid #333", color: "white" }}>
                  <b>Total Gross Salary</b>
                </TableCell>
                <TableCell align="center" sx={{ border: "1px solid #333", color: "white" }}>
                  <b>{formatCurrency(totalMonthly)}</b>
                </TableCell>
                <TableCell align="center" sx={{ border: "1px solid #333", color: "white" }}>
                  <b>{formatCurrency(finalAnnual)}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

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
            <Typography>Candidate Name : {employeeName}</Typography>
          </Box>
        </Box>


      
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
                  <Typography>Candidate Name : {employeeName}</Typography>
                </Box>
              </Box>
      </A4Layout>
    </>
  );
};

export default SmartsoftwareConfirmation;