import React from "react";
import { Box, Typography } from "@mui/material";

const RPExperience = ({ company, data }) => {
  // ================= PRONOUN LOGIC =================
  // Female → She / her / her
  // Male   → He / him / his
  //   const title = (data?.mrms || "").toLowerCase().trim();

  // const pronouns =
  //   title === "miss." || title === "mrs."
  //     ? { subject: "She", object: "her", possessive: "her" }
  //     : { subject: "He", object: "him", possessive: "his" };

  const title = (data?.mrms || "").toLowerCase().trim();

  const pronouns =
    title === "miss." || title === "mrs."
      ? { subject: "She", object: "her", possessive: "her" }
      : title === "mx."
        ? { subject: "They", object: "them", possessive: "their" }
        : { subject: "He", object: "him", possessive: "his" };


  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
        "& *": {
          fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
        },
      }}
    >
      {/* ================= HEADER ================= */}
      <img
        src={company.header}
        alt="Company Header"
        style={{ width: "100%", display: "block" }}
      />

      {/* ================= CONTENT ================= */}
      <Box
        className="a4-content-only"
        sx={{
          px: "25mm",
          py: "20mm",
          flexGrow: 1,
          fontSize: "14px",
          lineHeight: 1.8,
        }}
      >
        {/* DATE */}
        <Typography sx={{ textAlign: "right", mb: 3, color: "#000" }}>
          {new Date(data.issueDate).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </Typography>

        {/* REF NO */}
        <Typography sx={{ mb: 7, color: "#000" }}>
          Ref: RPBS/PUN/RMG01/Exp-Letter/
          {String(data.employeeId).padStart(4, "0")}
        </Typography>

        {/* TITLE */}
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 600,
            textDecoration: "underline",
            mb: 6,
          }}
        >
          TO WHOMSOEVER IT MAY CONCERN
        </Typography>

        {/* BODY */}
        <Typography sx={{ mb: 3, textAlign: "justify", color: "#000" }}>
          This is to certify that{" "}
          <strong>
            {data.mrms} {data.employeeName}
          </strong>{" "}
          was in our employment from{" "}
          <strong>
            {new Date(data.joiningDate).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </strong>{" "}
          to{" "}
          <strong>
            {new Date(data.relievingDate).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </strong>
          . {pronouns.subject} was efficient and hardworking in this tenure. At the time of
          leaving the services of the company,{" "}
          {pronouns.subject.toLowerCase()} was designated as{" "}
          <strong>{data.designation}</strong>.
        </Typography>

        <Typography sx={{ mb: 13, mt: 8, color: "#000" }}>
          We wish {pronouns.object} success in {pronouns.possessive} future career.
        </Typography>


        {/* SIGN OFF */}
        <Typography sx={{ mt: 6, color: "#000" }}>
          For <strong>{company.name}</strong>
        </Typography>

        {/* SIGNATURE */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <img
            src={company.signature}
            alt="Signature"
            style={{ height: 50, marginRight: 25 }}
          />
          <img
            src={company.stamp}
            alt="Stamp"
            style={{ height: 90 }}
          />
        </Box>

        <Typography sx={{ mt: 2, fontWeight: 600 }}>
          {company.hrName}
        </Typography>
        <Typography sx={{ fontSize: "15px", color: "#000" }}>
          Group Leader-HR Division Pune
        </Typography>
      </Box>

      {/* ================= FOOTER ================= */}
      <img
        src={company.footer}
        alt="Company Footer"
        style={{ width: "100%", display: "block" }}
      />
    </Box>
  );
};

export default RPExperience;


