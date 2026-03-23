// import React from 'react'
// import A4Page from '../../../../layout/A4Page'

// const NimbjaConfirmation = ({ company, data }) => {
//   return (
//     <>
//       <A4Page headerSrc={company.header} footerSrc={company.footer}></A4Page>
//       <A4Page headerSrc={company.header} footerSrc={company.footer}></A4Page>
//     </>
//   );
// }

// export default NimbjaConfirmation

import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { formatCurrency } from "../../../../../utils/salaryCalculations";
import SalaryStructureTable from "../../../../common/SalaryStructureTable";
import watermark from "../../../../../assets/images/Nimbja/nimbja_watermark.png";

const NimbjaConfirmation = ({ company = {}, data = {} }) => {
  console.log("FULL DATA:", data);
  console.log("CTC VALUES:", {
    newCTC: data.newCTC,
    salary: data.salary,
    ctc: data.ctc,
  });
  const firstName = data.employeeName?.split(" ")[0] || "";

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  const numberToWords = (num = 0) => {
    if (!num) return "Zero Rupees Only";

    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const inWords = (n) => {
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100)
        return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
      if (n < 1000)
        return (
          ones[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 ? " " + inWords(n % 100) : "")
        );
      if (n < 100000)
        return (
          inWords(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 ? " " + inWords(n % 1000) : "")
        );
      if (n < 10000000)
        return (
          inWords(Math.floor(n / 100000)) +
          " Lakh" +
          (n % 100000 ? " " + inWords(n % 100000) : "")
        );
      return inWords(Math.floor(n / 10000000)) + " Crore";
    };

    return `${inWords(Math.round(num))} Rupees Only`;
  };

  /* ================= SALARY LOGIC ================= */


  // ================= MONTHLY CTC =================
 const annualCTC = Number(
   data.newCTC || data.salary || data.ctc || data.totalSalary || 0,
 );


  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box
          component="img"
          src={watermark}
          alt="watermark"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            opacity: 0.4,
            zIndex: -1,
            pointerEvents: "none",
          }}
        />

        {/* CONTENT */}
        <Box
          className="a4-content-only"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            align="right"
            mb={3}
            sx={{ fontFamily: "Bahnschrift", marginTop: "-10mm", mb: "8mm" }}
          >
            {formatDate(data.issueDate)}
          </Typography>
          <Typography
            sx={{
              textAlign: "Center",
              marginTop: "-8mm",
              mb: "5mm",
              fontFamily: "Verdana",
              textDecoration: "underline",
              fontSize: "15px",
            }}
          >
            Confirmation Letter
          </Typography>
          <Typography mb={1} sx={{ fontFamily: "Bahnschrift" }}>
            <strong>Name :</strong> {data.employeeName}
          </Typography>
          <Typography b={2} sx={{ fontFamily: "Bahnschrift", mt: "-2mm" }}>
            <strong>Address:</strong> {data.address}
          </Typography>
          <Typography mb={3} sx={{ fontFamily: "Bahnschrift" }}>
            <strong>Subject :</strong> Letter of intent for continued services
            as <strong>{data.position}</strong>
          </Typography>
          <Typography mb={2} sx={{ fontFamily: "Bahnschrift" }}>
            Dear {firstName},
          </Typography>
          <Typography
            mb={3}
            textAlign="justify"
            sx={{ fontFamily: "Bahnschrift" }}
          >
            We are pleased to confirm your continued services at the position of{" "}
            <strong>{data.designation}</strong> with{" "}
            <strong>Nimbja Security Solutions Pvt. Ltd.</strong> with effective
            date <strong>{formatDate(data.effectiveDate)}</strong>, considering
            your performance and support towards the organization.
          </Typography>
          <Typography
            mb={2}
            textAlign="justify"
            sx={{ fontFamily: "Bahnschrift" }}
          >
            If there is any change in the date of joining, changes can be taken
            under consideration. Your total Gross salary will be Rs.{" "}
            <strong>{formatCurrency(annualCTC)}</strong> per year.
          </Typography>
          <Typography
            mb={2}
            textAlign="justify"
            sx={{ fontFamily: "Bahnschrift" }}
          >
            Subject to various deductions as per company and government policy.
            Kindly acknowledge the duplicate copy of this letter as an
            acceptance of this offer.
          </Typography>
          <Typography mb={2} sx={{ fontFamily: "Bahnschrift" }}>
            The roles and responsibilities and other terms and conditions of
            your employment will be specified in your letter of appointment.
          </Typography>
          <Typography mb={2} sx={{ fontFamily: "Bahnschrift" }}>
            We welcome you to Nimbja Security Solutions Pvt. Ltd. Family and
            hope it would be the beginning of a long and mutually beneficial
            association.
          </Typography>
          <Typography sx={{ fontFamily: "Bahnschrift", fontSize: "14pt" }}>
            for <strong>Nimbja Security Solutions Pvt. Ltd.</strong>
          </Typography>
          {/* Signature Block */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Box>
              <Box sx={{ display: "flex", gap: 3 }}>
                {company?.signature && (
                  <img
                    src={company.signature}
                    alt="Signature"
                    style={{ height: 50, marginTop: "4mm" }}
                  />
                )}
                {company?.stamp && (
                  <img
                    src={company.stamp}
                    alt="Stamp"
                    style={{ height: 100 }}
                  />
                )}
              </Box>
              <Typography mt={1} sx={{ fontFamily: "Bahnschrift" }}>
                {company.hrName}
              </Typography>
              <Typography sx={{ fontFamily: "Bahnschrift" }}>
                HR Relations Lead
              </Typography>
            </Box>

            <Box minWidth="250px" sx={{ mt: 13, fontFamily: "Bahnschrift" }}>
              <Typography sx={{ fontFamily: "Bahnschrift" }}>
                Signature: __________________
              </Typography>
              <Typography mt={2} sx={{ mt: 1.5, fontFamily: "Bahnschrift" }}>
                Candidate Name: {data.employeeName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box
          component="img"
          src={watermark}
          alt="watermark"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            opacity: 0.4,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* CONTENT */}
        <Box
          className="a4-content-only"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {" "}
          <Typography
            sx={{
              textAlign: "right",
              mb: "5mm",
              mt: "-12mm",
              fontSize: "11pt",
              fontFamily: "Bahnschrift",
            }}
          >
            {formatDate(data.issueDate)}
          </Typography>
          <Typography
            sx={{ mb: "6mm", fontSize: "11pt", fontFamily: "Bahnschrift" }}
          >
            <strong>
              Ref:NSS\VER1.1\PUN\PIMGUR\ADM-TEST\{data.employeeId}
            </strong>
          </Typography>
          {/* 🔥 ONLY THIS PART IS REPLACED */}
          <SalaryStructureTable ctc={annualCTC} />
        </Box>
        {/* Signature Block */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 9 }}>
          <Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              {company?.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: 45, marginTop: "8mm" }}
                />
              )}
              {company?.stamp && (
                <img src={company.stamp} alt="Stamp" style={{ height: 100 }} />
              )}
            </Box>
            <Typography mt={1} sx={{ fontFamily: "Bahnschrift" }}>
              {company.hrName}
            </Typography>
            <Typography sx={{ fontFamily: "Bahnschrift" }}>
              HR Relations Lead
            </Typography>
          </Box>

          <Box minWidth="250px" sx={{ mt: 13, fontFamily: "Bahnschrift" }}>
            <Typography sx={{ fontFamily: "Bahnschrift" }}>
              Signature: __________________
            </Typography>
            <Typography mt={2} sx={{ mt: 1.5, fontFamily: "Bahnschrift" }}>
              Candidate Name: {data.employeeName}
            </Typography>
          </Box>
        </Box>
      </A4Page>
    </>
  );
};

export default NimbjaConfirmation;
