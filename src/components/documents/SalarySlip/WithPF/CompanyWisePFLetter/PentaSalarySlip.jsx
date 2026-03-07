import React from "react";
import { Box, Typography } from "@mui/material";

/* ===================== HELPERS ===================== */
const money = (v) =>
  Number(v || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 });

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB") : "";

/* Month → September 2025 */
const formatMonthYear = (value) => {
  if (!value) return "";
  const date =
    typeof value === "string" && value.length === 7
      ? new Date(`${value}-01`)
      : new Date(value);

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

/* Number → Words (India Format – NO IMPORT ERROR) */
const numberToWords = (num) => {
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six",
    "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  if (num === 0) return "Zero Only";

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return `${b[Math.floor(n / 10)]} ${a[n % 10]}`;
    if (n < 1000)
      return `${a[Math.floor(n / 100)]} Hundred ${inWords(n % 100)}`;
    if (n < 100000)
      return `${inWords(Math.floor(n / 1000))} Thousand ${inWords(n % 1000)}`;
    return `${inWords(Math.floor(n / 100000))} Lakh ${inWords(n % 100000)}`;
  };

  return `${inWords(num).trim()} Only`;
};

/* ===================== STYLES ===================== */
const cell = {
  border: "1px solid #000",
  padding: "6px 8px",
  fontSize: "13px",
  display: "flex",
  alignItems: "center",
};

const row = { display: "flex", width: "100%" };
const bold = { fontWeight: "bold" };

/* ===================== COMPONENT ===================== */
const PentaSalarySlip = ({ company, data }) => {
  /* ===== AUTO SALARY CALCULATION ===== */
 const totalSalary = Number(data.totalSalary || 35000);

// Earnings (100% Proper Split)
const basic = +(totalSalary * 0.48).toFixed(2);
const hra = +(totalSalary * 0.18).toFixed(2);
const da = +(totalSalary * 0.12).toFixed(2);
const special = +(totalSalary * 0.16).toFixed(2);

// 🔥 FOOD = AUTO BALANCE (No % issue)
const food = +(
  totalSalary - (basic + hra + da + special)
).toFixed(2);

// ===== DEDUCTIONS =====
const pf = 3750;
const pt = Number(data.pt || 200);
const otherDeduction = Number(data.otherDeduction || 2000);

// ===== TOTALS =====
const totalEarning = totalSalary; // Always equal
const totalDeduction = +(pf + pt + otherDeduction).toFixed(2);
const netPay = +(totalEarning - totalDeduction).toFixed(2);

const netPayWords = numberToWords(Math.round(netPay));


  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#fff",
        fontFamily: "Cambria, 'Times New Roman', serif",
      }}
    >
      {/* WATERMARK */}
      <Box
        component="img"
        src={company.watermark || company.watermarkImage}
        alt="Watermark"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-30deg)",
          width: "70%",
          opacity: company.brandColors?.watermarkOpacity || 0.05,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <img src={company.Penta_watermark} alt="" style={{ width: "50%" }} />
      {/* HEADER */}
      <img src={company.headerImage} alt="" style={{ width: "100%" }} />

      <Box sx={{ px: "15mm", pt: "18mm", pb: "40mm" }}>
        {/* COMPANY INFO */}
        <Box sx={{ border: "1px solid #000" }}>
          <Box sx={{ borderBottom: "1px solid #000", p: "4px" }}>
            <Typography align="center" fontWeight="bold">
              {company.name.toUpperCase()}
            </Typography>
          </Box>

          <Box sx={{ borderBottom: "1px solid #000", p: "4px" }}>
            <Typography align="center" fontSize={12} fontWeight="bold">
              {company.address}
            </Typography>
          </Box>

          <Box sx={{ p: "4px" }}>
            <Typography align="center" fontWeight="bold">
              Salary Slip {formatMonthYear(data.month)}
            </Typography>
          </Box>
        </Box>

        {/* MAIN TABLE */}
        <Box sx={{ border: "1px solid #000", borderTop: "none" }}>
          {/* EMP INFO */}
          <Box sx={row}>
            <Box sx={{ ...cell, width: "25%", ...bold }}>Employee Name</Box>
            <Box sx={{ ...cell, width: "25%" }}>{data.employeeName}</Box>
            <Box sx={{ ...cell, width: "25%", ...bold }}>Employee ID</Box>
            <Box sx={{ ...cell, width: "25%" }}>{data.employeeId}</Box>
          </Box>

          <Box sx={row}>
            <Box sx={{ ...cell, width: "25%", ...bold }}>Designation</Box>
            <Box sx={{ ...cell, width: "25%" }}>{data.designation}</Box>
            <Box sx={{ ...cell, width: "25%", ...bold }}>DOJ</Box>
            <Box sx={{ ...cell, width: "25%" }}>{formatDate(data.doj)}</Box>
          </Box>

          <Box sx={row}>
            <Box sx={{ ...cell, width: "25%", ...bold }}>Mode</Box>
            <Box sx={{ ...cell, width: "25%" }}>
              Bank Name– {data.mode}
              <br />
              Account No – {data.accountNo}
            </Box>
            <Box sx={{ ...cell, width: "25%", ...bold }}>Working Days</Box>
            <Box sx={{ ...cell, width: "25%" }}>{data.workdays}</Box>
          </Box>

          {/* HEADERS */}
          <Box sx={row}>
            <Box sx={{ ...cell, width: "25%", ...bold }}>Earnings</Box>
            <Box sx={{ ...cell, width: "25%", ...bold, justifyContent: "flex-end" }}>Amount</Box>
            <Box sx={{ ...cell, width: "25%", ...bold }}>Deduntuctions</Box>
            <Box sx={{ ...cell, width: "25%", ...bold, justifyContent: "flex-end" }}>Amount</Box>
          </Box>

          {[
            ["BASIC", basic, "PF", pf],
            ["HRA", hra, "PT", pt],
            ["DEARNESS ALLOWANCE", da, "Other Deduction", otherDeduction],
            ["SPECIAL ALLOWANCE", special, "", ""],
            ["FOOD ALLOWANCE", food, "", ""],
            ["PF", pf]
          ].map((r, i) => (
            <Box sx={row} key={i}>
              <Box sx={{ ...cell, width: "25%", ...bold }}>{r[0]}</Box>
              <Box sx={{ ...cell, width: "25%", justifyContent: "flex-end" }}>{money(r[1])}</Box>
              <Box sx={{ ...cell, width: "25%" }}>{r[2]}</Box>
              <Box sx={{ ...cell, width: "25%", justifyContent: "flex-end" }}>
                {r[3] ? money(r[3]) : ""}
              </Box>            </Box>
          ))}

          {/* TOTAL */}
          <Box sx={row}>
            <Box sx={{ ...cell, width: "25%", ...bold }}>Total</Box>
            <Box sx={{ ...cell, width: "25%", ...bold, justifyContent: "flex-end" }}>
              {money(totalEarning)}
            </Box>
            <Box sx={{ ...cell, width: "25%", ...bold }}>Total Deduction</Box>
            <Box sx={{ ...cell, width: "25%", ...bold, justifyContent: "flex-end" }}>
              {money(totalDeduction)}
            </Box>
          </Box>

          {/* NET PAY */}
          <Box sx={row}>
            <Box sx={{ ...cell, width: "25%", ...bold, }}>Net Pay</Box>
            <Box sx={{ ...cell, width: "75%", ...bold, }}>
              {money(netPay)}
            </Box>
          </Box>

          {/* IN WORDS */}
          <Box sx={row}>
            <Box sx={{ ...cell, width: "25%", ...bold }}>In Words</Box>
            <Box sx={{ ...cell, width: "75%" }}>{netPayWords}</Box>
          </Box>

          {/* SIGNATURE */}
          <Box sx={{ ...row, height: "100px" }}>
            <Box sx={{ ...cell, width: "50%" }} />
            <Box sx={{ ...cell, width: "25%", justifyContent: "center" }}>
              <img src={company.stamp} height={80} alt="" />
            </Box>
            <Box sx={{ ...cell, width: "25%", flexDirection: "column", alignItems: "center" }}>
              <img src={company.signature} height={45} alt="" />
              <Typography fontSize={12} fontWeight="bold">Signature</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* FOOTER */}
      <img src={company.footerImage} alt="" style={{ width: "100%" }} />
    </Box>
  );
};

export default PentaSalarySlip;
