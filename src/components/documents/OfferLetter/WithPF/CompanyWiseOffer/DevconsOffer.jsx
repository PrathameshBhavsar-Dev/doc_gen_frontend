import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { formatCurrency } from "../../../../../utils/salaryCalculations";
import A4Page from "../../../../layout/A4Page";

const DevconsOffer = ({ company, data }) => {
  if (!company || !data) return null;

  const round0 = (num) => Math.round(num);

  // ================= ANNUAL CTC INPUT =================
  const annualCTC = round0(Number(data.joiningCTC || data.salary || 0));

  // ================= MONTHLY CTC =================
  // ================= MONTHLY CTC =================
  const monthlyCTC = round0(annualCTC / 12);

  // ================= STATIC PF =================
  // ================= STATIC PF =================
  const pfMonthly = 3750;

  // ================= FIXED PERCENTAGES =================
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);


  // ================= ADJUSTED BASIC =================
  const basicMonthly = round0(
    monthlyCTC -
    (hraMonthly + daMonthly + specialMonthly + foodMonthly + pfMonthly)
  );

  // ================= ANNUAL =================
  const basicAnnual = round0(basicMonthly * 12);
  const hraAnnual = round0(hraMonthly * 12);
  const daAnnual = round0(daMonthly * 12);
  const specialAnnual = round0(specialMonthly * 12);
  const foodAnnual = round0(foodMonthly * 12);
  const pfAnnual = round0(pfMonthly * 12);

  // ================= SALARY TABLE =================
  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["House Rent Allowance", hraMonthly, hraAnnual],
    ["Dearness Allowance", daMonthly, daAnnual],
    ["Special Allowance", specialMonthly, specialAnnual],
    ["Food Allowance", foodMonthly, foodAnnual],
    ["Provident Fund (PF)", pfMonthly, pfAnnual],
  ];

  // ================= TOTAL =================
  const totalMonthly = round0(
    basicMonthly +
    hraMonthly +
    daMonthly +
    specialMonthly +
    foodMonthly +
    pfMonthly
  );

  const totalAnnual = round0(totalMonthly * 12);
  const position = data.joiningDesignation ?? data.position ?? "";
  const issueDate = data?.offer_letter?.issueDate ?? data?.issueDate;

  const firstName = data.employeeName?.trim().split(" ")[0];

  return (
    <>
      {/* ================================================================= */}
      {/* ================= PAGE 1 – OFFER LETTER ================= */}
      {/* ================================================================= */}

      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
      // watermarkSrc={company.watermark}
      >

        <Box
        >

          {/* CONTENT */}
          <Box
          >
            {/* DATE – RIGHT ALIGNED */}
            {/* <Typography sx={{ textAlign: "right", mb: 0 }}>
      {new Date(data.issueDate || new Date()).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })}
    </Typography> */}

            {/* NAME */}
            <Typography sx={{ mb: 2, }}>
              <b>Name</b> : {data.mrms} {data.employeeName}
            </Typography>

            {/* SUBJECT */}
            <Typography sx={{ mb: 4 }}>
              <b>Subject</b> : Letter of intent for the position of {position}
            </Typography>


            <Typography sx={{ mb: 3 }}>
              Dear {firstName},
            </Typography>

            <Typography sx={{ mb: 2, textAlign: "justify" }}>
              <b style={{ textTransform: "uppercase" }}>{company.name}</b> is delighted to offer you the full-time position of{" "}
              <b>{position}</b> with an anticipated start date of{" "}
              <b> {new Date(data.joiningDate).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}</b>.
            </Typography>

            <Typography sx={{ mb: 2, textAlign: "justify" }}>
              As the <b>{position}</b>, you will be responsible for responsibilities
              and expectations.
            </Typography>

            <Typography sx={{ mb: 2, textAlign: "justify" }}>
              You will report directly to <b>{data.reportingManager}</b> (Manager) at Pune.
              Working hours are from {data.workHours} hrs. a day, 5 days of week.
            </Typography>

            <Typography sx={{ mb: 1, textAlign: "justify" }}>
              The starting salary for this position is{" "}
              <b>{formatCurrency(data.joiningCTC)}</b> per annum. Payment is on monthly basis
              by direct deposit.
            </Typography>

            <Typography sx={{ mb: 2 }}>
              <b style={{ textTransform: "uppercase" }}>{company.name}</b> offers a comprehensive benefits program.
            </Typography>

            <Typography sx={{ mb: 2, textAlign: "justify" }}>
              Your employment with company will be on an at-will basis, which means you and the company are free to terminate employment at any time,
              with or without cause or advance notice. This letter is not a contract indicating employment terms or duration.
            </Typography>

            <Typography sx={{ mb: 3 }}>
              Please confirm your acceptance of this offer by signing and returning this
              letter.
            </Typography>

            {/* CLOSING */}
            <Typography sx={{ mb: 1 }}>Yours Sincerely,</Typography>
            <Typography sx={{ mb: 1 }}>
              For<b style={{ textTransform: "uppercase" }}> {company.name}</b>
            </Typography>

            {/* SIGNATURE */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 4, mt: 3 }}>
              {company?.signature && (
                <img src={company.signature} alt="Signature" style={{ height: 60 }} />
              )}
              {company?.stamp && (
                <img src={company.stamp} alt="Stamp" style={{ height: 90 }} />
              )}
            </Box>

            <Typography sx={{ fontWeight: 600 }}>{company.hrName}</Typography>
            <Typography>HR Manager</Typography>
          </Box>


        </Box>

      </A4Page>



      {/* ================================================================= */}
      {/* ================= PAGE 2 – ANNEXURE A ================= */}
      {/* ================================================================= */}

      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box>
          <Typography
            align="center"
            fontWeight={600}
            mb={7}
            sx={{ textDecoration: "underline", fontSize: "15px" }}
          >
            Annexure A Salary Structure
          </Typography>

          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0 }}>
            <Table
              sx={{
                width: "100%",
                border: "1px solid #000",
                borderCollapse: "collapse",
                "& th, & td": {
                  border: "1px solid #000",
                  padding: "0px 12px 12px 12px",
                  fontSize: "15px",
                },
              }}
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: "#ffc000" }}>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Salary Components
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    Per month (Rs.)
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    Per Annum (Rs.)
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {salaryRows.map(([name, monthly, annual], i) => (
                  <TableRow key={i}>
                    <TableCell>{name}</TableCell>
                    <TableCell align="right">
                      {formatCurrency(monthly)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(annual)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ backgroundColor: "#ffc000" }}>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Total Monthly Gross Salary
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    {formatCurrency(totalMonthly)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    {formatCurrency(totalAnnual)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", alignItems: "center", gap: 4, mt: 3 }}>
            {company?.signature && (
              <img src={company.signature} alt="Signature" style={{ height: 60 }} />
            )}
            {company?.stamp && (
              <img src={company.stamp} alt="Stamp" style={{ height: 90 }} />
            )}
          </Box>

          <Typography sx={{ fontWeight: 600 }}>{company.hrName}</Typography>
          <Typography>HR Manager</Typography>
          
        </Box>
      </A4Page>
    </>
  );
};

export default DevconsOffer;
