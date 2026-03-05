// import React from "react";
// import { Typography, Box, Grid } from "@mui/material";
// import A4Page from "../../../../layout/A4Page";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       })
//     : "";

// const NimbjaOfferPage1 = ({ company, data }) => {
//   const offerDate = formatDate(data.issueDate);
//   const joiningDate = formatDate(data.joiningDate);
//   const firstName = data.candidateName?.split(" ")[0] || "";

//   return (
//     <A4Page
//       headerSrc={company.header}
//       footerSrc={company.footer}
//       watermarkSrc={company.watermarkImage || company.watermark}
//       contentTop="48mm"
//       contentBottom="28mm"
//       company={company}
//     >
//       {/* ================= DATE ================= */}
//       <Typography sx={{ mb: "10mm", textAlign: "right" }}>
//         {offerDate}
//       </Typography>

//       {/* ================= CANDIDATE DETAILS ================= */}
//       <Typography sx={{ mb: "3mm" }}>
//         Name : {data.mrms} {data.candidateName}
//       </Typography>

//       <Typography sx={{ mb: "3mm" }}>Address : {data.address}</Typography>

//       <Typography sx={{ mb: "6mm" }}>
//         Subject : Offer of Employment – {data.position}
//       </Typography>

//       {/* ================= GREETING ================= */}
//       <Typography sx={{ mb: "6mm" }}>Dear {firstName},</Typography>

//       {/* ================= PARA 1 ================= */}
//       <Typography sx={{ textAlign: "justify", lineHeight: 1.6, mb: "6mm" }}>
//         Welcome to <strong>{company.name}</strong>. It was a pleasure meeting
//         you and discussing a career opportunity with us. Based on our
//         discussions, we are pleased to offer you the position of{" "}
//         <strong>{data.position}</strong> with our organization. The gross
//         compensation for this position will be{" "}
//         <strong>INR {data.salary}</strong> per annum.
//       </Typography>

//       {/* ================= PARA 2 ================= */}
//       <Typography sx={{ textAlign: "justify", lineHeight: 1.6, mb: "6mm" }}>
//         You are expected to commence your employment with us on{" "}
//         <strong>{joiningDate}</strong>. The terms and conditions of employment,
//         including compensation structure, are detailed in Annexure – A attached
//         with this letter.
//       </Typography>

//       {/* ================= PARA 3 ================= */}
//       <Typography sx={{ textAlign: "justify", lineHeight: 1.6, mb: "8mm" }}>
//         At <strong>{company.name}</strong>, we believe in building a world-class
//         organization driven by trust, transparency, and excellence. We are
//         confident that your skills and experience will make a valuable
//         contribution to our team, and we look forward to a successful
//         professional relationship.
//       </Typography>

//       {/* ================= CLOSING ================= */}
//       <strong>
//         <Typography sx={{ mb: "3mm" }}>Yours sincerely,</Typography>
//       </strong>

//       <Typography sx={{ mb: "6mm" }}>
//         For <strong>{company.name}</strong>
//       </Typography>

//       {/* ================= SIGNATURE ================= */}
//       <Box sx={{ mt: "6mm" }}>
//         <Grid container spacing={3} alignItems="center">
//           {company.signature && (
//             <Grid item>
//               <Box
//                 component="img"
//                 src={company.signature}
//                 alt="Signature"
//                 sx={{ width: 120 }}
//               />
//             </Grid>
//           )}

//           {company.stamp && (
//             <Grid item>
//               <Box
//                 component="img"
//                 src={company.stamp}
//                 alt="Company Stamp"
//                 sx={{ width: 100 }}
//               />
//             </Grid>
//           )}
//         </Grid>

//         <Box sx={{ mb: "10mm" }}>
//           <Typography sx={{ fontWeight: "bold" }}>{company.hrName}</Typography>
//           <Typography>HR Manager – HR Shared Services</Typography>
//         </Box>
//       </Box>
//     </A4Page>
//   );
// };

// export default NimbjaOfferPage1;



















// import React from "react";
// import { Typography, Box, Grid } from "@mui/material";
// import A4Page from "../../../../layout/A4Page";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       })
//     : "";

// const NimbjaOfferPage1 = ({ company, data }) => {
//   const offerDate = formatDate(data.issueDate);
//   const joiningDate = formatDate(data.joiningDate);
//   const firstName = data.candidateName?.split(" ")[0] || "";

//   return (
//     <A4Page
//       headerSrc={company.header}
//       footerSrc={company.footer}
//       watermarkSrc={company.watermarkImage || company.watermark}
//       contentTop="48mm"
//       contentBottom="28mm"
//       company={company}
//     >
//       {/* ================= DATE ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           textAlign: "right",
//           mb: "10mm",
//         }}
//       >
//         {offerDate}
//       </Typography>

//       {/* ================= CANDIDATE DETAILS ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           mb: "3mm",
//         }}
//       >
//         Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {data.mrms}{" "}
//         {data.candidateName}
//       </Typography>

//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           mb: "3mm",
//         }}
//       >
//         Address&nbsp;&nbsp;&nbsp;: {data.address}
//       </Typography>

//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           mb: "6mm",
//         }}
//       >
//         Subject&nbsp;&nbsp;&nbsp;&nbsp;: Offer of Employment – {data.position}
//       </Typography>

//       {/* ================= GREETING ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           mb: "6mm",
//         }}
//       >
//         Dear {firstName},
//       </Typography>

//       {/* ================= PARA 1 ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           textAlign: "justify",
//           mb: "6mm",
//         }}
//       >
//         Welcome to  <strong>{company.name}</strong>. It was a pleasure meeting
//         you and discussing a career opportunity with us. Based on our
//         discussions, we are pleased to offer you the position of{" "}
//         <strong>{data.position}</strong> with our organization. The gross
//         compensation for this position will be{" "}
//         <strong>INR {data.salary}</strong> per annum.
//       </Typography>

//       {/* ================= PARA 2 ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           textAlign: "justify",
//           mb: "6mm",
//         }}
//       >
//         You are expected to commence your employment with us on{" "}
//         <strong>{joiningDate}</strong>. The terms and conditions of employment,
//         including compensation structure, are detailed in Annexure – A attached
//         with this letter.
//       </Typography>

//       {/* ================= PARA 3 ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           textAlign: "justify",
//           mb: "8mm",
//         }}
//       >
//         At <strong>{company.name}</strong>, we believe in building a world-class
//         organization driven by trust, transparency, and excellence. We are
//         confident that your skills and experience will make a valuable
//         contribution to our team, and we look forward to a successful
//         professional relationship.
//       </Typography>

//       {/* ================= CLOSING ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           fontWeight: "bold",
//           mb: "3mm",
//         }}
//       >
//         Yours sincerely,
//       </Typography>

//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           mb: "6mm",
//         }}
//       >
//         For <strong>{company.name}</strong>
//       </Typography>

//       {/* ================= SIGNATURE ================= */}
//       <Box sx={{ mt: "6mm" }}>
//         <Grid container spacing={3} alignItems="center">
//           {company.signature && (
//             <Grid item>
//               <Box
//                 component="img"
//                 src={company.signature}
//                 alt="Signature"
//                 sx={{ width: "38mm" }}
//               />
//             </Grid>
//           )}

//           {company.stamp && (
//             <Grid item>
//               <Box
//                 component="img"
//                 src={company.stamp}
//                 alt="Company Stamp"
//                 sx={{ width: "34mm" }}
//               />
//             </Grid>
//           )}
//         </Grid>

//         <Box sx={{ mt: "6mm" }}>
//           <Typography
//             sx={{
//               fontFamily: '"Times New Roman", serif',
//               fontSize: "12pt",
//               letterSpacing: "0.2px",
//               lineHeight: 1.55,
//               fontWeight: "bold",
//             }}
//           >
//             {company.hrName}
//           </Typography>

//           <Typography
//             sx={{
//               fontFamily: '"Times New Roman", serif',
//               fontSize: "12pt",
//               letterSpacing: "0.2px",
//               lineHeight: 1.55,
//             }}
//           >
//             HR Relations Lead
//           </Typography>
//         </Box>
//       </Box>
//     </A4Page>
//   );
// };

// export default NimbjaOfferPage1;














// import React from "react";
// import { Typography, Box, Grid } from "@mui/material";
// import A4Page from "../../../../layout/A4Page";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       })
//     : "";

// /* ================= BASE TEXT STYLE ================= */
// const baseText = {
//   fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
//   fontSize: "11pt",
//   letterSpacing: "0.15px",
//   lineHeight: 1.5,
//   color: "#000",
// };

// const formatIndianCurrency = (value) => {
//   if (!value) return "";
//   return Number(value).toLocaleString("en-IN");
// };

// const NimbjaOfferPage1 = ({ company, data }) => {
//   const offerDate = formatDate(data.issueDate);
//   const joiningDate = formatDate(data.joiningDate);
//   const firstName = data.candidateName?.split(" ")[0] || "";

//   return (
//     <A4Page
//       headerSrc={company.header}
//       footerSrc={company.footer}
      
//       contentTop="48mm"
//       contentBottom="28mm"
      
//     >
//       {/* ================= DATE ================= */}
//       <Typography
//         sx={{ ...baseText, textAlign: "right", mb: "9mm" }}
//       >
//         {offerDate}
//       </Typography>

//       {/* ================= DETAILS ================= */}
//       <Typography
//         sx={{
//           ...baseText,
//           mb: "2.5mm",
//           fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
//         }}
//       >
//         Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
//         <Typography
//           component="span"
//           sx={{
//             fontWeight: "",
//             fontFamily: 'Bahnschrift',
//           }}
//         >
//           {data.candidateName}
//         </Typography>
//       </Typography>

//       <Typography sx={{ ...baseText, mb: "2.5mm" }}>
//         Address&nbsp;&nbsp;&nbsp;:{" "}
//         <Typography
//           component="span"
//           sx={{
//             fontWeight: "",
//             fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
//           }}
//         >
//           {data.address}
//         </Typography>
//       </Typography>

//       <Typography sx={{ ...baseText, mb: "5mm", fontFamily: "Bahnschrift" }}>
//         Subject&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
//         <Typography
//           component="span"
//           sx={{
//             borderBottom: "1px solid #000",
//             display: "inline",
//             paddingBottom: "1px",
//             fontFamily: "Bahnschrift",
//           }}
//         >
//           Letter of intent for the position of {data.position}.
//         </Typography>
//       </Typography>

//       {/* ================= GREETING ================= */}
//       <Typography sx={{ ...baseText, mb: "5mm" }}>
//         Dear{" "}
//         <Typography
//           component="span"
//           sx={{ fontWeight: 400, fontFamily: "Bahnschrift" }}
//         >
//           {firstName}
//         </Typography>
//         ,
//       </Typography>

//       {/* ================= PARAGRAPHS ================= */}
//       <Typography sx={{ ...baseText, textAlign: "justify", mb: "5mm",marginTop:"-2mm" }}>
//         Welcome to{" "}
//         <Typography
//           component="span"
//           sx={{
//             fontWeight: 500,
//             fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
//           }}
//         >
//           {company.name}
//         </Typography>
//         . Quality is not just a destination but a journey in which every
//         employee contributes. We invite you to be part of this journey!
//         <br />
//         This has reference to your application and subsequent interviews you had
//         with us.
//         <br />
//         We are pleased to offer you the role of{" "}
//         <strong>{data.position}.</strong>
//       </Typography>
//       <Typography
//         sx={{ ...baseText, textAlign: "justify", mb: "2mm", mt: "2mm" }}
//       >
//         {/* with us. We are pleased to offer you the role of{" "} */}
//         <Typography component="span" sx={{ fontWeight: 600 }}></Typography>
//       </Typography>

//       <Typography sx={{ ...baseText, textAlign: "justify", mb: "5mm" }}>
//         On Joining, your all-inclusive Cost to the Company (CTC) will be{" "}
//         <Typography component="span" sx={{ fontWeight: 600 }}>
//           Rs.{formatIndianCurrency(data.salary)}/-
//         </Typography>
//         as per Annexure A. This offer is made on the basis of your having
//         furnished to the Company information and documents in support of your
//         age, academic qualifications, previous work experience, relieving letter
//         from your last employer and other particulars on or before your day of
//         joining. The Company shall conduct a background and reference check as
//         per Company policy and this appointment is conditional upon receiving
//         positive feedback.
//         <br />
//         You are required to join the services of the Company at the earliest,
//         but in any case, not later than{" "}
//         <Typography component="span" sx={{ fontWeight: 600 }}>
//           {joiningDate}
//         </Typography>
//       </Typography>
//       <Typography sx={{ ...baseText, textAlign: "justify", mb: "5mm" }}>
//         Thanking you and looking forward to having you with us. .
//       </Typography>

//       <Typography
//         sx={{
//           ...baseText,
//           mb: "5mm",
//           fontFamily: "Bahnschrift",
//           fontSize: "18pt",
//         }}
//       >
//         For <strong>{company.name}</strong>
//       </Typography>

//       {/* ================= SIGNATURE BLOCK ================= */}
//       {/* ================= SIGNATURE BLOCK (ABOVE FOOTER) ================= */}
//       <Box
//         sx={{
//           mt: "5mm",
//           mb: "20mm", // 🔑 IMPORTANT: pushes content ABOVE footer
//           fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
//         }}
//       >
//         <Grid container justifyContent="space-between" alignItems="flex-start">
//           {/* LEFT — HR */}
//           <Grid item>
//             {company.signature && (
//               <Box
//                 component="img"
//                 src={company.signature}
//                 alt="Signature"
//                 sx={{
//                   width: "45mm",
//                   display: "block",
//                   mb: "19mm",
//                   mt: "9mm",
//                 }}
//               />
//             )}

//             <strong>
//               <Typography sx={{ fontWeight: 600 }}>{company.hrName}</Typography>

//               <Typography
//                 sx={{
//                   fontFamily: '"Bahnschrift", "Segoe UI", sans-serif', // 🔑 ADDED
//                   fontSize: "12pt", // 🔑 ADDED
//                   mt: "mm", // 🔑 ADDED
//                 }}
//               >
//                 <strong>HR Relations Lead</strong>
//               </Typography>
//             </strong>
//           </Grid>

//           {/* RIGHT — STAMP + CANDIDATE */}
//           <Grid item>
//             {company.stamp && (
//               <Box
//                 component="img"
//                 src={company.stamp}
//                 alt="Company Stamp"
//                 sx={{
//                   width: "34mm",
//                   display: "block",
//                   mb: "4mm",
//                   ml: "-52mm",
//                 }}
//               />
//             )}

//             <Typography
//               sx={{
//                 fontFamily: '"Bahnschrift", "Segoe UI", sans-serif', // 🔑 ADDED
//               }}
//             >
//               <strong>Signature :</strong> _________________________ 
//             </Typography>

//             <Typography
//               sx={{
//                 fontFamily: '"Bahnschrift", "Segoe UI", sans-serif', // 🔑 ADDED
//               }}
//             >
//               <strong>Candidate Name:</strong>{" "}
//               <strong>{data.candidateName}</strong> {/* 🔑 NAME BOLD */}
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </A4Page>
//   );
// };

// export default NimbjaOfferPage1;






// import React from "react";
// import { Typography, Box, Grid } from "@mui/material";
// import A4Page from "../../../../layout/A4Page";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       })
//     : "";

// const NimbjaOfferPage1 = ({ company, data }) => {
//   const offerDate = formatDate(data.issueDate);
//   const joiningDate = formatDate(data.joiningDate);
//   const firstName = data.candidateName?.split(" ")[0] || "";

//   return (
//     <A4Page
//       headerSrc={company.header}
//       footerSrc={company.footer}
//       watermarkSrc={company.watermarkImage || company.watermark}
//       contentTop="48mm"
//       contentBottom="28mm"
//       company={company}
//     >
//       {/* ================= DATE ================= */}
//       <Typography sx={{ mb: "10mm", textAlign: "right" }}>
//         {offerDate}
//       </Typography>

//       {/* ================= CANDIDATE DETAILS ================= */}
//       <Typography sx={{ mb: "3mm" }}>
//         Name : {data.mrms} {data.candidateName}
//       </Typography>

//       <Typography sx={{ mb: "3mm" }}>Address : {data.address}</Typography>

//       <Typography sx={{ mb: "6mm" }}>
//         Subject : Offer of Employment – {data.position}
//       </Typography>

//       {/* ================= GREETING ================= */}
//       <Typography sx={{ mb: "6mm" }}>Dear {firstName},</Typography>

//       {/* ================= PARA 1 ================= */}
//       <Typography sx={{ textAlign: "justify", lineHeight: 1.6, mb: "6mm" }}>
//         Welcome to <strong>{company.name}</strong>. It was a pleasure meeting
//         you and discussing a career opportunity with us. Based on our
//         discussions, we are pleased to offer you the position of{" "}
//         <strong>{data.position}</strong> with our organization. The gross
//         compensation for this position will be{" "}
//         <strong>INR {data.salary}</strong> per annum.
//       </Typography>

//       {/* ================= PARA 2 ================= */}
//       <Typography sx={{ textAlign: "justify", lineHeight: 1.6, mb: "6mm" }}>
//         You are expected to commence your employment with us on{" "}
//         <strong>{joiningDate}</strong>. The terms and conditions of employment,
//         including compensation structure, are detailed in Annexure – A attached
//         with this letter.
//       </Typography>

//       {/* ================= PARA 3 ================= */}
//       <Typography sx={{ textAlign: "justify", lineHeight: 1.6, mb: "8mm" }}>
//         At <strong>{company.name}</strong>, we believe in building a world-class
//         organization driven by trust, transparency, and excellence. We are
//         confident that your skills and experience will make a valuable
//         contribution to our team, and we look forward to a successful
//         professional relationship.
//       </Typography>

//       {/* ================= CLOSING ================= */}
//       <strong>
//         <Typography sx={{ mb: "3mm" }}>Yours sincerely,</Typography>
//       </strong>

//       <Typography sx={{ mb: "6mm" }}>
//         For <strong>{company.name}</strong>
//       </Typography>

//       {/* ================= SIGNATURE ================= */}
//       <Box sx={{ mt: "6mm" }}>
//         <Grid container spacing={3} alignItems="center">
//           {company.signature && (
//             <Grid item>
//               <Box
//                 component="img"
//                 src={company.signature}
//                 alt="Signature"
//                 sx={{ width: 120 }}
//               />
//             </Grid>
//           )}

//           {company.stamp && (
//             <Grid item>
//               <Box
//                 component="img"
//                 src={company.stamp}
//                 alt="Company Stamp"
//                 sx={{ width: 100 }}
//               />
//             </Grid>
//           )}
//         </Grid>

//         <Box sx={{ mb: "10mm" }}>
//           <Typography sx={{ fontWeight: "bold" }}>{company.hrName}</Typography>
//           <Typography>HR Manager – HR Shared Services</Typography>
//         </Box>
//       </Box>
//     </A4Page>
//   );
// };

// export default NimbjaOfferPage1;



















// import React from "react";
// import { Typography, Box, Grid } from "@mui/material";
// import A4Page from "../../../../layout/A4Page";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       })
//     : "";

// const NimbjaOfferPage1 = ({ company, data }) => {
//   const offerDate = formatDate(data.issueDate);
//   const joiningDate = formatDate(data.joiningDate);
//   const firstName = data.candidateName?.split(" ")[0] || "";

//   return (
//     <A4Page
//       headerSrc={company.header}
//       footerSrc={company.footer}
//       watermarkSrc={company.watermarkImage || company.watermark}
//       contentTop="48mm"
//       contentBottom="28mm"
//       company={company}
//     >
//       {/* ================= DATE ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           textAlign: "right",
//           mb: "10mm",
//         }}
//       >
//         {offerDate}
//       </Typography>

//       {/* ================= CANDIDATE DETAILS ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           mb: "3mm",
//         }}
//       >
//         Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {data.mrms}{" "}
//         {data.candidateName}
//       </Typography>

//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           mb: "3mm",
//         }}
//       >
//         Address&nbsp;&nbsp;&nbsp;: {data.address}
//       </Typography>

//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           mb: "6mm",
//         }}
//       >
//         Subject&nbsp;&nbsp;&nbsp;&nbsp;: Offer of Employment – {data.position}
//       </Typography>

//       {/* ================= GREETING ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           mb: "6mm",
//         }}
//       >
//         Dear {firstName},
//       </Typography>

//       {/* ================= PARA 1 ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           textAlign: "justify",
//           mb: "6mm",
//         }}
//       >
//         Welcome to  <strong>{company.name}</strong>. It was a pleasure meeting
//         you and discussing a career opportunity with us. Based on our
//         discussions, we are pleased to offer you the position of{" "}
//         <strong>{data.position}</strong> with our organization. The gross
//         compensation for this position will be{" "}
//         <strong>INR {data.salary}</strong> per annum.
//       </Typography>

//       {/* ================= PARA 2 ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           textAlign: "justify",
//           mb: "6mm",
//         }}
//       >
//         You are expected to commence your employment with us on{" "}
//         <strong>{joiningDate}</strong>. The terms and conditions of employment,
//         including compensation structure, are detailed in Annexure – A attached
//         with this letter.
//       </Typography>

//       {/* ================= PARA 3 ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           textAlign: "justify",
//           mb: "8mm",
//         }}
//       >
//         At <strong>{company.name}</strong>, we believe in building a world-class
//         organization driven by trust, transparency, and excellence. We are
//         confident that your skills and experience will make a valuable
//         contribution to our team, and we look forward to a successful
//         professional relationship.
//       </Typography>

//       {/* ================= CLOSING ================= */}
//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           fontWeight: "bold",
//           mb: "3mm",
//         }}
//       >
//         Yours sincerely,
//       </Typography>

//       <Typography
//         sx={{
//           fontFamily: '"Times New Roman", serif',
//           fontSize: "12pt",
//           letterSpacing: "0.2px",
//           lineHeight: 1.55,
//           mb: "6mm",
//         }}
//       >
//         For <strong>{company.name}</strong>
//       </Typography>

//       {/* ================= SIGNATURE ================= */}
//       <Box sx={{ mt: "6mm" }}>
//         <Grid container spacing={3} alignItems="center">
//           {company.signature && (
//             <Grid item>
//               <Box
//                 component="img"
//                 src={company.signature}
//                 alt="Signature"
//                 sx={{ width: "38mm" }}
//               />
//             </Grid>
//           )}

//           {company.stamp && (
//             <Grid item>
//               <Box
//                 component="img"
//                 src={company.stamp}
//                 alt="Company Stamp"
//                 sx={{ width: "34mm" }}
//               />
//             </Grid>
//           )}
//         </Grid>

//         <Box sx={{ mt: "6mm" }}>
//           <Typography
//             sx={{
//               fontFamily: '"Times New Roman", serif',
//               fontSize: "12pt",
//               letterSpacing: "0.2px",
//               lineHeight: 1.55,
//               fontWeight: "bold",
//             }}
//           >
//             {company.hrName}
//           </Typography>

//           <Typography
//             sx={{
//               fontFamily: '"Times New Roman", serif',
//               fontSize: "12pt",
//               letterSpacing: "0.2px",
//               lineHeight: 1.55,
//             }}
//           >
//             HR Relations Lead
//           </Typography>
//         </Box>
//       </Box>
//     </A4Page>
//   );
// };

// export default NimbjaOfferPage1;














import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import A4Page from "../../../../layout/A4Page";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

/* ================= BASE TEXT STYLE ================= */
const baseText = {
  fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
  fontSize: "11pt",
  letterSpacing: "0.15px",
  lineHeight: 1.5,
  color: "#000",
};

const formatIndianCurrency = (value) => {
  if (!value) return "";
  return Number(value).toLocaleString("en-IN");
};

const NimbjaOfferPage1 = ({ company, data }) => {
  const offerDate = formatDate(data.issueDate);
  const joiningDate = formatDate(data.joiningDate);
  const firstName = data.candidateName?.split(" ")[0] || "";
  /* ================= SALARY LOGIC (MONTHLY INPUT) ================= */

  const round2 = (num) => Math.round((Number(num) || 0) * 100) / 100;

  // 🔥 INPUT IS MONTHLY
  const monthlyGross = round2(data.salary || data.newCTC || 0);

  // Annual derived
  const totalAnnual = round2(monthlyGross * 12);
  return (
    <A4Page
      headerSrc={company.header}
      footerSrc={company.footer}
      // watermarkSrc={company.watermarkImage || company.watermark || null}
      // contentTop="48mm"
      // contentBottom="28mm"
      // company={company}
    >
      {/* ================= DATE ================= */}
      <Typography
        sx={{ ...baseText, fontWeight: 600, textAlign: "right", mb: "9mm" }}
      >
        {offerDate}
      </Typography>

      <Typography
        sx={{
          textAlign: "Center",
          marginTop: "-8mm",
          mb: "5mm",
          fontFamily: "Verdana",
          textDecoration: "underline",
          fontSize: "15px",
        }}
      >
        Offer Letter
      </Typography>

      {/* ================= DETAILS ================= */}
      <Typography
        sx={{
          ...baseText,
          mb: "2.5mm",
          fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
        }}
      >
        Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
        <Typography
          component="span"
          sx={{
            fontWeight: "",
            fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
          }}
        >
          {data.candidateName}
        </Typography>
      </Typography>

      <Typography sx={{ ...baseText, mb: "2.5mm" }}>
        Address&nbsp;&nbsp;&nbsp;:{" "}
        <Typography
          component="span"
          sx={{
            fontWeight: "",
            fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
          }}
        >
          {data.address}
        </Typography>
      </Typography>

      <Typography sx={{ ...baseText, mb: "5mm", fontFamily: "Bahnschrift" }}>
        Subject&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
        <Typography
          component="span"
          sx={{
            borderBottom: "1px solid #000",
            display: "inline",
            paddingBottom: "1px",
            fontFamily: "Bahnschrift",
          }}
        >
          Letter of intent for the position of {data.position}.
        </Typography>
      </Typography>

      {/* ================= GREETING ================= */}
      <Typography sx={{ ...baseText, mb: "5mm" }}>
        Dear{" "}
        <Typography
          component="span"
          sx={{ fontWeight: 400, fontFamily: "Bahnschrift" }}
        >
          {firstName}
        </Typography>
        ,
      </Typography>

      {/* ================= PARAGRAPHS ================= */}
      <Typography
        sx={{ ...baseText, textAlign: "justify", mb: "5mm", marginTop: "-2mm" }}
      >
        Welcome to{" "}
        <Typography
          component="span"
          sx={{
            fontWeight: 500,
            fontFamily: 'Bahnschrift, "Segoe UI", Arial, sans-serif',
          }}
        >
          {company.name}
        </Typography>
        Quality is not just a destination but a journey in which every employee
        contributes. We invite you to be part of this journey!
        <br />
        This has reference to your application and subsequent interviews you had
        with us.
        <br />
        We are pleased to offer you the role of{" "}
        <strong>{data.position}.</strong>
      </Typography>
      <Typography
        sx={{ ...baseText, textAlign: "justify", mb: "2mm", mt: "2mm" }}
      >
        {/* with us. We are pleased to offer you the role of{" "} */}
        <Typography component="span" sx={{ fontWeight: 600 }}></Typography>
      </Typography>

      <Typography sx={{ ...baseText, textAlign: "justify", mb: "5mm" }}>
        On Joining, your all-inclusive Cost to the Company (CTC) will be{" "}
        <Typography component="span" sx={{ fontWeight: 600 }}>
          Rs. {formatIndianCurrency(totalAnnual)}/-
        </Typography> as per Annexure A. This offer is made on the basis of your having
        furnished to the Company information and documents in support of your
        age, academic qualifications, previous work experience, relieving letter
        from your last employer and other particulars on or before your day of
        joining. The Company shall conduct a background and reference check as
        per Company policy and this appointment is conditional upon receiving
        positive feedback.
        <br />
        You are required to join the services of the Company at the earliest,
        but in any case, not later than{" "}
        <Typography component="span" sx={{ fontWeight: 600 }}>
          {joiningDate}.
        </Typography>
      </Typography>
      <Typography sx={{ ...baseText, textAlign: "justify", mb: "5mm" }}>
        Thanking you and looking forward to having you with us. .
      </Typography>

      <Typography
        sx={{
          ...baseText,
          mb: "5mm",
          fontFamily: "Bahnschrift",
          fontSize: "18pt",
        }}
      >
        For <strong>{company.name}</strong>
      </Typography>

      {/* ================= SIGNATURE BLOCK ================= */}
      {/* ================= SIGNATURE BLOCK (ABOVE FOOTER) ================= */}
      <Box
        sx={{
          mt: "5mm",
          mb: "20mm", // 🔑 IMPORTANT: pushes content ABOVE footer
          fontFamily: '"Bahnschrift", "Segoe UI", sans-serif',
        }}
      >
        <Grid container justifyContent="space-between" alignItems="flex-start">
          {/* LEFT — HR */}
          <Grid item>
            {company.signature && (
              <Box
                component="img"
                src={company.signature}
                alt="Signature"
                sx={{
                  width: "45mm",
                  display: "block",
                  mb: "19mm",
                  mt: "9mm",
                }}
              />
            )}

            <strong>
              <Typography sx={{ fontWeight: 600 }}>{company.hrName}</Typography>

              <Typography
                sx={{
                  fontFamily: '"Bahnschrift", "Segoe UI", sans-serif', // 🔑 ADDED
                  fontSize: "12pt", // 🔑 ADDED
                  mt: "mm", // 🔑 ADDED
                }}
              >
                <strong>HR Relations Lead</strong>
              </Typography>
            </strong>
          </Grid>

          {/* RIGHT — STAMP + CANDIDATE */}
          <Grid item>
            {company.stamp && (
              <Box
                component="img"
                src={company.stamp}
                alt="Company Stamp"
                sx={{
                  
                  display: "block",
                  mb: "4mm",
                  ml: "-52mm",
                  height: 100,
                }}
              />
            )}

            <Typography
              sx={{
                fontFamily: '"Bahnschrift", "Segoe UI", sans-serif', // 🔑 ADDED
              }}
            >
              <strong>Signature :</strong> _________________________
            </Typography>

            <Typography
              sx={{
                fontFamily: '"Bahnschrift", "Segoe UI", sans-serif', // 🔑 ADDED
              }}
            >
              <strong>Candidate Name:</strong>{" "}
              <strong>{data.candidateName}</strong> {/* 🔑 NAME BOLD */}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </A4Page>
  );
};;

export default NimbjaOfferPage1;



