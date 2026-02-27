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
const generateSalaryBreakup = (annualCTC) => {
  const basic = round2(annualCTC * 0.34);
  const hra = round2(annualCTC * 0.2);
  const da = round2(annualCTC * 0.035);
  const special = round2(annualCTC * 0.345);
  const food = round2(annualCTC * 0.06);

  const misc = round2(
    annualCTC - (basic + hra + da + special + food)
  );

  return [
    ["Basic Salary", basic / 12, basic],
    ["House Rent Allowance (HRA)", hra / 12, hra],
    ["Dearness Allowance (DA)", da / 12, da],
    ["Special Allowance", special / 12, special],
    ["Food Allowance", food / 12, food],
    ["Miscellaneous Allowance", misc / 12, misc],
  ];
};

/* ================= MAIN COMPONENT ================= */
const SmartSoftwareAppointment = ({ company, data }) => {
  if (!company || !data) return null;

  const firstName = data.employeeName?.split(" ")[0] || "";
  const annualCTC = Number(data.salary || 0);
  const salaryRows = generateSalaryBreakup(annualCTC);

  /* ================= TERMS & CONDITIONS ================= */
 const terms = [
    <> Your Designation will be <strong>"{data.position}"</strong>.   </>,
    <>Your total emoluments will be <strong>Rs. {annualCTC / 100000} </strong>Lakhs per annum.</>,
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
      <A4Page headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Box sx={{ mt: -4 }}>
          <Typography align="right" fontSize={14}>
            {formatDate(data.issueDate)}
          </Typography>

          <Typography fontSize={14} mt={1}>
            <strong>Ref:</strong> SSS/HR/APPT/
            {String(data.employeeId).padStart(4, "0")}
          </Typography>

          <Typography fontSize={14} mt={2}>
            {data.mrms} {data.employeeName}
            <br />
            <span style={{ maxWidth: 300, display: "inline-block" }}>
              {data.address}
            </span>
          </Typography>

          <Typography fontSize={14} mt={2}>
            Dear {firstName},
          </Typography>

          <Typography align="center" fontWeight={700} mt={3} mb={2}>
            LETTER OF APPOINTMENT
          </Typography>

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
      <A4Page headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Box sx={{ mt: 2 }}>
          <Box component="ol" start={9} sx={{ pl: 3 }}>
            {terms.slice(8).map((term, index) => (
              <li key={index}>
                <Typography fontSize={14} textAlign="justify" mb={1}>
                  {term}
                </Typography>
              </li>
            ))}
          </Box>

          <Typography fontSize={14} mt={2}>
            Kindly sign and return the duplicate copy of this letter as acceptance
            of the above terms and conditions.
          </Typography>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            {/* COMPANY SIGN */}
            <Box>
              <Typography fontSize={15}>Yours faithfully,</Typography>
              <Typography fontWeight={700} fontSize={15}>
                For {company.name.toUpperCase()}
              </Typography>

              <Box sx={{ display: "flex", gap:1, mt: 1 }}>
                {company.signature && (
                  <img src={company.signature} alt="signature" height={65} />
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
              <Typography mt={1}>Signature: ______________</Typography>
              <Typography mt={4}>Name: {data.employeeName}</Typography>
              <Typography mt={1}>Date: ______________</Typography>
            </Box>
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 3 ================= */}
      <A4Page headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Typography align="center" fontWeight={700} mb={3}>
          Salary Structure – Break Up
        </Typography>

        {/* EMP INFO */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "150px 10px auto",
            rowGap: 1,
            fontSize: 14,
          }}
        >
          <Typography fontWeight="bold">Employee Name</Typography>
          <Typography>:</Typography>
          <Typography>{data.mrms} {data.employeeName}</Typography>

          <Typography fontWeight="bold">Designation</Typography>
          <Typography>:</Typography>
          <Typography>{data.position}</Typography>

          <Typography fontWeight="bold">Date of Joining</Typography>
          <Typography>:</Typography>
          <Typography>{formatDate(data.joiningDate)}</Typography>

          <Typography fontWeight="bold">Employee ID</Typography>
          <Typography>:</Typography>
          <Typography>{String(data.employeeId).padStart(4, "0")}</Typography>
        </Box>

        {/* SALARY TABLE */}
        <Table
          sx={{
            mt: 3,
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
