import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { formatCurrency } from "../../../../../utils/salaryCalculations";
import A4Page from "../../../../layout/A4Page";

const RPIncrement = ({ company = {}, data = {} }) => {


  const getFinancialYear = (effectiveDate) => {
  if (!effectiveDate) return "";

  const year = new Date(effectiveDate).getFullYear();
  return `${year - 1} - ${year}`;
};

  /* ================= HELPER ================= */
  const round2 = (num) => Number(Number(num).toFixed(2));

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  // const getFinancialYear = (date) => {
  //   if (!date) return "";
  //   const d = new Date(date);
  //   const year = d.getFullYear();
  //   const month = d.getMonth() + 1;
  //   return month >= 4 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  // };

  /* ================= SALARY LOGIC ================= */
  const round0 = (num) => Math.round(num);

  
  const monthlyCTC = round0(Number(data.newCTC || 0));

  // ================= UPDATED PERCENTAGES =================
const basicMonthly = round0(monthlyCTC * 0.48); // 40% + 8%
const hraMonthly = round0(monthlyCTC * 0.18);
const daMonthly = round0(monthlyCTC * 0.12);
const specialMonthly = round0(monthlyCTC * 0.16);
const foodMonthly = round0(monthlyCTC * 0.06);

// ================= STATIC PF =================
const pfMonthly = 3750;

// ================= ANNUAL VALUES =================
const basicAnnual = basicMonthly * 12;
const hraAnnual = hraMonthly * 12;
const daAnnual = daMonthly * 12;
const specialAnnual = specialMonthly * 12;
const foodAnnual = foodMonthly * 12;
const pfAnnual = pfMonthly * 12;

// ================= SALARY TABLE =================
const salaryRows = [
  ["Basic", basicMonthly, basicAnnual],
  ["House Rent Allowance", hraMonthly, hraAnnual],
  ["Dearness Allowance", daMonthly, daAnnual],
  ["Special Allowance", specialMonthly, specialAnnual],
  ["Food Allowance", foodMonthly, foodAnnual],
  ["Provident Fund (PF)", pfMonthly, pfAnnual], // Separate
];

// ================= TOTAL EARNINGS =================
const totalMonthly =
  basicMonthly +
  hraMonthly +
  daMonthly +
  specialMonthly +
  foodMonthly;

const totalAnnual = totalMonthly * 12;

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Box sx={{ color: "#000" }}>

          <Typography align="right" mb={4}>
            {formatDate(data.issueDate)}
          </Typography>

          <Typography mb={3}>
            Dear {data.employeeName},
          </Typography>

          <Typography mb={3}>
            At R P Business Solutions, employee performance forms the core basis
            for annual compensation review and career enhancement apart from
            ensuring parity.
          </Typography>

          <Typography mb={3}>
            Your performance has been reviewed and your performance banding for
            the year  {getFinancialYear(data.effectiveDate)} is{" "}
            <strong>"Met Expectation".</strong>
          </Typography>

          <Typography mb={3}>
            In recognition of your performance your compensation has been
            revised to <strong>{formatCurrency(totalAnnual)}</strong> per annum
            effective{" "}
            <strong>{formatDate(data.effectiveDate)}</strong>.
          </Typography>

          <Typography mb={4}>
            Details of your revised compensation are given in Salary Annexure.
          </Typography>

          <Typography mb={4}>
            We look forward to your very active participation and contribution
            on our journey of scaling newer heights.
          </Typography>

          <Typography mb={6}>
            Wishing you a happy and rewarding career with R P Business Solutions LLP.
          </Typography>

          <Typography mb={4}>Yours Sincerely,</Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {company.signature && (
              <img
                src={company.signature}
                alt="Signature"
                style={{ height: 60, marginRight: 25 }}
              />
            )}
            {company.stamp && (
              <img
                src={company.stamp}
                alt="Stamp"
                style={{ height: 90 }}
              />
            )}
          </Box>

          <Typography fontWeight={600}>{company.ceoName}</Typography>
          <Typography>CEO & Managing Director</Typography>

        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Box>

          <Typography
            align="center"
            fontWeight={600}
            mb={5}
            sx={{ textDecoration: "underline" }}
          >
            Salary Annexure
          </Typography>

          {/* EMPLOYEE INFO */}
                      <Box mb={3} fontSize="16px">
                        <Typography>Employee Code : {data.employeeId}</Typography>
                        <Typography>Employee Name : {data.employeeName}</Typography>
                        <Typography>
                          Effective Date :{" "}
                          {new Date(data.effectiveDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                        </Typography>
                      </Box>

          <Table
            sx={{
              width: "100%",
              border: "1px solid #000",
              borderCollapse: "collapse",
              "& th, & td": {
                border: "1px solid #000",
                padding: "4px 6px",
                fontSize: "15px",
                fontFamily: `"Times New Roman", Times, serif`,
              },
            }}
          >
            <TableBody>

              <TableRow sx={{ backgroundColor: "#ff0000" }}>
                <TableCell sx={{ fontWeight: 700 }}>
                  Monthly Component
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Amount (Rs.)
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  Yearly Component
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Amount (Rs.)
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Basic</TableCell>
                <TableCell align="right">{formatCurrency(basicMonthly)}</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">{formatCurrency(basicAnnual)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>House Rent Allowance</TableCell>
                <TableCell align="right">{formatCurrency(hraMonthly)}</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">{formatCurrency(hraAnnual)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Dearness Allowance</TableCell>
                <TableCell align="right">{formatCurrency(daMonthly)}</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">{formatCurrency(daAnnual)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Special Allowance</TableCell>
                <TableCell align="right">{formatCurrency(specialMonthly)}</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">{formatCurrency(specialAnnual)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Food Allowance</TableCell>
                <TableCell align="right">{formatCurrency(foodMonthly)}</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">{formatCurrency(foodAnnual)}</TableCell>
              </TableRow>

              {/* <TableRow>
                <TableCell>Misc. Allowance</TableCell>
                <TableCell align="right">{formatCurrency(miscMonthly)}</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">{formatCurrency(miscAnnual)}</TableCell>
              </TableRow> */}

              <TableRow>
                <TableCell>Provident Fund (PF)</TableCell>
                <TableCell align="right">{formatCurrency(pfMonthly)}</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">{formatCurrency(pfAnnual)}</TableCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: "#ff0000" }}>
                <TableCell sx={{ fontWeight: 700 }}>
                  Monthly Gross
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  {formatCurrency(totalMonthly)}
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  Annual CTC
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>

          <Typography mt={3} fontSize="16px" textAlign="left" color="black">
                        Please note that the details in this communication are confidential
                        and you are requested not to share the same with others.
                      </Typography>

        </Box>
      </A4Page>
    </>
  );
};

export default RPIncrement;
