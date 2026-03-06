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

const round2 = (num) => Number(Number(num || 0).toFixed(2));

const formatCurrency = (num) =>
  Number(num || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/* ================= SALARY BREAKUP ================= */
const generateSalaryBreakup = (monthlyCTC) => {

  // Calculate salary components (100%)
  let basic = Math.round(monthlyCTC * 0.48);
  let hra = Math.round(monthlyCTC * 0.18);
  let da = Math.round(monthlyCTC * 0.12);
  let special = Math.round(monthlyCTC * 0.16);
  let food = Math.round(monthlyCTC * 0.06);

  // Fix rounding difference
  const calculated = basic + hra + da + special + food;
  basic += monthlyCTC - calculated;

  // Static PF
  const pfMonthly = 3750;
  const pfAnnual = pfMonthly * 12;

  return [
    ["Basic Salary", basic, basic * 12],
    ["House Rent Allowance", hra, hra * 12],
    ["Dearness Allowance", da, da * 12],
    ["Special Allowance", special, special * 12],
    ["Food Allowance", food, food * 12],
    ["Provident Fund (PF)", pfMonthly, pfAnnual],
  ];
};
/* ================= MAIN COMPONENT ================= */

const PentaConfirmation = ({ company, data }) => {
  if (!company || !data) return null;

 const monthlyCTC = Number(data.totalSalary || 0);
const annualCTC = monthlyCTC * 12;

const salaryRows = generateSalaryBreakup(monthlyCTC);

  const monthlyGross = salaryRows
  .filter(row => row[0] !== "Provident Fund (PF)")
  .reduce((sum, row) => sum + row[1], 0);

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box mt={2}>
          

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
        
          <Typography fontSize={14} textAlign="justify" mt={2}>
          <strong>Dear </strong> {data.employeeName?.split(" ")[0]},
          </Typography>

          <Typography fontSize={14} textAlign="justify" mt={2}>
           We are pleased to confirm your continued services at the position of Software Test<br/>
           Engineer with {" "}<strong>{company.name}</strong> with effective date {" "}
            <strong>{formatDate(data.effectiveDate)}</strong><br/> considering your performance and support towards the organization..
          </Typography>

          <Typography fontSize={14} textAlign="justify" mt={2}>
          If there is any change in the date of joining, changes can be taken under consideration<br/>
          Your total Gross salary will be {" "}<strong>Rs. {formatCurrency(annualCTC)}</strong> per year.
          </Typography>

         
   <Typography fontSize={14} textAlign="justify" mt={2}>
           Subject to various deductions as per companies and government policy.The roles and responsibilities and other terms and conditions of your employment will be
            Specified in your letter of appointment. We welcome you to R P BUSINESS SOLUTIONS LLP. Family and hope it would be the beginning of a long and mutually beneficial association.Kindly acknowledge the duplicate copy of this letter as an acceptance of this offer.
          </Typography>
          {/* SIGNATURE SECTION */}
          <Box
            sx={{
              mt: 6,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography>
                For <strong>{company.name}</strong>
              </Typography>

              <Box mt={2}>
                {company.signature && (
                  <img
                    src={company.signature}
                    alt="Sign"
                    height={45}
                  />
                )}
                {company.stamp && (
                  <img
                    src={company.stamp}
                    alt="Stamp"
                    height={80}
                  />
                )}
              </Box>

              <Typography fontWeight={650} mt={1}>
                {company.hrName}
              </Typography>
              <Typography fontSize={13}>
               HR Relations Lead
              </Typography>
            </Box>

            <Box>
              
              <Typography mt={15}>Signature: ____________</Typography>
              <Typography mt={1}>Date: ____________</Typography>
            </Box>
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 – SALARY STRUCTURE ================= */}
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
            <TableRow sx={{ backgroundColor: "#1cc9e0" }}>
              <TableCell>
                <strong>Salary Components</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Per Month (Rs.)</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Per Annum (Rs.)</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {salaryRows.map(([name, month, year], index) => (
              <TableRow key={index}>
                <TableCell>{name}</TableCell>
                <TableCell align="right">
                  {formatCurrency(month)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(year)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "#1cc9e0" }}>
              <TableCell>
                <strong>Total Monthly Gross Salary</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{formatCurrency(monthlyGross)}</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{formatCurrency(annualCTC)}</strong>
              </TableCell>
            </TableRow>
            
          </TableBody>
          
        </Table>
                   {/* SIGNATURE SECTION */}
          <Box
            sx={{
              mt: 6,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
            

              <Box mt={5}>
                {company.signature && (
                  <img
                    src={company.signature}
                    alt="Sign"
                    height={45}
                  />
                )}
                {company.stamp && (
                  <img
                    src={company.stamp}
                    alt="Stamp"
                    height={80}
                  />
                )}
              </Box>

              <Typography fontWeight={600} mt={1}>
                {company.hrName}
              </Typography>
              <Typography fontSize={13}>
                HR Relations Lead
              </Typography>
            </Box>

            <Box>
              
              <Typography mt={15}>Signature: ____________</Typography>
              <Typography mt={1}>
                Name: {data.employeeName}
              </Typography>
              {/* <Typography mt={1}>Date: ____________</Typography> */}
            </Box>
          </Box>
      </A4Page>
    </>
  );
};

export default PentaConfirmation;