import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import cubeage_stamp from "../../../../../assets/images/cubeagetechnology/cubeage_stamp.png";

/* ---------------- Helpers ---------------- */

const fmt = (n) =>
  Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const round0 = (n) => Math.round(n);

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return isNaN(d)
    ? date
    : d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
};

/* ---------------- Page Layout Header Update ---------------- */

const PageLayout = ({ children, company }) => (
  <Box
    sx={{
      width: "210mm",
      minHeight: "297mm",
      backgroundColor: "white",
      fontFamily: "'Calibri','Arial',sans-serif",
      marginBottom: "20px",
      "@media print": { marginBottom: 0, breakAfter: "page" },
    }}
  >
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

    <Box sx={{ px: 7, py: 4 }}>{children}</Box>
  </Box>
);

const TC = (extra = {}) => ({
  border: "1px solid #000",
  padding: "8px",
  fontSize: "13px",
  ...extra,
});

/* ============================================================ */

const CubeageOffer = ({ company = {}, data = {} }) => {
  // ================= ANNUAL CTC INPUT =================
  const annualCTC = round0(Number(data.salary || 0));

  // ================= MONTHLY CTC =================
  const monthlyCTC = round0(annualCTC / 12);

  // ================= STATIC PF =================
  const pfMonthly = 3750;

  // ================= FIXED PERCENTAGES =================
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);

  // ================= ADJUSTED BASIC =================
  const basicMonthly = round0(
    monthlyCTC -
    (hraMonthly + daMonthly + specialMonthly + foodMonthly + pfMonthly)
  );

  const rows = [
    ["Basic", basicMonthly],
    ["House Rent Allowance", hraMonthly],
    ["Dearness Allowance", daMonthly],
    ["Special Allowance", specialMonthly],
    ["Food Allowance", foodMonthly],
    ["Provident Fund (PF)", pfMonthly]
  ];

  /* ---------------- Fixed PF Deductions ---------------- */


  const employeeName = data.candidateName || data.employeeName || "";
  const displayName = employeeName ? `${data.mrms || "Mr."} ${employeeName}`.trim() : "";
  const position = data.position || "Software Test Engineer";
  const location = data.location || data.workLocation || company.city || "Pune";
  const joiningDate = data.joiningDate || "25 July 2023";
  const issueDate = data.issueDate || "";
  const workSchedule = data.workSchedule || "Monday to Friday";
  const workingHours = data.workingHours || "10 AM to 7 PM";

  return (
    <Box>
      {/* ================= PAGE 1 ================= */}
      <PageLayout company={company}>

        {/* Date on top right */}
        <Typography align="right" mb={3} fontWeight="bold" fontSize="16px">
          Date: {formatDate(issueDate)}
        </Typography>

        {/* Offer Letter centered */}
        <Typography align="center" fontWeight="bold" fontSize="18px" mb={4}>
          Offer Letter
        </Typography>

        <Typography mb={3} fontWeight="bold" fontSize="16px">
          {displayName},
        </Typography>

        <Typography textAlign="justify" mb={3} lineHeight={1.8} fontSize="15px">
          We are happy to offer you a position at <strong>{company.name || "Cubeage Technology Services Pvt. Ltd."}</strong> with the IT department as the <strong>{position}</strong>.
        </Typography>

        <Typography textAlign="justify" mb={3} lineHeight={1.8} fontSize="15px">
          The employment will commence on the <strong>{formatDate(joiningDate)}</strong>. In this opportunity your compensation will be <strong> ₹ {annualCTC.toLocaleString('en-IN')} per year</strong>.
        </Typography>

        <Typography textAlign="justify" mb={3} lineHeight={1.8} fontSize="15px">
          You will be working at our head office, [{location}] and your work schedule is [{workSchedule}] from [{workingHours}].
        </Typography>

        <Typography textAlign="justify" mb={3} lineHeight={1.8} fontSize="15px">
          During your tenure, you may get access to some of the company's confidential information. By accepting this offer, you agree not to disclose such information without prior approval.
        </Typography>

        <Typography textAlign="justify" mb={3} lineHeight={1.8} fontSize="15px">
          Please sign and send this offer letter to accept the position. We look forward to working with you.
        </Typography>

        <Typography mb={4} fontSize="15px">
          Wishing you all Success.
        </Typography>

        {/* SIGNATURE BLOCK */}
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <img src={cubeage_stamp} alt="stamp" style={{ width: 100 }} />
            {company.signature && (
              <img src={company.signature} alt="signature" style={{ height: 60 }} />
            )}
          </Box>
          <Typography fontSize="15px">Authorized Signature,</Typography>
          <Typography fontWeight="bold" fontSize="15px">
            For {company.name || "Cubeage Technology Services Pvt. Ltd."}
          </Typography>
        </Box>

      </PageLayout>

      {/* ================= PAGE 2 ================= */}
      <PageLayout company={company}>

        <Typography align="center" fontWeight="bold" fontSize="18px" sx={{ textDecoration: "underline" }} mb={5}>
          Compensation Structure
        </Typography>

        <Box sx={{ px: 4 }}>
          <Typography mb={1} fontSize="14px" fontWeight="bold">
            Name: {displayName}
          </Typography>
          <Typography mb={1} fontSize="14px" fontWeight="bold">
            Designation: {position}
          </Typography>
          <Typography mb={4} fontSize="14px" fontWeight="bold">
            Location: {location}
          </Typography>

          <Box display="flex" justifyContent="center">
            <Table sx={{ width: "80%", borderCollapse: "collapse", border: "1px solid #000" }}>
              <TableBody>
                {/* Header */}
                <TableRow sx={{ backgroundColor: "#bfbfbf" }}>
                  <TableCell sx={TC({ fontWeight: "bold", textAlign: "center" })}>Components</TableCell>
                  <TableCell sx={TC({ fontWeight: "bold", textAlign: "center" })}>Amount/Month</TableCell>
                  <TableCell sx={TC({ fontWeight: "bold", textAlign: "center" })}>Amount/Annum</TableCell>
                </TableRow>

                {/* Earnings */}
                {rows.map(([label, value]) => (
                  <TableRow key={label}>
                    <TableCell sx={TC({ textAlign: "center" })}>{label}</TableCell>
                    <TableCell sx={TC({ textAlign: "center" })}>{fmt(value)}</TableCell>
                    <TableCell sx={TC({ textAlign: "center" })}>{fmt(value * 12)}</TableCell>
                  </TableRow>
                ))}



                {/* CTC */}
                <TableRow sx={{ backgroundColor: "#bfbfbf" }}>
                  <TableCell sx={TC({ fontWeight: "bold", textAlign: "center" })}>Gross Salary (CTC)</TableCell>
                  <TableCell sx={TC({ fontWeight: "bold", textAlign: "center" })}>{fmt(monthlyCTC)}</TableCell>
                  <TableCell sx={TC({ fontWeight: "bold", textAlign: "center" })}>{fmt(annualCTC)}</TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </Box>

          <Typography align="center" mt={4} fontSize="13px">
            *PVLP will be payable to you on yearly basis subject to performance review.
          </Typography>
        </Box>
      </PageLayout>
    </Box>
  );
};

export default CubeageOffer;