import React, { useMemo } from "react";
import {
  Typography,
  Box,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";

/* ================= SALARY UTILITIES ================= */
import {
  formatCurrency,
  numberToWords,
} from "../../../../../utils/salaryCalculations";

export default function SmartSoftwareOffer({ company = {}, data = {} }) {
  const {
    employeeName = "",
    address = "",
    joiningDate = "",
    mrms = "",
  } = data;

  /* ================= TITLE & PRONOUNS ================= */
  const title = (mrms || "").toLowerCase().trim();

  const pronouns = ["miss", "miss.", "mrs", "mrs.", "ms", "ms."].includes(title)
    ? { subject: "She", object: "her", possessive: "her" }
    : ["mx", "mx."].includes(title)
      ? { subject: "They", object: "them", possessive: "their" }
      : { subject: "He", object: "him", possessive: "his" };

  const para = {
    mt: "16px",
    textAlign: "justify",
  };

  const paraLarge = {
    mt: "20px",
    textAlign: "justify",
  };

  /* ================= FORMATTED VALUES ================= */

  const displayTitle = mrms ? `${mrms}` : "";

  const firstName = employeeName?.split(" ")[0] || "";

  const formattedJoiningDate = joiningDate
    ? new Date(joiningDate).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : "";

  /* ================= SALARY BREAKUP ================= */
  const totalAnnual = Number(data.joiningCTC || data.salary) || 0;

  const salaryComponents = useMemo(() => {
    const round0 = (num) => Math.round(num);

    const annualCTC = round0(Number(totalAnnual || 0));
    const monthlyCTC = round0(annualCTC / 12);

    const pfMonthly = 3750;

    const hraMonthly = round0(monthlyCTC * 0.18);
    const daMonthly = round0(monthlyCTC * 0.12);
    const specialMonthly = round0(monthlyCTC * 0.16);
    const foodMonthly = round0(monthlyCTC * 0.06);

    const basicMonthly = round0(
      monthlyCTC -
      (hraMonthly + daMonthly + specialMonthly + foodMonthly + pfMonthly),
    );

    const basicAnnual = round0(basicMonthly * 12);
    const hraAnnual = round0(hraMonthly * 12);
    const daAnnual = round0(daMonthly * 12);
    const specialAnnual = round0(specialMonthly * 12);
    const foodAnnual = round0(foodMonthly * 12);
    const pfAnnual = round0(pfMonthly * 12);

    return [
      { name: "Basic Salary ", annual: basicAnnual, monthly: basicMonthly },
      { name: "HRA ", annual: hraAnnual, monthly: hraMonthly },
      { name: "Conveyance Allowance ", annual: daAnnual, monthly: daMonthly },
      {
        name: "Special Allowance ",
        annual: specialAnnual,
        monthly: specialMonthly,
      },
      { name: "Food Allowance ", annual: foodAnnual, monthly: foodMonthly },
      { name: "PF ", annual: pfAnnual, monthly: pfMonthly },
    ];
  }, [totalAnnual]);

  // ✅ TOTAL FIX (INCLUDING PF)
  const totalMonthly = salaryComponents.reduce(
    (sum, item) => sum + item.monthly,
    0,
  );

  const totalAnnualFinal = salaryComponents.reduce(
    (sum, item) => sum + item.annual,
    0,
  );

  const salaryInWords = numberToWords(totalAnnual);
  const position = data.joiningDesignation ?? data.position ?? "";
  const issueDate = data?.offer_letter?.issueDate ?? data?.issueDate;

  /* ================= REMOVE .00 LOGIC (ADDED ONLY) */
  const NoDecimal = (value) => {
    return formatCurrency(value).replace(/\.00$/, "");
  };

  /* ================= STYLES ================= */
  const baseText = {
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "14px",
    lineHeight: 1.8,
    color: "#000",
  };

  // const para = { ...baseText, mt: "12px" };
  // const paraLarge = { ...baseText, mt: "24px" };

  const labelStyle = {
    display: "inline-block",
    width: "110px",
  };

  const tableCell = {
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: "13px",
    lineHeight: 1.4,
    border: "1px solid #000",
    padding: "0px 12px 12px 12px",
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
            <Box component="span" sx={labelStyle}>
              Name
            </Box>{" "}
            : {displayTitle} {employeeName}
          </Typography>

          <Typography sx={{ mt: "12px" }}>
            <Box component="span" sx={labelStyle}>
              Address
            </Box>{" "}
            : {address}
          </Typography>

          <Typography sx={{ mt: "12px" }}>
            <Box component="span" sx={labelStyle}>
              Subject
            </Box>{" "}
            :
            <Box component="span" sx={{ textDecoration: "underline", ml: 1 }}>
              Letter of intent for the position of {position}.
            </Box>
          </Typography>

          <Typography sx={{ mt: "24px" }}>
            Dear {displayTitle} {firstName},
          </Typography>

          <Typography sx={para}>
            We are pleased to offer you the position of {position}. As
            discussed, you are requested to join on {formattedJoiningDate}. Your
            total Gross salary will be Rs. {NoDecimal(totalAnnual)} (
            {salaryInWords}) per year.
          </Typography>

          <Typography sx={paraLarge}>
            Subject to various deductions as per company and government policy.
          </Typography>

          <Typography sx={para}>
            The roles and responsibilities and other terms and conditions of
            your employment will be specified in your letter of appointment.
          </Typography>

          <Typography sx={para}>
            We welcome you to <b>{company.name}</b> Family and hope it would be
            the beginning of a long and mutually beneficial association.
          </Typography>

          <Typography sx={{ ...para, ml: "50px" }}>
            Kindly acknowledge the duplicate copy of this letter as an
            acceptance of this offer.
          </Typography>

          <Typography sx={{ mt: "24px" }}>Yours Sincerely,</Typography>
          <Typography>
            For <b>{company.name?.toUpperCase()}</b>
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "40px",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
                {company.signature && (
                  <Box
                    component="img"
                    src={company.signature}
                    sx={{ height: "80px" }}
                  />
                )}
                {company.stamp && (
                  <Box
                    component="img"
                    src={company.stamp}
                    sx={{ height: "100px" }}
                  />
                )}
              </Box>
              <Typography>{company.hrName}</Typography>
              <Typography>HR Relations Lead</Typography>
            </Box>

            <Box sx={{ width: "45%", mt: 8 }}>
              <Typography>Signature : ___________________</Typography>
              <Typography>Candidate Name : {employeeName}</Typography>
            </Box>
          </Box>
        </Box>
      </A4Layout>

      {/* ================= PAGE 2 ================= */}
      <A4Layout company={{ ...company, watermark: null, watermarkImage: null }}>
        <Box sx={baseText}>
          <Typography align="center" sx={{ mb: "24px" }}>
            <b>Annexure A – Salary Structure</b>
          </Typography>
          <TableContainer>
            <Table sx={{ borderCollapse: "collapse", width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeader}>Salary Component</TableCell>
                  <TableCell sx={tableHeader} align="right">
                    Monthly (Rs.)
                  </TableCell>
                  <TableCell sx={tableHeader} align="right">
                    Annual (Rs.)
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {salaryComponents.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell sx={tableCell}>{row.name}</TableCell>
                    <TableCell sx={tableCell} align="right">
                      {NoDecimal(row.monthly)}
                    </TableCell>
                    <TableCell sx={tableCell} align="right">
                      {NoDecimal(row.annual)}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell sx={tableTotal}>
                    Total Monthly Gross Salary
                  </TableCell>
                  <TableCell sx={tableTotal} align="right">
                    {NoDecimal(totalMonthly)}
                  </TableCell>
                  <TableCell sx={tableTotal} align="right">
                    {NoDecimal(totalAnnualFinal)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}
        >
          <Box>
            <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
              {company.signature && (
                <Box
                  component="img"
                  src={company.signature}
                  sx={{ height: "80px" }}
                />
              )}
              {company.stamp && (
                <Box
                  component="img"
                  src={company.stamp}
                  sx={{ height: "100px" }}
                />
              )}
            </Box>
            <Typography>{company.hrName}</Typography>
            <Typography>HR Relations Lead</Typography>
          </Box>

          <Box sx={{ width: "45%", mt: 8 }}>
            <Typography>Signature : ___________________</Typography>
            <Typography>Candidate Name : {employeeName}</Typography>
          </Box>
        </Box>
      </A4Layout>
    </>
  );
}
