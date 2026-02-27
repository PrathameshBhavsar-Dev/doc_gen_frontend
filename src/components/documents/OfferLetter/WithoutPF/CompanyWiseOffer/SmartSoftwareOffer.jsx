import React, { useMemo } from "react";
import {
  Typography,
  Box,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";

/* ================= SALARY UTILITIES ================= */
import {
  generateOfferLetterComponents,
  formatCurrency,
  numberToWords,
} from "../../../../../utils/salaryCalculations";

export default function SmartSoftwareOffer({ company, data }) {
  const {
    issueDate = new Date(),
    candidateName = "",
    address = "",
    position = "",
    joiningDate = "",
    salary = 0,
    mrms = "", // Title field (Mr, Ms, Mrs, Miss, Mx)
  } = data || {};

  /* ================= TITLE & PRONOUNS ================= */
  const title = (mrms || "").toLowerCase().trim();

  const pronouns =
    ["miss", "miss.", "mrs", "mrs.", "ms", "ms."].includes(title)
      ? { subject: "She", object: "her", possessive: "her" }
      : ["mx", "mx."].includes(title)
        ? { subject: "They", object: "them", possessive: "their" }
        : { subject: "He", object: "him", possessive: "his" };

  const displayTitle = title
    ? title.charAt(0).toUpperCase() + title.slice(1)
    : "Mr.";

  const firstName = candidateName.split(" ")[0] || "";

  const formattedJoiningDate = joiningDate
    ? new Date(joiningDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  /* ================= SALARY ================= */
  const salaryComponents = useMemo(
    () => generateOfferLetterComponents(salary),
    [salary]
  );

  const totalAnnual = Number(salary) || 0;
  const totalMonthly = Math.round(totalAnnual / 12);
  const salaryInWords = numberToWords(totalAnnual);

  /* ================= TYPOGRAPHY ================= */
  const baseText = {
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "14px",
    lineHeight: 1.8,
    color: "#000",
  };

  const para = { ...baseText, mt: "12px" };
  const paraLarge = { ...baseText, mt: "24px" };

  const labelStyle = {
    display: "inline-block",
    width: "110px",
  };

  /* ================= TABLE STYLES ================= */
  const tableCell = {
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "13px",
    lineHeight: 1.4,
    border: "1px solid #000",
    padding: "4px 6px",
  };

  const tableHeader = {
    ...tableCell,
    backgroundColor: "#32a1c2ff",
    color: "#fff",
    fontWeight: "bold",
  };

  const tableTotal = {
    ...tableCell,
    backgroundColor: "#32a1c2ff",
    color: "#fff",
    fontWeight: "bold",
  };

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Layout company={{ ...company, watermark: null, watermarkImage: null }}>
        <Box sx={baseText}>
          <Typography sx={{ textAlign: "right" }}>
            {new Date(issueDate).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </Typography>

          <Typography sx={{ mt: "24px" }}>
            <Box component="span" sx={labelStyle}>Name</Box> : {displayTitle} {candidateName}
          </Typography>

          <Typography sx={{ mt: "12px" }}>
            <Box component="span" sx={labelStyle}>Address</Box> : {address}
          </Typography>

          <Typography sx={{ mt: "12px" }}>
            <Box component="span" sx={labelStyle}>Subject</Box> :{" "}
            <Box component="span" sx={{ textDecoration: "underline" }}>
              Letter of intent for the position of {position}.
            </Box>
          </Typography>

          <Typography sx={{ mt: "24px" }}>
            Dear {displayTitle} {firstName},
          </Typography>

          <Typography sx={para}>
            We are pleased to offer you the position of {position}. As discussed,
            {pronouns.subject.toLowerCase()} is requested to join on {formattedJoiningDate}.
            Your total Gross salary will be Rs. {formatCurrency(totalAnnual)} (
            {salaryInWords}) per year.
          </Typography>

          <Typography sx={paraLarge}>
            Subject to various deductions as per company and government policy.
          </Typography>

          <Typography sx={para}>
            The roles and responsibilities and other terms and conditions of your
            employment will be specified in your letter of appointment.
          </Typography>

          <Typography sx={para}>
            We welcome you to <b>{company.name}</b> Family and hope it would be
            the beginning of a long and mutually beneficial association.
          </Typography>

          <Typography sx={{ ...para, ml: "50px" }}>
            Kindly acknowledge the duplicate copy of this letter as an acceptance
            of this offer.
          </Typography>

          <Typography sx={{ mt: "24px" }}>Yours Sincerely,</Typography>
          <Typography>For <b>{company.name?.toUpperCase()}</b></Typography>

          {/* SIGNATURE & STAMP – PAGE 1 */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
            <Box>
              <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
                {company.signature && (
                  <Box component="img" src={company.signature} sx={{ height: "80px" }} />
                )}
                {company.stamp && (
                  <Box component="img" src={company.stamp} sx={{ height: "100px" }} />
                )}
              </Box>
              <Typography>{company.hrName}</Typography>
              <Typography>HR Relations Lead</Typography>
            </Box>

            <Box sx={{ width: "45%", mt: 8 }}>
              <Typography>Signature : ___________________</Typography>
              <Typography>Candidate Name : {candidateName}</Typography>
            </Box>
          </Box>

          <Typography sx={{ mt: "24px", textAlign: "center", textDecoration: "underline" }}>
            <b>Enclosures: Annexure A – Salary Structure</b>
          </Typography>
        </Box>
      </A4Layout>

      {/* ================= PAGE 2 ================= */}
      <A4Layout company={{ ...company, watermark: null, watermarkImage: null }}>
        <Box sx={baseText}>
          <Typography align="center" sx={{ mb: "24px" }}>
            <b>Annexure A – Salary Structure</b>
          </Typography>

          <Table sx={{ borderCollapse: "collapse", width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeader}>Salary Component</TableCell>
                <TableCell sx={tableHeader} align="right">Monthly (Rs.)</TableCell>
                <TableCell sx={tableHeader} align="right">Annual (Rs.)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryComponents.map((row, i) => (
                <TableRow key={i}>
                  <TableCell sx={tableCell}>{row.name}</TableCell>
                  <TableCell sx={tableCell} align="right">
                    {formatCurrency(row.monthly)}
                  </TableCell>
                  <TableCell sx={tableCell} align="right">
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell sx={tableTotal}>Total Monthly Gross Salary</TableCell>
                <TableCell sx={tableTotal} align="right">
                  {formatCurrency(totalMonthly)}
                </TableCell>
                <TableCell sx={tableTotal} align="right">
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* SIGNATURE & STAMP – PAGE 2 */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
            <Box>
              <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
                {company.signature && (
                  <Box component="img" src={company.signature} sx={{ height: "80px" }} />
                )}
                {company.stamp && (
                  <Box component="img" src={company.stamp} sx={{ height: "100px" }} />
                )}
              </Box>
              <Typography>{company.hrName}</Typography>
              <Typography>HR Department Pune</Typography>
            </Box>

            <Box sx={{ width: "45%", mt: 8 }}>
              <Typography>Signature : ___________________</Typography>
              <Typography>Candidate Name : {candidateName}</Typography>
            </Box>
          </Box>
        </Box>
      </A4Layout>
    </>
  );
}
