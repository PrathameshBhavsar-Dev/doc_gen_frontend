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

const DevconsAppointmentLetter = ({ company, data }) => {
  if (!company || !data) return null;

  /* ================= HELPERS ================= */
  const firstName = data.employeeName?.split(" ")[0] || "";

  
  const round2 = (num) => Number(Number(num).toFixed(2));


  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

      const formatLakhsPerAnnum = (amount) => {
    if (!amount || isNaN(amount)) return "";

    const lakhs = amount / 100000;

    return `${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(1)} Lakhs per annum`;
  };

  /* ================= SALARY LOGIC ================= */
  const round0 = (num) => Math.round(num);

// // ===== Static PF =====
// const pfMonthly = 3750;
// const pfAnnual = round2(pfMonthly * 12);

// // ===== Fixed % Components =====
// const basicAnnual = round2(annualCTC * 0.34);
// const hraAnnual = round2(annualCTC * 0.20);
// const daAnnual = round2(annualCTC * 0.035);
// const foodAnnual = round2(annualCTC * 0.06);

// // ===== Special = Balance Amount =====
// const specialAnnual = round2(
//   annualCTC -
//     (basicAnnual + hraAnnual + daAnnual + foodAnnual + pfAnnual)
// );

// // ===== Monthly Values =====
// const basicMonthly = round2(basicAnnual / 12);
// const hraMonthly = round2(hraAnnual / 12);
// const daMonthly = round2(daAnnual / 12);
// const specialMonthly = round2(specialAnnual / 12);
// const foodMonthly = round2(foodAnnual / 12);

// // ===== Totals (Exact CTC Match) =====
// const totalMonthly = round2(annualCTC / 12);
// const totalAnnual = annualCTC;


// const salaryRows = [
//   ["Basic", basicMonthly, basicAnnual],
//   ["House Rent Allowance", hraMonthly, hraAnnual],
//   ["Dearness Allowance", daMonthly, daAnnual],
//   ["Special Allowance", specialMonthly, specialAnnual],
//   ["Food Allowance", foodMonthly, foodAnnual],
//   ["Provident Fund (PF)", pfMonthly, pfAnnual],
// ];

// ================= MONTHLY CTC =================
const monthlyCTC = round0(Number(data.salary || 0));

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
    
     {/* ========================= PAGE 1 ========================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <Box sx={{ mt: 2 }}>

    <Typography align="right" fontSize={15}>
      {formatDate(data.issueDate)}
    </Typography>

    <Typography fontSize={15} mt={2}>
      <strong>Ref:</strong> DSS\VER1.1\PUN\PIMSAU\ADM-CTRL/
      {String(data.employeeId).padStart(4, "0")}
    </Typography>

    <Typography fontSize={15} mt={2}>
  {data.mrms} {data.employeeName}
  <br />
  <span
    style={{
      display: "inline-block",
      maxWidth: "250px", // 🔹 adjust width as needed
      wordWrap: "break-word",
      whiteSpace: "normal"
    }}
  >
    {data.address}
  </span>
</Typography>


    <Typography mt={2} fontSize={15}>
      Dear {firstName},
    </Typography>

    <Typography
      align="center"
      fontWeight={700}
      mt={1}
      sx={{
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        textDecorationThickness: "1.5px",
      }}
    >
      Letter of Appointment
    </Typography>

    <Typography mt={2} fontSize={15} textAlign="justify">
      Further to your acceptance of our Letter of Offer dated{" "}
      <b>{formatDate(data.issueDate)}</b>, we are pleased to appoint you in our
      organization with effect from{" "}
      <b>{formatDate(data.joiningDate)}</b>, under the terms and conditions
      given below:
    </Typography>

    <Box component="ol" sx={{ pl: 3, mt: 1 }}>
  <li>
    <Typography fontSize={14}>
      Your Designation will be <b>“{data.position}”</b>.
    </Typography>
  </li>

  <li>
    <Typography fontSize={14}>
      Your total emoluments will be <b>{formatLakhsPerAnnum(totalAnnual)}</b>.
    </Typography>
  </li>

  <li>
    <Typography fontSize={14}>
      Full details of your pay package are given in the enclosure to this letter.
      However, please note that, LTA is payable after completion of one year of
      service, subject to your getting confirmed in the service. If the company
      provides accommodation/transit accommodation, appropriate deductions will
      be made for the same, as per the rules applicable.
    </Typography>
  </li>

  <li>
    <Typography fontSize={14}>
      Whilst you are located abroad, the terms applicable will be intimated at
      the relevant point of time.
    </Typography>
  </li>

  <li>
    <Typography fontSize={14}>
      You shall be due for salary revision not before one year from your date of
      joining.
    </Typography>
  </li>

  <li>
    <Typography fontSize={14}>
      The Management reserves the right to change the different
      components/allowances in the total emoluments package, at its own
      discretion, at any time in future. However, your total monthly salary will
      be protected.
    </Typography>
  </li>

  <li>
    <Typography fontSize={14}>
      You will be on probation for a period of six months from the first of the
      calendar month following the date of your joining, after which you will be
      confirmed if your work is found satisfactory. The probation period can be
      extended at the discretion of the Company.
    </Typography>
  </li>

  <li>
    <Typography fontSize={14}>
      Your services are terminable with one month’s notice on either side. The
      Company may, at its discretion, choose to terminate your services with one
      month’s total salary in lieu of notice period.
    </Typography>
  </li>

  <li>
    <Typography fontSize={14}>
      The Company shall have the right to terminate your service without notice,
      if the information given by you at a time of interview or in the application
      is found to be incorrect or in case of any serious misconduct or if
      reference check leads to an adverse report of your credentials.
    </Typography>
  </li>
</Box>


  </Box>
</A4Page>

      {/* ========================= PAGE 2 ========================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}
      >
  <Box
    sx={{
      mt: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* ================= TERMS (10–18) ================= */}
    <Box component="ol" start={10} sx={{ pl: 3 }}>
      {[
        "This appointment is subject to your being medically fit",
        "The age of retirement will be 58 years",
        "You will devote whole time and attention to your duties to promote the interests of the company and you will undertake herewith not to divulge or utilize any information, which may become known to you in the course of your duties concerning the Company’s trade secret or affairs",
        "You will be required to give an undertaking on confidentiality and non-competition as per the document given to you separately.",
        "You will not, without previous written permission of the Company, carry on any business or engage yourself in the services or employment of any other Company / Firm / Person.",
        "You will keep the Company informed of any change in your residential address.",
        "You will be required to attend to your work according to the exigencies and urgency of the various jobs, from time to time and you will adhere to the requirements of the Company.",
        "You will be governed by the service conditions applicable to the employees of the Company as amended from time to time and you will abide by the same as well as by the terms of the agreement between yourself and the Company and also as per the undertaking on confidentiality and non-competition.",
        "The Company reserves the right to transfer you to any of our offices / factories / establishments / group companies, whether now in existence or to be set hereafter. However, your present posting will be at Pune.",
      ].map((text, index) => (
        <li key={index}>
          <Typography
            fontSize={14}
            mb={1}
            // textAlign="justify"
          >
            {text}
          </Typography>
        </li>
      ))}
    </Box>

    {/* ================= ACCEPTANCE LINE ================= */}
    <Typography mt={2} fontSize={14} textAlign="justify">
      You are requested to sign and return the duplicate copy of this letter as a
      token of your acceptance of the above terms and conditions.
    </Typography>

    {/* ================= SIGNATURE (BOTTOM LOCKED) ================= */}
    <Box sx={{ mt:4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* LEFT SIDE */}
        <Box>
          <Typography fontSize={15}>Yours faithfully,</Typography>

          <Typography fontWeight={700} fontSize={15}>
            For {company.name}
          </Typography>

          <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
            {company.signature && (
              <img
                src={company.signature}
                alt="Signature"
                style={{ height: 60 }}
              />
            )}
            {company.stamp && (
              <img
                src={company.stamp}
                alt="Stamp"
                style={{ height: 85 }}
              />
            )}
          </Box>

          <Typography fontWeight={600} fontSize={15} mt={1}>
            {company.hrName}
          </Typography>
          <Typography fontSize={14}>HR Relations Lead</Typography>
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ minWidth: 250}}>
          <Typography fontWeight={600} fontSize={15} mt={1} sx={{ minWidth: 250, textAlign: "center"}} >
            I ACCEPT
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Typography fontSize={14}>Signature:</Typography>
            <Box sx={{ width: 150, borderBottom: "1px solid #000" }} />
          </Box>

          <Typography fontSize={14} mt={2}>
            Name: {data.employeeName}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Typography fontSize={14}>Date:</Typography>
            <Box sx={{ width: 150, borderBottom: "1px solid #000" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
</A4Page>

      {/* ========================= PAGE 3 ========================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Typography align="right" mb={2}>
          {formatDate(data.issueDate)}
        </Typography>

        <Typography
          align="center"
          fontWeight={700}
          mb={3}
        >
          Salary Structure – Break Up
        </Typography>

        <Typography mb={0.5}>
          <b>Name:</b> {data.mrms} {data.employeeName}
        </Typography>
        <Typography mb={0.5}>
          <b>Designation:</b> {data.position}
        </Typography>
        <Typography mb={2}>
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
            <TableRow sx={{ backgroundColor: "#f4c430" }}>
              <TableCell>
                <b>Salary Components</b>
              </TableCell>
              <TableCell align="right">
                <b>Per month (Rs.)</b>
              </TableCell>
              <TableCell align="right">
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

  <TableRow sx={{ backgroundColor: "#f4c430" }}>
    <TableCell>
      <b>Total Monthly Gross Salary</b>
    </TableCell>
    <TableCell align="right">
      <b>{formatCurrency(totalMonthly)}</b>
    </TableCell>
    <TableCell align="right">
      <b>{formatCurrency(totalAnnual)}</b>
    </TableCell>
  </TableRow>
</TableBody>

        </Table>
      </A4Page>
    </>
  );
};

export default DevconsAppointmentLetter;
