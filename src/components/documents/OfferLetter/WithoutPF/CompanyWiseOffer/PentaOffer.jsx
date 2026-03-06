import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

/* ===================== UTILITIES ===================== */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const formatCurrency = (value) => {
  if (value == null || value === "") return "";
  return Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/* ===================== SALARY CALCULATION ===================== */

/* ===================== SALARY CALCULATION ===================== */

const calculateSalaryBreakup = (annualCTC) => {
  const round0 = (num) => Math.round(num);

  // 🔥 Your required percentages
  const basicAnnual   = round0(annualCTC * 0.40);
  const hraAnnual     = round0(annualCTC * 0.18);
  const daAnnual      = round0(annualCTC * 0.12);
  const specialAnnual = round0(annualCTC * 0.16);
  const foodAnnual    = round0(annualCTC * 0.06);
  const miscAnnual    = round0(annualCTC * 0.08);

  const salaryBreakup = [
    {
      label: "Basic ",
      perMonth: round0(basicAnnual / 12),
      perYear: basicAnnual,
    },
    {
      label: "House Rent Allowance ",
      perMonth: round0(hraAnnual / 12),
      perYear: hraAnnual,
    },
    {
      label: "Dearness Allowance ",
      perMonth: round0(daAnnual / 12),
      perYear: daAnnual,
    },
    {
      label: "Special Allowance ",
      perMonth: round0(specialAnnual / 12),
      perYear: specialAnnual,
    },
    {
      label: "Food Allowance ",
      perMonth: round0(foodAnnual / 12),
      perYear: foodAnnual,
    },
    {
      label: "Misc. Allowance ",
      perMonth: round0(miscAnnual / 12),
      perYear: miscAnnual,
    },
  ];

  return {
    salaryBreakup,
    monthlyCTC: round0(annualCTC / 12),
    annualCTC,
  };
};
/* ===================== PAGE WRAPPER ===================== */
const Page = ({ company, children }) => (
  <Box
    sx={{
      width: "210mm",
      minHeight: "297mm",
      backgroundColor: "#fff",
      fontFamily: "'Times New Roman', Times, serif",
      color: "#000",
      mx: "auto",
      position: "relative",
      pageBreakAfter: "always",
      overflow: "hidden",
    }}
  >
    {/* WATERMARK */}
    {company?.watermark && (
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: company.brandColors?.watermarkOpacity || 0.05,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <img
          src={company.watermark}
          alt="Watermark"
          style={{ width: "60%" }}
        />
      </Box>
    )}

    <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
  </Box>
);

/* ===================== SIGNATURE + STAMP ===================== */
const SignatureBlock = ({ company, candidateName, showCandidate = true }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        mt: 6,
      }}
    >
      {/* HR SIGNATURE + STAMP */}
      <Box sx={{ position: "relative", }}>
        {company.stamp && (
          <img
            src={company.stamp}
            alt="Stamp"
            style={{
              position: "absolute", display: "flex",
              bottom: 30,
              gap: 10,
              left: 180,
              width: 90,
              opacity: 0.9,
            }}
          />
        )}

        {company.signature && (
          <img
            src={company.signature}
            alt="Signature"
            style={{ height: 40 }}
          />
        )}

        <Typography sx={{ fontSize: 14, fontWeight: "bold", mt: 1 }}>
          {company.hrName}
        </Typography>
        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
          Group Leader - Shared HR Services
        </Typography>
      </Box>

      {/* CANDIDATE SIGN */}
      {showCandidate && (
        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
            Signature: ___________________
          </Typography>
          <Typography sx={{ fontSize: 14 }}>
            Candidate Name: {candidateName}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

/* ===================== MAIN COMPONENT ===================== */
const PentaOffer = ({ company, data }) => {
  if (!company || !data) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>Loading Offer Letter...</Typography>
      </Box>
    );
  }

 const annualCTC = Number(data.salary || 0);
const finalData = calculateSalaryBreakup(annualCTC);
  return (
    <>
      {/* ================= PAGE 1 – OFFER LETTER ================= */}
      <Page company={company}>
        {company.header && (
          <img src={company.header} alt="Header" style={{ width: "100%" }} />
        )}

        <Box sx={{ px: "30mm", pt: "8mm", pb: "35mm" }}>

  {/* ✅ ALIGNED NAME / ADDRESS / SUBJECT */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "95px 10px auto",
      
      fontSize: 14,
      mb: 4,
    }}
  >
    <Typography fontWeight="bold">Name</Typography>
    <Typography fontWeight="bold">:</Typography>
    <Typography>{data.mrms} {data.candidateName}</Typography>

    <Typography fontWeight="bold">Address</Typography>
    <Typography fontWeight="bold">:</Typography>
    <Typography>{data.address}</Typography>

    <Typography fontWeight="bold">Subject</Typography>
    <Typography fontWeight="bold">:</Typography>
    <Typography>
      Letter of intent for the position of{" "}
      <strong>{data.position}</strong>.
    </Typography>
  </Box>

  {/* REST OF CONTENT UNCHANGED */}
  <Typography sx={{ fontSize: 14, mb: 1 }}>
    Dear {data.candidateName?.split(" ")[0]},
  </Typography>

  <Typography sx={{ fontSize: 14, lineHeight: 1.9, mb: 1 }}>
    <strong>Congratulations!</strong>
    <br />
    Welcome to Team <strong>PENTA</strong>!
  </Typography>

          <Typography sx={{ fontSize: 14, lineHeight: 1.9, mb: 2 }}>
            We are pleased to offer you a position of{" "}
            <strong>{data.position}</strong> at{" "}
            <strong>{company.name}</strong>.where you will be an integral part of highly technical engineering
            workforce that works on latest, innovative and cutting edge technologies.
            Your total Gross salary will be{" "}
            <strong>Rs. {formatCurrency(annualCTC)}</strong> per year.
          </Typography>


          <Typography sx={{ fontSize: 14, lineHeight: 1.9 }}>
            Today, the corporate landscape is dynamic and the world ahead is full of possibilities! None of which
            would be possible without the strong value system and culture that PENTA SOFTWARE CONSULTANCY
            SERVICES PVT. LTD. basks in.
            - Congenial while being Professional,<br />
            - Respectful while Encouraging Discussions,<br />
            - Rock-solid but Fast-Growing,<br />
            - Traditional yet possessing a Global Mind set,<br />
            - Business like but contributing to Social and Environmental causes.<br />


          </Typography> <br />
          <Typography sx={{ fontSize: 14, lineHeight: 1.9 }}>
            You would be working in collaboration with the incredible team across the world. We believe you will
            benefit from the exposure of Global platform which will give you access to career mobility, innovative
            technology, personal development, and freedom to explore new ideas.

          </Typography>

          <Typography sx={{ fontSize: 14, lineHeight: 1.9 }}>
            Your start date will be{" "}
            <strong>{formatDate(data.joiningDate)}</strong> and your base office
            will be in <strong>{data.location}</strong>, India. At PENTA
            we Understand the value of diverse skill sets and experience that each person brings to our teams
            creating an environment growth,

          </Typography>

          <Typography sx={{ fontSize: 14, mt: 4 }}>Yours Sincerely,</Typography>

          <Typography sx={{ fontSize: 14, mt: 1 }}>
            For <strong>{company.name}</strong>
          </Typography>

          <SignatureBlock
            company={company}
            candidateName={data.candidateName}
          />
        </Box>

        {company.footer && (
          <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
            <img src={company.footer} alt="Footer" style={{ width: "100%" }} />
          </Box>
        )}
      </Page>

      {/* ================= PAGE 2 – ANNEXURE A ================= */}
      <Page company={company}>
        {company.header && (
          <img src={company.header} alt="Header" style={{ width: "100%" }} />
        )}

        <Box sx={{ px: "30mm", pt: "25mm", pb: "35mm" }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              textDecoration: "underline",
              mb: 2,
            }}
          >
            Annexure A – Salary Structure
          </Typography>

          <Table
            sx={{
              border: "1px solid #000",
              "& .MuiTableCell-root": {
                border: "1px solid #000",
                fontSize: 13,
                padding: "6px 8px",
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#3598b4" }}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Salary Components
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                  Per Month (Rs.)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                  Per Annum (Rs.)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {finalData.salaryBreakup.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.label}</TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    {formatCurrency(row.perMonth)}
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    {formatCurrency(row.perYear)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Total Monthly Gross Salary
                </TableCell>
                <TableCell sx={{ textAlign: "right", fontWeight: "bold" }}>
                  {formatCurrency(finalData.monthlyCTC)}
                </TableCell>
                <TableCell sx={{ textAlign: "right", fontWeight: "bold" }}>
                  {formatCurrency(finalData.annualCTC)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <SignatureBlock
            company={company}
            candidateName={data.candidateName}
            showCandidate={true}
          />

        </Box>

        {company.footer && (
          <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
            <img src={company.footer} alt="Footer" style={{ width: "100%" }} />
          </Box>
        )}
      </Page>
    </>
  );
};

export default PentaOffer;
