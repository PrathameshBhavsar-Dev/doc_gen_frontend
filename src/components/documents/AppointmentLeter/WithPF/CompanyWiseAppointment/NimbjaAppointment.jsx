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
import watermark from "../../../../../assets/images/Nimbja/nimbja_watermark.png";

// ================= TABLE CELL STYLES =================
const NimbjaAppointment = ({ company, data }) => {
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

    return `${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(1)} Lakhs Per Annum`;
  };

  
  // ================= SALARY TABLE =================
const annualCTC = Number(data.salary || 0);
  return (
    <>
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box
          component="img"
          src={watermark}
          alt="watermark"
          sx={{
            position: "absolute",
            height: "40%",
            top: "53%",
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
          {/* ================= DATE ================= */}
          <Typography
            sx={{
              textAlign: "right",
              mb: "5mm",
              mt: "-5mm",
              fontSize: "11pt",
              fontFamily: "Bahnschrift",
            }}
          >
            {formatDate(data.issueDate)}
          </Typography>

          {/* ================= REF ================= */}
          <Typography
            sx={{ mb: "mm", fontSize: "11pt", fontFamily: "Bahnschrift",mt:"-2mm" }}
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
              fontSize: "12pt",
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
              fontSize: "12pt",
              fontFamily: "Bahnschrift",
            }}
          >
            {data.address}
          </Typography>

          {/* ================= SALUTATION ================= */}
          <Typography
            sx={{
              mb: "mm",
              mt: "-7mm",
              fontSize: "12pt",
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
              textDecoration: "underline",
            }}
          >
            Letter of Appointment
          </Typography>

          {/* INTRO */}
          <Typography
            sx={{
              mb: "3mm",
              textAlign: "justify",
              fontSize: "12pt",
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
                sx={{ mb: "3mm", fontSize: "12pt", fontFamily: "Bahnschrift" }}
              >
                1. Your Designation will be <strong>{data.position}</strong>.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{ mb: "3mm", fontSize: "12pt", fontFamily: "Bahnschrift" }}
              >
                2. Your total emoluments will be{" "}
                <strong>Rs. {formatCurrency(annualCTC)}/-</strong> per annum
              </Typography>
            </li>

            <li>
              <Typography
                sx={{
                  mb: "3mm",
                  textAlign: "justify",
                  fontSize: "12pt",
                  fontFamily: "Bahnschrift",
                }}
              >
                3. Full details of your pay package are given in the enclosure
                this letter. However, please
                <br />
                note that, LTA is payable after completion of one year of
                service, subject to your getting
              </Typography>
            </li>

            <li>
              <Typography
                sx={{ mb: "3mm", fontSize: "12pt", fontFamily: "Bahnschrift" }}
              >
                4. Whilst you are located abroad, the terms applicable will be
                intimated at the relevant point of time.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{ mb: "3mm", fontSize: "12pt", fontFamily: "Bahnschrift" }}
              >
                5. You shall be due for salary revision not before one year from
                your date of joining.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{
                  mb: "3mm",
                  textAlign: "justify",
                  fontSize: "12pt",
                  fontFamily: "Bahnschrift",
                }}
              >
                6. The Management reserves the right to change the different
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
                  fontSize: "12pt",
                  fontFamily: "Bahnschrift",
                }}
              >
                7. You will be on probation for a period of six months from the
                first of the calendar month following your date of joining,
                after which you will be confirmed if your performance is found
                satisfactory. The probation period may be extended at the
                discretion of the Company.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{ mb: "3mm", fontSize: "12pt", fontFamily: "Bahnschrift" }}
              >
                8. Your services are terminable with one month’s notice on
                either side or salary in lieu of notice period.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{
                  mb: "3mm",
                  textAlign: "justify",
                  fontSize: "12pt",
                  fontFamily: "Bahnschrift",
                }}
              >
                9. The Company shall have the right to terminate your service
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
              <Typography
                sx={{ mb: "2mm", fontFamily: "Bahnschrift", mt: "-12mm" }}
              >
                10. This appointment is subject to your being medically fit.
              </Typography>
            </li>

            <li>
              <Typography sx={{ mb: "2mm", fontFamily: "Bahnschrift" }}>
                11. The age of retirement will be 58 years.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{
                  mb: "2mm",
                  textAlign: "justify",
                  fontFamily: "Bahnschrift",
                }}
              >
                12. You will devote whole time and attention to your duties
                promote the interests of the company and you will undertake
                herewith not to divulge or utilize any information, which may
                become known to you in the course of your duties concerning the
                Company’s trade secret or affairs
              </Typography>
            </li>
            <Box
              component="img"
              src={watermark}
              alt="watermark"
              sx={{
                position: "absolute",
                height: "40%",
                top: "48%",
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
            ></Box>
            <li>
              <Typography sx={{ mb: "2mm", fontFamily: "Bahnschrift" }}>
                13. You will be required to give an undertaking on
                confidentiality and non-competition as per the document given to
                you separately.
              </Typography>
            </li>

            <li>
              <Typography sx={{ mb: "2mm", fontFamily: "Bahnschrift" }}>
                14. You will not, without previous written permission of the
                Company, carry on any business or engage yourself in the
                services or employment of any other Company/Firm/Person.
              </Typography>
            </li>

            <li>
              <Typography sx={{ mb: "2mm", fontFamily: "Bahnschrift" }}>
                15. You will keep the Company informed of any change in your
                residential address.
              </Typography>
            </li>

            <li>
              <Typography sx={{ mb: "2mm", fontFamily: "Bahnschrift" }}>
                16. You will be required to attend to your work according to the
                exigencies and urgency of the various jobs, from time to time
                and you will adhere to the requirements of the Company.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{
                  mb: "2mm",
                  textAlign: "justify",
                  fontFamily: "Bahnschrift",
                }}
              >
                17. You will governed by the service conditions applicable to
                the employees of the Company as amended from time to time and
                you will abide by the same as well as by the terms of the
                agreement between yourself and the Company and also as per the
                undertaking on confidentiality and non-competition.
              </Typography>
            </li>

            <li>
              <Typography
                sx={{
                  mb: "2mm",
                  textAlign: "justify",
                  fontFamily: "Bahnschrift",
                }}
              >
                18. The Company reserves the right to transfer you to any of our
                offices/factories/establishments/group companies, whether now in
                existence or to be set hereafter. However, your present posting
                will be at Pune.
              </Typography>
            </li>
          </Box>

          <Typography sx={{ mt: "2mm", fontFamily: "Bahnschrift", mb: "2mm" }}>
            You are requested to sign and return the duplicate copy of this
            letter as a token of your acceptance of the above terms and
            conditions.
          </Typography>
        </Box>
        <div style={{ marginTop: "10mm" }}>
          <div
            style={{
              marginTop: "-5mm",
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
                For<strong> Nimbja Security Solution Pvt Ltd.</strong>
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
                    sx={{ width: 185, mt: "-2mm", ml: "-2mm" }}
                  />
                </Grid>
                <Grid item>
                  <Box
                    component="img"
                    src={company?.stamp}
                    alt="Stamp"
                    sx={{ width: 110, mt: "-5mm", mb: "2mm", height: 110 }}
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
                      mt: "-7mm",
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
                      mt: "-9mm",
                    }}
                  >
                    Name: {data.employeeName}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "Bahnschrift",
                      mt: "1mm", // 🔑 small Word-like gap
                      textAlign: "left",
                      mb: "mm",
                      ml: "73mm",
                    }}
                  >
                    Date : ________________
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
              mt: "-8mm",
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
        <Box
          component="img"
          src={company.watermark}
          alt="watermark"
          sx={{
            position: "absolute",
            top: "53%",
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
            zIndex: 2,
          }}
        ></Box>
        {/* Signature Block */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 9 }}>
          <Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              {company?.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: 45, marginTop: "10mm" }}
                />
              )}
              {company?.stamp && (
                <img src={company.stamp} alt="Stamp" style={{ height: 110 }} />
              )}
            </Box>
            <Typography mt={1} sx={{ fontFamily: "Bahnschrift" }}>
              {company.hrName}
            </Typography>
            <Typography sx={{ fontFamily: "Bahnschrift", mt: "-1mm" }}>
              HR Relations Lead
            </Typography>
          </Box>

          <Box minWidth="250px" sx={{ mt: 15, fontFamily: "Bahnschrift" }}>
            <Typography sx={{ fontFamily: "Bahnschrift" }}>
              Signature: __________________
            </Typography>
            <Typography mt={2} sx={{ mt: "-1mm", fontFamily: "Bahnschrift" }}>
              Candidate Name: {data.employeeName}
            </Typography>
          </Box>
        </Box>
      </A4Page>
    </>
  );
};

export default NimbjaAppointment;
