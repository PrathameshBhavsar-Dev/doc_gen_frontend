// import React from "react";
// import {
//   Typography,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   Box,
//   Grid,
// } from "@mui/material";
// import A4Page from "../../../../layout/A4Page";
// import { formatCurrency } from "../../../../../utils/salaryCalculations";

// const NimbjaOfferPage2 = ({ company, data }) => {
//   const annualSalary = Number(data.salary) || 0;

//   /* ================= SALARY CALC ================= */
//   const components = [
//     { name: "Basic Salary", percent: 40.13 },
//     { name: "House Rent Allowance (HRA)", percent: 17.98 },
//     { name: "Conveyance Allowance", percent: 15.99 },
//     { name: "Medical Allowance", percent: 13.94 },
//     { name: "Special Allowance", percent: 11.96 },
//   ];

//   const CELL = {
//     border: "1px solid #333",
//     fontSize: "11pt",
//   };
//   const CELL_COMPACT = {
//     border: "1px solid #333",
//     padding: "4px 8px", // 🔽 reduce padding
//     fontSize: "10.5pt", // optional (keep readable)
//     lineHeight: 1.2, // 🔽 reduce vertical space
//   };

//   const rows = components.map((c) => {
//     const annual = (annualSalary * c.percent) / 100;
//     return {
//       name: c.name,
//       monthly: Math.round(annual / 12),
//       annual: Math.round(annual),
//     };
//   });

//   const totalMonthly = rows.reduce((a, r) => a + r.monthly, 0);
//   const totalAnnual = rows.reduce((a, r) => a + r.annual, 0);

//   return (
//     <A4Page
//       headerSrc={company.headerImage}
//       footerSrc={company.footerImage}
//       watermarkSrc={company.watermarkImage || company.watermark}
//       contentTop="48mm"
//       contentBottom="28mm"
//       company={company}
//     >
//       {/* ================= TITLE ================= */}
//       <Typography
//         align="center"
//         sx={{
//           fontSize: "16pt",
//           fontWeight: 700,
//           textDecoration: "underline",
//           mb: "8mm",
//         }}
//       >
//         Annexure – A : Salary Structure
//       </Typography>

//       {/* ================= TABLE ================= */}
//       <TableContainer>
//         <Table
//           size="small" // 🔽 IMPORTANT
//           sx={{
//             borderCollapse: "collapse",
//             border: "1px solid #333",
//           }}
//         >
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#1976d2" }}>
//               <TableCell
//                 sx={{ ...CELL_COMPACT, color: "#fff", fontWeight: "bold" }}
//               >
//                 Salary Component
//               </TableCell>
//               <TableCell
//                 align="right"
//                 sx={{ ...CELL_COMPACT, color: "#fff", fontWeight: "bold" }}
//               >
//                 Per Month (₹)
//               </TableCell>
//               <TableCell
//                 align="right"
//                 sx={{ ...CELL_COMPACT, color: "#fff", fontWeight: "bold" }}
//               >
//                 Per Annum (₹)
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {rows.map((row, i) => (
//               <TableRow key={i}>
//                 <TableCell sx={CELL_COMPACT}>{row.name}</TableCell>
//                 <TableCell align="right" sx={CELL_COMPACT}>
//                   {formatCurrency(row.monthly)}
//                 </TableCell>
//                 <TableCell align="right" sx={CELL_COMPACT}>
//                   {formatCurrency(row.annual)}
//                 </TableCell>
//               </TableRow>
//             ))}

//             {/* TOTAL ROW */}
//             <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//               <TableCell sx={{ ...CELL_COMPACT, fontWeight: "bold" }}>
//                 Total Gross Salary
//               </TableCell>
//               <TableCell
//                 align="right"
//                 sx={{ ...CELL_COMPACT, fontWeight: "bold" }}
//               >
//                 {formatCurrency(totalMonthly)}
//               </TableCell>
//               <TableCell
//                 align="right"
//                 sx={{ ...CELL_COMPACT, fontWeight: "bold" }}
//               >
//                 {formatCurrency(totalAnnual)}
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* ================= SIGNATURE ================= */}
//       <Box
//         sx={{ mt: "10mm", display: "flex", justifyContent: "space-between" }}
//       >
//         <Box>
//           <Grid container spacing={2} alignItems="center">
//             {company.signature && (
//               <Grid item>
//                 <Box
//                   component="img"
//                   src={company.signature}
//                   sx={{ width: 120 }}
//                 />
//               </Grid>
//             )}
//             {company.stamp && (
//               <Grid item>
//                 <Box component="img" src={company.stamp} sx={{ width: 100 }} />
//               </Grid>
//             )}
//           </Grid>

//           <Typography sx={{ mt: "4mm", fontWeight: "bold" }}>
//             {company.hrName}
//           </Typography>
//           <Typography>HR Manager – HR Shared Services</Typography>
//         </Box>

//         <Box>
//           <Typography>Signature : ________________________</Typography>
//           <Typography>Candidate Name : {data.candidateName}</Typography>
//         </Box>
//       </Box>
//     </A4Page>
//   );
// };

// export default NimbjaOfferPage2;

import React from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Box,
  Grid,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { formatCurrency } from "../../../../../utils/salaryCalculations";

const NimbjaOfferPage2 = ({ company, data }) => {

  /* ===== helper for consistent rounding ===== */
  const round2 = (num) => Number(num.toFixed(2));
  const round0 = (num) => Math.round(num); // 👈 yearly, no decimals

  /* ===== SOURCE OF TRUTH (ANNUAL CTC) ===== */
  const annualCTC = round0(Number(data.salary || data.newCTC || 0));

  /* ===== PERCENT CONFIG (TOTAL = 100%) ===== */
  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
    misc: 0.08, // adjustment bucket
  };

  /* =====================================================
   STEP 1: CALCULATE MONTHLY VALUES (ROUND HERE ONLY)
   ===================================================== */
  const basicMonthly = round2((annualCTC * PERCENT.basic) / 12);
  const hraMonthly = round2((annualCTC * PERCENT.hra) / 12);
  const daMonthly = round2((annualCTC * PERCENT.da) / 12);
  const specialMonthly = round2((annualCTC * PERCENT.special) / 12);
  const foodMonthly = round2((annualCTC * PERCENT.food) / 12);

  /* ===== monthly used so far ===== */
  const grossMonthly = round2(annualCTC / 12);

  const usedMonthly =
    basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly;

  const miscMonthly = round2(grossMonthly - usedMonthly);

  /* =====================================================
   STEP 3: FINAL ROWS (ANNUAL DERIVED FROM MONTHLY)
   ===================================================== */
 const rows = [
   {
     name: "Basic",
     monthly: basicMonthly,
     annual: round0(basicMonthly * 12), // ✅ FIXED
   },
   {
     name: "Bouquet Of Benefits",
     monthly: hraMonthly,
     annual: round0(hraMonthly * 12), // ✅ FIXED
   },
   {
     name: "HRA",
     monthly: daMonthly,
     annual: round0(daMonthly * 12), // ✅ FIXED
   },
   {
     name: "City Allowance",
     monthly: specialMonthly,
     annual: round0(specialMonthly * 12), // ✅ FIXED
   },
   {
     name: "Superannuation Fund",
     monthly: foodMonthly,
     annual: round0(foodMonthly * 12), // ✅ FIXED
   },
   {
     name: "Performance Bonus",
     monthly: miscMonthly,
     annual: round0(miscMonthly * 12), // ✅ FIXED
   },
 ];

  /* =====================================================
   STEP 4: TOTALS (GUARANTEED TO MATCH CTC)
   ===================================================== */
  const totalMonthly = round2(rows.reduce((sum, r) => sum + r.monthly, 0));

  const totalAnnual = round0(rows.reduce((sum, r) => sum + r.annual, 0));

  /* ================= TABLE STYLES (UNCHANGED) ================= */
  const CELL = {
    border: "1px solid #000",
    fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
    fontSize: "11pt",
    padding: "6px 8px",
    lineHeight: 1.4,
  };

  const GREEN_ROW = {
    backgroundColor: "#9BBB59",
  };

  return (
    <A4Page
      headerSrc={company.header}
      footerSrc={company.footer}
      contentTop="48mm"
      contentBottom="28mm"
      company={company}
    >
      {/* ================= TITLE ================= */}
      <Typography
        align="center"
        sx={{
          fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
          fontSize: "13pt",
          fontWeight: 600,
          mb: "8mm",
        }}
      >
        Annexure – A : Salary Structure
      </Typography>

      {/* ================= TABLE ================= */}
      <TableContainer>
        <Table sx={{ borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow sx={GREEN_ROW}>
              <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
                Salary Components
              </TableCell>
              <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
                Per Month (Rs.)
              </TableCell>
              <TableCell sx={{ ...CELL, fontWeight: "bold" }} align="right">
                Per Annum (Rs.)
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={CELL}>{row.name}</TableCell>
                <TableCell sx={CELL} align="right">
                  {formatCurrency(row.monthly)}
                </TableCell>
                <TableCell sx={CELL} align="right">
                  {formatCurrency(row.annual)}
                </TableCell>
              </TableRow>
            ))}

            {/* ================= TOTAL ================= */}
            <TableRow sx={{ ...GREEN_ROW, fontWeight: "bold" }}>
              <TableCell sx={CELL}>Total Salary</TableCell>
              <TableCell sx={CELL} align="right">
                {formatCurrency(totalMonthly)}
              </TableCell>
              <TableCell sx={CELL} align="right">
                {formatCurrency(totalAnnual)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* ================= SIGNATURE BLOCK (UNCHANGED) ================= */}
      <Box sx={{ mt: "8mm", mb: "10mm" }}>
        <Grid container justifyContent="space-between" alignItems="flex-start">
          {/* ================= LEFT — HR ================= */}
          <Grid item>
            {/* Signature + Stamp */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "6mm",
                mb: "4mm",
              }}
            >
              {company.signature && (
                <Box
                  component="img"
                  src={company.signature}
                  alt="HR Signature"
                  sx={{ width: "42mm", mt: "14mm", height: "12mm" }}
                />
              )}

              {company.stamp && (
                <Box
                  component="img"
                  src={company.stamp}
                  alt="Company Stamp"
                  sx={{ width: "32mm", ml: "-4mm" }}
                />
              )}
            </Box>

            {/* HR NAME ROW */}
            <Typography
              sx={{
                fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
                fontSize: "12pt",
                fontWeight: "bold",
              }}
            >
              {company.hrName}
            </Typography>

            {/* HR DESIGNATION — LOWER */}
            <Typography
              sx={{
                fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
                fontSize: "12pt",
                mt: "1mm",
              }}
            >
              <strong>HR Relations Lead</strong>
            </Typography>
          </Grid>

          {/* ================= RIGHT — CANDIDATE (ALIGNED WITH HR NAME) ================= */}
          <Grid
            item
            sx={{
              mt: "34mm", // 🔑 aligns exactly with HR NAME row
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Bahnschrift"',
                fontSize: "12pt",
                mb: "1mm",
                mt: "3mm",
              }}
            >
              <strong>Signature : _________________________</strong>
            </Typography>

            <Typography
              sx={{
                fontFamily: '"Bahnschrift"',
                fontSize: "12pt",
                mb: "1mm",
                mt: "1mm",
              }}
            >
              <strong>Candidate Name:</strong>{" "}
              <strong>{data.candidateName}</strong>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </A4Page>
  );
};

export default NimbjaOfferPage2;
