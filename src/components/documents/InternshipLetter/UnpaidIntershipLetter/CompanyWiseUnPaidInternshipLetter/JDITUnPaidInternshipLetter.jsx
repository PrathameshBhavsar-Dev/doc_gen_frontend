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

  


/* ================= MAIN COMPONENT ================= */
const JDITUnPaidInternshipLetter = ({ company, data }) => {

   const title = (data?.mrms || "").toLowerCase().trim();

  const pronouns =
    title === "miss." || title === "mrs."
      ? { subject: "She", object: "her", possessive: "her" }
      : title === "mx."
        ? { subject: "They", object: "them", possessive: "their" }
        : { subject: "He", object: "him", possessive: "his" };
  if (!company || !data) return null;

  const {
    mrms = "Ms.",
    employeeName = "",
    designation = "Internship Trainee",
    startDate,
    endDate,
  } = data;

  const pronoun = getPronounsByTitle(mrms);

  const TEXT = {
  fontSize: 18,
  lineHeight: 2,
  textAlign: "justify",
};

  return (
    <Box
      // sx={{
      //   width: "210mm",
      //   minHeight: "297mm",
      //   backgroundColor: "#fff",
      //   display: "flex",
      //   flexDirection: "column",
      //   fontFamily: `"Times New Roman", Times, serif`,
      //   color: "#000",
      // }}
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

       <Typography sx={{ ...TEXT, mb: 3, textAlign: "right"}}>
            {formatDate(data.issueDate)}
          </Typography> 
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
               INTERNSHIP COMPLETION LETTER
              </Typography>

       
        {/* BODY – Neweage Content */}
        <Typography sx={{ mb: 2, textAlign: "justify" }}>
                    This is to certify that{" "}
                    <strong>
                      {data.employeeName}
                    </strong>{" "}
                    has done {pronouns.possessive} internship at{" "}
                    <strong>DEVCONS SOFTWARE SOLUTIONS PVT. LTD.</strong> from{" "}
                    <strong>{formatDate(data.startDate)}</strong> to{" "}
                    <strong>{formatDate(data.completionDate)}</strong>.
                  </Typography>
        
                  <Typography sx={{ mb: 9, textAlign: "justify" }}>
                    During the internship, {pronouns.subject.toLowerCase()} has demonstrated{" "}
                    {pronouns.possessive} skills with self-motivation to learn new skills.{" "}
                    {pronouns.possessive.charAt(0).toUpperCase() +
                      pronouns.possessive.slice(1)}{" "}
                    performance exceeded our expectations and {pronouns.subject.toLowerCase()} was
                    able to complete the given tasks on time. {pronouns.subject} was designated as <strong>{data.role}</strong> with project
                    named <strong>{data.projectName}</strong>. We wish {pronouns.object} all the
                    best for {pronouns.possessive} upcoming career.
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
