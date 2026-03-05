import React from "react";
import { Box, Typography } from "@mui/material";
import A4Page from "../../../layout/A4Page";

const QMSCertification = ({ company, data }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "";

  const primaryColor = company?.brandColors?.primary || "#000";
  const textColor = company?.brandColors?.textColor || "#000";

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
      <A4Page
        headerSrc={company?.headerImage || company?.header}
        footerSrc={company?.footerImage || company?.footer}
        watermarkSrc={company?.watermarkImage || company?.watermark}
        watermarkOpacity={company?.brandColors?.watermarkOpacity || 0.05}
      >
        {/* ================= CONTENT ================= */}

        <Box sx={{ px: 6, py: 4, color: textColor }}>
          {/* TITLE */}
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: "22px",
              textTransform: "uppercase",
              mt: 4,
              letterSpacing: "1px",
              color: primaryColor,
            }}
          >
            Letter of Project Completion
          </Typography>

          {/* BODY */}
          <Typography sx={{ mt: 6, textAlign: "justify", fontSize: "15px" }}>
            This is to certify that{" "}
            <strong>
              {data.mrms} {data.employeeName}
            </strong>{" "}
            (Employee ID: <strong>{data.employeeId}</strong>) has
            successfully completed the project titled{" "}
            <strong>{data.projectName}</strong> from{" "}
            <strong>{formatDate(data.startDate)}</strong> to{" "}
            <strong>{formatDate(data.completionDate)}</strong>.
          </Typography>

          <Typography sx={{ mt: 1, textAlign: "justify", fontSize: "15px" }}>
            During this period, {data.mrms} {data.employeeName} worked as{" "}
            <strong>{data.role}</strong> and demonstrated professionalism,
            dedication, and strong technical skills in handling assigned
            responsibilities.
          </Typography>

          <Typography sx={{ mt: 1, textAlign: "justify", fontSize: "15px" }}>
            The project utilized technologies such as{" "}
            <strong>{data.technologies}</strong>. Key contributions included{" "}
            <strong>{data.achievements}</strong>.
          </Typography>

          {data.clientName && (
            <Typography sx={{ mt: 1, textAlign: "justify", fontSize: "15px" }}>
              The project was delivered successfully for{" "}
              <strong>{data.clientName}</strong>.
            </Typography>
          )}

          <Typography sx={{ mt: 2 }}>
            We wish {data.mrms} {data.employeeName} all the best in future
            endeavors.
          </Typography>

          {/* SIGN OFF */}
          <Typography sx={{ mt: 6 }}>Yours faithfully,</Typography>

          <Typography sx={{ fontWeight: 700, mb: 3 }}>
            For {company?.name}
          </Typography>

          {/* SIGNATURE SECTION */}
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
            {(company?.jaya_sign ||
              company?.satish_sign ||
              company?.incrementSignature ||
              company?.signature) && (
              <img
                src={
                  company?.jaya_sign ||
                  company?.satish_sign ||
                  company?.incrementSignature ||
                  company?.signature
                }
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
            {company?.ceoName || company?.hrName}
          </Typography>

          <Typography sx={{ fontSize: "14px" }}>
            {company?.ceoName
              ? "Chief Executive Officer"
              : "HR Manager"}
          </Typography>
        </Box>
      </A4Page>
    </Box>
  );
};

export default QMSCertification;