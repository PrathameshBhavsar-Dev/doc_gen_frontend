import React from "react";
import { Box, Typography } from "@mui/material";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

/* ================= PRONOUN RESOLVER ================= */
const getPronounsByTitle = (title = "") => {
  const t = title.toLowerCase().replace(".", "");

  switch (t) {
    case "mr":
      return { subject: "he", object: "him", possessive: "his" };
    case "ms":
    case "miss":
    case "mrs":
      return { subject: "she", object: "her", possessive: "her" };
    case "mx":
      return { subject: "they", object: "them", possessive: "their" };
    default:
      return { subject: "they", object: "them", possessive: "their" };
  }
};

/* ================= MAIN COMPONENT ================= */
const JDITUnPaidInternshipLetter = ({ company, data }) => {
  if (!company || !data) return null;

  const {
    mrms = "Ms.",
    employeeName = "",
    designation = "Internship Trainee",
    startDate,
    endDate,
  } = data;

  const pronoun = getPronounsByTitle(mrms);

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        fontFamily: `"Times New Roman", Times, serif`,
        color: "#000",
      }}
    >
      {/* ================= HEADER ================= */}
      {company?.headerImage && (
        <img
          src={company.headerImage}
          alt="Header"
          style={{ width: "100%", display: "block" }}
        />
      )}

      {/* ================= CONTENT ================= */}
      <Box sx={{ px: "25mm", pt: "18mm", pb: "18mm", flexGrow: 1 }}>
        {/* NAME */}
         <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 15,
                  letterSpacing: 1,
                  mb: 8,
                  mt: 7,
                }}
              >
                LETTER OF INTERNSHIP
              </Typography>

       
        {/* BODY – Neweage Content */}
        <Typography mb={3} textAlign="justify">
          This is to certify that{" "}
          <strong>
            {mrms} {employeeName}
          </strong>{" "}
          has done {pronoun.possessive} internship at{" "}
          <strong>{company.name}</strong>.
        </Typography>

          <Typography sx={{ fontSize: 15, lineHeight: 2, mb: 2 }}>
                From <strong>{formatDate(startDate)}</strong> –{" "}
                <strong>{formatDate(endDate)}</strong>.{" "}
                {pronoun.subject} was designated as{" "}
                <strong>{designation}</strong>.
              </Typography>

        <Typography mb={15} textAlign="justify">
          During the internship{" "}
          {pronoun.subject} demonstrated strong skills with
          self-motivation to learn new skills.{" "}
          {pronoun.possessive} performance exceeded our
          expectations and {pronoun.subject} was able to
          complete the assigned tasks on time. We wish{" "}
          {pronoun.object} all the best for{" "}
          {pronoun.possessive} upcoming career.
        </Typography>

        
        {/* CLOSING */}

        <Typography mb={4} sx={{ fontWeight: 600 }}>
          For {company.name.toUpperCase()}
        </Typography>

        {/* SIGNATURE & STAMP */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
          {company?.sign && (
            <img
              src={company.sign}
              alt="Signature"
              style={{ height: 65 }}
            />
          )}

          {company?.stamp && (
            <img
              src={company.stamp}
              alt="Stamp"
              style={{ height: 85 }}
            />
          )}
        </Box>

        {/* HR & CANDIDATE */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontSize="14px">
            <strong>{company.hrName}</strong>
            <br />
            HR Department Pune
          </Typography>

          <Typography fontSize="14px">
            Signature: ____________
            <br />
            Candidate Name: <span>{employeeName}</span>
          </Typography>
        </Box>
      </Box>

      {/* ================= FOOTER ================= */}
      {company?.footerImage && (
        <img
          src={company.footerImage}
          alt="Footer"
          style={{ width: "100%", display: "block" }}
        />
      )}
    </Box>
  );
};

export default JDITUnPaidInternshipLetter;
