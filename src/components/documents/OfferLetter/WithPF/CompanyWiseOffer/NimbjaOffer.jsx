// // // import React from "react";
// // // import { Box, Typography, Divider } from "@mui/material";

// // // const NimbjaOffer = ({ company, data }) => {
// // //   return (
// // //     <Box
// // //       sx={{
// // //         width: "210mm",
// // //         minHeight: "297mm",
// // //         backgroundColor: "#fff",
// // //         fontFamily: "Times New Roman",
// // //         color: "#000",
// // //       }}
// // //     >
// // //       {/* ================= HEADER ================= */}
// // //       <Box>
// // //         <img
// // //           src={company.headerImage}
// // //           alt="Company Header"
// // //           style={{ width: "100%" }}
// // //         />
// // //       </Box>

// // //       {/* ================= CONTENT ================= */}
// // //       <Box sx={{ px: 6, py: 4 }}>
// // //         {/* Date */}
// // //         <Typography align="right" sx={{ mb: 4 }}>
// // //           {new Date(data.issueDate).toLocaleDateString("en-IN", {
// // //             day: "numeric",
// // //             month: "long",
// // //             year: "numeric",
// // //           })}
// // //         </Typography>

// // //         {/* Candidate Details */}
// // //         <Typography sx={{ mb: 1 }}>
// // //           <strong>Name :</strong> {data.candidateName}
// // //         </Typography>
// // //         {data.address && (
// // //           <Typography sx={{ mb: 3 }}>
// // //             <strong>Address :</strong> {data.address}
// // //           </Typography>
// // //         )}

// // //         {/* Subject */}
// // //         <Typography sx={{ fontWeight: "bold", mb: 3 }}>
// // //           Subject : Letter of Intent for the position of {data.position}
// // //         </Typography>

// // //         {/* Greeting */}
// // //         <Typography sx={{ mb: 3 }}>
// // //           Dear {data.candidateName.split(" ")[0]},
// // //         </Typography>

// // //         {/* Body */}
// // //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// // //           Welcome to <strong>{company.name}</strong>. Quality is not just a
// // //           destination but a journey in which every employee contributes. We
// // //           invite you to be part of this journey!
// // //         </Typography>

// // //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// // //           This has reference to your application and subsequent interviews you
// // //           had with us. We are pleased to offer you the role of{" "}
// // //           <strong>{data.position}</strong>.
// // //         </Typography>

// // //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// // //           On joining, your all-inclusive Cost to the Company (CTC) will be{" "}
// // //           <strong>Rs. {Number(data.salary).toLocaleString("en-IN")}/-</strong>{" "}
// // //           per annum as per Annexure A. This offer is subject to verification of
// // //           documents and background checks as per company policy.
// // //         </Typography>

// // //         <Typography sx={{ mb: 3 }}>
// // //           You are required to join the services of the Company on or before{" "}
// // //           <strong>
// // //             {new Date(data.joiningDate).toLocaleDateString("en-IN")}
// // //           </strong>
// // //           .
// // //         </Typography>

// // //         {/* Closing */}
// // //         <Typography sx={{ mb: 4 }}>
// // //           Thanking you and looking forward to having you with us.
// // //         </Typography>

// // //         {/* Signature */}
// // //         <Typography sx={{ mt: 4 }}>
// // //           For <strong>{company.name}</strong>
// // //         </Typography>

// // //         <Box sx={{ mt: 3, display: "flex", gap: 4 }}>
// // //           <Box>
// // //             <Typography sx={{ fontWeight: "bold" }}>
// // //               {company.hrName}
// // //             </Typography>
// // //             <Typography>HR Relations Lead</Typography>
// // //           </Box>

// // //           <Box>
// // //             <img
// // //               src={company.signature}
// // //               alt="HR Signature"
// // //               style={{ height: 50 }}
// // //             />
// // //           </Box>
// // //         </Box>

// // //         <Typography sx={{ mt: 3 }}>
// // //           Candidate Name: {data.candidateName}
// // //         </Typography>

// // //         <Divider sx={{ my: 4 }} />

// // //         <Typography sx={{ fontStyle: "italic" }}>
// // //           Enclosures: Annexure A – Salary Structure
// // //         </Typography>
// // //       </Box>

// // //       {/* ================= FOOTER ================= */}
// // //       <Box sx={{ mt: "auto" }}>
// // //         <img
// // //           src={company.footerImage}
// // //           alt="Company Footer"
// // //           style={{ width: "100%" }}
// // //         />
// // //       </Box>
// // //     </Box>
// // //   );
// // // };

// // // export default NimbjaOffer;

// // import React from "react";
// // import { Box, Typography, Divider } from "@mui/material";

// // const NimbjaOffer = ({ company, data }) => {
// //   return (
// //     <Box
// //       sx={{
// //         width: "210mm",
// //         minHeight: "297mm",
// //         backgroundColor: "#fff",
// //         fontFamily: "Times New Roman",
// //         color: "#000",
// //       }}
// //     >
// //       {/* ================= HEADER ================= */}
// //       <Box>
// //         <img
// //           src={company.headerImage}
// //           alt="Company Header"
// //           style={{ width: "100%" }}
// //         />
// //       </Box>

// //       {/* ================= CONTENT ================= */}
// //       <Box sx={{ px: 6, py: 4 }}>
// //         {/* Date */}
// //         <Typography align="right" sx={{ mb: 4 }}>
// //           {new Date(data.issueDate).toLocaleDateString("en-IN", {
// //             day: "numeric",
// //             month: "long",
// //             year: "numeric",
// //           })}
// //         </Typography>

// //         {/* Candidate Details */}
// //         <Typography sx={{ mb: 1 }}>
// //           <strong>Name :</strong> {data.candidateName}
// //         </Typography>
// //         {data.address && (
// //           <Typography sx={{ mb: 3 }}>
// //             <strong>Address :</strong> {data.address}
// //           </Typography>
// //         )}

// //         {/* Subject */}
// //         <Typography sx={{ fontWeight: "bold", mb: 3 }}>
// //           Subject : Letter of Intent for the position of {data.position}
// //         </Typography>

// //         {/* Greeting */}
// //         <Typography sx={{ mb: 3 }}>
// //           Dear {data.candidateName.split(" ")[0]},
// //         </Typography>

// //         {/* Body */}
// //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// //           Welcome to <strong>{company.name}</strong>. Quality is not just a
// //           destination but a journey in which every employee contributes. We
// //           invite you to be part of this journey!
// //         </Typography>

// //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// //           This has reference to your application and subsequent interviews you
// //           had with us. We are pleased to offer you the role of{" "}
// //           <strong>{data.position}</strong>.
// //         </Typography>

// //         <Typography sx={{ mb: 3, textAlign: "justify" }}>
// //           On joining, your all-inclusive Cost to the Company (CTC) will be{" "}
// //           <strong>Rs. {Number(data.salary).toLocaleString("en-IN")}/-</strong>{" "}
// //           per annum as per Annexure A. This offer is subject to verification of
// //           documents and background checks as per company policy.
// //         </Typography>

// //         <Typography sx={{ mb: 3 }}>
// //           You are required to join the services of the Company on or before{" "}
// //           <strong>
// //             {new Date(data.joiningDate).toLocaleDateString("en-IN")}
// //           </strong>
// //           .
// //         </Typography>

// //         {/* Closing */}
// //         <Typography sx={{ mb: 4 }}>
// //           Thanking you and looking forward to having you with us.
// //         </Typography>

// //         {/* Signature */}
// //         <Typography sx={{ mt: 4 }}>
// //           For <strong>{company.name}</strong>
// //         </Typography>

// //         <Box sx={{ mt: 3, display: "flex", gap: 4 }}>
// //           <Box>
// //             <Typography sx={{ fontWeight: "bold" }}>
// //               {company.hrName}
// //             </Typography>
// //             <Typography>HR Relations Lead</Typography>
// //           </Box>

// //           <Box>
// //             <img
// //               src={company.signature}
// //               alt="HR Signature"
// //               style={{ height: 50 }}
// //             />
// //           </Box>
// //         </Box>

// //         <Typography sx={{ mt: 3 }}>
// //           Candidate Name: {data.candidateName}
// //         </Typography>

// //         <Divider sx={{ my: 4 }} />

// //         <Typography sx={{ fontStyle: "italic" }}>
// //           Enclosures: Annexure A – Salary Structure
// //         </Typography>
// //       </Box>

// //       {/* ================= FOOTER ================= */}
// //       <Box sx={{ mt: "auto" }}>
// //         <img
// //           src={company.footerImage}
// //           alt="Company Footer"
// //           style={{ width: "100%" }}
// //         />
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default NimbjaOffer;

// // NimbjaOffer.jsx
// import React from "react";
// import NimbjaOfferPage1 from "../../../ExperienceLetter/CompanyWiseExperience/NimbjaOfferTemplates/NimbjaOfferPage1";
// import NimbjaOfferPage2 from "../../../ExperienceLetter/CompanyWiseExperience/NimbjaOfferTemplates/NimbjaOfferPage2";
// import A4Page from "../../../../layout/A4Page";

// /**
//  * NimbjaOffer
//  * -------------------------
//  * This component ONLY orchestrates pages.
//  * No layout, no header/footer logic here.
//  */
// const NimbjaOffer = ({ company, data }) => {
//   if (!company || !data) return null;

//   return (
//     <>
//       <A4Page
//         headerSrc={company.header}
//         footerSrc={company.footer}
//         watermarkSrc={company.watermarkImage || company.watermark || null}
//         contentTop="48mm"
//         contentBottom="28mm"
//         company={company}
//       >
//         {/* ================= DATE ================= */}
//         <Typography
//           sx={{ ...baseText, fontWeight: 600, textAlign: "right", mb: "9mm" }}
//         >
//           {offerDate}
//         </Typography>

//         {/* ================= DETAILS ================= */}
//         <Typography
//           sx={{
//             ...baseText,
//             mb: "2.5mm",
//             fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
//           }}
//         >
//           Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
//           <Typography
//             component="span"
//             sx={{
//               fontWeight: "",
//               fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
//             }}
//           >
//             {data.candidateName}
//           </Typography>
//         </Typography>

//         <Typography sx={{ ...baseText, mb: "2.5mm" }}>
//           Address&nbsp;&nbsp;&nbsp;:{" "}
//           <Typography
//             component="span"
//             sx={{
//               fontWeight: "",
//               fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
//             }}
//           >
//             {data.address}
//           </Typography>
//         </Typography>

//         <Typography sx={{ ...baseText, mb: "5mm", fontFamily: "Bahnschrift" }}>
//           Subject&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
//           <Typography
//             component="span"
//             sx={{
//               borderBottom: "1px solid #000",
//               display: "inline",
//               paddingBottom: "1px",
//               fontFamily: "Bahnschrift",
//             }}
//           >
//             Letter of intent for the position of {data.position}.
//           </Typography>
//         </Typography>

//         {/* ================= GREETING ================= */}
//         <Typography sx={{ ...baseText, mb: "5mm" }}>
//           Dear{" "}
//           <Typography
//             component="span"
//             sx={{ fontWeight: 400, fontFamily: "Bahnschrift" }}
//           >
//             {firstName}
//           </Typography>
//           ,
//         </Typography>

//         {/* ================= PARAGRAPHS ================= */}
//         <Typography
//           sx={{
//             ...baseText,
//             textAlign: "justify",
//             mb: "5mm",
//             marginTop: "-2mm",
//           }}
//         >
//           Welcome to{" "}
//           <Typography
//             component="span"
//             sx={{
//               fontWeight: 500,
//               fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
//             }}
//           >
//             {company.name}
//           </Typography>
//           . Quality is not just a destination but a journey in which every
//           employee contributes. We invite you to be part of this journey!
//           <br />
//           This has reference to your application and subsequent interviews you
//           had with us.
//           <br />
//           We are pleased to offer you the role of{" "}
//           <strong>{data.position}.</strong>
//         </Typography>
//         <Typography
//           sx={{ ...baseText, textAlign: "justify", mb: "2mm", mt: "2mm" }}
//         >
//           {/* with us. We are pleased to offer you the role of{" "} */}
//           <Typography component="span" sx={{ fontWeight: 600 }}></Typography>
//         </Typography>

//         <Typography sx={{ ...baseText, textAlign: "justify", mb: "5mm" }}>
//           On Joining, your all-inclusive Cost to the Company (CTC) will be{" "}
//           <Typography component="span" sx={{ fontWeight: 600 }}>
//             Rs.{formatIndianCurrency(data.salary)}/-
//           </Typography>
//           as per Annexure A. This offer is made on the basis of your having
//           furnished to the Company information and documents in support of your
//           age, academic qualifications, previous work experience, relieving
//           letter from your last employer and other particulars on or before your
//           day of joining. The Company shall conduct a background and reference
//           check as per Company policy and this appointment is conditional upon
//           receiving positive feedback.
//           <br />
//           You are required to join the services of the Company at the earliest,
//           but in any case, not later than{" "}
//           <Typography component="span" sx={{ fontWeight: 600 }}>
//             {joiningDate}
//           </Typography>
//         </Typography>
//         <Typography sx={{ ...baseText, textAlign: "justify", mb: "5mm" }}>
//           Thanking you and looking forward to having you with us. .
//         </Typography>

//         <Typography
//           sx={{
//             ...baseText,
//             mb: "5mm",
//             fontFamily: "Bahnschrift",
//             fontSize: "18pt",
//           }}
//         >
//           For <strong>{company.name}</strong>
//         </Typography>

//         {/* ================= SIGNATURE BLOCK ================= */}
//         {/* ================= SIGNATURE BLOCK (ABOVE FOOTER) ================= */}
//         <Box
//           sx={{
//             mt: "5mm",
//             mb: "20mm", // 🔑 IMPORTANT: pushes content ABOVE footer
//             fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
//           }}
//         >
//           <Grid
//             container
//             justifyContent="space-between"
//             alignItems="flex-start"
//           >
//             {/* LEFT — HR */}
//             <Grid item>
//               {company.signature && (
//                 <Box
//                   component="img"
//                   src={company.signature}
//                   alt="Signature"
//                   sx={{
//                     width: "45mm",
//                     display: "block",
//                     mb: "19mm",
//                     mt: "9mm",
//                   }}
//                 />
//               )}

//               <strong>
//                 <Typography sx={{ fontWeight: 600 }}>
//                   {company.hrName}
//                 </Typography>

//                 <Typography
//                   sx={{
//                     fontFamily: '"Bahnschrift", "Segoe UI", sans-serif', // 🔑 ADDED
//                     fontSize: "12pt", // 🔑 ADDED
//                     mt: "mm", // 🔑 ADDED
//                   }}
//                 >
//                   <strong>HR Relations Lead</strong>
//                 </Typography>
//               </strong>
//             </Grid>

//             {/* RIGHT — STAMP + CANDIDATE */}
//             <Grid item>
//               {company.stamp && (
//                 <Box
//                   component="img"
//                   src={company.stamp}
//                   alt="Company Stamp"
//                   sx={{
//                     width: "34mm",
//                     display: "block",
//                     mb: "4mm",
//                     ml: "-52mm",
//                   }}
//                 />
//               )}

//               <Typography
//                 sx={{
//                   fontFamily: '"Bahnschrift", "Segoe UI", sans-serif', // 🔑 ADDED
//                 }}
//               >
//                 <strong>Signature :</strong> _________________________
//               </Typography>

//               <Typography
//                 sx={{
//                   fontFamily: '"Bahnschrift", "Segoe UI", sans-serif', // 🔑 ADDED
//                 }}
//               >
//                 <strong>Candidate Name:</strong>{" "}
//                 <strong>{data.candidateName}</strong> {/* 🔑 NAME BOLD */}
//               </Typography>
//             </Grid>
//           </Grid>
//         </Box>
//       </A4Page>

//       {/* ================= PAGE 2 : ANNEXURE / SALARY ================= */}
//       <NimbjaOfferPage2 company={company} data={data} />
//     </>
//   );
// };

// export default NimbjaOffer;

import React from "react";
import {
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import A4Page from "../../../../layout/A4Page";
import NimbjaOfferPage2 from "../../../ExperienceLetter/CompanyWiseExperience/NimbjaOfferTemplates/NimbjaOfferPage2";


/**
 * NimbjaOffer
 * ----------------------------------
 * Orchestrates Offer Letter Pages
 * No header/footer logic here
 */

const NimbjaOffer = ({ company = {}, data = {} }) => {
  if (!company || !data) return null;

  /* ================= TEXT STYLE ================= */
  const baseText = {
    fontSize: "12pt",
    fontFamily: '"Bahnschrift", "Segoe UI", Arial, sans-serif',
    lineHeight: 1.6,
  };

  /* ================= HELPERS ================= */

  /* ================= HELPERS ================= */

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const firstName = data.candidateName?.split(" ")[0] || "";

  const offerDate = formatDate(data.issueDate);

  const joiningDate = formatDate(data.joiningDate);

  const formatCurrency = (num) =>
  Number(num || 0).toLocaleString("en-IN");


  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
        
      >
        {/* DATE */}
        <Typography
          sx={{ ...baseText, fontWeight: 600, textAlign: "right", mb: "9mm" }}
        >
          {offerDate}
        </Typography>

        {/* DETAILS */}
        <Typography sx={{ ...baseText, mb: "3mm" }}>
          Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
          {data.candidateName}
        </Typography>

        <Typography sx={{ ...baseText, mb: "5mm" }}>
          Address&nbsp;&nbsp;&nbsp;:&nbsp;
          <span>{data.address}</span>
        </Typography>

        <Typography sx={{ ...baseText, mb: "8mm", mt: "-2mm" }}>
          Subject&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
          <span
            style={{
              borderBottom: "1px solid #000",
              paddingBottom: "1px",
              mt: "-2mm",
            }}
          >
            Letter of Intent for the position of {data.position}.
          </span>
        </Typography>

        {/* GREETING */}
        <Typography sx={{ ...baseText, mb: "5mm" }}>
          Dear {firstName},
        </Typography>

        {/* BODY */}
        <Typography
          sx={{
            ...baseText,
            textAlign: "justify",
            mb: "4mm",
            mt: "-2mm",
          }}
        >
          Welcome to <strong>{company.name}</strong>. Quality is not just a
          destination but a journey in which every employee contributes. We
          invite you to be part of this journey.
        </Typography>

        <Typography
          sx={{
            ...baseText,
            textAlign: "justify",
            mb: "5mm",
            mt: "-2mm",
          }}
        >
          This has reference to your application and subsequent interviews. We
          are pleased to offer you the role of <strong>{data.position}</strong>.
        </Typography>

        <Typography
          sx={{
            ...baseText,
            textAlign: "justify",
            mb: "4mm",
            mt: "-3mm",
          }}
        >
          On joining, your all-inclusive Cost to the Company (CTC) will be{" "}
          <strong>Rs. {formatCurrency(data.salary)}/-</strong> per annum as per
          Annexure A.
        </Typography>

        <Typography
          sx={{
            ...baseText,
            textAlign: "justify",
            mb: "5mm",
            mt: "-3mm",
          }}
        >
          This offer is subject to verification of documents, background checks,
          and positive reference validation as per company policy.
        </Typography>

        <Typography
          sx={{ ...baseText, textAlign: "justify", mb: "6mm", mt: "-3mm" }}
        >
          You are required to join the services of the Company on or before{" "}
          <strong>{joiningDate}</strong>.
        </Typography>

        <Typography sx={{ ...baseText, mb: "8mm" }}>
          Thanking you and looking forward to having you with us.
        </Typography>

        {/* COMPANY SIGN */}
        <Typography
          sx={{
            ...baseText,
            fontSize: "16pt",
            fontWeight: 600,
            mb: "6mm",
          }}
        >
          For {company.name}
        </Typography>

        {/* SIGNATURE BLOCK */}
        <Box sx={{ mb: "25mm" }}>
          <Grid container justifyContent="space-between">
            {/* LEFT SIDE */}
            <Grid item>
              {company.signature && (
                <Box
                  component="img"
                  src={company.signature}
                  alt="Signature"
                  sx={{
                    width: "45mm",
                    mb: "4mm",
                    mt:"5mm"
                  }}
                />
              )}

              <Box sx={{ mt: "18mm" }}>
                <Typography sx={{ ...baseText, fontWeight: 600 }}>
                  {company.hrName}
                </Typography>

                <Typography sx={baseText}>HR Relations Lead</Typography>
              </Box>
            </Grid>

            {/* RIGHT SIDE */}
            <Grid item>
              {company.stamp && (
                <Box
                  component="img"
                  src={company.stamp}
                  alt="Company Stamp"
                  sx={{
                    width: "35mm",
                    mb: "5mm",
                    ml: "-52mm",
                    mt: "-5mm",
                  }}
                />
              )}

              <Typography sx={{ ...baseText }}>
                <strong>Signature :</strong> _______________________
              </Typography>

              <Typography sx={baseText}>
                <strong>Candidate Name:</strong> {data.candidateName}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 =================
      <NimbjaOfferPage2 company={company} data={data} /> */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        {(() => {
          /* ===== helpers ===== */
          const round2 = (num) => Number(num.toFixed(2)); // monthly
          const round0 = (num) => Math.round(num); // annual

          /* ===== SOURCE OF TRUTH ===== */
          const annualCTC = round0(
            Number(data.salary || data.ctc || data.annualSalary || 0),
          );

          const grossMonthly = round2(annualCTC / 12);

          /* ===== PERCENT CONFIG (100%) ===== */
          const PERCENT = {
            basic: 0.4,
            hra: 0.18,
            da: 0.12,
            special: 0.16,
            food: 0.06,
          };

          const food = 3750;

          /* ===== MONTHLY CALCULATION (ROUND HERE ONLY) ===== */
          const basicMonthly = round2(grossMonthly * PERCENT.basic);
          const hraMonthly = round2(grossMonthly * PERCENT.hra);
          const daMonthly = round2(grossMonthly * PERCENT.da);
          const specialMonthly = round2(grossMonthly * PERCENT.special);
          const foodMonthly = food / 12;

          const usedMonthly =
            basicMonthly +
            hraMonthly +
            daMonthly +
            specialMonthly +
            foodMonthly;

          /* ===== ADJUSTMENT BUCKET ===== */
          const miscMonthly = round2(grossMonthly - usedMonthly);

          /* ===== FINAL SALARY COMPONENTS ===== */
          const rows = [
            {
              name: "Basic",
              monthly: basicMonthly,
              annual: round0(basicMonthly * 12),
            },
            {
              name: "Bouquet Of Benefits",
              monthly: hraMonthly,
              annual: round0(hraMonthly * 12),
            },
            {
              name: "HRA",
              monthly: daMonthly,
              annual: round0(daMonthly * 12),
            },
            {
              name: "City Allowance",
              monthly: specialMonthly,
              annual: round0(specialMonthly * 12),
            },
            {
              name: "Provident Fund",
              monthly: foodMonthly,
              annual: round0(foodMonthly * 12),
            },
            {
              name: "Performance Bonus",
              monthly: miscMonthly,
              annual: round0(miscMonthly * 12),
            },
          ];

          /* ===== TOTALS (MATCH CTC ALWAYS) ===== */
          //
          const totalMonthly = round2(
            rows.reduce((sum, r) => sum + r.monthly, 0),
          );

          const totalAnnual = round0(
            rows.reduce((sum, r) => sum + r.annual, 0),
          );

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
            <>
              {/* ================= ROOT WRAPPER ================= */}
              <Box
                sx={{
                  fontFamily: "Bahnschrift",
                  position: "relative",
                }}
              >
                {/* ================= ISSUE DATE ================= */}
                <Box
                  sx={{
                    textAlign:"right",
                    
                    mt: "-10mm",
                    fontFamily: "Bahnschrift",
                  }}
                >
                  {formatDate(data.issueDate)}
                </Box>

                {/* ================= EMPLOYEE DETAILS ================= */}
                <Box sx={{ fontSize: "8pt" }}>
                  <Typography
                    sx={{ fontSize: "11pt", fontFamily: "Bahnschrift" }}
                  >
                    Ref: {company.regNo}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      mt: "6mm",
                      textDecoration: "underline",
                      fontFamily: "Bahnschrift",
                      fontSize: "12pt",
                      textAlign: "center",
                    }}
                  >
                    Salary Structure - Break Up
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "10pt",
                      mt: "8mm",
                      fontFamily: "Bahnschrift",
                    }}
                  >
                    Name : {data.mrms} {data.employeeName}
                  </Typography>

                  <Typography
                    sx={{ fontSize: "10pt", fontFamily: "Bahnschrift" }}
                  >
                    Designation : {data.position}
                  </Typography>

                  <Typography
                    sx={{ fontSize: "10pt", fontFamily: "Bahnschrift" }}
                  >
                    Date of Joining : {formatDate(data.joiningDate)}
                  </Typography>

                  <Typography
                    sx={{ fontSize: "10pt", fontFamily: "Bahnschrift" }}
                  >
                    Employee ID : {data.employeeId}
                  </Typography>
                </Box>
                <br />

                {/* ================= SALARY TABLE ================= */}
                <TableContainer>
                  <Table sx={{ borderCollapse: "collapse" }}>
                    <TableHead>
                      <TableRow sx={GREEN_ROW}>
                        <TableCell sx={{ ...CELL, fontWeight: "bold" }}>
                          Salary Components
                        </TableCell>
                        <TableCell
                          sx={{ ...CELL, fontWeight: "bold" }}
                          align="right"
                        >
                          Per Month (Rs.)
                        </TableCell>
                        <TableCell
                          sx={{ ...CELL, fontWeight: "bold" }}
                          align="right"
                        >
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
              </Box>
            </>
          );
        })()}
      </A4Page>
    </>
  );
};;

export default NimbjaOffer;

