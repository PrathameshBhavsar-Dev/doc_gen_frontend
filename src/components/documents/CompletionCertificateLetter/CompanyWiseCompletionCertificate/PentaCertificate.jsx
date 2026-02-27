import React from "react";
import { Box, Typography } from "@mui/material";
import A4Page from "../../../layout/A4Page";

const PentaInternshipCompletion = ({ company, data }) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#fff",
        fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
        "& *": {
          fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
        },
      }}
    >
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        {/* ================= CONTENT ================= */}
        <Box>
          {/* TITLE */}
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 700,
              textTransform: "uppercase",
              mt: 6,
              letterSpacing: "0.5px",
            }}
          >
            LETTER OF PROJECT COMPLETION
          </Typography>

          {/* BODY */}
          <Typography sx={{ mt: 6, textAlign: "justify" }}>
            This is to certify that{" "}
            <strong>
              {data.mrms} {data.employeeName}
            </strong>{" "}
            has done his/her internship at{" "}
            <strong>
              PENTA SOFTWARE CONSULTANCY SERVICES (I) PVT. LTD.
            </strong>{" "}
            from <strong>{formatDate(data.startDate)}</strong> to{" "}
            <strong>{formatDate(data.completionDate)}</strong>.
          </Typography>

          <Typography sx={{ mb: 2, textAlign: "justify" }}>
            During the internship, he/she has demonstrated dedication,
            sincerity, and self-motivation to learn new skills. His/her
            performance met our expectations and assigned tasks were completed
            successfully.
          </Typography>

          <Typography sx={{ mb: 7, textAlign: "justify" }}>
            He/She was designated as{" "}
            <strong>{data.designation}</strong>. We wish him/her all the best
            for future career endeavors.
          </Typography>

          {/* SIGN OFF */}
          <Typography sx={{ mb: 1 }}>Yours faithfully,</Typography>

          <Typography sx={{ fontWeight: 700, mb: 3 }}>
            For Penta Software Consultancy Services (I) Pvt. Ltd.
          </Typography>

          {/* SIGNATURE SECTION */}
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
            {company?.signature && (
              <img
                src={company.signature}
                alt="Signature"
                style={{ height: 60 }}
              />
            )}

            {company?.stamp && (
              <img
                src={company.stamp}
                alt="Stamp"
                style={{ height: 90 }}
              />
            )}
          </Box>

          <Typography sx={{ fontWeight: 600, mt: 2 }}>
            {company.ceoName || company.hrName}
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
            {company.ceoName ? "Chief Executive Officer" : "HR Manager"}
          </Typography>
        </Box>
      </A4Page>
    </Box>
  );
};

export default PentaInternshipCompletion;
