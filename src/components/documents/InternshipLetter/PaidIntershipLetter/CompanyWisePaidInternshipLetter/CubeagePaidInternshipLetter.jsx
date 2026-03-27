import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

/* ================= PAGE LAYOUT ================= */
const PageLayout = ({ children, company, data }) => {
  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        position: "relative",
        backgroundColor: "white",
        fontFamily: "'Calibri', 'Arial', sans-serif",
        marginBottom: "20px",
        "@media print": {
          marginBottom: 0,
          breakAfter: "page",
        },
      }}
    >
      {/* WATERMARK */}
      {company?.watermark && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.1,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <img src={company.watermark} alt="watermark" width={500} />
        </Box>
      )}

      {/* HEADER: Logo + Address (Matching Offer Letter style) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          gap: 1,
          px: 4,
          py: 2,
          borderBottom: "2px solid #ccc",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
          {company.logo && (
            <img src={company.logo} alt="logo" style={{ height: 100 }} />
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography fontSize="12px" mt={1}>
            <strong>Office:</strong> {company.address || "Office No. 102-6, First Floor Ganesham-4 Commercial, BRTS Road Pimple Saudagar, Pune-411027"}
          </Typography>
          <Typography fontSize="12px">
            <strong>Contact No:</strong> {company.phone || "9112100661"} || <strong>Email:</strong> {company.email || "contact@cubeagetech.com, hr@cubeagetech.com"}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: 8, py: 3, position: "relative", zIndex: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

/* ================= HELPERS ================= */
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return isNaN(d)
    ? date
    : d.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
};

const formatCurrency = (num) =>
  Number(num).toLocaleString("en-IN", {
    // Rounding is now handled in logic, decimals removed from display
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const numberToWords = (num) => {
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
    "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const convert = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
    if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
    if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
    return "";
  };

  return convert(num) + " Only";
};

/* ================= MAIN COMPONENT ================= */
const CubeagePaidInternshipLetter = ({ company = {}, data = {} }) => {
  const firstName = data.employeeName?.split(" ")[0] || data.internName?.split(" ")[0] || "";

  /* ================= SALARY LOGIC ================= */
  const round0 = (num) => Math.round(Number(num) || 0);

  const monthlyCTC = round0(Number(data.stipend || 0));
  const annualCTC = round0(monthlyCTC * 12);

  const basicMonthly = round0(monthlyCTC * 0.40);
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);
  const miscMonthly = round0(monthlyCTC - (basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly));

  const basicAnnual = round0(basicMonthly * 12);
  const hraAnnual = round0(hraMonthly * 12);
  const daAnnual = round0(daMonthly * 12);
  const specialAnnual = round0(specialMonthly * 12);
  const foodAnnual = round0(foodMonthly * 12);
  const miscAnnual = round0(miscMonthly * 12);

  const salaryComponents = [
    { name: "Basic", monthly: basicMonthly, annual: basicAnnual },
    { name: "House Rent Allowance", monthly: hraMonthly, annual: hraAnnual },
    { name: "Dearness Allowance", monthly: daMonthly, annual: daAnnual },
    { name: "Special Allowance", monthly: specialMonthly, annual: specialAnnual },
    { name: "Food Allowance", monthly: foodMonthly, annual: foodAnnual },
    { name: "Misc. Allowance", monthly: miscMonthly, annual: miscAnnual },
  ];

  const totalMonthly = round0(salaryComponents.reduce((sum, r) => sum + r.monthly, 0));
  const totalAnnual = round0(salaryComponents.reduce((sum, r) => sum + r.annual, 0));

  const companyName = company?.name || company?.companyName;

  return (
    <Box>
      {/* ================= PAGE 1 – INTERNSHIP LETTER ================= */}
      <PageLayout company={company} data={data}>
        {/* DATE */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Typography fontWeight="bold">Date: {formatDate(data.issueDate)}</Typography>
        </Box>

        <Typography mb={1}>
          <strong>Name :</strong> {data.mrms} {data.employeeName || data.internName}
        </Typography>

        <Typography mb={3}>
          <strong>Subject :</strong> Letter of intent for the Internship of position as{" "}
          <strong>{data.designation || data.field}</strong>
        </Typography>

        <Typography mb={3}>Dear {firstName},</Typography>

        <Typography mb={2} textAlign="justify" lineHeight={1.7}>
          We are pleased to offer you the Internship on position as a{" "}
          <strong>{data.designation || data.field}</strong> with{" "}
          <strong>{companyName}</strong>  effective date{" "}
          <strong>{formatDate(data.startDate)}</strong> considering your
          performance and support towards the organization.
        </Typography>

        <Typography mb={2} textAlign="justify" lineHeight={1.7}>
          If there is any change in the date of joining, changes can be taken
          under consideration. Your total Gross salary will be Rs.{" "}
          <strong>
            {formatCurrency(annualCTC)} ({numberToWords(Math.round(annualCTC))})
          </strong>{" "}
          per year.
        </Typography>

        <Typography mb={2} textAlign="justify" lineHeight={1.7}>
          Subject to various deductions as per companies and government policy.
        </Typography>

        <Typography mb={2} textAlign="justify" lineHeight={1.7}>
          We welcome you to <strong>{companyName}</strong> family and hope it
          would be the beginning of a long and mutually beneficial association.
        </Typography>

        <Typography mb={4} textAlign="justify" lineHeight={1.7}>
          Kindly acknowledge the duplicate copy of this letter as an acceptance
          of this offer.
        </Typography>

        <Typography mb={3}>Yours Sincerely,</Typography>

        {/* SIGNATURE BLOCK */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Box>
            <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
              {company?.signature && (
                <img src={company.signature} alt="Signature" style={{ height: 60 }} />
              )}
              {company?.stamp && (
                <img src={company.stamp} alt="Stamp" style={{ height: 90 }} />
              )}
            </Box>
            <Typography>Authorized Signature</Typography>
            <Typography fontWeight={700}>For {companyName}</Typography>
          </Box>

          <Box minWidth="260px" mb={3}>
            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography mr={1}>Signature :</Typography>
              <Box sx={{ flexGrow: 1, borderBottom: "1px solid #000" }} />
            </Box>
            <Typography>
              Candidate Name : {data.employeeName || data.internName}
            </Typography>
          </Box>
        </Box>

        <Typography mt={4} textAlign="center" sx={{ textDecoration: "underline" }}>
          <strong>Enclosures: Annexure A – Salary Structure</strong>
        </Typography>
      </PageLayout>

      {/* ================= PAGE 2 – ANNEXURE A (SALARY STRUCTURE) ================= */}
      <PageLayout company={company} data={data}>
        {/* TABLE WATERMARK */}
        <Box sx={{ position: "relative", overflow: "hidden" }}>

          <Typography
            align="center"
            fontWeight={600}
            mb={5}
            sx={{ textDecoration: "underline", position: "relative", zIndex: 1 }}
          >
            Annexure A – Salary Structure
          </Typography>

          <Table
            sx={{
              width: "100%",
              border: "1px solid #000",
              borderCollapse: "collapse",
              position: "relative",
              zIndex: 1,
              "& th, & td": {
                border: "1px solid #000",
                padding: "8px 12px",
                fontSize: "14px",
              },
            }}
          >
            <TableBody>
              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell><strong>Salary Components</strong></TableCell>
                <TableCell align="center"><strong>Per Month (Rs.)</strong></TableCell>
                <TableCell align="center"><strong>Per Annum (Rs.)</strong></TableCell>
              </TableRow>

              {salaryComponents.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="center">{formatCurrency(row.monthly)}</TableCell>
                  <TableCell align="center">{formatCurrency(row.annual)}</TableCell>
                </TableRow>
              ))}

              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell><strong>Total Monthly Gross Salary</strong></TableCell>
                <TableCell align="center"><strong>{formatCurrency(totalMonthly)}</strong></TableCell>
                <TableCell align="center"><strong>{formatCurrency(totalAnnual)}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        {/* SIGNATURE ON ANNEXURE PAGE */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 10 }}>
          <Box>
            <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
              {company?.signature && (
                <img src={company.signature} alt="Signature" style={{ height: 65 }} />
              )}
              {company?.stamp && (
                <img src={company.stamp} alt="Stamp" style={{ height: 95 }} />
              )}
            </Box>
            <Typography>Authorized Signature</Typography>
            <Typography fontWeight={700}>For {companyName}</Typography>
          </Box>

          <Box minWidth="260px" mb={3}>
            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography mr={1}>Signature :</Typography>
              <Box sx={{ flexGrow: 1, borderBottom: "1px solid #000" }} />
            </Box>
            <Typography>
              Candidate Name : {data.employeeName || data.internName}
            </Typography>
          </Box>
        </Box>
      </PageLayout>
    </Box>
  );
};

export default CubeagePaidInternshipLetter;
