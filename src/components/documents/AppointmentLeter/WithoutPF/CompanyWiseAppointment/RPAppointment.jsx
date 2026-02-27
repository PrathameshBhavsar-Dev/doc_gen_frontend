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
import { formatCurrency } from "../../../../../utils/salaryCalculations";

const RPAppointment = ({ company, data }) => {
  if (!company || !data) return null;

  /* ================= HELPERS ================= */
  const firstName = data.employeeName?.split(" ")[0] || "";

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
      : "";

  // /* ================= SALARY LOGIC ================= */
  // const round2 = (n) => Number(n.toFixed(2));
  // const annualCTC = Number(data.salary || 0);

  // const basic = round2(annualCTC * 0.34);
  // const hra = round2(annualCTC * 0.20);
  // const da = round2(annualCTC * 0.035);
  // const special = round2(annualCTC * 0.345);
  // const food = round2(annualCTC * 0.06);

  // const misc = round2(
  //   annualCTC - (basic + hra + da + special + food)
  // );

  // const salaryRows = [
  //   ["Basic", basic / 12, basic],
  //   ["House Rent Allowance", hra / 12, hra],
  //   ["Dearness Allowance", da / 12, da],
  //   ["Special Allowance", special / 12, special],
  //   ["Food Allowance", food / 12, food],
  //   ["Misc. Allowance", misc / 12, misc],
  // ];

   /* ================= SALARY LOGIC ================= */

  // 🔹 Round to whole number (no decimals)
const round0 = (num) => Math.round(num);

// ================= MONTHLY CTC =================
const monthlyCTC = round0(Number(data.salary || 0));

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


  /* ================= TERMS SPLIT ================= */
  const page1Terms = (data.terms || []).slice(0, 8);
  const page2Terms = (data.terms || []).slice(8);

  const formatLakhsPerAnnum = (amount) => {
    if (!amount || isNaN(amount)) return "";

    const lakhs = amount / 100000;

    return `${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(1)} Lakhs per annum`;
  };


  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box
          sx={{
            mt: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* DATE */}
          <Typography align="right" fontSize={15}>
            {formatDate(data.issueDate)}
          </Typography>

          {/* REF */}
          <Typography mt={2} fontSize={15}>
            <b>Ref:</b> RPB/VER1.1/PUN/PIMGUR/ADM-TEST/
            {String(data.employeeId).padStart(4, "0")}
          </Typography>

          {/* NAME & ADDRESS */}
          <Typography mt={2} fontSize={15}>
            {data.mrms} {data.employeeName}
            <br />
            {data.address}
          </Typography>

          {/* SALUTATION */}
          <Typography mt={2} fontSize={15}>
            Dear {firstName},
          </Typography>

          {/* TITLE */}
          <Typography
            align="center"
            fontWeight={700}
            mt={2}
            fontSize={16}
            sx={{
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationThickness: "1.5px",
            }}
          >
            Letter of Appointment
          </Typography>

          {/* INTRO */}
          <Typography mt={2} textAlign="justify" fontSize={15}>
            Further to your acceptance of our Letter of Offer dated{" "}
            <b>{formatDate(data.issueDate)}</b>, we are pleased to appoint you in
            our organization with effect from{" "}
            <b>{formatDate(data.joiningDate)}</b>, under the terms and conditions
            given below:
          </Typography>

          {/* TERMS LIST */}
          <Box
            component="ol"
            sx={{
              pl: 3,
              mt: 2,
              "& li": {
                marginBottom: "6px", // 🔑 controlled spacing
              },
              "& li::marker": {
                fontWeight: 500,
              },
            }}
          >
            <li>
              <Typography fontSize={15} sx={{ margin: 0, lineHeight: 1.4 }}>
                Your Designation will be <b>“{data.position}”</b>.
              </Typography>
            </li>

            <li>
              <Typography fontSize={15} sx={{ margin: 0, lineHeight: 1.4 }}>
                Your total emoluments will <b>{formatLakhsPerAnnum(totalAnnual)}.</b>
              </Typography>
            </li>

            <li>
              <Typography fontSize={15} textAlign="justify" sx={{ margin: 0, lineHeight: 1.4 }}>
                Full details of your pay package are given in the enclosure to this
                letter. However, please note that LTA is payable after completion of
                one year of service, subject to your getting confirmed in the service.
                If the company provides accommodation / transit accommodation,
                appropriate deductions will be made for the same, as per the rules
                applicable.
              </Typography>
            </li>

            <li>
              <Typography fontSize={15} sx={{ margin: 0, lineHeight: 1.4 }}>
                Whilst you are located abroad, the terms applicable will be intimated
                at the relevant point of time.
              </Typography>
            </li>

            <li>
              <Typography fontSize={15} sx={{ margin: 0, lineHeight: 1.4 }}>
                You shall be due for salary revision not before one year from your
                date of joining.
              </Typography>
            </li>

            <li>
              <Typography fontSize={15} textAlign="justify" sx={{ margin: 0, lineHeight: 1.4 }}>
                The Management reserves the right to change the different
                components/allowances in the total emoluments package, at its own
                discretion, at any time in future. However, your total monthly salary
                will be protected.
              </Typography>
            </li>

            <li>
              <Typography fontSize={15} textAlign="justify" sx={{ margin: 0, lineHeight: 1.4 }}>
                You will be on probation for a period of six months from the first of
                the calendar month following the date of your joining, after which
                you will be confirmed if your work is found satisfactory.
              </Typography>
            </li>

            <li>
              <Typography fontSize={15} textAlign="justify" sx={{ margin: 0, lineHeight: 1.4 }}>
                Your services are terminable with one month’s notice on either side.
                The Company may, at its discretion, choose to terminate your services
                with one month’s total salary in lieu of notice period.
              </Typography>
            </li>
            <li>
              <Typography fontSize={15} textAlign="justify">
                The Company shall have the right to terminate your service without notice,
                if the information given by you at a time of interview or in the application
                is found to be incorrect or in case of any serious misconduct or if reference
                check leads to an adverse report of your credentials.
              </Typography>
            </li>
          </Box>
        </Box>
      </A4Page>



      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box
          sx={{
            mt: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ================= TERMS ================= */}
          <Box
            component="ol"
            start={10}
            sx={{
              pl: 3,
              mb: 0,
              "& li": {
                marginBottom: "6px", // 🔑 controlled spacing
              },
              "& li::marker": {
                fontWeight: 500,
              },
            }}
          >
            {[
              "This appointment is subject to your being medically fit.",
              "The age of retirement will be 58 years.",
              "You will devote whole time and attention to your duties to promote the interests of the company and you will undertake herewith not to divulge or utilize any information which may become known to you in the course of your duties concerning the Company’s trade secret or affairs.",
              "You will be required to give an undertaking on confidentiality and non-competition as per the document given to you separately.",
              "You will not, without previous written permission of the Company, carry on any business or engage yourself in the services or employment of any other Company / Firm / Person.",
              "You will keep the Company informed of any change in your residential address.",
              "You will be required to attend to your work according to the exigencies and urgency of the various jobs from time to time and you will adhere to the requirements of the Company.",
              "You will be governed by the service conditions applicable to the employees of the Company as amended from time to time and you will abide by the same as well as by the terms of the agreement between yourself and the Company and also as per the undertaking on confidentiality and non-competition.",
              "The Company reserves the right to transfer you to any of our offices / factories / establishments / group companies, whether now in existence or to be set hereafter. However, your present posting will be at Pune.",
              "You are requested to sign and return the duplicate copy of this letter as a token of your acceptance of the above terms and conditions.",
            ].map((text, index) => (
              <li key={index}>
                <Typography
                  fontSize={15}
                  // textAlign="justify"
                  sx={{
                    margin: 0,        // 🔑 remove default margin
                    lineHeight: 1.4,  // 🔑 prevents fake gaps
                  }}
                >
                  {text}
                </Typography>
              </li>
            ))}
          </Box>

          {/* ================= SIGNATURE BLOCK (BOTTOM FIXED) ================= */}
          <Box sx={{ mt: 4 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              {/* LEFT */}
              <Box>
                <Typography fontSize={15}>Yours faithfully,</Typography>

                <Typography fontWeight={700} fontSize={14}>
                  For {company.name}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <img
                    src={company.signature}
                    alt="Signature"
                    style={{ height: 50, marginRight: 20 }}
                  />
                  <img
                    src={company.stamp}
                    alt="Stamp"
                    style={{ height: 80 }}
                  />
                </Box>

                <Typography fontWeight={600} fontSize={15}>
                  {company.hrName}
                </Typography>
                <Typography fontSize={15}>
                  Group Leader – HR Division Pune
                </Typography>
              </Box>

              {/* RIGHT */}
              <Box sx={{ minWidth: 240 }}>
                <Typography
                  fontWeight={600}
                  fontSize={13}
                  textAlign="center"
                  sx={{ mt: 4 }}
                >
                  I ACCEPT
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
                  <Typography fontSize={13}>Signature:</Typography>
                  <Box sx={{ width: 150, borderBottom: "1px solid #000" }} />
                </Box>

                <Typography fontSize={13} mt={2}>
                  Name: {data.employeeName}
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Typography fontSize={13}>Date:</Typography>
                  <Box sx={{ width: 150, borderBottom: "1px solid #000" }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 3 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Typography align="right" mb={2}>
          {formatDate(data.issueDate)}
        </Typography>

        <Typography mb={3}>
          <b>Ref:</b> RPB/VER1.1/PUN/PIMGUR/ADM-TEST/
          {String(data.employeeId).padStart(4, "0")}
        </Typography>

        {/* <Typography fontWeight={700} mb={2} >
          Salary Structure – Break Up
        </Typography> */}
        <Typography
          align="center"
          fontWeight={700}
          mb={3}
          sx={{
            // textDecoration: "underline",
            // textUnderlineOffset: "4px",   // 👈 space between text and line
            // textDecorationThickness: "1.5px", // 👈 bold underline
          }}
        >
          Salary Structure - Break Up

        </Typography>

        <Typography mb={0.5}>
          <b>Name:</b> {data.mrms} {data.employeeName}
        </Typography>
        <Typography mb={0.5}>
          <b>Designation:</b> {data.position}
        </Typography>
        <Typography mb={5}>
          <b>Date of Joining:</b> {formatDate(data.joiningDate)}
        </Typography>

        <Table
          sx={{
            width: "100%",
            border: "1px solid #000",
            "& th, & td": {
              border: "1px solid #000",
              padding: "6px",
              fontSize: "14px",
            },
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ff0000", color: "#fff" }}>
              <TableCell sx={{ color: "#fff" }}>
                <b>Salary Components</b>
              </TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}>
                <b>Per month (Rs.)</b>
              </TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}>
                <b>Per Annum (Rs.)</b>
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
              <TableCell sx={{ color: "#fff" }}>
                <b>Total Monthly Gross Salary</b>
              </TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}>
                <b>{formatCurrency(totalMonthly)}</b>
              </TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}>
                <b>{formatCurrency(totalAnnual)}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </A4Page>
    </>
  );
};

export default RPAppointment;
