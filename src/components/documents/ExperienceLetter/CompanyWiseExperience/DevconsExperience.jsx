import React from "react";
import { Box, Typography } from "@mui/material";

const DevconsExperience = ({ company, data }) => {
  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
        "& *": {
          fontFamily: `"Yu Gothic", "Segoe UI", Arial, sans-serif`,
        },
      }}
    >
      {/* ================= HEADER ================= */}
      {company?.headerImage && (
        <img
          src={company.headerImage}
          alt="Company Header"
          style={{ width: "100%", display: "block" }}
        />
      )}

      {/* ================= CONTENT ================= */}
      <Box
        className="a4-content-only"
        sx={{
          px: "25mm",
          py: "25mm",
          flexGrow: 1,
          fontSize: "15px",
          lineHeight: 1.65,
        }}
      >
        {/* TITLE */}
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 600,
            textDecoration: "underline",
            mb: 9,
          }}
        >
          EXPERIENCE LETTER
        </Typography>

        {/* GREETING (MATCHED) */}
        <Typography sx={{ mb: 2, color: "#000",  }}>
          Dear{" "}
          <Box component="span" sx={{ fontWeight: 600 }}>
            {data.employeeName}
          </Box>{" "}
          ({data.designation}),
        </Typography>

        {/* PARAGRAPH 1 */}
        <Typography sx={{ mb: 2, textAlign: "justify", color: "#000",  }}>
          You have worked in our organization from{" "}
          {new Date(data.joiningDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}{" "}
          until{" "}
          {new Date(data.relievingDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}{" "}
          within IT Department.
        </Typography>

        {/* PARAGRAPH 2 */}
        <Typography sx={{ mb: 2, textAlign: "justify", color: "#000"  }}>
          Your performance during the employment has been appreciated in
          evaluations each year and your contribution towards the organization
          have always been valued.
        </Typography>

        {/* PARAGRAPH 3 */}
        <Typography sx={{ mb: 9, color: "#000",  }}>
          We wish you all the best for your future endeavors.
        </Typography>

        {/* SIGN OFF (BOLD & POSITIONED) */}
        <Typography sx={{ mb: 2.5, fontWeight: 600 }}>
          Yours sincerely,
        </Typography>

        {/* SIGNATURE + STAMP */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}>
          {company?.signature && (
            <img
              src={company.signature}
              alt="HR Signature"
              style={{ height: "60px" }}
            />
          )}
          {company?.stamp && (
            <img
              src={company.stamp}
              alt="Company Stamp"
              style={{ height: "90px" }}
            />
          )}
        </Box>

        {/* HR DETAILS (ALL BOLD, GROUPED) */}
        <Typography sx={{ fontWeight: 600, color: "#000",  }}>
          {company.hrName}
        </Typography>
        <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#000",  }}>
          HR Relations Lead
        </Typography>
        <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#000",  }}>
          Department of HR Relations
        </Typography>
      </Box>

      {/* ================= FOOTER ================= */}
      {company?.footerImage && (
        <img
          src={company.footerImage}
          alt="Company Footer"
          style={{ width: "100%", display: "block" }}
        />
      )}
    </Box>
  );
};
export default DevconsExperience;





