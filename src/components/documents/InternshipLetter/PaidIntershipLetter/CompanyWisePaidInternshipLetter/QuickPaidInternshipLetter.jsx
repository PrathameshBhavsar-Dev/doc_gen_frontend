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

/* ================= HELPERS ================= */
const round2 = (num) => Number(num.toFixed(2));

// auto detect monthly / annual
const normalizeAnnualCTC = (ctc) => {
  const value = Number(ctc || 0);
  return value < 100000 ? value * 12 : value;
};

/* ================= A4 PAGE ================= */
const A4Page = ({ children, headerSrc, }) => (
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

  /* ✅ Calculate New CTC & Breakup */
  const annualCTC = normalizeAnnualCTC(data.stipend);

  const generateSalaryBreakup = (annualCTC) => {
    const monthlyCTC = annualCTC / 12;

    const percentages = {
      basic: 0.4,
      hra: 0.18,
      da: 0.12,
      special: 0.16,
      food: 0.06,
      misc: 0.08
    };

    const basic = round2(monthlyCTC * percentages.basic);
    const hra = round2(monthlyCTC * percentages.hra);
    const da = round2(monthlyCTC * percentages.da);
    const special = round2(monthlyCTC * percentages.special);
    const food = round2(monthlyCTC * percentages.food);
    const misc = round2(monthlyCTC * percentages.misc);

    const basicAnnual = round2(basic * 12);
    const hraAnnual = round2(hra * 12);
    const daAnnual = round2(da * 12);
    const specialAnnual = round2(special * 12);
    const foodAnnual = round2(food * 12);
    const miscAnnual = round2(misc * 12);

    return [
      { name: "Basic Salary", monthly: basic, annual: basicAnnual },
      { name: "House Rent Allowance", monthly: hra, annual: hraAnnual },
      { name: "Dearness Allowance", monthly: da, annual: daAnnual },
      { name: "Special Allowance", monthly: special, annual: specialAnnual },
      { name: "Food Allowance", monthly: food, annual: foodAnnual },
      { name: "Misc Allowance", monthly: misc, annual: miscAnnual }
    ];
  };

  const salaryComponents = generateSalaryBreakup(annualCTC);
  const monthlyGross = salaryComponents.reduce((sum, r) => sum + r.monthly, 0);

  return (
    <>
      {/* ================= PAGE 1 – INTERNSHIP LETTER ================= */}
      <A4Page headerSrc={company.header} >
        <Box sx={{ px: "20mm", pt: "-2", fontSize: "14px", lineHeight: 1.7 }}>
          {/* DATE */}
          <Typography align="right" sx={{ mt: 2 }}>
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
            <strong>{annualCTC.toLocaleString("en-IN")}/-</strong>{" "}
            per year.
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
              <Box sx={{ display: "flex", gap: 2 }}>
                {/* SIGNATURE */}
                {company?.signature && (
                  <img src={company.signature} alt="Signature" style={{ height: 55, marginTop: 30 }} />
                )}

                {/* STAMP */}
                {company?.stamp && (
                  <img
                    src={company.stamp}
                    alt="Stamp"
                    style={{
                      height: 100
                    }}
                  />
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
               // padding: "4px",
               padding: "0px 12px 12px 12px",
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
                <TableCell align="center">Per month (Rs.)</TableCell>
                <TableCell align="center">Per Annum (Rs.)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryComponents.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    {row.monthly.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell align="center">
                    {row.annual.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Total Monthly Gross Salary
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  {monthlyGross.toLocaleString("en-IN")}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  {annualCTC.toLocaleString("en-IN")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* SIGNATURE SECTION */}
          <Typography sx={{ fontWeight: 600, mt: 10 }}>
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
              <Box sx={{ display: "flex", gap: 2 }}>
                {/* SIGNATURE */}
                {company?.signature && (
                  <img src={company.signature} alt="Signature" style={{ height: 55, marginTop: 30 }} />
                )}

                {/* STAMP */}
                {company?.stamp && (
                  <img
                    src={company.stamp}
                    alt="Stamp"
                    style={{
                      height: 100
                    }}
                  />
                )}
              </Box>

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
