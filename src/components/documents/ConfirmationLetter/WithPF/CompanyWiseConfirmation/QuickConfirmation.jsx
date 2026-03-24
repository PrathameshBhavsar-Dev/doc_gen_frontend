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

const round2 = (n) => Number(Number(n || 0).toFixed(2));

const formatCurrency = (v) =>
  Number(v || 0).toLocaleString("en-IN",
  //    {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // }
);

/* ================= SALARY BREAKUP WITH PF ================= */

const round0 = (num) => Math.round(num);

<<<<<<< HEAD
const generateSalaryBreakup = (annualCTC) => {
  const monthlyCTC = round0(annualCTC / 12);

  // Static PF
=======
  const round = (n) => Math.round(n);

  // ✅ PF STATIC (included in CTC)
>>>>>>> de82b7f0a5f0e07a39f990929fb24e97cbd6675c
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

  // ✅ % based components
  const hra = round(monthlyCTC * 0.18);
  const da = round(monthlyCTC * 0.12);
  const special = round(monthlyCTC * 0.16);
  const food = round(monthlyCTC * 0.06);

  // ✅ Step 1: total of all except Basic
  const totalOthers = hra + da + special + food + pfMonthly;

  // ✅ Step 2: Basic = remaining
  // basic + hra + da + special + food + pf = monthlyCTC 
  let basic = round(monthlyCTC - totalOthers);

  // ✅ Step 3: FINAL ROUND FIX (no ₹1 mismatch)
  // const finalCheck = basic + totalOthers;
  // basic += (monthlyCTC - finalCheck);

  // ✅ RETURN (same format as your code)
  return [
<<<<<<< HEAD
    ["Basic Salary", basicMonthly, basicAnnual],
    ["House Rent Allowance", hraMonthly, hraAnnual],
    ["Dearness Allowance", daMonthly, daAnnual],
    ["Special Allowance", specialMonthly, specialAnnual],
    ["Food Allowance", foodMonthly, foodAnnual],
    ["Provident Fund (PF)", pfMonthly, pfAnnual],
=======
    ["Basic Salary", basic, basic * 12],
    ["House Rent Allowance", hra, hra * 12],
    ["Dearness Allowance", da, da * 12],
    ["Special Allowance", special, special * 12],
    ["Food Allowance", food, food * 12],
    ["Provident Fund (PF)", pfMonthly, pfAnnual], // ✅ included in CTC
>>>>>>> de82b7f0a5f0e07a39f990929fb24e97cbd6675c
  ];
};

/* ================= MAIN COMPONENT ================= */

const QuickConfirmation = ({ company, data }) => {
  if (!company || !data) return null;

<<<<<<< HEAD
  const annualCTC = round0(Number(data.totalSalary || 0));
  const monthlyCTC = round0(annualCTC / 12);
=======
const annualCTC = Number(data.totalSalary || 0);
const monthlyCTC = Math.round(annualCTC / 12);
>>>>>>> de82b7f0a5f0e07a39f990929fb24e97cbd6675c

  const salaryRows = generateSalaryBreakup(annualCTC);

<<<<<<< HEAD
  const totalMonthly = round0(
    salaryRows.reduce((sum, row) => sum + row[1], 0)
  );
  const totalAnnual = round0(
    salaryRows.reduce((sum, row) => sum + row[2], 0)
  );
=======
//  const monthlyGross = salaryRows
//   .filter(row => row[0] !== "Provident Fund (PF)")
//   .reduce((sum, row) => sum + row[1], 0);
>>>>>>> de82b7f0a5f0e07a39f990929fb24e97cbd6675c

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
<<<<<<< HEAD
                <strong>{formatCurrency(totalMonthly)}</strong>
=======
                <strong>{formatCurrency(monthlyCTC)}</strong>
>>>>>>> de82b7f0a5f0e07a39f990929fb24e97cbd6675c
              </TableCell>
              <TableCell align="right">
                <strong>{formatCurrency(totalAnnual)}</strong>
                s              </TableCell>
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