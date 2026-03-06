// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@mui/material";
// import A4Layout from "../../../../layout/A4Page";
// import { formatCurrency } from "../../../../../utils/salaryCalculations";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-US", {
//         month: "long",
//         day: "2-digit",
//         year: "numeric",
//       })
//     : "";

// /* ================= STYLES ================= */
// const TEXT = {
//   fontFamily: '"Times New Roman", Times, serif',
//   fontSize: "12pt",
//   lineHeight: 1.6,
//   textAlign: "justify",
//   letterSpacing: "0.2px",
//   color: "#000",
// };

// const NeweageOffer = ({ company, data }) => {
//   if (!company || !data) return null;

//   const round2 = (num) => Math.round((Number(num) || 0) * 100) / 100;

//   /* =============================
//      ✅ INPUT IS ANNUAL
//      ============================= */

//   const annualCTC = round2(data.salary || 0);

//   /* Derive Monthly */
//   const monthlyGross = round2(annualCTC / 12);

//   /* Same Percentage Structure */
//   const PERCENT = {
//     basic: 0.4,
//     hra: 0.18,
//     da: 0.12,
//     special: 0.16,
//     food: 0.06,
//   };

//   /* Monthly Calculation */
//   const basicMonthly = round2(monthlyGross * PERCENT.basic);
//   const hraMonthly = round2(monthlyGross * PERCENT.hra);
//   const daMonthly = round2(monthlyGross * PERCENT.da);
//   const specialMonthly = round2(monthlyGross * PERCENT.special);
//   const foodMonthly = round2(monthlyGross * PERCENT.food);

//   /* Adjustment to avoid ₹1 mismatch */
//   const miscMonthly = round2(
//     monthlyGross -
//       (basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly),
//   );

//   /* Salary Rows */
//   const salaryComponents = [
//     { name: "Basic", monthly: basicMonthly, annual: round2(basicMonthly * 12) },
//     {
//       name: "House Rent Allowance",
//       monthly: hraMonthly,
//       annual: round2(hraMonthly * 12),
//     },
//     {
//       name: "Dearness Allowance",
//       monthly: daMonthly,
//       annual: round2(daMonthly * 12),
//     },
//     {
//       name: "Special Allowance",
//       monthly: specialMonthly,
//       annual: round2(specialMonthly * 12),
//     },
//     {
//       name: "Food Allowance",
//       monthly: foodMonthly,
//       annual: round2(foodMonthly * 12),
//     },
//     {
//       name: "Misc. Allowance",
//       monthly: miscMonthly,
//       annual: round2(miscMonthly * 12),
//     },
//   ];

//   const totalMonthly = monthlyGross;
//   const totalAnnual = annualCTC;

//   const {
//     mrms = "",
//     candidateName = "",
//     address = "",
//     position = "",
//     joiningDate = "",
//     issueDate = "",
//   } = data;

//   const COMPANY_NAME = company.name.toUpperCase();

//   return (
//     <>
//       {/* ================= PAGE 1 : OFFER LETTER ================= */}
//       <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
//         <Typography align="center" sx={{ fontWeight: 700, mb: "4mm" }}>
//           <Box component="span" sx={{ textDecoration: "underline" }}>
//             Offer Letter
//           </Box>
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>{formatDate(issueDate)}</Typography>

//         <Typography sx={TEXT}>
//           <b>Name</b> : {mrms} {candidateName}
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           <b>Designation</b> : {position}
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>Dear {candidateName},</Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           Congratulations! <b>{COMPANY_NAME}</b> is excited to call you our new{" "}
//           {position}.
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           We'll focus on wrapping up a few more formalities, including the
//           successful completion of your [background check, drug screening,
//           reference check, etc.], and aim to get you settled into your new role
//           by <b>{formatDate(joiningDate)}</b>.
//         </Typography>
//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           Keep reading to learn more about this opportunity and hopefully answer
//           any lingering questions you may have.
//         </Typography>
//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           <b>{COMPANY_NAME}</b> will start you out at{" "}
//           <b>Rs. {formatCurrency(totalAnnual)}</b> per year. You can expect to
//           receive payment monthly.
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           Please keep in mind, this employment offer is in no way a legally
//           binding contract. As an at-will employee, both you and NEWEAGE CLOUD
//           SOFTWARE SERVICES Pvt. Ltd. are able to terminate employment for any
//           reason at any time.
//         </Typography>
//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           NEWEAGE CLOUD SOFTWARE SERVICES Pvt. Ltd. looks forward to bringing
//           you on board! If you have any questions, please feel free to reach out
//           at any time and we'll be more than happy to help you.
//         </Typography>
//         <Typography sx={{ ...TEXT, mb: 2 }}>Yours sincerely,</Typography>

//         <Typography sx={TEXT}>
//           For <b>{COMPANY_NAME}</b>
//         </Typography>

//         <Box sx={{ mt: 2 }}>
//           <img
//             src={company.signature}
//             alt="Signature"
//             style={{ height: "50px" }}
//           />
//           <img src={company.stamp} alt="Stamp" style={{ height: "100px" }} />
//           <Typography>{company.hrName}</Typography>
//           <Typography>HR Relations Lead</Typography>
//         </Box>
//       </A4Layout>

//       {/* ================= PAGE 2 : SALARY ANNEXURE ================= */}
//       <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
//         <Typography align="center" sx={{ ...TEXT, mb: 3, ml: 28 }}>
//           <b>Annexure A Salary Structure</b>
//         </Typography>

//         <TableContainer>
//           <Table
//             size="small"
//             sx={{
//               border: "1px solid #333",
//               borderCollapse: "collapse",
//               width: "100%",
//             }}
//           >
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "rgba(3, 171, 197, 0.95)" }}>
//                 <TableCell sx={{ fontWeight: 600, color: "white" }}>
//                   Salary Components
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: 600, color: "white" }}
//                 >
//                   Per month (Rs.)
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: 600, color: "white" }}
//                 >
//                   Per Annum (Rs.)
//                 </TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {salaryComponents.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell>{row.name}</TableCell>
//                   <TableCell align="center">
//                     {formatCurrency(row.monthly)}
//                   </TableCell>
//                   <TableCell align="center">
//                     {formatCurrency(row.annual)}
//                   </TableCell>
//                 </TableRow>
//               ))}

//               <TableRow sx={{ backgroundColor: "rgba(3, 171, 197, 0.95)" }}>
//                 <TableCell sx={{ fontWeight: 600 }}>
//                   Total Monthly Gross Salary
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600 }}>
//                   {formatCurrency(totalMonthly)}
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600 }}>
//                   {formatCurrency(totalAnnual)}
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </A4Layout>
//     </>
//   );
// };

// export default NeweageOffer;

///////////////////////////////

import React from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import { formatCurrency } from "../../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : "";

/* ================= FONT STYLE (MATCH FIRST CODE) ================= */
const TEXT = {
  fontFamily: '"Cambria", "Georgia", serif',
  fontSize: "14.8px",
  lineHeight: 1.65,
  color: "#222",
};

const NeweageOffer = ({ company, data }) => {
  if (!company || !data) return null;

  const round2 = (num) => Math.round((Number(num) || 0) * 100) / 100;

  const annualCTC = round2(data.salary || 0);
  const monthlyGross = round2(annualCTC / 12);

  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
  };

  const basicMonthly = round2(monthlyGross * PERCENT.basic);
  const hraMonthly = round2(monthlyGross * PERCENT.hra);
  const daMonthly = round2(monthlyGross * PERCENT.da);
  const specialMonthly = round2(monthlyGross * PERCENT.special);
  const foodMonthly = round2(monthlyGross * PERCENT.food);

  const miscMonthly = round2(
    monthlyGross -
      (basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly),
  );

  const salaryComponents = [
    { name: "Basic", monthly: basicMonthly, annual: round2(basicMonthly * 12) },
    {
      name: "House Rent Allowance",
      monthly: hraMonthly,
      annual: round2(hraMonthly * 12),
    },
    {
      name: "Dearness Allowance",
      monthly: daMonthly,
      annual: round2(daMonthly * 12),
    },
    {
      name: "Special Allowance",
      monthly: specialMonthly,
      annual: round2(specialMonthly * 12),
    },
    {
      name: "Food Allowance",
      monthly: foodMonthly,
      annual: round2(foodMonthly * 12),
    },
    {
      name: "Misc. Allowance",
      monthly: miscMonthly,
      annual: round2(miscMonthly * 12),
    },
  ];

  const totalMonthly = monthlyGross;
  const totalAnnual = annualCTC;

  const {
    mrms = "",
    candidateName = "",
    address = "",
    position = "",
    joiningDate = "",
    issueDate = "",
  } = data;

  const COMPANY_NAME = company.name.toUpperCase();

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Box
          sx={{
            px: 4,
            pb: "160px", // footer safe spacing
            minHeight: "100%",
          }}
        >
          {/* Title */}
          <Typography
            align="center"
            sx={{
              ...TEXT,
              fontWeight: 600,
              textDecoration: "underline",
              mb: 1,
            }}
          >
            Offer Letter
          </Typography>

          {/* Date */}
          <Typography sx={{ ...TEXT, mb: 1 }}>
            {formatDate(issueDate)}
          </Typography>

          {/* Name & Designation */}
          <Typography sx={{ ...TEXT, mb: 1 }}>
            <b>Name</b> : {mrms} {candidateName}
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            <b>Designation</b> : {position}
          </Typography>

          {/* Body */}
          <Typography sx={{ ...TEXT, mb: 2 }}>Dear {candidateName},</Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            Congratulations! <b>{COMPANY_NAME}</b> is excited to call you our
            new {position}.
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            We'll focus on wrapping up a few more formalities, including the
            successful completion of your [background check, drug screening,
            reference check, etc.], and aim to get you settled into your new
            role by <b>{formatDate(joiningDate)}</b>.
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            Keep reading to learn more about this opportunity and hopefully
            answer any lingering questions you may have.
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            <b>{COMPANY_NAME}</b> will start you out at{" "}
            <b>Rs. {formatCurrency(totalAnnual)}</b> per year. You can expect to
            receive payment monthly.
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            Please keep in mind, this employment offer is in no way a legally
            binding contract. As an at-will employee, both you and NEWEAGE CLOUD
            SOFTWARE SERVICES Pvt. Ltd. are able to terminate employment for any
            reason at any time.
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            NEWEAGE CLOUD SOFTWARE SERVICES Pvt. Ltd. looks forward to bringing
            you on board! If you have any questions, please feel free to reach
            out at any time and we'll be more than happy to help you.
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>Yours sincerely,</Typography>

          {/* Signature Section - SAME STRUCTURE AS YOUR WORKING CODE */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            {/* COMPANY */}
            <Box>
              <Typography fontWeight={700} fontSize={15} marginTop={2}>
                For {COMPANY_NAME}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                {company.signature && (
                  <img src={company.signature} alt="signature" height={60} />
                )}
                {company.stamp && (
                  <img src={company.stamp} alt="stamp" height={80} />
                )}
              </Box>

              <Typography fontWeight={600} mt={1}>
                {company.hrName}
              </Typography>
              <Typography fontSize={13}>
                <strong>HR Relations Lead</strong>
              </Typography>
            </Box>

            {/* ACCEPTANCE */}
            <Box>
              <Typography mt={8}>Signature: ______________</Typography>
              <Typography mt={2}>Name: {candidateName}</Typography>
            </Box>
          </Box>
        </Box>
      </A4Layout>

      {/* ================= PAGE 2 ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Box sx={{ px: 4, pb: "160px" }}>
          <Typography align="center" sx={{ ...TEXT, mb: 3, mt: 6 }}>
            <b>Annexure A Salary Structure</b>
          </Typography>

          <TableContainer>
            <Table
              size="small"
              sx={{
                border: "1px solid #000",
                borderCollapse: "collapse",
                width: "100%",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "1px solid #000",
                      fontWeight: 600,
                      backgroundColor: "#3dd6f1",
                    }}
                  >
                    Salary Components
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #000",
                      fontWeight: 600,
                      backgroundColor: "#3dd6f1",
                    }}
                  >
                    Per month (Rs.)
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #000",
                      fontWeight: 600,
                      backgroundColor: "#3dd6f1",
                    }}
                  >
                    Per Annum (Rs.)
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {salaryComponents.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ border: "1px solid #000" }}>
                      {row.name}
                    </TableCell>
                    <TableCell align="center" sx={{ border: "1px solid #000" }}>
                      {formatCurrency(row.monthly)}
                    </TableCell>
                    <TableCell align="center" sx={{ border: "1px solid #000" }}>
                      {formatCurrency(row.annual)}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell
                    sx={{
                      border: "1px solid #000",
                      fontWeight: 600,
                      backgroundColor: "#3dd6f1",
                    }}
                  >
                    Total Monthly Gross Salary
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #000",
                      fontWeight: 600,
                      backgroundColor: "#3dd6f1",
                    }}
                  >
                    {formatCurrency(totalMonthly)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #000",
                      fontWeight: 600,
                      backgroundColor: "#3dd6f1",
                    }}
                  >
                    {formatCurrency(totalAnnual)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{ mt: 12, display: "flex", justifyContent: "space-between" }}
          >
            {/* COMPANY */}
            <Box>
              {/* <Typography fontSize={15}>Yours faithfully,</Typography>
                      <Typography fontWeight={700} fontSize={15} marginTop={3}>
                        For {company.name}
                      </Typography> */}

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                {company.signature && (
                  <img src={company.signature} alt="signature" height={60} />
                )}
                {company.stamp && (
                  <img src={company.stamp} alt="stamp" height={80} />
                )}
              </Box>

              <Typography fontWeight={600} mt={2}>
                {company.hrName}
              </Typography>
              <Typography fontSize={13}>
                <strong>HR Relations Lead</strong>
              </Typography>
            </Box>

            {/* ACCEPTANCE */}
            <Box>
              <Typography mt={12}>Signature: ______________</Typography>
              <Typography mt={2}>Name: {data.candidateName}</Typography>
            </Box>
          </Box>
        </Box>
      </A4Layout>
    </>
  );
};

export default NeweageOffer;
