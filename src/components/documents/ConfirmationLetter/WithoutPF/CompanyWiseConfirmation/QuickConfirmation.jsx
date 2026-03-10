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

const round0 = (n) => Math.round(Number(n || 0));

const formatCurrency = (v) =>
  Number(v || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/* ================= SIMPLE SALARY BREAKUP ================= */
/* ================= SALARY BREAKUP WITH PENTA LOGIC ================= */

const QuickConfirmation = ({ company = {}, data = {} }) => {
  if (!company || !data) return null;

  const monthlyCTC = round0(Number(data.totalSalary || 0));
  const annualCTC = monthlyCTC * 12;

  // ===== Percentage Breakup =====
  let basicMonthly = round0(monthlyCTC * 0.40);
  let hraMonthly = round0(monthlyCTC * 0.18);
  let daMonthly = round0(monthlyCTC * 0.12);
  let specialMonthly = round0(monthlyCTC * 0.16);
  let foodMonthly = round0(monthlyCTC * 0.06);
  let miscMonthly = round0(monthlyCTC * 0.08);

  // Fix rounding difference
  const calculated =
    basicMonthly +
    hraMonthly +
    daMonthly +
    specialMonthly +
    foodMonthly +
    miscMonthly;

  basicMonthly += monthlyCTC - calculated;

  const salaryRows = [
    ["Basic", basicMonthly, basicMonthly * 12],
    ["House Rent Allowance", hraMonthly, hraMonthly * 12],
    ["Dearness Allowance", daMonthly, daMonthly * 12],
    ["Special Allowance", specialMonthly, specialMonthly * 12],
    ["Food Allowance", foodMonthly, foodMonthly * 12],
    ["Misc. Allowance", miscMonthly, miscMonthly * 12],
  ];

  const monthlyGross = salaryRows.reduce(
    (sum, row) => sum + row[1],
    0
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
            <Typography>
              Letter of Confirmation for continued services as {data.position}
            </Typography>
          </Box>

          <Typography mt={3}>
            Dear {data.employeeName?.split(" ")[0]},
          </Typography>

          <Typography fontSize={14} textAlign="justify" mt={2}>
                     We are pleased to confirm your continued services at the position of {data.position}<br />
                     Engineer with {" "}<strong>{company.name}</strong> with effective date {" "}<strong>{formatDate(data.effectiveDate)}</strong><br />
                     considering your performance and support towards the organization..
                   </Typography>
         
                   <Typography fontSize={14} textAlign="justify" mt={2}>
                     If there is any change in the date of joining, changes can be taken under consideration<br />
                     Your total Gross salary will be {" "}<strong>Rs. {formatCurrency(annualCTC)}</strong> Per Year.
                   </Typography>
         
         
                   <Typography fontSize={14} textAlign="justify" mt={2}>
                     Subject to various deductions as per companies and government policy.The roles and
                      responsibilities and other terms and conditions of your employment will be Specified 
                      in your letter of appointment. We welcome you to  {company.name}. Family and hope it would be the beginning of a long and mutually beneficial association.Kindly acknowledge the duplicate copy of this letter as an acceptance of this offer.
                   </Typography>

          {/* Signature Section */}
          <Box mt={6} display="flex" justifyContent="space-between">
            <Box>
              <Typography>
                For <strong>{company.name}</strong>
              </Typography>

              <Box mt={2}>
                {company.signature && (
                  <img src={company.signature} alt="Sign" height={45} />
                )}
                {company.stamp && (
                  <img src={company.stamp} alt="Stamp" height={85} />
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
              <TableCell><strong>Total Monthly Gross Salary</strong></TableCell>
              <TableCell align="right">
                <strong>{formatCurrency(monthlyGross)}</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{formatCurrency(annualCTC)}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
          
        </Table>
  {/* Signature Section */}
          <Box mt={6} display="flex" justifyContent="space-between">
            <Box>
                   <Box mt={5}>
                {company.signature && (
                  <img src={company.signature} alt="Sign" height={45} />
                )}
                {company.stamp && (
                  <img src={company.stamp} alt="Stamp" height={85} />
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