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
/* 40%, 18%, 12%, 16%, 6%, 8% = 100% */

const generateSalaryBreakup = (annualCTC) => {
  const basic = round2(annualCTC * 0.4);
  const hra = round2(annualCTC * 0.18);
  const da = round2(annualCTC * 0.12);
  const special = round2(annualCTC * 0.16);
  const food = round2(annualCTC * 0.06);
  const misc = round2(annualCTC * 0.08);

  return [
    ["Basic Salary", basic / 12, basic],
    ["House Rent Allowance", hra / 12, hra],
    ["Dearness Allowance", da / 12, da],
    ["Special Allowance", special / 12, special],
    ["Food Allowance", food / 12, food],
    ["Miscellaneous Allowance ", misc / 12, misc],
  ];
};

/* ================= MAIN COMPONENT ================= */

const SmartSoftwareAppointment = ({ company, data }) => {
  if (!company || !data) return null;

  const firstName = data.employeeName?.split(" ")[0] || "";
  const annualCTC = Number(data.salary || 0);
  const salaryRows = generateSalaryBreakup(annualCTC);

  /* ================= FULL TERMS ================= */

  const terms = [
    <>Your Designation will be <strong>"{data.position}"</strong>.</>,
    <>Your total emoluments will be <strong>Rs. {(annualCTC / 100000).toFixed(2)}</strong> Lakhs per annum.</>,
    `Full details of your pay package are given in the enclosure to this letter. However, please note that, LTA is payable after completion of one year of service, subject to your getting confirmed in the service. If the company provides accommodation/transit accommodation, appropriate deductions will be made for the same, as per the rules applicable.`,
    `Whilst you are located abroad, the terms applicable will be intimated to you at the relevant point of time.`,
    `You shall be due for salary revision not before one year from your date of joining.`,
    `The Management reserves the right to change the different components/allowances in the total emoluments package, at its own discretion, at any time in future. However, your total monthly salary will be protected.`,
    `You will be on probation for a period of six months from the first of the calendar month following the date of your joining, after which you will be confirmed if your work is found satisfactory. The probation period can be extended at the discretion of the Company. You shall continue to be on probation, till your services are confirmed in writing by a letter of confirmation. In case your performance is not found satisfactory during such period of probation or extended period of probation and you shall be informed of the same in writing.`,
    `Your services are terminable with one month’s notice on either side. The Company may terminate your services with one month’s salary in lieu of notice period.`,
    `The Company shall have the right to terminate your service without notice, if the information given by you at a time of interview or in the application is found to be incorrect or in case of any serious misconduct or if reference check leads to an adverse report of your credentials.`,
    `This appointment is subject to your being medically fit.`,
    `The age of retirement will be 58 years.`,
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
<A4Page headerSrc={company.headerImage} footerSrc={company.footerImage}>
  <Box sx={{ mt: 0, fontSize: 13 }}>
    
    <Typography align="right" fontSize={13}>
      {formatDate(data.issueDate)}
    </Typography>

    <Typography mt={1} fontSize={13}>
      <strong>Ref:</strong> SSS/HR/APPT/
      {String(data.employeeId).padStart(4, "0")}
    </Typography>

    <Typography mt={2} fontSize={13}>
      {data.mrms} {data.employeeName}
      <br />
       Address:{data.address}
    </Typography>

    <Typography mt={2} fontSize={13}>
      Dear {firstName},
    </Typography>

    <Typography
      align="center"
      fontWeight={700}
      mt={3}
      fontSize={14}   // Slightly bigger heading
    >
      LETTER OF APPOINTMENT
    </Typography>

    <Typography mt={2} textAlign="justify" fontSize={13}>
      Further to your acceptance, we are pleased to appoint you with
      effect from <b>{formatDate(data.joiningDate)}</b> under the
      following terms and conditions:
    </Typography>

    <Box component="ol" sx={{ pl: 3, mt: 2 }}>
      {terms.slice(0, 10).map((t, i) => (
        <li key={i}>
          <Typography textAlign="justify" mb={1} fontSize={14.30}>
            {t}
          </Typography>
        </li>
      ))}
    </Box>

  </Box>
</A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Box component="ol" start={11} sx={{ pl: 3 }}>
          {terms.slice(10).map((t, i) => (
            <li key={i}>
              <Typography textAlign="justify" mb={1}>
                {t}
              </Typography>
            </li>
          ))}
        </Box>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography>Yours faithfully,</Typography>
            <Typography fontWeight={700}>
              For {company.name?.toUpperCase()}
            </Typography>

            <Box sx={{ mt: 1 }}>
              {company.signature && (
                <img src={company.signature} alt="signature" height={60} />
              )}
              {company.stamp && (
                <img src={company.stamp} alt="stamp" height={70} />
              )}
            </Box>

            <Typography mt={1}>{company.hrName}</Typography>
            <Typography fontSize={14.30}>HR Department</Typography>
          </Box>

          <Box>
            <Typography fontWeight={600}>I ACCEPT</Typography>
            <Typography mt={2}>Signature: ____________</Typography>
            <Typography mt={2}>Name: {data.employeeName}</Typography>
            <Typography mt={2}>Date: ____________</Typography>
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 3 ================= */}
      <A4Page headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Typography align="center" fontWeight={700} mb={3}>
          Salary Structure – Break Up
        </Typography>

        {/* Employee Info */}
        <Box sx={{ mb: 2 }}>
          <Typography><strong>Employee Name:</strong> {data.employeeName}</Typography>
          <Typography><strong>Designation:</strong> {data.position}</Typography>
          <Typography><strong>Date of Joining:</strong> {formatDate(data.joiningDate)}</Typography>
          <Typography><strong>Employee ID:</strong> {String(data.employeeId).padStart(4, "0")}</Typography>
        </Box>

        <Table
          sx={{
            border: "1px solid #000",
            "& th, & td": {
              border: "1px solid #000",
              fontSize: 14,
              padding: "6px",
            },
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#47ccde" }}>
              <TableCell><b>Salary Component</b></TableCell>
              <TableCell><b>Per Month (₹)</b></TableCell>
              <TableCell><b>Per Annum (₹)</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {salaryRows.map(([name, m, a], i) => (
              <TableRow key={i}>
                <TableCell>{name}</TableCell>
                <TableCell>{formatCurrency(m)}</TableCell>
                <TableCell>{formatCurrency(a)}</TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "#47ccde" }}>
              <TableCell><b>Gross Salary</b></TableCell>
              <TableCell><b>{formatCurrency(annualCTC / 12)}</b></TableCell>
              <TableCell><b>{formatCurrency(annualCTC)}</b></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </A4Page>
    </>
  );
};

export default SmartSoftwareAppointment;