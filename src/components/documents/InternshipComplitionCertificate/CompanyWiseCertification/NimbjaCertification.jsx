import React from "react";
import { Box, Typography } from "@mui/material";
import A4Layout from "../../../layout/A4Page";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const baseText = {
  fontFamily: "Segoe UI",
  fontSize: "14px",
  lineHeight: 1.8,
};

const NimbjaCertification = ({ company, data }) => {
  return (
    <A4Layout headerSrc={company.header} footerSrc={company.footer}>
      <Box sx={{ px: "25mm", pt: "20mm" }}>
        {/* Title */}
        <Typography
          align="center"
          sx={{
            ...baseText,
            fontSize: "18px",
            fontWeight: "bold",
            mb: "15mm",
            textTransform: "uppercase",
          }}
        >
          Letter of Internship
        </Typography>

        {/* Body */}
        <Typography sx={{ ...baseText, mb: "8mm" }}>
          This is to certify that <b>{data.employeeName}</b> has done his
          internship at <b>Nimbja Security Solutions Pvt. Ltd.</b> from{" "}
          <b>{formatDate(data.startDate)}</b> and end on{" "}
          <b>{formatDate(data.endDate)}</b>.
        </Typography>

        <Typography sx={{ ...baseText, mb: "8mm" }}>
          During the internship, he has demonstrated his skills with
          self-motivation to learn new skills. His performance exceeded our
          expectations and he was able to complete the given tasks on time. He
          was designated as <b>{data.designation}</b>.
        </Typography>

        <Typography sx={{ ...baseText, mb: "15mm" }}>
          We wish him all the best for his upcoming career.
        </Typography>

        {/* Signature */}
        <Typography sx={{ ...baseText, mb: "2mm" }}>Sincerely,</Typography>

        <Typography sx={{ ...baseText, fontWeight: "bold" }}>
          Kalpana Khade
        </Typography>
        <Typography sx={{ ...baseText }}>HR Relations Lead</Typography>
        <Typography sx={{ ...baseText }}>Department of HR Relations</Typography>
      </Box>
    </A4Layout>
  );
};

export default NimbjaCertification;
