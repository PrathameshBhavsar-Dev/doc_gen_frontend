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


const NimbjaIncrement = ({ company = {}, data = {} }) => {
  /* ================= HELPER ================= */
  const round0 = (num) => Math.round(num);

  // ================= MONTHLY CTC =================
  const monthlyCTC = round0(Number(data.newCTC || 0));

  // ================= UPDATED PERCENTAGES =================
  const basicMonthly = round0(monthlyCTC * 0.48); // 40% + 8%
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);

  // ================= STATIC PF =================
  const pfMonthly = 3750;

  // ================= ANNUAL VALUES =================
  const basicAnnual = basicMonthly * 12;
  const hraAnnual = hraMonthly * 12;
  const daAnnual = daMonthly * 12;
  const specialAnnual = specialMonthly * 12;
  const foodAnnual = foodMonthly * 12;
  const pfAnnual = pfMonthly * 12;

  // ================= SALARY TABLE =================
  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["Bouqet Of Benefits", hraMonthly, hraAnnual],
    ["HRA", daMonthly, daAnnual],
    ["City Allowance", specialMonthly, specialAnnual],
    ["Superannuation Fund", foodMonthly, foodAnnual],
    ["Provident Fund (PF)", pfMonthly, pfAnnual], // Separate
  ];

  // ================= TOTAL EARNINGS =================
  const totalMonthly =
    basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly;

  const totalAnnual = totalMonthly * 12;
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

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
          sx={{
            px: "25mm",
            py: "22mm",
            flexGrow: 1,
            fontSize: "14px",
            lineHeight: 1.8,
            color: "#000",
          }}
        >
          <Typography
            sx={{
              textAlign: "right",
              mb: 6,
              mt: "-4mm",
              fontFamily: "Bahnschrift",
            }}
          >
            {new Date(data.issueDate).toLocaleDateString("en-US", {
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
            <strong>{formatCurrency(totalAnnual)}</strong> per annum.
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
              <img src={company.stamp} alt="Stamp" style={{ height: 110 }} />
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
        <Box className="a4-content-only">
          <Typography
            sx={{
              textAlign: "right",
              mb: "5mm",
              mt: "-12mm",
              fontSize: "11pt",
              fontFamily: "Bahnschrift",
            }}
          >
            {formatDate(data.issueDate)}
          </Typography>

          <Typography
            sx={{ mb: "6mm", fontSize: "11pt", fontFamily: "Bahnschrift" }}
          >
            <strong>
              Ref:NSS\VER1.1\PUN\PIMGUR\ADM-TEST\{data.employeeId}
            </strong>

            
          </Typography>
            
            

          {/* 🔥 ONLY THIS PART IS REPLACED */}
          <SalaryStructureTable
            salaryRows={salaryRows}
            totalMonthly={totalMonthly}
            totalAnnual={totalAnnual}
            data={data}
            formatDate={formatDate}
          />
        </Box>

        
      </A4Page>
    </>
  );
};

export default NimbjaIncrement;
