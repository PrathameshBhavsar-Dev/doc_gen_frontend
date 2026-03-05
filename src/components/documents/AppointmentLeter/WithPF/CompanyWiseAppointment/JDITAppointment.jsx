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

/* ================= SALARY BREAKUP ================= */
const generateSalaryBreakup = (monthlyCTC) => {
  const round0 = (num) => Math.round(Number(num || 0));

  // 🔹 Round monthly CTC
  const monthly = round0(monthlyCTC);

  // 🔹 PF (Static)
  const pfMonthly = 3750;
  const pfAnnual = pfMonthly * 12;

  // 🔹 Updated Percentages
  // 40% Basic + 8% Misc shifted into Basic
  const basicMonthly = round0(monthly * 0.48);
  const hraMonthly = round0(monthly * 0.18);
  const daMonthly = round0(monthly * 0.12);
  const specialMonthly = round0(monthly * 0.16);
  const foodMonthly = round0(monthly * 0.06);

  // 🔹 Annual
  const basicAnnual = basicMonthly * 12;
  const hraAnnual = hraMonthly * 12;
  const daAnnual = daMonthly * 12;
  const specialAnnual = specialMonthly * 12;
  const foodAnnual = foodMonthly * 12;

  const salaryComponents = [
    { name: "Basic", monthly: basicMonthly, annual: basicAnnual },
    { name: "House Rent Allowance", monthly: hraMonthly, annual: hraAnnual },
    { name: "Dearness Allowance", monthly: daMonthly, annual: daAnnual },
    { name: "Special Allowance", monthly: specialMonthly, annual: specialAnnual },
    { name: "Food Allowance", monthly: foodMonthly, annual: foodAnnual },
    { name: "Provident Fund (PF)", monthly: pfMonthly, annual: pfAnnual },
  ];

  const totalMonthly =
    basicMonthly +
    hraMonthly +
    daMonthly +
    specialMonthly +
    foodMonthly 
    

  const totalAnnual = totalMonthly * 12;

  return {
    salaryComponents,
    totalMonthly,
    totalAnnual,
  };
}
  

const tableCellStyle = { border: "1px solid #333" };

/* ================= MAIN COMPONENT ================= */
const JDITAppointment = ({ company, data }) => {
  if (!company || !data) return null;

  const firstName = data.employeeName?.split(" ")[0] || "";
  // const annualCTC = Number(data.salary || 0);
  // const salaryRows = generateSalaryBreakup(annualCTC);


    const monthlyCTC = Number(data.salary || 0);

const {
  salaryComponents,
  totalMonthly,
  totalAnnual,
} = generateSalaryBreakup(monthlyCTC);



  /* ================= TERMS ================= */
  const terms = [
    <> Your Designation will be <strong>"{data.position}"</strong>.   </>,
    <>Your total emoluments will be <strong>Rs. {totalAnnual / 100000} </strong>Lakhs per annum.</>,
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
      <A4Page
        headerSrc={company.headerImage}
        footerSrc={company.footer}>
        <Box sx={{ mt: -5 }}>
          <Typography align="right" fontSize={14} >
            {formatDate(data.issueDate)}
          </Typography>

          <Typography fontSize={14} >
            <strong>Ref:</strong> JDIT/HR/APPT/
            {String(data.employeeId).padStart(4, "0")}
          </Typography>

          <Typography fontSize={14} >
            {data.mrms} {data.employeeName}
            <br />
            <span style={{ maxWidth: 280, display: "inline-block" }}>
              {data.address}
            </span>
          </Typography>

          <Typography fontSize={14} mt={1}>
            Dear {firstName},
          </Typography>

          <Typography
            align="center"
            fontWeight={700}
            mt={2}
            mb={2}
          >
            LETTER OF APPOINTMENT
          </Typography>

          {/* ✅ FIXED SENTENCE */}
         
         <Typography mt={2} fontSize={15} textAlign="justify">
                     Further to your acceptance, Offer dated {" "}
                     <b>{formatDate(data. issueDate)}</b>, we are pleased to appoint you in our organization with effect from  <b>{formatDate(data.joiningDate)} </b>,under the terms and conditions given below: -
                   </Typography>

          <Box component="ol" start={1} sx={{ pl: 3, mt: 1 }}>
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
      <A4Page headerSrc={company.headerImage}
        footerSrc={company.footer}>
        <Box sx={{ mt: 2 }}>
          <Box component="ol" start={12} sx={{ pl: 3 }}>
            {terms.slice(8).map((t, i) => (
              <li key={i}>
                <Typography fontSize={14} textAlign="justify" mb={1}>
                  {t}
                </Typography>
              </li>
            ))}
          </Box>
          <Typography fontSize={14}>
            Kindly sign and return the duplicate copy as acceptance.
          </Typography>

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
                {company.   sign && (
                  <img src={company.sign} alt="sign" height={45} />
                )}
                {company.stamp && (
                  <img src={company.stamp} alt="stamp" height={80} />
                )}
              </Box>

              <Typography fontWeight={600} mt={-3}>
                {company.hrName}
              </Typography>
              <Typography fontSize={13}>
                <strong>HR Department</strong>
              </Typography>
            </Box>

            {/* ACCEPTANCE */}
            <Box>
              <Typography fontWeight={600}>I ACCEPT</Typography>
              <Typography mt={1}>Signature: _____________</Typography>
              <Typography mt={4}>Name: {data.employeeName}</Typography>
              <Typography mt={1}>Date: _____________</Typography>
              {/* <Typography align="right" fontSize={14}>
                {formatDate(data.issueDate)}
              </Typography> */}

            </Box>
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 3 ================= */}
      <A4Page
        headerSrc={company.headerImage}
        footerSrc={company.footer}>
           <Typography align="right" fontSize={14} marginTop={2}>
                {formatDate(data.issueDate)}
              </Typography>
        <Typography align="center" fontWeight={700} mb={3}>
          Salary Structure - Break Up
        </Typography>

        {/* INFO BLOCK */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "150px 10px auto",
            rowGap: 1,
            fontSize: "14px",
            mb: "8mm" 
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

          <Typography fontWeight="bold">Employee ID</Typography>
          <Typography fontWeight="bold">:</Typography>
          <Typography>{String(data.employeeId).padStart(4, "0")}</Typography>
        </Box>

        {/* SALARY TABLE */}
       <TableContainer sx={{ mb: "4mm" }}>
  <Table
    size="small"
    sx={{
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid #000",
      "& .MuiTableCell-root": {
        border: "1px solid #000",
        fontSize: "10pt",
        padding: "6px 8px",
      },
    }}
  >
    {/* ================= HEADER ================= */}
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: "#000",
          "& .MuiTableCell-root": {
            color: "#fff !important",
            fontWeight: 600,
          },
        }}
      >
        <TableCell align="left">
          Salary Components
        </TableCell>

        <TableCell align="center">
          Per month (Rs.)
        </TableCell>

        <TableCell align="center">
          Per Annum (Rs.)
        </TableCell>
      </TableRow>
    </TableHead>

    {/* ================= BODY ================= */}
    <TableBody>
      {salaryComponents.map((row, i) => (
        <TableRow
          key={i}
          sx={{
            backgroundColor: "#e6e6e6",
          }}
        >
          <TableCell align="left">
            {row.name}
          </TableCell>

          <TableCell align="right">
            {formatCurrency(row.monthly)}
          </TableCell>

          <TableCell align="right">
            {formatCurrency(row.annual)}
          </TableCell>
        </TableRow>
      ))}

      {/* ================= TOTAL ROW ================= */}
      <TableRow
        sx={{
          backgroundColor: "#000",
          "& .MuiTableCell-root": {
            color: "#fff !important",
            fontWeight: 600,
          },
        }}
      >
        <TableCell align="left">
          Total Monthly Gross Salary
        </TableCell>

        <TableCell align="right">
          {formatCurrency(totalMonthly)}
        </TableCell>

        <TableCell align="right">
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

export default JDITAppointment;


