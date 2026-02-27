import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

/* ✅ USE PROJECT SALARY UTILS */
import {
  generateSalaryComponents,
  calculateSalaryBreakdown,
  formatCurrency,
  numberToWords,
} from "../../../../../utils/salaryCalculations"

/* ================= A4 PAGE ================= */
const A4Page = ({ children, headerSrc,  }) => (
  <Box
    sx={{
      width: "210mm",
      minHeight: "297mm",
      backgroundColor: "#fff",
      fontFamily: `"Times New Roman", Times, serif`,
      position: "relative",
      mx: "auto",
      pageBreakAfter: "always",
    }}
  >
    {headerSrc && (
      <img src={headerSrc} alt="Header" style={{ width: "100%" }} />
    )}
    {children}
   
  </Box>
);

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : "";

/* =====================================================
   MAIN COMPONENT
===================================================== */
const QuickPaidInternshipLetter = ({ company, data }) => {
  if (!company || !data) return null;

  const firstName = data.candidateName?.split(" ")[0] || "";

  /* ✅ SALARY FROM CENTRAL LOGIC */
  const salaryComponents = generateSalaryComponents(data.stipend);
  const breakdown = calculateSalaryBreakdown(data.stipend);

  return (
    <>
      {/* ================= PAGE 1 – INTERNSHIP LETTER ================= */}
      <A4Page headerSrc={company.header} >
        <Box sx={{ px: "20mm", pt: "-2", fontSize: "14px", lineHeight: 1.7 }}>
          {/* DATE */}
          <Typography align="right" sx={{ mt:2 }}>
            {formatDate(data.issueDate)}
          </Typography>

          {/* NAME + ADDRESS */}
          <Typography sx={{ mb: 0.5 }}>
            <strong>Name :</strong> {data.mrms} {data.employeeName}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Address :</strong> {data.address}
          </Typography>

          {/* SUBJECT */}
          <Typography sx={{ mb: 1 }}>
            <strong>Subject :</strong> Letter of intent for the Internship
            position of <strong>{data.designation}</strong>
          </Typography>

          {/* BODY */}
          <Typography sx={{ mb: 2 }}>
            Dear {data.employeeName},
          </Typography>

          <Typography sx={{ mb: 2, textAlign: "justify" }}>
            We are pleased to offer you the Internship position of {" "}
           <strong>{data.designation}</strong>. As discussed, you are requested to
            join on <strong>{formatDate(data.startDate)}</strong>. If there is
            any change in the date of joining, the same can be taken under
            consideration.
          </Typography>

          <Typography sx={{ mb: 2, textAlign: "justify" }}>
            Your total Gross salary will be Rs.{" "}
            <strong>{formatCurrency(breakdown.annual.ctc)}</strong>{" "}
            (<strong>{numberToWords(breakdown.annual.ctc)}</strong>) per year. 
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Subject to various deductions as per companies and government policy.
          </Typography>

          {/* <Typography sx={{ mb: 2, textAlign: "justify" }}>
            The roles and responsibilities and other terms and conditions of your
            employment will be specified in your letter of appointment.
          </Typography> */}

          <Typography sx={{ mb: 3, textAlign: "justify" }}>
            We welcome you to <strong>{company.name}</strong> family and hope it
            would be the beginning of a long and mutually beneficial association.
          </Typography>

          <Typography sx={{ mb: 4 }}>
            Kindly acknowledge the duplicate copy of this letter as an acceptance
            of this offer.
          </Typography>

          {/* SIGN OFF */}
          <Typography>Yours Sincerely,</Typography>

          <Typography sx={{ fontWeight: 700, mb: 3 }}>
            For {company.name}
          </Typography>

          {/* SIGNATURE SECTION */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            {/* HR SIDE */}
            <Box>
              <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                {company.signature && (
                  <img src={company.signature} alt="HR Sign" height={55} />
                )}
                {company.stamp && (
                  <img src={company.stamp} alt="Stamp" height={90} />
                )}
              </Box>
              <Typography sx={{ fontWeight: 600 }}>
                {company.hrName}
              </Typography>
              <Typography>HR Department Pune</Typography>
            </Box>

            {/* CANDIDATE SIDE */}
            <Box sx={{ minWidth: 260 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography sx={{ mr: 1 }}>Signature :</Typography>
                <Box sx={{ flexGrow: 1, borderBottom: "1px solid #000" }} />
              </Box>
              <Typography>
                Candidate Name : {data.employeeName}
              </Typography>
            </Box>
          </Box>

          <Typography sx={{ mt: 5, textAlign: "center", fontWeight: 600 }}>
            Enclosures: Annexure A – Salary Structure
          </Typography>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 – ANNEXURE A ================= */}
      <A4Page headerSrc={company.header} >
        <Box sx={{ px: "25mm", pt: "35mm", fontSize: "14px" }}>
          <Typography align="center" sx={{ fontWeight: 700, mb: 3 }}>
            Annexure A – Salary Structure
          </Typography>

          <Table
            size="small"
            sx={{
              border: "1px solid #000",
              "& th, & td": {
                border: "1px solid #000",
                padding: "4px",
              },
              "& th": {
                backgroundColor: "#00b0f0",
                fontWeight: 700,
                color: "#000",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Salary Components</TableCell>
                <TableCell align="right">Per month (Rs.)</TableCell>
                <TableCell align="right">Per Annum (Rs.)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryComponents.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="left">
                    {formatCurrency(row.monthly)}
                  </TableCell>
                  <TableCell align="left">
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>
                  Total Monthly Gross Salary
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 700 }}>
                  {formatCurrency(breakdown.monthly.totalEarnings)}
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 700 }}>
                  {formatCurrency(breakdown.annual.totalEarnings)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* SIGNATURE SECTION */}
           <Typography sx={{ fontWeight: 600, mt: 6}}>
                {company.hrName}
              </Typography>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            
            {/* HR SIDE */}
            <Box>
              <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                {company.signature && (
                  <img src={company.signature} alt="HR Sign" height={55} />
                )}
                {company.stamp && (
                  <img src={company.stamp} alt="Stamp" height={90} />
                )}
              </Box>
              {/* <Typography sx={{ fontWeight: 600 }}>
                {company.hrName}
              </Typography> */}
              <Typography>HR Department Pune</Typography>
            </Box>

            {/* CANDIDATE SIDE */}
            <Box sx={{ minWidth: 260 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography sx={{ mr: 1 }}>Signature :</Typography>
                <Box sx={{ flexGrow: 1, borderBottom: "1px solid #000" }} />
              </Box>
              <Typography>
                Candidate Name : {data.employeeName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </A4Page>
    </>
  );
};

export default QuickPaidInternshipLetter;
