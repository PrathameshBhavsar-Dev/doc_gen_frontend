import dilipSignature from "../../../../../assets/images/devconssoftware/dilip_kumar_signature.png";

import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { formatCurrency } from "../../../../../utils/salaryCalculations";
import A4Page from "../../../../layout/A4Page";
import SalaryStructureTable from "../../../../common/SalaryStructureTable";
import watermark from "../../../../../assets/images/Nimbja/nimbja_watermark.png";
const NimbjaIncrement = ({ company = {}, data = {} }) => {
  /* ================= HELPER ================= */
  const round0 = (num) => Math.round(num);

  // ================= MONTHLY CTC =================
  const annualCTC = Number(data.newCTC || 0);

  // ================= SALARY TABLE =================

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
      : "";

  const issueDate = data.increment_letter?.issueDate ?? data.issueDate;

  return (
    <>
      {/* =====================================================
          PAGE 1 – DEVCONS INCREMENT LETTER
      ====================================================== */}
      <Box
        sx={{
          width: "210mm",
          minHeight: "297mm",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
          "& *": {
            fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
          },
          pageBreakAfter: "always",
        }}
      >
        {company?.headerImage && (
          <img
            src={company.headerImage}
            alt="Header"
            style={{ width: "100%" }}
          />
        )}

        <Box
          component="img"
          src={watermark}
          alt="watermark"
          sx={{
            position: "absolute",
            top: "47%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            opacity: 0.4,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            px: "25mm",
            py: "22mm",
            flexGrow: 1,
            fontSize: "14px",
            lineHeight: 1.8,
            color: "#000",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              textAlign: "right",
              mb: 6,
              mt: "-12mm",
              fontFamily: "Bahnschrift",
            }}
          >
            {new Date(issueDate).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </Typography>

          <Typography
            sx={{
              textAlign: "Center",
              marginTop: "-8mm",
              mb: "5mm",
              fontFamily: "Verdana",
              textDecoration: "underline",
              fontSize: "15px",
            }}
          >
            Appraisal Letter
          </Typography>

          <Typography sx={{ mb: 4, fontFamily: "Bahnschrift" }}>
            Dear {data.employeeName},
          </Typography>

          <Typography
            sx={{ mb: 4, textAlign: "justify", fontFamily: "Bahnschrift" }}
          >
            In Recognition of your previous years of service with{" "}
            <strong>{company.name}</strong>, we are pleased to offer you a
            salary increment effective{" "}
            <strong>
              {new Date(data.effectiveDate).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </strong>
            . Your salary will increase to{" "}
            <strong>{formatCurrency(annualCTC)}</strong> per annum.
          </Typography>

          <Typography
            sx={{ mb: 4, textAlign: "justify", fontFamily: "Bahnschrift" }}
          >
            Your loyalty and commitment to the company over the years have been
            invaluable and this increment is a token of our appreciation. We
            look forward to many more years of your dedication and contribution.
          </Typography>

          <Typography sx={{ mb: 8, fontFamily: "Bahnschrift" }}>
            Once again, thank you for being such a reliable member of our team.
          </Typography>

          <Typography sx={{ mb: 6, fontFamily: "Bahnschrift" }}>
            Yours Sincerely,
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 4, mb: 2 }}>
            {company?.CEO && (
              <img src={company.CEO} alt="Signature" style={{ height: 60 }} />
            )}
            {company?.stamp && (
              <img
                src={company.stamp}
                alt="Stamp"
                style={{ height: 110, marginLeft: "-20px" }}
              />
            )}
          </Box>

          <Typography sx={{ fontWeight: 600, fontFamily: "Bahnschrift" }}>
            CEO & Managing Director
          </Typography>
        </Box>

        {company?.footerImage && (
          <img
            src={company.footerImage}
            alt="Footer"
            style={{ width: "100%" }}
          />
        )}
      </Box>

      {/* ======================================================
          PAGE 2 – SALARY ANNEXURE
      ====================================================== */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box
          component="img"
          src={watermark}
          alt="watermark"
          sx={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            opacity: 0.4,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* CONTENT */}
        <Box
          className="a4-content-only"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              textAlign: "right",
              mb: "5mm",
              mt: "-8mm",
              fontSize: "11pt",
              fontFamily: "Bahnschrift",
            }}
          >
            {formatDate(issueDate)}
          </Typography>

          <Typography
            sx={{ mb: "6mm", fontSize: "11pt", fontFamily: "Bahnschrift" }}
          >
            <strong>
              Ref:NSS\VER1.1\PUN\PIMGUR\ADM-TEST\{data.employeeId}
            </strong>
          </Typography>

          {/* 🔥 ONLY THIS PART IS REPLACED */}
          <SalaryStructureTable ctc={annualCTC} />
        </Box>
      </A4Page>
    </>
  );
};

export default NimbjaIncrement;
