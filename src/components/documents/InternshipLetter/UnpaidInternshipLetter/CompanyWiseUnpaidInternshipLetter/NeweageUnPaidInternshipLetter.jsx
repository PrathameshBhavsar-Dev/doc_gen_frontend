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
const SmartSoftwareUnPaidInternshipLetter = ({ company, data }) => {
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
        fontFamily: "'Times New Roman', Times, serif",
        color: "#000",
        display: "flex",
        flexDirection: "column",
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
      <Box sx={{ px: "25mm", pt: "20mm", pb: "20mm", flexGrow: 1 }}>
        {/* NAME */}
        

        {/* SUBJECT */}
       <Typography
                 sx={{
                   textAlign: "center",
                   fontWeight: "bold",
                   fontSize: 17,
                   letterSpacing: 1,
                   mb: 10,
                 }} >  LETTER OF INTERNSHIP
               </Typography>

                {/* BODY */}
         <Typography sx={{ fontSize: 15, lineHeight: 2, mb: 2, mt: 10 }}>
                 This is to certify that{" "}
                 <strong>
                   {mrms} {employeeName}
                 </strong>{" "}
                 has done {pronoun.possessive} internship in{" "}
                 <strong>{company.name}</strong>.
               </Typography>
       
               <Typography sx={{ fontSize: 15, lineHeight: 2, mb: 2 }}>
                 From <strong>{formatDate(startDate)}</strong> –{" "}
                 <strong>{formatDate(endDate)}</strong>,{" "}
                 {pronoun.subject} was designated as{" "}
                 <strong>{designation}</strong>.
               </Typography>

<Typography sx={{ fontSize: 15, lineHeight: 2, mb: 10 }}>
          During the internship {pronoun.subject} demonstrated
          strong skills with self-motivation to learn new skills.{" "}
          {pronoun.possessive} performance exceeded our
          expectations and {pronoun.subject} was able to
          complete the assigned tasks on time. We wish{" "}
          {pronoun.object} all the best for{" "}
          {pronoun.possessive} career.
        </Typography>

       

        
        <Typography mb={3} sx={{ fontWeight: 600 }}>
          For {company.name.toUpperCase()}
        </Typography>

        {/* SIGNATURE & STAMP */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          {company?.signature && (
            <img
              src={company.signature}
              alt="Signature"
              style={{ height: 65 }}
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

        {/* HR & CANDIDATE */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontSize="14px">
            <strong>{company.hrName}</strong>
            <br />
           <strong> HR Department Pune </strong>
          </Typography>

          {/* <Typography fontSize="14px">
            Signature: ____________
            <br />
            Candidate Name: <span>{employeeName}</span>
          </Typography> */}
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

export default SmartSoftwareUnPaidInternshipLetter;
