

import React from "react";
import {
  Typography,

  Box,

} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { formatCurrency } from "../../../../../utils/salaryCalculations";
import SalaryStructureTable from "../../../../common/SalaryStructureTable";


const NimbjaOfferPage2 = ({
  company,
  data,
  salaryRows,
  totalMonthly,
  totalAnnual,
}) => {
  /* ================= TABLE STYLES (UNCHANGED) ================= */


  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <Box
        component="img"
        src={company.watermark}
        alt="watermark"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          opacity: 0.4,
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      {/* CONTENT */}
      <Box
        className="a4-content-only"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* <Typography
          sx={{
            textAlign: "right",
            mb: "5mm",
            mt: "-12mm",
            fontSize: "11pt",
            fontFamily: "Bahnschrift",
          }}
        >
          {formatDate(data.issueDate)}
        </Typography> */}
        {/* <Typography
          sx={{ mb: "6mm", fontSize: "11pt", fontFamily: "Bahnschrift" }}
        >
          <strong>
            Ref:NSS\VER1.1\PUN\PIMGUR\ADM-TEST\NSS0757 {data.employeeId}
          </strong>
        </Typography> */}
        {/* 🔥 ONLY THIS PART IS REPLACED */}

        <Typography
          sx={{
            textAlign: "right",
            mb: "5mm",
            mt: "-8mm",
            fontSize: "11pt",
            fontFamily: "Bahnschrift",
          }}
        >
          {formatDate(data.issueDate)}
        </Typography>
        <SalaryStructureTable
          salaryRows={salaryRows}
          totalMonthly={totalMonthly}
          totalAnnual={totalAnnual}
          data={data}
          formatDate={formatDate}
        />
      </Box>

      {/* Signature Block */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 9 }}>
        <Box>
          <Box sx={{ display: "flex", gap: 3 }}>
            {company?.signature && (
              <img
                src={company.signature}
                alt="Signature"
                style={{ height: 45, marginTop: "7mm" }}
              />
            )}
            {company?.stamp && (
              <img src={company.stamp} alt="Stamp" style={{ height: 100 }} />
            )}
          </Box>
          <strong>
            <Typography mt={1} sx={{ fontFamily: "Bahnschrift" }}>
              <strong>{company.hrName}</strong>
            </Typography>
            <Typography sx={{ fontFamily: "Bahnschrift" }}>
              <strong>HR Relations Lead</strong>
            </Typography>
          </strong>
        </Box>

        <Box minWidth="250px" sx={{ mt: 13, fontFamily: "Bahnschrift" }}>
          <Typography sx={{ fontFamily: "Bahnschrift" }}>
            <strong>Signature:</strong> __________________
          </Typography>
          <Typography mt={2} sx={{ mt: 1.5, fontFamily: "Bahnschrift" }}>
            <strong>Candidate Name:</strong>{" "}
            <strong>{data.candidateName}</strong>
          </Typography>
        </Box>
      </Box>
    </A4Page>
  );
};

export default NimbjaOfferPage2;
