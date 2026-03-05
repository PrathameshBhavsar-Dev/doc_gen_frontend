import React from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { formatCurrency } from "../../../../../utils/salaryCalculations";
import SalaryStructureTable from "../../../../common/SalaryStructureTable";


const NimbjaAppointment = ({ company, data }) => {
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

  /* ================= SALARY LOGIC ================= */

  // 🔹 Round to whole number (no decimals)
  const round0 = (num) => Math.round(num);

  // ================= MONTHLY CTC =================
  const monthlyCTC = round0(Number(data.salary || 0));

  // ================= PERCENTAGE BREAKUP =================
  const basicMonthly = round0(monthlyCTC * 0.4);
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
    ["Bouqet Of Benefits", hraMonthly, hraAnnual],
    ["HRA", daMonthly, daAnnual],
    ["City Allowance", specialMonthly, specialAnnual],
    ["Superannuation Fund", foodMonthly, foodAnnual],
    ["Performance Bonus", miscMonthly, miscAnnual],
  ];

  // ================= TOTALS =================
  const totalMonthly = round0(salaryRows.reduce((sum, row) => sum + row[1], 0));

  const totalAnnual = round0(salaryRows.reduce((sum, row) => sum + row[2], 0));

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
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        {/* ================= CONTENT ================= */}
        <Box className="a4-content-only">
          {/* ================= DATE ================= */}
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

          {/* ================= REF ================= */}
          <Typography
            sx={{ mb: "6mm", fontSize: "11pt", fontFamily: "Bahnschrift" }}
          >
            <strong>
              Ref:NSS\VER1.1\PUN\PIMGUR\ADM-TEST\{data.employeeId}
            </strong>
          </Typography>

          {/* ================= ADDRESS ================= */}
          <Typography
            sx={{
              mb: "2mm",
              fontWeight: 600,
              fontSize: "11pt",
              fontFamily: "Bahnschrift",
              mt: "3mm",
            }}
          >
            {data.mrms} {data.employeeName}
          </Typography>
          <Typography
            sx={{
              mb: "10mm",
              mt: "-3mm",
              whiteSpace: "pre-line",
              fontSize: "11pt",
              fontFamily: "Bahnschrift",
            }}
          >
            {data.address}
          </Typography>

          {/* ================= SALUTATION ================= */}
          <Typography
            sx={{
              mb: "3mm",
              mt: "-5mm",
              fontSize: "11pt",
              fontFamily: "Bahnschrift",
            }}
          >
            Dear {data.employeeName?.split(" ")[0]},
          </Typography>

          {/* ================= TITLE ================= */}
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 600,
              textDecoration: "underline",
              mb: "5mm",
              fontSize: "12pt",
              fontFamily: "Bahnschrift",
            }}
          >
            Letter of Appointment
          </Typography>

          {/* INTRO */}
          <Typography
            sx={{
              mb: "5mm",
              textAlign: "justify",
              fontSize: "11pt",
              fontFamily: "Bahnschrift",
            }}
          >
            Further to your acceptance of our Letter of Offer dated{" "}
            <strong> {formatDate(data.issueDate)},</strong> we are pleased to
            appoint you in our organization with effect from
            <strong> {formatDate(data.joiningDate)},</strong> under the terms
            and conditions given below:
          </Typography>

          {/* NUMBERED TERMS */}
          <Box component="ol" sx={{ pl: "6mm", m: 0 }}>
            <li>
              <Typography
                sx={{ mb: "3mm", fontSize: "11pt", fontFamily: "Bahnschrift" }}
              >
                Your Designation will be <strong>{data.position}</strong>.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{ mb: "3mm", fontSize: "11pt", fontFamily: "Bahnschrift" }}
              >
                Your total emoluments will be{" "}
                <strong>Rs. {formatLakhsPerAnnum(totalAnnual)}</strong> Lakh per
                annum.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{
                  mb: "3mm",
                  textAlign: "justify",
                  fontSize: "11pt",
                  fontFamily: "Bahnschrift",
                }}
              >
                Full details of your pay package are given in the enclosure this
                letter. However, please
                <br />
                note that, LTA is payable after completion of one year of
                service, subject to your getting
              </Typography>
            </li>

            <li>
              <Typography
                sx={{ mb: "3mm", fontSize: "11pt", fontFamily: "Bahnschrift" }}
              >
                Whilst you are located abroad, the terms applicable will be
                intimated at the relevant point of time.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{ mb: "3mm", fontSize: "11pt", fontFamily: "Bahnschrift" }}
              >
                You shall be due for salary revision not before one year from
                your date of joining.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{
                  mb: "3mm",
                  textAlign: "justify",
                  fontSize: "11pt",
                  fontFamily: "Bahnschrift",
                }}
              >
                The Management reserves the right to change the different
                components/allowances in the total emoluments package at its
                discretion at any time in future. However, your total monthly
                salary will be protected.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{
                  mb: "3mm",
                  textAlign: "justify",
                  fontSize: "11pt",
                  fontFamily: "Bahnschrift",
                }}
              >
                You will be on probation for a period of six months from the
                first of the calendar month following your date of joining,
                after which you will be confirmed if your performance is found
                satisfactory. The probation period may be extended at the
                discretion of the Company.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{ mb: "3mm", fontSize: "11pt", fontFamily: "Bahnschrift" }}
              >
                Your services are terminable with one month’s notice on either
                side or salary in lieu thereof.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{
                  mb: "3mm",
                  textAlign: "justify",
                  fontSize: "11pt",
                  fontFamily: "Bahnschrift",
                }}
              >
                The Company shall have the right to terminate your service
                without notice, if the information furnished by you is found
                incorrect or in case of any serious misconduct.
              </Typography>
            </li>
          </Box>
        </Box>
      </A4Page>

      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        {/* ================= SECOND PAGE ================= */}
        <Box className="a4-content-only">
          <Box component="ol" start={10} sx={{ pl: "6mm", m: 0, mt: "-7mm" }}>
            <li>
              <Typography sx={{ mb: "3mm", fontFamily: "Bahnschrift" }}>
                This appointment is subject to your being medically fit.
              </Typography>
            </li>

            <li>
              <Typography sx={{ mb: "3mm", fontFamily: "Bahnschrift" }}>
                The age of retirement will be 58 years.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{
                  mb: "3mm",
                  textAlign: "justify",
                  fontFamily: "Bahnschrift",
                }}
              >
                You will devote whole time and attention to your duties and
                shall not divulge or utilize any information concerning the
                Company’s trade secrets or affairs.
              </Typography>
            </li>

            <li>
              <Typography sx={{ mb: "3mm", fontFamily: "Bahnschrift" }}>
                You will be required to give an undertaking on confidentiality
                and non-competition.
              </Typography>
            </li>

            <li>
              <Typography sx={{ mb: "3mm", fontFamily: "Bahnschrift" }}>
                You will not engage in any other employment without prior
                written permission of the Company.
              </Typography>
            </li>

            <li>
              <Typography sx={{ mb: "3mm", fontFamily: "Bahnschrift" }}>
                You will keep the Company informed of any change in your
                residential address.
              </Typography>
            </li>

            <li>
              <Typography sx={{ mb: "3mm", fontFamily: "Bahnschrift" }}>
                You will attend duties according to business exigencies.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{
                  mb: "3mm",
                  textAlign: "justify",
                  fontFamily: "Bahnschrift",
                }}
              >
                You will be governed by the service conditions applicable to
                employees as amended from time to time.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{
                  mb: "6mm",
                  textAlign: "justify",
                  fontFamily: "Bahnschrift",
                }}
              >
                The Company reserves the right to transfer you. However, your
                present posting will be at Pune.
              </Typography>
            </li>
          </Box>

          <Typography sx={{ mt: "8mm", fontFamily: "Bahnschrift" }}>
            You are requested to sign and return the duplicate copy of this
            letter as a token of your acceptance of the above terms and
            conditions.
          </Typography>
        </Box>
        <div style={{ marginTop: "10mm" }}>
          <div
            style={{
              marginTop: "2mm",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontFamily: "Bahnschrift" }}>
              <p>
                {/* ⬆️ reduced margin to lift content slightly */}
                Yours faithfully,
              </p>

              <p>
                {/* ⬆️ negative margin lifts company name upward */}
                <strong>For Nimbja Security Solution Pvt Ltd.</strong>
              </p>
            </div>
            <div style={{ textAlign: "center", fontFamily: "Bahnschrift" }}>
              <p>I ACCEPT</p>
              <Typography sx={{ fontFamily: "Bahnschrift", mt: "2mm" }}>
                Signature : ________________
              </Typography>
            </div>
          </div>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ mt: "6mm" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box
                    component="img"
                    src={company?.signature}
                    alt="Signature"
                    sx={{ width: 140, mt: "18mm", ml: "-2mm" }}
                  />
                </Grid>
                <Grid item>
                  <Box
                    component="img"
                    src={company?.stamp}
                    alt="Stamp"
                    sx={{ width: 110 }}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between", // ⬅️ LEFT & RIGHT alignment
                  alignItems: "flex-start",
                  mt: "2mm",
                  width: "100%",
                }}
              >
                {/* ================= LEFT — HR DETAILS ================= */}
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Bahnschrift",
                      fontWeight: "400",
                      fontSize: "4mm",
                    }}
                  >
                    {company?.hrName}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "Bahnschrift",
                      fontWeight: "400",
                      fontSize: "4mm",
                    }}
                  >
                    HR Manager-HR Services
                  </Typography>
                </Box>

                {/* ================= RIGHT — NAME & DATE ================= */}
                {/* ================= RIGHT — NAME & DATE (SAME COLUMN) ================= */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column", // 🔑 vertical stacking
                    alignItems: "flex-end", // 🔑 same right edge
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Bahnschrift",
                      textAlign: "right",
                      marginRight: "-3mm",
                    }}
                  >
                    Name: {data.employeeName}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "Bahnschrift",
                      mt: "2mm", // 🔑 small Word-like gap
                      textAlign: "left",
                      ml: "73mm",
                    }}
                  >
                    Date : _________________
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </A4Page>
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box className="a4-content-only">
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
          <SalaryStructureTable
            salaryRows={salaryRows}
            totalMonthly={totalMonthly}
            totalAnnual={totalAnnual}
            data={data}
            formatDate={formatDate}
          />
        </Box>
        {/* Signature Block */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 9 }}>
          <Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              {company?.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: 45 }}
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

export default NimbjaAppointment;
