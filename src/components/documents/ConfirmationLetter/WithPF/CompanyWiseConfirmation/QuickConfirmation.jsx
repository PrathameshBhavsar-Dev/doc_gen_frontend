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
import A4Page from "../../../../layout/A4Page";

/* ================= HELPERS ================= */

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : "";

const round0 = (num) => Math.round(num);

const formatCurrency = (v) =>
  Number(v || 0).toLocaleString("en-IN");

/* ================= SALARY BREAKUP WITH PF ================= */

const generateSalaryBreakup = (annualCTC) => {
  const monthlyCTC = round0(annualCTC / 12);

  // Static PF
  const pfMonthly = 3750;
  const pfAnnual = round0(pfMonthly * 12);

  // Fixed Percentages
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);

  // Adjusted Basic
  const basicMonthly = round0(
    monthlyCTC -
    (hraMonthly + daMonthly + specialMonthly + foodMonthly + pfMonthly)
  );

  const basicAnnual = round0(basicMonthly * 12);
  const hraAnnual = round0(hraMonthly * 12);
  const daAnnual = round0(daMonthly * 12);
  const specialAnnual = round0(specialMonthly * 12);
  const foodAnnual = round0(foodMonthly * 12);

  return [
    ["Basic Salary", basicMonthly, basicAnnual],
    ["House Rent Allowance", hraMonthly, hraAnnual],
    ["Dearness Allowance", daMonthly, daAnnual],
    ["Special Allowance", specialMonthly, specialAnnual],
    ["Food Allowance", foodMonthly, foodAnnual],
    ["Provident Fund (PF)", pfMonthly, pfAnnual],
  ];
};

/* ================= MAIN COMPONENT ================= */

const QuickConfirmation = ({ company, data }) => {
  if (!company || !data) return null;

  const annualCTC = round0(Number(data.totalSalary || 0));
  const monthlyCTC = round0(annualCTC / 12);

  const salaryRows = generateSalaryBreakup(annualCTC);

  const totalMonthly = round0(
    salaryRows.reduce((sum, row) => sum + row[1], 0)
  );
  const totalAnnual = round0(
    salaryRows.reduce((sum, row) => sum + row[2], 0)
  );

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box mt={3} fontSize={14}>

          {/* Proper Alignment Section */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "100px 10px auto",
              rowGap: 1,
            }}
          >
            <Typography fontWeight={600}>Name</Typography>
            <Typography fontWeight={600}>:</Typography>
            <Typography>{data.mrms} {data.employeeName}</Typography>

            <Typography fontWeight={600}>Address</Typography>
            <Typography fontWeight={600}>:</Typography>
            <Typography>{data.address}</Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "100px 10px auto",
              mt: 2,
            }}
          >
            <Typography fontWeight={600}>Subject</Typography>
            <Typography fontWeight={600}>:</Typography>
            <Typography >
              Letter of Confirmation for continued services as {data.position}
            </Typography>
          </Box>

          <Typography mt={3}>
            Dear {data.employeeName?.split(" ")[0]},
          </Typography>

          <Typography fontSize={15} textAlign="justify" mt={2}>
            We are pleased to confirm your continued services at the position of Software Test<br />
            Engineer with {" "}<strong>{company.name}</strong> with effective date {" "}
            <strong>{formatDate(data.effectiveDate)}</strong><br /> considering your performance and support towards the organization..
          </Typography>

          <Typography fontSize={15} textAlign="justify" mt={2}>
            If there is any change in the date of joining, changes can be taken under consideration<br />
            Your total Gross salary will be {" "}<strong>Rs. {formatCurrency(annualCTC)}</strong> per year.
          </Typography>


          <Typography fontSize={15} textAlign="justify" mt={2}>
            Subject to various deductions as per companies and government policy.The roles and responsibilities and other terms and conditions of your employment will be Specified in your letter of appointment. We welcome you to R P BUSINESS SOLUTIONS LLP. Family and hope it would be the beginning of a long and mutually beneficial association.Kindly acknowledge the duplicate copy of this letter as an acceptance of this offer.
          </Typography>

          {/* Signature Section */}
          <Box mt={6} display="flex" justifyContent="space-between">
            <Box>
              <Typography>
                For <strong>{company.name}</strong>
              </Typography>

              <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3, mt: 3 }}>
                {company.signature && (
                  <Box
                    component="img"
                    src={company.signature}
                    alt="Authorized Sign"
                    sx={{
                      height: 40,
                      width: "auto",
                      objectFit: "contain"
                    }}
                  />
                )}

                {company.stamp && (
                  <Box
                    component="img"
                    src={company.stamp}
                    alt="Company Stamp"
                    sx={{
                      height: 100,
                      width: "auto",
                      objectFit: "contain"
                    }}
                  />
                )}
              </Box>

              <Typography fontWeight={600} mt={2}>
                {company.hrName}
              </Typography>
              <Typography fontSize={15}>
                HR Relations Lead
              </Typography>
            </Box>

            <Box>
              <Typography mt={17}>Signature: __________________</Typography>
              <Typography mt={1}>
                Name: {data.employeeName}
              </Typography>
            </Box>
          </Box>
          <Typography mt={5} ml={18}>
            <strong>Enclosures:</strong> Annexure A – Salary Structure
          </Typography>

        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>

        <Typography align="center" fontWeight={700} mt={4} mb={3}>
          Annexure A – Salary Structure
        </Typography>

        <Table
          sx={{
            width: "100%",
            border: "1px solid #000",
            "& th, & td": {
              border: "1px solid #000",
              fontSize: 14,
              padding: "6px",
            },
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#87CEEB" }}>
              <TableCell><strong>Salary Components</strong></TableCell>
              <TableCell align="right"><strong>Per Month (Rs.)</strong></TableCell>
              <TableCell align="right"><strong>Per Annum (Rs.)</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {salaryRows.map(([name, m, a], i) => (
              <TableRow key={i}>
                <TableCell>{name}</TableCell>
                <TableCell align="right">{formatCurrency(m)}</TableCell>
                <TableCell align="right">{formatCurrency(a)}</TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "#87CEEB" }}>
              <TableCell><strong>Total CTC</strong></TableCell>
              <TableCell align="right">
                <strong>{formatCurrency(totalMonthly)}</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{formatCurrency(totalAnnual)}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/* Signature Section */}
        <Box mt={6} display="flex" justifyContent="space-between">
          <Box>

            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3, mt: 3 }}>
              {company.signature && (
                <Box
                  component="img"
                  src={company.signature}
                  alt="Authorized Sign"
                  sx={{
                    height: 45,
                    width: "auto",
                    objectFit: "contain"
                  }}
                />
              )}

              {company.stamp && (
                <Box
                  component="img"
                  src={company.stamp}
                  alt="Company Stamp"
                  sx={{
                    height: 100,
                    width: "auto",
                    objectFit: "contain"
                  }}
                />
              )}
            </Box>

            <Typography fontWeight={600} mt={2}>
              {company.hrName}
            </Typography>
            <Typography fontSize={15}>
              HR Relations Lead
            </Typography>
          </Box>

          <Box>
            <Typography mt={17}>Signature: __________________</Typography>
            <Typography mt={1}>
              Name: {data.employeeName}
            </Typography>
          </Box>
        </Box>
      </A4Page>
    </>
  );
};

export default QuickConfirmation;