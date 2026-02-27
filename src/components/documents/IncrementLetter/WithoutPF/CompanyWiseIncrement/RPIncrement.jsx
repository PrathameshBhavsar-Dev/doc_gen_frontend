import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import raj from '../../../../../assets/images/rp/rajparekh.png';
import A4Page from '../../../../layout/A4Page';


import {

  formatCurrency,
} from "../../../../../utils/salaryCalculations";

const RPIncrement = ({ company, data }) => {


const getFinancialYear = (effectiveDate) => {
  if (!effectiveDate) return "";

  const year = new Date(effectiveDate).getFullYear();
  return `${year - 1} - ${year}`;
};



  /* ================= SALARY LOGIC (STANDARDIZED – SAME AS DEVCONS) ================= */

  // Helper to keep 2 decimals everywhere
const round0 = (num) => Math.round(num);

  // Source of truth
  const monthlyCTC = round0(Number(data.newCTC || 0));

  // ================= PERCENTAGE BREAKUP =================
const basicMonthly = round0(monthlyCTC * 0.40);
const hraMonthly = round0(monthlyCTC * 0.18);
const daMonthly = round0(monthlyCTC * 0.12);
const specialMonthly = round0(monthlyCTC * 0.16);
const foodMonthly = round0(monthlyCTC * 0.06);
const miscMonthly = round0(monthlyCTC * 0.08); // 8%

// ================= ANNUAL VALUES =================
const basicAnnual = round0(basicMonthly * 12);
const hraAnnual = round0(hraMonthly * 12);
const daAnnual = round0(daMonthly * 12);
const specialAnnual = round0(specialMonthly * 12);
const foodAnnual = round0(foodMonthly * 12);
const miscAnnual = round0(miscMonthly * 12);

// ================= SALARY TABLE STRUCTURE =================
const salaryRows = [
  ["Basic", basicMonthly, basicAnnual],
  ["House Rent Allowance", hraMonthly, hraAnnual],
  ["Dearness Allowance", daMonthly, daAnnual],
  ["Special Allowance", specialMonthly, specialAnnual],
  ["Food Allowance", foodMonthly, foodAnnual],
  ["Misc. Allowance", miscMonthly, miscAnnual],
];

// ================= TOTALS =================
const totalMonthly = round0(
  salaryRows.reduce((sum, row) => sum + row[1], 0)
);

const totalAnnual = round0(
  salaryRows.reduce((sum, row) => sum + row[2], 0)
);

  return (


    <>
      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
      // watermarkSrc={company.watermark}
      >
        {/* ======================================================
          PAGE 1 – INCREMENT LETTER (UNCHANGED)
      ====================================================== */}
        <Box sx={{ position: "relative", zIndex: 1, color: "#000" }}>
          <Typography align="right" mb={4}>
            {new Date(data.issueDate).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </Typography>

          <Typography mb={3}>Dear {data.employeeName},</Typography>

          <Typography mb={3}>
            At R P Business Solutions, employee performance forms the core basis
            for annual compensation review and career enhancement apart from
            ensuring parity.
          </Typography>

          <Typography mb={3}>
            Your performance has been reviewed and your performance banding for
            the year{" "}
            {getFinancialYear(data.effectiveDate)}{" "}
            is <strong>"Met Expectation".</strong>
          </Typography>


          <Typography mb={3}>
            In recognition of your performance your compensation has been
            revised to{" "}<strong>{formatCurrency(totalAnnual)}</strong> per annum effective{" "}
            <strong>
              {new Date(data.effectiveDate).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </strong>
            .
          </Typography>

          <Typography mb={4}>
            Details of your revised compensation are given in Salary Annexure.
          </Typography>

          <Typography mb={4}>
            We look forward to your very active participation and contribution
            on our journey of scaling newer heights.
          </Typography>

          <Typography mb={6}>
            Wishing you a happy and rewarding career with R P Business
            Solutions LLP.
          </Typography>

          <Typography mb={4} >Yours Sincerely,</Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <img
              src={raj}
              alt="Signature"
              style={{ height: 60, marginRight: 25 }}
            />
            <img src={company.stamp} alt="Stamp" style={{ height: 90 }} />
          </Box>

          <Typography fontWeight={600}>{company.ceoName}</Typography>
          <Typography>CEO & Managing Director</Typography>
        </Box>

      </A4Page>


      {/* ======================================================
          PAGE 2 – SALARY ANNEXURE
      ====================================================== */}

      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}>
        <Box>


          <Box >
            <Typography
              align="center"
              fontWeight={600}
              mb={4}
              style={{ textDecoration: "underline" }}
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

            {/* TABLE */}
            <Table
              sx={{
                width: "100%",
                border: "1px solid black",
                borderCollapse: "collapse",
                "& th, & td": {
                  border:"1px solid black",
                  padding:"5px",
                  fontSize:"15px",
                  lineHeight:1.2,
                },
              }}
            >
              <TableBody>
                <TableRow sx={{ backgroundColor: "#ff0000" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Monthly Component
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }} align="right">
                    Amount (Rs.)
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Yearly Component
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }} align="right">
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
                  <TableCell align="right">
                    {formatCurrency(daMonthly)}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">{formatCurrency(daAnnual)}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Special Allowance</TableCell>
                  <TableCell align="right">
                    {formatCurrency(specialMonthly)}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    {formatCurrency(specialAnnual)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Food Allowance</TableCell>
                  <TableCell align="right">
                    {formatCurrency(foodMonthly)}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    {formatCurrency(foodAnnual)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Misc. Allowance</TableCell>
                  <TableCell align="right">
                    {formatCurrency(miscMonthly)}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    {formatCurrency(miscAnnual)}
                  </TableCell>
                </TableRow>

                <TableRow sx={{ backgroundColor: "#ff0000" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Monthly Gross
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }} align="right">
                    {formatCurrency(totalMonthly)}
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Annual CTC
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }} align="right">
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
        </Box>
      </A4Page>

    </>
  );
};

export default RPIncrement;


