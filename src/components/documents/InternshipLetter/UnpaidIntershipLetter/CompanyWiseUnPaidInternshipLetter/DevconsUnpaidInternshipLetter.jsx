import React from "react";
import { Box, Typography } from "@mui/material";
import A4Page from "../../../../layout/A4Page";


const DevconsInternshipOffer = ({ company, data }) => {
  const firstName = data.employeeName?.split(" ")[0] || "";

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        fontFamily: `"Bahnschrift", "Yu Gothic", "Segoe UI", Arial, sans-serif`,
        "& *": {
          fontFamily: `"Bahnschrift", "Yu Gothic", "Segoe UI", Arial, sans-serif`,
        },
      }}
    >
      {/* ================= HEADER ================= */}
       <A4Page
              headerSrc={company.header}
              footerSrc={company.footer}
            // watermarkSrc={company.watermark}
            >

      {/* ================= CONTENT ================= */}
      <Box
        
      >
        {/* DATE */}
        <Typography sx={{ textAlign: "right", mb: 3 }}>
          {formatDate(data.issueDate)}
        </Typography>

        {/* NAME */}
        <Typography sx={{ mb: 1 }}>
          <strong>Name :</strong> {data.mrms} {data.employeeName}
        </Typography>

        {/* SUBJECT */}
        <Typography sx={{ mb: 3 }}>
          <strong>Subject :</strong> Letter of intent for the Internship of position
          as a <strong>{data.designation}</strong>
        </Typography>

        {/* GREETING */}
        <Typography sx={{ mb: 2 }}>
          Dear {firstName},
        </Typography>

        {/* BODY */}
        <Typography sx={{ mb: 2, textAlign: "justify" }}>
          We are pleased to offer you the internship on position as a{" "}
          <strong>{data.designation}</strong> with{" "}
          <strong>Devcons Software Solutions Pvt. Ltd.</strong> with effective date{" "}
          <strong>{formatDate(data.startDate)}</strong> considering your
          performance and support towards the organization.
        </Typography>

        <Typography sx={{ mb: 2, textAlign: "justify" }}>
          If there is any change in the date of joining, changes can be taken under
          consideration.
        </Typography>

        <Typography sx={{ mb: 2, textAlign: "justify" }}>
          We welcome you to <strong>Devcons Software Solutions Pvt. Ltd.</strong>
          Family and hope it would be the beginning of a long and mutually
          beneficial association.
        </Typography>

        <Typography sx={{ mb: 4, textAlign: "justify" }}>
          Kindly acknowledge the duplicate copy of this letter as an acceptance of
          this offer.
        </Typography>

        {/* SIGN OFF */}
        <Typography sx={{ mb: 2 }}>
          Yours Sincerely,
        </Typography>

        <Typography sx={{ fontWeight: 700, mb: 2 }}>
          For DEVCONS SOFTWARE SOLUTIONS PVT. LTD.
        </Typography>

        {/* SIGNATURE + STAMP */}
    {/* SIGNATURE SECTION – EXACT AS IMAGE */}
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    mt: 5,
  }}
>
  {/* LEFT – COMPANY SIGNATURE */}
  <Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 1 }}>
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

    <Typography sx={{ fontWeight: 600 }}>
      {company.hrName}
    </Typography>
    <Typography sx={{ fontSize: "14px" }}>
      HR Relations Lead
    </Typography>
  </Box>

  {/* RIGHT – CANDIDATE */}
  <Box sx={{ textAlign: "left", minWidth: "280px" }}>
    {/* Signature line */}
    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
      <Typography sx={{ fontSize: "14px", mr: 1 }}>
        Signature :
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          borderBottom: "1px solid #000",
          height: "14px",
        }}
      />
    </Box>

    {/* Candidate Name line */}
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography sx={{ fontSize: "14px", mr: 1 }}>
        Candidate Name :
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>
        {data.employeeName}
      </Typography>
    </Box>
  </Box>
</Box>


      </Box>

      {/* ================= FOOTER ================= */}
</A4Page>
    </Box>
  );
};

export default DevconsInternshipOffer;
