import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
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

const tableCellStyle = {
  border: "1px solid #333",
  fontSize: 13,
};

/* ================= SALARY BREAKUP ================= */
/* 48%, 18%, 12%, 16%, 6% = 100% */

const generateSalaryBreakup = (annualCTC) => {
  const basic = round2(annualCTC * 0.48);
  const hra = round2(annualCTC * 0.18);
  const da = round2(annualCTC * 0.12);
  const special = round2(annualCTC * 0.16);
  const food = round2(annualCTC * 0.06);

  const salaryComponents = [
    { name: "Basic Salary", monthly: basic / 12, annual: basic },
    { name: "House Rent Allowance", monthly: hra / 12, annual: hra },
    { name: "Dearness Allowance", monthly: da / 12, annual: da },
    { name: "Special Allowance", monthly: special / 12, annual: special },
    { name: "Food Allowance", monthly: food / 12, annual: food },
  ];

  const totalAnnual = round2(
    salaryComponents.reduce((sum, row) => sum + row.annual, 0)
  );

  const totalMonthly = round2(totalAnnual / 12);

  // Fixed PF
  const monthlyPF = 3750;
  const annualPF = monthlyPF * 12;

  return {
    salaryComponents,
    monthlyPF,
    annualPF,
    totalMonthly,
    totalAnnual,
  };
};

/* ================= MAIN COMPONENT ================= */

const SmartSoftwareAppointment = ({ company, data }) => {
  if (!company || !data) return null;

  const firstName = data.employeeName?.split(" ")[0] || "";
  const annualCTC = Number(data.salary || 0);

  const {
    salaryComponents,
    monthlyPF,
    annualPF,
    totalMonthly,
    totalAnnual,
  } = generateSalaryBreakup(annualCTC);

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
      {/* PAGE 1 */}
      <A4Page headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Typography align="right">{formatDate(data.issueDate)}</Typography>

        <Typography mt={2}>
          {data.mrms} {data.employeeName}
        </Typography>

        <Typography mt={2}>Dear {firstName},</Typography>

        <Typography align="center" fontWeight={700} mt={3}>
          LETTER OF APPOINTMENT
        </Typography>

        <Box component="ol" sx={{ pl: 3, mt: 2 }}>
          {terms.slice(0, 10).map((t, i) => (
            <li key={i}>
              <Typography fontSize={14} textAlign="justify" mb={1}>
                {t}
              </Typography>
            </li>
          ))}
        </Box>
      </A4Page>

      {/* PAGE 2 */}
      <A4Page headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Box component="ol" start={11} sx={{ pl: 3, mt: 2 }}>
          {terms.slice(7).map((t, i) => (
            <li key={i}>
              <Typography fontSize={14} textAlign="justify" mb={1}>
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
            {company.signature && (
              <img src={company.signature} alt="signature" height={60} />
            )}
            <Typography mt={1}>{company.hrName}</Typography>
          </Box>

          <Box>
            <Typography fontWeight={600}>I ACCEPT</Typography>
            <Typography mt={2}>Signature: ____________</Typography>
            <Typography mt={2}>Name: {data.employeeName}</Typography>
            <Typography mt={2}>Date: ____________</Typography>
          </Box>
        </Box>
      </A4Page>

      {/* PAGE 3 – SALARY STRUCTURE */}
      <A4Page headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Typography align="center" fontWeight={700} mb={3}>
          Salary Structure – Break Up
        </Typography>

        <TableContainer>
          <Table size="small" sx={{ border: "1px solid #333" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#32a1c2ff" }}>
                <TableCell>Salary Components</TableCell>
                <TableCell align="center">Per Month (Rs.)</TableCell>
                <TableCell align="center">Per Annum (Rs.)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryComponents.map((row, i) => (
                <TableRow key={i}>
                  <TableCell sx={tableCellStyle}>{row.name}</TableCell>
                  <TableCell align="center" sx={tableCellStyle}>
                    {formatCurrency(row.monthly)}
                  </TableCell>
                  <TableCell align="center" sx={tableCellStyle}>
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell sx={tableCellStyle}>Provident Fund (PF)</TableCell>
                <TableCell align="center" sx={tableCellStyle}>
                  {formatCurrency(monthlyPF)}
                </TableCell>
                <TableCell align="center" sx={tableCellStyle}>
                  {formatCurrency(annualPF)}
                </TableCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: "#32a1c2ff" }}>
                <TableCell>Total Gross Salary</TableCell>
                <TableCell align="center">
                  {formatCurrency(totalMonthly)}
                </TableCell>
                <TableCell align="center">
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </A4Page>
    </>
  );
};

export default SmartSoftwareAppointment;