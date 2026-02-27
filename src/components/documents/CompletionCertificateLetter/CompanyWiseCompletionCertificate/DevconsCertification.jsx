import React from "react";
import { Box, Typography } from "@mui/material";
import A4Page from "../../../../layout/A4Page";

const DevconsProjectCompletionLetter = ({ company = {}, data = {} }) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <Box sx={{ px: 6, py: 4 }}>

        {/* ================= TITLE ================= */}
        <Typography
          align="center"
          fontWeight={700}
          sx={{
            letterSpacing: 1,
            mb: 4,
            textTransform: "uppercase",
          }}
        >
          LETTER OF PROJECT COMPLETION
        </Typography>

        {/* ================= BODY ================= */}
        <Typography mb={3} textAlign="justify" fontSize={18}>
          This is to certify that <b>{data.employeeName}</b> has done his
          internship at <b>DEVCONS SOFTWARE SOLUTIONS PVT. LTD.</b> from{" "}
          <b>{formatDate(data.startDate)}</b> {" "}
          <b>{formatDate(data.endDate)}</b>.
        </Typography>

        <Typography mb={3} textAlign="justify" fontSize={18}>
          During the internship, he has demonstrated his skills with
          self-motivation to learn new skills. His performance exceeded our
          expectations and he was able to complete the given tasks on time.
        </Typography>

        <Typography mb={3} textAlign="justify" fontSize={18}>
          He was designated as Trainee Full Stack Developer with{" "}
          <b>{data.projectName}</b> – {data.projectDescription}. We wish him
          all the best for his upcoming career.
        </Typography>

        {/* ================= SIGNATURE ================= */}
        <Box sx={{ mt: 8 }}>
          <Typography mb={4}>Yours faithfully,</Typography>

          <Typography fontWeight={700}>
            For DEVCONS SOFTWARE SOLUTIONS PVT. LTD.
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 3, gap: 4 }}>
            {company.signature && (
              <img
                src={company.signature}
                alt="Signature"
                style={{ height: 70 }}
              />
            )}

            {company.stamp && (
              <img
                src={company.stamp}
                alt="Stamp"
                style={{ height: 90 }}
              />
            )}
          </Box>

          <Typography mt={2} fontWeight={600}>
            {company.hrName}
          </Typography>

          <Typography>HR Relations Lead</Typography>
        </Box>

      </Box>
    </A4Page>
  );
};

export default DevconsProjectCompletionLetter;
