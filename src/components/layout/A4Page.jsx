// A4Page.js
import React from "react";
import { Box } from "@mui/material";
import placeholderHeader from '../../assets/images/SmartSoftware/smartheaders.png';
import placeholderFooter from '../../assets/images/SmartSoftware/smartfooters.png';
import placeholderWatermark from '../../assets/images/SmartSoftware/Watermark.png';

const A4Page = ({
  headerSrc,
  footerSrc,
  watermarkSrc,
  children,
  contentTop = "44mm", // Adjusted for finer vertical spacing!
  contentBottom = "28mm",
  company, // Add company prop for enhanced branding
}) => {
  const watermarkImage =
    watermarkSrc ?? company?.watermarkImage ?? company?.watermark ?? null;

  return (
    <Box
      sx={{
        width: "210mm", // A4 width for consistent sizing
        minHeight: "297mm", // A4 height for consistent sizing
        height: "297mm", // Fixed height for proper page breaks
        position: "relative",
        bgcolor: "#fff",
        color: "#000", // Industrial standard black text
        overflow: "hidden",
        margin: "0 auto", // Center the page
        boxSizing: "border-box",
        "@media print": {
          width: "210mm",
          height: "297mm", // Fixed height for print
          minHeight: "297mm",
          margin: 0,
          pageBreakAfter: "always",
          pageBreakInside: "avoid",
        },
        // Ensure all text within documents is black
        "& *": {
          color: "#000 !important",
        },
        // Exception for company-specific accent colors (headings only)
        "& .company-accent": {
          color: `${company?.brandColors?.primary || "#000"} !important`,
        },
        "& .company-secondary": {
          color: `${company?.brandColors?.secondary || "#000"} !important`,
        },
      }}
    >
      {/* HEADER - HIGHLIGHT: width = 210mm, height as needed */}
      {(headerSrc ||
        company?.header ||
        company?.headerImage ||
        placeholderHeader) && (
        <Box
          component="img"
          src={
            headerSrc ||
            company?.header ||
            company?.headerImage ||
            placeholderHeader
          }
          alt="Header"
          sx={{
            position: "absolute",
            // right: 10,
            width: "100%",
            height: "auto",
            objectFit: "cover",
            zIndex: 1,
            filter: company?.brandColors?.primary
              ? `hue-rotate(${company.brandColors.hueRotate || 0}deg)`
              : "none",
            "@media print": {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "auto",
            },
          }}
        />
      )}
      {/* FOOTER - HIGHLIGHT: width = 210mm */}
      {(footerSrc || company?.footer || company?.footerImage) && (
        <Box
          component="img"
          src={footerSrc || company?.footer || company?.footerImage}
          alt="Footer"
          sx={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "auto",
            objectFit: "cover",
            zIndex: 1,
            filter: company?.brandColors?.primary
              ? `hue-rotate(${company.brandColors.hueRotate || 0}deg)`
              : "none",
            "@media print": {
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "auto",
            },
          }}
        />
      )}
      {/* WATERMARK - HIGHLIGHT: background only, never overlaps content */}
      {watermarkImage && (
        <Box
          component="img"
          src={watermarkImage}
          alt="Watermark"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "110mm",
            height: "50mm",
            transform: "translate(-50%, -50%)",
            opacity: 0.8, // ✅ better visibility behind content
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0, // ✅ ensures watermark stays behind text
          }}
        />
      )}
      {/* CONTENT */}
      <Box
        className="a4-content-only"
        sx={{
          position: "relative",
          zIndex: 2,
          fontFamily:
            company?.brandColors?.fontFamily ||
            "'TNR-Embedded','Times New Roman',Times,serif",
          px: "20mm",
          pt: contentTop,
          pb: contentBottom,
          lineHeight: 1.38,
          fontSize: "11pt",
          textAlign: "justify",
          whiteSpace: "pre-wrap",
          color: company?.brandColors?.textColor || "#000",
          minHeight: `calc(297mm - ${contentTop} - ${contentBottom})`,
          "& .company-accent": {
            color: company?.brandColors?.primary || "#1976d2",
            fontWeight: "bold",
          },
          "& .company-secondary": {
            color: company?.brandColors?.secondary || "#666",
          },
          "@media print": {
            pageBreakInside: "avoid",
            orphans: 3,
            widows: 3,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default A4Page;
