// import React from "react";
// import { Box, Typography } from "@mui/material";

// /* ---------- Utils ---------- */
// const formatDate = (date) => {
//   if (!date) return "";
//   return new Date(date).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });
// };

// /* ---------- A4 Page Wrapper ---------- */
// const Page = ({ children }) => (
//   <Box
//     sx={{
//       width: "210mm",
//       minHeight: "297mm",
//       backgroundColor: "#fff",
//      fontFamily: "Verdana, Geneva, Tahoma, sans-serif", // ✅ VERDANA
//       color: "#000",
//       mx: "auto",
//       position: "relative",
//     }}
//   >
//     {children}
//   </Box>
// );

// /* ---------- Component ---------- */
// const QuickExperience = ({ company, data }) => {
//   if (!company || !data) {
//     return (
//       <Box sx={{ p: 4, textAlign: "center" }}>
//         <Typography>Loading Experience Letter...</Typography>
//       </Box>
//     );
//   }

//   const referenceNo = `QMS\\PUN\\RMG01\\Exp-Letter\\${data.employeeId}`;

//   return (
//     <Page>
//       {/* Header */}
//       {company.header && (
//         <img src={company.header} alt="Header" style={{ width: "100%" }} />
//       )}

//       {/* Main Content */}
//       <Box sx={{ px: "32mm", pt: "28mm", pb: "40mm" }}>
      

//         {/* Title */}
//         <Typography
//           sx={{
//             fontSize: 16,
//             fontWeight: "bold",
//             textAlign: "center",
//             mb: 10,
//           }}
//         >
//           TO WHOMSOEVER IT MAY CONCERN
//         </Typography>

//         {/* Body Paragraph (DOCX text matched) */}
//         <Typography sx={{ fontSize: 14, lineHeight: 2, mb: 6 }}>
//           This is to certify that{" "}
//           <strong>{data.employeeName}</strong> was in our employment from{" "}
//           <strong>{formatDate(data.joiningDate)}</strong> to{" "}
//           <strong>{formatDate(data.relievingDate)}</strong>. He was efficient and
//           hardworking in this tenure. At the time of leaving, the services of the
//           company, he was designated as{" "}
//           <strong>{data.designation}</strong>.
//         </Typography>

//         <Typography sx={{ fontSize: 14, mb: 10 }}>
//           We wish him success in his future career.
//         </Typography>

//         {/* Closing */}
//         <Typography sx={{ fontSize: 14, mb: 6 }}>
//           For <strong>{company.name}</strong>
//         </Typography>

//         {/* Signature & Stamp */}
//         <Box sx={{ display: "flex", gap: 5, alignItems: "flex-end", mb: 3 }}>
//           {company.signature && (
//             <img src={company.signature} alt="Signature" height={55} />
//           )}
//           {company.stamp && (
//             <img src={company.stamp} alt="Stamp" height={65} />
//           )}
//         </Box>

//         {/* HR Details */}
//         <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
//           {company.hrName}
//         </Typography>
//         <Typography sx={{ fontSize: 14 , fontWeight: "bold"}}>
//           Group Leader-HR Shared Services
//         </Typography>
//       </Box>

      
//     </Page>
//   );
// };

// export default QuickExperience;




// src/components/documents/QuickExperience.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

/* ---------- Utils ---------- */
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

/* ---------- Pronoun Resolver ---------- */
const getPronounsByTitle = (title = "") => {
  const t = title.toLowerCase().replace(".", "");

  switch (t) {
    case "mr":
      return { subject: "he", object: "him", possessive: "his" };

    case "ms":
    case "miss":
    case "mrs":
      return { subject: "she", object: "her", possessive: "her" };

    case "mx":
      return { subject: "they", object: "them", possessive: "their" };

    default:
      return { subject: "they", object: "them", possessive: "their" };
  }
};

/* ---------- A4 Page Wrapper ---------- */
const Page = ({ children }) => (
  <Box
    sx={{
      width: "210mm",
      minHeight: "297mm",
      backgroundColor: "#fff",
      fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
      color: "#000",
      mx: "auto",
      position: "relative",
    }}
  >
    {children}
  </Box>
);

/* ---------- Component ---------- */
const QuickExperience = ({ company, data }) => {
  if (!company || !data) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>Loading Experience Letter...</Typography>
      </Box>
    );
  }

  const referenceNo = `QMS\\PUN\\RMG01\\Exp-Letter\\${data.employeeId}`;

  // ✅ Pronouns based on Mr / Ms / Mrs / Mx
  const pronoun = getPronounsByTitle(data.mrms);

  return (
    <Page>
      {/* Header */}
      {company.header && (
        <img src={company.header} alt="Header" style={{ width: "100%" }} />
      )}

      {/* Main Content */}
      <Box sx={{ px: "32mm", pt: "28mm", pb: "40mm" }}>
        {/* Title */}
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            mb: 10,
          }}
        >
          TO WHOMSOEVER IT MAY CONCERN
        </Typography>

        {/* Body */}
        <Typography sx={{ fontSize: 14, lineHeight: 2, mb: 6 }}>
          This is to certify that{" "}
          <strong>
            {data.mrms} {data.employeeName}
          </strong>{" "}
          was in our employment from{" "}
          <strong>{formatDate(data.joiningDate)}</strong> to{" "}
          <strong>{formatDate(data.relievingDate)}</strong>.{" "}
          {pronoun.subject} was efficient and hardworking
          during this tenure. At the time of leaving the services of the
          company, {pronoun.subject} was designated as{" "}
          <strong>{data.designation}</strong>.
        </Typography>

       <Typography sx={{ fontSize: 14, lineHeight: 2, mb: 15 }}>
          We wish {pronoun.object} success in{" "}
          {pronoun.possessive} future career.
        </Typography>

        {/* Closing */}
        <Typography sx={{ fontSize: 14, mb: 6 }}>
          For <strong>{company.name}</strong>
        </Typography>

        {/* Signature & Stamp */}
        <Box sx={{ display: "flex", gap: 5, alignItems: "flex-end", mb: 3 }}>
          {company.signature && (
            <img src={company.signature} alt="Signature" height={55} />
          )}
          {company.stamp && (
            <img src={company.stamp} alt="Stamp" height={65} />
          )}
        </Box>

        {/* HR Details */}
        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
          {company.hrName}
        </Typography>
        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
          Group Leader-HR Shared Services
        </Typography>
      </Box>
    </Page>
  );
};

export default QuickExperience;
