import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, } from "@mui/material";
import A4Page from "../../../../layout/A4Page";

/* ================= HELPERS ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    })
    : "";

const round2 = (n) => Number(Number(n || 0).toFixed(2));

const formatCurrency = (v) =>
  Number(v || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/* ================= SALARY BREAKUP ================= */
const generateSalaryBreakup = (annualCTC) => {
  const round2 = (n) => Number(n.toFixed(2));

  const basic   = round2(annualCTC * 0.40);
  const hra     = round2(annualCTC * 0.18);
  const da      = round2(annualCTC * 0.12);
  const special = round2(annualCTC * 0.16);
  const food    = round2(annualCTC * 0.06);
  const misc    = round2(annualCTC * 0.08);

  return [
    ["Basic ", basic / 12, basic],
    ["House Rent Allowance ", hra / 12, hra],
    ["Dearness Allowance ", da / 12, da],
    ["Special Allowance ", special / 12, special],
    ["Food Allowance ", food / 12, food],
    ["Misc. Allowance ", misc / 12, misc],
  ];
};

/* ================= MAIN COMPONENT ================= */
const QuickAppointment = ({ company, data }) => {
  if (!company || !data) return null;

  const firstName = data.employeeName?.split(" ")[0] || "";
  const annualCTC = Number(data.salary || 0);
  const salaryRows = generateSalaryBreakup(annualCTC);

  /* ================= TERMS ================= */
  const terms = [
    <> Your Designation will be <strong>"{data.position}"</strong>.   </>,
    <>Your total emoluments will be <strong>Rs. {annualCTC / 100000} </strong>Lakhs Per Annum.</>,
    `Full details of your pay package are given in the enclosure to this letter. However, please note that, LTA is payable after completion of one year of service, subject to your getting confirmed in the service. If the company provides accommodation/transit accommodation, appropriate deductions will be made for the same, as per the rules applicable. `,
    `Whilst you are located abroad, the terms applicable will be intimated to you at the relevant point of time.`,
    `You shall be due for salary revision not before one year from your date of joining.`,
    `The Management reserves the right to change the different components/allowances in the total emoluments package, at its own discretion, at any time in future. However, your total monthly salary will be protected.our services are terminable with one month’s notice on either side.`,
    `You will be on probation for a period of six months from the first of the calendar month following the date of your joining, after which you will be confirmed if your work is found satisfactory. The probation period can be extended at the discretion of the Company. You shall continue to be on probation, till your services are confirmed in writing by a letter of confirmation. In case your performance is not found satisfactory during such period of probation or extended period of probation and you shall be informed of the same in writing.`,
    `Your services are terminable with one month’s notice on either side. The Company may, at its discretion, choose to terminate your services with one month’s total salary in lieu of notice period`,
    `The Company shall have the right to terminate your service without notice, if the information given by you at a time of interview or in the application is found to be incorrect or in case of any serious misconduct or if reference check leads to an adverse report of your credentials.`,
    `This appointment is subject to your being medically fit`,
    `The age of retirement will be 58 years`,
    `You will devote whole time and attention to your duties to your duties to promote the interests of the company and you will undertake herewith not to divulge or utilize any information, which may become known to you in the course of your duties concerning the Company’s trade secret or affairs`,
    `You will be required to give an undertaking on confidentiality and non-competition as per the document given to you separately.`,
    `You will not, without previous written permission of the Company, carry on any business or engage yourself in the services or employment of any other Company/Firm/Person.`,
    `You will keep the Company informed of any change in your residential address.`,
    `You will be required to attend to your work according to the exigencies and urgency of the various jobs, from time to time and you will adhere to the requirements of the Company.`,
    `You will governed by the service conditions applicable to the employees of the Company as amended from time to time and you will abide by the same as well as by the terms of the agreement between yourself and the Company and also as per the undertaking on confidentiality and non-competition. `,
    `The Company reserves the right to transfer you to any of our offices/ factories/ establishments/ group companies, whether now in existence or to be set hereafter. However, your present posting will be at Pune.`,
    `You are requested to sign and return the duplicate copy of this letter as a token of your acceptance of the above terms and conditions.`,
  ];

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header}>

        <Box sx={{ mt: 2 }}>
          <Typography align="right" fontSize={14}>
            {formatDate(data.issueDate)}
          </Typography>

          <Typography fontSize={15} mt={1}>
            <strong>Ref:</strong> QMS\VER1.1\PUN\PIMSAU\ADM-CTRL/
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

          <Typography fontSize={15} mt={1}>
            Dear {firstName},
          </Typography>

          <Typography
            align="center"
            fontWeight={700}
            mt={2}
          // sx={{ textDecoration: "underline" }}
          >
            Letter of Appointment
          </Typography>

          <Typography mt={2} fontSize={15} textAlign="justify">
            Further to your acceptance offer dated,{" "}
            <b>{formatDate(data.issueDate)}</b>, we are pleased to appoint you in our organization with effect from  <b>{formatDate(data.joiningDate)} </b>,under the terms and conditions given below: -
          </Typography>

          <Box component="ol" sx={{ pl: 3, mt: 2 }}>
            {terms.slice(0, 11).map((t, i) => (
              <li key={i}>
                <Typography fontSize={14} textAlign="justify" mb={1}>
                  {t}
                </Typography>
              </li>
            ))}
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company.header} >
        <Box sx={{ mt: 1 }}>
          <Box component="ol" start={12} sx={{ pl: 3 }}>
            {terms.slice(8).map((t, i) => (
              <li key={i}>
                <Typography fontSize={14} textAlign="justify" mb={1}>
                  {t}
                </Typography>
              </li>
            ))}
          </Box>

          <Typography mt={2} fontSize={14}>
            Kindly sign and return the duplicate copy as acceptance.
          </Typography>

          {/* SIGNATURE BLOCK */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* COMPANY */}
            <Box>
              <Typography fontSize={15}>Yours faithfully,</Typography>
              <Typography fontWeight={700} fontSize={15}>
                For {company.name}
              </Typography>

              <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
                {company.signature && (
                  <img src={company.signature} alt="sign" height={55} />
                )}
                {company.stamp && (
                  <img src={company.stamp} alt="stamp" height={80} />
                )}
              </Box>

              <Typography fontWeight={600} mt={1}>
                {company.hrName}
              </Typography>
              <Typography fontSize={13}> <strong>Group Leader -Shared HR Services </strong>

              </Typography>
            </Box>

            {/* ACCEPTANCE */}
            <Box>
              <Typography fontWeight={600}>I ACCEPT</Typography>
              <Typography mt={1}>Signature: _____________</Typography>
              <Typography mt={2}>Name: {data.employeeName}</Typography>
              <Typography mt={1}>Date: _____________</Typography>
            </Box>
          </Box>
          {/* <Typography fontSize={15} mt={2}>
            <strong>Ref:</strong> DSS\VER1.1\PUN\PIMSAU\ADM-CTRL/
            {String(data.employeeId).padStart(4, "0")}
          </Typography> */}
        </Box>
      </A4Page>

      {/* ================= PAGE 3 ================= */}
      <A4Page headerSrc={company.header}>

           <Typography fontSize={15} mt={2}>
            <strong>Ref:</strong> QMS\VER1.1\PUN\PIMSAU\ADM-CTRL/
            {String(data.employeeId).padStart(4, "0")}
          </Typography>
        <Typography align="center" fontWeight={700} mb={3} mt={5}>
          Salary Structure – Break Up
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "150px 10px auto",
            rowGap: 1,
            fontSize: "14px",
            marginBottom: 5,
          }}
        >
          <Typography fontWeight="bold">Name</Typography>
          <Typography fontWeight="bold">:</Typography>
          <Typography>{data.mrms} {data.employeeName}</Typography>

          <Typography fontWeight="bold">Designation</Typography>
          <Typography fontWeight="bold">:</Typography>
          <Typography>{data.position}</Typography>

          <Typography fontWeight="bold">Date of Joining</Typography>
          <Typography fontWeight="bold">:</Typography>
          <Typography>{formatDate(data.joiningDate)}</Typography>

          <Typography fontWeight="bold" >EMP ID</Typography>
          <Typography fontWeight="bold">:</Typography>
          <Typography>{String(data.employeeId).padStart(4, "0")}</Typography>
        </Box>


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
            <TableRow sx={{ backgroundColor: "#39d6f2" }}>
              <TableCell><b>Salary Components</b></TableCell>
              <TableCell align="left"><b>Per Month</b></TableCell>
              <TableCell align="left"><b>Per Annum</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {salaryRows.map(([name, m, a], i) => (
              <TableRow key={i}>
                <TableCell>{name}</TableCell>
                <TableCell align="left">{formatCurrency(m)}</TableCell>
                <TableCell align="left">{formatCurrency(a)}</TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "#39d6f2" }}>
              <TableCell><b>Total</b></TableCell>
              <TableCell align="left">
                <b>{formatCurrency(annualCTC / 12)}</b>
              </TableCell>
              <TableCell align="left">
                <b>{formatCurrency(annualCTC)}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </A4Page>
    </>
  );
};

export default QuickAppointment;
