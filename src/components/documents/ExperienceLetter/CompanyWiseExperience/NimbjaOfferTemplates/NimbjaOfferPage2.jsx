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
import SalaryStructureTable from "../../../../common/SalaryStructureTable";


const NimbjaOfferPage2 = ({ company, data }) => {
  /* ===== helper for consistent rounding ===== */
  /* ======================================================
   ✅ SMARTMATRIX LOGIC (INPUT IS MONTHLY)
====================================================== */

  const round2 = (num) => Math.round((Number(num) || 0) * 100) / 100;

  /* 🔥 INPUT IS MONTHLY */
  const monthlyGross = round2(data.salary || data.newCTC || 0);

  /* ANNUAL DERIVED */
  const annualCTC = round2(monthlyGross * 12);

  /* Same Percentage Structure */
  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
  };

  /* Monthly Calculation */
  const basicMonthly = round2(monthlyGross * PERCENT.basic);
  const hraMonthly = round2(monthlyGross * PERCENT.hra);
  const daMonthly = round2(monthlyGross * PERCENT.da);
  const specialMonthly = round2(monthlyGross * PERCENT.special);
  const foodMonthly = round2(monthlyGross * PERCENT.food);

  /* Adjustment to prevent rounding mismatch */
  const miscMonthly = round2(
    monthlyGross -
      (basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly),
  );

  /* Annual Derived from Monthly */
  const basicAnnual = round2(basicMonthly * 12);
  const hraAnnual = round2(hraMonthly * 12);
  const daAnnual = round2(daMonthly * 12);
  const specialAnnual = round2(specialMonthly * 12);
  const foodAnnual = round2(foodMonthly * 12);
  const miscAnnual = round2(miscMonthly * 12);

  /* Salary Rows */
  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["Bouquet Of Benefits", hraMonthly, hraAnnual],
    ["HRA", daMonthly, daAnnual],
    ["City Allowance", specialMonthly, specialAnnual],
    ["Superannuation Fund", foodMonthly, foodAnnual],
    ["Performance Bonus", miscMonthly, miscAnnual],
  ];

  /* Totals (Guaranteed Correct) */
  const totalMonthly = monthlyGross;
  const totalAnnual = annualCTC;

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

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

      


  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <Box className="a4-content-only">
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
                style={{ height: 45 }}
              />
            )}
            {company?.stamp && (
              <img src={company.stamp} alt="Stamp" style={{ height: 100 }} />
            )}
          </Box>
          <Typography mt={1} sx={{ fontFamily: "Bahnschrift" }}>
            {company.hrName}
          </Typography>
          <Typography sx={{ fontFamily: "Bahnschrift" }}>
            HR Relations Lead
          </Typography>
        </Box>

        <Box minWidth="250px" sx={{ mt: 13, fontFamily: "Bahnschrift" }}>
          <Typography sx={{ fontFamily: "Bahnschrift" }}>
            Signature: __________________
          </Typography>
          <Typography mt={2} sx={{ mt: 1.5, fontFamily: "Bahnschrift" }}>
            Candidate Name: {data.candidateName}
          </Typography>
        </Box>
      </Box>
    </A4Page>
  );
};;;

export default NimbjaOfferPage2;
