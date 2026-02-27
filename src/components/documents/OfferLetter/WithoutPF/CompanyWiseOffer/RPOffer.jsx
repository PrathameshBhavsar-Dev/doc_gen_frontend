import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material";

import {
  calculateSalaryBreakdown,
  formatCurrency,
} from "../../../../../utils/salaryCalculations";

import A4Page from "../../../../layout/A4Page";

const RPOffer = ({ company, data }) => {
  if (!company || !data) return null;

  /* =====================================================
     SALARY LOGIC (EXACT SAME AS INCREMENT)
  ===================================================== */

  // const salary = calculateSalaryBreakdown(data.salary || data.ctc || 0);

  // const {
  //   monthly: {
  //     basicSalary = 0,
  //     hra = 0,
  //     conveyanceAllowance = 0, // DA
  //     medicalAllowance = 0,    // Food
  //     specialAllowance = 0,
  //     totalEarnings = 0,
  //   },
  //   annual: {
  //     basicSalary: basicAnnual = 0,
  //     hra: hraAnnual = 0,
  //     conveyanceAllowance: daAnnual = 0,
  //     medicalAllowance: foodAnnual = 0,
  //     specialAllowance: specialAnnual = 0,
  //     ctc = 0,
  //   },
  // } = salary;

  // const salaryComponents = [
  //   { name: "Basic", monthly: basicSalary, annual: basicAnnual },
  //   { name: "House Rent Allowance", monthly: hra, annual: hraAnnual },
  //   { name: "Dearness Allowance", monthly: conveyanceAllowance, annual: daAnnual },
  //   { name: "Special Allowance", monthly: specialAllowance, annual: specialAnnual },
  //   { name: "Food Allowance", monthly: medicalAllowance, annual: foodAnnual },
  //   { name: "Misc. Allowance", monthly: 0, annual: 0 },
  // ];

  // const totalMonthly = totalEarnings;
  // const totalAnnual = ctc;

  // updated code

  /* =====================================================
   SALARY LOGIC (SAME AS DEVCONS INCREMENT)
===================================================== */

// helper
  const round0 = (num) => Math.round(num);

// source of truth
const monthlyCTC = round0(Number(data.salary|| 0));

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



const numberToWordsIndian = (num) => {
  if (!num || isNaN(num)) return "Rupees Zero Only";

  const ones = [
    "", "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen",
    "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];

  const tens = [
    "", "", "Twenty", "Thirty", "Forty",
    "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  const convertBelowHundred = (n) => {
    if (n < 20) return ones[n];
    return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
  };

  const convertNumber = (n) => {
    let result = "";

    if (n >= 10000000) {
      result += convertNumber(Math.floor(n / 10000000)) + " Crore ";
      n %= 10000000;
    }

    if (n >= 100000) {
      result += convertNumber(Math.floor(n / 100000)) + " Lakh ";
      n %= 100000;
    }

    if (n >= 1000) {
      result += convertNumber(Math.floor(n / 1000)) + " Thousand ";
      n %= 1000;
    }

    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }

    if (n > 0) {
      result += convertBelowHundred(n) + " ";
    }

    return result.trim();
  };

  return `Rupees ${convertNumber(num)} Only`;
};


return (
    <>
      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
      // watermarkSrc={company.watermark}
      >

        {/* ================= PAGE 1 : OFFER LETTER ================= */}
        <Box
        // sx={{
        //   width: "210mm",
        //   minHeight: "297mm",
        //   backgroundColor: "#ffffff",
        //   fontFamily: `"Times New Roman", Times, serif`,
        //   display: "flex",
        //   flexDirection: "column",
        //   "& *": {
        //     fontFamily: `"Times New Roman", Times, serif`,
        //     fontWeight: 500,
        //   },
        // }}
        >
          {/* HEADER
        {company?.headerImage && (
          <img src={company.headerImage} alt="Header" style={{ width: "100%" }} />
        )} */}

          {/* CONTENT */}
          <Box
          // className="a4-content-only"
          // sx={{
          //   px: "25mm",
          //   py: "22mm",
          //   flexGrow: 1,
          //   fontSize: "13px",
          //   lineHeight: 1.8,
          // }}
          >
            {/* DATE */}
            <Typography
              sx={{
                textAlign: "right",
                mb: 0,
                fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              {new Date(data.issueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>

            <Typography
              sx={{
                mb: 1,
                fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
                fontSize: "15px",
                fontWeight: 500,
                color: "#000"
              }}
            >
              <strong>Name</strong> : {data.mrms} {data.candidateName}
            </Typography>

            <Typography
              sx={{
                mb: 1,
                fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
                fontSize: "15px",
                fontWeight: 500,

              }}
            >
              <strong>Address</strong> : {data.address}
            </Typography>

            <Typography
              sx={{
                mb: 2,
                fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              <strong>Subject</strong> :{" "}
              <span style={{ textDecoration: "underline" }}>
                Letter of intent for the position of {data.position}
              </span>
            </Typography>

            <Typography
              sx={{
                mb: 2,
                fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
               Dear {data?.candidateName?.split(" ")[0]},
            </Typography>


            <Typography
              sx={{
                mb: 2,
                textAlign: "justify",
                fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
              }}
            >
              Welcome to <strong>R P BUSINESS SOLUTIONS LLP</strong>!
              <br />
              It was a pleasure meeting you to explore a career opportunity in{" "}
              <strong>R P BUSINESS SOLUTIONS LLP</strong>. Based on our discussions, we are
              pleased to offer you the position of{" "}
              <strong>"{data.position}"</strong> with our organisation. The gross
              compensation will be{" "}
              <strong>
                INR {formatCurrency(totalAnnual)} ({numberToWordsIndian(totalAnnual)})
              </strong>{" "}
              per annum. We wish to start commencing your job from{" "}
              <strong>{new Date(data.joiningDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</strong>. The details of the terms and conditions of
              the offer of employment are detailed in the enclosed annexure-1.
            </Typography>

            <Typography
              sx={{
                mb: 3,
                textAlign: "justify",
                fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
              }}
            >
              At <strong>R P BUSINESS SOLUTIONS LLP</strong> we believe we have a historic
              opportunity of building a global world class company. We also believe we are
              very unique in several ways – being a flat, open and communicative
              organization; our ethos that encourages, promotes and rewards empowerment;
              initiative; flawless execution and leadership. In return, we promise to
              provide you a platform to grow and fulfill your personal and professional
              goals. We look for professionals like you who would partner the future growth
              of the Organization. We are confident that with your skills, competencies and
              capabilities you would be a valuable addition to the team.
            </Typography>

            <Typography
              sx={{
                mb: 3,
                fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
              }}
            >
              We look forward to you joining on{" "}
              <strong>
                {new Date(data.joiningDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>.
            </Typography>


            <Typography
              sx={{
                mb: 2,
                fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
                color: "#000"
              }}
            >
              Yours Sincerely,
            </Typography>

            <Typography
              sx={{
                mb: 3,
                fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
              }}
            >
              <strong>For R P BUSINESS SOLUTIONS LLP.</strong>
            </Typography>


            {/* ================= SIGNATURE & STAMP (IMAGE MATCHED) ================= */}
            <Box
              sx={{
                position: "relative",
                mt: 3,
                mb: 2,
                height: "120px",
                fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
              }}
            >
              {/* LEFT : HR SIGNATURE */}
              <Box sx={{ position: "absolute", left: 0, top: 10 }}>
                {company?.signature && (
                  <img
                    src={company.signature}
                    alt="HR Signature"
                    style={{ height: 50 }}
                  />
                )}
                <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>
                  Aditi Dhambare
                </Typography>
                <Typography sx={{ fontSize: "13px" }}>
                  HR Division Pune
                </Typography>
              </Box>

              {/* CENTER : COMPANY STAMP */}
              <Box
                sx={{
                  position: "absolute",
                  left: "33%",
                  top: "-10px",
                  transform: "translateX(-50%)",
                }}
              >
                {company?.stamp && (
                  <img
                    src={company.stamp}
                    alt="Company Stamp"
                    style={{ height: 100, opacity: 0.95 }}
                  />
                )}
              </Box>

              {/* RIGHT : CANDIDATE SIGNATURE */}
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 20,
                  textAlign: "left",
                  fontSize: "14px",
                }}
              >
                <Typography>
                  Signature : __________________
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  Candidate Name : {data.candidateName}
                </Typography>
              </Box>
            </Box>

            {/* ================= ENCLOSURES ================= */}
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 600,
                textDecoration: "underline",
                fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
                fontSize: "13px",
              }}
            >
              Enclosures: Annexure A-salary Structure
            </Typography>
          </Box>

          {/* FOOTER
        {company?.footerImage && (
          <img src={company.footerImage} alt="Footer" style={{ width: "100%" }} />
        )} */}
        </Box>
      </A4Page>



      {/* ================= PAGE GAP ================= */}
      <Box />

      {/* ================= PAGE 2 : ANNEXURE A ================= */}

      {/* ================= PAGE 2 : ANNEXURE A ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box>
          <Typography
            align="center"
            fontWeight={700}
            mb={6}
            sx={{ textDecoration: "underline" }}
          >
            Annexure A – Salary Structure
          </Typography>

          <Table
            sx={{
              width: "100%",
              border: "1px solid #000",
              borderCollapse: "collapse",
              "& th, & td": {
                border: "1px solid #000",
                padding: "6px",
                fontSize: "15px",
              },
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#ff0000" }}>
                <TableCell sx={{ fontWeight: 700, color: "#fff" }}>
                  Salary Components
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: "#fff" }}>
                  Per month (Rs.)
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: "#fff" }}>
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

              <TableRow sx={{ backgroundColor: "#ff0000" }}>
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

          {/* ================= SIGNATURE / STAMP / CANDIDATE ================= */}
          <Box
            sx={{
              position: "relative",
              mt: 10,
              height: "140px",
              fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
            }}
          >
            {/* LEFT : HR SIGNATURE */}
            <Box sx={{ position: "absolute", left: 0, top: 0 }}>
              {company?.signature && (
                <img
                  src={company.signature}
                  alt="HR Signature"
                  style={{ height: 55 }}
                />
              )}
              <Typography sx={{ fontWeight: 600, fontSize: "14px", mt: 1 }}>
                Aditi Dhambare
              </Typography>
              <Typography sx={{ fontSize: "13px" }}>
                HR Division Pune
              </Typography>
            </Box>

            {/* CENTER : COMPANY STAMP */}
            <Box
              sx={{
                position: "absolute",
                left: "37%",
                top: "-10px",
                transform: "translateX(-50%)",
              }}
            >
              {company?.stamp && (
                <img
                  src={company.stamp}
                  alt="Company Stamp"
                  style={{ height: 100, opacity: 0.9 }}
                />
              )}

            </Box>

            {/* RIGHT : CANDIDATE SIGNATURE */}
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: "20px",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              <Typography sx={{ mb: 2 }}>
                Signature : ____________________
              </Typography>
              <Typography>
                Candidate : {data.candidateName}
              </Typography>
            </Box>
          </Box>
        </Box>


      </A4Page>

    </>
  );
};






export default RPOffer;
