import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import sign from "../../../../../assets/images/smartmatrix/Smartmatrix_sign.png";
import { TableContainer, Paper } from "@mui/material";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

/* ================= ROUND ================= */
const round2 = (v) => Math.round((Number(v) || 0) * 100) / 100;

const SmartMatrixPaidInternshipLetter = ({ company, data }) => {
  /* ================= CORRECT LOGIC (INPUT IS MONTHLY) ================= */

  const monthlyGross = round2(data?.stipend || 0);
  const annualCTC = round2(monthlyGross * 12);

  /* Percentage Structure (Same as SmartMatrix Increment) */
  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
    misc: 0.08,
  };

  /* Monthly Calculation */
  const basic = round2(monthlyGross * PERCENT.basic);
  const hra = round2(monthlyGross * PERCENT.hra);
  const da = round2(monthlyGross * PERCENT.da);
  const special = round2(monthlyGross * PERCENT.special);
  const food = round2(monthlyGross * PERCENT.food);

  /* Adjustment to avoid rounding mismatch */
  const misc = round2(monthlyGross - (basic + hra + da + special + food));

  /* Annual helper */
  const yearly = (val) => round2(val * 12);

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Layout headerSrc={company.header} footerSrc={company.footer}>
        {/* DATE */}
        <Box
          sx={{
            textAlign: "right",
            mt: "20mm",
            mb: "10mm",
            fontFamily: "Bahnschrift",
          }}
        >
          {formatDate(data.issueDate)}
        </Box>

        {/* NAME + SUBJECT */}
        <Typography sx={{ fontFamily: "Bahnschrift", mb: 1 }}>
          <strong>Name :</strong> {data.mrms} {data.employeeName}
        </Typography>

        <Typography sx={{ fontFamily: "Bahnschrift", mb: 3 }}>
          <strong>Subject :</strong> Letter of intent for the Internship of
          position as <strong>{data.designation}</strong>.
        </Typography>

        <Typography sx={{ fontFamily: "Bahnschrift", mb: 2 }}>
          Dear<strong> {data.employeeName}</strong>,
        </Typography>

        {/* BODY */}
        <Typography paragraph sx={{ fontFamily: "Bahnschrift" }}>
          We are pleased to offer you the Internship of position as{" "}
          <strong>{data.designation}</strong> with {company.name}, with
          effective date <strong>{formatDate(data.startDate)}</strong>{" "}
          considering your performance and support towards the organization.
        </Typography>

        <Typography paragraph sx={{ fontFamily: "Bahnschrift" }}>
          Your annual stipend, allowances, and contributions put together will
          be <strong>INR {annualCTC.toLocaleString("en-IN")} per annum.</strong>
        </Typography>

        <Typography paragraph sx={{ fontFamily: "Bahnschrift" }}>
          If there is any change in the date of joining, changes can be taken
          under consideration.
        </Typography>

        <Typography paragraph sx={{ fontFamily: "Bahnschrift" }}>
          Kindly acknowledge the duplicate copy of this letter as an acceptance
          of this offer.
        </Typography>

        {/* SIGNATURE */}
        <Box sx={{ mt: 6 }}>
          <Typography sx={{ fontFamily: "Bahnschrift" }}>
            Yours Sincerely,
          </Typography>
          <Typography sx={{ fontWeight: "bold", mt: 3 }}>
            {company.name}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <img
              src={sign}
              alt="Sign"
              style={{ height: "50px", marginTop: "60px" }}
            />
            <img
              src={company.stamp}
              alt="Stamp"
              style={{ width: "110px", marginRight: "330px" }}
            />
          </Box>

          <Typography sx={{ mt: 3, fontWeight: "bold" }}>
            {company.hrName}
          </Typography>
          <Typography>HR Manager - HR Services</Typography>
        </Box>
      </A4Layout>

      {/* ================= PAGE 2 - ANNEXURE ================= */}
      <A4Layout headerSrc={company.header} footerSrc={company.footer}>
        <Box sx={{ mt: "25mm" }}>
          <Typography
            align="center"
            sx={{ fontWeight: "bold", fontSize: "16px", mb: 4 }}
          >
            Annexure A Salary Structure
          </Typography>

          <TableContainer
            component={Paper}
            sx={{
              border: "1.5px solid black",
              borderRadius: 0,
              boxShadow: "none",
              mt: 3,
            }}
          >
            <Table
              size="small"
              sx={{
                width: "100%",
                borderCollapse: "collapse",
                "& .MuiTableCell-root": {
                  border: "1px solid black",
                  fontSize: "11pt",
                  fontFamily: "Bahnschrift",
                  padding: "6px 8px",
                  color: "#000",
                },
              }}
            >
              <colgroup>
                <col style={{ width: "50%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>

              <TableBody>
                {/* HEADER ROW */}
                <TableRow sx={{ backgroundColor: "#f7941d" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Salary Components
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Per month (Rs.)
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Per Annum (Rs.)
                  </TableCell>
                </TableRow>

                {[
                  ["Basic", basic],
                  ["House Rent Allowance", hra],
                  ["Dearness Allowance", da],
                  ["Special Allowance", special],
                  ["Facility Allowance", misc],
                  ["Food Allowance", food],
                ].map(([label, value]) => (
                  <TableRow key={label}>
                    <TableCell>{label}</TableCell>
                    <TableCell align="center">
                      {Number(value).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell align="center">
                      {Number(value * 12).toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}

                {/* TOTAL ROW */}
                <TableRow sx={{ backgroundColor: "#f7941d" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Total Monthly Gross Salary
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {monthlyGross.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {annualCTC.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* SIGNATURE */}
        <Box sx={{ mt: 8 }}>
          <Typography sx={{ fontWeight: "bold" }}>{company.name}</Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <img
              src={sign}
              alt="Sign"
              style={{ height: "50px", marginTop: "60px" }}
            />
            <img
              src={company.stamp}
              alt="Stamp"
              style={{ width: "110px", marginRight: "330px" }}
            />
          </Box>

          <Typography sx={{ mt: 3, fontWeight: "bold" }}>
            {company.hrName}
          </Typography>
          <Typography>HR Manager - HR Services</Typography>
        </Box>
      </A4Layout>
    </>
  );
};

export default SmartMatrixPaidInternshipLetter;
