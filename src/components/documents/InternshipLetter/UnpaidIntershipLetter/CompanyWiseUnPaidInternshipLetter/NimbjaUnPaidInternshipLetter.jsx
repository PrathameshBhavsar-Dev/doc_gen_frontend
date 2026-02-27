import React from "react";
import {
    Box,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import {
    generateAnnexureSalaryStructure,
    formatCurrency,
} from "../../../../../utils/salaryCalculations";


/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date); // 🔥 dynamic input (string / Date)
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};


const NimbjaUnPaidInternshipLetter = ({ company, data }) => {
  return (
    <>
      <A4Layout
        headerSrc={company.header}
        footerSrc={company.footer}
        watermarkSrc={company.watermark}
      >
        {/* ================= TITLE ================= */}
        <Typography
          align="center"
          sx={{
            fontSize: "26px",
            fontWeight: "bold",
            textDecoration: "underline",
            mt: 12,
            mb: 8,
            fontFamily: "Verdana",
          }}
        >
          Letter of Internship
        </Typography>

        {/* ================= SALUTATION ================= */}
        {/* <Typography sx={{ mb: 2, fontFamily: "Book Antiqua" }}></Typography> */}

        {/* ================= BODY ================= */}
        <Typography
          paragraph
          sx={{ fontFamily: "Arial", fontSize: "5mm", fontWeight: "semi-bold", textAlign: "left" }}
        >
          This is to certify that {data.internName} has done his internship at{" "}
          {company.name}
          From {formatDate(data.startDate)},and End on{" "}
          {formatDate(data.endDate)}.
        </Typography>

        <Typography
          paragraph
          sx={{ fontFamily: "Arial", fontSize: "5mm", fontWeight: "semi-bold" }}
        >
          During the internship, he has demonstrated his skills with
          self-motivation to learn new skills. His performance exceeded our
          expectations and he was able to complete the given tasks on time. He
          was designated as Trainee Software Developer. We wish him all the best
          for his upcoming career
        </Typography>

        {/* ================= SIGNATURE ================= */}
        <Box sx={{ mt: 12, fontFamily: "Arial" }}>
          <Typography>Sincerely,</Typography>

          {/* ================= STAMP + SIGNATURE ROW ================= */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              mt: 2,
            }}
          >
            {/* RIGHT: HR SIGNATURE */}
            {company.signature && (
              <img
                src={company.signature}
                alt="HR Signature"
                style={{
                  height: "50px",
                }}
              />
            )}

            {/* LEFT: COMPANY STAMP */}
            <img
              src={company.stamp}
              alt="Company Stamp"
              style={{
                width: "110px",
                marginRight: "96mm",
              }}
            />
          </Box>

          {/* ================= COMPANY NAME ================= */}
          <Typography
            sx={{
              mt: 2,
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              fontFamily: "Bahnschrift",
            }}
          >
            <span>Kalpana Khade</span>
            <span>HR Relations Lead</span>
            <span>Department of HR Relations</span>
          </Typography>
        </Box>
      </A4Layout>
    </>
  );
};


export default NimbjaUnPaidInternshipLetter;